import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CustomerFormModal = ({ isOpen, onOpenChange, customer, onSave }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatarUrl: ''
  });

  useEffect(() => {
    if (customer) {
      setFormData({
          name: customer.name || '',
          email: customer.email || '',
          phone: customer.phone || '',
          avatarUrl: customer.avatarUrl || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        avatarUrl: ''
      });
    }
  }, [customer, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Erro de Validação",
        description: "Por favor, preencha o nome completo e o email.",
        variant: "destructive"
      });
      return;
    }
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{customer ? 'Editar Cliente' : 'Adicionar Novo Cliente'}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-4">
             <Avatar className="h-16 w-16">
              <AvatarImage src={formData.avatarUrl} alt={formData.name} />
              <AvatarFallback className="bg-orange-100 text-orange-500 text-xl font-bold">
                {getInitials(formData.name)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 w-full">
              <Label htmlFor="avatarUrl">URL da Imagem do Avatar</Label>
              <Input id="avatarUrl" value={formData.avatarUrl} onChange={handleChange} placeholder="https://exemplo.com/avatar.png"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" value={formData.name} onChange={handleChange} placeholder="Ex: Ana Silva"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Ex: ana.silva@example.com"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone (Opcional)</Label>
            <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Ex: (99) 99999-9999"/>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="gradient-orange text-white">Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormModal;
