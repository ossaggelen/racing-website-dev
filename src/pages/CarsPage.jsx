import { useState } from 'react'
import { useI18n } from '../i18n.jsx'
import CarSideView from '../components/CarSideView.jsx'

const years = [2025, 2024, 2023, 2021, 2018, 2015, 2010]

// Placeholder sponsor labels — replace each with a real <img src="..." /> when logos are ready
const sponsors = {
  ana: ['BAYKAR'],
  platin: ['Aspilsan', 'İLE', 'TotalEnergies'],
  altin: ['ZY', 'V Garage', 'Güray', 'Tesla'],
  gumus: [
    'Intecro', 'Paribu Hub', 'Aydem Enerji', 'ON+',
    'GAV', 'Tulgar', 'Kale Oto Radyatör', 'Disa',
    'AlgoFact', 'Enka', 'VI-Grade',
  ],
  bronz1: [
    'Egebant', 'EPTA', 'ByNoGame', 'MSI Teknik',
    'Entek', 'InfraTron', 'Isabellenhütte', 'RenkliGara',
    'EKA', 'Autodesk', 'Borusan Boru', 'İzmir Güçlendirme',
    'FEV', 'TSKB', 'Kompozit Pazarı', 'Prime',
    'Hayper-Ex', 'Idea Form', 'Elesa+Ganter',
  ],
  bronz2: [
    'GKN Automotive', 'ON SE Kompozit', 'Exom Electronics', 'Ege Kablo',
    'FB Endüstri', 'SEGER', 'Anka', 'Exitcom',
    'Deniz Metal', 'Makromet', 'Armor Metal', 'Igus',
    'Sitis',
  ],
}

function SponsorTier({ title, items, bg, size = 'md' }) {
  const sizeClasses = {
    xl: 'text-3xl md:text-5xl px-12 py-6 min-w-[260px]',
    lg: 'text-xl md:text-2xl px-8 py-5 min-w-[180px]',
    md: 'text-sm md:text-base px-5 py-4 min-w-[120px]',
    sm: 'text-xs md:text-sm px-4 py-3 min-w-[100px]',
  }

  return (
    <section className={`${bg} py-14 px-6`}>
      <div className="max-w-6xl mx-auto">
        <h3 className="font-display text-2xl md:text-3xl text-accent tracking-wider mb-10">
          {title}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
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
    </section>
  )
}

