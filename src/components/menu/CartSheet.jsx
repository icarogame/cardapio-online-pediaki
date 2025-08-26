
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const CartSheet = ({ isOpen, onOpenChange }) => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, deleteFromCart, getTotalPrice, totalCartItems, calculateItemPrice } = useCart();

  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center text-xl">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Seu Pedido
          </SheetTitle>
        </SheetHeader>

        <div className="flex-grow overflow-y-auto pr-4 -mr-4 mt-4">
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500 h-full flex flex-col justify-center items-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="font-semibold">Seu carrinho está vazio</p>
              <p className="text-sm">Adicione itens do cardápio para começar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const itemPrice = calculateItemPrice(item);
                return (
                  <div key={item.cartItemId} className="flex gap-4 py-2 border-b">
                    <img 
                      className="w-16 h-16 rounded-md object-cover"
                      alt={item.name}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                    <div className="flex-grow">
                      <h4 className="font-medium text-base">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        {Object.values(item.customizations)
                          .flat()
                          .filter(Boolean)
                          .map(c => c.name)
                          .join(', ')}
                      </p>
                      <p className="font-semibold text-orange-600 mt-1">R$ {itemPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-gray-500 hover:text-red-500"
                        onClick={() => deleteFromCart(item.cartItemId)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="w-7 h-7"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-6 text-center font-bold">{item.quantity}</span>
                        <Button
                          size="icon"
                          onClick={() => addToCart(item, 1, item.customizations)}
                          className="w-7 h-7 gradient-orange text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <SheetFooter className="mt-auto border-t pt-6">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-2xl text-orange-600">R$ {getTotalPrice().toFixed(2)}</span>
              </div>
              <Button 
                className="w-full gradient-orange text-white border-0 hover:opacity-90"
                size="lg"
                onClick={handleCheckout}
              >
                Finalizar Pedido
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
