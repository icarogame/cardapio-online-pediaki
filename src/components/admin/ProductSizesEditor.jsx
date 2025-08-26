
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2 } from 'lucide-react';

const ProductSizesEditor = ({ sizes, setSizes }) => {
  const handleAddSize = () => {
    setSizes([...sizes, { id: `new_${Date.now()}`, name: '', price: '' }]);
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const handleRemoveSize = (index) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Tamanhos e Preços</Label>
      <p className="text-sm text-muted-foreground">
        Adicione diferentes tamanhos para este produto. Se não houver tamanhos, o preço principal será usado.
      </p>
      <div className="space-y-4">
        {sizes.map((size, index) => (
          <div key={size.id || index} className="flex items-end gap-2 p-2 border rounded-md bg-gray-50/50">
            <div className="grid grid-cols-2 gap-2 flex-grow">
                <div className="space-y-1">
                    <Label htmlFor={`size-name-${index}`} className="text-xs">Nome do Tamanho</Label>
                    <Input
                        id={`size-name-${index}`}
                        value={size.name}
                        onChange={(e) => handleSizeChange(index, 'name', e.target.value)}
                        placeholder="Ex: 500ml"
                    />
                </div>
                 <div className="space-y-1">
                    <Label htmlFor={`size-price-${index}`} className="text-xs">Preço (R$)</Label>
                    <Input
                        id={`size-price-${index}`}
                        type="number"
                        value={size.price}
                        onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                        placeholder="Ex: 25.90"
                    />
                 </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSize(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button type="button" variant="outline" onClick={handleAddSize} className="mt-2">
        <PlusCircle className="mr-2 h-4 w-4" />
        Adicionar Tamanho
      </Button>
    </div>
  );
};

export default ProductSizesEditor;
