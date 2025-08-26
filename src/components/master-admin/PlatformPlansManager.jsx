import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Link as LinkIcon } from 'lucide-react';
import PlanEditorModal from './PlanEditorModal';

const initialPlans = [
  {
    id: 'trial',
    name: 'Teste Grátis',
    pricePerMonth: 0,
    totalPrice: 0,
    description: '14 dias para testar todos os recursos.',
    features: ['Cardápio Digital', 'Gestão de Pedidos', 'Pedidos na Mesa (QR Code)'],
    isPopular: false,
    paymentLink: '',
  },
  {
    id: 'monthly',
    name: 'Plano Mensal',
    pricePerMonth: 39.90,
    totalPrice: 39.90,
    description: 'Flexibilidade total, cancele quando quiser.',
    features: ['Tudo do plano Teste Grátis', 'Suporte Prioritário'],
    isPopular: false,
    paymentLink: 'https://pagamento.exemplo.com/mensal',
  },
  {
    id: 'biannual',
    name: 'Plano Semestral',
    pricePerMonth: 29.90,
    totalPrice: 179.40,
    description: 'De R$ 239,40 por R$ 179,40',
    features: ['Tudo do plano Mensal', 'Taxas de transação reduzidas'],
    isPopular: true,
    paymentLink: 'https://pagamento.exemplo.com/semestral',
  },
  {
    id: 'annual',
    name: 'Plano Anual',
    pricePerMonth: 24.90,
    totalPrice: 298.80,
    description: 'O melhor custo-benefício, pague por 10 e use 12 meses.',
    features: ['Tudo do plano Semestral', 'Relatórios Avançados'],
    isPopular: false,
    paymentLink: 'https://pagamento.exemplo.com/anual',
  },
];

const PlatformPlansManager = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState(initialPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const handleEditClick = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleSaveChanges = (updatedPlan) => {
    setPlans(prevPlans => prevPlans.map(p => (p.id === updatedPlan.id ? updatedPlan : p)));
    toast({
      title: "Plano Atualizado! 🚀",
      description: `O plano "${updatedPlan.name}" foi salvo com sucesso.`,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Planos da Plataforma</CardTitle>
          <CardDescription>
            Edite os detalhes e os links de pagamento manual dos planos de assinatura.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{plan.name}</CardTitle>
                    {plan.isPopular && <Badge className="bg-orange-100 text-orange-600 border-orange-200">Popular</Badge>}
                  </div>
                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="text-3xl font-bold">R${plan.pricePerMonth.toFixed(2)}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                   <p className="text-sm text-muted-foreground">Total: R${plan.totalPrice.toFixed(2)}</p>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                   <p className="text-sm text-green-600 font-medium">{plan.description}</p>
                   {plan.paymentLink && (
                     <div className="flex items-center gap-2 text-xs text-muted-foreground">
                       <LinkIcon className="h-3 w-3" />
                       <a href={plan.paymentLink} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
                         {plan.paymentLink}
                       </a>
                     </div>
                   )}
                </CardContent>
                <div className="p-6 pt-0">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleEditClick(plan)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Plano
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
       <PlanEditorModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        plan={editingPlan}
        onSave={handleSaveChanges}
      />
    </div>
  );
};

export default PlatformPlansManager;