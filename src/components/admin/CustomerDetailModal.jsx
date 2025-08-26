import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, DollarSign, ShoppingBag, Star, MapPin } from 'lucide-react';

const CustomerDetailModal = ({ isOpen, onOpenChange, customer }) => {
  if (!customer) return null;

  // Adicionando dados mockados para o histórico e endereços se não existirem
  const customerWithMocks = {
    ...customer,
    totalSpent: customer.totalSpent || 0,
    totalOrders: customer.totalOrders || (customer.orderHistory ? customer.orderHistory.length : 0),
    loyaltyPoints: customer.loyaltyPoints || 0,
    orderHistory: customer.orderHistory || [],
    addresses: customer.addresses || [],
    avatarUrl: customer.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random`,
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };

  const stats = [
    { title: 'Total Gasto', value: `R$ ${customerWithMocks.totalSpent.toFixed(2)}`, icon: DollarSign, color: 'text-green-500' },
    { title: 'Total de Pedidos', value: customerWithMocks.totalOrders, icon: ShoppingBag, color: 'text-blue-500' },
    { title: 'Pontos de Fidelidade', value: customerWithMocks.loyaltyPoints, icon: Star, color: 'text-yellow-500' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={customerWithMocks.avatarUrl} alt={customerWithMocks.name} />
              <AvatarFallback className="bg-orange-100 text-orange-500 text-xl font-bold">
                {getInitials(customerWithMocks.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">{customerWithMocks.name}</DialogTitle>
              <DialogDescription className="flex items-center text-gray-600 mt-1">
                <Mail className="w-4 h-4 mr-2" />
                {customerWithMocks.email}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="max-h-[70vh] overflow-y-auto px-6 pb-6 space-y-6">
          {/* Stats */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Estatísticas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Order History */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Histórico de Pedidos</h3>
            <div className="space-y-3">
              {customerWithMocks.orderHistory.length > 0 ? (
                customerWithMocks.orderHistory.map(order => (
                  <div key={order.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                    <div className="flex justify-between font-medium">
                      <p>Pedido #{order.id}</p>
                      <p>R$ {order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-gray-500 mt-1">
                      <p>{order.date}</p>
                      <p className={`font-semibold ${order.status === 'Entregue' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">Nenhum pedido encontrado.</p>
              )}
            </div>
          </section>

          {/* Saved Addresses */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Endereços Salvos</h3>
            <div className="space-y-3">
              {customerWithMocks.addresses.length > 0 ? (
                customerWithMocks.addresses.map((address, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg text-sm">
                    <MapPin className="w-5 h-5 mr-3 mt-1 text-orange-500 shrink-0" />
                    <div>
                      <p className="font-bold text-gray-800">{address.name}</p>
                      <p className="text-gray-600">{address.street}, {address.number}</p>
                      <p className="text-gray-500">{address.neighborhood}, {address.city}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">Nenhum endereço salvo.</p>
              )}
            </div>
          </section>
        </div>
        <div className="bg-gray-50 px-6 py-3 flex justify-end">
            <DialogClose asChild>
                <Button variant="outline">Fechar</Button>
            </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailModal;
