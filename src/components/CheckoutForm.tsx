
import React from 'react';
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeliveryFormData {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
}

interface CheckoutFormProps {
  onSubmit: (data: DeliveryFormData) => void;
  onCancel: () => void;
}

const CheckoutForm = ({ onSubmit, onCancel }: CheckoutFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<DeliveryFormData>();

  const submitHandler = (data: DeliveryFormData) => {
    toast.success("Delivery details saved");
    onSubmit(data);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold">Delivery Details</h2>
      
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
          <input
            id="fullName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
          <input
            id="address"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && <p className="text-sm text-destructive mt-1">{errors.address.message}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
            <input
              id="city"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && <p className="text-sm text-destructive mt-1">{errors.city.message}</p>}
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              id="postalCode"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              {...register("postalCode", { required: "Postal code is required" })}
            />
            {errors.postalCode && <p className="text-sm text-destructive mt-1">{errors.postalCode.message}</p>}
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
          <input
            id="phone"
            type="tel"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("phone", { required: "Phone number is required" })}
          />
          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>
        
        <div className="flex gap-3 pt-4">
          <Button type="submit" className="flex-1 bg-black hover:bg-black/80 text-white">
            Continue to Payment
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Back to Cart
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
