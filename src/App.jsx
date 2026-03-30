import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Videos from './pages/Videos'
import Contact from './pages/Contact'
import translations from './data/translations'

function AppContent({ lang, setLang }) {
  const t = translations[lang]
  const location = useLocation()

  return (
    <div className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero faqat bosh sahifada ko'rinadi */}
      {location.pathname === '/' && <Hero lang={lang} t={t} />}

      {/* Boshqa sahifalarda navbar ostida bo'sh joy */}
      {location.pathname !== '/' && <div className="h-[70px]" />}

      <Routes>
        <Route path="/" element={<Home lang={lang} t={t} />} />
        <Route path="/services" element={<Services lang={lang} t={t} />} />
        <Route path="/about" element={<About lang={lang} t={t} />} />
        <Route path="/videos" element={<Videos lang={lang} t={t} />} />
        <Route path="/contact" element={<Contact lang={lang} t={t} />} />
      </Routes>

      <Footer lang={lang} />
    </div>
  )
}

function App() {
  const [lang, setLang] = useState('uz')

  return (
    <BrowserRouter>
      <AppContent lang={lang} setLang={setLang} />
    </BrowserRouter>
  )
}

export default App