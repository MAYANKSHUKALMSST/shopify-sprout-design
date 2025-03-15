
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';
import SaleBanner from '@/components/SaleBanner';
import CategorySection from '@/components/CategorySection';
import SaleCarousel from '@/components/SaleCarousel';
import { Link } from 'react-router-dom';

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
        image="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80"
      />
      
      <CategorySection
        title="Women's Collection"
        description="Explore our women's collection, where elegant design meets comfort. Find pieces that reflect your unique style."
        image="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80"
        direction="right"
      />
      
      <CategorySection
        title="Kids' Collection"
        description="Playful, comfortable, and durable clothing for the little ones. Made with love and care for active kids."
        image="https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&q=80"
      />
      
      <div className="mt-8 text-center">
        <Link 
          to="/admin/login" 
          className="text-sm text-gray-500 hover:text-black transition-colors"
        >
          Admin Access
        </Link>
      </div>
      
      <Footer />
    </main>
  );
};

export default Index;
