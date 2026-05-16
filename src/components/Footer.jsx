import { Link } from 'react-router-dom'
import { useI18n } from '../i18n.jsx'

export default function Footer() {
  const { t } = useI18n()
  const links = [
    { to: '/', key: 'home' },
    { to: '/formula-student', key: 'formulaStudent' },
    { to: '/sponsors', key: 'sponsors' },
    { to: '/cars', key: 'cars' },
    { to: '/team', key: 'team' },
    { to: '/contact', key: 'contact' },
  ]
  return (
    <footer id="contact" className="bg-[#050709] py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_1fr] gap-10">
        <div>
          <Link to="/" className="inline-block mb-6">
            <img src="/logomavibeyaz.png" alt="ITU Racing" className="h-24 w-auto" />
          </Link>
          <p className="text-sm text-muted leading-relaxed">{t.footer.address1}</p>
          <p className="text-sm text-muted leading-relaxed">{t.footer.address2}</p>
          <p className="text-sm text-accent leading-relaxed mt-1">ituformula@gmail.com</p>

          <div className="mt-5 flex gap-4">
            <a
              href="https://www.linkedin.com/company/ituracing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded flex items-center justify-center text-white hover:text-accent transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/itu_racing/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded flex items-center justify-center text-white hover:text-accent transition"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-1.07.05-1.65.23-2.04.38a3.4 3.4 0 0 0-1.27.82 3.4 3.4 0 0 0-.82 1.27c-.15.39-.33.97-.38 2.04C2.7 8.5 2.7 8.85 2.7 12s0 3.5.05 4.74c.05 1.07.23 1.65.38 2.04.18.46.4.78.82 1.27.42.42.81.64 1.27.82.39.15.97.33 2.04.38 1.24.05 1.59.07 4.74.07s3.5 0 4.74-.07c1.07-.05 1.65-.23 2.04-.38a3.4 3.4 0 0 0 1.27-.82 3.4 3.4 0 0 0 .82-1.27c.15-.39.33-.97.38-2.04.05-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.05-1.07-.23-1.65-.38-2.04a3.4 3.4 0 0 0-.82-1.27 3.4 3.4 0 0 0-1.27-.82c-.39-.15-.97-.33-2.04-.38C15.5 4 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06zm0 8.16A3.22 3.22 0 1 0 8.78 12 3.22 3.22 0 0 0 12 15.22zm6.3-8.36a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCU_1aBmTO7zBaMWX5pp_C5A"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded flex items-center justify-center text-white hover:text-accent transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6a3 3 0 0 0-2.1 2.1A31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <ul className="grid gap-3 text-sm text-muted">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-accent transition">
                  {t.nav[l.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-12 text-center text-xs text-[#6b7480]">
        {t.footer.copyright}
      </p>
    </footer>
  )
}
