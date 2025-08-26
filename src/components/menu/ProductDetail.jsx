import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const ProductDetail = ({ product, isOpen, onOpenChange, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState({});
  const [totalPrice, setTotalPrice] = useState(product?.price || 0);

  useEffect(() => {
    if (product) {
      const initialCustomizations = {};
      product.customization?.forEach(section => {
        if (section.type === 'radio' && section.required) {
          initialCustomizations[section.title] = section.options[0];
        } else {
          initialCustomizations[section.title] = section.type === 'radio' ? null : [];
        }
      });
      setCustomizations(initialCustomizations);
      setQuantity(1);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      let currentPrice = product.price;
      Object.values(customizations).forEach(section => {
        if (Array.isArray(section)) { // Checkboxes
          section.forEach(opt => {
            if (opt.price) currentPrice += opt.price;
          });
        } else if (section && section.price) { // Radio
          currentPrice += section.price;
        }
      });
      setTotalPrice(currentPrice * quantity);
    }
  }, [product, customizations, quantity]);

  if (!product) return null;

  const handleRadioChange = (sectionTitle, option) => {
    setCustomizations(prev => ({ ...prev, [sectionTitle]: option }));
  };

  const handleCheckboxChange = (sectionTitle, option, max) => {
    setCustomizations(prev => {
      const currentSelection = prev[sectionTitle] || [];
      const isSelected = currentSelection.some(item => item.name === option.name);
      let newSelection;
      if (isSelected) {
        newSelection = currentSelection.filter(item => item.name !== option.name);
      } else {
        if (max && currentSelection.length >= max) {
          // Optional: show a toast message
          return prev;
        }
        newSelection = [...currentSelection, option];
      }
      return { ...prev, [sectionTitle]: newSelection };
    });
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, customizations);
    }
    onOpenChange(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl w-[95vw] max-h-[90vh] flex flex-col p-0">
        <div className="sm:grid sm:grid-cols-2 flex-grow overflow-hidden">
          <div className="relative h-48 sm:h-full">
            <img 
              className="w-full h-full object-cover sm:rounded-l-lg"
              alt={product.name}
             src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
          </div>
          <div className="flex flex-col flex-grow overflow-hidden">
            <DialogHeader className="p-6 text-left flex-shrink-0">
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
              <DialogDescription>{product.description}</DialogDescription>
            </DialogHeader>

            <div className="p-6 pt-0 space-y-4 flex-grow overflow-y-auto">
              {product.customization?.map(section => (
                <div key={section.title}>
                  <h4 className="font-semibold mb-2">{section.title} {section.max && `(Max. ${section.max})`}</h4>
                  {section.type === 'radio' && (
                    <RadioGroup 
                      onValueChange={(value) => handleRadioChange(section.title, JSON.parse(value))} 
                      defaultValue={section.required ? JSON.stringify(section.options[0]) : null}
                    >
                      {section.options.map(opt => (
                        <div key={opt.name} className="flex items-center space-x-2">
                          <RadioGroupItem value={JSON.stringify(opt)} id={`${section.title}-${opt.name}`} />
                          <Label htmlFor={`${section.title}-${opt.name}`} className="flex-grow">{opt.name}</Label>
                          {opt.price > 0 && <span className="text-sm text-gray-500">+ R$ {opt.price.toFixed(2)}</span>}
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {section.type === 'checkbox' && (
                    <div className="space-y-2">
                      {section.options.map(opt => (
                        <div key={opt.name} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${section.title}-${opt.name}`}
                            onCheckedChange={() => handleCheckboxChange(section.title, opt, section.max)}
                            checked={customizations[section.title]?.some(item => item.name === opt.name)}
                          />
                          <Label htmlFor={`${section.title}-${opt.name}`} className="flex-grow">{opt.name}</Label>
                          {opt.price > 0 && <span className="text-sm text-gray-500">+ R$ {opt.price.toFixed(2)}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <DialogFooter className="p-6 bg-gray-50 border-t flex-col sm:flex-row gap-4 sm:justify-between flex-shrink-0">
              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                <span className="text-xl font-bold w-10 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)}>+</Button>
              </div>
              <Button onClick={handleAddToCartClick} size="lg" className="gradient-orange text-white w-full sm:w-auto">
                Adicionar por R$ {totalPrice.toFixed(2)}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;