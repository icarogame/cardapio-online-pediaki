import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Bike, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const deliveryDrivers = [
  { id: '1', name: 'Carlos Oliveira', status: 'Disponível' },
  { id: '2', name: 'Juliana Paes', status: 'Em rota' },
  { id: '3', name: 'Fernando Costa', status: 'Disponível' },
];

const AssignDeliveryModal = ({ isOpen, onOpenChange, onConfirm }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState('');
  const [customerName, setCustomerName] = useState('');
  const { toast } = useToast();

  const handleConfirm = () => {
    const fee = parseFloat(deliveryFee);
    if (!selectedDriver) {
      toast({ variant: 'destructive', title: 'Selecione um entregador.' });
      return;
    }
     if (!customerName) {
      toast({ variant: 'destructive', title: 'Insira o nome do cliente.' });
      return;
    }
    if (isNaN(fee) || fee < 0) {
      toast({ variant: 'destructive', title: 'Insira uma taxa de entrega válida.' });
      return;
    }

    const driver = deliveryDrivers.find(d => d.id === selectedDriver);
    onConfirm({ driver: driver.name, fee, customerName });
    
    // Reset state after confirm
    setSelectedDriver(null);
    setDeliveryFee('');
    setCustomerName('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
            setSelectedDriver(null);
            setDeliveryFee('');
            setCustomerName('');
        }
        onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bike className="mr-2 h-5 w-5" />
            Atribuir Entrega
          </DialogTitle>
          <DialogDescription>
            Defina o cliente, entregador e taxa para este pedido.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
           <div className="space-y-2">
            <Label htmlFor="customer-name">Nome do Cliente</Label>
            <Input
              id="customer-name"
              placeholder="Ex: João Silva"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Entregadores Disponíveis</Label>
            <RadioGroup onValueChange={setSelectedDriver} value={selectedDriver}>
              <div className="space-y-2 rounded-md border p-2">
                {deliveryDrivers.map((driver) => (
                  <Label
                    key={driver.id}
                    htmlFor={`driver-${driver.id}`}
                    className={`flex items-center justify-between rounded-md p-3 transition-colors ${
                      selectedDriver === driver.id ? 'bg-orange-50 border-orange-200' : ''
                    } ${
                      driver.status !== 'Disponível' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                       <RadioGroupItem 
                        value={driver.id} 
                        id={`driver-${driver.id}`}
                        className="mr-3"
                        disabled={driver.status !== 'Disponível'}
                      />
                      <User className="mr-2 h-4 w-4" />
                      <span>{driver.name}</span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${driver.status === 'Disponível' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {driver.status}
                    </span>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery-fee">Valor da Taxa de Entrega (R$)</Label>
            <Input
              id="delivery-fee"
              type="number"
              placeholder="Ex: 5.00"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleConfirm} className="gradient-orange text-white">
            Confirmar Atribuição
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignDeliveryModal;