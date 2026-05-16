import { useI18n } from '../i18n.jsx'
import { PortableText } from '@portabletext/react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Cars({ data }) {
  const { t, lang } = useI18n()

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"] // Starts when top enters viewport, finishes when bottom is visible
  })

  // Image starts fully transparent and becomes fully opaque
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  const ptComponents = {
    marks: {
      textColor: ({ children, value }) => (
        <span className="font-semibold" style={{ color: value?.value || '#24acb7' }}>{children}</span>
      )
    }
  }

  return (
    <>
      {/* Formula Student banner */}
      <section
        id="formula-student"
        ref={sectionRef}
        className="relative bg-black overflow-hidden"
      >
        {/* Top accent stripe */}
        <div className="absolute top-0 left-0 right-0 z-20 w-full overflow-hidden">
          <img src="/ustserit.png" alt="Stripe" className="w-full h-auto object-cover opacity-90" style={{ maxHeight: '60px' }} />
        </div>

        {data?.formulaStudentBgImage?.secure_url ? (
          <div className="relative w-full bg-black">
            {/* Full image — drives section height, no cropping */}
            <motion.img
              style={{ opacity: imageOpacity }}
              src={data.formulaStudentBgImage.secure_url}
              alt="Formula Student"
              className="w-full h-auto block"
            />
            {/* Left-side text readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            {/* Bottom blend */}
            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black to-transparent" />
            {/* Text overlay — absolute on top of image */}
            <div className="absolute inset-0 flex items-start px-6 z-10 pt-20">
              <div className="max-w-6xl mx-auto w-full drop-shadow-lg">
                <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none text-white drop-shadow-md">
                  {data?.formulaStudentTitle?.[lang] || t.fs.title}
                </h2>
                <div className="mt-6 max-w-xl text-sm md:text-base text-white/90 leading-relaxed drop-shadow">
                  {data?.formulaStudentIntro ? (
                    <PortableText value={data.formulaStudentIntro[lang]} components={ptComponents} />
                  ) : (
                    <p>{t.fs.desc}</p>
                  )}
                </div>
                <Link to="/formula-student" className="inline-block mt-8 bg-accent text-[#06181b] font-bold text-sm px-8 py-3.5 rounded-md hover:bg-accent/80 hover:-translate-y-0.5 transition-all">
                  {t.fs.cta}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-16 px-6">
            <div className="max-w-6xl mx-auto drop-shadow-lg">
              <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none text-white drop-shadow-md">
                {data?.formulaStudentTitle?.[lang] || t.fs.title}
              </h2>
              <div className="mt-6 max-w-xl text-sm md:text-base text-white/90 leading-relaxed drop-shadow">
                {data?.formulaStudentIntro ? (
                  <PortableText value={data.formulaStudentIntro[lang]} components={ptComponents} />
                ) : (
                  <p>{t.fs.desc}</p>
                )}
              </div>
              <Link to="/formula-student" className="inline-block mt-8 bg-accent text-[#06181b] font-bold text-sm px-8 py-3.5 rounded-md hover:bg-accent/80 hover:-translate-y-0.5 transition-all">
                {t.fs.cta}
              </Link>
            </div>
          </div>
        )}

        {/* Soft glow */}
        <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none z-0" />
      </section>
    </>
  )
}
