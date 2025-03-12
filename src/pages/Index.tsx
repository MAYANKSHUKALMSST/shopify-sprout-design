
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import SaleBanner from '@/components/SaleBanner';
import CategorySection from '@/components/CategorySection';
import SaleCarousel from '@/components/SaleCarousel';

const Index = () => {
  return (
    <main className="antialiased">
      <SaleBanner />
      <Hero />
      <SaleCarousel />
      <FeaturedProducts />
      
      <CategorySection
        title="Men's Collection"
        description="Discover our curated selection of men's clothing, featuring timeless pieces and contemporary designs crafted with premium materials."
        image="https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80"
      />
      
      <CategorySection
        title="Women's Collection"
        description="Explore our women's collection, where elegant design meets comfort. Find pieces that reflect your unique style."
        image="https://images.unsplash.com/photo-1538329972958-465d6d2144ed?auto=format&fit=crop&q=80"
        direction="right"
      />
      
      <CategorySection
        title="Kids' Collection"
        description="Playful, comfortable, and durable clothing for the little ones. Made with love and care for active kids."
        image="https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80"
      />
      
      <Footer />
    </main>
  );
};

export default Index;
