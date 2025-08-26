
import React from 'react';
import { MapPin, DollarSign, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const getStatusBadge = (status) => {
    switch (status) {
      case 'Nova':
        return 'bg-blue-100 text-blue-800';
      case 'A caminho':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
}

const DeliveryTaskCard = ({ task }) => {
    return (
        <Card className="shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-orange-400">
            <CardHeader className="flex flex-row items-center justify-between bg-white p-4">
                <CardTitle className="text-base font-bold flex items-center">
                    <Package className="w-5 h-5 mr-3 text-orange-500" />
                    Pedido {task.id}
                </CardTitle>
                <Badge className={getStatusBadge(task.status)}>{task.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3 p-4 bg-gray-50/50">
                <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-1 text-gray-500 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{task.address}</p>
                </div>
                <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <p className="text-gray-700">Valor a cobrar: <span className="font-bold text-gray-900">{task.amount}</span></p>
                </div>
            </CardContent>
        </Card>
    )
}

export default DeliveryTaskCard;
