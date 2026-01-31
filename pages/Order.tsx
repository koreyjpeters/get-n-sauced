
import React from 'react';
import { dataService } from '../services/dataService';

const Order: React.FC = () => {
  const info = dataService.getRestaurantInfo();

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-burnt-orange-100">
        <div className="p-12 md:p-20 text-center">
          <div className="inline-block p-6 bg-burnt-orange-50 rounded-full mb-10">
            <svg className="w-16 h-16 text-burnt-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-playfair mb-8">Ready to Get Sauced?</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            All our online orders are securely processed through Square. Choose from pickup or delivery options for a fresh island feast at your doorstep.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-cream p-8 rounded-3xl border border-burnt-orange-50">
               <h3 className="text-lg font-black mb-2 uppercase tracking-widest text-burnt-orange-500">Pickup</h3>
               <p className="text-sm text-gray-500">Ready in 20-30 mins. Head to 29 Elm Ave, Mount Vernon.</p>
            </div>
            <div className="bg-cream p-8 rounded-3xl border border-burnt-orange-50">
               <h3 className="text-lg font-black mb-2 uppercase tracking-widest text-burnt-orange-500">Delivery</h3>
               <p className="text-sm text-gray-500">Available via DoorDash, UberEats, or our local driver partner.</p>
            </div>
          </div>

          <a 
            href={info.squareOrderUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto px-12 py-5 bg-burnt-orange-500 text-white font-black text-xl rounded-2xl shadow-xl hover:bg-burnt-orange-600 hover:-translate-y-1 transition-all active:scale-95"
          >
            Go to Square Store
          </a>
          
          <div className="mt-12 pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-center gap-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Secure Checkout
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              No Hidden Fees
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Verified Partner
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
