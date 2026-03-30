import React, { useState } from 'react';
import translations from '../data/translations';

const About = ({ lang = 'en' }) => {
  const t = translations[lang]?.aboutPage || translations['en'].aboutPage;

  const [activeImg, setActiveImg] = useState(0);
  const images = [
    "https://endolor.uz/carousel/carousel1.png",
    "https://endolor.uz/carousel/carousel2.png",
    "https://endolor.uz/carousel/carousel3.png",
    "https://endolor.uz/carousel/carousel4.png",
    "https://endolor.uz/carousel/carousel5.png",
  ];

  // Ijtimoiy tarmoq havolalari
  const socialLinks = [
    { name: 'YOUTUBE', url: 'https://www.youtube.com/@shavkatlor' },
    { name: 'INSTAGRAM', url: 'https://www.instagram.com/dr.shavkat_lor' },
    { name: 'TELEGRAM', url: 'https://t.me/shavkat_lor' },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[350px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src="https://endolor.uz/assets/images/about/1.jpg" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="hero" 
        />
        <div className="relative z-20 text-center">
          <h1 className="text-5xl font-bold mb-4">{t.hero.title}</h1>
          <p className="text-lg opacity-90">{t.hero.breadcrumb}</p>
        </div>
      </section>

      {/* SECTION 2: MAIN CONTENT */}
      <div className="container mx-auto px-4 mt-20 relative z-30 pb-20">
        <div className="bg-white rounded-[40px] shadow-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Chap tomon */}
            <div>
              <div className="rounded-3xl overflow-hidden shadow-lg mb-6 aspect-video">
                <iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/i1d-lO4rpeE" 
                title="Сизда эшитиш билан боғлиқ муаммо кузатиляптими? Энди буни ечими осон! ЭНДОСКОПИК ТИМПАНОПЛАСТИКА!" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowfullscreen></iframe>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <img src="https://endolor.uz/about1.jpg" alt="clinic" className="rounded-2xl h-32 w-full object-cover shadow-md" />
                <img src="https://endolor.uz/about2.jpg" alt="clinic" className="rounded-2xl h-32 w-full object-cover shadow-md" />
                <img src="https://endolor.uz/about3.jpg" alt="clinic" className="rounded-2xl h-32 w-full object-cover shadow-md" />
              </div>

              {/* Attention Box */}
              <div className="bg-[#fff9e6] border-1 border-yellow-500 p-6 rounded-2xl mt-8">
                <h4 className="text-[#d97706] font-bold mb-2 tracking-widest uppercase text-sm">{t.attentionBox.title}</h4>
                <p className="text-gray-700 font-semibold mb-3">{t.attentionBox.subtitle}</p>
                <ul className="space-y-2">
                  {t.attentionBox.list.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* O'ng tomon */}
            <div>
              <h2 className="text-3xl font-bold text-[#1a2b48] leading-tight mb-4">{t.mainTitle}</h2>
              <p className="text-[#00c2cb] font-bold text-sm tracking-widest mb-6">{t.subTitle}</p>
              <p className="text-gray-600 mb-4 leading-relaxed">{t.desc1}</p>
              <p className="text-gray-600 mb-8 leading-relaxed">{t.desc2}</p>

              {/* Consultation Box */}
              <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
                <h4 className="text-[#1a2b48] font-bold mb-2 text-lg">{t.consultationBox.title}</h4>
                <p className="text-gray-500 text-sm mb-4">{t.consultationBox.subtitle}</p>
                <ul className="space-y-2">
                  {t.consultationBox.list.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-[#00c2cb] rounded-full"></span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Buttons (YANGILANGAN QISMI) */}
              <div className="flex flex-wrap gap-4 mt-8">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 border border-gray-300 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-50 hover:text-[#00c2cb] hover:border-[#00c2cb] transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: GALLERY SLIDER */}
      <section className="bg-white py-20 text-center">
        <div className="container mx-auto px-4">
          <p className="text-[#00c2cb] font-bold text-xs tracking-[0.2em] mb-2 uppercase">{t.gallery.subtitle}</p>
          <h2 className="text-4xl font-bold text-[#1a2b48] mb-12">{t.gallery.title}</h2>
          
          <div className="relative max-w-5xl mx-auto group">
            <div className="rounded-[40px] overflow-hidden shadow-2xl h-[500px]">
              <img src={images[activeImg]} className="w-full h-full object-cover transition-all duration-500" alt="gallery-main" />
            </div>

            <button 
              onClick={() => setActiveImg(prev => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
              onClick={() => setActiveImg(prev => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="flex justify-center flex-wrap gap-4 mt-8">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImg(idx)}
                className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === idx ? 'border-[#00c2cb] scale-110 shadow-lg' : 'border-transparent opacity-60'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumb" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;