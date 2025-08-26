
import React from 'react';
import { Gift, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const LoyaltyPage = () => {
    const { toast } = useToast();
  
    const handleFeatureClick = () => {
        toast({
            title: "🚧 Funcionalidade em breve!",
            description: "Estamos trabalhando para trazer o programa de fidelidade para você.",
        });
    };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Plano de Fidelidade</h1>
        <p className="text-xl text-gray-600 mt-2">Suas compras valem pontos!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Star className="text-yellow-500" />
              <span>Seu Saldo</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-orange-600">125 Pontos</p>
            <p className="text-gray-500 mt-2">Continue comprando para ganhar mais!</p>
          </CardContent>
        </Card>
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Como funciona?</h2>
            <p>A cada R$1,00 em compras, você ganha 1 ponto. Junte pontos e troque por produtos ou descontos exclusivos.</p>
            <Button onClick={handleFeatureClick}>Ver Recompensas Disponíveis</Button>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Histórico de Pontos</h2>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">Pedido #3456</p>
                <p className="text-sm text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> <span>20 de Agosto, 2025</span></p>
              </div>
              <p className="font-bold text-green-600 text-lg">+ 52 Pontos</p>
            </CardContent>
          </Card>
           <Card>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">Resgate de Recompensa</p>
                <p className="text-sm text-gray-500 flex items-center gap-2"><Gift className="w-4 h-4" /> <span>15 de Agosto, 2025</span></p>
              </div>
              <p className="font-bold text-red-600 text-lg">- 100 Pontos</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;
