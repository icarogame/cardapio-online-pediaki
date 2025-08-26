import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'lucide-react';

const PlanEditorModal = ({ isOpen, onOpenChange, plan, onSave }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    pricePerMonth: '',
    totalPrice: '',
    description: '',
    paymentLink: '',
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        id: plan.id,
        name: plan.name || '',
        pricePerMonth: plan.pricePerMonth !== undefined ? String(plan.pricePerMonth) : '',
        totalPrice: plan.totalPrice !== undefined ? String(plan.totalPrice) : '',
        description: plan.description || '',
        paymentLink: plan.paymentLink || '',
      });
    }
  }, [plan, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pricePerMonthNum = parseFloat(formData.pricePerMonth);
    const totalPriceNum = parseFloat(formData.totalPrice);

    if (isNaN(pricePerMonthNum) || isNaN(totalPriceNum)) {
      toast({
        title: "Erro de Validação",
        description: "Os preços devem ser números válidos.",
        variant: "destructive",
      });
      return;
    }

    onSave({
      ...plan,
      ...formData,
      pricePerMonth: pricePerMonthNum,
      totalPrice: totalPriceNum,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Plano de Assinatura</DialogTitle>
          <DialogDescription>
            Ajuste os detalhes do plano "{plan?.name}".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Plano</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Plano Semestral"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="pricePerMonth">Preço por Mês (R$)</Label>
                <Input
                    id="pricePerMonth"
                    type="number"
                    step="0.01"
                    value={formData.pricePerMonth}
                    onChange={handleChange}
                    placeholder="Ex: 29.90"
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="totalPrice">Preço Total Cobrado (R$)</Label>
                <Input
                    id="totalPrice"
                    type="number"
                    step="0.01"
                    value={formData.totalPrice}
                    onChange={handleChange}
                    placeholder="Ex: 179.40"
                />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Texto de Descrição/Economia</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Ex: De R$ 239,40 por R$ 179,40"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentLink" className="flex items-center">
                <Link className="mr-2 h-4 w-4" />
                Link de Pagamento Manual (Opcional)
              </Label>
              <Input
                id="paymentLink"
                value={formData.paymentLink}
                onChange={handleChange}
                placeholder="https://pagamento.exemplo.com/link-do-plano"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="gradient-orange text-white">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PlanEditorModal;