import { useI18n } from '../i18n.jsx'

export default function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="relative py-28 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-accent tracking-wide leading-none">
          {t.about.title}
        </h2>

        <p className="mt-6 max-w-xl text-sm md:text-base text-muted leading-relaxed">
          {t.about.intro}
        </p>

        <div className="grid md:grid-cols-2 gap-y-16 gap-x-12 mt-24 pb-12">
          <div className="text-left">
            <h3 className="font-display text-3xl md:text-5xl text-accent tracking-wide mb-6">
              {t.about.missionTitle}
            </h3>
            <p className="text-muted text-sm md:text-base leading-relaxed max-w-md">
              {t.about.mission}
            </p>
          </div>

          <div className="text-left md:text-right">
            <h3 className="font-display text-3xl md:text-5xl text-accent tracking-wide mb-6">
              {t.about.visionTitle}
            </h3>
            <p className="text-muted text-sm md:text-base leading-relaxed max-w-md md:ml-auto">
              {t.about.vision}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10" />
      </div>
    </section>
  )
}
