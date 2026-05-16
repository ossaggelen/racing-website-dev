import { useState, useEffect } from 'react'
import { client } from '../sanityClient.js'
import Hero from '../components/Hero'
import About from '../components/About'
import Stats from '../components/Stats'
import Cars from '../components/Cars'

export default function HomePage() {
  const [heroUrl, setHeroUrl] = useState(null)
  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch(`{
        "settings": *[_type == "settings"][0]{ homeHeroImage },
        "home": *[_type == "homePage"][0]
      }`)
      .then((data) => {
        if (data?.settings?.homeHeroImage?.secure_url) {
          setHeroUrl(data.settings.homeHeroImage.secure_url)
        }
        setHomeData(data?.home || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <Hero heroUrl={heroUrl} data={homeData} />
      <About data={homeData} />
      <Stats data={homeData} />
      <Cars data={homeData} />
    </div>
  )
}
