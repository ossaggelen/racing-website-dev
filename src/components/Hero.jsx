import { useState, useEffect } from 'react'
import { useI18n } from '../i18n.jsx'
import cldUrl, { cldLqip } from '../cloudinaryUrl.js'

function LqipImage({ secureUrl, alt, className }) {
  const [fullLoaded, setFullLoaded] = useState(false)
  const lqipSrc = cldLqip(secureUrl)
  const fullSrc = cldUrl(secureUrl, { w: 2800 })

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

export default function Hero({ heroUrl, data }) {
  const { t, lang } = useI18n()

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-bg"
    >
      {/* Car & Title Container */}
      <div className="relative z-10 w-full pt-16 pb-12 md:pb-24 min-h-[40vh] md:min-h-[75vh] flex items-center justify-center">
        <div className="w-full relative max-w-[1400px] mx-auto">
          {heroUrl && (
            <LqipImage
              secureUrl={heroUrl}
              alt="ITU Racing Car"
              className="w-full h-auto object-contain"
            />
          )}

          {/* Title — pinned to bottom left */}
          <div className="absolute -bottom-10 left-6 md:-bottom-16 md:left-12 z-20 pointer-events-none">
            <h1 className="font-display font-extrabold text-[4.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tight text-white drop-shadow-lg">
              ITU RACING
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white leading-relaxed drop-shadow-md pointer-events-auto">
              {data?.heroTagline?.[lang] || t.hero.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

