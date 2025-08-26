
import React from 'react';
import { Ticket, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const coupons = [
    { code: "BEMVINDO15", description: "15% de desconto na sua primeira compra.", status: "available" },
    { code: "PIZZA20", description: "20% de desconto em todas as pizzas.", status: "available" },
    { code: "USADO123", description: "Cupom de R$5 por indicação.", status: "used" },
    { code: "EXPIROU5", description: "5% de desconto em todo o site.", status: "expired" },
];

const CouponPage = () => {
    const { toast } = useToast();

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Código Copiado!",
            description: `O cupom ${code} foi copiado.`,
        });
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case "used": return { text: "Já Utilizado", icon: <CheckCircle className="w-4 h-4 text-green-500" />, color: "text-gray-400" };
            case "expired": return { text: "Expirado", icon: <Clock className="w-4 h-4 text-red-500" />, color: "text-gray-400" };
            default: return null;
        }
    }

  return (
    <div className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Meus Cupons</h1>
            <p className="text-xl text-gray-600 mt-2">Aproveite seus descontos exclusivos.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon, index) => {
                const statusInfo = getStatusInfo(coupon.status);
                return (
                    <Card key={index} className={`shadow-lg ${statusInfo ? 'bg-gray-50' : ''}`}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <Ticket className={`w-8 h-8 ${statusInfo ? statusInfo.color : 'text-orange-500'}`} />
                                <span className={`text-2xl font-bold ${statusInfo ? statusInfo.color : ''}`}>{coupon.code}</span>
                            </CardTitle>
                            <CardDescription className={statusInfo ? statusInfo.color : ''}>{coupon.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {statusInfo ? (
                                <div className="flex items-center gap-2 font-semibold">
                                    {statusInfo.icon}
                                    <span>{statusInfo.text}</span>
                                </div>
                            ) : (
                                <Button onClick={() => handleCopyCode(coupon.code)} className="w-full">
                                    Copiar e Usar
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    </div>
  );
};

export default CouponPage;
