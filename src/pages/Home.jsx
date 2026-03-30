import { useState } from 'react'
import { Link } from 'react-router-dom'
import galleryItems from '../data/gallery.json'
import operationsData from '../data/operations.json'
import { sendToTelegram } from '../utils/sendToTelegram'

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
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 bg-[#EBF5FB] text-[#2E86DE] text-xs font-bold uppercase tracking-widest rounded mb-4">
            {gallery.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e]">
            {gallery.title}
          </h2>
        </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl cursor-pointer">
              {item.src ? (
                <img src={item.src} alt={item.title} className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700" />
              ) : (
                <div className="w-full h-[280px] bg-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                   <p className="text-xs text-gray-400">Rasm {item.id}</p>
                </div>
              )}
              <div className="absolute top-3 right-3 z-10 w-10 h-10 bg-[#2E86DE] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" d="M12 4v16m8-8H4" /></svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="text-[#2E86DE] text-xs font-bold uppercase tracking-widest">{item.label}</span>
                <h4 className="text-[#1a3c5e] font-bold text-base mt-1">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <button onClick={loadMore} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2E86DE] hover:bg-[#2474c4] text-white font-bold text-sm uppercase tracking-wider rounded-full transition-all shadow-lg cursor-pointer">
              {gallery.loadMore}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default function Home({ lang, t }) {
  const about = t.home.about
  const m = t.modal
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal form state
  const [modalName, setModalName] = useState('')
  const [modalPhone, setModalPhone] = useState('')
  const [modalLoading, setModalLoading] = useState(false)

  // Contact form state
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMsg, setContactMsg] = useState('')
  const [contactLoading, setContactLoading] = useState(false)

  // Modal submit
  async function handleModalSubmit(e) {
    e.preventDefault()
    setModalLoading(true)
    const msg = `🏥 <b>Konsultatsiyaga yozilish</b>\n\n👤 Ism: ${modalName}\n📞 Tel: ${modalPhone}\n📍 Sahifa: Bosh sahifa`
    const ok = await sendToTelegram(msg)
    setModalLoading(false)
    if (ok) {
      setModalName('')
      setModalPhone('')
      setIsModalOpen(false)
    }
  }

  // Contact form submit
  async function handleContactSubmit(e) {
    e.preventDefault()
    setContactLoading(true)
    const msg = `📋 <b>Bepul baho olish</b>\n\n👤 Ism: ${contactName}\n📞 Tel: ${contactPhone}\n💬 Xabar: ${contactMsg}\n📍 Sahifa: Bosh sahifa`
    const ok = await sendToTelegram(msg)
    setContactLoading(false)
    if (ok) {
      setContactName('')
      setContactPhone('')
      setContactMsg('')
    }
  }

  return (
    <div>
      {/* ── About Section ── */}
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

              {/* TUGMA: Modalni ochadi */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2E86DE] hover:bg-[#2474c4] text-white font-bold text-sm uppercase tracking-wider rounded transition-all shadow-lg shadow-[#2E86DE]/30 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                {about.btn}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>

            {/* Right — Image */}
            <div className="relative">
              <img
                src="https://medicate.peacefulqode.co.in/wp-content/uploads/2022/04/about-5.jpg"
                alt="Doctor"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Services + Stats ── */}
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://medicate.peacefulqode.co.in/wp-content/uploads/2022/03/3-2.png')` }} />
        <div className="absolute inset-0 bg-[#1a5276]/85" />
        <div className="relative z-10">
          <div className="py-20 md:py-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
              <span className="inline-block px-4 py-1.5 bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-widest rounded mb-4">{t.services.badge}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-14">{t.services.title}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.services.items.slice(0, 3).map((s, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md p-7 transition-all duration-500 hover:-translate-y-2 group hover:bg-[#2E86DE] cursor-pointer text-left">
                    <h4 className="font-bold text-[#1a3c5e] text-lg group-hover:text-white mb-4">{s.name}</h4>
                    <p className="text-gray-500 text-sm mb-4 group-hover:text-white/80">{s.desc}</p>
                    <span className="text-[#2E86DE] text-sm font-bold group-hover:text-white">{t.hero.btn} +</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pb-20 md:pb-28">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="bg-[#2E86DE] rounded-2xl py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-xl">
                {t.home.stats.map((stat, i) => (
                  <div key={i} className="text-center text-white">
                    <div className="text-4xl font-extrabold">{stat.number}+</div>
                    <div className="text-xs uppercase tracking-wider opacity-80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GallerySection t={t} />

      {/* ── Operations Section ── */}
      <section className="py-20 md:py-28 bg-[#f7fafd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 bg-[#EBF5FB] text-[#2E86DE] text-xs font-bold uppercase tracking-widest rounded mb-4">{operationsData[lang].badge}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e] mb-3">{operationsData[lang].title}</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">{operationsData[lang].desc}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {operationsData[lang].items.slice(0, 4).map((item) => (
              <Link to="/services" key={item.id} className="bg-white rounded-2xl shadow-md p-6 hover:-translate-y-1 transition-all group block">
                <div className="relative mb-4">
                  <img src={item.img || 'https://via.placeholder.com/300x200'} alt={item.name} className="w-full h-40 object-cover rounded-xl" />
                  <div className="absolute top-3 left-3 w-8 h-8 bg-[#2E86DE] rounded-lg flex items-center justify-center text-white font-bold text-xs">{String(item.id).padStart(2, '0')}</div>
                </div>
                <h4 className="font-bold text-[#1a3c5e] text-[15px] mb-2 group-hover:text-[#2E86DE]">{item.name}</h4>
                <span className="text-[#2E86DE] text-sm font-bold">{operationsData[lang].btn} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bog'lanish Section ── */}
      <section className="py-20 md:py-28 bg-[#f0f4f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-[#2E86DE] text-sm font-bold uppercase tracking-widest mb-3 block">{t.home.contact.badge}</span>
            <h2 className="text-3xl font-extrabold text-[#1a3c5e] mb-8">{t.home.contact.title}</h2>
            <img src="https://medicate.peacefulqode.co.in/wp-content/uploads/2022/04/about-5.jpg" alt="Doctor" className="rounded-2xl w-full object-cover h-[350px]" />
          </div>
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-extrabold text-[#1a3c5e] mb-6">{t.home.contact.formTitle}</h3>
              <form onSubmit={handleContactSubmit} className="grid gap-4">
                <input type="text" placeholder={t.home.contact.namePlaceholder} value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full px-4 py-3 bg-[#f5f7fa] rounded-full text-sm outline-none focus:ring-2 focus:ring-[#2E86DE]/30" required />
                <input type="tel" placeholder={t.home.contact.phonePlaceholder} value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full px-4 py-3 bg-[#f5f7fa] rounded-full text-sm outline-none focus:ring-2 focus:ring-[#2E86DE]/30" required />
                <textarea rows="4" placeholder={t.home.contact.messagePlaceholder} value={contactMsg} onChange={(e) => setContactMsg(e.target.value)} className="w-full px-4 py-3 bg-[#f5f7fa] rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#2E86DE]/30" required />
                <button type="submit" disabled={contactLoading} className="bg-[#2E86DE] text-white py-3.5 rounded-full font-bold uppercase tracking-widest shadow-lg hover:bg-[#2474c4] transition-all cursor-pointer disabled:opacity-50">{contactLoading ? '⏳ Yuborilmoqda...' : t.home.contact.submit}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODAL (POPUP) ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-[500px] rounded-[40px] p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h2 className="text-3xl font-bold text-[#1a3c5e] mb-2">{m.title}</h2>
            <p className="text-gray-500 text-sm mb-10">{m.desc}</p>
            <form className="space-y-6" onSubmit={handleModalSubmit}>
              <div>
                <label className="block text-sm font-bold text-[#1a3c5e] mb-2">{m.nameLabel}</label>
                <input type="text" placeholder={m.namePlaceholder} value={modalName} onChange={(e) => setModalName(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#1a3c5e] mb-2">{m.phoneLabel}</label>
                <input type="tel" placeholder={m.phonePlaceholder} value={modalPhone} onChange={(e) => setModalPhone(e.target.value)} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none" required />
              </div>
              <button type="submit" disabled={modalLoading} className="w-full py-5 bg-[#0D6EFD] text-white font-bold rounded-full shadow-xl shadow-blue-200 hover:bg-[#0b5ed7] transition-all uppercase tracking-widest text-sm mt-4 cursor-pointer disabled:opacity-50">{modalLoading ? '⏳ Yuborilmoqda...' : m.submit}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}