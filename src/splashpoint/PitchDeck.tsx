"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const IMG = {
  hero: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1600&q=80",
  problem: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=1200&q=80",
  station: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80",
  wash: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  eco: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
  city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
} as const;

function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="deck-sp-g" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#0e7490" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#deck-sp-g)" />
      <path
        d="M20 8c0 0-7 8.5-7 13.5a7 7 0 0 0 14 0C27 16.5 20 8 20 8Z"
        fill="white"
        fillOpacity="0.95"
      />
      <circle cx="20" cy="22" r="2.2" fill="#0e7490" />
    </svg>
  );
}

type SlideProps = { active: boolean };

function SlideShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col justify-center px-8 py-16 sm:px-14 lg:px-20 ${className}`}
    >
      {children}
    </div>
  );
}

function TitleSlide(_props: SlideProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image src={IMG.hero} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/95 via-teal-900/85 to-cyan-800/70" />
      <SlideShell className="relative text-white">
        <div className="flex items-center gap-3">
          <LogoMark className="h-12 w-12" />
          <span className="text-2xl font-semibold tracking-tight">SplashPoint</span>
        </div>
        <h1 className="mt-10 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Clean tumblers.
          <span className="block bg-gradient-to-r from-cyan-200 to-teal-100 bg-clip-text text-transparent">
            Anywhere you go.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-cyan-50/85">
          Self-service tumbler cleaning machines for stations, cafés & malls — scan, pay, wash in
          minutes.
        </p>
        <p className="mt-12 text-sm font-medium uppercase tracking-wider text-cyan-200/80">
          CoCreate Pitch 2026 · Jakarta Finals · 0-to-1 Startup Track
        </p>
      </SlideShell>
    </div>
  );
}

function ProblemSlide(_props: SlideProps) {
  return (
    <div className="grid h-full w-full lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image src={IMG.problem} alt="" fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-teal-950/40" />
      </div>
      <SlideShell className="bg-white">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">01 · Problem</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Tumblers are rising. Wash infrastructure is not.
        </h2>
        <ul className="mt-10 space-y-5">
          {[
            "Urban Indonesians carry personal tumblers to cut plastic — but public places rarely offer a proper wash.",
            "No soap, no bottle brush, no reliable water → light rinses that leave bacteria & coffee taste.",
            "People buy single-use drinks again — good intentions stall without convenience.",
          ].map((t) => (
            <li key={t} className="flex gap-3 text-base leading-relaxed text-slate-600 sm:text-lg">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-600" />
              {t}
            </li>
          ))}
        </ul>
      </SlideShell>
    </div>
  );
}

function SolutionSlide(_props: SlideProps) {
  return (
    <SlideShell className="bg-gradient-to-b from-[#f4fbfd] to-cyan-50">
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">02 · Solution</p>
      <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        SplashPoint — self-service tumbler wash units at high-traffic spots.
      </h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          {
            n: "01",
            title: "Scan",
            body: "QR on the unit — no app install.",
          },
          {
            n: "02",
            title: "Pay",
            body: "E-wallet / QRIS in seconds.",
          },
          {
            n: "03",
            title: "Wash",
            body: "UV or steam sanitation in minutes.",
          },
        ].map((s) => (
          <div
            key={s.n}
            className="rounded-3xl border border-cyan-900/5 bg-white p-6 shadow-lg shadow-cyan-900/5"
          >
            <p className="text-xs font-semibold text-cyan-600">Step {s.n}</p>
            <h3 className="mt-2 text-2xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{s.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-base text-slate-600 sm:text-lg">
        Hardware + software: automated wash chamber, water-efficient system, IoT monitoring for
        water use, hygiene status & machine health.
      </p>
    </SlideShell>
  );
}

function MarketSlide(_props: SlideProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image src={IMG.city} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-slate-950/85" />
      <SlideShell className="relative text-white">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">03 · Market</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Urban mobility × sustainability habit
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur">
            <p className="text-sm font-medium text-cyan-200">B2C</p>
            <p className="mt-3 text-xl font-semibold">Ages 18–40, mobile urbanites</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Office workers, students, transit riders in Jakarta, Bandung, Surabaya — people who
              already carry tumblers but lack a place to wash them.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur">
            <p className="text-sm font-medium text-cyan-200">B2B</p>
            <p className="mt-3 text-xl font-semibold">Location partners</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Mall operators, transit hubs, café networks — a tangible green amenity plus optional
              data & brand sponsorship upside.
            </p>
          </div>
        </div>
        <p className="mt-10 text-sm text-cyan-100/70">
          Category gap: no comparable self-service tumbler wash network at scale in Indonesia today.
        </p>
      </SlideShell>
    </div>
  );
}

function AdvantageSlide(_props: SlideProps) {
  const items = [
    { t: "Fast", d: "Automatic cycle in minutes — fits any commute." },
    { t: "Hygienic", d: "UV / steam sanitation, not a public-sink rinse." },
    { t: "Water-efficient", d: "Less water than manual wash; IoT-tracked." },
    { t: "Flexible revenue", d: "Pay-per-use, revenue-share, brand sponsors." },
    { t: "IoT insights", d: "Live health, usage & hygiene analytics." },
    { t: "First-mover", d: "Open field in Indonesia — network effects ahead." },
  ];
  return (
    <SlideShell className="bg-slate-950 text-white">
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
        04 · Why SplashPoint
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        Better than a rinse. Built to scale.
      </h2>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <li
            key={i.t}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-cyan-200">{i.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{i.d}</p>
          </li>
        ))}
      </ul>
    </SlideShell>
  );
}

function BusinessSlide(_props: SlideProps) {
  return (
    <SlideShell className="bg-white">
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
        05 · Business model
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        Multiple revenue layers
      </h2>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {[
          {
            title: "Pay-per-use",
            body: "End users pay per wash via QRIS / e-wallet — core consumer revenue.",
          },
          {
            title: "Location revenue-share",
            body: "Split with malls, stations & cafés hosting units — aligned incentives.",
          },
          {
            title: "Brand sponsorship",
            body: "Sustainability brands sponsor network presence & on-machine visibility.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-3xl border border-cyan-100 bg-gradient-to-b from-cyan-50 to-white p-6"
          >
            <h3 className="text-xl font-semibold text-teal-900">{c.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{c.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-base text-slate-600">
        Longer term: anonymized usage analytics for venue operators and brand partners.
      </p>
    </SlideShell>
  );
}

function ProductSlide(_props: SlideProps) {
  return (
    <div className="grid h-full w-full lg:grid-cols-2">
      <SlideShell className="bg-[#f4fbfd]">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
          06 · Product & tech
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Hardware meets digital ops
        </h2>
        <ul className="mt-10 space-y-4 text-base text-slate-600 sm:text-lg">
          {[
            "Mechatronic wash unit with UV / steam sanitation",
            "QR payment flow — e-wallet & QRIS",
            "IoT sensors: water, hygiene status, machine health",
            "Cloud dashboard for fleet monitoring",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs text-cyan-800">
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>
      </SlideShell>
      <div className="relative hidden lg:block">
        <Image src={IMG.wash} alt="" fill className="object-cover" sizes="50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10 right-10 text-white">
          <p className="text-sm font-medium text-cyan-200">Stack</p>
          <p className="mt-1 text-2xl font-semibold">Software + IoT + Mechatronics</p>
        </div>
      </div>
    </div>
  );
}

function TractionSlide(_props: SlideProps) {
  return (
    <SlideShell className="bg-gradient-to-br from-teal-900 to-cyan-950 text-white">
      <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
        07 · Traction & stage
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        Concept → prototype → pilot
      </h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { stage: "Now", title: "Validation", body: "Concept design, product architecture, team in place." },
          { stage: "Next", title: "Prototype", body: "Physical unit + payment & IoT stack for first build." },
          { stage: "Then", title: "Pilot", body: "One high-traffic location to prove usage & unit economics." },
        ].map((s) => (
          <div key={s.stage} className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-200">{s.stage}</p>
            <h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-cyan-50/75">{s.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-base text-cyan-50/80">
        Team: software / mobile / IoT + electronics mechatronics — built to ship both digital and
        physical product.
      </p>
    </SlideShell>
  );
}

function AskSlide(_props: SlideProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image src={IMG.station} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/95 via-teal-900/90 to-cyan-900/85" />
      <SlideShell className="relative text-white">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">08 · The ask</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Why CoCreate Pitch
        </h2>
        <ul className="mt-10 max-w-3xl space-y-5 text-base sm:text-lg">
          {[
            "Access Alibaba.com global sourcing & manufacturing to move from concept to mass-producible hardware.",
            "Accio Work support for business research and model validation.",
            "Exposure to investors and industry partners for prototype funding and first location deals.",
          ].map((t) => (
            <li key={t} className="flex gap-3 leading-relaxed text-cyan-50/90">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-12 text-xl font-semibold text-white sm:text-2xl">
          Help us put Indonesia&apos;s first tumbler-wash network on the map.
        </p>
      </SlideShell>
    </div>
  );
}

function ClosingSlide(_props: SlideProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image src={IMG.eco} alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950/95 via-teal-900/80 to-cyan-900/60" />
      <SlideShell className="relative items-center text-center text-white">
        <LogoMark className="mx-auto h-14 w-14" />
        <h2 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          SplashPoint
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-cyan-50/90">
          One tumbler. Every drink. All day.
        </p>
        <p className="mt-12 text-sm font-medium uppercase tracking-wider text-cyan-200/80">
          CoCreate Pitch 2026 · Jakarta
        </p>
        <a
          href="/"
          className="mt-10 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-900 hover:bg-cyan-50"
        >
          Visit website
        </a>
      </SlideShell>
    </div>
  );
}

const SLIDES: { id: string; label: string; Component: (p: SlideProps) => React.ReactNode }[] = [
  { id: "title", label: "Title", Component: TitleSlide },
  { id: "problem", label: "Problem", Component: ProblemSlide },
  { id: "solution", label: "Solution", Component: SolutionSlide },
  { id: "market", label: "Market", Component: MarketSlide },
  { id: "advantage", label: "Why us", Component: AdvantageSlide },
  { id: "business", label: "Business", Component: BusinessSlide },
  { id: "product", label: "Product", Component: ProductSlide },
  { id: "traction", label: "Stage", Component: TractionSlide },
  { id: "ask", label: "Ask", Component: AskSlide },
  { id: "close", label: "Close", Component: ClosingSlide },
];

export function PitchDeck() {
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const go = useCallback(
    (n: number) => {
      setIndex(((n % total) + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        go(0);
      } else if (e.key === "End") {
        e.preventDefault();
        go(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total]);

  const Current = SLIDES[index].Component;

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-slate-950 text-slate-900">
      <div className="h-full w-full">
        <Current active />
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 bg-gradient-to-t from-black/50 to-transparent px-4 pb-4 pt-16 sm:px-6">
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="rounded-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/60"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="rounded-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/60"
            aria-label="Next slide"
          >
            →
          </button>
          <span className="ml-2 hidden text-xs text-white/70 sm:inline">
            {SLIDES[index].label} · {index + 1}/{total} · ← → keys
          </span>
          <span className="ml-2 text-xs text-white/70 sm:hidden">
            {index + 1}/{total}
          </span>
        </div>
        <div className="pointer-events-auto flex max-w-[50%] flex-wrap justify-end gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${s.label}`}
              className={`h-2 w-2 rounded-full transition ${
                i === index ? "bg-cyan-300 scale-125" : "bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <a
          href="/"
          className="pointer-events-auto hidden rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs text-white backdrop-blur hover:bg-black/60 sm:inline"
        >
          Website
        </a>
      </div>
    </div>
  );
}
