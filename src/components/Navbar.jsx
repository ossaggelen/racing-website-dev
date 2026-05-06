import { useState, useEffect } from 'react'
import { useI18n } from '../i18n.jsx'

function Logo() {
  // Stylised "ITU" mark — thin vertical-bar letterforms with cyan dot accents
  // and "R·A·C·I·N·G" beneath in spaced caps
  return (
    <a href="#/" className="flex flex-col items-start leading-none select-none">
      <svg width="92" height="46" viewBox="0 0 92 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ITU Racing">
        {/* I */}
        <rect x="2" y="2" width="14" height="3" fill="#fff" />
        <rect x="7.5" y="2" width="3" height="38" fill="#fff" />
        <rect x="2" y="40" width="14" height="3" fill="#fff" />

        {/* T — built from vertical bars to evoke the original mark */}
        <rect x="26" y="2" width="3" height="38" fill="#fff" />
        <rect x="36.5" y="2" width="3" height="38" fill="#fff" />
        <rect x="47" y="2" width="3" height="38" fill="#fff" />
        {/* T crossbar dots */}
        <rect x="29" y="9" width="3" height="3" fill="#2dd4dc" />
        <rect x="44" y="9" width="3" height="3" fill="#2dd4dc" />

        {/* U */}
        <rect x="60" y="2" width="3" height="38" fill="#fff" />
        <rect x="76" y="2" width="3" height="38" fill="#fff" />
        <rect x="60" y="40" width="19" height="3" fill="#fff" />
        {/* U inner dots */}
        <rect x="65" y="33" width="3" height="3" fill="#2dd4dc" />
        <rect x="71" y="33" width="3" height="3" fill="#2dd4dc" />
      </svg>
      <span className="text-[9px] tracking-[0.42em] text-white mt-1.5 font-semibold">
        R·A·C·I·N·G
      </span>
    </a>
  )
}

export default function Navbar() {
  const { lang, setLang, t } = useI18n()
  const links = [
    { href: '#/', key: 'home', match: ['', '#/', '#'] },
    { href: '#/formula-student', key: 'formulaStudent', match: ['#/formula-student'] },
    { href: '#/cars', key: 'cars', match: ['#/cars'] },
    { href: '#/sponsors', key: 'sponsors', match: ['#/sponsors'] },
    { href: '#/team', key: 'team', match: ['#/team'] },
    { href: '#/contact', key: 'contact', match: ['#/contact'] },
  ]

  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '')

  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const isActive = (l) => l.match.includes(hash) || (l.href === '#/' && hash === '')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="relative flex items-center justify-between px-8 lg:px-14 h-[88px]">
        {/* Logo (left) */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Nav (centered absolutely so logo size doesn't shift it) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-12 lg:gap-16">
          {links.map((l) => {
            const active = isActive(l)
            return (
              <a
                key={l.href}
                href={l.href}
                className={`text-[15px] tracking-wide transition-colors ${
                  active ? 'text-accent' : 'text-white hover:text-accent'
                }`}
              >
                {t.nav[l.key]}
              </a>
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
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-sm tracking-wide border-b border-white/5 hover:bg-white/5"
            >
              {t.nav[l.key]}
            </a>
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
