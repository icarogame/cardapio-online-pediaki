
import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, UserCircle, CheckCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DeliveryTaskCard from '@/components/delivery/DeliveryTaskCard.jsx';
import { deliveryTasks } from '@/data/deliveryData.js';

const DeliveryPersonPage = () => {

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6 pb-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <UserCircle className="w-12 h-12 text-gray-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-50"></div>
            </div>
            <div>
              <p className="font-bold text-lg text-gray-800">Carlos Oliveira</p>
              <p className="text-sm text-gray-500">Entregador</p>
            </div>
          </div>
          <Link to="/login">
            <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-red-50 hover:text-red-600">
              <LogOut className="w-5 h-5" />
            </Button>
          </Link>
        </header>

        <motion.h1 
          className="text-2xl font-bold text-gray-900 mb-6 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Package className="w-7 h-7 mr-3 text-orange-500"/>
          Minhas Entregas
        </motion.h1>

        {deliveryTasks.length > 0 ? (
          <div className="space-y-4">
            {deliveryTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/delivery-person/${task.id}`} state={{ order: task }}>
                    <DeliveryTaskCard task={task} />
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-16 px-6 bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Tudo certo por aqui!</h2>
            <p className="text-gray-600 mt-2">Nenhuma entrega pendente no momento. Bom descanso!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPersonPage;
