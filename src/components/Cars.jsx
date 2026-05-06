// Repurposed: Instagram-style strip + Formula Student section
import { useI18n } from '../i18n.jsx'

const cards = [
  { gradient: 'from-[#2a1015] to-[#4a1c25]', label: 'HHS', kind: 'text' },
  { gradient: 'from-[#0d2a3a] to-[#062430]', label: '', kind: 'play' },
  { gradient: 'from-[#0a3450] to-[#06243a]', label: 'İTÜ', kind: 'text' },
  { gradient: 'from-[#0d2a3a] to-[#062430]', label: '', kind: 'play' },
  { gradient: 'from-[#1a1a1a] to-[#0a0a0a]', label: '134', kind: 'text' },
  { gradient: 'from-[#161616] to-[#0a0a0a]', label: 'RACING', kind: 'text' },
  { gradient: 'from-[#401520] to-[#200a14]', label: '⚙', kind: 'text' },
  { gradient: 'from-[#0a3450] to-[#06243a]', label: '⚡', kind: 'text' },
]

export default function Cars() {
  const { t } = useI18n()
  return (
    <>
      {/* Instagram strip */}
      <section id="cars" className="bg-bg pt-12 pb-2">
        <div className="text-center mb-7">
          <span className="font-display text-xl tracking-[0.4em]">ITU RACING</span>
          <svg
            className="inline-block ml-2 -mt-0.5 text-accent"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.7 2.3a1 1 0 0 0-1.05-.23l-19 7a1 1 0 0 0 .07 1.9l8.13 2.41 2.41 8.13a1 1 0 0 0 .96.71h.04a1 1 0 0 0 .9-.65l7-19a1 1 0 0 0-.46-1.27z" />
          </svg>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-[200px] h-[220px] rounded relative cursor-pointer hover:scale-[1.02] transition-transform bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white font-bold text-lg overflow-hidden`}
            >
              {c.kind === 'play' ? (
                <div
                  className="w-0 h-0"
                  style={{
                    borderStyle: 'solid',
                    borderWidth: '14px 0 14px 22px',
                    borderColor: 'transparent transparent transparent rgba(255,255,255,0.85)',
                  }}
                />
              ) : (
                <span className="text-2xl tracking-widest">{c.label}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Formula Student banner */}
      <section
        id="formula-student"
        className="relative mt-14 py-24 px-6 overflow-hidden bg-gradient-to-br from-[#1d2730] to-[#0c151c]"
      >
        {/* Top accent stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #2dd4dc 0 30px, transparent 30px 60px, #ff3aa8 60px 90px, transparent 90px 120px)',
          }}
        />

        {/* Soft glow */}
        <div className="absolute -right-20 -bottom-20 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none">
            {t.fs.title}
          </h2>

          <p className="mt-6 max-w-xl text-sm md:text-base text-muted leading-relaxed">
            {t.fs.desc}
          </p>

          <button className="mt-7 bg-accent text-[#06181b] font-bold text-sm px-7 py-3 rounded-md hover:bg-cyan-300 hover:-translate-y-0.5 transition">
            {t.fs.cta}
          </button>
        </div>

        {/* AAE badge */}
        <div className="absolute right-7 bottom-7 w-16 h-16 border-2 border-white/90 bg-black/40 flex flex-col items-center justify-center font-display">
          <span className="text-lg leading-none">AAE</span>
          <span className="text-[5px] tracking-widest mt-1.5 opacity-80 text-center leading-tight">
            ASSOCIATION OF<br />AUTOMOTIVE<br />ENGINEERS
          </span>
        </div>
      </section>
    </>
  )
}
