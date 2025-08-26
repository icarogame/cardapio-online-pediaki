
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Trash2 } from 'lucide-react';

const CheckoutSummary = ({ cart, deleteFromCart, calculateItemPrice }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShoppingBag className="w-5 h-5 mr-2" />
          Seu Pedido
        </CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.cartItemId} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                <span className="font-bold text-orange-600">{item.quantity}x</span>
                <div className="flex-grow">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {Object.values(item.customizations)
                      .flat()
                      .filter(Boolean)
                      .map(c => c.name)
                      .join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {calculateItemPrice(item).toFixed(2)}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => deleteFromCart(item.cartItemId)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckoutSummary;
