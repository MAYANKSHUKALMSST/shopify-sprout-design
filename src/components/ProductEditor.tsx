
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, UploadCloud } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProductEditorProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
  };
  onSave: (product: any) => void;
  onCancel: () => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onCancel }) => {
  const [imagePreview, setImagePreview] = useState(product.image);
  const isNewProduct = !product.name || product.name === ''; // Check if this is a new product
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors },
    watch 
  } = useForm({
    defaultValues: {
      ...product
    }
  });

  // Watch for changes to category field
  const watchedCategory = watch('category');
  
  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real application, you would upload this to a server
      // For demo purposes, we'll just create a data URL
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setValue('image', result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setValue('category', value);
  };

  // Form submission
  const onSubmit = (data: any) => {
    onSave(data);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">
        {isNewProduct ? "Add New Product" : "Edit Product"}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="name" className="mb-1">
              Product Name
            </Label>
            <Input
              id="name"
              {...register('name', { 
                required: 'Product name is required' 
              })}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message?.toString()}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="price" className="mb-1">
              Price ($)
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              {...register('price', { 
                required: 'Price is required',
                min: {
                  value: 0,
                  message: 'Price must be a positive number'
                },
                valueAsNumber: true
              })}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price.message?.toString()}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="category" className="mb-1">
              Category
            </Label>
            <Select
              value={watchedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Men's Essentials">Men's Essentials</SelectItem>
                <SelectItem value="Women's Collection">Women's Collection</SelectItem>
                <SelectItem value="Casual Wear">Casual Wear</SelectItem>
                <SelectItem value="Kids' Collection">Kids' Collection</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="image" className="mb-1">
              Product Image
            </Label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                <label
                  htmlFor="image"
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload
                </label>
              </div>
              
              <div className="h-12 w-12 rounded overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="description" className="mb-1">
            Description
          </Label>
          <Textarea
            id="description"
            {...register('description')}
            rows={4}
            placeholder="Enter product description"
          />
        </div>
        
        {(errors.name || errors.price) && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertDescription>
              Please fix the errors above before submitting
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-black hover:bg-black/80 text-white flex items-center">
            <Save className="mr-2 h-4 w-4" />
            {isNewProduct ? "Add Product" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditor;
