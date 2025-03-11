
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center relative overflow-hidden pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-50 animate-pulse-subtle" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-rose-50 animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-amber-50 animate-pulse-subtle" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 mb-6 text-sm rounded-full border border-black/10 bg-black/5">
              Minimalist Design • Premium Quality
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold leading-tight md:leading-tight tracking-tight mb-6"
          >
            The Art of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">
              Simple Living
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            Discover our collection of thoughtfully designed objects that bring beauty and purpose to everyday life.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              className="group bg-black text-white hover:bg-black/90 px-8 py-6 rounded-md h-auto text-base"
            >
              <span>Shop Collection</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              className="px-8 py-6 rounded-md h-auto text-base border-black/20 hover:bg-black/5"
            >
              Explore Designs
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="w-full max-w-6xl mx-auto mt-16 px-4 md:px-0"
      >
        <div className="aspect-[16/9] overflow-hidden rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1581957088953-8c910586389b?auto=format&fit=crop&q=80"
            alt="Minimalist home interior"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
