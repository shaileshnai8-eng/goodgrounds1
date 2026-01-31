import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const CallToAction = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-coffee-dark py-24 md:py-32 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--gold)) 1px, transparent 1px), 
                           radial-gradient(circle at 80% 50%, hsl(var(--gold)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-8 h-8 rounded-full bg-gold/20 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 right-20 w-12 h-12 rounded-full bg-gold/10 hidden lg:block"
      />
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 right-1/4 w-6 h-6 rounded-full bg-coffee-light/30 hidden lg:block"
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={ref} className="max-w-4xl mx-auto text-center">
          {/* Decorative Coffee Beans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 flex items-center justify-center"
            >
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <ellipse cx="12" cy="20" rx="8" ry="12" fill="hsl(var(--coffee-light))" />
                <path d="M12 8 Q12 20 12 32" stroke="hsl(var(--cream) / 0.5)" strokeWidth="1.5" fill="none" />
                <ellipse cx="28" cy="20" rx="8" ry="12" fill="hsl(var(--gold))" opacity="0.8" />
                <path d="M28 8 Q28 20 28 32" stroke="hsl(var(--coffee-dark) / 0.5)" strokeWidth="1.5" fill="none" />
              </svg>
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading-section text-cream tracking-spaced mb-6"
          >
            Join our community of coffee lovers
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-cream/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Our subscription service will keep you up-to-date on new roasts,
            special offers, and brewing tips that we have to offer
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <a href="#footer" className="group flex items-center">
              <span className="btn-gold">Join Now</span>
              <span className="w-12 h-12 bg-gold-light rounded-full flex items-center justify-center ml-1 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5 text-coffee-dark" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-12 md:h-16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,googl906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-espresso"
          />
        </svg>
      </div>
    </section>
  );
};

export default CallToAction;
