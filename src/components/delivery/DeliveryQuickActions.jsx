import React from 'react';
import { 
  AlertCircle,
  Clock,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const DeliveryQuickActions = () => {
  const { toast } = useToast();

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => handleFeatureClick('report-issue')}
        >
          <AlertCircle className="w-4 h-4 mr-3" />
          Reportar Problema
        </Button>
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => handleFeatureClick('break')}
        >
          <Clock className="w-4 h-4 mr-3" />
          Pausar Entregas
        </Button>
        <Button 
          className="w-full justify-start" 
          variant="outline"
          onClick={() => handleFeatureClick('history')}
        >
          <Package className="w-4 h-4 mr-3" />
          Histórico de Entregas
        </Button>
      </CardContent>
    </Card>
  );
};

export default DeliveryQuickActions;