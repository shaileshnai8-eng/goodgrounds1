import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import productBundles from '@/assets/product-bundles.jpg';
import productCapsules from '@/assets/product-capsules.jpg';
import productDarkRoast from '@/assets/product-dark-roast.jpg';
import productMediumRoast from '@/assets/product-medium-roast.jpg';
import productOrganic from '@/assets/product-organic.jpg';
import api from '@/api';

const fallbackProducts = [
  { name: 'Shop Bundles', image: productBundles },
  { name: 'Shop Capsules', image: productCapsules },
  { name: 'Dark Roast', image: productDarkRoast },
  { name: 'Medium Roast', image: productMediumRoast },
  { name: 'Shop Organic', image: productOrganic },
];

const Products = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [products, setProducts] = useState<any[]>(fallbackProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products?active=true');
        const sorted = [...data].sort((a: any, b: any) => {
          const aOrder = a.sortOrder ?? 0;
          const bOrder = b.sortOrder ?? 0;
          return aOrder - bOrder;
        });
        setProducts(sorted.length ? sorted : fallbackProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section id="products" className="section-cream py-24 md:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Decorative Elements */}
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 120 } : {}}
            transition={{ duration: 0.8 }}
            className="h-0.5 bg-coffee-dark/20"
          />
        </div>

        {/* Products Grid */}
        <div 
          ref={ref}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                ease: 'easeOut'
              }}
              className="group cursor-pointer"
            >
              <div className="relative bg-cream-dark rounded-3xl p-6 card-hover overflow-hidden">
                {/* Product Image */}
                <div className="aspect-square relative mb-4 overflow-hidden rounded-2xl">
                  <img
                    src={product.imageUrl || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Product Name */}
                <h3 className="font-display text-lg md:text-xl text-coffee-dark text-center tracking-wide">
                  {product.price !== undefined && product.price !== null
                    ? `${product.name} · $${product.price}`
                    : product.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
