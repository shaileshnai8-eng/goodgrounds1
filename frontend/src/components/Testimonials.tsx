import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "I've tried coffee from all over the city, and this place is hands down my favorite. The espresso is rich and smooth.",
    name: 'Sarah Thompson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  },
  {
    quote: "I've tried many coffee brands, but BrewLab is the only one I keep coming back to. Worth every penny!",
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    quote: "BrewLab's attention to quality is unmatched. Every bag is consistently excellent and the freshness is remarkable.",
    name: 'Emma Davis',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="bg-coffee-dark py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative Element */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-gold/20 to-transparent flex items-center justify-center"
              >
                <span className="text-4xl">☕</span>
              </motion.div>
            </div>
            
            <h2 className="heading-section text-cream tracking-spaced">
              It's our customers who love us
            </h2>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="bg-coffee-medium rounded-3xl p-8 h-full card-hover relative overflow-hidden">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 + i * 0.05, duration: 0.3 }}
                    >
                      <Star className="w-5 h-5 fill-gold text-gold" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-cream/80 text-lg leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-gold/30"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center"
                    >
                      <span className="text-xs">✓</span>
                    </motion.div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cream">{testimonial.name}</h4>
                    <p className="text-cream/50 text-sm">Verified Customer</p>
                  </div>
                </div>

                {/* Decorative quote mark */}
                <div className="absolute top-4 right-6 text-gold/10 text-8xl font-serif">
                  "
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center mt-16"
        >
          <svg width="120" height="40" viewBox="0 0 120 40" className="text-coffee-light">
            <ellipse cx="20" cy="20" rx="15" ry="18" fill="currentColor" />
            <ellipse cx="60" cy="20" rx="15" ry="18" fill="currentColor" opacity="0.6" />
            <ellipse cx="100" cy="20" rx="15" ry="18" fill="currentColor" opacity="0.3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
