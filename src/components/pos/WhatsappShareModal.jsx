
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare } from 'lucide-react';

const WhatsappShareModal = ({ isOpen, onOpenChange, cart, deliveryInfo, companyInfo, orderId }) => {
  const { toast } = useToast();
  const [customerPhone, setCustomerPhone] = useState('');

  const calculateItemPrice = (item) => {
    let total = item.price;
    if (item.customizations) {
      Object.values(item.customizations).forEach(section => {
        if (Array.isArray(section)) {
          section.forEach(opt => { if (opt.price) total += opt.price; });
        } else if (section && section.price) {
          total += section.price;
        }
      });
    }
    return total;
  };

  const getSubtotal = () => cart.reduce((total, item) => total + (calculateItemPrice(item) * item.quantity), 0);
  const getTotalPrice = () => getSubtotal() + (deliveryInfo?.fee || 0);

  const generateOrderSummary = useMemo(() => {
    let summary = `Olá! 👋\n\nSegue o resumo do seu pedido na *${companyInfo.name}*:\n\n`;
    
    if (orderId) {
      summary += `*Pedido ${orderId}*\n\n`;
    }

    cart.forEach(item => {
      summary += `*${item.quantity}x ${item.name}* - R$ ${(calculateItemPrice(item) * item.quantity).toFixed(2)}\n`;
      if (item.customizations) {
        Object.values(item.customizations).forEach(section => {
          if (Array.isArray(section)) {
            section.forEach(opt => summary += `  - ${opt.name}\n`);
          } else if (section && section.name) {
            summary += `  - ${section.name}\n`;
          }
        });
      }
    });

    summary += `\nSubtotal: R$ ${getSubtotal().toFixed(2)}\n`;
    if (deliveryInfo) {
      summary += `Taxa de Entrega: R$ ${deliveryInfo.fee.toFixed(2)}\n`;
    }
    summary += `*Total: R$ ${getTotalPrice().toFixed(2)}*\n\n`;

    if (deliveryInfo) {
      summary += `*Endereço de Entrega:*\n${deliveryInfo.address}\n\n`;
    } else {
      summary += `*Pedido para retirada no balcão.*\n\n`;
    }

    summary += `Obrigado pela preferência! 😊`;
    return summary;
  }, [cart, deliveryInfo, companyInfo, getSubtotal, getTotalPrice, orderId]);

  const handleShare = () => {
    if (!customerPhone || customerPhone.length < 10) {
      toast({
        variant: 'destructive',
        title: 'Número Inválido',
        description: 'Por favor, insira um número de WhatsApp válido com DDD.',
      });
      return;
    }

    const formattedPhone = customerPhone.replace(/\D/g, '');
    const whatsappUrl = `https://api.whatsapp.com/send?phone=55${formattedPhone}&text=${encodeURIComponent(generateOrderSummary)}`;
    
    window.open(whatsappUrl, '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Compartilhar Pedido no WhatsApp</DialogTitle>
          <DialogDescription>
            Envie um resumo completo do pedido diretamente para o cliente.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label htmlFor="customer-phone">Número do WhatsApp do Cliente (com DDD)</Label>
            <Input
              id="customer-phone"
              placeholder="Ex: 11987654321"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          <div>
            <Label>Prévia da Mensagem</Label>
            <Textarea
              readOnly
              value={generateOrderSummary}
              className="h-64 resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleShare} className="bg-green-500 hover:bg-green-600 text-white">
            <MessageSquare className="w-4 h-4 mr-2" /> Enviar Mensagem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappShareModal;
