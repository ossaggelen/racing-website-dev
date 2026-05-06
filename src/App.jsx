import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Cars from './components/Cars'
import Footer from './components/Footer'
import CarsPage from './components/CarsPage'
import FormulaStudentPage from './components/FormulaStudentPage'
import SponsorsPage from './components/SponsorsPage'
import TeamPage from './components/TeamPage'
import ContactPage from './components/ContactPage'

function useHashRoute() {
  const [hash, setHash] = useState(
    typeof window !== 'undefined' ? window.location.hash : ''
  )
  useEffect(() => {
    const onHash = () => {
      setHash(window.location.hash)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return hash
}

export default function App() {
  const hash = useHashRoute()

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        {hash === '#/cars' ? (
          <CarsPage />
        ) : hash === '#/formula-student' ? (
          <FormulaStudentPage />
        ) : hash === '#/sponsors' ? (
          <SponsorsPage />
        ) : hash === '#/team' ? (
          <TeamPage />
        ) : hash === '#/contact' ? (
          <ContactPage />
        ) : (
          <>
            <Hero />
            <About />
            <Stats />
            <Cars />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
