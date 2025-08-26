
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AddUserModal = ({ isOpen, setIsOpen, onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [permissions, setPermissions] = useState({
    editMenu: false,
    applyDiscounts: false,
    accessFinancials: false,
  });

  const handleRoleChange = (value) => {
    setRole(value);
    if (value !== 'Atendente') {
      setPermissions({
        editMenu: false,
        applyDiscounts: false,
        accessFinancials: false,
      });
    }
  };

  const handlePermissionChange = (permission) => {
    setPermissions(prev => ({ ...prev, [permission]: !prev[permission] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser({ name, email, role, permissions });
    setIsOpen(false);
    // Reset form
    setName('');
    setEmail('');
    setRole('');
    setPermissions({
      editMenu: false,
      applyDiscounts: false,
      accessFinancials: false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os detalhes abaixo para criar um novo usuário.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                placeholder="Nome Completo"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="exemplo@email.com"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Função
              </Label>
              <Select onValueChange={handleRoleChange} value={role}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Atendente">Atendente</SelectItem>
                  <SelectItem value="Entregador">Entregador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AnimatePresence>
              {role === 'Atendente' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="col-span-4"
                >
                  <div className="grid gap-2 pt-2">
                    <Label className="font-semibold">Permissões</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="editMenu" checked={permissions.editMenu} onCheckedChange={() => handlePermissionChange('editMenu')} />
                      <Label htmlFor="editMenu">Pode editar cardápio</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="applyDiscounts" checked={permissions.applyDiscounts} onCheckedChange={() => handlePermissionChange('applyDiscounts')} />
                      <Label htmlFor="applyDiscounts">Pode aplicar descontos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="accessFinancials" checked={permissions.accessFinancials} onCheckedChange={() => handlePermissionChange('accessFinancials')} />
                      <Label htmlFor="accessFinancials">Pode acessar o financeiro</Label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
            <Button type="submit" className="gradient-orange text-white">Salvar Usuário</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
