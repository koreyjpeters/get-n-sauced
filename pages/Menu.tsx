
import React, { useState, useMemo } from 'react';
import { dataService } from '../services/dataService';
import { CategoryType } from '../types';

const Menu: React.FC = () => {
  const categories = dataService.getMenuCategories();
  const menuItems = dataService.getMenuItems();
  const info = dataService.getRestaurantInfo();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.categoryId === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-charcoal relative overflow-hidden py-28 text-center">
        <div className="absolute inset-0 bg-sauce-orange-600/10 pattern-dots"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-island-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-sauce-orange-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-script text-white mb-6 logo-glow transform -rotate-2">Our Menu</h1>
          <p className="text-2xl text-sauce-orange-100 font-serif italic max-w-2xl mx-auto">
            Caribbean Spice. Soul Food Comfort. Vegan Freshness.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-10 relative z-20">
        
        {/* Search & Filter Container */}
        <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-sauce-orange-100 flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === 'All' ? 'bg-charcoal text-white shadow-lg scale-105' : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
            >
              All Hits
            </button>
            {categories.map(cat => {
               // Dynamic styling based on category name roughly
               let activeClass = 'bg-sauce-orange-500 text-white shadow-lg scale-105';
               if (cat.name.includes('Caribbean')) activeClass = 'bg-island-teal-500 text-white shadow-lg scale-105';
               if (cat.name.includes('Vegan')) activeClass = 'bg-vegan-green-500 text-white shadow-lg scale-105';

               return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === cat.id ? activeClass : 'bg-gray-100 text-charcoal hover:bg-gray-200'}`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Find your flavor..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-cream border-2 border-transparent focus:border-sauce-orange-300 focus:outline-none focus:ring-0 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group border-2 border-transparent hover:border-sauce-orange-200">
              <div className="relative h-64 overflow-hidden">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                {!item.available && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-6 py-2 rounded-full text-lg font-black uppercase tracking-widest transform -rotate-12 border-4 border-white">Sold Out</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {item.tags.map(tag => (
                    <span key={tag} className="bg-white/90 backdrop-blur-sm text-charcoal text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-charcoal font-serif leading-tight">{item.name}</h3>
                  <span className="text-2xl font-script text-sauce-orange-600 font-bold ml-2">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {item.description}
                </p>
                <a 
                  href={info.squareOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-full py-4 rounded-2xl font-bold transition-all transform active:scale-95 ${item.available ? 'bg-charcoal text-white hover:bg-sauce-orange-500 hover:shadow-lg' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  {item.available ? (
                    <>
                      Add to Order 
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </>
                  ) : 'Out of Stock'}
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[2rem] border-4 border-dashed border-sauce-orange-200">
            <h3 className="text-2xl font-bold text-gray-400 font-serif">Kitchen's quiet on that one...</h3>
            <button onClick={() => {setActiveCategory('All'); setSearchQuery('');}} className="mt-4 text-sauce-orange-500 font-bold underline">Show everything else</button>
          </div>
        )}

        {/* QR Section */}
        <div className="mt-32 relative bg-gradient-to-r from-sauce-orange-500 to-red-500 rounded-[3rem] p-12 text-center text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-script mb-8 logo-glow">Skip the Line</h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-12">
              <div className="bg-white p-6 rounded-3xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-40 h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://getnsauced.com/#/menu" alt="Menu QR" className="w-full h-full" />
                </div>
                <p className="text-charcoal font-black tracking-widest text-sm">SCAN MENU</p>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-40 h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                   <img src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${info.squareOrderUrl}`} alt="Order QR" className="w-full h-full" />
                </div>
                <p className="text-charcoal font-black tracking-widest text-sm">SCAN ORDER</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
