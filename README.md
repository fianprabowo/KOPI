# Kopdes Copilot (KOPI)

AI assistant untuk petugas koperasi desa — di-embed di dashboard SIMKOPDES. Bendahara bisa catat barang masuk, upload foto nota (OCR), tambah produk baru, cek stok, dan buat laporan lewat chat.

> Dokumen produk lengkap: [`PRODUCT.md`](./PRODUCT.md)  
> Skema database: [`hackathon_2026_schema.sql`](./hackathon_2026_schema.sql)

---

## Fitur utama

| Fitur | Deskripsi |
|-------|-----------|
| **Chat barang masuk** | Input lewat kalimat natural, mis. `tambah barang pisang 10 biji harga 20000` |
| **OCR foto nota** | Upload 📷 → baca item otomatis → antrian review → simpan ke DB |
| **Tambah produk baru** | Produk belum ada di master → lengkapi meta (kategori, penyedia, satuan) lalu konfirmasi |
| **Laporan & query** | Stok, penjualan, inventaris via chat + SQL terbatas |
| **Pengajuan rekening** | Draft surat pengajuan rekening bank |
| **SIMKOPDES UI** | Daftar produk, barang masuk, form manual, embed copilot |

### Prinsip penting

- **Foto nota ≠ thumbnail produk** — OCR hanya baca data di memori; thumbnail produk opsional dan diisi manual lewat form.
- **Human-in-the-loop** — semua simpan barang masuk / tambah produk butuh konfirmasi bendahara.
- **Tanpa Gemini tetap jalan** — parser lokal + intent rules menangani alur barang masuk dasar.

---

## Tech stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Database:** PostgreSQL (`pg`)
- **AI:** Google Gemini (`@google/genai`) — chat, intent, OCR nota
- **Styling:** Tailwind CSS 4

---

## Persyaratan

