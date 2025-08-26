import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Calendar, DollarSign, Repeat, Circle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/components/ui/use-toast';

const getStatusVariant = (status) => {
  switch (status) {
    case 'Entregue':
      return 'bg-green-100 text-green-800';
    case 'Cancelado':
      return 'bg-red-100 text-red-800';
    case 'Em Andamento':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const PaymentStatusIcon = ({ status }) => {
  switch (status) {
    case 'Confirmado':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'Recusado':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'Pendente':
    default:
      return <Circle className="w-4 h-4 text-yellow-500" />;
  }
};

const OrderHistoryCard = ({ order }) => {
  const navigate = useNavigate();
  const { reorderItems } = useCart();
  const { toast } = useToast();

  const handleReorder = () => {
    reorderItems(order.items);
    toast({
      title: "Itens adicionados ao carrinho! 🛒",
      description: "Seu pedido anterior está pronto para ser finalizado novamente.",
    });
    navigate('/menu', { state: { openCart: true } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
          <Badge className={getStatusVariant(order.status)}>{order.status}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{order.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <PaymentStatusIcon status={order.status_pagamento} />
              <span>{order.status_pagamento}</span>
            </div>
          </div>
          <div className="border-t border-b py-3 space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end font-bold text-lg">
            <DollarSign className="w-5 h-5 mr-1 text-orange-500" />
            <span>Total: R$ {order.total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full gradient-orange text-white" onClick={handleReorder}>
            <Repeat className="w-4 h-4 mr-2" />
            Pedir Novamente
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default OrderHistoryCard;