
import React from 'react';
import { ShoppingCart, Plus, Minus, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const POSCart = ({ cart, onIncrement, onDecrement, deliveryInfo }) => {
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
  }

  const formatCustomizations = (customizations) => {
    const parts = [];
    for (const key in customizations) {
      const value = customizations[key];
      if (Array.isArray(value)) {
        value.forEach(v => parts.push(v.name));
      } else if (value && value.name) {
        parts.push(value.name);
      }
    }
    return parts.join(', ');
  };

  return (
    <Card className="flex flex-col flex-grow shadow-none border-0">
      <CardHeader className="pb-3 flex-shrink-0 px-0">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Pedido Atual
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto px-0">
        {cart.length === 0 ? (
          <div className="text-center py-8 text-gray-500 h-full flex flex-col justify-center items-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="font-semibold">Nenhum item no pedido</p>
            <p className="text-sm">Clique nos produtos para adicionar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.cartItemId} className="flex items-start justify-between py-2 border-b last:border-b-0">
                <div className="flex-1 pr-2">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    {formatCustomizations(item.customizations)}
                  </p>
                  <p className="text-sm font-semibold text-orange-600 mt-1">
                    R$ {calculateItemPrice(item).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => onDecrement(item.cartItemId)}
                    className="w-7 h-7"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <Button
                    size="icon"
                    onClick={() => onIncrement(item.cartItemId)}
                    className="w-7 h-7 gradient-orange text-white border-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {cart.length > 0 && (
        <div className="pt-4 border-t mt-auto flex-shrink-0 px-0">
          <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-sm">
                  <span>Subtotal:</span>
                  <span>R$ {getSubtotal().toFixed(2)}</span>
              </div>
              {deliveryInfo && (
                  <div className="flex justify-between items-center text-sm text-blue-600">
                      <span className="flex items-center"><Bike className="w-4 h-4 mr-2" /> Entrega ({deliveryInfo.driver}):</span>
                      <span>+ R$ {deliveryInfo.fee.toFixed(2)}</span>
                  </div>
              )}
          </div>
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-2xl text-orange-600">
              R$ {getTotalPrice().toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};

export default POSCart;
