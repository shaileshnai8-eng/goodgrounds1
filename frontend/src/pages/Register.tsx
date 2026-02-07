import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import api from '@/api';
import { useUserAuth } from '@/context/UserAuthContext';

const Register = () => {
  const { login } = useUserAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/users/register', { name, email, password });
      login(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-coffee-dark text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--gold)/0.2),_transparent_50%)]" />
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_bottom_left,_hsl(var(--coffee-light)/0.4),_transparent_55%)]" />
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-16 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 w-full items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-cream text-coffee-dark rounded-[2rem] p-8 md:p-10 shadow-2xl border border-cream/40"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-coffee-dark/60 text-sm uppercase tracking-[0.3em]">Join</p>
                <h2 className="font-display text-3xl mt-2">Create Account</h2>
              </div>
              <div className="bg-gold/20 text-gold p-3 rounded-2xl">
                <Sparkles className="w-6 h-6" />
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-coffee-dark/70">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-coffee-light/30 bg-cream-dark/60 px-4 py-3 text-coffee-dark focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Alex Brewster"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-dark/70">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-coffee-light/30 bg-cream-dark/60 px-4 py-3 text-coffee-dark focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-coffee-dark/70">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full rounded-xl border border-coffee-light/30 bg-cream-dark/60 px-4 py-3 text-coffee-dark focus:outline-none focus:ring-2 focus:ring-gold"
                  placeholder="Create a strong password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-gold justify-center disabled:opacity-60"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </form>

            <p className="mt-6 text-sm text-coffee-dark/70">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-coffee-dark hover:text-gold">
                Sign in
              </Link>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-gold uppercase tracking-[0.4em] text-xs mb-4">Goodgrounds</p>
            <h1 className="heading-section text-cream mb-6">Make every cup personal.</h1>
            <p className="text-cream/70 text-lg max-w-xl">
              Join the tasting room. Save favorites, get early access to seasonal
              releases, and receive curated pairing notes from our baristas.
            </p>
            <div className="mt-10">
              <Link to="/" className="btn-outline">
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
