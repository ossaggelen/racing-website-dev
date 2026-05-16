import { useState, useEffect, useRef } from 'react'
import { useI18n } from '../i18n.jsx'
import CarSideView from '../components/CarSideView.jsx'
import { client, urlFor } from '../sanityClient.js'
import cldUrl, { cldLqip } from '../cloudinaryUrl.js'
import { PortableText } from '@portabletext/react'

function LqipImage({ secureUrl, transform, alt, className }) {
  const [fullLoaded, setFullLoaded] = useState(false)
  const lqipSrc = cldLqip(secureUrl)
  const fullSrc = cldUrl(secureUrl, transform)

  useEffect(() => {
    setFullLoaded(false)
    let cancelled = false
    const img = new Image()
    img.onload = () => { if (!cancelled) setFullLoaded(true) }
    img.src = fullSrc
    return () => { cancelled = true; img.onload = null }
  }, [fullSrc])

  return (
    <img
      src={fullLoaded ? fullSrc : lqipSrc}
      alt={alt}
      className={`transition-all duration-700 ${fullLoaded ? 'blur-0 scale-100' : 'blur-lg scale-105'} ${className ?? ''}`}
    />
  )
}

function HeroCarousel({ images }) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  return (
    <div className="relative w-full aspect-video rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/50 group">
      {/* Slides */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <LqipImage
            secureUrl={img.secure_url}
            transform={{ w: 1200, crop: 'fill' }}
            alt={`Hero ${i + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {images.length > 1 && (
        <>
          {/* Left arrow */}
          <button
            onClick={prev}
            aria-label="Önceki"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all duration-300 hover:scale-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={next}
            aria-label="Sonraki"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-black/70 transition-all duration-300 hover:scale-110"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Fotoğraf ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-5 h-2 bg-accent'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-3 right-3 z-20 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white/70 text-xs font-medium">
            {current + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}

// Compact tier heights by tier rank (0=biggest tier, 4=smallest tier)
const COMPACT_IMG_H = ['h-24 md:h-32', 'h-20 md:h-28', 'h-16 md:h-24', 'h-14 md:h-20', 'h-12 md:h-16']

function SponsorTier({ title, items, bg, tierIndex = 0, compact = false }) {
  if (!items || items.length === 0) return null;

  const tierMultiplier = Math.max(0, 4 - tierIndex)

  // Normal mode: fixed-box layout (IST25 etc.)
  const getLogoSize = (count) => {
    const heights = ['h-[60px] md:h-[84px]', 'h-[72px] md:h-24', 'h-[84px] md:h-[108px]', 'h-32 md:h-44', 'h-40 md:h-52']
    const widths  = ['w-28 md:w-40',          'w-32 md:w-44',     'w-40 md:w-56',           'w-60 md:w-80', 'w-72 md:w-96']
    let sizeIdx = tierMultiplier
    if (count >= 8) sizeIdx = Math.max(0, sizeIdx - 2)
    else if (count >= 5) sizeIdx = Math.max(0, sizeIdx - 1)
    return `${heights[sizeIdx]} ${widths[sizeIdx]}`
  }

  if (compact) {
    // Compact mode (IST24): bare images, fixed height, no wrapper box, tight gap
    const imgH = COMPACT_IMG_H[Math.min(tierIndex, COMPACT_IMG_H.length - 1)]

    return (
      <section className={`${bg} py-5 px-6`}>
        <div className="max-w-6xl mx-auto">
          <h3 className="font-display text-lg md:text-xl text-accent tracking-wider mb-4 text-center uppercase">
            {title}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {items.map((logoItem, idx) => {
              const logoUrl = logoItem.logo?.secure_url ?? logoItem.secure_url
              const link    = logoItem.logo ? logoItem.url : undefined

              const img = logoUrl ? (
                <img
                  src={cldUrl(logoUrl, { w: 500 })}
                  alt="Sponsor Logo"
                  className={`${imgH} w-auto object-contain hover:scale-105 transition-transform duration-300`}
                  loading="lazy"
                />
              ) : (
                <span className="text-white/40 text-xs">Logo Yok</span>
              )

              return link ? (
                <a key={idx} href={link} target="_blank" rel="noopener noreferrer">{img}</a>
              ) : (
                <div key={idx}>{img}</div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // Normal mode
  const logoSizeClass = getLogoSize(items.length)

  return (
    <section className={`${bg} py-12 px-6`}>
      <div className="max-w-6xl mx-auto">
        <h3 className="font-display text-xl md:text-2xl text-accent tracking-wider mb-8 text-center uppercase">
          {title}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {items.map((logoItem, idx) => {
            const isNewSchema = !!logoItem.logo;
            const logoUrl = isNewSchema ? logoItem.logo?.secure_url : logoItem.secure_url;
            const link = isNewSchema ? logoItem.url : undefined;

            const content = (
              <div className={`${logoSizeClass} flex items-center justify-center p-3 hover:scale-105 transition-transform duration-300`}>
                {logoUrl ? (
                  <img src={cldUrl(logoUrl, { w: 400 })} alt="Sponsor Logo" className="max-h-full max-w-full object-contain" loading="lazy" />
                ) : (
                  <span className="text-white/50 text-xs">Logo Yok</span>
                )}
              </div>
            );

            return link ? (
              <a key={idx} href={link} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={idx}>{content}</div>
            );
          })}
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
            src={cldUrl(img.secure_url, { h: 400, crop: 'fill' })}
            alt={`Gallery item ${i}`}
            className="h-full w-auto object-cover flex-shrink-0 border-r border-white/5"
            loading="lazy"
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

  useEffect(() => {
    Promise.all([
      client.fetch(`*[_type == "vehicle"] | order(year desc)`),
      client.fetch(`*[_type == "settings"][0]`)
    ]).then(([vehiclesData, settingsData]) => {
      if (vehiclesData && vehiclesData.length > 0) {
        setVehicles(vehiclesData)
        setActiveYear(vehiclesData[0].year)
      }
      if (settingsData) setSettings(settingsData)
      setLoading(false)
    }).catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, [])

  const activeVehicle = vehicles.find(v => v.year === activeYear) || vehicles[0] || null
  const yearsList = vehicles.map(v => v.year)
  const sponsorBgs = ["bg-[#06080b]", "bg-[#0b1419]", "bg-[#112028]", "bg-[#0b1419]", "bg-[#06080b]"]

  return (
    <div className={`bg-bg min-h-screen font-display transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      {!activeVehicle ? null : <>
      {/* Hero Section */}
      <section className="relative pt-0 pb-0 px-6 overflow-hidden">
<div className="relative max-w-6xl mx-auto z-10 flex flex-col mb-4">
          <div className="w-full drop-shadow-[0_20px_50px_rgba(36,172,183,0.3)]">
            {settings?.carsPageSymbolicHero?.secure_url ? (
              <LqipImage
                secureUrl={settings.carsPageSymbolicHero.secure_url}
                transform={{ w: 1400 }}
                alt="Symbolic Hero"
                className="w-full h-auto max-h-[85vh] object-contain"
              />
            ) : (
              <CarSideView className="w-full h-auto max-h-[85vh]" />
            )}
          </div>
          <h1 className="font-extrabold text-6xl md:text-[6rem] tracking-widest text-white uppercase drop-shadow-lg absolute bottom-0 left-0 md:bottom-2 md:left-6 z-20 leading-none">
            {activeVehicle.name}
          </h1>
        </div>
      </section>

      {/* Year Selector / Timeline */}
      <div ref={timelineRef} className="relative border-b-2 border-white/10 mt-2 mb-16">
        {/* Cyan/Red active line overlay on the border */}
        <div className="absolute bottom-[-2px] left-0 w-full h-[2px] flex">
          <div className="bg-[#ff0033] h-full transition-all duration-500 ease-out" style={{ width: `${lineJunction}%` }} />
          <div className="bg-accent h-full transition-all duration-500 ease-out" style={{ width: `${100 - lineJunction}%` }} />
        </div>
        <div className="max-w-5xl mx-auto px-2 md:px-6 relative z-10 -mb-[2px]">
          <div className="flex justify-start md:justify-center items-center gap-6 md:gap-12 overflow-x-auto scrollbar-hide pb-1 px-4">
            {yearsList.map((y) => (
              <button
                key={y}
                data-active={y === activeYear}
                onClick={() => setActiveYear(y)}
                className={`relative py-4 px-2 text-lg md:text-xl font-bold tracking-wider transition ${y === activeYear ? 'text-white' : 'text-white/40 hover:text-white/80'
                  }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Hero Carousel */}
        <div className="w-full">
          {activeVehicle.heroImages && activeVehicle.heroImages.length > 0 ? (
            <HeroCarousel images={activeVehicle.heroImages} />
          ) : activeVehicle.heroImage?.secure_url ? (
            <div className="w-full aspect-video rounded-xl ring-1 ring-white/10 overflow-hidden bg-black/50">
              <LqipImage
                secureUrl={activeVehicle.heroImage.secure_url}
                transform={{ w: 1200, crop: 'fill' }}
                alt={`${activeVehicle.name} Main Photo`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-white/5 rounded-xl flex items-center justify-center text-white/40">
              Ana Resim Bulunamadı
            </div>
          )}
        </div>

        {/* Races & Tech Specs Container */}
        <div className="space-y-6">
          {/* Races */}
          {activeVehicle.races && activeVehicle.races.length > 0 && (
            <div>
              <h3 className="font-display text-accent text-xl font-bold tracking-wide mb-3">Yarışlar</h3>
              <div className="bg-[#0c1015] rounded-lg ring-1 ring-white/10 p-6 flex flex-wrap items-center justify-around gap-8">
                {activeVehicle.races.map((race, idx) => {
                  const content = (
                    <div className="flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-300">
                      {race.logo?.secure_url ? (
                        <div className="w-36 h-20 md:w-48 md:h-28 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-3">
                          <img src={cldUrl(race.logo.secure_url, { w: 200 })} alt={getLoc(race.name)} className="w-full h-full object-contain" loading="lazy" />
                        </div>
                      ) : (
                        <div className="w-36 h-20 md:w-48 md:h-28 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <span className="text-white/40 text-[10px]">Logo</span>
                        </div>
                      )}
                      <span className="text-white/80 font-medium text-xs md:text-sm text-center tracking-wide">
                        {getLoc(race.name)}
                      </span>
                    </div>
                  );
                  return race.url ? (
                    <a key={idx} href={race.url} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
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
              <PortableText 
                value={getLoc(activeVehicle.description)} 
                components={{
                  marks: {
                    textColor: ({ children, value }) => {
                      return <span style={{ color: value.value }}>{children}</span>
                    }
                  }
                }}
              />
            </div>
          )}

          {/* Small Photo Gallery — teknik bilgi & açıklamadan sonra, sponsorlardan önce */}
          {activeVehicle.gallery && activeVehicle.gallery.length > 0 && (
            <div>
              <h3 className="font-display text-accent text-xl font-bold tracking-wide mb-3">Galeri</h3>
              <ScrollableGallery images={activeVehicle.gallery} />
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
            tierIndex={idx}
            compact={activeVehicle.year === 2024}
          />
        ))}
      </div>
      <div className="pb-40" />
      </>}
    </div>
  )
}
