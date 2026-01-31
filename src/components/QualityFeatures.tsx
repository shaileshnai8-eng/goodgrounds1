import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import qualityCoffee from '@/assets/quality-coffee.jpg';

const features = [
  {
    title: 'Premium Quality',
    description: 'Beans that have been hand-picked from the finest coffee regions around the world have been used to make this coffee',
    align: 'left',
  },
  {
    title: 'Sustainable',
    description: 'From farms that are committed to caring for the environment, our products are ethically sourced',
    align: 'right',
  },
  {
    title: 'Expert Roasting',
    description: 'The best way to make sure that every cup of coffee has the perfect flavor is to roast it in small batches',
    align: 'left',
  },
  {
    title: 'Fresh Always',
    description: 'Our products are roasted to order, and they are delivered within days of the roasting process',
    align: 'right',
  },
];

const QualityFeatures = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="benefits" className="bg-espresso py-24 md:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src={qualityCoffee}
          alt="Coffee beans"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso via-transparent to-espresso" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Features */}
          <div className="space-y-12">
            {features.slice(0, 2).map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                className={`${feature.align === 'right' ? 'lg:text-right' : ''}`}
              >
                <div className="flex items-center gap-4 mb-3">
                  {feature.align === 'left' && (
                    <span className="text-gold text-2xl">-</span>
                  )}
                  <h3 className="font-display text-2xl md:text-3xl text-cream tracking-spaced">
                    {feature.title}
                  </h3>
                  {feature.align === 'right' && (
                    <span className="text-gold text-2xl">-</span>
                  )}
                </div>
                <p className="text-cream/60 leading-relaxed max-w-md">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Coffee Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            {/* Floating coffee beans */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 bg-coffee-medium rounded-full absolute -top-10 -left-10 opacity-60"
            />
            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="w-16 h-16 bg-coffee-light rounded-full absolute -bottom-5 -right-5 opacity-40"
            />
            
            {/* Main decorative element */}
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gold/20 to-transparent flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gold/30 to-transparent flex items-center justify-center">
                <span className="font-display text-4xl text-gold">☕</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid lg:grid-cols-2 gap-16 mt-16 lg:mt-24">
          {features.slice(2).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: feature.align === 'left' ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.15, duration: 0.6 }}
              className={`${feature.align === 'right' ? 'lg:text-right lg:col-start-2' : ''}`}
            >
              <div className={`flex items-center gap-4 mb-3 ${feature.align === 'right' ? 'lg:justify-end' : ''}`}>
                {feature.align === 'left' && (
                  <span className="text-gold text-2xl">-</span>
                )}
                <h3 className="font-display text-2xl md:text-3xl text-cream tracking-spaced">
                  {feature.title}
                </h3>
                {feature.align === 'right' && (
                  <span className="text-gold text-2xl">-</span>
                )}
              </div>
              <p className={`text-cream/60 leading-relaxed max-w-md ${feature.align === 'right' ? 'lg:ml-auto' : ''}`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-24"
        />
      </div>
    </section>
  );
};

export default QualityFeatures;
