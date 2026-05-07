import { useI18n } from '../i18n.jsx'
import CarSideView from '../components/CarSideView.jsx'

// ITU Ayazağa Campus — approx. 41.1054, 29.0244
const lat = 41.1054
const lon = 29.0244
const delta = 0.008
const bbox = `${lon - delta},${lat - delta * 0.55},${lon + delta},${lat + delta * 0.55}`
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
const directions = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`

export default function ContactPage() {
  const { t } = useI18n()
  const cp = t.contactPage
  return (
    <div className="bg-bg">
      {/* Hero with car + CONTACT US */}
      <section className="relative pt-36 pb-12 px-6 overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-32 h-[520px] w-[820px] bg-accent/10 blur-[160px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="w-full drop-shadow-[0_40px_80px_rgba(45,212,220,0.28)]">
            <CarSideView className="w-full h-auto" />
          </div>
          <h1 className="-mt-4 md:-mt-6 font-display font-extrabold text-6xl md:text-8xl lg:text-[9rem] tracking-tight text-center">
            {cp.title}
          </h1>
        </div>
      </section>

      {/* Mail / Location / Map */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 md:gap-8 items-start">
          {/* Mail */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full ring-1 ring-accent/70 flex items-center justify-center text-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
              </div>
              <span className="font-display text-2xl tracking-wider">{cp.mail}</span>
            </div>
            <a
              href="mailto:ituformula@gmail.com"
              className="mt-8 block text-sm md:text-base text-white/85 hover:text-accent transition break-all"
            >
              ituformula@gmail.com
            </a>
          </div>

          {/* Location */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-12 h-12 rounded-full ring-1 ring-accent/70 flex items-center justify-center text-accent">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="font-display text-2xl tracking-wider">{cp.location}</span>
            </div>
            <p className="mt-8 text-sm md:text-base text-white/85 leading-relaxed">
              {cp.address1}<br />
              {cp.address2}
            </p>
          </div>

          {/* Map */}
          <div>
            <div className="aspect-square md:aspect-[4/3] w-full max-w-[360px] mx-auto rounded-md overflow-hidden ring-1 ring-white/10 bg-bg2">
              <iframe
                title="ITU Racing — ITU Ayazağa Campus map"
                src={mapSrc}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
            <a
              href={directions}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:text-white transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              {cp.directions}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
