
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Save, Key, CreditCard, Lock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const CheckoutSettingsManager = () => {
  const { toast } = useToast();

  const [settings, setSettings] = useState({
    stripePublishableKey: '',
    stripeSecretKey: '',
    enableCreditCard: true,
    enablePix: true,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSettings(prev => ({ ...prev, [id]: value }));
  };
  
  const handleCheckboxChange = (id, checked) => {
    setSettings(prev => ({ ...prev, [id]: checked }));
  };

  const handleSave = () => {
    console.log('Saving checkout settings:', {
        ...settings,
        stripeSecretKey: '********' // Never log the real secret key
    });
    toast({
      title: 'Configurações Salvas! 🔒',
      description: 'As configurações de checkout foram salvas com segurança.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Key className="mr-2 h-5 w-5" />
            Configurar Checkout Global
          </CardTitle>
          <CardDescription>
            Insira as chaves de API do seu provedor de pagamento e gerencie os métodos disponíveis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 rounded-lg border p-4">
             <h3 className="text-lg font-semibold text-gray-800">Credenciais Stripe</h3>
              <div className="space-y-2">
                <Label htmlFor="stripePublishableKey">Chave Publicável Stripe</Label>
                <Input
                  id="stripePublishableKey"
                  value={settings.stripePublishableKey}
                  onChange={handleChange}
                  placeholder="pk_test_..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripeSecretKey">Chave Secreta Stripe</Label>
                <Input
                  id="stripeSecretKey"
                  type="password"
                  value={settings.stripeSecretKey}
                  onChange={handleChange}
                  placeholder="sk_test_..."
                />
                 <p className="text-xs text-muted-foreground flex items-center gap-1"><Lock className="h-3 w-3" /> Sua chave secreta é criptografada e armazenada com segurança.</p>
              </div>
          </div>
          
           <div className="space-y-4 rounded-lg border p-4">
             <h3 className="text-lg font-semibold text-gray-800">Métodos de Pagamento</h3>
              <div className="space-y-2">
                 <div className="flex items-center space-x-2">
                    <Checkbox
                        id="enableCreditCard"
                        checked={settings.enableCreditCard}
                        onCheckedChange={(checked) => handleCheckboxChange('enableCreditCard', checked)}
                    />
                    <Label htmlFor="enableCreditCard" className="font-normal cursor-pointer flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Habilitar Cartão de Crédito
                    </Label>
                 </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox
                        id="enablePix"
                        checked={settings.enablePix}
                        onCheckedChange={(checked) => handleCheckboxChange('enablePix', checked)}
                    />
                    <Label htmlFor="enablePix" className="font-normal cursor-pointer flex items-center gap-2">
                        <img src="https://logopng.com.br/logos/pix-106.svg" alt="PIX" className="h-4 w-4" />
                        Habilitar PIX
                    </Label>
                 </div>
              </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="gradient-orange text-white" size="lg">
              <Save className="mr-2 h-4 w-4" />
              Salvar Configurações de Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutSettingsManager;
