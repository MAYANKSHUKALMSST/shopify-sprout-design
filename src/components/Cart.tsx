
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CheckoutForm from './CheckoutForm';
import PaymentForm from './PaymentForm';
import AuthModal from './AuthModal';

type CheckoutStep = 'cart' | 'delivery' | 'payment';

interface DeliveryDetails {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

const Cart = () => {
  const { 
    items, 
    isOpen, 
    totalPrice, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    closeCart 
  } = useCart();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const handleCheckout = () => {
    if (isAuthenticated) {
      setCurrentStep('delivery');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleDeliverySubmit = (data: DeliveryDetails) => {
    setDeliveryDetails(data);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    clearCart();
    closeCart();
    setCurrentStep('cart');
  };

  const goBackToCart = () => {
    setCurrentStep('cart');
  };

  const goBackToDelivery = () => {
    setCurrentStep('delivery');
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    setCurrentStep('delivery');
  };

  return (
    <>
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />
      
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={closeCart}
          aria-hidden="true" 
        />
      )}
      
      {/* Cart panel */}
      <aside 
        className={cn(
          "cart-menu fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Cart header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">
              {currentStep === 'cart' ? 'Your Cart' : 
               currentStep === 'delivery' ? 'Delivery Details' : 'Payment'}
            </h2>
            <button 
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Cart content */}
          <div className="flex-1 overflow-y-auto">
            {currentStep === 'cart' && (
              <div className="p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <ShoppingBag size={48} className="text-gray-300 mb-4" />
                    <p className="text-muted-foreground mb-2">Your cart is empty</p>
                    <p className="text-sm text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <Button onClick={closeCart}>Continue Shopping</Button>
                  </div>
                ) : (
                  <ul className="space-y-6">
                    {items.map((item) => (
                      <li key={item.id} className="flex border-b pb-6">
                        {/* Product image */}
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        
                        {/* Product details */}
                        <div className="ml-4 flex flex-1 flex-col">
                          <div className="flex justify-between text-base font-medium">
                            <h3 className="text-foreground">{item.name}</h3>
                            <p className="ml-4">{formatCurrency(item.price)}</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{item.category}</p>
                          
                          <div className="flex items-center justify-between mt-auto">
                            {/* Quantity controls */}
                            <div className="flex items-center border rounded-md">
                              <button 
                                className="p-1 hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-2 py-1 min-w-[30px] text-center">
                                {item.quantity}
                              </span>
                              <button 
                                className="p-1 hover:bg-gray-100"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            {/* Remove button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm font-medium text-muted-foreground hover:text-destructive"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {currentStep === 'delivery' && (
              <CheckoutForm 
                onSubmit={handleDeliverySubmit}
                onCancel={goBackToCart}
              />
            )}

            {currentStep === 'payment' && deliveryDetails && (
              <PaymentForm 
                amount={totalPrice}
                onSuccess={handlePaymentSuccess}
                onCancel={goBackToDelivery}
              />
            )}
          </div>
          
          {/* Cart footer */}
          {currentStep === 'cart' && items.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between font-medium">
                <p>Subtotal</p>
                <p>{formatCurrency(totalPrice)}</p>
              </div>
              <p className="text-sm text-muted-foreground">Free shipping on orders over ₹1,999</p>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-black hover:bg-black/80 text-white"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                By proceeding to checkout, you agree to our <Link href="/terms" className="underline">Terms & Conditions</Link> and <Link href="/refund-policy" className="underline">Refund Policy</Link>
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

const Link = ({ href, className, children }: { href: string, className?: string, children: React.ReactNode }) => (
  <a href={href} className={className} onClick={(e) => e.stopPropagation()}>
    {children}
  </a>
);

export default Cart;
