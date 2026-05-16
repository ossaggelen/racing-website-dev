import { useState, useEffect } from 'react'
import { useI18n } from '../i18n.jsx'
import { client } from '../sanityClient.js'
import PageHero from '../components/PageHero.jsx'


// Generic member card with abstract silhouette + ITU shirt logo
function MemberCard({ kind = 'person', label }) {
  if (kind === 'pet') {
    return (
      <div className="aspect-[3/4] rounded-md ring-1 ring-white/10 overflow-hidden relative bg-gradient-to-br from-[#3a2a1a] to-[#1a0f08]">
        <svg viewBox="0 0 200 240" className="absolute inset-0 w-full h-full">
          <ellipse cx="100" cy="225" rx="80" ry="8" fill="rgba(36, 172, 183, 0.15)" />
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
          fill="#24acb7"
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
  const [heroUrl, setHeroUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`*[_type == "settings"][0]{ carsPageSymbolicHero }`)
      .then((data) => {
        if (data?.carsPageSymbolicHero?.secure_url) {
          setHeroUrl(data.carsPageSymbolicHero.secure_url)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className={`bg-bg transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <PageHero
        title={t.teamPage.title}
        maxWidth="max-w-3xl"
        titleClass="text-5xl md:text-7xl tracking-wider"
        heroUrl={heroUrl}
      />

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
