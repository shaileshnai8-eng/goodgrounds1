import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Instagram, X } from 'lucide-react';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';

const galleryImages = [
  { src: gallery1, alt: 'Coffee shop interior' },
  { src: gallery2, alt: 'Latte art' },
  { src: gallery3, alt: 'Coffee roasting' },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="section-cream py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: 100 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-0.5 bg-coffee-dark/20 mx-auto mb-8"
            />
            <h2 className="heading-section text-coffee-dark tracking-spaced">
              Our Gallery
            </h2>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden card-hover">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-coffee-dark/0 group-hover:bg-coffee-dark/50 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center">
                      <Instagram className="w-7 h-7 text-coffee-dark" />
                    </div>
                  </motion.div>
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
          className="flex justify-center mt-16 gap-4"
        >
          <div className="w-3 h-3 rounded-full bg-coffee-dark" />
          <div className="w-3 h-3 rounded-full bg-coffee-light" />
          <div className="w-3 h-3 rounded-full bg-gold" />
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6 text-cream" />
          </button>
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
