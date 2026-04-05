import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import translations from '../data/translations'

const langConfig = [
  { code: 'uz', label: 'UZ', flag: '🇺🇿' },
  { code: 'oz', label: 'Ўз', flag: '🇺🇿' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
]

const navLinks = [
  { key: 'home', to: '/' },
  { key: 'services', to: '/services' },
  { key: 'about', to: '/about' },
  { key: 'videos', to: '/videos' },
  { key: 'contact', to: '/contact' },
]

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const t = translations[lang].nav
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[70px]">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
          <h1 className="font-bold text-xl text-blue-950">TYMPANO<span className="text-[#2E86DE]">PLASTIKA</span></h1>
            {/* <img
              src="https://endolor.uz/logo.png"
              alt="EndoLOR"
              className="h-12 md:h-14 w-auto object-contain"
            /> */}
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                className={`text-[13px] font-bold transition-colors uppercase tracking-wider ${
                  location.pathname === link.to
                    ? 'text-[#2E86DE]'
                    : 'text-gray-600 hover:text-[#2E86DE]'
                }`}
              >
                {t[link.key]}
              </Link>
            ))}
          </div>

          {/* ── Right: Phone + Lang ── */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+998903258600"
              className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 hover:text-[#2E86DE] transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-[#2E86DE] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              +998 90 325 86 00
            </a>

            <div className="flex items-center bg-gray-100 rounded-full p-[3px]">
              {langConfig.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                    lang === l.code
                      ? 'bg-[#2E86DE] text-white shadow-md'
                      : 'text-gray-500 hover:text-[#2E86DE]'
                  }`}
                >
                  <span className="text-sm">{l.flag}</span>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-[#2E86DE] transition-colors"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white ${
          mobileOpen ? 'max-h-[500px] border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <div className="px-5 py-5 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-bold uppercase tracking-wider py-2 border-b border-gray-50 ${
                location.pathname === link.to
                  ? 'text-[#2E86DE]'
                  : 'text-gray-600 hover:text-[#2E86DE]'
              }`}
            >
              {t[link.key]}
            </Link>
          ))}

          <a href="tel:+998903258600" className="flex items-center gap-2 text-sm font-bold text-[#2E86DE] py-2">
            📞 +998 90 325 86 00
          </a>

          <div className="flex gap-2 pt-2">
            {langConfig.map((l) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setMobileOpen(false) }}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  lang === l.code
                    ? 'bg-[#2E86DE] text-white'
                    : 'bg-gray-100 text-gray-500 hover:text-[#2E86DE]'
                }`}
              >
                <span>{l.flag}</span>
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}