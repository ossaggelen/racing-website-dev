import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'

function Logo() {
  return (
    <Link to="/" className="flex items-center leading-none select-none">
      <img src="/logomavibeyaz.png" alt="ITU Racing" className="h-[72px] w-auto" />
    </Link>
  )
}

export default function Navbar() {
  const { lang, setLang, t } = useI18n()
  const location = useLocation()
  const links = [
    { to: '/', key: 'home' },
    { to: '/formula-student', key: 'formulaStudent' },
    { to: '/cars', key: 'cars' },
    { to: '/sponsors', key: 'sponsors' },
    { to: '/team', key: 'team' },
    { to: '/contact', key: 'contact' },
  ]

  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY < 200) {
        // Always visible near the top
        setHidden(false)
      } else if (currentY > lastScrollY.current + 5) {
        setHidden(true)   // scrolling down with dead zone → hide
      } else if (currentY < lastScrollY.current - 5) {
        setHidden(false)  // scrolling up with dead zone → show
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (link) =>
    link.to === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(link.to)

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="relative flex items-center justify-between px-8 lg:px-14 h-[125px]">
        {/* Logo (left) */}
        <div className="flex-shrink-0 ml-6">
          <Logo />
        </div>

        {/* Nav (centered absolutely so logo size doesn't shift it) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-12 lg:gap-16">
          {links.map((l) => {
            const active = isActive(l)
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-[15px] tracking-wide whitespace-nowrap transition-colors ${
                  active ? 'text-accent' : 'text-white hover:text-accent'
                }`}
              >
                {t.nav[l.key]}
              </Link>
            )
          })}
        </nav>

        {/* Language switch (right) — solid teal button */}
        <div className="hidden md:block relative flex-shrink-0">
          <button
            onClick={() => setLangOpen((v) => !v)}
            onBlur={() => setTimeout(() => setLangOpen(false), 150)}
            className="inline-flex items-center gap-2 bg-accent2 hover:bg-accent text-white font-semibold rounded-md px-5 py-2.5 text-sm transition"
          >
            {lang.toUpperCase()}
            <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
              <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-2 w-24 rounded-md overflow-hidden bg-[#0e1418] ring-1 ring-white/10 shadow-xl">
              {['tr', 'en'].map((l) => (
                <button
                  key={l}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    setLang(l)
                    setLangOpen(false)
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm font-semibold transition ${
                    l === lang ? 'text-accent bg-white/5' : 'text-white hover:bg-white/5 hover:text-accent'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span className={`w-6 h-px bg-white transition ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-px bg-white transition ${open ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-white transition ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-black border-t border-white/10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm tracking-wide border-b border-white/5 hover:bg-white/5"
            >
              {t.nav[l.key]}
            </Link>
          ))}
          <div className="flex gap-3 px-6 py-4">
            {['tr', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
                  l === lang ? 'bg-accent2 text-white' : 'bg-white/5 text-white/70'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
