import React, { forwardRef } from 'react';
import { format } from 'date-fns';

const CounterReceipt = forwardRef(({ cart, deliveryInfo, orderNumber }, ref) => {
  const getTotalPrice = () => {
    const subtotal = cart.reduce((total, item) => {
      let itemPrice = item.price;
      if (item.customizations) {
        Object.values(item.customizations).forEach(section => {
          if (Array.isArray(section)) {
            section.forEach(opt => { if (opt.price) itemPrice += opt.price; });
          } else if (section && section.price) {
            itemPrice += section.price;
          }
        });
      }
      return total + (itemPrice * item.quantity);
    }, 0);
    const deliveryFee = deliveryInfo?.fee || 0;
    return subtotal + deliveryFee;
  };

  return (
    <div ref={ref} className="p-4 bg-white text-black font-mono" style={{ width: '280px' }}>
      <div className="text-center mb-2">
        <h2 className="text-lg font-bold">VIA DO BALCÃO</h2>
        <p className="text-sm">Pedido: #{orderNumber}</p>
        <p className="text-xs">{format(new Date(), "dd/MM/yyyy 'às' HH:mm")}</p>
      </div>

      <div className="border-t border-b border-dashed border-black py-2 my-2">
        {cart.map((item) => (
          <div key={item.cartItemId} className="flex justify-between text-sm">
            <span>{item.quantity}x {item.name}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-2">
        {deliveryInfo ? (
            <>
                <p className="text-sm"><span className="font-bold">Cliente:</span> {deliveryInfo.customerName}</p>
                <p className="text-sm"><span className="font-bold">Entrega:</span> {deliveryInfo.driver}</p>
            </>
        ) : (
            <p className="font-bold text-md">PEDIDO BALCÃO</p>
        )}
      </div>

      <div className="mt-2 pt-2 border-t border-dashed">
        <div className="flex justify-between font-bold text-lg">
            <span>TOTAL:</span>
            <span>R$ {getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
});

CounterReceipt.displayName = "CounterReceipt";

export default CounterReceipt;