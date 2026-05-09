import { useState } from 'react'
import { useI18n } from '../i18n.jsx'

function CarSvg({ className = '' }) {
  return (
    <svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="tBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d3036" />
          <stop offset="50%" stopColor="#0a181c" />
          <stop offset="100%" stopColor="#06090b" />
        </linearGradient>
        <linearGradient id="tGlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2dd4dc" />
          <stop offset="100%" stopColor="#14b3bd" />
        </linearGradient>
        <radialGradient id="tGround" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(45,212,220,0.4)" />
          <stop offset="100%" stopColor="rgba(45,212,220,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="400" cy="350" rx="320" ry="22" fill="url(#tGround)" />
      <rect x="630" y="135" width="120" height="14" rx="3" fill="url(#tBody)" stroke="url(#tGlow)" strokeWidth="2" />
      <rect x="640" y="155" width="100" height="6" rx="2" fill="#0c1418" stroke="#2dd4dc" strokeWidth="1" />
      <path d="M80 270 Q 200 215 350 220 L 520 220 Q 620 220 680 240 L 720 270 L 720 290 L 80 290 Z" fill="url(#tBody)" stroke="url(#tGlow)" strokeWidth="2.5" />
      <path d="M340 220 Q 360 150 420 150 Q 480 150 500 220 Z" fill="#0a1115" stroke="url(#tGlow)" strokeWidth="2" />
      <circle cx="430" cy="155" r="32" fill="#1a1f24" stroke="#2dd4dc" strokeWidth="1.5" />
      <path d="M407 158 Q 430 175 453 158 L 453 168 Q 430 180 407 168 Z" fill="#0a0f12" />
      <ellipse cx="430" cy="160" rx="18" ry="9" fill="#0a0f12" />
      <rect x="40" y="265" width="120" height="12" rx="2" fill="url(#tBody)" stroke="url(#tGlow)" strokeWidth="2" />
      <rect x="55" y="282" width="90" height="5" rx="2" fill="#0c1418" stroke="#2dd4dc" strokeWidth="0.8" />
      <path d="M250 240 L 540 240 L 560 285 L 230 285 Z" fill="#0c1418" stroke="url(#tGlow)" strokeWidth="1.5" />
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

// Generic member card with abstract silhouette + ITU shirt logo
function MemberCard({ kind = 'person', label }) {
  if (kind === 'pet') {
    return (
      <div className="aspect-[3/4] rounded-md ring-1 ring-white/10 overflow-hidden relative bg-gradient-to-br from-[#3a2a1a] to-[#1a0f08]">
        <svg viewBox="0 0 200 240" className="absolute inset-0 w-full h-full">
          <ellipse cx="100" cy="225" rx="80" ry="8" fill="rgba(45,212,220,0.15)" />
          {/* dog silhouette */}
          <path
            d="M100 100 Q 70 100 60 130 Q 55 170 75 200 L 130 200 Q 150 175 145 140 Q 140 105 110 100 Z"
            fill="#3a2a1a"
            stroke="#5a3a25"
            strokeWidth="1"
          />
          {/* head */}
          <circle cx="100" cy="105" r="32" fill="#4a3520" stroke="#6a4a30" strokeWidth="1" />
          {/* ears */}
          <path d="M75 90 L 70 70 L 88 88 Z" fill="#3a2818" />
          <path d="M125 90 L 130 70 L 112 88 Z" fill="#3a2818" />
          {/* snout */}
          <ellipse cx="100" cy="118" rx="14" ry="9" fill="#2a1a10" />
          <ellipse cx="100" cy="113" rx="3" ry="2" fill="#0a0a0a" />
          {/* eyes */}
          <circle cx="92" cy="100" r="2.5" fill="#0a0a0a" />
          <circle cx="108" cy="100" r="2.5" fill="#0a0a0a" />
        </svg>
        <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/40 tracking-widest uppercase">
          {label}
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-[3/4] rounded-md ring-1 ring-white/10 overflow-hidden relative bg-gradient-to-b from-[#1a2128] via-[#10171c] to-[#06090b] hover:ring-accent/50 transition">
      <svg viewBox="0 0 200 240" className="absolute inset-0 w-full h-full">
        {/* head */}
        <circle cx="100" cy="80" r="36" fill="#1a232c" stroke="#2a3540" strokeWidth="1" />
        {/* body / shirt */}
        <path
          d="M40 240 L 40 175 Q 50 145 90 135 Q 100 142 110 135 Q 150 145 160 175 L 160 240 Z"
          fill="#0c1318"
          stroke="#1a242c"
          strokeWidth="1"
        />
        {/* collar */}
        <path
          d="M85 138 Q 100 152 115 138 L 110 168 Q 100 175 90 168 Z"
          fill="#fff"
        />
        {/* ITU mark on shirt */}
        <text
          x="100"
          y="200"
          fontFamily="Russo One, sans-serif"
          fontSize="14"
          fill="#2dd4dc"
          textAnchor="middle"
          letterSpacing="2"
        >
          ITU
        </text>
      </svg>
      {label && (
        <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/40 tracking-widest uppercase px-1 truncate">
          {label}
        </div>
      )}
    </div>
  )
}

function Department({ title, columns = 3, members }) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2 max-w-[420px]',
    3: 'grid-cols-3 max-w-[680px]',
    5: 'grid-cols-3 sm:grid-cols-5 max-w-[1020px]',
  }[columns] || 'grid-cols-3 max-w-[680px]'

  return (
    <div className="my-12">
      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mb-6">
        {title}
      </h3>
      <div className={`grid ${colsClass} mx-auto gap-3 md:gap-4 px-4`}>
        {members.map((m, i) => (
          <MemberCard key={i} kind={m.kind} label={m.label} />
        ))}
      </div>
    </div>
  )
}

// helper to make N placeholder members
const M = (n, label) => Array.from({ length: n }, () => ({ label }))

const seasons = {
  '25-26': {
    label: '2025-2026',
    leader: 1,
    management: 9,
    controlSoftware: 3,
    electrics: [2, 5, 3],
    aerodynamics: [3, 3],
    vehicleDynamics: [3, 3],
    chassis: [3, 1],
    powertrain: [3, 1],
    organization: [3, 3],
    finance: [3, 2],
    security: 1,
  },
  '24-25': {
    label: '2024-2025',
    leader: 1,
    management: 8,
    controlSoftware: 3,
    electrics: [2, 4, 3],
    aerodynamics: [3, 3],
    vehicleDynamics: [3, 2],
    chassis: [3, 1],
    powertrain: [3, 1],
    organization: [3, 2],
    finance: [3, 2],
    security: 1,
  },
  '23-24': {
    label: '2023-2024',
    leader: 1,
    management: 7,
    controlSoftware: 3,
    electrics: [2, 3, 3],
    aerodynamics: [3, 3],
    vehicleDynamics: [3, 2],
    chassis: [3, 0],
    powertrain: [3, 1],
    organization: [3, 2],
    finance: [2, 2],
    security: 1,
  },
}

function Section({ s }) {
  const { t } = useI18n()
  const tp = t.teamPage
  return (
    <div className="max-w-5xl mx-auto px-4 pb-12">
      <Department title={tp.teamLeader} columns={1} members={M(s.leader, tp.teamLeader)} />
      <Department title={tp.management} columns={3} members={M(s.management, tp.management)} />
      <Department title={tp.controlSoftware} columns={3} members={M(s.controlSoftware, tp.controlSoftware)} />

      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mt-12 mb-6">
        {tp.electrics}
      </h3>
      <div className="space-y-4 mb-12">
        {s.electrics.map((n, i) => (
          <div key={i} className={`grid mx-auto gap-3 md:gap-4 px-4 ${
            n === 2 ? 'grid-cols-2 max-w-[460px]'
            : n === 3 ? 'grid-cols-3 max-w-[680px]'
            : n === 4 ? 'grid-cols-4 max-w-[860px]'
            : 'grid-cols-5 max-w-[1020px]'
          }`}>
            {Array.from({ length: n }).map((_, j) => (
              <MemberCard key={j} label="Electrics" />
            ))}
          </div>
        ))}
      </div>

      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mt-12 mb-6">
        {tp.aero}
      </h3>
      <div className="space-y-4 mb-12">
        {s.aerodynamics.map((n, i) => (
          <div key={i} className="grid grid-cols-3 max-w-[680px] mx-auto gap-3 md:gap-4 px-4">
            {Array.from({ length: n }).map((_, j) => <MemberCard key={j} label="Aero" />)}
          </div>
        ))}
      </div>

      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mt-12 mb-6">
        {tp.vd}
      </h3>
      <div className="space-y-4 mb-12">
        {s.vehicleDynamics.map((n, i) => (
          <div key={i} className={`grid mx-auto gap-3 md:gap-4 px-4 ${n === 2 ? 'grid-cols-2 max-w-[460px]' : 'grid-cols-3 max-w-[680px]'}`}>
            {Array.from({ length: n }).map((_, j) => <MemberCard key={j} label="VD" />)}
          </div>
        ))}
      </div>

      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mt-12 mb-6">
        {tp.chassis}
      </h3>
      <div className="space-y-4 mb-12">
        {s.chassis.map((n, i) => n === 0 ? null : (
          <div key={i} className={`grid mx-auto gap-3 md:gap-4 px-4 ${n === 1 ? 'grid-cols-1 max-w-[200px]' : 'grid-cols-3 max-w-[680px]'}`}>
            {Array.from({ length: n }).map((_, j) => <MemberCard key={j} label="Chassis" />)}
          </div>
        ))}
      </div>

      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mt-12 mb-6">
        {tp.powertrain}
      </h3>
      <div className="space-y-4 mb-12">
        {s.powertrain.map((n, i) => (
          <div key={i} className={`grid mx-auto gap-3 md:gap-4 px-4 ${n === 1 ? 'grid-cols-1 max-w-[200px]' : 'grid-cols-3 max-w-[680px]'}`}>
            {Array.from({ length: n }).map((_, j) => <MemberCard key={j} label="Powertrain" />)}
          </div>
        ))}
      </div>

      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mt-12 mb-6">
        {tp.organization}
      </h3>
      <div className="space-y-4 mb-12">
        {s.organization.map((n, i) => (
          <div key={i} className={`grid grid-cols-3 mx-auto gap-3 md:gap-4 px-4 ${n === 2 ? 'max-w-[460px] grid-cols-2' : 'max-w-[680px]'}`}>
            {Array.from({ length: n }).map((_, j) => <MemberCard key={j} label="Organization" />)}
          </div>
        ))}
      </div>

      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mt-12 mb-6">
        {tp.finance}
      </h3>
      <div className="space-y-4 mb-12">
        {s.finance.map((n, i) => (
          <div key={i} className={`grid mx-auto gap-3 md:gap-4 px-4 ${n === 2 ? 'grid-cols-2 max-w-[460px]' : 'grid-cols-3 max-w-[680px]'}`}>
            {Array.from({ length: n }).map((_, j) => <MemberCard key={j} label={tp.finance} />)}
          </div>
        ))}
      </div>

      <h3 className="text-center font-semibold text-white text-sm md:text-base tracking-widest uppercase mt-12 mb-6">
        {tp.security}
      </h3>
      <div className="grid grid-cols-1 max-w-[200px] mx-auto px-4">
        <MemberCard kind="pet" label={tp.goodBoy} />
      </div>
    </div>
  )
}

export default function TeamPage() {
  const [season, setSeason] = useState('25-26')
  const seasonKeys = Object.keys(seasons)
  const { t } = useI18n()

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative pt-28 pb-6 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <div className="w-full max-w-3xl mx-auto drop-shadow-[0_30px_60px_rgba(45,212,220,0.3)]">
            <CarSvg className="w-full h-auto" />
          </div>
          <h1 className="-mt-2 font-display text-5xl md:text-7xl tracking-wider">{t.teamPage.title}</h1>
        </div>
      </section>

      {/* Season tabs */}
      <div className="border-y border-white/10 sticky top-[68px] bg-bg/85 backdrop-blur z-30">
        <div className="max-w-3xl mx-auto px-6 flex justify-center gap-10">
          {seasonKeys.map((k) => (
            <button
              key={k}
              onClick={() => setSeason(k)}
              className={`relative py-4 text-sm md:text-base tracking-wide transition ${
                k === season ? 'text-white font-semibold' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {seasons[k].label}
              {k === season && (
                <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-10">
        <Section s={seasons[season]} />
      </div>
    </div>
  )
}
