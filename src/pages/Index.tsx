import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import BrandStory from '@/components/BrandStory';
import PopularFlavors from '@/components/PopularFlavors';
import QualityFeatures from '@/components/QualityFeatures';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Products />
      <BrandStory />
      <PopularFlavors />
      <QualityFeatures />
      <Testimonials />
      <Gallery />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
