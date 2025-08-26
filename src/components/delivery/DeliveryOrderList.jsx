import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation2, 
  CheckCircle,
  Package,
  Truck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const getStatusColor = (status) => {
  switch (status) {
    case 'Pronto para Entrega': return 'bg-yellow-100 text-yellow-800';
    case 'Em Rota': return 'bg-blue-100 text-blue-800';
    case 'Entregue': return 'bg-green-100 text-green-800';
    case 'Aguardando': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'urgent': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const DeliveryOrderList = ({ orders, selectedOrder, onSelectOrder }) => {
  const { toast } = useToast();

  const handleActionClick = (e, message, feature) => {
    e.stopPropagation();
    if (feature) {
      toast({
        title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
        duration: 3000,
      });
    } else {
      toast({
        title: message,
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedOrder?.id === order.id ? 'ring-2 ring-orange-500' : ''
            }`}
            onClick={() => onSelectOrder(order)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 gradient-orange rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{order.id}</h3>
                    <p className="text-gray-600">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  {order.priority === 'urgent' && (
                    <Badge className={`ml-2 ${getPriorityColor(order.priority)}`}>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Urgente
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <p className="flex items-center text-sm text-gray-600"><MapPin className="w-4 h-4 mr-2" />{order.address}</p>
                  <p className="flex items-center text-sm text-gray-600"><Phone className="w-4 h-4 mr-2" />{order.phone}</p>
                  <p className="flex items-center text-sm text-gray-600"><Clock className="w-4 h-4 mr-2" />Pedido às {order.orderTime}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Distância:</span><span className="font-medium">{order.distance}</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Tempo estimado:</span><span className="font-medium">{order.estimatedTime}</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Total:</span><span className="font-bold text-orange-600">{order.total}</span></div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Itens:</p>
                <p className="text-sm text-gray-600">{order.items.join(', ')}</p>
              </div>

              {order.notes && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800 mb-1">Observações:</p>
                  <p className="text-sm text-yellow-700">{order.notes}</p>
                </div>
              )}

              <div className="flex space-x-3">
                {order.status === 'Pronto para Entrega' && (
                  <Button className="flex-1 gradient-orange text-white border-0" onClick={(e) => handleActionClick(e, `Entrega ${order.id} iniciada! 🚚`)}>
                    <Truck className="w-4 h-4 mr-2" /> Iniciar Entrega
                  </Button>
                )}
                {order.status === 'Em Rota' && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={(e) => handleActionClick(e, null, true)}>
                    <CheckCircle className="w-4 h-4 mr-2" /> Confirmar Entrega
                  </Button>
                )}
                <Button variant="outline" onClick={(e) => handleActionClick(e, null, true)}>
                  <Navigation2 className="w-4 h-4 mr-2" /> Navegar
                </Button>
                <Button variant="outline" onClick={(e) => handleActionClick(e, null, true)}>
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DeliveryOrderList;