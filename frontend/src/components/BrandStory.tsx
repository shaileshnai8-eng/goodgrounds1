import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import aboutCoffee from '@/assets/about-coffee.jpg';
const BrandStory = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const textLines = [{
    text: 'We believe coffee',
    highlight: 'coffee'
  }, {
    text: 'is more',
    highlight: 'more'
  }, {
    text: 'Than a drink it\'s a ritual. We',
    highlight: ''
  }, {
    text: 'source premium beans, roast',
    highlight: 'premium'
  }, {
    text: 'IN small batches, & deliver',
    highlight: 'small batches'
  }];
  return <section id="about" className="section-cream py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <motion.div initial={{
          opacity: 0,
          x: -100
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }} className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4]">
              <img src={aboutCoffee} alt="Barista crafting coffee" className="w-full h-full object-cover" />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/30 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.8
          }} animate={isInView ? {
            opacity: 1,
            scale: 1
          } : {}} transition={{
            delay: 0.5,
            duration: 0.6
          }} className="absolute -bottom-6 -right-6 bg-gold rounded-2xl p-6 shadow-xl">
              <span className="font-display text-3xl text-coffee-dark">Good Grounds Coffee</span>
            </motion.div>
          </motion.div>

          {/* Text Section */}
          <motion.div initial={{
          opacity: 0,
          x: 100
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.8,
          ease: 'easeOut',
          delay: 0.2
        }} className="space-y-4">
            {textLines.map((line, index) => <motion.p key={index} initial={{
            opacity: 0,
            y: 30
          }} animate={isInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            delay: 0.4 + index * 0.1,
            duration: 0.6
          }} className="font-display text-3xl md:text-4xl lg:text-5xl text-coffee-dark leading-tight">
                {line.text.split(line.highlight).map((part, i, arr) => <span key={i}>
                    {part}
                    {i < arr.length - 1 && line.highlight && <span className="text-gold">{line.highlight}</span>}
                  </span>)}
              </motion.p>)}
            
            {/* Decorative coffee bean icon */}
            <motion.div initial={{
            opacity: 0,
            rotate: -45
          }} animate={isInView ? {
            opacity: 1,
            rotate: 0
          } : {}} transition={{
            delay: 1,
            duration: 0.6
          }} className="pt-8">
              <svg width="120" height="40" viewBox="0 0 120 40" className="text-coffee-light">
                <ellipse cx="20" cy="20" rx="15" ry="18" fill="currentColor" />
                <path d="M20 2 Q20 20 20 38" stroke="hsl(var(--cream))" strokeWidth="2" fill="none" />
                <ellipse cx="60" cy="20" rx="15" ry="18" fill="currentColor" opacity="0.7" />
                <path d="M60 2 Q60 20 60 38" stroke="hsl(var(--cream))" strokeWidth="2" fill="none" />
                <ellipse cx="100" cy="20" rx="15" ry="18" fill="currentColor" opacity="0.4" />
                <path d="M100 2 Q100 20 100 38" stroke="hsl(var(--cream))" strokeWidth="2" fill="none" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default BrandStory;