
import React from 'react';
import { Tag, Truck, RefreshCw } from 'lucide-react';

const SaleBanner = () => {
  return (
    <div className="bg-black text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm relative">
          {/* Static left item */}
          <div className="flex items-center gap-2 md:w-1/4 justify-center">
            <Tag size={16} className="text-red-400" />
            <span className="whitespace-nowrap">SALE UP TO 50% OFF</span>
          </div>
          
          {/* Scrolling middle section */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
              <div className="flex items-center gap-8 mx-4">
                <div className="flex items-center gap-2">
                  <Truck size={16} />
                  <span>Free Shipping over ₹1,999</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  <span>7 Days Return Policy</span>
                </div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-8 mx-4">
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
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
