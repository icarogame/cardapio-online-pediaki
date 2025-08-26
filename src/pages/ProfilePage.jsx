import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ChevronLeft, ShoppingBag, ChefHat } from 'lucide-react';
import OrderHistoryCard from '@/components/profile/OrderHistoryCard';
import AddressManager from '@/components/profile/AddressManager';
import { Button } from '@/components/ui/button';

const mockOrders = [
  {
    id: '7B3C9',
    date: '20 de Agosto, 2025',
    total: 55.50,
    status: 'Entregue',
    metodo_pagamento: 'cartao_entrega',
    bandeira_cartao: 'Visa',
    tipo_cartao: 'crédito',
    comprovante_pix_url: null,
    status_pagamento: 'Confirmado',
    items: [
      { id: 1, name: 'Açaí Tradicional 500ml', quantity: 1, price: 25.00, customizations: {} },
      { id: 2, name: 'Açaí com Morango 500ml', quantity: 1, price: 27.50, customizations: {} },
      { id: 10, name: 'Água Mineral', quantity: 1, price: 3.00, customizations: {} },
    ],
  },
  {
    id: 'A2D8E',
    date: '15 de Agosto, 2025',
    total: 75.50,
    status: 'Entregue',
    metodo_pagamento: 'pix',
    bandeira_cartao: null,
    tipo_cartao: null,
    comprovante_pix_url: 'https://example.com/comprovante.jpg',
    status_pagamento: 'Confirmado',
    items: [
      { id: 5, name: 'Combo Casal', quantity: 1, price: 75.50, customizations: {} },
    ],
  },
  {
    id: 'F4G1H',
    date: '10 de Agosto, 2025',
    total: 21.00,
    status: 'Cancelado',
    metodo_pagamento: 'dinheiro',
    bandeira_cartao: null,
    tipo_cartao: null,
    comprovante_pix_url: null,
    status_pagamento: 'Pendente',
    items: [
      { id: 3, name: 'Açaí com Cupuaçu 300ml', quantity: 1, price: 18.00, customizations: {} },
      { id: 10, name: 'Água Mineral', quantity: 1, price: 3.00, customizations: {} },
    ],
  },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/menu" className="flex items-center space-x-2 text-gray-600 hover:text-orange-600">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Voltar ao Cardápio</span>
            </Link>
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="w-24 h-24 rounded-full gradient-orange flex items-center justify-center mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Olá, Cliente!</h1>
          <p className="text-gray-600">Bem-vindo(a) ao seu perfil.</p>
        </motion.div>

        <div className="space-y-12">
          <AddressManager />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <ShoppingBag className="w-6 h-6 mr-3 text-orange-500" />
              Meus Pedidos
            </h2>
            {mockOrders.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {mockOrders.map((order) => (
                  <OrderHistoryCard key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">Nenhum pedido encontrado</h3>
                <p className="text-gray-500 mt-2">Você ainda não fez nenhum pedido. Que tal começar agora?</p>
                <Link to="/menu">
                  <Button className="mt-6 gradient-orange text-white">
                    Ver Cardápio
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;