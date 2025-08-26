import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { toast } = useToast();

  const addToCart = (item, quantity = 1, customizations = {}) => {
    const cartItemId = `${item.id}-${JSON.stringify(customizations)}`;

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.cartItemId === cartItemId);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.cartItemId === cartItemId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity, customizations, cartItemId }];
      }
    });
  };

  const showToastAfterAddToCart = (item) => {
     toast({
      title: "Item adicionado ao carrinho! 🛒",
      description: `${item.name} foi adicionado com sucesso.`,
      duration: 2000,
    });
  }

  const removeFromCart = (cartItemId) => {
    const existingItem = cart.find(cartItem => cartItem.cartItemId === cartItemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.cartItemId === cartItemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.cartItemId !== cartItemId));
    }
  };

  const deleteFromCart = (cartItemId) => {
    setCart(cart.filter(cartItem => cartItem.cartItemId !== cartItemId));
  };
  
  const getCartItemQuantity = (itemId) => {
    return cart
      .filter(item => item.id === itemId)
      .reduce((total, item) => total + item.quantity, 0);
  };
  
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

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = calculateItemPrice(item);
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const reorderItems = (itemsToReorder) => {
    itemsToReorder.forEach(item => {
      addToCart(item, item.quantity, item.customizations);
    });
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cart,
    setCart,
    addToCart: (item, quantity, customizations) => {
      addToCart(item, quantity, customizations);
      showToastAfterAddToCart(item);
    },
    removeFromCart,
    deleteFromCart,
    getCartItemQuantity,
    getTotalPrice,
    calculateItemPrice,
    totalCartItems,
    reorderItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};