
import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { Product } from '@/context/CartContext';
import { ArrowRight } from 'lucide-react';

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: 48.99,
    image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&q=80",
    category: "Men's Clothing",
    description: "A timeless white shirt made from premium cotton with a modern slim fit design."
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 54.95,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80",
    category: "Men's Clothing",
    description: "Comfortable slim fit jeans with a perfect balance of style and comfort."
  },
  {
    id: 3,
    name: "Linen Blend Blouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1499939667766-4afceb292d05?auto=format&fit=crop&q=80",
    category: "Women's Clothing",
    description: "Elegant linen blend blouse with relaxed fit and breathable fabric."
  },
  {
    id: 4,
    name: "Printed Summer Dress",
    price: 68.50,
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&q=80",
    category: "Women's Clothing",
    description: "Light and breezy summer dress with a beautiful floral print pattern."
  },
  {
    id: 5,
    name: "Cotton Polo Shirt",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1585412594838-e6079e48b5f2?auto=format&fit=crop&q=80", 
    category: "Men's Clothing",
    description: "Classic polo shirt made from premium cotton with a comfortable regular fit."
  },
  {
    id: 6,
    name: "Pleated Midi Skirt",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?auto=format&fit=crop&q=80",
    category: "Women's Clothing",
    description: "Elegant pleated midi skirt with a flattering silhouette and versatile design."
  },
  {
    id: 7,
    name: "Lightweight Cardigan",
    price: 49.95,
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80",
    category: "Women's Clothing",
    description: "Soft and lightweight cardigan perfect for layering in any season."
  },
  {
    id: 8,
    name: "Tailored Blazer",
    price: 79.00,
    image: "https://images.unsplash.com/photo-1517614138969-67d1892d0edf?auto=format&fit=crop&q=80",
    category: "Men's Clothing",
    description: "Sophisticated tailored blazer that transitions easily from office to evening."
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Products</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl">
                Explore our curated collection of thoughtfully designed clothing for your wardrobe.
              </p>
            </motion.div>
          </div>
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            href="/shop"
            className="mt-6 md:mt-0 flex items-center text-sm font-medium group"
          >
            View all products
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
