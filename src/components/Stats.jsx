import { useI18n } from '../i18n.jsx'

// YouTube video / social CTA section
export default function Stats() {
  const { t } = useI18n()
  return (
    <section className="relative py-24 px-6 bg-bg text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-accent tracking-wide leading-tight">
          {t.video.heading1}<br />{t.video.heading2}
        </h2>
        <p className="mt-4 text-sm text-muted">{t.video.sub}</p>

        <div className="mt-8 max-w-xl mx-auto aspect-video rounded-xl overflow-hidden relative bg-gradient-to-br from-[#1a1d22] to-[#0c1014] shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-accent/20 group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-accent/20" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(45,212,220,.06) 0 1px, transparent 1px 4px)',
            }}
          />

          <div className="absolute inset-x-10 top-8 bottom-20 flex items-end justify-around opacity-60">
            <div className="w-16 h-32 rounded-t-[40%] bg-gradient-to-b from-amber-200/30 to-transparent" />
            <div className="w-16 h-36 rounded-t-[40%] bg-gradient-to-b from-pinkNeon/30 to-transparent" />
            <div className="w-16 h-32 rounded-t-[40%] bg-gradient-to-b from-amber-200/30 to-transparent" />
          </div>

          <div className="absolute top-4 left-4 right-4 text-left">
            <p className="text-xs font-semibold text-white">{t.video.epTitle}</p>
            <p className="text-[11px] text-white/60 mt-1">ITU Racing</p>
          </div>

          <div className="absolute bottom-5 left-0 right-0 text-center">
            <span className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[0.3em] text-white drop-shadow-[0_0_18px_rgba(45,212,220,0.55)]">
              {t.video.meet}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[76px] h-[54px] rounded-xl bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <div
                className="w-0 h-0"
                style={{
                  borderStyle: 'solid',
                  borderWidth: '11px 0 11px 18px',
                  borderColor: 'transparent transparent transparent #fff',
                }}
              />
            </div>
          </div>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 mt-5 text-sm text-muted hover:text-accent transition"
        >
          <svg width="20" height="14" viewBox="0 0 28 20" fill="#ff0000">
            <rect width="28" height="20" rx="5" />
            <polygon points="11,5 11,15 19,10" fill="#fff" />
          </svg>
          {t.video.ytLink} <span className="text-white font-semibold">YouTube</span>
        </a>

        <p className="mt-8 text-sm text-muted">{t.video.orInsta}</p>
      </div>
    </section>
  )
}
