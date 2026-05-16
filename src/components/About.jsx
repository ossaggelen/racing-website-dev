import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../i18n.jsx'
import { PortableText } from '@portabletext/react'

export default function About({ data }) {
  const { t, lang } = useI18n()

  // Parallax setup
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  })
  // Restored the more pronounced movement: -30% to 30%
  const y = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"])

  const ptComponents = {
    marks: {
      textColor: ({ children, value }) => (
        <span className="font-semibold" style={{ color: value?.value || '#24acb7' }}>{children}</span>
      )
    }
  }

  return (
    <section id="about" ref={parallaxRef} className="relative pb-12 bg-bg overflow-hidden">
      {/* Dynamic Parallax Image - Now starts at the top of the section */}
      {data?.parallaxImage?.secure_url && (
        <div className="absolute top-0 left-0 right-0 h-[100vh] overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 w-full h-[160%] -top-[30%] bg-bg flex flex-col items-center justify-center">
            <img
              src={data.parallaxImage.secure_url}
              alt="Parallax"
              // The image only stretches to 100vh (normal scale), the rest of the 160vh is filled with black bg!
              className="w-full h-[100vh] object-cover opacity-100"
            />
            {/* Dark gradient at the top specifically for "About Us" text readability, blending the top edge */}
            <div className="absolute inset-x-0 top-0 h-[45vh] bg-gradient-to-b from-bg via-bg/90 to-transparent" />

            {/* Dark gradient at the bottom to blend smoothly into the next section and cover the bottom edge */}
            <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-bg to-transparent" />
          </motion.div>
        </div>
      )}

      {/* Spacer to push content down if there is a parallax image */}
      {data?.parallaxImage?.secure_url ? (
        <div className="h-[10vh]" />
      ) : (
        <div className="pt-28" />
      )}

      {/* About Us Text - Now sits in front of the top part of the image */}
      <div className="max-w-6xl mx-auto px-6 relative z-10 pt-5">
        <h2 className="font-semibold font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-accent tracking-wide leading-none drop-shadow-md">
          {data?.aboutTitle?.[lang] || t.about.title}
        </h2>

        <div className="mt-6 max-w-xl text-sm md:text-base text-white leading-relaxed drop-shadow-md">
          {data?.aboutIntro ? (
            <PortableText value={data.aboutIntro[lang]} components={ptComponents} />
          ) : (
            <p>{t.about.intro}</p>
          )}
        </div>
      </div>

      {/* Spacer between About text and Grid - Increased to show more of the image */}
      <div className="h-[60vh]" />

      <div className="relative">
        {/* Top edge fade — only the very top of this box dissolves into the background */}
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-bg pointer-events-none z-20" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-y-16 gap-x-12 pb-12">
            <div className="text-left">
              <h3 className="font-semibold text-3xl md:text-5xl text-accent tracking-wide mb-6">
                {data?.missionTitle?.[lang] || t.about.missionTitle}
              </h3>
              <div className="mt-6 max-w-xl text-base md:text-md text-white leading-relaxed drop-shadow-md pointer-events-auto">
                {data?.missionText ? (
                  <PortableText value={data.missionText[lang]} components={ptComponents} />
                ) : (
                  <p>{t.about.mission}</p>
                )}
              </div>
            </div>

            <div className="text-left md:text-right">
              <h3 className="font-semibold text-3xl md:text-5xl text-accent tracking-wide mb-6">
                {data?.visionTitle?.[lang] || t.about.visionTitle}
              </h3>
              <div className="mt-6 max-w-xl text-base md:text-md text-white leading-relaxed drop-shadow-md pointer-events-auto">
                {data?.visionText ? (
                  <PortableText value={data.visionText[lang]} components={ptComponents} />
                ) : (
                  <p>{t.about.vision}</p>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10" />
        </div>
      </div>
    </section>
  )
}
