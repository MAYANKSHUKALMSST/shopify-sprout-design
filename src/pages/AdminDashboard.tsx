
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import ProductEditor from '@/components/ProductEditor';
import { LogOut } from 'lucide-react';

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

const AdminDashboard = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
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
              onClick={() => setSelectedProduct(null)}
              className="mb-4"
            >
              Back to Products
            </Button>
            <ProductEditor 
              product={selectedProduct} 
              onSave={handleProductUpdate}
              onCancel={() => setSelectedProduct(null)}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Product Management</h2>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedProduct(product)}
                      >
                        Edit
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
