import { useState } from 'react'
import translations from '../data/translations'
import { sendToTelegram } from '../utils/sendToTelegram'

export default function Contact({ lang, t }) {
  const c = t.contactPage

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const msg = `📩 <b>Kontakt sahifasidan xabar</b>\n\n👤 Ism: ${name}\n📧 Email: ${email}\n📞 Tel: ${phone}\n📌 Mavzu: ${subject || 'Ko\'rsatilmagan'}\n💬 Xabar: ${message}\n📍 Sahifa: Kontakt`
    const ok = await sendToTelegram(msg)
    setLoading(false)
    if (ok) {
      setName('')
      setEmail('')
      setPhone('')
      setSubject('')
      setMessage('')
    }
  }

  return (
    <div>
      {/* ── Page Header ── */}
      <section className="bg-gradient-to-r from-[#0c2340] to-[#1a3c5e] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">{c.pageTitle}</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
            <a href="/" className="hover:text-[#5DADE2] transition-colors">{t.nav.home}</a>
            <span>/</span>
            <span className="text-[#5DADE2]">{t.nav.contact}</span>
          </div>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Location */}
            <div className="bg-[#f7fafd] rounded-2xl p-7 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#2E86DE] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-[#1a3c5e] text-base mb-2">{c.locationTitle}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{c.address}</p>
            </div>

            {/* Phone */}
            <div className="bg-[#f7fafd] rounded-2xl p-7 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#2E86DE] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="font-bold text-[#1a3c5e] text-base mb-2">{c.phoneTitle}</h4>
              <a href="tel:+998903258600" className="text-gray-500 text-sm hover:text-[#2E86DE] transition-colors block">+998 90 325 86 00</a>
              <a href="tel:+998903258600" className="text-gray-500 text-sm hover:text-[#2E86DE] transition-colors block mt-1">+998 90 325 86 00</a>
            </div>

            {/* Email */}
            <div className="bg-[#f7fafd] rounded-2xl p-7 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#2E86DE] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-[#1a3c5e] text-base mb-2">{c.emailTitle}</h4>
              <a href="mailto:info@Tympanoplastika.uz" className="text-gray-500 text-sm hover:text-[#2E86DE] transition-colors block">info@Tympanoplastika.uz</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form + Map ── */}
      <section className="py-16 bg-[#f7fafd]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[#2E86DE] text-sm font-bold uppercase tracking-widest mb-3 block">
              {c.formBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e]">
              {c.formTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold text-[#1a3c5e] mb-1.5 block">{c.name} *</label>
                  <input
                    type="text"
                    placeholder={c.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1a3c5e] mb-1.5 block">{c.email} *</label>
                  <input
                    type="email"
                    placeholder={c.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30"
                    required
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold text-[#1a3c5e] mb-1.5 block">{c.phone} *</label>
                  <input
                    type="tel"
                    placeholder={c.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-[#1a3c5e] mb-1.5 block">{c.subject}</label>
                  <input
                    type="text"
                    placeholder={c.subjectPlaceholder}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="text-sm font-semibold text-[#1a3c5e] mb-1.5 block">{c.message} *</label>
                <textarea
                  rows="5"
                  placeholder={c.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f5f7fa] border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E86DE]/30 resize-none"
                  required
                />
              </div>
              <button type="submit" disabled={loading} className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2E86DE] hover:bg-[#2474c4] text-white font-bold text-sm uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-[#2E86DE]/30 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer disabled:opacity-50">
                {loading ? '⏳ Yuborilmoqda...' : c.submit}
                {!loading && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>}
              </button>
              </form>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-md min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5!2d69.204!3d41.311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2747a4280f%3A0x3c1d3b2e3c1d3b2e!2sChilanzar%2017-kvartal%2C%20Bunyodkor%20Avenue%2C%20Tashkent!5e0!3m2!1sen!2suz!4v1700000000000!5m2!1sen!2suz"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EndoLOR Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}