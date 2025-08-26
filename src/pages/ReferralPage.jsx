
import React from 'react';
import { Share2, Gift, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ReferralPage = () => {
    const { toast } = useToast();
    const referralLink = "https://menuflow.app/r/seu-codigo-123";

    const handleCopyLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast({
            title: "Link Copiado!",
            description: "Seu link de indicação foi copiado para a área de transferência.",
        });
    };

  return (
    <div className="container mx-auto p-4 md:p-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Indique e Ganhe</h1>
        <p className="text-xl text-gray-600 mt-2">Compartilhe com seus amigos e ganhe recompensas!</p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg mb-12">
        <CardHeader>
            <CardTitle className="text-center text-2xl">Seu Link de Indicação</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
            <div className="p-4 bg-gray-100 rounded-lg mb-4">
                <p className="text-lg font-mono text-orange-700 break-words">{referralLink}</p>
            </div>
            <Button onClick={handleCopyLink}>
                <Share2 className="mr-2 h-4 w-4" /> Copiar Link
            </Button>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8 text-center">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                    <Gift className="w-6 h-6 text-orange-500" />
                    <span>Benefício para seu Amigo</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg">Seu amigo ganha <span className="font-bold">15% de desconto</span> no primeiro pedido ao usar seu link.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                    <UserPlus className="w-6 h-6 text-green-500" />
                    <span>Sua Recompensa</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg">Você ganha um <span className="font-bold">cupom de R$10</span> a cada amigo que fizer o primeiro pedido.</p>
            </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default ReferralPage;
