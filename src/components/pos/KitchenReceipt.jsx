import React, { forwardRef } from 'react';
import { format } from 'date-fns';

const KitchenReceipt = forwardRef(({ cart, deliveryInfo, orderNumber }, ref) => {
  const calculateItemPrice = (item) => {
    let total = item.price;
    if (item.customizations) {
      Object.values(item.customizations).forEach(section => {
        if (Array.isArray(section)) { 
          section.forEach(opt => {
            if (opt.price) total += opt.price;
          });
        } else if (section && section.price) { 
          total += section.price;
        }
      });
    }
    return total;
  };

  const formatCustomizations = (customizations) => {
    const parts = [];
    for (const key in customizations) {
      const value = customizations[key];
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(v => parts.push(`- ${v.name}`));
      } else if (value && value.name) {
        parts.push(`- ${value.name}`);
      }
    }
    return parts;
  };

  return (
    <div ref={ref} className="p-4 bg-white text-black font-mono" style={{ width: '280px' }}>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">COMANDA COZINHA</h2>
        <p className="text-sm">Pedido: #{orderNumber}</p>
        <p className="text-xs">{format(new Date(), "dd/MM/yyyy 'às' HH:mm")}</p>
      </div>

      <div className="border-t border-b border-dashed border-black py-2 my-2">
        {cart.map((item) => (
          <div key={item.cartItemId} className="mb-2">
            <p className="font-bold text-lg">{item.quantity}x {item.name}</p>
            {formatCustomizations(item.customizations).length > 0 && (
              <div className="pl-4 text-sm">
                {formatCustomizations(item.customizations).map((cust, index) => (
                  <p key={index}>{cust}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-2">
        {deliveryInfo ? (
            <>
                <p><span className="font-bold">Cliente:</span> {deliveryInfo.customerName}</p>
                <p><span className="font-bold">Entrega:</span> {deliveryInfo.driver}</p>
            </>
        ) : (
            <p className="font-bold text-lg">PEDIDO BALCÃO</p>
        )}
      </div>
    </div>
  );
});

KitchenReceipt.displayName = "KitchenReceipt";

export default KitchenReceipt;