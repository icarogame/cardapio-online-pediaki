
import React from 'react';
import { motion } from 'framer-motion';

const POSProductGrid = ({ items, onProductClick, cart }) => {
  
  const getCartItemQuantity = (itemId) => {
    return cart
      .filter(item => item.id === itemId)
      .reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-full pr-2">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="relative"
        >
          <button
            className="w-full h-32 sm:h-40 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 overflow-hidden flex flex-col"
            onClick={() => onProductClick(item)}
          >
            <img  
              class="w-full h-2/3 object-cover" 
              alt={item.name}
             src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
            <div className="flex-grow p-2 flex flex-col justify-center items-center text-center">
              <h3 className="font-bold text-sm text-gray-800 line-clamp-2">{item.name}</h3>
              <p className="text-xs text-orange-600 font-semibold">R$ {item.price.toFixed(2)}</p>
            </div>
          </button>
          {getCartItemQuantity(item.id) > 0 && (
            <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
              {getCartItemQuantity(item.id)}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default POSProductGrid;
