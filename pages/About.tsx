
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="pt-32 pb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sauce-orange-200 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-island-teal-200 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <span className="text-sauce-orange-600 font-black uppercase tracking-[0.3em] mb-4 inline-block text-sm bg-sauce-orange-100 px-3 py-1 rounded-full">Our DNA</span>
              <h1 className="text-6xl md:text-8xl font-script text-charcoal mb-8 leading-tight logo-glow">Flavor that speaks to the Soul.</h1>
              <p className="text-xl text-charcoal/70 leading-relaxed mb-8 font-medium">
                Get’n Sauced isn't just a name—it's a philosophy. It's about that perfectly glazed jerk chicken, that rich, slow-cooked oxtail gravy, and the vibrant spices that define Caribbean and Soul Food culture.
              </p>
              <div className="flex gap-4">
                 <div className="bg-white p-8 rounded-3xl shadow-lg flex-1 border border-sauce-orange-100 transform rotate-1">
                    <p className="text-4xl font-script text-sauce-orange-500 mb-1">Authentic</p>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Recipes</p>
                 </div>
                 <div className="bg-white p-8 rounded-3xl shadow-lg flex-1 border border-sauce-orange-100 transform -rotate-1">
                    <p className="text-4xl font-script text-island-teal-500 mb-1">Fresh</p>
                    <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Ingredients</p>
                 </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-charcoal rounded-[3rem] transform translate-x-4 translate-y-4"></div>
              <img src="https://picsum.photos/seed/chef/800/1000" className="relative rounded-[3rem] shadow-2xl w-full border-4 border-white" alt="The Chef" />
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-charcoal text-cream overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-serif font-bold mb-6">More Than a Restaurant</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-sauce-orange-500 to-island-teal-500 mx-auto rounded-full"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10 hover:border-sauce-orange-500 transition-colors group">
                 <h3 className="text-3xl font-script mb-6 flex items-center gap-4 text-sauce-orange-400">
                    <span className="w-12 h-12 bg-sauce-orange-500 text-charcoal rounded-full flex items-center justify-center text-xl font-bold font-sans">1</span>
                    Black-Owned Pride
                 </h3>
                 <p className="text-gray-300 leading-relaxed text-lg">
                    We are proud to be part of Mount Vernon's vibrant Black-owned business community. Located beneath a historic Black-owned event space, we serve as a hub for culture, celebration, and culinary excellence.
                 </p>
              </div>
              <div className="bg-white/5 p-12 rounded-[2.5rem] border border-white/10 hover:border-island-teal-500 transition-colors">
                 <h3 className="text-3xl font-script mb-6 flex items-center gap-4 text-island-teal-400">
                    <span className="w-12 h-12 bg-island-teal-500 text-charcoal rounded-full flex items-center justify-center text-xl font-bold font-sans">2</span>
                    The Gathering Place
                 </h3>
                 <p className="text-gray-300 leading-relaxed text-lg">
                    Whether you're stopping by for a quick lunch, picking up dinner for the family, or celebrating upstairs, we provide the flavor that brings people together. Near the local bars and transit, we are the pulse of Elm Ave.
                 </p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;
