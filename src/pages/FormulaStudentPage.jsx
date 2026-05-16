import { useState, useEffect } from 'react'
import { useI18n } from '../i18n.jsx'
import { client } from '../sanityClient.js'
import PageHero from '../components/PageHero.jsx'
import { PortableText } from '@portabletext/react'

function EventBlock({ title, imageSrc, imageSide = 'none', children }) {
  const hasImage = imageSide !== 'none' && imageSrc;

  if (!hasImage) {
    return (
      <div className="py-6">
        {title && <h3 className="font-semibold text-2xl md:text-3xl text-white mb-4 drop-shadow-sm">{title}</h3>}
        <div className="text-sm md:text-base text-white/80 leading-relaxed max-w-4xl space-y-4">
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center py-10">
      {imageSide === 'left' && (
        <img src={imageSrc} alt={title || "Event Image"} className="w-full rounded-lg object-cover aspect-[4/3] shadow-lg" />
      )}
      <div className={imageSide === 'right' ? 'md:text-right' : ''}>
        {title && (
          <h3
            className={`font-semibold text-2xl md:text-3xl text-white mb-4 drop-shadow-sm ${imageSide === 'right' ? 'md:text-right' : ''
              }`}
          >
            {title}
          </h3>
        )}
        <div className="text-sm md:text-base text-white/80 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
      {imageSide === 'right' && (
        <img src={imageSrc} alt={title || "Event Image"} className="w-full rounded-lg object-cover aspect-[4/3] shadow-lg" />
      )}
    </div>
  )
}

export default function FormulaStudentPage() {
  const { t, lang } = useI18n()
  const fp = t.fsPage // fallback titles
  const [heroUrl, setHeroUrl] = useState(null)
  const [pageData, setPageData] = useState(null)
  const [loading, setLoading] = useState(true)

  const ptComponents = {
    marks: {
      textColor: ({ children, value }) => (
        <span className="font-semibold" style={{ color: value?.value || '#24acb7' }}>{children}</span>
      )
    },
    block: {
      h3: ({ children }) => <h3 className="font-semibold text-2xl md:text-3xl text-white mt-8 mb-4 drop-shadow-sm first:mt-0">{children}</h3>,
      h4: ({ children }) => <h4 className="font-semibold text-xl text-white mt-6 mb-2">{children}</h4>,
      normal: ({ children }) => <p className="leading-relaxed">{children}</p>
    }
  }

  useEffect(() => {
    // Fetch settings for the hero image, and formulaStudentPage for the content
    Promise.all([
      client.fetch(`*[_type == "settings"][0]{ carsPageSymbolicHero }`),
      client.fetch(`*[_type == "formulaStudentPage"][0]`)
    ])
      .then(([settingsData, fsData]) => {
        if (settingsData?.carsPageSymbolicHero?.secure_url) {
          setHeroUrl(settingsData.carsPageSymbolicHero.secure_url)
        }
        if (fsData) {
          setPageData(fsData)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching formula student data:", err)
        setLoading(false)
      })
  }, [])

  return (
    <div className={`bg-bg transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <PageHero
        title={fp.title}
        maxWidth="max-w-5xl"
        titleClass="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider font-display font-bold drop-shadow-lg"
        heroUrl={heroUrl}
      />

      {/* Intro */}
      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto text-center">
          {pageData?.intro ? (
            <div className="text-base md:text-lg text-white/90 leading-relaxed drop-shadow-sm font-medium">
              <PortableText value={pageData.intro[lang]} components={ptComponents} />
            </div>
          ) : (
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-medium">{fp.intro}</p>
          )}
        </div>
      </section>

      {/* Team photo */}
      {(pageData?.teamPhoto?.secure_url) && (
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <img
              src={pageData.teamPhoto.secure_url}
              alt="ITU Racing Team"
              className="w-full rounded-xl shadow-2xl object-cover aspect-video ring-1 ring-white/10"
            />
          </div>
        </section>
      )}

      {/* Dynamic Sections from Sanity */}
      {pageData?.sections?.map((section, idx) => (
        <section key={section._key || idx} className="px-6 py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-accent tracking-wide mb-8 drop-shadow-sm">
              {section.sectionTitle?.[lang]}
            </h2>

            <div className="space-y-4">
              {section.events?.map((event) => (
                <EventBlock
                  key={event._key}
                  title={event.title?.[lang]}
                  imageSrc={event.image?.secure_url}
                  imageSide={event.imageSide}
                >
                  {event.content ? (
                    <PortableText value={event.content[lang]} components={ptComponents} />
                  ) : null}
                </EventBlock>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Fallback Static/Dynamic if no Sanity data */}
      {!pageData?.sections && (
        <>
          <section className="px-6 py-12 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl text-accent tracking-wide mb-8 drop-shadow-sm">
                {fp.static}
              </h2>
              <div className="space-y-4">
                <EventBlock title={fp.bp.t}>{fp.bp.p}</EventBlock>
                <EventBlock title={fp.cm.t} imageSide="right">{fp.cm.p}</EventBlock>
                <EventBlock title={fp.ed.t}>{fp.ed.p}</EventBlock>
              </div>
            </div>
          </section>
          <section className="px-6 py-12 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl text-accent tracking-wide mb-8 drop-shadow-sm">
                {fp.dynamic}
              </h2>
              <div className="space-y-4">
                <EventBlock title={fp.ac.t} imageSide="left">{fp.ac.p}</EventBlock>
                <EventBlock title={fp.sk.t} imageSide="left">{fp.sk.p}</EventBlock>
                <EventBlock title={fp.au.t} imageSide="right">{fp.au.p}</EventBlock>
                <EventBlock title={fp.en.t} imageSide="right">{fp.en.p}</EventBlock>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
