
import React, { useState } from 'react';
import { dataService } from '../services/dataService';

const Gallery: React.FC = () => {
  const images = dataService.getGalleryImages();
  const [filter, setFilter] = useState<'All' | 'Food' | 'Venue' | 'Catering-Events'>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = images.filter(img => filter === 'All' || img.category === filter);

  return (
    <div className="min-h-screen pb-24 bg-cream">
      <header className="bg-charcoal text-white pt-32 pb-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal to-gray-900"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-script font-black mb-6 logo-glow">Visual Feast</h1>
          <p className="text-xl text-gray-400 font-serif italic">A glimpse into our kitchen, our space, and our community.</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['All', 'Food', 'Venue', 'Catering-Events'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-8 py-3 rounded-full font-bold shadow-lg transition-all border-2 ${filter === cat ? 'bg-sauce-orange-500 text-white border-sauce-orange-500 scale-105' : 'bg-white text-charcoal border-white hover:border-sauce-orange-200'}`}
            >
              {cat.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id} 
              className="relative overflow-hidden rounded-3xl group cursor-pointer break-inside-avoid shadow-xl border-4 border-white hover:border-sauce-orange-400 transition-colors duration-300"
              onClick={() => setSelectedImage(img.imageUrl)}
            >
              <img 
                src={img.imageUrl} 
                alt={img.alt} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="text-white font-black uppercase tracking-widest text-xs bg-sauce-orange-500 px-3 py-1 rounded-full mb-2 inline-block shadow-md">
                    {img.category}
                  </span>
                  <p className="text-white text-2xl font-script font-bold drop-shadow-md">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-8 right-8 text-white hover:text-sauce-orange-500 transition-colors">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <img src={selectedImage} className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border-4 border-charcoal" alt="Enlarged" />
        </div>
      )}
    </div>
  );
};

export default Gallery;
