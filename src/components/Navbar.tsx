
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { totalItems, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 md:px-10 py-4",
        isScrolled ? "glass shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-semibold tracking-tight animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ZUREE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors
                        after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] 
                        after:bottom-0 after:left-0 after:bg-foreground after:origin-bottom-right 
                        after:transition-transform after:duration-300 hover:after:scale-x-100 
                        hover:after:origin-bottom-left"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Cart and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="View your shopping cart"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[72px] bg-background backdrop-blur-md transition-transform duration-300 ease-in-out z-40 md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6 p-8 pt-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-lg font-medium hover:text-primary/70 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
