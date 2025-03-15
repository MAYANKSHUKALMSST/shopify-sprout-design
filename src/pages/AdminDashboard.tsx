
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ProductEditor from '@/components/ProductEditor';

// Import the new components
import AdminHeader from '@/components/admin/AdminHeader';
import ProductList from '@/components/admin/ProductList';
import DeleteProductDialog from '@/components/admin/DeleteProductDialog';
import ProductListHeader from '@/components/admin/ProductListHeader';

// Mock products for demo (in a real app, this would come from an API/database)
const mockProducts = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    category: 'Men\'s Essentials',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
    description: 'Premium cotton t-shirt with a comfortable fit.'
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 59.99,
    category: 'Men\'s Essentials',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80',
    description: 'Classic slim fit jeans with a modern touch.'
  },
  {
    id: '3',
    name: 'Floral Summer Dress',
    price: 49.99,
    category: 'Women\'s Collection',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80',
    description: 'Light and comfortable summer dress with floral pattern.'
  },
  {
    id: '4',
    name: 'Cotton Hoodie',
    price: 39.99,
    category: 'Casual Wear',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80',
    description: 'Warm and stylish hoodie for everyday wear.'
  },
];

// Empty product template for new products
const emptyProduct = {
  id: '',
  name: '',
  price: 0,
  category: 'Men\'s Essentials',
  image: 'https://images.unsplash.com/photo-1561876029-3ca8a45d96ce?auto=format&fit=crop&q=80',
  description: ''
};

const AdminDashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const navigate = useNavigate();

  // Check if admin is authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleProductUpdate = (updatedProduct: any) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setSelectedProduct(null);
    toast.success('Product updated successfully');
  };

  const handleCreateProduct = () => {
    setIsCreating(true);
    const newProductTemplate = {
      ...emptyProduct,
      id: Date.now().toString() // Generate a temporary ID
    };
    setSelectedProduct(newProductTemplate);
  };

  const handleSaveNewProduct = (newProduct: any) => {
    setProducts([...products, newProduct]);
    setSelectedProduct(null);
    setIsCreating(false);
    toast.success('Product added successfully');
  };

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      toast.success('Product deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <AdminHeader onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {selectedProduct ? (
          <div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedProduct(null);
                setIsCreating(false);
              }}
              className="mb-4"
            >
              Back to Products
            </Button>
            <ProductEditor 
              product={selectedProduct} 
              onSave={isCreating ? handleSaveNewProduct : handleProductUpdate}
              onCancel={() => {
                setSelectedProduct(null);
                setIsCreating(false);
              }}
            />
          </div>
        ) : (
          <div>
            <ProductListHeader onCreateProduct={handleCreateProduct} />
            <ProductList 
              products={products}
              onEditProduct={setSelectedProduct}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        )}
      </main>

      <DeleteProductDialog 
        open={deleteDialogOpen}
        product={productToDelete}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default AdminDashboard;