export default function CarsPage() {
  const [activeYear, setActiveYear] = useState(2025)
  const { t } = useI18n()
  const races = ['Formula ATA', t.lang === 'en' ? 'FS Turkey' : 'FS Türkiye']
  const specs = [
    { label: t.cars.acceleration, value: '2.4 sn', sub: t.cars.accelSub },
    { label: t.cars.power, value: '80 kW', sub: '' },
    { label: t.cars.maxSpeed, value: '164 km/h', sub: '' },
    { label: t.cars.torque, value: '330 Nm', sub: '' },
  ]

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="relative pt-36 pb-8 px-6 overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-32 h-[520px] w-[820px] bg-accent/10 blur-[160px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="w-full drop-shadow-[0_40px_80px_rgba(45,212,220,0.28)]">
            <CarSideView className="w-full h-auto" />
          </div>
          <h1 className="-mt-4 md:-mt-6 font-display font-extrabold text-6xl md:text-7xl lg:text-8xl tracking-wide">
            IST{String(activeYear).slice(-2)}
          </h1>
        </div>
      </section>

      {/* Year selector */}
      <div className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center items-center gap-10 md:gap-16 overflow-x-auto scrollbar-hide">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={`relative py-5 px-1 text-base md:text-lg tracking-wide transition ${
                  y === activeYear ? 'text-white font-semibold' : 'text-white/45 hover:text-white/75'
                }`}
              >
                {y}
                {y === activeYear && (
                  <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-[3px] w-12 rounded-sm bg-red-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Track image placeholder */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto aspect-video rounded-lg overflow-hidden relative bg-gradient-to-br from-[#1a2a3a] to-[#0a1520] ring-1 ring-white/10">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Stylized track + car */}
            <svg viewBox="0 0 800 450" className="w-full h-full">
              {/* Track */}
              <rect x="0" y="350" width="800" height="100" fill="#1a2024" />
              <rect x="0" y="350" width="800" height="6" fill="#444a4f" />
              {/* Curb */}
              <g>
                {Array.from({ length: 16 }).map((_, i) => (
                  <rect key={i} x={i * 50} y="346" width="25" height="6" fill="#cf2a2a" />
                ))}
              </g>
              {/* Sky / blur */}
              <rect x="0" y="0" width="800" height="350" fill="#142028" opacity=".5" />
              {/* Car silhouette */}
              <g transform="translate(280,250)">
                <ellipse cx="120" cy="100" rx="160" ry="12" fill="rgba(45,212,220,0.25)" />
                <path d="M10 80 Q 60 50 140 55 L 220 55 Q 250 60 260 80 L 260 92 L 10 92 Z" fill="#0a1418" stroke="#2dd4dc" strokeWidth="1.5" />
                <path d="M120 55 Q 130 25 155 25 Q 180 25 190 55 Z" fill="#0a0f12" stroke="#2dd4dc" strokeWidth="1.2" />
                <circle cx="160" cy="30" r="9" fill="#2a2f34" />
                <text x="60" y="78" fontFamily="Russo One" fontSize="16" fill="#fff">133</text>
                <text x="120" y="78" fontFamily="Russo One" fontSize="11" fill="#2dd4dc">TU İSTANBUL</text>
                <circle cx="50" cy="92" r="14" fill="#0a0a0a" stroke="#444" strokeWidth="1" />
                <circle cx="220" cy="92" r="16" fill="#0a0a0a" stroke="#444" strokeWidth="1" />
              </g>
              {/* Motion blur */}
              <g opacity="0.35">
                {Array.from({ length: 8 }).map((_, i) => (
                  <line key={i} x1={i * 100} y1={290 + (i % 2) * 8} x2={i * 100 + 60} y2={290 + (i % 2) * 8} stroke="#2dd4dc" strokeWidth="1" />
                ))}
              </g>
            </svg>
          </div>
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
              <div
                className="w-0 h-0 ml-1"
                style={{
                  borderStyle: 'solid',
                  borderWidth: '10px 0 10px 16px',
                  borderColor: 'transparent transparent transparent #fff',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Yarışlar + Teknik Bilgiler */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Races */}
          <div>
            <h3 className="font-display text-accent text-sm tracking-widest mb-3">{t.cars.races}</h3>
            <div className="bg-[#0d1216] rounded-md ring-1 ring-white/5 px-6 py-5 flex flex-wrap items-center justify-center gap-10">
              {races.map((r) => (
                <div key={r} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-accent/50 flex items-center justify-center text-accent font-display text-xs">
                    FS
                  </div>
                  <span className="text-white/85 text-sm font-semibold tracking-wide">{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div>
            <h3 className="font-display text-accent text-sm tracking-widest mb-3">{t.cars.tech}</h3>
            <div className="bg-[#0d1216] rounded-md ring-1 ring-white/5 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {specs.map((s) => (
                <div key={s.label} className="p-5 text-center">
                  <p className="text-[11px] tracking-widest text-white/50 mb-2">{s.label}</p>
                  <p className="font-display text-xl md:text-2xl text-white">{s.value}</p>
                  {s.sub && <p className="text-[10px] text-white/40 mt-1">{s.sub}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#0d1216] rounded-md ring-1 ring-white/5 p-6 text-sm text-muted leading-relaxed space-y-4">
            <p>{t.cars.desc1}</p>
            <p>
              {t.cars.desc2}
              <span className="text-accent font-semibold">{t.cars.desc2Highlight}</span>
              {t.cars.desc2End}
            </p>
          </div>
        </div>
      </section>

      {/* Sponsor tiers */}
      <SponsorTier title={t.cars.tierMain} items={sponsors.ana} bg="bg-bg" size="xl" />
      <SponsorTier title={t.cars.tierPlatin} items={sponsors.platin} bg="bg-[#0c181c]" size="lg" />
      <SponsorTier title={t.cars.tierGold} items={sponsors.altin} bg="bg-[#0a1518]" size="lg" />
      <SponsorTier title={t.cars.tierSilver} items={sponsors.gumus} bg="bg-[#0c181c]" size="md" />
      <SponsorTier title={t.cars.tierBronze} items={sponsors.bronz1} bg="bg-[#0a1518]" size="sm" />
      <SponsorTier title={t.cars.tierBronze} items={sponsors.bronz2} bg="bg-[#0c181c]" size="sm" />
    </div>
  )
}
