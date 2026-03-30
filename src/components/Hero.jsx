import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slideImages = [
  'https://medicate.peacefulqode.co.in/wp-content/uploads/2022/04/1-21.jpg',
  'https://medicate.peacefulqode.co.in/wp-content/uploads/revslider/Home-5/1..jpg',
  'https://medicate.peacefulqode.co.in/wp-content/uploads/revslider/Home-5/2-611.jpg',
]

export default function Hero({ lang, t }) {
  const [current, setCurrent] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slideImages.length
        setAnimKey((k) => k + 1)
        return next
      })
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  function goToSlide(index) {
    setCurrent(index)
    setAnimKey((k) => k + 1)
  }

  function prevSlide() {
    goToSlide(current === 0 ? slideImages.length - 1 : current - 1)
  }

  function nextSlide() {
    goToSlide((current + 1) % slideImages.length)
  }

  const slide = t.hero.slides[current]

  return (
    <section id="home" className="relative">
      {/* Slider area */}
      <div className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* ── Background Slides ── */}
      {slideImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ zIndex: index === current ? 1 : 0 }}
        >
          <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340]/90 via-[#0c2340]/70 to-[#0c2340]/30" />
        </div>
      ))}

      {/* ── Hex pattern ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 17.5V42.5L30 55L5 42.5V17.5L30 5z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Medical crosses ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <svg className="absolute left-6 top-1/4 w-20 h-20 text-white/[0.04]" viewBox="0 0 64 64">
          <path d="M24 0h16v24h24v16H40v24H24V40H0V24h24z" fill="currentColor" />
        </svg>
        <svg className="absolute left-1/4 bottom-1/4 w-14 h-14 text-white/[0.04]" viewBox="0 0 64 64">
          <path d="M24 0h16v24h24v16H40v24H24V40H0V24h24z" fill="currentColor" />
        </svg>
        <svg className="absolute left-[15%] top-[60%] w-10 h-10 text-white/[0.04]" viewBox="0 0 64 64">
          <path d="M24 0h16v24h24v16H40v24H24V40H0V24h24z" fill="currentColor" />
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-[5] h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-xl" key={animKey}>
            {/* Badge */}
            <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-[#5DADE2] text-xs font-bold uppercase tracking-[0.2em] rounded mb-6 animate-[fadeUp_0.6s_ease_forwards] opacity-0">
              {slide.badge}
            </span>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-[52px] font-extrabold text-white leading-[1.1] mb-6 animate-[fadeUp_0.6s_0.15s_ease_forwards] opacity-0">
              {slide.title1}
              <br />
              <span className="text-[#5DADE2]">{slide.title2}</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-md animate-[fadeUp_0.6s_0.3s_ease_forwards] opacity-0">
              {slide.desc}
            </p>

            {/* Button */}
            <div className="flex flex-wrap gap-4 animate-[fadeUp_0.6s_0.45s_ease_forwards] opacity-0">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2E86DE] hover:bg-[#2474c4] text-white font-bold text-sm uppercase tracking-wider rounded transition-all shadow-lg shadow-[#2E86DE]/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                {t.hero.btn}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Arrows ── */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Dots ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {slideImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === current
                ? 'w-8 bg-[#2E86DE]'
                : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      </div>{/* end slider area */}

      {/* ── Service Cards (hero ichida, pastga chiqib turadi) ── */}
      <div className="relative z-10 -mt-16 pb-8 hidden md:block">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6">
            {t.services.items.slice(0, 3).map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-xl p-6 flex items-start gap-4 hover:shadow-2xl transition-all hover:-translate-y-1 duration-300"
              >
                <div className="shrink-0 w-14 h-14 bg-[#EBF5FB] rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#2E86DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                    {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                    {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a3c5e] text-[15px] mb-1">{service.name}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{service.desc}</p>
                  <Link to="/services" className="text-[#2E86DE] text-xs font-bold mt-2 inline-flex items-center gap-1 hover:gap-2 transition-all">
                    {t.hero.btn} <span>+</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}