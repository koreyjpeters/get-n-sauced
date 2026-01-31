
import React, { useState } from 'react';
import { dataService } from '../services/dataService';

const Catering: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventDateTime: '',
    guestCount: 50,
    venueType: 'Event Space Upstairs' as 'Event Space Upstairs' | 'Offsite',
    fulfillment: 'Pickup' as 'Pickup' | 'Delivery',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await dataService.submitCatering(formData);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert('Failed to submit request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand">
      <section className="relative h-[60vh] flex items-center justify-center">
        <img src="https://picsum.photos/seed/catering-party/1920/1080" className="absolute inset-0 w-full h-full object-cover" alt="Catering" />
        <div className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-7xl md:text-9xl font-script text-white mb-6 logo-glow">Let's Party</h1>
          <p className="text-2xl text-sauce-orange-100 font-serif italic">We bring the soul. You bring the guests.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left: Info */}
          <div className="bg-charcoal text-cream p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sauce-orange-500 rounded-full filter blur-[80px] opacity-20"></div>
            
            <span className="text-sauce-orange-400 font-black uppercase tracking-[0.2em] bg-white/10 px-4 py-1 rounded-full text-xs">Preferred Vendor</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-6 mb-8">Hosting Upstairs?</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-10 border-l-4 border-sauce-orange-500 pl-6">
              We are the <strong>exclusive in-house caterer</strong> for the Black-owned event space above. Our kitchen is literally seconds away, meaning your food is served hot, fresh, and exactly on time.
            </p>
            
            <div className="space-y-6">
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                 <div className="bg-island-teal-500 p-3 rounded-full text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"/></svg></div>
                 <span className="font-bold text-xl font-script">Full Buffet Setup</span>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                 <div className="bg-sauce-orange-500 p-3 rounded-full text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
                 <span className="font-bold text-xl font-script">Good Vibes Only</span>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                 <div className="bg-vegan-green-500 p-3 rounded-full text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg></div>
                 <span className="font-bold text-xl font-script">Vegan Options Galore</span>
               </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-sauce-orange-100">
            {submitted ? (
              <div className="text-center py-20 animate-fade-in flex flex-col items-center justify-center h-full">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                </div>
                <h2 className="text-4xl font-script text-charcoal mb-4">You're on the list!</h2>
                <p className="text-gray-500 mb-8 max-w-sm">We've got your details. Expect a call or email from our events team shortly to talk spice levels.</p>
                <button onClick={() => setSubmitted(false)} className="text-sauce-orange-600 font-bold hover:underline">Submit another request</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-serif font-black text-charcoal">Get a Quote</h3>
                  <div className="h-1 w-20 bg-sauce-orange-500 mx-auto rounded-full mt-2"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Name</label>
                    <input type="text" required className="w-full bg-sand rounded-xl px-5 py-3 border-none focus:ring-2 focus:ring-sauce-orange-400" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email</label>
                    <input type="email" required className="w-full bg-sand rounded-xl px-5 py-3 border-none focus:ring-2 focus:ring-sauce-orange-400" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Phone</label>
                    <input type="tel" className="w-full bg-sand rounded-xl px-5 py-3 border-none focus:ring-2 focus:ring-sauce-orange-400" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Guests</label>
                    <input type="number" required min="10" className="w-full bg-sand rounded-xl px-5 py-3 border-none focus:ring-2 focus:ring-sauce-orange-400" value={formData.guestCount} onChange={e => setFormData({...formData, guestCount: parseInt(e.target.value)})} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Date</label>
                  <input type="datetime-local" required className="w-full bg-sand rounded-xl px-5 py-3 border-none focus:ring-2 focus:ring-sauce-orange-400" value={formData.eventDateTime} onChange={e => setFormData({...formData, eventDateTime: e.target.value})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Venue</label>
                    <select className="w-full bg-sand rounded-xl px-5 py-3 border-none focus:ring-2 focus:ring-sauce-orange-400" value={formData.venueType} onChange={e => setFormData({...formData, venueType: e.target.value as any})}>
                      <option value="Event Space Upstairs">Event Space Upstairs</option>
                      <option value="Offsite">Offsite Location</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Type</label>
                    <select className="w-full bg-sand rounded-xl px-5 py-3 border-none focus:ring-2 focus:ring-sauce-orange-400" value={formData.fulfillment} onChange={e => setFormData({...formData, fulfillment: e.target.value as any})}>
                      <option value="Pickup">Pickup</option>
                      <option value="Delivery">Delivery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Vision & Details</label>
                  <textarea rows={4} className="w-full bg-sand rounded-xl px-5 py-3 border-none focus:ring-2 focus:ring-sauce-orange-400" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} placeholder="Tell us about the vibe..."></textarea>
                </div>

                <button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-sauce-orange-500 to-red-500 text-white font-black py-5 rounded-2xl text-xl shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1 transition-all disabled:opacity-50">
                  Send Inquiry
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Catering;
