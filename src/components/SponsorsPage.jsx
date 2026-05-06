import { useI18n } from '../i18n.jsx'

function CarSvg({ className = '' }) {
  return (
    <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="spBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d3036" />
          <stop offset="50%" stopColor="#0a181c" />
          <stop offset="100%" stopColor="#06090b" />
        </linearGradient>
        <linearGradient id="spGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2dd4dc" />
          <stop offset="100%" stopColor="#14b3bd" />
        </linearGradient>
        <radialGradient id="spGround" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(45,212,220,0.4)" />
          <stop offset="100%" stopColor="rgba(45,212,220,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="400" cy="350" rx="320" ry="22" fill="url(#spGround)" />
      <rect x="630" y="135" width="120" height="14" rx="3" fill="url(#spBody)" stroke="url(#spGlow)" strokeWidth="2" />
      <rect x="640" y="155" width="100" height="6" rx="2" fill="#0c1418" stroke="#2dd4dc" strokeWidth="1" />
      <path d="M80 270 Q 200 215 350 220 L 520 220 Q 620 220 680 240 L 720 270 L 720 290 L 80 290 Z" fill="url(#spBody)" stroke="url(#spGlow)" strokeWidth="2.5" />
      <path d="M340 220 Q 360 150 420 150 Q 480 150 500 220 Z" fill="#0a1115" stroke="url(#spGlow)" strokeWidth="2" />
      <circle cx="430" cy="155" r="32" fill="#1a1f24" stroke="#2dd4dc" strokeWidth="1.5" />
      <path d="M407 158 Q 430 175 453 158 L 453 168 Q 430 180 407 168 Z" fill="#0a0f12" />
      <ellipse cx="430" cy="160" rx="18" ry="9" fill="#0a0f12" />
      <rect x="40" y="265" width="120" height="12" rx="2" fill="url(#spBody)" stroke="url(#spGlow)" strokeWidth="2" />
      <rect x="55" y="282" width="90" height="5" rx="2" fill="#0c1418" stroke="#2dd4dc" strokeWidth="0.8" />
      <path d="M250 240 L 540 240 L 560 285 L 230 285 Z" fill="#0c1418" stroke="url(#spGlow)" strokeWidth="1.5" />
      <text x="400" y="270" fontFamily="Russo One, sans-serif" fontSize="22" fill="#2dd4dc" textAnchor="middle" letterSpacing="2">TU ISTANBUL</text>
      <circle cx="180" cy="295" r="42" fill="#0a0a0a" stroke="#2dd4dc" strokeWidth="2" />
      <circle cx="180" cy="295" r="22" fill="#1a1a1a" stroke="#2dd4dc" strokeWidth="1" />
      <circle cx="180" cy="295" r="6" fill="#2dd4dc" />
      <circle cx="640" cy="295" r="48" fill="#0a0a0a" stroke="#2dd4dc" strokeWidth="2" />
      <circle cx="640" cy="295" r="26" fill="#1a1a1a" stroke="#2dd4dc" strokeWidth="1" />
      <circle cx="640" cy="295" r="7" fill="#2dd4dc" />
      <path d="M90 268 Q 200 215 360 215" stroke="#2dd4dc" strokeWidth="2" fill="none" opacity=".9" />
      <path d="M520 218 Q 600 220 670 240" stroke="#ff3aa8" strokeWidth="2" fill="none" opacity=".7" />
    </svg>
  )
}

function SponsorTier({ title, items, size = 'md' }) {
  const sizeClasses = {
    xl: 'text-2xl md:text-4xl px-12 py-6 min-w-[260px]',
    lg: 'text-lg md:text-2xl px-8 py-5 min-w-[180px]',
    md: 'text-sm md:text-base px-6 py-4 min-w-[140px]',
  }
  return (
    <section className="relative py-14 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="max-w-5xl mx-auto">
        <h3 className="font-display text-xl md:text-2xl text-accent tracking-[0.3em] mb-10">
          {title}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {items.map((name) => (
            <div
              key={name}
              className={`${sizeClasses[size]} bg-white/[0.04] border border-white/10 rounded text-white/90 font-semibold tracking-wide flex items-center justify-center hover:border-accent/60 hover:bg-white/[0.07] transition`}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  )
}

export default function SponsorsPage() {
  const { t } = useI18n()
  const sp = t.sponsorsPage

  const benefits = [
    { n: '1', title: sp.sec1, items: [sp.sec1a, sp.sec1b, sp.sec1c] },
    { n: '2', title: sp.sec2, items: [sp.sec2a, sp.sec2b, sp.sec2c] },
    { n: '3', title: sp.sec3, items: [sp.sec3a, sp.sec3b] },
    { n: '4', title: sp.sec4, items: [sp.sec4a] },
    { n: '5', title: sp.sec5, items: [sp.sec5a] },
    { n: '6', title: sp.sec6, items: [sp.sec6a, sp.sec6b] },
  ]

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative pt-28 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="w-full max-w-3xl mx-auto drop-shadow-[0_30px_60px_rgba(45,212,220,0.3)]">
            <CarSvg className="w-full h-auto" />
          </div>
          <h1 className="-mt-2 font-display text-5xl md:text-7xl tracking-wider">{sp.title}</h1>
          <p className="mt-6 text-accent font-semibold tracking-wide text-base md:text-xl uppercase">
            {sp.subtitle}
          </p>
        </div>
      </section>

      {/* Intro / thank-you copy */}
      <section className="px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-4 text-sm md:text-base text-muted leading-relaxed">
          <p>{sp.intro1}</p>
          <p>{sp.intro2}</p>
          <ul className="space-y-1">
            <li>
              {sp.bullet1Pre}<span className="text-accent font-semibold">{sp.bullet1Hl}</span>
            </li>
            <li>
              {sp.bullet2Pre}<span className="text-accent font-semibold">{sp.bullet2Hl}</span>
            </li>
            <li>
              {sp.bullet3Pre}<span className="text-accent font-semibold">{sp.bullet3Hl}</span>
            </li>
          </ul>
          <p>{sp.intro3}</p>
        </div>
      </section>

      {/* Sponsor tiers */}
      <SponsorTier title={sp.tierPlatinum} items={['1773 TTO']} size="xl" />
      <SponsorTier
        title={sp.tierSilver}
        items={['ON+', 'Aydem Enerji', 'KISSsoft', 'Makromet', 'MSI Teknik']}
        size="lg"
      />
      <SponsorTier
        title={sp.tierBronze}
        items={['Deniz Metal', 'Online Lazer Kesim', 'Egebant', 'GAV', 'TSKB']}
        size="md"
      />
      <SponsorTier
        title={sp.tierSupporters}
        items={['Boneyref', 'Exom Electronics', 'Chalky', 'Yıldız Ağaç İzolasyon', 'Yenmak Engine Parts']}
        size="md"
      />

      {/* Benefits intro */}
      <section className="px-6 pt-20 pb-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl text-accent tracking-wide leading-snug">
            {sp.cta}
          </h2>
        </div>
      </section>

      {/* Benefits list */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {benefits.map((b) => (
            <div key={b.n}>
              <p className="text-xs tracking-widest text-white/50 mb-2">{b.n}.</p>
              <h3 className="font-display text-xl md:text-2xl text-accent tracking-wide mb-5">
                {b.title}
              </h3>
              <div className="space-y-5">
                {b.items.map((it) => (
                  <div key={it.t}>
                    <p className="font-semibold text-white text-sm md:text-base mb-1">{it.t}:</p>
                    <p className="text-sm text-muted leading-relaxed max-w-2xl">{it.p}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 h-px bg-white/5" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
