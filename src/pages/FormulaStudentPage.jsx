import { useI18n } from '../i18n.jsx'

function CarSvg({ className = '' }) {
  return (
    <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="fsBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d3036" />
          <stop offset="50%" stopColor="#0a181c" />
          <stop offset="100%" stopColor="#06090b" />
        </linearGradient>
        <linearGradient id="fsGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2dd4dc" />
          <stop offset="100%" stopColor="#14b3bd" />
        </linearGradient>
        <radialGradient id="fsGround" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(45,212,220,0.4)" />
          <stop offset="100%" stopColor="rgba(45,212,220,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="400" cy="350" rx="320" ry="22" fill="url(#fsGround)" />
      <rect x="630" y="135" width="120" height="14" rx="3" fill="url(#fsBody)" stroke="url(#fsGlow)" strokeWidth="2" />
      <rect x="640" y="155" width="100" height="6" rx="2" fill="#0c1418" stroke="#2dd4dc" strokeWidth="1" />
      <path d="M80 270 Q 200 215 350 220 L 520 220 Q 620 220 680 240 L 720 270 L 720 290 L 80 290 Z" fill="url(#fsBody)" stroke="url(#fsGlow)" strokeWidth="2.5" />
      <path d="M340 220 Q 360 150 420 150 Q 480 150 500 220 Z" fill="#0a1115" stroke="url(#fsGlow)" strokeWidth="2" />
      <circle cx="430" cy="155" r="32" fill="#1a1f24" stroke="#2dd4dc" strokeWidth="1.5" />
      <path d="M407 158 Q 430 175 453 158 L 453 168 Q 430 180 407 168 Z" fill="#0a0f12" />
      <ellipse cx="430" cy="160" rx="18" ry="9" fill="#0a0f12" />
      <rect x="40" y="265" width="120" height="12" rx="2" fill="url(#fsBody)" stroke="url(#fsGlow)" strokeWidth="2" />
      <rect x="55" y="282" width="90" height="5" rx="2" fill="#0c1418" stroke="#2dd4dc" strokeWidth="0.8" />
      <path d="M250 240 L 540 240 L 560 285 L 230 285 Z" fill="#0c1418" stroke="url(#fsGlow)" strokeWidth="1.5" />
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

function PhotoPlaceholder({ ratio = 'aspect-video', label, className = '' }) {
  return (
    <div
      className={`${ratio} ${className} rounded-md ring-1 ring-white/10 overflow-hidden relative bg-gradient-to-br from-[#1a2530] to-[#0a131a]`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(45,212,220,0.08) 0 2px, transparent 2px 8px)',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white/30 text-xs tracking-widest uppercase">{label}</span>
      </div>
    </div>
  )
}

function StaticEventBlock({ title, imageSide = 'none', children }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-start py-6">
      {imageSide === 'left' && <PhotoPlaceholder label={title} />}
      <div className={imageSide === 'right' ? 'md:text-right md:order-2' : ''}>
        <h3
          className={`font-semibold text-2xl md:text-3xl mb-4 ${
            imageSide === 'right' ? 'md:text-right' : ''
          }`}
        >
          {title}
        </h3>
        <p className="text-sm md:text-base text-muted leading-relaxed max-w-xl">
          {children}
        </p>
      </div>
      {imageSide === 'right' && <PhotoPlaceholder label={title} className="md:order-1" />}
    </div>
  )
}

export default function FormulaStudentPage() {
  const { t } = useI18n()
  const fp = t.fsPage
  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="w-full max-w-3xl mx-auto drop-shadow-[0_30px_60px_rgba(45,212,220,0.3)]">
            <CarSvg className="w-full h-auto" />
          </div>
          <h1 className="mt-2 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider">
            {fp.title}
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm md:text-base text-muted leading-relaxed">{fp.intro}</p>
        </div>
      </section>

      {/* Team photo */}
      <section className="px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <PhotoPlaceholder ratio="aspect-[16/9]" label={fp.teamReveal} />
        </div>
      </section>

      {/* Static Events */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl text-accent tracking-wide mb-2">
            {fp.static}
          </h2>

          <div className="mt-8 space-y-2">
            <div className="py-6">
              <h3 className="font-semibold text-2xl md:text-3xl mb-4">{fp.bp.t}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed max-w-3xl">{fp.bp.p}</p>
            </div>

            <StaticEventBlock title={fp.cm.t} imageSide="right">
              {fp.cm.p}
            </StaticEventBlock>

            <div className="py-6">
              <h3 className="font-semibold text-2xl md:text-3xl mb-4">{fp.ed.t}</h3>
              <p className="text-sm md:text-base text-muted leading-relaxed max-w-3xl">{fp.ed.p}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Events */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl text-accent tracking-wide mb-2">
            {fp.dynamic}
          </h2>

          <div className="mt-8 space-y-6">
            <StaticEventBlock title={fp.ac.t} imageSide="left">{fp.ac.p}</StaticEventBlock>
            <StaticEventBlock title={fp.sk.t} imageSide="left">{fp.sk.p}</StaticEventBlock>
            <StaticEventBlock title={fp.au.t} imageSide="right">{fp.au.p}</StaticEventBlock>
            <StaticEventBlock title={fp.en.t} imageSide="right">{fp.en.p}</StaticEventBlock>
          </div>
        </div>
      </section>
    </div>
  )
}
