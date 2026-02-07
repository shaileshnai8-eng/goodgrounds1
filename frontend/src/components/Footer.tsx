import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '@/api';

const Footer = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const socialLinks = [
    { icon: Instagram, href: settings?.socialMedia?.instagram || '#', label: 'Instagram' },
    { icon: Twitter, href: settings?.socialMedia?.twitter || '#', label: 'Twitter' },
    { icon: Facebook, href: settings?.socialMedia?.facebook || '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];
  const footerLinks = [{
    name: 'Styleguide',
    href: '#'
  }, {
    name: 'License',
    href: '#'
  }, {
    name: 'Changelog',
    href: '#'
  }, {
    name: 'Privacy',
    href: '#'
  }];
  return <footer id="footer" className="bg-espresso py-16 md:py-20">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} viewport={{
          once: true
        }}>
            <h2 className="font-display text-3xl md:text-4xl text-gold tracking-wider">{settings?.name || 'Good Grounds Coffee'}</h2>
          </motion.div>

          {/* Social Icons */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} viewport={{
          once: true
        }} className="flex gap-4">
            {socialLinks.map((social, index) => <motion.a key={social.label} href={social.href} whileHover={{
            scale: 1.2,
            y: -5
          }} whileTap={{
            scale: 0.9
          }} className="w-12 h-12 rounded-full bg-coffee-medium flex items-center justify-center text-cream hover:bg-gold hover:text-coffee-dark transition-colors duration-300" aria-label={social.label}>
                <social.icon className="w-5 h-5" />
              </motion.a>)}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div initial={{
        width: 0
      }} whileInView={{
        width: '100%'
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="h-px bg-gradient-to-r from-transparent via-coffee-light/30 to-transparent mb-12" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Footer Links */}
          <motion.div initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} viewport={{
          once: true
        }} className="flex flex-wrap justify-center gap-6 md:gap-8">
            {footerLinks.map(link => <a key={link.name} href={link.href} className="text-cream/60 hover:text-gold text-sm transition-colors duration-300">
                {link.name}
              </a>)}
          </motion.div>

          {/* Copyright */}
          <motion.p initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} viewport={{
          once: true
        }} className="text-cream/40 text-sm text-center">
            © {new Date().getFullYear()} BrewLab. All rights reserved.
          </motion.p>
        </div>

        {/* Decorative Coffee Bean at Bottom */}
        <motion.div initial={{
        opacity: 0,
        scale: 0
      }} whileInView={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 0.6,
        delay: 0.5
      }} viewport={{
        once: true
      }} className="flex justify-center mt-12">
          <svg width="60" height="30" viewBox="0 0 60 30" className="opacity-30">
            <ellipse cx="15" cy="15" rx="10" ry="13" fill="hsl(var(--coffee-light))" />
            <path d="M15 2 Q15 15 15 28" stroke="hsl(var(--cream) / 0.3)" strokeWidth="1.5" fill="none" />
            <ellipse cx="45" cy="15" rx="10" ry="13" fill="hsl(var(--gold))" opacity="0.5" />
            <path d="M45 2 Q45 15 45 28" stroke="hsl(var(--coffee-dark) / 0.3)" strokeWidth="1.5" fill="none" />
          </svg>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;