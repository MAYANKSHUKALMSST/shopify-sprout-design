
import React from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { Product } from '@/context/CartContext';
import { ArrowRight } from 'lucide-react';

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Minimalist Ceramic Vase",
    price: 48.99,
    image: "https://images.unsplash.com/photo-1612196808214-b40b3db631b1?auto=format&fit=crop&q=80",
    category: "Home Decor",
    description: "A beautifully crafted ceramic vase with a minimalist design that complements any interior."
  },
  {
    id: 2,
    name: "Wooden Serving Tray",
    price: 34.95,
    image: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?auto=format&fit=crop&q=80",
    category: "Kitchen",
    description: "Elegant wooden serving tray made from sustainable oak with smooth finish."
  },
  {
    id: 3,
    name: "Linen Throw Pillow",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601189575328-7e4384bae25c?auto=format&fit=crop&q=80",
    category: "Textiles",
    description: "Soft linen throw pillow with removable cover in neutral tones."
  },
  {
    id: 4,
    name: "Handcrafted Wall Clock",
    price: 68.50,
    image: "https://images.unsplash.com/photo-1597624812481-24626c926cd6?auto=format&fit=crop&q=80",
    category: "Wall Decor",
    description: "Modern wall clock with a clean design and silent quartz movement."
  },
  {
    id: 5,
    name: "Glass Terrarium",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1545165375-68b9195c7f9c?auto=format&fit=crop&q=80", 
    category: "Plants",
    description: "Geometric glass terrarium for displaying your favorite small plants."
  },
  {
    id: 6,
    name: "Marble Coaster Set",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1532499016263-f2c3e89de9cd?auto=format&fit=crop&q=80",
    category: "Tableware",
    description: "Set of four marble coasters with cork backing to protect your surfaces."
  },
  {
    id: 7,
    name: "Woven Storage Basket",
    price: 39.95,
    image: "https://images.unsplash.com/photo-1599619585752-c3d98ee25272?auto=format&fit=crop&q=80",
    category: "Storage",
    description: "Handwoven storage basket perfect for organizing any room in your home."
  },
  {
    id: 8,
    name: "Nordic Table Lamp",
    price: 79.00,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80",
    category: "Lighting",
    description: "Scandinavian-inspired table lamp with wooden base and linen shade."
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
                Explore our curated collection of thoughtfully designed products for your home.
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
