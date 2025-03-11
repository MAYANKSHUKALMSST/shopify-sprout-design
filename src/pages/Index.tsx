
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="antialiased">
      <Hero />
      <FeaturedProducts />
      <Footer />
    </main>
  );
};

export default Index;
