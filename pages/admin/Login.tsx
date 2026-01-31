import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth } from '../../services/firebase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      const message = err && typeof err === 'object' && 'code' in err
        ? (err as { code: string }).code === 'auth/invalid-credential' || (err as { code: string }).code === 'auth/wrong-password'
          ? 'Invalid email or password.'
          : (err as { message?: string }).message ?? 'Sign in failed.'
        : 'Sign in failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-burnt-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h1 className="text-3xl font-black font-playfair mb-2">Admin Access</h1>
          <p className="text-gray-500 text-sm">Sign in with your Firebase Auth account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email</label>
            <input
              type="email"
              required
              placeholder="admin@getnsauced.com"
              className="w-full bg-cream rounded-xl px-5 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-burnt-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-cream rounded-xl px-5 py-3 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-burnt-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-burnt-orange-500 text-white font-black py-4 rounded-xl shadow-lg hover:bg-burnt-orange-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Log In'}
          </button>
        </form>

        <p className="text-center mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest">
          Create an admin user in Firebase Console → Authentication → Users if needed.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
