import { useState } from 'react'
import operationsData from '../data/operations.json'
import { sendToTelegram } from '../utils/sendToTelegram'

export default function Services({ lang, t }) {
  // Tanlangan tildagi operatsiyalar ro'yxatini olish
  const ops = operationsData[lang]
  // translations.js dan modal matnlarini olish
  const m = t.modal

  // Modal oynani ochish/yopish uchun state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const msg = `💼 <b>Xizmatdan foydalanish</b>\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n📍 Sahifa: Xizmatlar`
    const ok = await sendToTelegram(msg)
    setLoading(false)
    if (ok) {
      setName('')
      setPhone('')
      setIsModalOpen(false)
    }
  }

  return (
    <div className="py-10 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-[#EBF5FB] text-[#2E86DE] text-xs font-bold uppercase tracking-widest rounded mb-4">
            {ops.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e] mb-3">
            {ops.title}
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            {ops.desc}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ops.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[24px] shadow-md hover:shadow-2xl p-6 transition-all duration-300 hover:-translate-y-2 group border border-gray-100 flex flex-col justify-between"
            >
              <div>
                {/* Image Section */}
                <div className="relative mb-5">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="w-full h-44 object-cover rounded-2xl" />
                  ) : (
                    <div className="w-full h-44 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                      <svg className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-9 h-9 bg-[#2E86DE] rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg border-2 border-white/20">
                    {String(item.id).padStart(2, '0')}
                  </div>
                </div>

                <h4 className="font-bold text-[#1a3c5e] text-lg mb-4 leading-tight group-hover:text-[#2E86DE] transition-colors">
                  {item.name}
                </h4>
              </div>

              {/* TUGMA: Bosilganda modalni ochadi */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-[#2E86DE] text-sm font-extrabold uppercase tracking-wider inline-flex items-center gap-2 group-hover:gap-3 transition-all mt-auto cursor-pointer"
              >
                {ops.serviceBtn}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL POPUP (Biz bilan bog'lanish) ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-[500px] rounded-[32px] p-8 md:p-12 shadow-2xl animate-in zoom-in duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-8 right-8 text-gray-400 hover:text-red-500 hover:rotate-90 transition-all"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {/* Modal Head */}
            <h2 className="text-3xl font-black text-[#1a3c5e] mb-2 leading-tight">
              {m.title}
            </h2>
            <p className="text-gray-500 text-[15px] mb-10 leading-relaxed font-medium">
              {m.desc}
            </p>

            {/* Modal Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{m.nameLabel}</label>
                <input 
                  type="text" 
                  placeholder={m.namePlaceholder} 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-blue-500 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-700 font-semibold" 
                  required 
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">{m.phoneLabel}</label>
                <input 
                  type="tel" 
                  placeholder={m.phonePlaceholder} 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent focus:border-blue-500 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all outline-none text-gray-700 font-semibold" 
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-[#0D6EFD] text-white font-bold rounded-full shadow-2xl shadow-blue-300 hover:bg-[#0b5ed7] transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-[0.2em] text-xs mt-4 cursor-pointer disabled:opacity-50"
              >
                {loading ? '⏳ Yuborilmoqda...' : m.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}