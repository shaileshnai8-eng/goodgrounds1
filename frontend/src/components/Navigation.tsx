import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserAuth } from '@/context/UserAuthContext';
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useUserAuth();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'About Us',
    href: '#about'
  }, {
    name: 'Product',
    href: '#products'
  }, {
    name: 'Benefits',
    href: '#benefits'
  }, {
    name: 'Testimonial',
    href: '#testimonials'
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: 'easeOut'
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-coffee-dark/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Left Nav Links - Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => <motion.a key={link.name} href={link.href} initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.1 * index,
            duration: 0.5
          }} className="nav-link text-sm font-medium tracking-wide">
                {link.name}
              </motion.a>)}
          </div>

          {/* Logo - Center */}
          <motion.a href="#" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.3,
          duration: 0.5
        }} className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="font-display text-2xl md:text-3xl text-gold tracking-wider text-center">
          </h1>
          </motion.a>

          {/* CTA Button - Right Desktop */}
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.5,
          duration: 0.5
        }} className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm">
              {user ? (
                <>
                  <span className="text-cream/70">Hi, {user.name.split(' ')[0]}</span>
                  <button
                    type="button"
                    onClick={logout}
                    className="nav-link text-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link to="/login" className="nav-link text-sm">
                  Sign In
                </Link>
              )}
            </div>
            <a href="#products" className="group flex items-center">
              <span className="btn-primary">Order Now</span>
              <span className="btn-primary-icon ml-1 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden z-50 text-cream p-2">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.3
      }} className="lg:hidden bg-coffee-dark/98 backdrop-blur-md border-t border-border">
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link, index) => <motion.a key={link.name} href={link.href} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.1 * index
          }} onClick={() => setIsMobileMenuOpen(false)} className="text-cream text-lg font-medium hover:text-gold transition-colors">
                  {link.name}
                </motion.a>)}
              <div className="flex flex-col gap-3">
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn-outline w-fit"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-outline w-fit"
                  >
                    Sign In
                  </Link>
                )}
                <a
                  href="#products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-gold w-fit"
                >
                  Order Now
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
};
export default Navigation;
