
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CreditCard, Calendar, CreditCardIcon, Lock } from 'lucide-react';
import { toast } from "sonner";

interface PaymentFormData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentForm = ({ amount, onSuccess, onCancel }: PaymentFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const onSubmit = (data: PaymentFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment successful!");
      onSuccess();
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <div className="flex items-center gap-2 text-sm font-medium">
          <Lock size={14} className="text-green-600" />
          <span>Secure Payment</span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total Amount:</span>
          <span className="text-lg font-semibold">{formatCurrency(amount)}</span>
        </div>
      </div>
      
      <div className="flex gap-2 mb-6">
        <div className="flex items-center bg-gray-100 p-2 rounded">
          <CreditCardIcon size={24} className="mr-2 text-gray-700" />
          <span className="text-sm font-medium">Credit/Debit Card</span>
        </div>
        <div className="flex gap-1">
          <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="Amex" className="h-6" />
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
          <div className="relative">
            <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("cardNumber", { 
                required: "Card number is required",
                pattern: {
                  value: /^[\d\s]{16,19}$/,
                  message: "Please enter a valid card number"
                }
              })}
            />
          </div>
          {errors.cardNumber && <p className="text-sm text-destructive mt-1">{errors.cardNumber.message}</p>}
        </div>

        <div>
          <label htmlFor="cardName" className="block text-sm font-medium mb-1">Cardholder Name</label>
          <input
            id="cardName"
            type="text"
            placeholder="John Smith"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            {...register("cardName", { required: "Cardholder name is required" })}
          />
          {errors.cardName && <p className="text-sm text-destructive mt-1">{errors.cardName.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">Expiry Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                id="expiryDate"
                type="text"
                placeholder="MM/YY"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                {...register("expiryDate", { 
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Format: MM/YY"
                  }
                })}
              />
            </div>
            {errors.expiryDate && <p className="text-sm text-destructive mt-1">{errors.expiryDate.message}</p>}
          </div>
          
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium mb-1">CVV</label>
            <input
              id="cvv"
              type="text"
              placeholder="123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              {...register("cvv", { 
                required: "CVV is required",
                pattern: {
                  value: /^\d{3,4}$/,
                  message: "3-4 digits only"
                }
              })}
            />
            {errors.cvv && <p className="text-sm text-destructive mt-1">{errors.cvv.message}</p>}
          </div>
        </div>
        
        <div className="pt-4 space-y-3">
          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-black/80 text-white"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : `Pay ${formatCurrency(amount)}`}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={onCancel}
            disabled={isProcessing}
          >
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
