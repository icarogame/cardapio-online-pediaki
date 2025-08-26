import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import MenuHeader from '@/components/menu/MenuHeader';
import MenuItemCard from '@/components/menu/MenuItemCard';
import ProductDetail from '@/components/menu/ProductDetail';
import CartSheet from '@/components/menu/CartSheet';
import { useToast } from '@/components/ui/use-toast';
import { getMenuItems } from '@/services/api';
import { categories } from '@/data/menuData'; // Categories can remain static for now

const MenuPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { addToCart, getTotalPrice, totalCartItems } = useCart();
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      const data = await getMenuItems();
      setMenuItems(data);
      setLoading(false);

      const productIdFromUrl = searchParams.get('product');
      if (productIdFromUrl) {
          const productToOpen = data.find(p => p.id.toString() === productIdFromUrl);
          if(productToOpen) {
            setSelectedProduct(productToOpen);
          }
      }
    };
    fetchMenu();
  }, [searchParams]);

  useEffect(() => {
    if (location.state?.openCart) {
      setIsCartOpen(true);
    }
  }, [location.state]);

  const handleAddToCart = (product, quantity, customizations) => {
    addToCart(product, quantity, customizations);
    toast({
      title: "Item Adicionado!",
      description: `${quantity}x ${product.name} foi adicionado ao seu carrinho.`,
      className: "bg-green-100 text-green-800"
    });
  };

  const handleCardClick = (item) => {
    setSelectedProduct(item);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      
      <MenuHeader />

      <div className="sticky top-0 bg-gray-100/80 backdrop-blur-sm z-20 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar no cardápio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 w-full rounded-full"
              />
            </div>
        </div>
      </div>

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-2 sm:gap-3 mb-6 overflow-x-auto pb-2 -mx-4 px-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm sm:text-base transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'gradient-orange text-white border-transparent shadow-md' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="text-center p-10">Carregando cardápio...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => handleCardClick(item)}
              >
                <MenuItemCard item={item} onAddToCart={handleAddToCart} />
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <ProductDetail 
        product={selectedProduct} 
        isOpen={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartSheet isOpen={isCartOpen} onOpenChange={setIsCartOpen} />

      {totalCartItems > 0 && !isCartOpen && (
        <motion.div 
          className="fixed bottom-6 right-6 z-30"
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Button
            size="lg"
            className="gradient-orange text-white rounded-full shadow-2xl h-16 w-auto px-6 flex items-center gap-3"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-6 h-6" />
            <div className="text-left">
              <div className="font-bold leading-tight">{totalCartItems} {totalCartItems > 1 ? 'itens' : 'item'}</div>
              <div className="text-sm font-medium leading-tight">R$ {getTotalPrice().toFixed(2)}</div>
            </div>
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default MenuPage;