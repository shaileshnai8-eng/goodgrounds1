import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import heroCoffee from '@/assets/hero-coffee.jpg';
import api from '@/api';
const Hero = () => {
  const defaultContent = {
    tagline: 'Cleveland-based Coffee shop',
    titlePart1: 'GOOD',
    titlePart2: 'Grounds|Coffee & Bistro',
    description:
      'Did you know that your next favorite coffee may be hiding in plain sight?\\nTake our quiz to get matched with the perfect beans for you.',
    button1Text: 'Out Products',
    button1Link: '#products',
    button2Text: 'Watch Video',
    button2Link: '',
    videoUrl: '',
    heroBgType: 'image',
    heroBgUrl: '',
  };

  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const { data } = await api.get('/homepage');
        setContent({ ...defaultContent, ...data });
      } catch (error) {
        console.error('Error fetching homepage content:', error);
      }
    };
    fetchHomepage();
  }, []);

  const [titleLine1, titleLine2] = (content.titlePart2 || '')
    .split('|')
    .map((part: string) => part.trim());

  const heroBackgroundUrl = content.heroBgUrl || heroCoffee;

  const [descriptionLine1, descriptionLine2] = (content.description || '')
    .split('\\n')
    .map((part: string) => part.trim());

  const handleSecondaryAction = () => {
    const link = (content.button2Link || content.videoUrl || '').trim();
    if (!link) return;
    if (link.startsWith('#') || link.startsWith('/')) {
      window.location.href = link;
      return;
    }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return <section className="relative min-h-screen flex items-center overflow-hidden bg-coffee-dark">
      {/* Background Image with Parallax Effect */}
      <motion.div initial={{
      scale: 1.1
    }} animate={{
      scale: 1
    }} transition={{
      duration: 1.5,
      ease: 'easeOut'
    }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroBackgroundUrl})`
      }} />
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-dark/90 via-coffee-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark via-transparent to-coffee-dark/30" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-24">
        <div className="max-w-3xl">
          {/* Tagline */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.6
        }} className="text-cream/80 text-sm md:text-base tracking-widest mb-4 flex items-center gap-4">
            {content.tagline}
            <span className="w-16 h-0.5 bg-cream/40" />
          </motion.p>

          {/* Main Heading */}
          <div className="overflow-hidden mb-8">
            <motion.h1 initial={{
            y: 100,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.5,
            duration: 0.8,
            ease: 'easeOut'
          }} className="heading-hero">
              <span className="text-gold">{content.titlePart1}</span>{' '}
              <span className="text-cream">{titleLine1 || 'Grounds'}</span>
              <br />
              <span className="text-cream">{titleLine2 || ''}</span>
            </motion.h1>
          </div>

          {/* Floating Coffee Beans */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.8,
          duration: 0.6
        }} className="absolute top-1/3 left-0 hidden lg:block">
            <motion.div animate={{
            y: [0, -15, 0]
          }} transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }} className="w-16 h-16 text-gold opacity-30">
              ☕
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.9,
          duration: 0.6
        }} className="text-cream/70 text-base md:text-lg max-w-md mb-10 leading-relaxed">
            {descriptionLine1}
            <br />
            {descriptionLine2}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 1.1,
          duration: 0.6
        }} className="flex flex-wrap items-center gap-6">
            <a href={content.button1Link || '#products'} className="group flex items-center">
              <span className="btn-primary">{content.button1Text}</span>
              <span className="btn-primary-icon ml-1 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </a>

            <button className="btn-outline group" onClick={handleSecondaryAction} type="button">
              <span className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                <Play className="w-4 h-4 fill-current" />
              </span>
              <span>{content.button2Text}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 md:h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-cream" />
        </svg>
      </div>
    </section>;
};
export default Hero;
