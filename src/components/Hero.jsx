import { useI18n } from '../i18n.jsx'
import CarSideView from './CarSideView.jsx'

export default function Hero() {
  const { t } = useI18n()
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-16 px-6"
    >
      {/* Background glows */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute -right-40 top-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute -left-40 bottom-1/4 w-[500px] h-[500px] rounded-full bg-pinkNeon/10 blur-[140px]" />

      {/* Side-view neon car */}
      <div className="relative z-10 w-full max-w-5xl mb-2 drop-shadow-[0_40px_80px_rgba(45,212,220,0.28)]">
        <CarSideView className="w-full h-auto" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-[8rem] leading-[0.95] tracking-tight">
          ITU RACING
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-sm md:text-base text-muted leading-relaxed">
          {t.hero.tagline}
        </p>
      </div>
    </section>
  )
}
