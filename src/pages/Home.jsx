import { useState } from 'react'
import { Link } from 'react-router-dom'
import galleryItems from '../data/gallery.json'
import operationsData from '../data/operations.json'

const filterTabs = [
  { key: 'all', label: 'all' },
  { key: 'clinic', label: 'clinic' },
  { key: 'family', label: 'family' },
  { key: 'laboratory', label: 'laboratory' },
  { key: 'pediatrics', label: 'pediatrics' },
  { key: 'therapy', label: 'therapy' },
]

function GallerySection({ t }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter)

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  function handleFilter(key) {
    setActiveFilter(key)
    setVisibleCount(6)
  }

  function loadMore() {
    setVisibleCount((prev) => prev + 3)
  }

  const gallery = t.home.gallery

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-[#EBF5FB] text-[#2E86DE] text-xs font-bold uppercase tracking-widest rounded mb-4">
            {gallery.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e]">
            {gallery.title}
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleFilter(tab.key)}
              className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 cursor-pointer ${
                activeFilter === tab.key
                  ? 'bg-[#2E86DE] text-white shadow-lg shadow-[#2E86DE]/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {gallery.filters[tab.key]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl cursor-pointer animate-[fadeUp_0.4s_ease_forwards]"
            >
              {/* Image */}
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-[280px] bg-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                  <div className="text-center text-gray-400">
                    <svg className="w-10 h-10 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs">Rasm {item.id}</p>
                  </div>
                </div>
              )}

              {/* Plus icon — yuqori o'ng burchak */}
              <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-[#2E86DE] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400 shadow-lg cursor-pointer">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>

              {/* Pastki label — hover da pastdan chiqadi */}
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="text-[#2E86DE] text-xs font-bold uppercase tracking-widest">
                  {item.label}
                </span>
                <h4 className="text-[#1a3c5e] font-bold text-base mt-1">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2E86DE] hover:bg-[#2474c4] text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all shadow-lg shadow-[#2E86DE]/30 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              {gallery.loadMore}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default function Home({ lang, t }) {
  const about = t.home.about

  return (
    <div>
      {/* ── About / Biz haqimizda Section ── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#EBF5FB] text-[#2E86DE] text-xs font-bold uppercase tracking-widest rounded mb-4">
                {about.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e] mb-8 leading-tight">
                {about.title}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {about.desc}
              </p>

              {/* Symptoms list */}
              <div className="space-y-3 mb-8">
                {about.symptoms.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 bg-[#EBF5FB] rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-[#2E86DE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2E86DE] hover:bg-[#2474c4] text-white font-bold text-sm uppercase tracking-wider rounded transition-all shadow-lg shadow-[#2E86DE]/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                {about.btn}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Right — Image */}
            <div className="relative">
              <img
                src="https://medicate.peacefulqode.co.in/wp-content/uploads/2022/04/about-5.jpg"
                alt="Doctor"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              {/* Experience badge */}
              <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-[#2E86DE] rounded-2xl flex items-center justify-center shadow-lg">
                <div className="text-center text-white">
                  <div className="text-3xl font-extrabold">24/7</div>
                  <div className="text-[9px] uppercase tracking-wider mt-1">{about.available}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services + Stats (ko'k fon + rasm) ── */}
      <section className="relative">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('https://medicate.peacefulqode.co.in/wp-content/uploads/2022/03/3-2.png')` }}
        />
        {/* Ko'k overlay */}
        <div className="absolute inset-0 bg-[#1a5276]/85" />

        {/* Content */}
        <div className="relative z-10">
          {/* Services */}
          <div className="py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-14">
                <span className="inline-block px-4 py-1.5 bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded mb-4">
                  {t.services.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  {t.services.title}
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.services.items.slice(0, 3).map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md hover:shadow-2xl p-7 transition-all duration-500 hover:-translate-y-2 group hover:bg-[#2E86DE] cursor-pointer"
                  >
                    <div className="mb-5 flex items-center gap-4">
                      <div className="w-16 h-16 bg-[#EBF5FB] rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors duration-500 [perspective:200px]">
                        <svg
                          className="w-8 h-8 text-[#2E86DE] group-hover:text-white transition-all duration-500 group-hover:[transform:rotateY(180deg)]"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"
                        >
                          {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                          {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                          {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />}
                        </svg>
                      </div>
                      <h4 className="font-bold text-[#1a3c5e] text-lg group-hover:text-white transition-colors duration-500">{s.name}</h4>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 group-hover:text-white/80 transition-colors duration-500">{s.desc}</p>
                    <span className="text-[#2E86DE] text-sm font-bold inline-flex items-center gap-1 group-hover:text-white">
                      {t.hero.btn} <span>+</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats — ko'k blok */}
          <div className="pb-20 md:pb-28 pt-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="bg-[#2E86DE] rounded-2xl py-12 px-6 md:px-12 shadow-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {t.home.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                        {stat.number}<span className="text-white/70">+</span>
                      </div>
                      <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <GallerySection t={t} />

      {/* ── Operations / Process Section ── */}
      <section className="py-20 md:py-28 bg-[#f7fafd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#EBF5FB] text-[#2E86DE] text-xs font-bold uppercase tracking-widest rounded mb-4">
              {operationsData[lang].badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e] mb-3">
              {operationsData[lang].title}
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              {operationsData[lang].desc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {operationsData[lang].items.slice(0, 4).map((item, i) => (
              <Link
                to="/services"
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 group block"
              >
                <div className="relative mb-4">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="w-full h-40 object-cover rounded-xl" />
                  ) : (
                    <div className="w-full h-40 bg-gray-100 rounded-xl flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 w-9 h-9 bg-[#2E86DE] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {String(item.id).padStart(2, '0')}
                  </div>
                </div>

                <h4 className="font-bold text-[#1a3c5e] text-[15px] mb-2 leading-snug group-hover:text-[#2E86DE] transition-colors">
                  {item.name}
                </h4>

                <span className="text-[#2E86DE] text-sm font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {operationsData[lang].btn}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2E86DE] hover:bg-[#2474c4] text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all shadow-lg shadow-[#2E86DE]/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              {operationsData[lang].allBtn}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Bog'lanish / Contact Section ── */}
      <section className="py-20 md:py-28 bg-[#f0f4f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Text + Image */}
            <div>
              <span className="text-[#2E86DE] text-sm font-bold uppercase tracking-widest mb-3 block">
                {t.home.contact.badge}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e] mb-8 leading-tight">
                {t.home.contact.title}
              </h2>
              {/* Rasm joyi */}
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://medicate.peacefulqode.co.in/wp-content/uploads/2022/04/about-5.jpg"
                  alt="Doctor"
                  className="w-full h-[300px] md:h-[350px] object-cover"
                />
              </div>
            </div>

            {/* Right — Form + Stats */}
            <div>
              {/* Form */}
              <div className="bg-white rounded-2xl p-8 shadow-md mb-6">
                <h3 className="text-xl font-extrabold text-[#1a3c5e] mb-6">
                  {t.home.contact.formTitle}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-semibold text-[#1a3c5e] mb-1.5 block">
                      {t.home.contact.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t.home.contact.namePlaceholder}
                      className="w-full px-4 py-3 bg-[#f5f7fa] border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#1a3c5e] mb-1.5 block">
                      {t.home.contact.phone} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder={t.home.contact.phonePlaceholder}
                      className="w-full px-4 py-3 bg-[#f5f7fa] border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30"
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label className="text-sm font-semibold text-[#1a3c5e] mb-1.5 block">
                    {t.home.contact.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows="4"
                    placeholder={t.home.contact.messagePlaceholder}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border-none rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30 resize-none"
                  />
                </div>
                <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2E86DE] hover:bg-[#2474c4] text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all shadow-lg shadow-[#2E86DE]/30 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer">
                  {t.home.contact.submit}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>

              {/* Stats block */}
              <div className="bg-[#2E86DE] rounded-2xl p-8">
                <h3 className="text-white font-extrabold text-xl md:text-2xl mb-6 leading-snug">
                  {t.home.contact.statsTitle}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {t.home.contact.stats.map((s, i) => (
                    <div key={i}>
                      <div className="text-3xl md:text-4xl font-extrabold text-white">
                        {s.number}
                      </div>
                      <div className="text-xs text-white/70 uppercase tracking-wider font-semibold mt-1">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}