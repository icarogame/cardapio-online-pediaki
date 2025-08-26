
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Building, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

const orderTypes = [
  { id: 'delivery', label: 'Entrega', icon: Truck },
  { id: 'pickup', label: 'Retirar no Balcão', icon: Building },
  { id: 'dine-in', label: 'Comer no Local', icon: UtensilsCrossed },
];

const OrderTypeSelection = ({ orderType, setOrderType }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {orderTypes.map(type => {
        const isActive = orderType === type.id;
        const Icon = type.icon;
        return (
          <div
            key={type.id}
            onClick={() => setOrderType(type.id)}
            className={cn(
              'relative rounded-lg border p-4 flex items-center space-x-3 cursor-pointer transition-all duration-200',
              isActive ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500' : 'border-gray-300 bg-white hover:border-gray-400'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeOrderType"
                className="absolute inset-0 bg-orange-100 rounded-md z-0"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <div className="relative z-10 flex items-center space-x-3">
              <Icon className={cn('w-6 h-6', isActive ? 'text-orange-600' : 'text-gray-500')} />
              <span className={cn('font-semibold', isActive ? 'text-orange-700' : 'text-gray-700')}>{type.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTypeSelection;
