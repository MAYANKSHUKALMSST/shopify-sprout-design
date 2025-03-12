
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 mb-12">
          {/* Brand info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ZUREE DISEÑO</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              A collection of thoughtfully designed clothing that brings style and comfort to everyday life.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground flex">
                <MapPin size={16} className="mr-2 flex-shrink-0 text-gray-500" />
                <span>123 Design St, San Francisco, CA 94103</span>
              </li>
              <li className="text-sm text-muted-foreground flex">
                <Phone size={16} className="mr-2 flex-shrink-0 text-gray-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-sm text-muted-foreground flex">
                <Mail size={16} className="mr-2 flex-shrink-0 text-gray-500" />
                <span>hello@zuree.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-200 pt-10 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-medium mb-2">Subscribe to our newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates, news and product offers sent straight to your inbox.
              </p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                className="bg-black text-white px-4 py-2 text-sm rounded-r-md hover:bg-black/80 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-6 border-t border-gray-200 mt-6">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ZUREE DISEÑO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