- Node.js 20+
- PostgreSQL (Cloud SQL atau lokal)
- API key [Google AI Studio](https://aistudio.google.com/) (opsional tapi disarankan untuk OCR & laporan)

---

## Setup lokal

### 1. Clone & install

```bash
git clone <repo-url>
cd KOPI
npm install
```

### 2. Environment

Salin `.env.example` → `.env.local`:

```bash
cp .env.example .env.local
```

| Variabel | Wajib | Keterangan |
|----------|-------|------------|
| `DATABASE_URL` | ✅ | Connection string PostgreSQL |
| `KOPERASI_REF` | ✅ | Ref koperasi aktif, mis. `KOPDES-DEMO-001` |
| `GEMINI_API_KEY` | ⚠️ | Untuk OCR nota & laporan AI |
| `GEMINI_MODEL` | — | Default: `gemini-3.5-flash` |
| `GEMINI_VISION_MODEL` | — | Model OCR nota (default = `GEMINI_MODEL`) |
| `GEMINI_ENABLED` | — | `false` = matikan AI, parser lokal tetap jalan |

### 3. Database

Import skema (jika belum ada):

```bash
psql "$DATABASE_URL" -f hackathon_2026_schema.sql
```

### 4. Jalankan dev server

```bash
npm run dev
```

| URL | Halaman |
|-----|---------|
| [http://localhost:3000](http://localhost:3000) | Dashboard SIMKOPDES |
| [http://localhost:3000/copilot](http://localhost:3000/copilot) | Kopdes Copilot fullscreen |

---

## Cara pakai — tambah barang

### Via chat

```
tambah barang pisang 10 biji harga 20000
beras 10 kg harga beli 12000 harga jual 15000
aqua 5 galon
lewati harga jual
lewati keterangan
ya simpan
```

**Satuan yang dikenali:** `kg`, `liter`, `galon`, `buah`, `biji`, `butir`, `pack`, `dus`, `tabung`, `ikat`, `bungkus`, dan lainnya.

### Via foto nota (OCR)

1. Tap ikon **📷** di chat
2. Pilih foto nota (bisa multi-nota)
3. Review antrian **Nota OCR** — item cocok master vs produk baru
4. Lengkapi meta produk baru lewat **Edit** atau chat, mis. `penyedia Toko Makmur`
5. Tap **Review & simpan** → konfirmasi

Foto nota **tidak** otomatis jadi thumbnail produk.

### Via form manual

Menu SIMKOPDES → **Tambah barang masuk** atau prompt `Tambah barang masuk` di chat.

Field **Thumbnail produk (opsional)** — JPG/PNG/PDF, terpisah dari OCR nota.

---

## API

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `POST` | `/api/chat` | Orchestrator copilot (intent + draft + konfirmasi) |
| `GET` | `/api/produk` | Daftar produk + stok |
| `GET` / `POST` | `/api/barang-masuk` | List / simpan barang masuk |
| `POST` | `/api/upload-note` | OCR nota (in-memory, tanpa simpan file) |
| `POST` | `/api/upload-barang-masuk` | Lampiran opsional + OCR saat draft barang masuk |
| `POST` | `/api/pengajuan-rekening` | Pengajuan rekening bank |
| `GET` | `/api/health` | Health check + status DB |

### Contoh — chat

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"command":"tambah barang pisang 10 biji harga 20000"}'
```

### Contoh — simpan barang masuk

```bash
curl -X POST http://localhost:3000/api/barang-masuk \
  -H "Content-Type: application/json" \
  -d '{
    "tanggal_masuk": "2026-07-11T00:00:00.000Z",
    "keterangan": "Dari supplier Makmur",
    "confirmed_by": "bendahara",
    "items": [{
      "produk_sample_id": "PRD-001",
      "jumlah_masuk": 10,
      "harga_beli": 12000,
      "nama_produk": "Beras"
    }]
  }'
```

---

## Testing

Suite E2E untuk alur tambah barang (parser, intent, chat API, DB, OCR):

```bash
# Pastikan dev server sudah jalan
npm run dev

# Terminal lain
npm run test:e2e:barang-masuk
```

Jika dev server di port lain:

```bash
E2E_BASE_URL=http://localhost:3001 npx tsx scripts/e2e-barang-masuk.ts
```

**46 case** mencakup: parser satuan (`biji`, `tabung`, …), intent `tambah barang`, draft multi-step, simpan API + verifikasi stok, meta nota OCR, upload tanpa `image_url`.

---

## Deploy (Vercel)

1. Set environment variables di Vercel (sama seperti `.env.local`)
2. `DATABASE_URL` harus bisa diakses dari Vercel (allowlist IP / SSL)
3. **Filesystem read-only** di Vercel — upload file hanya ke disk di lingkungan lokal; production OCR tidak menyimpan file nota ke disk
4. Thumbnail produk: simpan lewat form saat deploy, atau integrasikan Vercel Blob / S3 jika butuh persistensi gambar

```bash
npm run build
```

---

## Struktur proyek

```
src/
├── app/                    # Next.js routes & API
│   ├── api/chat/           # Chat orchestrator
│   ├── api/barang-masuk/   # CRUD barang masuk
│   ├── api/upload-note/    # OCR nota
│   └── copilot/            # Halaman copilot
├── components/copilot/     # Sidebar, form, antrian nota, konfirmasi
├── lib/
│   ├── copilot.ts          # Orchestrator utama
│   ├── parse-barang-masuk.ts
│   ├── intent.ts           # Klasifikasi intent
│   ├── nota-queue.ts       # Antrian & meta produk baru
│   ├── vision.ts           # Gemini OCR
│   └── produk-meta.ts      # Inferensi kategori/jenis
└── simkopdes/              # UI dashboard SIMKOPDES
scripts/
└── e2e-barang-masuk.ts     # Automated tests
```

---

## Scripts npm

| Command | Fungsi |
|---------|--------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Jalankan build production |
| `npm run lint` | ESLint |
| `npm run test:e2e:barang-masuk` | E2E test tambah barang |

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| `belum paham maksudnya` saat tambah barang | Pastikan ada **jumlah + satuan**, mis. `10 biji`, `5 kg` |
| OCR nota gagal | Cek `GEMINI_API_KEY`, kuota API, dan `GEMINI_VISION_MODEL` |
| `EROFS` saat upload di Vercel | Normal — OCR tidak simpan file; hanya baca di memori |
| Chat lambat / timeout | Cek koneksi `DATABASE_URL`; query laporan bisa butuh Gemini |
| Port 3000 sibuk | Next.js pakai 3001 — sesuaikan `E2E_BASE_URL` saat test |

---

## Lisensi

Private — Hackathon Digital Cooperative 2026.
