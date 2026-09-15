import Image from "next/image";

const IMG = {
  hero: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1600&q=80",
  problem: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=1200&q=80",
  station: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1000&q=80",
  cafe: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80",
  mall: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80",
  wash: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  eco: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
  city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1600&q=80",
} as const;

const STEPS = [
  {
    n: "01",
    title: "Scan",
    body: "Find a SplashPoint unit and scan the QR code — no app install required.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
        <path
          d="M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Pay",
    body: "Pay in seconds with e-wallet or QRIS — frictionless for every commute.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.75" />
        <path d="M7 15h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Wash",
    body: "UV or steam sanitation finishes in minutes — clean, water-efficient, ready to refill.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
        <path
          d="M12 3c0 0-5 6.2-5 10a5 5 0 0 0 10 0c0-3.8-5-10-5-10Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M10 14.5c.5 1 1.5 1.5 2.5 1.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

const ADVANTAGES = [
  {
    title: "Minutes, not hassle",
    body: "Fully automatic wash cycle that fits between trains, meetings, and coffee runs.",
    icon: "⚡",
  },
  {
    title: "Truly hygienic",
    body: "UV or steam sanitation — not a public-sink rinse. Cleanliness you can trust.",
    icon: "✦",
  },
  {
    title: "Water-efficient",
    body: "Uses far less water than a manual wash, tracked live via onboard IoT sensors.",
    icon: "💧",
  },
  {
    title: "Flexible revenue",
    body: "Pay-per-use, location revenue-share, and brand sustainability sponsorships.",
    icon: "◈",
  },
  {
    title: "IoT insights",
    body: "Real-time water use, hygiene status, and machine health — ready for analytics partners.",
    icon: "◎",
  },
  {
    title: "First-mover",
    body: "No comparable self-service tumbler network operating at scale in Indonesia today.",
    icon: "★",
  },
] as const;

const LOCATIONS = [
  {
    title: "Transit hubs",
    body: "Train stations & bus stops where riders need a quick, hygienic reset.",
    img: IMG.station,
    alt: "Modern transit station platform",
  },
  {
    title: "Cafés",
    body: "Switch from coffee to water without lingering taste — keep one tumbler all day.",
    img: IMG.cafe,
    alt: "Café interior with natural light",
  },
  {
    title: "Malls & campuses",
    body: "High-footfall amenity that proves a location’s sustainability story.",
    img: IMG.mall,
    alt: "Bright shopping mall atrium",
  },
] as const;

const STATS = [
  { value: "Minutes", label: "Average wash cycle" },
  { value: "QRIS", label: "E-wallet ready" },
  { value: "IoT", label: "Live machine health" },
  { value: "0→1", label: "Category pioneer" },
] as const;

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <defs>
        <linearGradient id="sp-g" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#0e7490" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#sp-g)" />
      <path
        d="M20 8c0 0-7 8.5-7 13.5a7 7 0 0 0 14 0C27 16.5 20 8 20 8Z"
        fill="white"
        fillOpacity="0.95"
      />
      <circle cx="20" cy="22" r="2.2" fill="#0e7490" />
    </svg>
  );
}

