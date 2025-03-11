
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate totals when cart items change
  useEffect(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const price = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Item already exists, increase quantity
        const updatedItems = prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        toast(`Added another ${product.name} to your cart`);
        return updatedItems;
      } else {
        // Item doesn't exist, add new item with quantity 1
        toast(`Added ${product.name} to your cart`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    
    // Briefly show the cart when an item is added
    setIsOpen(true);
    setTimeout(() => {
      if (!document.querySelector('.cart-menu:hover')) {
        setIsOpen(false);
      }
    }, 2000);
  };

  const removeItem = (id: number) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast(`Removed ${item.name} from your cart`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast('Cart cleared');
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      toggleCart,
      closeCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
