import { useState, useEffect, useRef } from 'react'
import { useI18n } from '../i18n.jsx'
import CarSideView from './CarSideView.jsx'
import { client, urlFor } from '../sanityClient.js'
import { PortableText } from '@portabletext/react'

function SponsorTier({ title, items, bg, size = 'md' }) {
  const sizeClasses = {
    xl: 'text-3xl md:text-5xl px-12 py-6 min-w-[260px]',
    lg: 'text-xl md:text-2xl px-8 py-5 min-w-[180px]',
    md: 'text-sm md:text-base px-5 py-4 min-w-[120px]',
    sm: 'text-xs md:text-sm px-4 py-3 min-w-[100px]',
  }

  if (!items || items.length === 0) return null;

  return (
    <section className={`${bg} py-14 px-6`}>
      <div className="max-w-6xl mx-auto">
        <h3 className="font-display text-2xl md:text-3xl text-accent tracking-wider mb-10 text-center uppercase">
          {title}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {items.map((logoItem, idx) => (
            <div
              key={idx}
              className={`${sizeClasses[size]} bg-white/[0.04] border border-white/10 rounded flex items-center justify-center hover:border-accent/60 hover:bg-white/[0.07] transition`}
            >
              {logoItem.secure_url ? (
                <img src={logoItem.secure_url} alt="Sponsor Logo" className="max-h-full max-w-full object-contain mix-blend-screen" />
              ) : (
                <span className="text-white/50 text-xs">Logo Yok</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScrollableGallery({ images }) {
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const percentage = Math.max(0, Math.min(1, x / width))
    
    const scrollWidth = containerRef.current.scrollWidth
    const maxScroll = scrollWidth - width
    
    containerRef.current.scrollTo({
      left: maxScroll * percentage,
      behavior: 'auto'
    })
  }

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="w-full relative overflow-hidden rounded-xl ring-1 ring-white/10 cursor-ew-resize group mt-4"
      onMouseMove={handleMouseMove}
    >
      <div 
        ref={containerRef}
        className="flex overflow-x-hidden w-full h-32 md:h-48"
        style={{ scrollBehavior: 'auto' }}
      >
        {images.map((img, i) => (
          <img 
            key={i} 
            src={img.secure_url} 
            alt={`Gallery item ${i}`}
            className="h-full w-auto object-cover flex-shrink-0 border-r border-white/5"
            draggable="false"
          />
        ))}
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white/80 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Kaydırmak için imleci hareket ettirin
        </div>
      )}
    </div>
  )
}

export default function CarsPage() {
  const { t, lang } = useI18n()
  const [vehicles, setVehicles] = useState([])
  const [settings, setSettings] = useState(null)
  const [activeYear, setActiveYear] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lineJunction, setLineJunction] = useState(50)
  const timelineRef = useRef(null)

  useEffect(() => {
    if (timelineRef.current) {
      const activeButton = timelineRef.current.querySelector('[data-active="true"]')
      if (activeButton) {
        const containerRect = timelineRef.current.getBoundingClientRect()
        const buttonRect = activeButton.getBoundingClientRect()
        const buttonCenter = (buttonRect.left - containerRect.left) + (buttonRect.width / 2)
        const percentage = (buttonCenter / containerRect.width) * 100
        setLineJunction(percentage)
      }
    }
  }, [activeYear, vehicles])

  const getLoc = (obj) => {
    if (!obj) return ''
    if (typeof obj === 'string') return obj
    // If it's an array (like a normal block without translation), just return it
    if (Array.isArray(obj)) return obj
    return obj[lang] || obj.tr || ''
  }

  // Fallback mock data in case Sanity is empty
  const mockVehicles = [
    {
      name: 'IST25',
      year: 2025,
      races: [{ name: 'Formula ATA 2025' }],
      specs: [
        { label: {tr: 'AĞIRLIK', en: 'WEIGHT'}, value: '200 kg' },
        { label: {tr: 'GÜÇ', en: 'POWER'}, value: '80 kW' },
        { label: {tr: 'MAX. HIZ', en: 'TOP SPEED'}, value: '120 km/h' },
      ],
      description: { tr: [{ _type: 'block', children: [{ _type: 'span', text: 'IST25 Mock Verisi (Sanity boş olduğunda gösterilir).' }] }] },
      sponsorTiers: []
    },
    {
      name: 'BEELECTRIC02',
      year: 2023,
      races: [{ name: 'Formula STUDENT EAST 2023' }, { name: 'Formula Student CZECH 2022' }],
      specs: [
        { label: {tr: 'HIZLANMA', en: 'ACCELERATION'}, value: '2.4 sn' },
        { label: {tr: 'GÜÇ', en: 'POWER'}, value: '80 kw' },
        { label: {tr: 'MAX. HIZ', en: 'TOP SPEED'}, value: '164 km/h' },
        { label: {tr: 'TORK', en: 'TORQUE'}, value: '330 nm' },
      ],
      description: { tr: [{ _type: 'block', children: [{ _type: 'span', text: 'Beelectric 02 mock verisi.' }] }] },
      sponsorTiers: []
    }
  ]

  // Start with mock data so page loads instantly (no 3 second blank screen)
  useEffect(() => {
    setVehicles(mockVehicles)
    setActiveYear(mockVehicles[0].year)
    
    // Fetch real data and settings in background
    Promise.all([
      client.fetch(`*[_type == "vehicle"] | order(year desc)`),
      client.fetch(`*[_type == "settings"][0]`)
    ]).then(([vehiclesData, settingsData]) => {
      if (vehiclesData && vehiclesData.length > 0) {
        setVehicles(vehiclesData)
        // Only update active year if we are still on the initial load state 
        // to prevent interrupting user interaction
        setActiveYear(vehiclesData[0].year)
      }
      if (settingsData) {
        setSettings(settingsData)
      }
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  const currentVehicles = vehicles.length > 0 ? vehicles : mockVehicles
  const activeVehicle = currentVehicles.find(v => v.year === activeYear) || currentVehicles[0]
  const yearsList = currentVehicles.map(v => v.year)

  // Map sponsor backgrounds based on index to create gradient bands like in the screenshot
  const sponsorBgs = ["bg-[#06080b]", "bg-[#0b1419]", "bg-[#112028]", "bg-[#0b1419]", "bg-[#06080b]"]

  return (
    <div className="bg-bg min-h-screen font-display">
      {/* Hero Section */}
      <section className="relative pt-0 pb-8 px-6 overflow-hidden flex flex-col items-center">
        {/* Glow effects matching the screenshot (Cyan left, Red/Pink right) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative w-full max-w-7xl mx-auto z-10 flex flex-col mb-12">
          <div className="w-full drop-shadow-[0_20px_50px_rgba(45,212,220,0.3)]">
            {settings?.carsPageSymbolicHero?.secure_url ? (
              <img src={settings.carsPageSymbolicHero.secure_url} alt="Symbolic Hero" className="w-full h-auto object-contain" />
            ) : (
              <CarSideView className="w-full h-auto" />
            )}
          </div>
          <h1 className="font-extrabold text-6xl md:text-[7.5rem] tracking-widest text-white uppercase drop-shadow-lg absolute bottom-4 left-4 md:bottom-12 md:left-12 z-20">
            {activeVehicle.name}
          </h1>
        </div>
      </section>

      {/* Year Selector / Timeline */}
      <div ref={timelineRef} className="relative border-b-2 border-white/10 mt-8 mb-16">
        {/* Cyan/Red active line overlay on the border */}
        <div className="absolute bottom-[-2px] left-0 w-full h-[2px] flex">
           <div className="bg-[#ff0033] h-full transition-all duration-500 ease-out" style={{ width: `${lineJunction}%` }} />
           <div className="bg-accent h-full transition-all duration-500 ease-out" style={{ width: `${100 - lineJunction}%` }} />
        </div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 -mb-[2px]">
          <div className="flex justify-center items-center gap-10 md:gap-16 overflow-x-auto scrollbar-hide">
            {yearsList.map((y) => (
              <button
                key={y}
                data-active={y === activeYear}
                onClick={() => setActiveYear(y)}
                className={`relative py-4 px-2 text-lg md:text-xl font-bold tracking-wider transition ${
                  y === activeYear ? 'text-white' : 'text-white/40 hover:text-white/80'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Real Big Car Photo & Small Gallery underneath */}
        <div className="w-full">
          {activeVehicle.heroImage?.secure_url ? (
            <div className="w-full aspect-video rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/50">
              <img 
                src={activeVehicle.heroImage.secure_url} 
                alt={`${activeVehicle.name} Main Photo`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-white/5 rounded-xl flex items-center justify-center text-white/40">
              Ana Resim Bulunamadı
            </div>
          )}

          {/* Mouse-scrollable thumbnails */}
          {activeVehicle.gallery && activeVehicle.gallery.length > 0 && (
            <ScrollableGallery images={activeVehicle.gallery} />
          )}
        </div>

        {/* Races & Tech Specs Container */}
        <div className="space-y-6">
          {/* Races */}
          {activeVehicle.races && activeVehicle.races.length > 0 && (
            <div>
              <h3 className="font-display text-accent text-xl font-bold tracking-wide mb-3">Yarışlar</h3>
              <div className="bg-[#0c1015] rounded-lg ring-1 ring-white/10 p-6 flex flex-wrap items-center justify-around gap-8">
                {activeVehicle.races.map((race, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    {race.logo?.secure_url ? (
                      <img src={race.logo.secure_url} alt={race.name} className="h-12 object-contain" />
                    ) : (
                      <div className="h-12 w-24 bg-white/10 rounded flex items-center justify-center text-xs">Logo</div>
                    )}
                    {getLoc(race.name) && <span className="text-white/80 text-sm font-semibold tracking-wide text-center max-w-[200px]">{getLoc(race.name)}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Specs */}
          {activeVehicle.specs && activeVehicle.specs.length > 0 && (
            <div>
              <h3 className="font-display text-accent text-xl font-bold tracking-wide mb-3">Teknik Bilgiler</h3>
              <div className="bg-[#0c1015] rounded-lg ring-1 ring-white/10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
                {activeVehicle.specs.map((spec, idx) => (
                  <div key={idx} className="p-6 text-center flex flex-col justify-center">
                    <p className="text-xs font-bold tracking-widest text-accent mb-2 uppercase">{getLoc(spec.label)}</p>
                    <p className="font-display text-xl md:text-2xl font-semibold text-white">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {activeVehicle.description && (
            <div className="bg-[#0c1015]/80 rounded-lg ring-1 ring-white/10 p-8 text-sm md:text-base text-white/80 leading-relaxed space-y-4 font-medium backdrop-blur-sm">
              <PortableText value={getLoc(activeVehicle.description)} />
            </div>
          )}
        </div>
      </div>

      {/* Sponsors */}
      <div className="mt-20">
        {activeVehicle.sponsorTiers && activeVehicle.sponsorTiers.length > 0 && (
           <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold text-white tracking-widest uppercase">{activeVehicle.name} SPONSORLARI</h2>
           </div>
        )}
        {activeVehicle.sponsorTiers && activeVehicle.sponsorTiers.map((tier, idx) => (
          <SponsorTier 
            key={idx} 
            title={getLoc(tier.tierName)} 
            items={tier.logos} 
            bg={sponsorBgs[idx % sponsorBgs.length]} 
            size={idx === 0 ? 'xl' : idx === 1 ? 'lg' : 'md'} 
          />
        ))}
      </div>
    </div>
  )
}
