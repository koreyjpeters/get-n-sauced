
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { RestaurantInfo } from './types';
import { dataService, defaultRestaurantInfo } from './services/dataService';
import { Icons } from './constants';

// Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Catering from './pages/Catering';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [info, setInfo] = useState<RestaurantInfo>(defaultRestaurantInfo);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    dataService.init().then(() => {
      setInfo(dataService.getRestaurantInfo());
      setReady(true);
    }).catch((err) => {
      console.error('Firebase init failed:', err);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setInfo(dataService.getRestaurantInfo());
    }, 5000);
    return () => clearInterval(interval);
  }, [ready]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar info={info} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer info={info} />
      </div>
    </Router>
  );
};

export default App;
