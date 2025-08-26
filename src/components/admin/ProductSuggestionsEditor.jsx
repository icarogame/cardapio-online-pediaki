
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Check, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProductSuggestionsEditor = ({ allProducts, suggestions, setSuggestions }) => {
  const suggestedProductIds = new Set(suggestions.map(p => p.id));
  const availableProducts = allProducts.filter(p => !suggestedProductIds.has(p.id));

  const handleSelect = (product) => {
    setSuggestions([...suggestions, product]);
  };

  const handleRemove = (productId) => {
    setSuggestions(suggestions.filter(p => p.id !== productId));
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Sugestões (Compre Junto)</Label>
      <p className="text-sm text-muted-foreground">
        Selecione outros produtos do seu cardápio para sugerir a compra conjunta.
      </p>

      <div className="space-y-2">
        <Label>Produtos sugeridos:</Label>
        <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
          {suggestions.length > 0 ? suggestions.map(product => (
            <Badge key={product.id} variant="secondary" className="pl-2 pr-1 text-sm">
              {product.name}
              <button onClick={() => handleRemove(product.id)} className="ml-1 rounded-full hover:bg-red-200/50 p-0.5">
                  <XCircle className="h-3.5 w-3.5 text-red-500"/>
              </button>
            </Badge>
          )) : <p className="text-sm text-muted-foreground px-2">Nenhuma sugestão adicionada.</p>}
        </div>
      </div>

      <Command className="rounded-lg border shadow-sm">
        <CommandInput placeholder="Buscar produto para adicionar..." />
        <CommandList className="max-h-48">
          {availableProducts.map((product) => (
            <CommandItem
              key={product.id}
              onSelect={() => handleSelect(product)}
              className="flex justify-between items-center cursor-pointer"
            >
              <div className="flex items-center gap-2">
                 <img src={product.imageUrl || "https://images.unsplash.com/photo-1697862040431-f149c8e1ac9d"} alt={product.name} className="h-8 w-8 rounded-sm object-cover" />
                 <span>{product.name}</span>
              </div>
              <Badge variant="outline">R$ {product.price.toFixed(2)}</Badge>
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default ProductSuggestionsEditor;
