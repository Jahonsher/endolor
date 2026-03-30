import { Link } from 'react-router-dom'
import operationsData from '../data/operations.json'

export default function Services({ lang, t }) {
  const ops = operationsData[lang]

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-[#EBF5FB] text-[#2E86DE] text-xs font-bold uppercase tracking-widest rounded mb-4">
            {ops.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c5e] mb-3">
            {ops.title}
          </h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            {ops.desc}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ops.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
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
                {ops.serviceBtn}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}