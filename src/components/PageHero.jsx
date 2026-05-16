import { useState, useEffect } from 'react'
import cldUrl, { cldLqip } from '../cloudinaryUrl.js'

/**
 * LqipImage — blur-up progressive image loader (same as CarsPage)
 */
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

/**
 * PageHero — Shared hero section with the symbolic car photo from Sanity settings.
 *
 * Props:
 *   title      — Page title text displayed below the car image (required)
 *   subtitle   — Optional smaller subtitle line
 *   heroUrl    — Cloudinary secure_url fetched by the parent page (optional)
 *   titleClass — Extra Tailwind classes for the <h1> (optional)
 */
export default function PageHero({ title, subtitle, heroUrl, titleClass = '' }) {
  return (
    <section className="relative pt-0 pb-0 px-6">
      <div className="relative max-w-6xl mx-auto z-10 flex flex-col mb-0">
        <div className="w-full drop-shadow-[0_20px_50px_rgba(36,172,183,0.3)] min-h-[38vh] md:min-h-[60vh] flex items-center justify-center">
          {heroUrl && (
            <LqipImage
              secureUrl={heroUrl}
              transform={{ w: 1400 }}
              alt="ITU Racing Car"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          )}
        </div>
        <div className="absolute -bottom-6 left-0 md:-bottom-12 md:left-12 z-20 flex flex-col items-start pointer-events-none">
          <h1 className={`font-extrabold text-6xl md:text-[6rem] tracking-tight text-white uppercase drop-shadow-lg leading-none ${titleClass}`}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-accent font-semibold tracking-wide text-base md:text-4xl uppercase mt-4 md:ml-12 drop-shadow-md max-w-4xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
