
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  DollarSign,
  ShoppingBag,
  BarChart3 as TicketIcon,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const statsCards = [
  {
    title: 'Faturamento Total (Hoje)',
    value: 'R$ 1.854,30',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'Total de Pedidos',
    value: '82',
    icon: ShoppingBag,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Ticket Médio',
    value: 'R$ 22,61',
    icon: TicketIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

const salesData = [
  { name: 'Seg', faturamento: 1200 },
  { name: 'Ter', faturamento: 1900 },
  { name: 'Qua', faturamento: 1500 },
  { name: 'Qui', faturamento: 2100 },
  { name: 'Sex', faturamento: 2800 },
  { name: 'Sáb', faturamento: 3500 },
  { name: 'Dom', faturamento: 3200 },
];

const recentOrders = [
    { id: '#082', customer: 'Carlos Pereira', items: '2x Açaí 500ml, 1x Suco', total: 'R$ 55,00', status: 'Preparando', time: '19:45' },
    { id: '#081', customer: 'Juliana Lima', items: '1x Açaí 300ml', total: 'R$ 18,00', status: 'Pronto p/ Entrega', time: '19:42' },
    { id: '#080', customer: 'Ricardo Alves', items: 'Combo Casal', total: 'R$ 75,50', status: 'Entregue', time: '19:30' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Preparando':
      return 'bg-yellow-100 text-yellow-800';
    case 'Pronto p/ Entrega':
      return 'bg-blue-100 text-blue-800';
    case 'Entregue':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const DashboardTab = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4 sm:p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Faturamento dos Últimos 7 Dias</CardTitle>
              <CardDescription>Visualize o desempenho de vendas da semana.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `R$${value/1000}k`} tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(251, 146, 60, 0.1)' }}
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}
                      labelStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                      formatter={(value) => [`R$ ${value.toFixed(2).replace('.', ',')}`, "Faturamento"]}
                    />
                    <Legend wrapperStyle={{fontSize: "14px"}}/>
                    <Bar dataKey="faturamento" fill="#fb923c" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Pedidos Recentes
                <Badge className="gradient-orange text-white">
                  {recentOrders.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{order.id}</span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {order.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-xs text-gray-500 truncate">{order.items}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-orange-600">{order.total}</span>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button 
                className="w-full mt-4" 
                variant="outline"
                onClick={() => setActiveTab('orders')}
              >
                Ver Todos os Pedidos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
