import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import api from '@/api';

const PopularFlavors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [flavors, setFlavors] = useState<any[]>([]);

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const { data } = await api.get('/menu');
        // Only show first 3 for "Popular Flavors"
        setFlavors(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching flavors:', error);
      }
    };
    fetchFlavors();
  }, []);

  return (
    <section className="bg-coffee-dark py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 100 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-gold mb-8"
            />
            <h2 className="heading-section text-cream tracking-spaced">
              Popular Flavors
            </h2>
          </motion.div>

          <motion.a
            href="#products"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="btn-gold mt-8 md:mt-0 w-fit"
          >
            Order Now
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </div>

        {/* Flavors Grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {flavors.map((flavor, index) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="group relative bg-coffee-medium rounded-3xl overflow-hidden card-hover"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={flavor.image?.url || flavor.image}
                  alt={flavor.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-coffee-dark/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                {/* Price Tag */}
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="inline-block bg-gold text-coffee-dark px-4 py-1 rounded-full text-sm font-semibold mb-4"
                >
                  ${flavor.price}
                </motion.span>

                <h3 className="font-display text-xl md:text-2xl text-cream mb-2 tracking-wide">
                  {flavor.name}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  {flavor.description}
                </p>

                {/* Hover Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ scale: 1.05 }}
                  className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 btn-primary text-sm"
                >
                  Order Now
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularFlavors;
