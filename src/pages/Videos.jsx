import React, { useState } from 'react';
import videoDataAll from '../data/videos.json';

const Videos = ({ lang = 'uz' }) => {
  // Tanlangan tildagi kontentni olish
  const currentContent = videoDataAll[lang] || videoDataAll['uz'];
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Qaysi video hozirda kard ichida ijro etilayotganini saqlash
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Filtrlash
  const filteredVideos = activeFilter === 'all' 
    ? currentContent.items 
    : currentContent.items.filter(v => v.category === activeFilter);

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center text-white text-center">
        <div className="absolute inset-0 bg-[#1a2b48]/80 z-10"></div>
        <img 
          src="https://endolor.uz/assets/images/about/1.jpg" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="hero" 
        />
        <div className="relative z-20 px-4">
          <p className="text-[10px] md:text-[12px] tracking-[0.4em] uppercase mb-4 opacity-90 font-bold">{currentContent.heroSubtitle}</p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{currentContent.heroTitle}</h1>
          <p className="text-sm opacity-70 font-medium">{currentContent.breadcrumb}</p>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-12 md:py-20 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16">
          <div className="max-w-xl">
            <p className="text-[#00c2cb] font-bold text-xs tracking-[0.2em] mb-3 uppercase">{currentContent.filterBadge}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2b48] mb-4 leading-tight">{currentContent.filterTitle}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{currentContent.filterDesc}</p>
          </div>

          <div className="flex flex-wrap gap-2 lg:max-w-2xl justify-start lg:justify-end">
            {Object.keys(currentContent.categories).map((catKey) => (
              <button
                key={catKey}
                onClick={() => {
                  setActiveFilter(catKey);
                  setActiveVideoId(null); // Filtr o'zgarganda pleyerlarni yopish
                }}
                className={`px-5 py-2.5 rounded-full text-[11px] font-bold transition-all border uppercase tracking-wider ${
                  activeFilter === catKey 
                  ? 'bg-[#0056b3] text-white border-[#0056b3] shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-400 border-gray-200 hover:border-[#00c2cb] hover:text-[#00c2cb]'
                }`}
              >
                {currentContent.categories[catKey]}
              </button>
            ))}
          </div>
        </div>

        {/* VIDEO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredVideos.map((video) => (
            <div key={video.id} className="flex flex-col group">
              
              {/* VIDEO CARD CONTAINER */}
              <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden shadow-sm border border-gray-100 bg-black group-hover:shadow-2xl transition-all duration-500">
                
                {activeVideoId === video.id ? (
                  /* AGAR VIDEO BOSILSA - IFRAME CHIQADI */
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  /* DEFAULT HOLAT - THUMBNAIL */
                  <div 
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => setActiveVideoId(video.id)}
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                      alt={video.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-125 transition-transform duration-300">
                        <svg className="w-8 h-8 text-[#0056b3] ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>

                    {/* Category Label */}
                    <div className="absolute top-5 left-5 bg-[#1a2b48]/90 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider">
                      {currentContent.categories[video.category]}
                    </div>

                    <span className="absolute bottom-5 right-5 text-white text-[10px] font-bold opacity-80 uppercase tracking-[0.2em] drop-shadow-lg">
                      Shorts
                    </span>
                  </div>
                )}
              </div>

              {/* VIDEO TEXT INFO */}
              <div className="pt-5 px-1">
                <h3 className="text-[#1a2b48] font-bold text-[15px] mb-2 leading-snug line-clamp-2 h-11 group-hover:text-[#0056b3] transition-colors">
                  {video.title}
                </h3>
                <button 
                   onClick={() => setActiveVideoId(activeVideoId === video.id ? null : video.id)}
                   className="text-[#00c2cb] text-[11px] font-extrabold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                >
                  {activeVideoId === video.id ? 'STOP' : currentContent.playBtn} 
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-20 text-gray-300 font-medium text-lg">
             Hozircha bu bo'limda videolar yo'q.
          </div>
        )}
      </section>
    </div>
  );
};

export default Videos;