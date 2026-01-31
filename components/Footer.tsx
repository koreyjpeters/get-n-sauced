
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RestaurantInfo } from '../types';
import { dataService } from '../services/dataService';
import { Icons } from '../constants';

const Footer: React.FC<{ info: RestaurantInfo }> = ({ info }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await dataService.subscribeEmail(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-charcoal text-cream pt-20 pb-10 border-t-8 border-sauce-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="block group">
              <span className="text-4xl font-script text-white logo-glow group-hover:text-sauce-orange-300 transition-colors">{info.name}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing the heat to Mount Vernon. Authentic Caribbean spices, comforting Soul Food, and strict Vegan options.
            </p>
            <div className="flex space-x-4">
              {info.socials.instagram && <a href={info.socials.instagram} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sauce-orange-500 transition-colors"><Icons.Instagram /></a>}
              {info.socials.tiktok && <a href={info.socials.tiktok} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sauce-orange-500 transition-colors"><Icons.TikTok /></a>}
              {info.socials.facebook && <a href={info.socials.facebook} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-sauce-orange-500 transition-colors"><Icons.Facebook /></a>}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sauce-orange-500 font-black mb-6 text-sm uppercase tracking-widest">Explore</h3>
            <ul className="space-y-4 text-sm font-medium text-gray-300">
              <li><Link to="/menu" className="hover:text-white transition-colors">Full Menu</Link></li>
              <li><Link to="/order" className="hover:text-white transition-colors">Order Online</Link></li>
              <li><Link to="/catering" className="hover:text-white transition-colors">Catering Services</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Photo Gallery</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sauce-orange-500 font-black mb-6 text-sm uppercase tracking-widest">Visit Us</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-sauce-orange-500">📍</span>
                <span>{info.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-sauce-orange-500">📞</span>
                <span>{info.phone}</span>
              </li>
              <li className="pt-2 text-xs opacity-75">
                <Link to="/contact" className="text-white underline decoration-sauce-orange-500">Check opening hours</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sauce-orange-500 font-black mb-6 text-sm uppercase tracking-widest">The Sauce List</h3>
            <p className="text-xs text-gray-500 mb-4">Join for secret menu drops and event invites.</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="email@address.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-sauce-orange-500 focus:bg-white/10 transition-colors"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-sauce-orange-600 text-white font-bold py-3 rounded-lg hover:bg-sauce-orange-500 transition-colors disabled:opacity-50"
              >
                {subscribed ? "You're In!" : submitting ? '…' : 'Sign Me Up'}
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} Get’n Sauced. Mount Vernon, NY.</p>
          <div className="flex gap-6">
            <Link to="/admin" className="hover:text-sauce-orange-500 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
