
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteClick: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  onEditProduct, 
  onDeleteClick 
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="p-6 text-center text-gray-500">
          No products available. Click "Add New Product" to create one.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {products.map(product => (
          <li key={product.id}>
            <div className="px-4 py-4 sm:px-6 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-16 w-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="text-sm font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price}</p>
                  <p className="text-xs text-gray-400">{product.category}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEditProduct(product)}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onDeleteClick(product)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
