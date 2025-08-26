import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, ChefHat, ClipboardList } from 'lucide-react';

const PrintOptionsModal = ({ isOpen, onOpenChange, onSelectPrint }) => {
  const options = [
    { type: 'customer', label: 'Via do Cliente', icon: User, description: 'Recibo completo com valores para o cliente.' },
    { type: 'kitchen', label: 'Via da Cozinha', icon: ChefHat, description: 'Comanda simplificada para a preparação.' },
    { type: 'counter', label: 'Via do Balcão', icon: ClipboardList, description: 'Resumo para controle interno e caixa.' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Escolha o Formato de Impressão</DialogTitle>
          <DialogDescription>
            Selecione qual via do pedido você deseja imprimir.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {options.map((option) => (
            <Button
              key={option.type}
              variant="outline"
              className="w-full h-auto justify-start p-4 text-left"
              onClick={() => {
                onSelectPrint(option.type);
                onOpenChange(false);
              }}
            >
              <option.icon className="w-6 h-6 mr-4 text-orange-500" />
              <div>
                <p className="font-semibold">{option.label}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrintOptionsModal;