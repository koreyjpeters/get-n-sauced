
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RestaurantInfo } from '../types';

const Navbar: React.FC<{ info: RestaurantInfo }> = ({ info }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) return null;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Catering', path: '/catering' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const activeClass = "text-sauce-orange-600 font-bold bg-sauce-orange-50 rounded-full px-4 py-1";
  const inactiveClass = "text-charcoal hover:text-sauce-orange-500 font-medium px-4 py-1 transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b-4 border-sauce-orange-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
             {/* Logo image removed */}
             <span className="text-3xl font-script text-charcoal logo-glow transform -rotate-2 group-hover:rotate-0 transition-transform block">
               {info.name}
             </span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={location.pathname === link.path ? activeClass : inactiveClass}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/order" 
              className="ml-4 bg-gradient-to-r from-sauce-orange-500 to-sauce-orange-600 text-white px-6 py-3 rounded-full font-black text-sm shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5 transition-all transform"
            >
              ORDER NOW
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-sauce-orange-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-cream border-b-4 border-sauce-orange-400 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-lg font-bold ${location.pathname === link.path ? 'bg-sauce-orange-100 text-sauce-orange-700' : 'text-charcoal hover:bg-sauce-orange-50'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/order"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-4 rounded-xl text-lg font-black bg-sauce-orange-500 text-white mt-4 shadow-md"
            >
              ORDER ONLINE
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
