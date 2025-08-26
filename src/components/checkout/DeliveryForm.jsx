
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, PlusCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const savedAddresses = [
  {
    id: 'addr1',
    name: 'Casa',
    street: 'Rua das Delícias',
    number: '123',
    neighborhood: 'Saborlândia',
    city: 'Gourmetville',
    cep: '12345-678',
    complement: ''
  },
  {
    id: 'addr2',
    name: 'Trabalho',
    street: 'Avenida do Sabor',
    number: '456',
    neighborhood: 'Centro',
    city: 'Gourmetville',
    cep: '98765-432',
    complement: 'Sala 10'
  },
];

const DeliveryForm = ({ onAddressChange }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(savedAddresses[0]?.id || 'new');
  const [showNewAddressForm, setShowNewAddressForm] = useState(!savedAddresses.length > 0);
  const [newAddress, setNewAddress] = useState({
    street: '', number: '', complement: '', neighborhood: '', city: '', cep: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (selectedAddressId !== 'new') {
      const selected = savedAddresses.find(a => a.id === selectedAddressId);
      if (selected) {
        onAddressChange(selected);
      }
    } else {
      onAddressChange(newAddress);
    }
  }, [selectedAddressId, newAddress, onAddressChange]);


  const handleAddNewAddress = () => {
    setShowNewAddressForm(true);
    setSelectedAddressId('new');
  };

  const handleNewAddressChange = (e) => {
    const { id, value } = e.target;
    setNewAddress(prev => ({...prev, [id]: value}));
  }

  const handleSaveAddress = () => {
    // Logic to save address will be here
    // For now, just updates parent and closes form
    onAddressChange(newAddress);
    toast({
        title: "Endereço Salvo!",
        description: "O novo endereço foi salvo com sucesso.",
    });
    setShowNewAddressForm(false);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 space-y-4"
    >
      <RadioGroup value={selectedAddressId} onValueChange={setSelectedAddressId} className="space-y-4">
        {savedAddresses.map((address) => (
          <Label 
            key={address.id} 
            htmlFor={address.id}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${selectedAddressId === address.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200'}`}
          >
            <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
            <div className="ml-4">
              <p className="font-semibold">{address.name}</p>
              <p className="text-sm text-gray-600">{`${address.street}, ${address.number}`}</p>
              <p className="text-sm text-gray-500">{`${address.neighborhood}, ${address.city}`}</p>
            </div>
          </Label>
        ))}
      </RadioGroup>

      {!showNewAddressForm ? (
        <Button variant="outline" className="w-full" onClick={handleAddNewAddress}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Novo Endereço
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4 pt-4 border-t"
        >
          <h3 className="font-semibold text-lg">Novo Endereço</h3>
           <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Label htmlFor="cep">CEP</Label>
              <Input id="cep" placeholder="00000-000" value={newAddress.cep} onChange={handleNewAddressChange} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="street">Rua</Label>
              <Input id="street" placeholder="Rua das Delícias" value={newAddress.street} onChange={handleNewAddressChange} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Label htmlFor="number">Número</Label>
              <Input id="number" placeholder="123" value={newAddress.number} onChange={handleNewAddressChange} />
            </div>
            <div className="col-span-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input id="complement" placeholder="Apto 45" value={newAddress.complement} onChange={handleNewAddressChange} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="neighborhood">Bairro</Label>
              <Input id="neighborhood" placeholder="Saborlândia" value={newAddress.neighborhood} onChange={handleNewAddressChange} />
            </div>
            <div>
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" placeholder="Gourmetville" value={newAddress.city} onChange={handleNewAddressChange} />
            </div>
          </div>
           <Button className="w-full" onClick={handleSaveAddress}>Salvar Endereço</Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DeliveryForm;
