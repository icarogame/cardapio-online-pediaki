
import React from 'react';
import { useParams } from 'react-router-dom';
import { Bell, FileText } from 'lucide-react';
import MenuPage from './MenuPage';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const TableMenuPage = () => {
    const { tableNumber } = useParams();
    const { toast } = useToast();

    const handleCallWaiter = () => {
        toast({
            title: "Garçom a caminho!",
            description: `A mesa ${tableNumber} está chamando o garçom.`,
        });
    };

    const handleRequestBill = () => {
        toast({
            title: "Conta solicitada!",
            description: `A mesa ${tableNumber} solicitou o fechamento da conta.`,
        });
    };

    return (
        <div>
            <div className="bg-orange-500 text-white p-3 text-center font-bold sticky top-0 z-40">
                Você está na Mesa {tableNumber}
            </div>
            
            <MenuPage />
            
            <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg-top z-40 flex justify-around border-t">
                <Button variant="outline" onClick={handleCallWaiter}>
                    <Bell className="mr-2 h-4 w-4" /> Chamar Garçom
                </Button>
                <Button onClick={handleRequestBill}>
                    <FileText className="mr-2 h-4 w-4" /> Pedir a Conta
                </Button>
            </div>
        </div>
    );
};

export default TableMenuPage;
