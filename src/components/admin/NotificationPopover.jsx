import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell, ShoppingBag, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const notifications = [
  {
    icon: <ShoppingBag className="w-5 h-5 text-blue-500" />,
    title: 'Novo pedido (#083) recebido.',
    time: '5 min atrás',
  },
  {
    icon: <Truck className="w-5 h-5 text-orange-500" />,
    title: 'O entregador Carlos Oliveira iniciou uma nova entrega.',
    time: '15 min atrás',
  },
  {
    icon: <CreditCard className="w-5 h-5 text-red-500" />,
    title: 'Seu plano semestral será renovado em 7 dias.',
    time: '1 dia atrás',
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: 'O pedido #079 foi concluído.',
    time: '2 dias atrás',
  }
];

const NotificationPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
            variant="outline" 
            className="flex-1 sm:flex-none relative"
        >
            <Bell className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Notificações</span>
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white border-2 border-white">{notifications.length}</Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
            <h3 className="text-lg font-medium">Notificações</h3>
        </div>
        <div className="p-2 max-h-80 overflow-y-auto">
            {notifications.map((notification, index) => (
                <div key={index} className="flex items-start gap-4 p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon}
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm text-gray-800">{notification.title}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="p-2 border-t text-center">
            <Button variant="link" size="sm" className="text-orange-600">
                Ver todas as notificações
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;