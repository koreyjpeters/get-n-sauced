
import React from 'react';
import { Link } from 'react-router-dom';
import { dataService } from '../services/dataService';

const Home: React.FC = () => {
  const info = dataService.getRestaurantInfo();

  // Updated visuals for the festive theme
  const cuisineHighlights = [
    { 
      name: 'Caribbean', 
      desc: 'Jerk spice, tender oxtail, and island rhythms on a plate.', 
      bg: 'bg-island-teal-50', 
      border: 'border-island-teal-200',
      text: 'text-island-teal-900', 
      btn: 'text-island-teal-600',
      img: 'https://picsum.photos/seed/carib/300/200' 
    },
    { 
      name: 'Soul Food', 
      desc: 'Comfort classics: Mac & Cheese, Yams, and love.', 
      bg: 'bg-sauce-orange-50', 
      border: 'border-sauce-orange-200',
      text: 'text-sauce-orange-900', 
      btn: 'text-sauce-orange-600',
      img: 'https://picsum.photos/seed/soul/300/200' 
    },
    { 
      name: 'Vegan', 
      desc: 'Plant-based deliciousness without compromise.', 
      bg: 'bg-vegan-green-50', 
      border: 'border-vegan-green-200',
      text: 'text-vegan-green-900', 
      btn: 'text-vegan-green-600',
      img: 'https://picsum.photos/seed/veg/300/200' 
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover" 
            alt="Caribbean Soul Food Feast" 
          />
          {/* Festive Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 opacity-90"></div>
          <div className="absolute inset-0 bg-sauce-orange-500/20 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-6">
          <div className="inline-block animate-bounce mb-4">
             <span className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm">
               Mount Vernon's Best Vibes
             </span>
          </div>
          <h1 className="text-6xl md:text-9xl font-script text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] logo-glow transform -rotate-2">
            {info.name}
          </h1>
          <p className="text-2xl md:text-4xl text-cream font-serif italic font-bold text-shadow-md">
            {info.tagline}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link to="/menu" className="w-full sm:w-auto px-10 py-5 bg-sauce-orange-500 text-white rounded-full font-black text-xl shadow-[0_0_20px_rgba(255,102,0,0.5)] hover:bg-sauce-orange-400 hover:scale-105 transition-all">
              See The Menu
            </Link>
            <Link to="/order" className="w-full sm:w-auto px-10 py-5 bg-white text-sauce-orange-600 rounded-full font-black text-xl shadow-xl hover:bg-gray-100 hover:scale-105 transition-all">
              Order Online
            </Link>
          </div>
        </div>
        
        {/* Wavy Bottom Separator */}
        <div className="absolute bottom-0 left-0 w-full leading-none">
          <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-sauce-orange-500"></path>
          </svg>
        </div>
      </section>

      {/* Quick Info Strip */}
      <section className="bg-sauce-orange-500 text-white py-8 relative shadow-xl z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-lg font-bold font-script">
            <span className="bg-white/20 p-2 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg></span>
            {info.address}
          </div>
          <div className="h-2 w-2 rounded-full bg-white/50 hidden md:block"></div>
          <div className="flex items-center gap-3 text-lg font-bold font-script">
             <span className="bg-white/20 p-2 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></span>
            {info.phone}
          </div>
        </div>
      </section>

      {/* Cuisine Highlights */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 text-charcoal font-serif">
            Flavor That Hits Different
          </h2>
          <div className="flex justify-center gap-2">
             <div className="h-3 w-12 bg-sauce-orange-500 rounded-full"></div>
             <div className="h-3 w-3 bg-island-teal-500 rounded-full"></div>
             <div className="h-3 w-3 bg-vegan-green-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cuisineHighlights.map((c) => (
            <div key={c.name} className={`relative overflow-hidden rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group border-4 ${c.border} bg-white`}>
              <div className="h-56 overflow-hidden">
                 <img src={c.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={c.name} />
              </div>
              <div className={`p-8 ${c.bg}`}>
                <h3 className={`text-3xl font-script font-bold mb-3 ${c.text}`}>{c.name}</h3>
                <p className="text-gray-600 mb-6 font-medium leading-relaxed">{c.desc}</p>
                <Link to="/menu" className={`inline-flex items-center ${c.btn} font-black hover:underline tracking-wide uppercase text-sm`}>
                  View Menu <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Space Connection */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto bg-charcoal rounded-[3rem] overflow-hidden flex flex-col lg:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
          
          {/* Decorative glowing orb */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-sauce-orange-500/20 rounded-full filter blur-[100px] pointer-events-none"></div>

          <div className="lg:w-1/2 relative min-h-[400px]">
            <img src="https://picsum.photos/seed/venue/800/600" className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Event Space" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal to-transparent lg:bg-gradient-to-t"></div>
          </div>
          
          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center text-cream relative z-10">
            <span className="text-sauce-orange-500 font-black uppercase tracking-[0.2em] mb-4 bg-white/10 w-fit px-4 py-1 rounded-full backdrop-blur-sm">VIP Experience</span>
            <h2 className="text-4xl md:text-5xl font-black font-serif mb-6 leading-tight">
              Party Upstairs,<br/><span className="text-sauce-orange-500 font-script">Feast Downstairs.</span>
            </h2>
            <p className="text-lg text-cream/80 mb-10 leading-relaxed">
              We are the exclusive in-house caterer for the premier Black-owned event space directly above us. Weddings, galas, or just a Tuesday vibe—we bring the flavor to the party.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catering" className="px-8 py-4 bg-gradient-to-r from-sauce-orange-500 to-sauce-orange-600 text-white rounded-full font-bold text-center hover:shadow-lg hover:shadow-orange-500/40 transition-all transform hover:-translate-y-1">
                Book Catering
              </Link>
              <Link to="/gallery" className="px-8 py-4 border-2 border-white/20 text-cream rounded-full font-bold text-center hover:bg-white/10 transition-colors">
                See The Vibes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
