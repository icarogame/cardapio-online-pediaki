import React from 'react';
import { 
  MapPin, 
  Phone, 
  User,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DeliveryDetails = ({ order }) => {
  if (!order) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Pedido</CardTitle>
        <CardDescription>{order.id}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Cliente</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center"><User className="w-4 h-4 mr-2" />{order.customer}</p>
            <p className="flex items-center"><Phone className="w-4 h-4 mr-2" />{order.phone}</p>
            <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{order.address}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Itens do Pedido</h4>
          <div className="space-y-1">
            {order.items.map((item, index) => (
              <p key={index} className="text-sm text-gray-600">• {item}</p>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total:</span>
            <span className="text-xl font-bold text-orange-600">{order.total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryDetails;