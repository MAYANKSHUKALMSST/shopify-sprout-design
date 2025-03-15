
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ProductEditor from '@/components/ProductEditor';
import { LogOut, Plus, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>

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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <Button 
                onClick={handleCreateProduct}
                className="bg-black hover:bg-black/80 text-white flex items-center gap-2"
              >
                <Plus size={16} />
                Add New Product
              </Button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              {products.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No products available. Click "Add New Product" to create one.
                </div>
              ) : (
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
                            onClick={() => setSelectedProduct(product)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
