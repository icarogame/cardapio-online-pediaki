import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, Clock, MapPin, CreditCard, Home, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erro: Pedido não encontrado.</h1>
        <p className="text-gray-600 mb-6">Parece que houve um problema ao carregar os detalhes do seu pedido.</p>
        <Link to="/menu">
          <Button>Voltar ao Cardápio</Button>
        </Link>
      </div>
    );
  }

  const { id, createdAt, items, total, orderType, paymentDetails, address } = order;

  const getOrderTypeInfo = () => {
    switch (orderType) {
      case 'delivery':
        return { icon: <Home className="w-5 h-5" />, text: 'Entrega em domicílio' };
      case 'pickup':
        return { icon: <ShoppingBag className="w-5 h-5" />, text: 'Retirar no balcão' };
      case 'dine-in':
        return { icon: <CreditCard className="w-5 h-5" />, text: 'Comer no local' };
      default:
        return { icon: <ShoppingBag className="w-5 h-5" />, text: 'Não especificado' };
    }
  };

  const getPaymentMethodInfo = () => {
    switch (paymentDetails.metodo_pagamento) {
        case 'pix': return 'PIX';
        case 'cartao_entrega': return `Cartão na Entrega (${paymentDetails.tipo_cartao} ${paymentDetails.bandeira_cartao})`;
        case 'dinheiro': return 'Dinheiro';
        case 'cartao_online': return 'Cartão Online';
        default: return 'Não especificado';
    }
  }

  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl">
          <CardHeader className="bg-green-50 text-center p-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto animate-pulse-slow" />
            <CardTitle className="text-3xl font-bold text-gray-800 mt-4">Pedido Confirmado!</CardTitle>
            <p className="text-gray-600 mt-2">Obrigado pela sua preferência! Seu pedido foi recebido.</p>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Pedido ID</span>
                    </div>
                    <span className="font-bold text-gray-800">{id}</span>
                </div>
                 <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Data e Hora</span>
                    </div>
                    <span className="font-mono text-gray-800">{new Date(createdAt).toLocaleString('pt-BR')}</span>
                </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Itens do Pedido</h4>
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.cartItemId} className="flex justify-between items-start text-sm">
                    <p>
                      <span className="font-bold text-orange-600">{item.quantity}x</span> {item.name}
                    </p>
                    <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-3">
               <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">R$ {total.toFixed(2)}</span>
               </div>
               <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
               </div>
            </div>

            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Pagamento</h4>
                    <p className="flex items-center gap-2 text-gray-600"><CreditCard className="w-5 h-5"/> {getPaymentMethodInfo()}</p>
                    <Badge variant={paymentDetails.status_pagamento === 'Pendente' ? 'destructive' : 'default'} className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {paymentDetails.status_pagamento}
                    </Badge>
                </div>
                 <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800">Tipo de Pedido</h4>
                    <p className="flex items-center gap-2 text-gray-600">{getOrderTypeInfo().icon} {getOrderTypeInfo().text}</p>
                    {orderType === 'delivery' && address && (
                         <div className="text-xs text-gray-500 pl-7">
                            <p>{`${address.street}, ${address.number}`}</p>
                            <p>{`${address.neighborhood}, ${address.city}`}</p>
                         </div>
                    )}
                 </div>
            </div>

          </CardContent>
          <CardFooter className="bg-gray-50 p-6 flex flex-col sm:flex-row gap-4">
              <Link to="/menu" className="w-full">
                <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Voltar ao Início
                </Button>
              </Link>
              <Button onClick={handlePrint} className="w-full">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir Comprovante
              </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;