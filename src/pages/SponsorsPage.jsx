import { useState, useEffect } from 'react'
import { useI18n } from '../i18n.jsx'
import { client } from '../sanityClient.js'
import cldUrl, { cldLqip } from '../cloudinaryUrl.js'
import { PortableText } from '@portabletext/react'
import PageHero from '../components/PageHero.jsx'

function SponsorTier({ title, logos, fallbackItems, size = 'md' }) {
  const sizeClasses = {
    xl: 'w-60 h-32 md:w-80 md:h-40',
    lg: 'w-40 h-20 md:w-60 md:h-32',
    md: 'w-32 h-16 md:w-44 md:h-20',
  }
  const textClasses = {
    xl: 'text-2xl md:text-4xl px-12 py-6',
    lg: 'text-lg md:text-2xl px-8 py-5',
    md: 'text-sm md:text-base px-6 py-4',
  }

  return (
    <section className="relative pt-6 pb-8 px-6 overflow-hidden bg-white/[0.06] backdrop-blur-[2px]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24acb7]/20 to-transparent" />

      <div className="max-w-5xl mx-auto relative z-10">
        <h3 className="font-display text-xl md:text-2xl text-[#24acb7] tracking-normal mb-8 font-bold uppercase">
          {title}
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos && logos.length > 0 ? (
            logos.map((l, i) => (
              <a key={i} href={l.url || '#'} target="_blank" rel="noreferrer" className="block hover:scale-105 transition-transform">
                {l.logo?.secure_url ? (
                  <img
                    src={cldUrl(l.logo.secure_url, { h: 150 })}
                    alt={l.alt || 'Sponsor'}
                    className={`${sizeClasses[size]} object-contain`}
                  />
                ) : (
                  <div className={`${textClasses[size]} bg-white/[0.04] border border-white/10 rounded text-white/90 font-semibold tracking-wide flex items-center justify-center`}>
                    {l.alt || 'Sponsor'}
                  </div>
                )}
              </a>
            ))
          ) : (
            fallbackItems?.map((name) => (
              <div
                key={name}
                className={`${textClasses[size]} bg-white/[0.04] border border-white/10 rounded text-white/90 font-semibold tracking-wide flex items-center justify-center hover:border-[#24acb7]/60 hover:bg-white/[0.07] transition`}
              >
                {name}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#24acb7]/40 to-transparent" />
    </section>
  )
}

export default function SponsorsPage() {
  const { t, lang } = useI18n()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.fetch(`{
      "page": *[_type == "sponsorsPage"][0]{
        ...,
        sponsorTiers[]{
          ...,
          logos[]{
            ...,
            "logoUrl": logo.secure_url
          }
        }
      },
      "settings": *[_type == "settings"][0]{
        "heroUrl": carsPageSymbolicHero.secure_url
      }
    }`).then(res => {
      if (res) {
        setData(res.page)
        if (res.settings?.heroUrl) {
          setData(prev => ({ ...prev, heroImageUrl: res.settings.heroUrl }))
        }
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  // Translations / Fallbacks
  const title = data?.title?.[lang] || 'SPONSORS'
  const subtitle = data?.subtitle?.[lang] || 'THANK YOU TO ALL WHO SUPPORTED US THROUGH THIS JOURNEY!'

  const fallbackIntro = [
    "Throughout the years ITU Racing has enjoyed the support of numerous local and global institutions.",
    "Our partners are instrumental in achieving success on and off the track."
  ]

  const fallbackBenefits = [
    {
      n: '1', title: 'HUMAN RESOURCES ADVANTAGE', items: [
        { t: 'Be a part of the ITU Racing community', p: 'The team works like a Formula 1 team and produces its own custom-built vehicles. You can reach out to these driven students directly and incorporate them into your teams!' },
        { t: 'Recruitment and Internship advantages', p: 'Opportunity to access top talent with a broad engineering background, and practical experience.' },
        { t: 'Interdisciplinary Expertise', p: 'Students apply their theoretical knowledge from the academic studies and integrate it into practical scenarios, making them valuable assets to any corporation.' }
      ]
    },
    {
      n: '2', title: 'BRAND PROMOTION AND AWARENESS', items: [
        { t: 'Logo on team apparel and vehicles', p: "Placement of sponsor logos on the race car's uniforms and more." },
        { t: 'Print and media content Visibility', p: 'Gain brand recognition through press releases, promotional material, team events and our newsletter, in which our sponsors are actively highlighted in our social media channels.' },
        { t: 'Events and Expo Advertisements', p: "Display of the sponsor in various university events, expos and conventions where we showcase the team's engineering prowess and current projects." }
      ]
    },
    {
      n: '3', title: 'GLOBAL AND NATIONAL PLATFORMS', items: [
        { t: 'Be a Part of International Platforms', p: 'A vast majority of the events in which we participate involve strong engineering from across the globe. You are aligning your brand with international platforms and audiences in the engineering discipline.' },
        { t: 'Collaboration with the ITU Brand', p: "By teaming up with ITU Racing, you enhance your brand's image by aligning with one of Turkey's most prestigious universities." }
      ]
    },
    {
      n: '4', title: 'PRODUCT TESTING', items: [
        { t: 'Testing in Extreme Conditions', p: "Our vehicles provide a rigorous testing environment. The products and services provided to us go under tremendous mechanical, thermal and electrical stresses. It is an excellent opportunity for product validation, showcasing your product's performance in high-stress, real-world conditions." }
      ]
    },
    {
      n: '5', title: 'SUSTAINABILITY AND EDUCATION', items: [
        { t: 'Support to Sustainable Education', p: 'Your contributions play a critical role in supporting the educational development of the students in STEM fields.' }
      ]
    },
    {
      n: '6', title: 'STRONG ECOSYSTEM', items: [
        { t: 'Networking with Industry Leaders', p: 'Engaging with a diverse network of sponsors featuring prominent companies in automotive, electronics, software and manufacturing.' },
        { t: 'Strengthening University-Industry Cooperations', p: 'Discovering unique models of business to university collaborations.' }
      ]
    }
  ]

  return (
    <div className={`bg-[#050505] min-h-screen text-white/90 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      {/* Hero Section */}
      <PageHero title={title} subtitle={subtitle} heroUrl={data?.heroImageUrl} />

      {/* Intro Text Section - Clean Black Background */}
      <section className="px-6 pt-24 pb-12 relative z-10">
        <div className="max-w-6xl mx-auto space-y-4 text-sm md:text-base text-white/70 leading-relaxed font-light md:pl-24">
          {data?.introText ? (
            <PortableText
              value={data.introText[lang]}
              components={{
                marks: {
                  textColor: ({ children, value }) => (
                    <span className="font-semibold" style={{ color: value?.value || '#24acb7' }}>{children}</span>
                  )
                },
                block: {
                  normal: ({ children }) => <p className="min-h-[1.5em]">{children}</p>
                }
              }}
            />
          ) : (
            <>
              {fallbackIntro.map((p, i) => <p key={i}>{p}</p>)}
              <div className="py-4 space-y-2 text-base md:text-lg">
                <p>Developing <span className="text-[#24acb7] font-semibold">FUTURE TECHNOLOGIES</span></p>
                <p>Bringing <span className="text-[#24acb7] font-semibold">INNOVATIVE IDEAS</span> to reality</p>
                <p>Challenging the <span className="text-[#24acb7] font-semibold">LIMITS</span> of engineering</p>
              </div>
              <p>We would like to thank our sponsors who believe in us, stood by our side and supported us.</p>
              <p>Here is a brief look at our current partners</p>
            </>
          )}
        </div>
      </section>

      {/* Tiers Section - With Glow and Soft Edges */}
      <div className="relative py-20 overflow-hidden">
        {/* Soft edge transitions (Top/Bottom) */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Large Global Background Glow - Intensified brightness/opacity */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[120%] bg-[#24acb7]/40 blur-[160px] rounded-[100%] pointer-events-none opacity-90" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] bg-[#24acb7]/25 blur-[120px] rounded-[100%] pointer-events-none" />

        <div className="relative z-20 space-y-12">
          {data?.sponsorTiers ? (
            data.sponsorTiers.map((tier, i) => (
              <SponsorTier
                key={i}
                title={tier.tierName?.[lang] || 'TIER'}
                logos={tier.logos}
                size={i === 0 ? 'xl' : i === 1 ? 'lg' : 'md'}
              />
            ))
          ) : (
            <>
              <SponsorTier title="PLATINUM" fallbackItems={['1773 TTO']} size="xl" />
              <SponsorTier title="SILVER" fallbackItems={['ON+', 'Aydem Enerji', 'KISSsoft', 'Makromet', 'MSI Teknik']} size="lg" />
              <SponsorTier title="BRONZE" fallbackItems={['Deniz Metal', 'Online Lazer Kesim', 'Egebant', 'GAV', 'TSKB']} size="md" />
              <SponsorTier title="SUPPORTERS" fallbackItems={['LIONART', 'EXOM', 'Chalky', 'Yıldız Ağaç İzolasyon', 'YENMAK']} size="md" />
            </>
          )}
        </div>
      </div>

      {/* Benefits Section - Separated with black background */}
      <section className="px-6 pt-32 pb-24 bg-[#050505] relative border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#24acb7]/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col w-full text-sm md:text-base text-white/70 leading-relaxed space-y-2">
            {data?.benefitsSectionTitle && (
              <h2 className="font-display text-3xl md:text-5xl text-[#24acb7] tracking-wide leading-snug font-bold mb-16 text-left w-full">
                {data.benefitsSectionTitle[lang] || data.benefitsSectionTitle.tr || data.benefitsSectionTitle}
              </h2>
            )}
            {data?.outroText ? (
              <PortableText
                value={data.outroText[lang]}
                components={{
                  marks: {
                    textColor: ({ children, value }) => (
                      <span className="font-semibold" style={{ color: value?.value || '#24acb7' }}>{children}</span>
                    )
                  },
                  block: {
                    normal: ({ children }) => <p className="mb-4 text-left max-w-3xl min-h-[1.5em]">{children}</p>,
                    normalRight: ({ children }) => <p className="mb-4 text-right max-w-3xl self-end ml-auto min-h-[1.5em]">{children}</p>,
                    h2: ({ children }) => <h2 className="font-display text-3xl md:text-5xl text-[#24acb7] tracking-wide leading-snug font-bold mb-16 text-left w-full">{children}</h2>,
                    h3: ({ children }) => <h3 className="font-display text-xl md:text-2xl text-[#24acb7] tracking-wide mb-4 font-bold text-left mt-12 max-w-3xl">{children}</h3>,
                    h3Right: ({ children }) => <h3 className="font-display text-xl md:text-2xl text-[#24acb7] tracking-wide mb-4 font-bold text-right mt-12 max-w-3xl self-end ml-auto">{children}</h3>,
                    h4: ({ children }) => <h4 className="font-display text-base md:text-lg text-white font-semibold mb-2 text-left mt-6 max-w-3xl">{children}</h4>,
                    h4Right: ({ children }) => <h4 className="font-display text-base md:text-lg text-white font-semibold mb-2 text-right mt-6 max-w-3xl self-end ml-auto">{children}</h4>,
                  }
                }}
              />
            ) : (
              <>
                {!data?.benefitsSectionTitle && (
                  <h2 className="font-display text-3xl md:text-5xl text-[#24acb7] tracking-wide leading-snug font-bold mb-16 text-left w-full md:pl-24">
                    Fuel us with your energy — we move as one.
                  </h2>
                )}
                {fallbackBenefits.map((b, index) => {
                  const isRight = index % 2 !== 0;
                  const alignClass = isRight ? 'items-end text-right self-end ml-auto' : 'items-start text-left';
                  return (
                    <div key={index} className={`flex flex-col ${alignClass} w-full max-w-3xl mt-12`}>
                      <p className="text-xs tracking-widest text-[#24acb7] mb-2 font-bold">{b.number || b.n}.</p>
                      <h3 className="font-display text-xl md:text-2xl text-[#24acb7] tracking-wide mb-6 font-bold">
                        {b.title}
                      </h3>
                      <div className="space-y-6 w-full">
                        {(b.items || []).map((it, idx) => (
                          <div key={idx}>
                            <p className="font-semibold text-white text-sm md:text-base mb-2">
                              {it.t}
                            </p>
                            <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                              {it.p}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
