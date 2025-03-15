
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProductListHeaderProps {
  onCreateProduct: () => void;
}

const ProductListHeader: React.FC<ProductListHeaderProps> = ({ onCreateProduct }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Product Management</h2>
      <Button 
        onClick={onCreateProduct}
        className="bg-black hover:bg-black/80 text-white flex items-center gap-2"
      >
        <Plus size={16} />
        Add New Product
      </Button>
    </div>
  );
};

export default ProductListHeader;
