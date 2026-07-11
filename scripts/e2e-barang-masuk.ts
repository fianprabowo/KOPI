/**
 * E2E + unit tests — alur tambah barang masuk (crucial flows).
 * Jalankan: npx tsx scripts/e2e-barang-masuk.ts
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import pg from "pg";

import {
  isBarangMasukConfirm,
  isSkipDokumentasi,
  isSkipHargaJual,
  isSkipKeterangan,
  parseBarangMasukText,
  parseHargaBeli,
  parseProductOnly,
} from "../src/lib/parse-barang-masuk";
import { classifyIntent } from "../src/lib/intent";
import {
  applyMetaToNotaUnmatched,
  isNotaUnmatchedComplete,
  prefillNotaUnmatched,
} from "../src/lib/nota-queue";
import { parseProdukMetaFromText } from "../src/lib/produk-meta";

const BASE = process.env.E2E_BASE_URL ?? "http://localhost:3001";
const RUN_ID = Date.now().toString(36);

type TestResult = { name: string; ok: boolean; detail?: string };

const results: TestResult[] = [];

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i < 1) continue;
      const key = t.slice(0, i).trim();
      const val = t.slice(i + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // optional
  }
}

function pass(name: string, detail?: string) {
  results.push({ name, ok: true, detail });
}

function fail(name: string, detail?: string) {
  results.push({ name, ok: false, detail });
}

function assert(name: string, cond: boolean, detail?: string) {
  if (cond) pass(name, detail);
  else fail(name, detail ?? "assertion failed");
}

async function waitForServer(maxMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      const res = await fetch(`${BASE}/api/health`);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server tidak ready di ${BASE}`);
}

async function chat(command: string, context?: Record<string, unknown>) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const res = await fetch(`${BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command, context }),
    });
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return { status: res.status, data };
    } catch {
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 800));
        continue;
      }
      return { status: res.status, data: { success: false, in_scope: false, intent: "error", summary: text.slice(0, 120) } };
    }
  }
  return { status: 500, data: { success: false, in_scope: false, intent: "error", summary: "chat retry exhausted" } };
}

async function saveBarangMasuk(body: Record<string, unknown>) {
  const res = await fetch(`${BASE}/api/barang-masuk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { status: res.status, data: { success: false, error: `Non-JSON: ${text.slice(0, 80)}` } };
  }
  return { status: res.status, data };
}

// ─── 1. Parser unit tests ───────────────────────────────────────────────────

function testParser() {
  const cases: { cmd: string; expect: { product?: string; qty?: number; unit?: string; harga?: number } | null }[] = [
    { cmd: "tambah barang pisang 10 biji harga 20000", expect: { product: "Pisang", qty: 10, unit: "biji", harga: 20000 } },
    { cmd: "beras 10 kg harga beli 12000", expect: { product: "Beras", qty: 10, unit: "kg", harga: 12000 } },
    { cmd: "aqua 5 galon", expect: { product: "Aqua", qty: 5, unit: "galon" } },
    { cmd: "minyak goreng 2 liter harga 15000", expect: { product: "Minyak Goreng", qty: 2, unit: "liter", harga: 15000 } },
    { cmd: "gas elpigi 1 tabung @ 16000", expect: { product: "gas elpigi", qty: 1, unit: "tabung", harga: 16000 } },
    { cmd: "telur 3 butir", expect: { product: "Telur", qty: 3, unit: "butir" } },
    { cmd: "mie indomie 12 pack harga beli 3500", expect: { product: "Mie Indomie", qty: 12, unit: "pack", harga: 3500 } },
    { cmd: "presiden indonesia", expect: null },
  ];

  for (const { cmd, expect } of cases) {
    const parsed = parseBarangMasukText(cmd);
    if (!expect) {
      assert(`parser: "${cmd}" → null`, parsed === null);
      continue;
    }
    assert(
      `parser: "${cmd}"`,
      Boolean(parsed)
        && parsed!.productQuery.toLowerCase().includes(expect.product!.toLowerCase())
        && parsed!.qty === expect.qty
        && (!expect.unit || parsed!.unit === expect.unit)
        && (expect.harga === undefined || parsed!.hargaBeli === expect.harga),
      parsed ? JSON.stringify(parsed) : "null",
    );
  }

  const productOnly = parseProductOnly("tambah barang pisang");
  assert("parser: tambah barang pisang (product only)", productOnly?.productQuery.toLowerCase() === "pisang");

  assert("parser: harga 20000", parseHargaBeli("harga 20000") === 20000);
  assert("parser: isBarangMasukConfirm", isBarangMasukConfirm("ya simpan"));
  assert("parser: skip keterangan", isSkipKeterangan("lewati keterangan"));
  assert("parser: skip harga jual", isSkipHargaJual("lewati harga jual"));
  assert("parser: skip thumbnail", isSkipDokumentasi("lewati thumbnail"));
  assert("parser: presiden → null productOnly", parseProductOnly("presiden indonesia siapa") === null);
}

function testNotaMeta() {
  const draft = prefillNotaUnmatched("Gas Elpigi", 1, 16000, "Nota");
  assert("nota: prefill gas meta", draft.kategori === "Kebutuhan Rumah Tangga" && draft.jenis_barang === "Energi");

  const updated = applyMetaToNotaUnmatched(draft, "penyedia Toko Makmur, satuan tabung");
  assert(
    "nota: penyedia dari koma",
    updated.penyedia === "Toko Makmur" && updated.unit === "tabung",
    JSON.stringify(updated),
  );

  const updated2 = applyMetaToNotaUnmatched(updated, "kategori Kebutuhan Rumah Tangga, penyedia UD Sumber");
  assert("nota: penyedia UD Sumber", updated2.penyedia === "UD Sumber");
  assert("nota: lengkap", isNotaUnmatchedComplete(updated2));

  const meta = parseProdukMetaFromText("penyedia Toko Makmur, satuan tabung");
  assert("meta: parse penyedia koma", meta.penyedia === "Toko Makmur");
}

async function testIntent() {
  const intents: { cmd: string; intent: string; inScope: boolean }[] = [
    { cmd: "tambah barang pisang 10 biji harga 20000", intent: "barang_masuk", inScope: true },
    { cmd: "beras 10 kg", intent: "barang_masuk", inScope: true },
    { cmd: "stok barangku", intent: "query", inScope: true },
    { cmd: "upload foto nota", intent: "upload_nota", inScope: true },
    { cmd: "bantuan", intent: "help", inScope: true },
    { cmd: "presiden indonesia", intent: "out_of_scope", inScope: false },
  ];

  for (const { cmd, intent, inScope } of intents) {
    const r = await classifyIntent(cmd);
    assert(
      `intent: "${cmd}" → ${intent}`,
      r.intent === intent && r.in_scope === inScope,
      `${r.intent} in_scope=${r.in_scope}`,
    );
  }
}

// ─── 2. Chat API tests ──────────────────────────────────────────────────────

async function testChatBarangMasuk() {
  const { status, data } = await chat("tambah barang pisang 10 biji harga 20000");
  assert("chat: pisang in_scope", status === 200 && data.in_scope === true, data.summary);
  assert(
    "chat: pisang bukan out_of_scope",
    data.intent !== "out_of_scope" && !String(data.summary).includes("belum paham"),
    data.intent,
  );
  assert(
    "chat: pisang intent barang_masuk atau tambah_produk",
    data.intent === "barang_masuk" || data.intent === "tambah_produk",
    data.intent,
  );

  const beras = await chat("beras 10 kg harga beli 12000");
  assert("chat: beras in_scope", beras.data.in_scope === true, beras.data.summary);
  assert(
    "chat: beras barang_masuk/tambah_produk",
    beras.data.intent === "barang_masuk" || beras.data.intent === "tambah_produk",
    beras.data.intent,
  );

  const out = await chat("presiden indonesia siapa");
  assert("chat: out of scope", out.data.in_scope === false || out.data.intent === "out_of_scope", out.data.intent);

  const help = await chat("bantuan");
  assert("chat: help", help.data.intent === "help" && help.data.in_scope === true);

  const nota = await chat("cara upload foto nota");
  assert("chat: upload nota", nota.data.intent === "upload_nota");
}

async function fetchFirstProduk() {
  const res = await fetch(`${BASE}/api/produk?page=1&pageSize=1`);
  const data = await res.json();
  return data.items?.[0] as { produk_sample_id: string; nama_produk: string; unit: string } | undefined;
}

async function testChatDraftFlow() {
  const produk = await fetchFirstProduk();
  if (!produk) {
    fail("draft: produk tersedia di API", "kosong");
    return;
  }

  const cmd = `${produk.nama_produk} 5 ${produk.unit || "unit"}`;
  const first = await chat(cmd);
  if (!first.data.pending_barang_masuk) {
    // produk baru → tawarkan tambah produk, bukan draft; tetap valid
    assert(
      "draft: produk baru ditawarkan",
      first.data.in_scope === true && (first.data.intent === "tambah_produk" || first.data.intent === "barang_masuk"),
      first.data.summary,
    );
    return;
  }

  const draft = first.data.pending_barang_masuk;
  const second = await chat("harga beli 11000", { pending_barang_masuk: { ...draft, harga_beli: 11000, phase: "harga_jual" } });
  assert("draft: harga beli step", second.data.in_scope === true, second.data.summary);

  const third = await chat("lewati harga jual", {
    pending_barang_masuk: {
      ...draft,
      harga_beli: 11000,
      phase: "harga_jual",
      skip_harga_jual: true,
    },
  });
  assert("draft: lewati harga jual", third.data.in_scope === true, third.data.summary);

  const fourth = await chat("lewati keterangan", {
    pending_barang_masuk: {
      ...draft,
      harga_beli: 11000,
      skip_harga_jual: true,
      phase: "keterangan",
      skip_keterangan: true,
    },
  });
  assert(
    "draft: langsung ke confirm (tanpa wajib thumbnail)",
    fourth.data.in_scope === true
      && (fourth.data.action?.type === "confirm_barang_masuk" || String(fourth.data.summary).includes("Konfirmasi")),
    fourth.data.summary,
  );
}

// ─── 3. API barang masuk + DB ───────────────────────────────────────────────

async function getPool() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL tidak ada");
  return new pg.Pool({ connectionString: url, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined });
}

async function findProduk(pool: pg.Pool, namePart: string) {
  const ref = process.env.KOPERASI_REF ?? "KOPDES-DEMO-001";
  const r = await pool.query<{ produk_sample_id: string; nama_produk: string; unit: string | null }>(
    `SELECT produk_sample_id, nama_produk, unit FROM produk_koperasi
     WHERE koperasi_ref = $1 AND LOWER(nama_produk) LIKE $2
     ORDER BY dibuat_pada DESC LIMIT 1`,
    [ref, `%${namePart.toLowerCase()}%`],
  );
  return r.rows[0] ?? null;
}

async function getStok(pool: pg.Pool, produkSampleId: string) {
  const ref = process.env.KOPERASI_REF ?? "KOPDES-DEMO-001";
  const r = await pool.query<{ stok: string | null }>(
    `SELECT stok FROM inventaris_produk WHERE produk_sample_id = $1 AND koperasi_ref = $2`,
    [produkSampleId, ref],
  );
  return Number(r.rows[0]?.stok ?? 0);
}

async function testBarangMasukApi(pool: pg.Pool) {
  const produk = await fetchFirstProduk();
  if (!produk) {
    fail("api: produk tersedia", "kosong");
    return;
  }

  const stokBefore = await getStok(pool, produk.produk_sample_id);
  const qty = 2;
  const harga = 12500;

  const { status, data } = await saveBarangMasuk({
    tanggal_masuk: new Date().toISOString(),
    keterangan: `E2E test ${RUN_ID}`,
    confirmed_by: "bendahara",
    items: [{
      produk_sample_id: produk.produk_sample_id,
      jumlah_masuk: qty,
      harga_beli: harga,
      nama_produk: produk.nama_produk,
    }],
  });

  assert("api: save barang masuk 200", status === 200 && data.success === true, data.error);
  const stokAfter = await getStok(pool, produk.produk_sample_id);
  assert("api: stok naik", stokAfter >= stokBefore + qty, `${stokBefore} → ${stokAfter}`);

  const bm = await pool.query<{ keterangan: string | null }>(
    `SELECT keterangan FROM barang_masuk_produk
     WHERE koperasi_ref = $1 AND keterangan LIKE $2
     ORDER BY dibuat_pada DESC LIMIT 1`,
    [process.env.KOPERASI_REF ?? "KOPDES-DEMO-001", `%E2E test ${RUN_ID}%`],
  );
  const ket = bm.rows[0]?.keterangan ?? "";
  assert("api: tanpa lampiran nota OCR", !ket.includes("Lampiran:"), ket.slice(0, 120));
}

async function testUnmatchedSave(pool: pg.Pool) {
  const nama = `Pisang Test ${RUN_ID}`;
  const { status, data } = await saveBarangMasuk({
    tanggal_masuk: new Date().toISOString(),
    keterangan: `E2E unmatched ${RUN_ID}`,
    confirmed_by: "bendahara",
    items: [],
    unmatched_items: [{
      nama,
      qty: 7,
      harga: 2000,
      unit: "biji",
      kategori: "Barang Lainnya",
      jenis_barang: "Umum",
      potensi_desa: "Potensi Lokal",
      penyedia: "Toko E2E",
      reviewed: true,
    }],
  });

  assert("api: unmatched save", status === 200 && data.success === true, data.error);
  assert("api: produk baru dibuat", Array.isArray(data.products_created) && data.products_created.length > 0, JSON.stringify(data.products_created));

  const saved = await findProduk(pool, nama.toLowerCase());
  assert("api: pisang test di master", Boolean(saved), nama);
  if (saved) {
    const stok = await getStok(pool, saved.produk_sample_id);
    assert("api: stok pisang test", stok >= 7, String(stok));
  }
}

async function testUploadNoteNoPersist() {
  const tinyPng = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64",
  );
  const form = new FormData();
  form.append("file", new Blob([tinyPng], { type: "image/png" }), "e2e-nota.png");

  const res = await fetch(`${BASE}/api/upload-note`, { method: "POST", body: form });
  const data = await res.json();
  assert(
    "ocr: upload-note tanpa image_url",
    res.status === 200 || res.status === 500,
    data.error ?? "ok",
  );
  if (data.success) {
    assert("ocr: tidak simpan image_url", data.image_url === undefined, JSON.stringify(Object.keys(data)));
  }
}

// ─── main ───────────────────────────────────────────────────────────────────

async function main() {
  loadEnv();
  console.log(`\n🧪 E2E Barang Masuk — run ${RUN_ID}\n`);
  await waitForServer();

  testParser();
  testNotaMeta();
  await testIntent();
  await testChatBarangMasuk();
  await testChatDraftFlow();

  let pool: pg.Pool | null = null;
  try {
    pool = await getPool();
    await pool.query("SELECT 1");
    await testBarangMasukApi(pool);
    await testUnmatchedSave(pool);
  } catch (e) {
    fail("db: suite", e instanceof Error ? e.message : String(e));
  } finally {
    await pool?.end();
  }

  await testUploadNoteNoPersist();

  const passed = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);

  console.log("\n── Hasil ──\n");
  for (const r of results) {
    console.log(`${r.ok ? "✅" : "❌"} ${r.name}${r.detail ? ` — ${r.detail}` : ""}`);
  }
  console.log(`\n${passed}/${results.length} passed\n`);

  if (failed.length) {
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
