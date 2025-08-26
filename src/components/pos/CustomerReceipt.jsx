import React, { forwardRef } from 'react';
import { format } from 'date-fns';

const CustomerReceipt = forwardRef(({ cart, deliveryInfo, orderNumber, companyInfo }, ref) => {
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

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = calculateItemPrice(item);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const getTotalPrice = () => {
    const subtotal = getSubtotal();
    const deliveryFee = deliveryInfo?.fee || 0;
    return subtotal + deliveryFee;
  };

  const formatCustomizations = (customizations) => {
    const parts = [];
    for (const key in customizations) {
      const value = customizations[key];
      if (Array.isArray(value) && value.length > 0) {
        value.forEach(v => parts.push(`- ${v.name} ${v.price > 0 ? `(+R$${v.price.toFixed(2)})` : ''}`));
      } else if (value && value.name) {
        parts.push(`- ${value.name} ${value.price > 0 ? `(+R$${value.price.toFixed(2)})` : ''}`);
      }
    }
    return parts;
  };

  return (
    <div ref={ref} className="p-4 bg-white text-black font-mono" style={{ width: '280px' }}>
      <div className="text-center mb-4">
        <h1 className="text-lg font-bold">{companyInfo.name}</h1>
        <p className="text-xs">{companyInfo.address}</p>
        <p className="text-xs">Tel: {companyInfo.phone}</p>
        <h2 className="text-md font-bold mt-2">VIA DO CLIENTE</h2>
        <p className="text-sm">Pedido: #{orderNumber}</p>
        <p className="text-xs">{format(new Date(), "dd/MM/yyyy 'às' HH:mm")}</p>
      </div>

      <div className="border-t border-b border-dashed border-black py-2 my-2">
        {cart.map((item) => (
          <div key={item.cartItemId} className="mb-2 text-sm">
            <div className="flex justify-between">
              <span className="font-bold">{item.quantity}x {item.name}</span>
              <span className="font-bold">R$ {(calculateItemPrice(item) * item.quantity).toFixed(2)}</span>
            </div>
            {formatCustomizations(item.customizations).length > 0 && (
              <div className="pl-2 text-xs">
                {formatCustomizations(item.customizations).map((cust, index) => (
                  <p key={index}>{cust}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>R$ {getSubtotal().toFixed(2)}</span>
        </div>
        {deliveryInfo && (
          <div className="flex justify-between">
            <span>Taxa de Entrega:</span>
            <span>R$ {deliveryInfo.fee.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-md border-t border-dashed pt-1 mt-1">
          <span>TOTAL:</span>
          <span>R$ {getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 text-center text-xs">
        <p>Obrigado pela preferência!</p>
        <p>Volte sempre!</p>
      </div>
    </div>
  );
});

CustomerReceipt.displayName = "CustomerReceipt";

export default CustomerReceipt;