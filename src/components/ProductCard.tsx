
import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const { addItem } = useCart();
  
  // Format price with dollar sign
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
    >
      {/* Product image with hover effect */}
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
        
        {/* Quick add button */}
        <div className="absolute bottom-4 right-4 transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            size="sm"
            className="h-10 w-10 rounded-full p-0 bg-white text-black hover:bg-white/90"
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          <h3 className="text-sm font-medium">{product.name}</h3>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-medium">{formattedPrice}</p>
          <Button
            variant="ghost"
            size="sm"
            className="px-2 py-1 h-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
