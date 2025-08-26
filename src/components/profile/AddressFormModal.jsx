import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AddressFormModal = ({ isOpen, onOpenChange, address, onSave }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    } else {
      setFormData({
        name: '',
        cep: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
      });
    }
  }, [address, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    toast({
      title: "Endereço Salvo!",
      description: "Seu endereço foi salvo com sucesso.",
      className: "bg-green-100 text-green-800"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{address ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Endereço (ex: Casa, Trabalho)</Label>
            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Casa"/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" value={formData.cep} onChange={handleChange} placeholder="00000-000"/>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="street">Rua</Label>
              <Input id="street" value={formData.street} onChange={handleChange} placeholder="Rua das Delícias"/>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input id="number" value={formData.number} onChange={handleChange} placeholder="123"/>
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" value={formData.complement} onChange={handleChange} placeholder="Apto 45"/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="Saborlândia"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" value={formData.city} onChange={handleChange} placeholder="Gourmetville"/>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="gradient-orange text-white">Salvar Endereço</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressFormModal;