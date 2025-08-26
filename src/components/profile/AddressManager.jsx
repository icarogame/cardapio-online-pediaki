import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import AddressFormModal from './AddressFormModal';

const initialAddresses = [
  {
    id: 'addr1',
    name: 'Casa',
    street: 'Rua das Delícias, 123',
    neighborhood: 'Saborlândia',
    city: 'Gourmetville',
    cep: '12345-678',
    complement: 'Apto 101',
  },
  {
    id: 'addr2',
    name: 'Trabalho',
    street: 'Avenida do Sabor, 456',
    neighborhood: 'Centro',
    city: 'Gourmetville',
    cep: '98765-432',
    complement: 'Sala 50',
  },
];

const AddressManager = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = (addressId) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
  };
  
  const handleSave = (addressData) => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === editingAddress.id ? { ...addr, ...addressData } : addr));
    } else {
      setAddresses([...addresses, { ...addressData, id: `addr${Date.now()}` }]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Home className="w-6 h-6 mr-3 text-orange-500" />
        Meus Endereços
      </h2>
      <Card>
        <CardHeader>
          <CardTitle>Endereços Salvos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-bold text-gray-800">{address.name}</p>
                <p className="text-sm text-gray-600">{address.street}</p>
                <p className="text-sm text-gray-500">{`${address.neighborhood}, ${address.city}`}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(address)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso excluirá permanentemente o endereço salvo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(address.id)} className="bg-red-500 hover:bg-red-600">Excluir</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.div>
          ))}
          <Button onClick={handleAddNew} className="w-full mt-4">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Novo Endereço
          </Button>
        </CardContent>
      </Card>
      <AddressFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        address={editingAddress}
        onSave={handleSave}
      />
    </div>
  );
};

export default AddressManager;