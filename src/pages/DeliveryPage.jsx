import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  CheckCircle,
  Package,
  Truck,
  DollarSign,
  Route
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import DeliveryOrderList from '@/components/delivery/DeliveryOrderList';
import DeliveryDetails from '@/components/delivery/DeliveryDetails';
import DeliveryQuickActions from '@/components/delivery/DeliveryQuickActions';

const deliveryOrdersData = [
  {
    id: '#D001',
    customer: 'Maria Silva',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 99999-1234',
    items: ['Hambúrguer Artesanal', 'Batata Frita', 'Refrigerante'],
    total: 'R$ 45,90',
    status: 'Pronto para Entrega',
    estimatedTime: '25 min',
    distance: '2.3 km',
    priority: 'normal',
    orderTime: '14:30',
    notes: 'Apartamento 205, interfone 25'
  },
  {
    id: '#D002',
    customer: 'João Santos',
    address: 'Av. Principal, 456 - Jardim América',
    phone: '(11) 98888-5678',
    items: ['Pizza Margherita', 'Suco de Laranja'],
    total: 'R$ 43,50',
    status: 'Em Rota',
    estimatedTime: '15 min',
    distance: '1.8 km',
    priority: 'urgent',
    orderTime: '14:15',
    notes: 'Casa azul, portão preto'
  },
  {
    id: '#D003',
    customer: 'Ana Costa',
    address: 'Rua do Comércio, 789 - Vila Nova',
    phone: '(11) 97777-9012',
    items: ['Salada Caesar', 'Brownie', 'Água'],
    total: 'R$ 38,40',
    status: 'Aguardando',
    estimatedTime: '30 min',
    distance: '3.1 km',
    priority: 'normal',
    orderTime: '14:45',
    notes: 'Empresa - recepção'
  }
];

const deliveryStats = [
  { title: 'Entregas Hoje', value: '12', icon: Package, color: 'text-blue-600' },
  { title: 'Em Rota', value: '3', icon: Truck, color: 'text-orange-600' },
  { title: 'Tempo Médio', value: '22 min', icon: Clock, color: 'text-green-600' },
  { title: 'Faturamento', value: 'R$ 487,30', icon: DollarSign, color: 'text-purple-600' }
];

const DeliveryPage = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState(deliveryOrdersData[0]);

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
      duration: 3000,
    });
  };

  return (
    <>
      <div className="bg-white shadow-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Central de Delivery</h1>
              <p className="text-gray-600">Gestão de entregas e rotas otimizadas</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Entregador</p>
                <p className="font-medium">Carlos Oliveira</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Disponível
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {deliveryStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-2 rounded-full bg-gray-100 ${stat.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Pedidos para Entrega</h2>
              <Button 
                variant="outline"
                onClick={() => handleFeatureClick('optimize-route')}
              >
                <Route className="w-4 h-4 mr-2" />
                Otimizar Rota
              </Button>
            </div>
            <DeliveryOrderList 
              orders={deliveryOrdersData}
              selectedOrder={selectedOrder}
              onSelectOrder={setSelectedOrder}
            />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Mapa de Entregas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center px-4">
                    <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Mapa interativo será exibido aqui</p>
                    <Button 
                      className="gradient-orange text-white border-0"
                      onClick={() => handleFeatureClick('map')}
                    >
                      Abrir Mapa Completo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {selectedOrder && <DeliveryDetails order={selectedOrder} />}
            <DeliveryQuickActions />
          </div>
        </div>
      </main>
    </>
  );
};

export default DeliveryPage;