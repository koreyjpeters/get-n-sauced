
import React, { useState } from 'react';
import { dataService } from '../services/dataService';
import { Icons } from '../constants';

const Contact: React.FC = () => {
  const info = dataService.getRestaurantInfo();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await dataService.submitMessage(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-20">
          <span className="text-burnt-orange-500 font-black uppercase tracking-[0.2em] mb-4 inline-block">Find Us</span>
          <h1 className="text-5xl md:text-7xl font-black font-playfair mb-8">Get In Touch</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-burnt-orange-50">
              <h3 className="text-2xl font-black mb-8">Restaurant Info</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-burnt-orange-100 rounded-xl flex items-center justify-center text-burnt-orange-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase mb-1">Address</p>
                    <p className="font-bold text-charcoal">{info.address}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-burnt-orange-100 rounded-xl flex items-center justify-center text-burnt-orange-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase mb-1">Phone</p>
                    <p className="font-bold text-charcoal">{info.phone}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-burnt-orange-100 rounded-xl flex items-center justify-center text-burnt-orange-500 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase mb-1">Email</p>
                    <p className="font-bold text-charcoal">{info.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-charcoal p-10 rounded-[2.5rem] shadow-xl text-white">
              <h3 className="text-2xl font-black mb-8">Hours</h3>
              <div className="space-y-3 text-sm">
                {Object.entries(info.hours).map(([day, time]) => (
                  <div key={day} className="flex justify-between border-b border-white/10 pb-2">
                    <span className="capitalize text-gray-400 font-bold">{day}</span>
                    <span className="font-bold">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden">
               {submitted && (
                <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex items-center justify-center text-center p-8 animate-fade-in">
                  <div>
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h2 className="text-3xl font-black mb-4">Message Sent!</h2>
                    <p className="text-gray-600">We appreciate your feedback. Our team will get back to you shortly.</p>
                  </div>
                </div>
               )}
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Your Name</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full bg-cream rounded-2xl px-6 py-4 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-burnt-orange-500 transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-cream rounded-2xl px-6 py-4 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-burnt-orange-500 transition-all"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Subject</label>
                    <input 
                      type="text" 
                      className="w-full bg-cream rounded-2xl px-6 py-4 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-burnt-orange-500 transition-all"
                      value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Your Message</label>
                    <textarea 
                      rows={6} 
                      required 
                      className="w-full bg-cream rounded-2xl px-6 py-4 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-burnt-orange-500 transition-all"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" disabled={submitting} className="w-full bg-burnt-orange-500 text-white font-black py-5 rounded-2xl text-lg hover:bg-burnt-orange-600 shadow-xl transition-all active:scale-95 disabled:opacity-50">
                    Send Message
                  </button>
               </form>
            </div>

            {/* Google Map Mockup */}
            <div className="mt-12 rounded-[3rem] overflow-hidden shadow-xl h-96 bg-gray-200 relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                 <p className="text-gray-400 font-bold">Google Maps Embed Placeholder</p>
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3013.633457199042!2d-73.8373322!3d40.9126383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c293309a96e95b%3A0xc0f17cc3936696b9!2s29%20Elm%20Ave%2C%20Mount%20Vernon%2C%20NY%2010550!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus" 
                className="w-full h-full grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
