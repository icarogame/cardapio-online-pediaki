
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import OrderTypeSelection from '@/components/checkout/OrderTypeSelection';
import DeliveryForm from '@/components/checkout/DeliveryForm';
import PaymentOptions from '@/components/checkout/PaymentOptions';
import { createOrder } from '@/services/api/orders';
import { getCompanySettings } from '@/services/api/company';

const CheckoutPage = () => {
  const { cart, deleteFromCart, calculateItemPrice, getTotalPrice, setCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('delivery');
  const [tableNumber, setTableNumber] = useState('');
  const [address, setAddress] = useState({ street: '', number: '', neighborhood: '', city: '' });
  const [companyInfo, setCompanyInfo] = useState({ name: 'Sua Loja', phone: '' });
  const [paymentDetails, setPaymentDetails] = useState({
    metodo_pagamento: 'pix',
    bandeira_cartao: '',
    tipo_cartao: 'crédito',
    comprovante_pix_url: '',
    status_pagamento: 'Pendente'
  });
  
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const settings = await getCompanySettings();
        setCompanyInfo(settings);
      } catch (error) {
        toast({
          title: "Erro ao buscar informações da loja",
          description: error.message,
          variant: "destructive"
        });
      }
    };
    fetchCompanyInfo();
  }, [toast]);
  
  const generateWhatsappMessage = useMemo(() => {
    let summary = `Olá, *${companyInfo.name}*! 👋\n\nGostaria de fazer o seguinte pedido:\n\n`;
    cart.forEach(item => {
      summary += `*${item.quantity}x ${item.name}*\n`;
      if (item.customizations) {
        Object.values(item.customizations).flat().filter(Boolean).forEach(opt => summary += `  - ${opt.name}\n`);
      }
    });
    const deliveryFee = orderType === 'delivery' ? 5 : 0;
    const total = getTotalPrice() + deliveryFee;
    summary += `\n*Total do Pedido: R$ ${total.toFixed(2)}*\n\n`;

    if (orderType === 'delivery') {
      summary += `*Para entrega em:*\n${address.street}, ${address.number} - ${address.neighborhood}, ${address.city}\n\n`;
    } else if (orderType === 'pickup') {
      summary += `*Pedido para retirada no balcão.*\n\n`;
    } else if (orderType === 'dine-in') {
      summary += `*Pedido para a mesa ${tableNumber}.*\n\n`;
    }
    
    summary += `*Forma de Pagamento:* ${paymentDetails.metodo_pagamento}`;
    return summary;
  }, [cart, companyInfo.name, orderType, address, tableNumber, paymentDetails.metodo_pagamento, getTotalPrice]);

  const handleSendToWhatsapp = () => {
    if (!companyInfo.phone) {
      toast({
        title: "WhatsApp da loja não configurado",
        description: "Não é possível enviar o pedido via WhatsApp no momento.",
        variant: "destructive"
      });
      return;
    }
    const formattedPhone = companyInfo.phone.replace(/\D/g, '');
    const whatsappUrl = `https://api.whatsapp.com/send?phone=55${formattedPhone}&text=${encodeURIComponent(generateWhatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Pedido enviado!",
      description: "Confirme o envio na aba do WhatsApp.",
    });
    // Opcional: navegar para uma página de confirmação e limpar o carrinho.
    // navigate('/order-confirmation', { state: { order: { items: cart, ... } } });
    // setCart([]);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      id: `#${Math.floor(1000 + Math.random() * 9000)}`,
      customer: "Usuário Convidado",
      items: cart,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber : null,
      address: orderType === 'delivery' ? address : null,
      paymentDetails,
      total: getTotalPrice() + (orderType === 'delivery' ? 5 : 0),
      status: paymentDetails.metodo_pagamento === 'pix' ? 'Aguardando Confirmação' : 'Preparando',
      createdAt: new Date().toISOString()
    };
    await createOrder(orderData);
    toast({
      title: "Pedido enviado com sucesso! 🎉",
      description: "Seu pedido está sendo preparado. Acompanhe o status.",
      duration: 3000,
    });
    setCart([]);
    navigate(`/${companyInfo.sublink}/order-confirmation`, { state: { order: orderData } });
  };

  const handleOnlinePayment = () => {
    if (cart.length === 1 && cart[0].link_pagamento_online) {
      toast({
        title: "Redirecionando para pagamento...",
        description: "Você será levado para um ambiente seguro para finalizar a compra.",
      });
      window.location.href = cart[0].link_pagamento_online;
    } else {
      toast({
        title: "Pagamento online indisponível",
        description: "Para múltiplos itens ou produtos sem link, por favor, combine o pagamento com o lojista via PIX ou na entrega.",
        variant: "destructive",
        duration: 6000
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/menu" className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="hidden sm:inline text-2xl font-bold text-gray-900">MenuFlow Checkout</span>
            </Link>
             <Link to="/menu">
              <Button variant="outline">Voltar ao Cardápio</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Quase lá!</h1>
          <p className="text-lg text-gray-600 mt-2">Confirme os detalhes do seu pedido para finalizar.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <CheckoutSummary cart={cart} deleteFromCart={deleteFromCart} calculateItemPrice={calculateItemPrice} />

            <Card>
              <CardHeader>
                <CardTitle>Como você quer receber seu pedido?</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTypeSelection orderType={orderType} setOrderType={setOrderType} />
                
                {orderType === 'delivery' && <DeliveryForm onAddressChange={setAddress} />}
                {orderType === 'dine-in' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6"
                  >
                    <Label htmlFor="table-number">Número da Mesa</Label>
                    <Input 
                      id="table-number" 
                      placeholder="Ex: 15" 
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                    />
                  </motion.div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentOptions 
                  paymentDetails={paymentDetails} 
                  setPaymentDetails={setPaymentDetails}
                  onOnlinePayment={handleOnlinePayment}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky top-28 self-start">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa de Entrega</span>
                  <span>{orderType === 'delivery' ? 'R$ 5.00' : 'R$ 0.00'}</span>
                </div>
                 <div className="flex justify-between text-xl font-bold border-t pt-4">
                  <span>Total a pagar</span>
                  <span>R$ {(getTotalPrice() + (orderType === 'delivery' ? 5 : 0)).toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  className="w-full gradient-orange text-white"
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                >
                  Finalizar Pedido e Enviar
                </Button>
                 <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                  onClick={handleSendToWhatsapp}
                  disabled={cart.length === 0}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Enviar Pedido para o WhatsApp da Loja
                </Button>
              </CardFooter>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