export function SplashPointLanding() {
  return (
    <div className="bg-[#f4fbfd] text-slate-900">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-cyan-900/5 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <a href="#top" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-lg font-semibold tracking-tight text-slate-900">SplashPoint</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            <a href="#problem" className="transition hover:text-cyan-700">
              Problem
            </a>
            <a href="#how" className="transition hover:text-cyan-700">
              How it works
            </a>
            <a href="#locations" className="transition hover:text-cyan-700">
              Locations
            </a>
            <a href="#advantages" className="transition hover:text-cyan-700">
              Why us
            </a>
            <a href="#story" className="transition hover:text-cyan-700">
              Story
            </a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-gradient-to-r from-cyan-600 to-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-700/20 transition hover:from-cyan-500 hover:to-teal-600"
          >
            Partner with us
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={IMG.hero}
              alt="Reusable tumbler with fresh water"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/90 via-teal-900/75 to-cyan-800/55" />
            <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-300/15 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-28 lg:pt-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-100 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Hardware + Software · Jakarta Finals
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Clean tumblers.
                <span className="block bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                  Anywhere you go.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-cyan-50/90 sm:text-lg">
                Self-service tumbler cleaning at stations, cafés, and malls. Scan, pay with QRIS,
                and get UV or steam sanitation in minutes — so one tumbler lasts your whole day.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#how"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-900 shadow-xl shadow-black/10 transition hover:bg-cyan-50"
                >
                  See how it works
                </a>
                <a
                  href="#contact"
                  className="rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Get in touch
                </a>
              </div>
            </div>

            {/* Product card */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-300/30 to-teal-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl shadow-black/30 backdrop-blur-md">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={IMG.wash}
                    alt="Precision hardware and digital systems"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 90vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/90 via-teal-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 text-white">
                    <p className="text-xs font-medium uppercase tracking-wider text-cyan-200">
                      Onboard IoT
                    </p>
                    <p className="text-lg font-semibold leading-snug">
                      Live monitoring of water use, hygiene status & machine health
                    </p>
                    <div className="flex gap-2 pt-1">
                      {["UV", "Steam", "QRIS"].map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="relative z-10 -mt-10 px-5">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 rounded-3xl border border-cyan-900/5 bg-white p-4 shadow-xl shadow-cyan-900/5 sm:grid-cols-4 sm:gap-0 sm:p-2">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-2xl px-4 py-5 text-center sm:py-6 ${
                  i > 0 ? "sm:border-l sm:border-slate-100" : ""
                }`}
              >
                <p className="text-xl font-semibold tracking-tight text-teal-800 sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
            <div className="relative order-2 overflow-hidden rounded-[1.75rem] shadow-2xl shadow-cyan-900/10 lg:order-1">
              <div className="relative aspect-[4/3]">
                <Image
                  src={IMG.problem}
                  alt="Single-use plastic bottles representing the waste problem"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/40 bg-white/90 p-4 backdrop-blur">
                <p className="text-sm font-semibold text-teal-900">The infrastructure gap</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  People bring tumblers — but public places rarely offer a proper wash.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
                The problem
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Good intentions stall without a place to wash.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  Urban Indonesians increasingly carry personal tumblers to cut plastic waste. Outside
                  the home, soap, bottle brushes, and reliable water are scarce — so bottles get a
                  light rinse, or people buy single-use drinks again.
                </p>
                <p>
                  Switching from morning coffee to plain water leaves taste and smell behind. One
                  tumbler should be enough for the whole day. Today, it usually isn&apos;t.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {[
                  "No hygienic public wash points for tumblers",
                  "Manual rinse ≠ sanitation — bacteria & residue remain",
                  "Sustainability habits break without convenience",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-xs text-cyan-800">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="relative overflow-hidden bg-gradient-to-b from-white to-cyan-50/60 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Three steps. Minutes to clean.
              </h2>
              <p className="mt-4 text-slate-600">
                Self-service units at high-traffic spots. IoT keeps every machine healthy and
                accountable.
              </p>
            </div>

            <ol className="mt-14 grid gap-6 lg:grid-cols-3">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="group relative overflow-hidden rounded-3xl border border-cyan-900/5 bg-white p-8 shadow-lg shadow-cyan-900/5 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-50 transition group-hover:bg-cyan-100" />
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-teal-700 text-white shadow-lg shadow-cyan-700/25">
                      {s.icon}
                    </div>
                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-cyan-600">
                      Step {s.n}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="relative mt-14 overflow-hidden rounded-[1.75rem]">
              <div className="relative aspect-[21/9] min-h-[200px]">
                <Image
                  src={IMG.eco}
                  alt="Hands holding a reusable bottle in a green outdoor setting"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-950/85 via-teal-900/60 to-transparent" />
                <div className="absolute inset-0 flex items-center p-8 sm:p-12">
                  <div className="max-w-md text-white">
                    <p className="text-sm font-medium uppercase tracking-wider text-cyan-200">
                      The outcome
                    </p>
                    <p className="mt-2 text-2xl font-semibold leading-snug sm:text-3xl">
                      One tumbler. Every drink. All day.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-cyan-50/85">
                      Carry less. Waste less. Stay hygienic between coffee, water, and everything in
                      between.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locations / market */}
        <section id="locations" className="py-24">
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
                  Where we play
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Built for urban mobility
                </h2>
                <p className="mt-4 text-slate-600">
                  B2C: professionals & students 18–40 in Jakarta, Bandung, Surabaya. B2B: malls,
                  transit operators, and café networks that want a tangible green amenity.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-600"
              >
                Become a location partner
                <span aria-hidden>→</span>
              </a>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {LOCATIONS.map((loc) => (
                <article
                  key={loc.title}
                  className="group overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-md shadow-slate-900/5"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <Image
                      src={loc.img}
                      alt={loc.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{loc.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{loc.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section id="advantages" className="bg-slate-950 py-24 text-white">
          <div className="mx-auto max-w-6xl px-5">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">
                Why SplashPoint
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                More than a rinse. A network.
              </h2>
              <p className="mt-4 text-slate-300">
                Faster than improvising at a sink. Cleaner than a quick splash. Designed to scale
                across Indonesia&apos;s densest cities.
              </p>
            </div>

            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ADVANTAGES.map((a) => (
                <li
                  key={a.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-cyan-400/30 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/15 text-lg text-cyan-300">
                    {a.icon}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Story */}
        <section id="story" className="py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
                Our story
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Born from a dirty tumbler on a long day out.
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
                <p>
                  SplashPoint started from a simple frustration: after coffee in the morning, there
                  was nowhere clean to wash a tumbler before refilling with water. Public sinks
                  weren&apos;t enough. Buying another bottle defeated the point.
                </p>
                <p>
                  We pair software & payment systems with mechatronics hardware — a team built to
                  take the idea from concept to a physical prototype and a first pilot location in
                  Indonesia.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-cyan-100 bg-cyan-50/80 p-5">
                  <p className="text-2xl font-semibold text-teal-800">Software</p>
                  <p className="mt-1 text-xs text-slate-600">Payments · IoT · mobile</p>
                </div>
                <div className="rounded-2xl border border-teal-100 bg-teal-50/80 p-5">
                  <p className="text-2xl font-semibold text-teal-800">Hardware</p>
                  <p className="mt-1 text-xs text-slate-600">Mechatronics · sanitation</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl shadow-cyan-900/10">
              <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={IMG.city}
                  alt="Jakarta city skyline representing urban launch markets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-6 text-white sm:p-8">
                  <p className="text-sm font-medium text-cyan-200">Stage</p>
                  <p className="mt-1 text-xl font-semibold">
                    Concept validation · prototype design · seeking manufacturing partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="px-5 pb-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem]">
            <div className="absolute inset-0">
              <Image
                src={IMG.station}
                alt="Busy urban transit environment"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/95 via-teal-900/90 to-cyan-800/85" />
            </div>
            <div className="relative grid gap-10 px-8 py-16 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-20">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Let&apos;s build Indonesia&apos;s tumbler wash network.
                </h2>
                <p className="mt-4 max-w-xl text-cyan-50/85">
                  Looking for manufacturing, sourcing, and location partners — plus anyone who wants
                  to bring SplashPoint to their venue. CoCreate Pitch 2026 · Jakarta Finals.
                </p>
              </div>
              <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
                <p className="text-sm font-medium text-cyan-100">Partnerships</p>
                <p className="mt-3 text-lg font-semibold leading-snug text-white">
                  Manufacturing, sourcing & venue partners welcome
                </p>
                <p className="mt-4 text-sm leading-relaxed text-cyan-100/70">
                  CoCreate Pitch 2026 · Jakarta Finals · 0-to-1 Startup Track
                </p>
                <a
                  href="#how"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-teal-900 transition hover:bg-cyan-50"
                >
                  Explore SplashPoint
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" />
            <div>
              <p className="font-semibold text-slate-900">SplashPoint</p>
              <p className="text-xs text-slate-500">Self-service tumbler cleaning</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-slate-500">
            <a href="#problem" className="hover:text-teal-700">
              Problem
            </a>
            <a href="#how" className="hover:text-teal-700">
              How it works
            </a>
            <a href="#locations" className="hover:text-teal-700">
              Locations
            </a>
            <a href="#contact" className="hover:text-teal-700">
              Contact
            </a>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} SplashPoint. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
