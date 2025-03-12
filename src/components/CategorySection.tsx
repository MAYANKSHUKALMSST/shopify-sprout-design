
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface CategorySectionProps {
  title: string;
  description: string;
  image: string;
  direction?: 'left' | 'right';
}

const CategorySection = ({ title, description, image, direction = 'left' }: CategorySectionProps) => {
  return (
    <div className="relative overflow-hidden py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${direction === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
          <motion.div 
            initial={{ opacity: 0, x: direction === 'right' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <img
              src={image}
              alt={title}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: direction === 'right' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex-1 text-center md:text-left"
          >
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            <Button className="group">
              Shop Now
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
