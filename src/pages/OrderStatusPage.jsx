
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrderStatusPage = () => {
  const { orderId } = useParams();

  const statusSteps = [
    { name: 'Confirmado', icon: CheckCircle, time: '10:30' },
    { name: 'Preparando', icon: ChefHat, time: '10:32' },
    { name: 'Saiu para Entrega', icon: Truck, time: '10:55' },
    { name: 'Entregue', icon: Home, time: '11:15' },
  ];

  const currentStatusIndex = 2; // Simulação: "Saiu para Entrega"

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Acompanhe seu Pedido</CardTitle>
          <p className="text-gray-500">Pedido #{orderId}</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full"></div>
            {statusSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center mb-12 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`flex-1 text-right pr-8 ${index > currentStatusIndex ? 'text-gray-400' : 'text-gray-800'}`}>
                  <p className="font-bold">{step.name}</p>
                  <p className="text-sm">{index <= currentStatusIndex ? step.time : '--:--'}</p>
                </div>
                <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${index <= currentStatusIndex ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500'}`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 pl-8"></div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center border-t pt-6">
            <p className="font-semibold text-lg">Estimativa de Entrega: 11:15 - 11:25</p>
            <p className="text-gray-600 mt-2">Seu pedido está a caminho! O entregador João está levando seu pedido.</p>
            <Button asChild className="mt-6 gradient-orange text-white">
              <Link to="/menu">Fazer Novo Pedido</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderStatusPage;
