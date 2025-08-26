import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  Receipt,
  Printer,
  XCircle,
  Bike,
  MessageSquare,
  Menu,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import POSProductGrid from '@/components/pos/POSProductGrid';
import POSCart from '@/components/pos/POSCart';
import ProductDetail from '@/components/menu/ProductDetail';
import AssignDeliveryModal from '@/components/pos/AssignDeliveryModal';
import PrintOptionsModal from '@/components/pos/PrintOptionsModal';
import WhatsappShareModal from '@/components/pos/WhatsappShareModal';
import KitchenReceipt from '@/components/pos/KitchenReceipt';
import CustomerReceipt from '@/components/pos/CustomerReceipt';
import CounterReceipt from '@/components/pos/CounterReceipt';
import { menuItems, categories } from '@/data/menuData'; // For display purposes
import { createOrder } from '@/services/api/orders';
import { getCompanySettings } from '@/services/api/company';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const POSPage = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [lastOrder, setLastOrder] = useState({ id: '#0000', number: 1});
  const [companyInfo, setCompanyInfo] = useState({ name: 'Sua Loja', address: 'Seu Endereço', phone: 'Seu Telefone' });

  const kitchenReceiptRef = useRef();
  const customerReceiptRef = useRef();
  const counterReceiptRef = useRef();
  
  const [printType, setPrintType] = useState('kitchen');

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const info = await getCompanySettings();
        setCompanyInfo(info);
      } catch (error) {
        console.error("Failed to fetch company info:", error);
      }
    };
    fetchCompanyInfo();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => {
      if (printType === 'kitchen') return kitchenReceiptRef.current;
      if (printType === 'customer') return customerReceiptRef.current;
      if (printType === 'counter') return counterReceiptRef.current;
      return null;
    },
    onAfterPrint: () => toast({ title: 'Comanda enviada para impressão.' }),
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setTimeout(resolve, 250);
      });
    },
  });

  const filteredItems = menuItems.filter(item => {
    return selectedCategory === 'todos' || item.category === selectedCategory;
  });

  const handleAddToCartFromModal = (item, quantity, customizations) => {
    const cartItemId = `${item.id}-${JSON.stringify(customizations)}`;
    const existingItem = cart.find(cartItem => cartItem.cartItemId === cartItemId);

    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.cartItemId === cartItemId
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity, customizations, cartItemId }]);
    }
    
    toast({
      title: "Item adicionado ao pedido! 🛒",
      description: `${item.name} foi adicionado com sucesso.`,
      duration: 2000,
    });
    setIsProductModalOpen(false);
  };

  const handleProductClick = (item) => {
    if (item.customization && item.customization.length > 0) {
      setSelectedProduct(item);
      setIsProductModalOpen(true);
    } else {
      const cartItemId = `${item.id}-{}`;
      const existingItem = cart.find(cartItem => cartItem.cartItemId === cartItemId);
      if (existingItem) {
        setCart(cart.map(cartItem => 
          cartItem.cartItemId === cartItemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ));
      } else {
        setCart([...cart, { ...item, quantity: 1, customizations: {}, cartItemId }]);
      }
      toast({
        title: "Item adicionado!",
        description: `${item.name} foi adicionado ao pedido.`,
        duration: 1500,
      });
    }
  };

  const handleIncrementItem = (cartItemId) => {
    setCart(cart.map(item => 
      item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrementItem = (cartItemId) => {
    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(item => 
        item.cartItemId === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
      ));
    } else {
      setCart(cart.filter(item => item.cartItemId !== cartItemId));
      if (cart.length === 1) {
        setDeliveryInfo(null);
      }
    }
  };

  const clearCart = () => {
    setCart([]);
    setDeliveryInfo(null);
    toast({
      title: "Pedido cancelado",
      description: "Todos os itens foram removidos.",
      duration: 2000,
    });
  };
  
  const handleAssignDelivery = (data) => {
    setDeliveryInfo(data);
    toast({
      title: "Entregador Atribuído!",
      description: `${data.driver} está a caminho. Taxa: R$ ${data.fee.toFixed(2)}`,
    });
    setIsDeliveryModalOpen(false);
  };
  
  const handleOpenPrintModal = () => {
    if (cart.length === 0) {
      toast({
        variant: "destructive",
        title: "Atenção!",
        description: "Não há itens no pedido para imprimir.",
        duration: 3000,
      });
      return;
    }
    setIsPrintModalOpen(true);
  }

  const handleOpenWhatsappModal = () => {
    if (cart.length === 0) {
      toast({
        variant: "destructive",
        title: "Atenção!",
        description: "Não há itens no pedido para compartilhar.",
        duration: 3000,
      });
      return;
    }
    setIsWhatsappModalOpen(true);
  };

  const handleSelectPrintOption = (type) => {
    setPrintType(type);
    setTimeout(() => {
      handlePrint();
    }, 0);
  };

  const handleFinalizeSale = async () => {
    if (cart.length === 0) {
      toast({
        variant: "destructive",
        title: "Atenção!",
        description: "Adicione itens ao pedido antes de finalizar a venda.",
        duration: 3000,
      });
      return;
    }
    
    setIsFinalizing(true);
    try {
      const orderData = {
        items: cart.map(item => `${item.quantity}x ${item.name}`).join(', '),
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2),
        customer: deliveryInfo?.customerName || 'Cliente Balcão',
      };

      const newOrder = await createOrder(orderData);
      setLastOrder(newOrder);

      toast({
        title: "Venda Finalizada com Sucesso!",
        description: `Pedido ${newOrder.id} foi criado.`,
        className: "bg-green-100 text-green-800"
      });
      
      setCart([]);
      setDeliveryInfo(null);
      setIsCartSheetOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao finalizar venda",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsFinalizing(false);
    }
  }

  const CartAndActions = () => (
    <div className="flex flex-col flex-grow h-full">
      <POSCart 
          cart={cart}
          onIncrement={handleIncrementItem}
          onDecrement={handleDecrementItem}
          deliveryInfo={deliveryInfo}
        />
      <div className="mt-auto space-y-3 pt-4 border-t">
        <Button 
          size="lg"
          variant="outline"
          className="w-full text-base py-6"
          onClick={handleOpenPrintModal}
          disabled={cart.length === 0}
        >
          <Printer className="w-5 h-5 mr-3" /> Imprimir Pedido
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="w-full text-base py-6"
          onClick={handleOpenWhatsappModal}
          disabled={cart.length === 0}
        >
          <MessageSquare className="w-5 h-5 mr-3" /> Compartilhar
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="w-full text-base py-6"
          onClick={() => setIsDeliveryModalOpen(true)}
          disabled={cart.length === 0}
        >
          <Bike className="w-5 h-5 mr-3" /> Atribuir Entregador
        </Button>
        <Button 
          size="lg"
          className="w-full text-base py-6 gradient-orange text-white"
          onClick={handleFinalizeSale}
          disabled={isFinalizing}
        >
          {isFinalizing ? 'Finalizando...' : (
            <>
              <Receipt className="w-5 h-5 mr-3" /> Finalizar Venda
            </>
          )}
        </Button>
        <Button 
          size="lg"
          variant="destructive"
          className="w-full text-base py-6"
          onClick={clearCart}
          disabled={cart.length === 0}
        >
          <XCircle className="w-5 h-5 mr-3" /> Cancelar Pedido
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-screen bg-gray-100 flex flex-col md:overflow-hidden">
        <header className="md:hidden p-4 bg-white shadow-md flex justify-between items-center flex-shrink-0">
            <h1 className="text-xl font-bold">Ponto de Venda</h1>
            <Sheet open={isCartSheetOpen} onOpenChange={setIsCartSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full max-w-sm flex flex-col p-4">
                    <SheetHeader>
                        <SheetTitle>Pedido Atual</SheetTitle>
                    </SheetHeader>
                    <div className="flex-grow overflow-y-auto">
                        <CartAndActions />
                    </div>
                </SheetContent>
            </Sheet>
        </header>
        <div className="flex-grow flex flex-col md:flex-row md:overflow-hidden">
          <main className="flex-grow p-4 md:p-6 flex flex-col md:overflow-hidden">
            <div className="flex-shrink-0 mb-4">
              <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`whitespace-nowrap rounded-full px-3 py-1.5 h-auto text-sm sm:text-base transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? 'gradient-orange text-white border-0' 
                        : 'bg-white hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    <span className="mr-2 hidden sm:inline">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex-grow md:overflow-y-auto">
               <POSProductGrid
                  items={filteredItems}
                  onProductClick={handleProductClick}
                  cart={cart}
                />
            </div>
          </main>
          
          <aside className="hidden md:w-96 lg:w-[420px] bg-white border-l md:flex flex-col p-4 md:p-6 shadow-lg md:overflow-hidden">
             <div className="flex flex-col h-full">
                <h2 className="text-2xl font-bold mb-4 flex-shrink-0">Pedido Atual</h2>
                <div className="flex-grow overflow-y-auto">
                    <CartAndActions />
                </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="hidden">
        <KitchenReceipt ref={kitchenReceiptRef} cart={cart} deliveryInfo={deliveryInfo} orderNumber={lastOrder.number} />
        <CustomerReceipt ref={customerReceiptRef} cart={cart} deliveryInfo={deliveryInfo} orderNumber={lastOrder.number} companyInfo={companyInfo} />
        <CounterReceipt ref={counterReceiptRef} cart={cart} deliveryInfo={deliveryInfo} orderNumber={lastOrder.number} />
      </div>

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onOpenChange={setIsProductModalOpen}
          onAddToCart={handleAddToCartFromModal}
        />
      )}
      <AssignDeliveryModal
        isOpen={isDeliveryModalOpen}
        onOpenChange={setIsDeliveryModalOpen}
        onConfirm={handleAssignDelivery}
      />
      <PrintOptionsModal
        isOpen={isPrintModalOpen}
        onOpenChange={setIsPrintModalOpen}
        onSelectPrint={handleSelectPrintOption}
      />
      <WhatsappShareModal
        isOpen={isWhatsappModalOpen}
        onOpenChange={setIsWhatsappModalOpen}
        cart={cart}
        deliveryInfo={deliveryInfo}
        companyInfo={companyInfo}
        orderId={lastOrder.id}
      />
    </>
  );
};

export default POSPage;