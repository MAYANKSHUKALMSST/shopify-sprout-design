
import React from 'react';
import { Tag, Truck, RefreshCw } from 'lucide-react';

const SaleBanner = () => {
  return (
    <div className="bg-black text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-red-400" />
            <span>SALE UP TO 50% OFF</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>Free Shipping over ₹1,999</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw size={16} />
            <span>7 Days Return Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
