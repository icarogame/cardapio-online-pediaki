
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Trash2, GripVertical, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

const ComplementItem = ({ item, groupIndex, itemIndex, handleComplementChange, handleRemoveComplement }) => (
  <div className="flex items-end gap-2 p-2 border rounded-md bg-white">
     <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
    <div className="grid grid-cols-2 gap-2 flex-grow">
      <div className="space-y-1">
        <Label htmlFor={`complement-name-${groupIndex}-${itemIndex}`} className="text-xs">Nome do Item</Label>
        <Input
          id={`complement-name-${groupIndex}-${itemIndex}`}
          value={item.name}
          onChange={(e) => handleComplementChange(groupIndex, itemIndex, 'name', e.target.value)}
          placeholder="Ex: Morango"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`complement-price-${groupIndex}-${itemIndex}`} className="text-xs">Preço Adicional (R$)</Label>
        <Input
          id={`complement-price-${groupIndex}-${itemIndex}`}
          type="number"
          value={item.price}
          onChange={(e) => handleComplementChange(groupIndex, itemIndex, 'price', e.target.value)}
          placeholder="Ex: 2.50"
        />
      </div>
    </div>
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => handleRemoveComplement(groupIndex, itemIndex)}
      className="text-red-500 hover:text-red-600"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);

const GroupSettingsModal = ({ group, groupIndex, handleGroupChange, children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Configurações do Grupo "{group.name || 'Novo Grupo'}"</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor={`group-name-${groupIndex}`}>Nome do Grupo</Label>
                        <Input
                            id={`group-name-${groupIndex}`}
                            value={group.name}
                            onChange={(e) => handleGroupChange(groupIndex, 'name', e.target.value)}
                            placeholder="Ex: Frutas Adicionais"
                        />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor={`group-min-${groupIndex}`}>Seleção Mínima</Label>
                            <Input
                                id={`group-min-${groupIndex}`}
                                type="number"
                                value={group.min_selection}
                                onChange={(e) => handleGroupChange(groupIndex, 'min_selection', e.target.value)}
                                placeholder="Ex: 0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor={`group-max-${groupIndex}`}>Seleção Máxima</Label>
                            <Input
                                id={`group-max-${groupIndex}`}
                                type="number"
                                value={group.max_selection}
                                onChange={(e) => handleGroupChange(groupIndex, 'max_selection', e.target.value)}
                                placeholder="Ex: 3"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Fechar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const ProductComplementsEditor = ({ complementGroups, setComplementGroups }) => {

  const handleAddGroup = () => {
    setComplementGroups([
      ...complementGroups,
      { id: `new_group_${Date.now()}`, name: 'Novo Grupo', min_selection: 0, max_selection: 1, items: [] },
    ]);
  };

  const handleRemoveGroup = (groupIndex) => {
    setComplementGroups(complementGroups.filter((_, i) => i !== groupIndex));
  };

  const handleGroupChange = (index, field, value) => {
    const newGroups = [...complementGroups];
    newGroups[index][field] = value;
    setComplementGroups(newGroups);
  };
  
  const handleAddComplement = (groupIndex) => {
    const newGroups = [...complementGroups];
    newGroups[groupIndex].items.push({ id: `new_item_${Date.now()}`, name: '', price: '' });
    setComplementGroups(newGroups);
  };

  const handleRemoveComplement = (groupIndex, itemIndex) => {
    const newGroups = [...complementGroups];
    newGroups[groupIndex].items = newGroups[groupIndex].items.filter((_, i) => i !== itemIndex);
    setComplementGroups(newGroups);
  };

  const handleComplementChange = (groupIndex, itemIndex, field, value) => {
    const newGroups = [...complementGroups];
    newGroups[groupIndex].items[itemIndex][field] = value;
    setComplementGroups(newGroups);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-base font-medium">Grupos de Complementos</Label>
        <p className="text-sm text-muted-foreground">
          Crie grupos de itens adicionais para o cliente escolher, como "Frutas", "Calda" ou "Bordas".
        </p>
      </div>

      <div className="space-y-6">
        {complementGroups.map((group, groupIndex) => (
          <Card key={group.id || groupIndex} className="bg-gray-50/50">
            <CardHeader className="flex flex-row items-center justify-between p-4">
              <div>
                <CardTitle className="text-lg">{group.name || 'Novo Grupo'}</CardTitle>
                <CardDescription>
                  Seleção: {group.min_selection || 0} a {group.max_selection || 'N/A'}
                </CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <GroupSettingsModal group={group} groupIndex={groupIndex} handleGroupChange={handleGroupChange}>
                     <Button type="button" variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                </GroupSettingsModal>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveGroup(groupIndex)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-3">
              <div className="space-y-3">
                {group.items.map((item, itemIndex) => (
                  <ComplementItem
                    key={item.id || itemIndex}
                    item={item}
                    groupIndex={groupIndex}
                    itemIndex={itemIndex}
                    handleComplementChange={handleComplementChange}
                    handleRemoveComplement={handleRemoveComplement}
                  />
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddComplement(groupIndex)}
                className="mt-2"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Item ao Grupo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={handleAddGroup} className="mt-4">
        <PlusCircle className="mr-2 h-4 w-4" />
        Criar Novo Grupo de Complementos
      </Button>
    </div>
  );
};

export default ProductComplementsEditor;
