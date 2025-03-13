
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

const saleProducts = [
  {
    id: 101,
    name: "Summer Linen Shirt",
    originalPrice: 2499,
    salePrice: 1499,
    discount: 40,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80",
    category: "Men's Clothing",
  },
  {
    id: 102,
    name: "Floral Maxi Dress",
    originalPrice: 2999,
    salePrice: 1799,
    discount: 40,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80",
    category: "Women's Clothing",
  },
  {
    id: 103,
    name: "Denim Jacket",
    originalPrice: 3499,
    salePrice: 1999,
    discount: 43,
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&q=80",
    category: "Men's Clothing",
  },
  {
    id: 104,
    name: "Cotton Blend T-Shirt",
    originalPrice: 1299,
    salePrice: 699,
    discount: 46,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80",
    category: "Men's Clothing",
  },
  {
    id: 105,
    name: "Summer Dress",
    originalPrice: 2299,
    salePrice: 1299,
    discount: 43,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80",
    category: "Women's Clothing",
  },
];

const SaleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const { addItem } = useCart();
  
  // Convert products to format expected by addItem
  const formatProduct = (product: typeof saleProducts[0]) => {
    return {
      id: product.id,
      name: product.name,
      price: product.salePrice,
      image: product.image,
      category: product.category,
      description: `Sale item - ${product.discount}% off`
    };
  };

  const handleAddToCart = (product: typeof saleProducts[0]) => {
    addItem(formatProduct(product));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % saleProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + saleProducts.length) % saleProducts.length);
  };

  const gotoSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoplay(false);
    // Resume autoplay after 5 seconds of inactivity
    setTimeout(() => setAutoplay(true), 5000);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoplay]);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="bg-black text-white py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Tag size={14} className="text-red-400" />
              <span className="text-red-400 font-medium text-xs">LIMITED TIME OFFER</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Summer Sale</h2>
            <p className="text-gray-300 text-xs mt-0.5">Up to 50% off on selected items</p>
          </div>
          
          <a href="/sale" className="mt-2 md:mt-0 text-xs font-medium border-b border-white pb-0.5 hover:text-gray-300 transition-colors">
            View All Sale Items
          </a>
        </div>
        
        <div className="relative">
          {/* Carousel container */}
          <div className="overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {saleProducts.map((product) => (
                <div key={product.id} className="min-w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                    {/* Product image */}
                    <div className="relative rounded-lg overflow-hidden aspect-[4/3] md:aspect-auto md:h-[200px]">
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                        {product.discount}% OFF
                      </div>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product details */}
                    <div className="flex flex-col justify-center space-y-2">
                      <div>
                        <p className="text-gray-300 text-xs mb-0.5">{product.category}</p>
                        <h3 className="text-lg md:text-xl font-bold mb-1">{product.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-base md:text-lg font-bold">{formatCurrency(product.salePrice)}</span>
                          <span className="text-gray-400 text-xs line-through">{formatCurrency(product.originalPrice)}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-xs hidden md:block">
                        Limited stock available. Get this style before it's gone!
                      </p>
                      
                      <div className="pt-1">
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          className="bg-white text-black hover:bg-gray-100 px-3 py-1.5 h-auto text-xs rounded-md"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
          
          {/* Indicators */}
          <div className="flex justify-center gap-1.5 mt-2">
            {saleProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => gotoSlide(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  index === currentIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleCarousel;
