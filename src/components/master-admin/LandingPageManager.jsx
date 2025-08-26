
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Save, Clock, Users, TrendingUp, KeyRound } from 'lucide-react';

const LandingPageManager = () => {
  const { toast } = useToast();
  
  const [heroContent, setHeroContent] = useState({
    title: 'Revolucione seu Restaurante',
    subtitle: 'Sistema completo de gestão de pedidos, cardápio digital e delivery. Tudo que você precisa para modernizar seu negócio em uma única plataforma.',
    ctaButton: 'Começar Agora',
    demoButton: 'Ver Demonstração',
  });

  const [features, setFeatures] = useState([
    { id: 1, icon: Clock, text: 'Setup em 5 minutos' },
    { id: 2, icon: Users, text: 'Suporte especializado' },
    { id: 3, icon: TrendingUp, text: 'ROI garantido' }
  ]);

  const [demoCredentials, setDemoCredentials] = useState({
    email: 'demo@pedeaki.online',
    password: 'demo_password',
  });

  const handleHeroChange = (e) => {
    const { id, value } = e.target;
    setHeroContent(prev => ({ ...prev, [id]: value }));
  };

  const handleFeatureChange = (id, newText) => {
    setFeatures(prevFeatures => 
      prevFeatures.map(feature => 
        feature.id === id ? { ...feature, text: newText } : feature
      )
    );
  };

  const handleDemoCredentialsChange = (e) => {
    const { id, value } = e.target;
    setDemoCredentials(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log('Saving landing page content:', { heroContent, features, demoCredentials });
    toast({
      title: 'Conteúdo Salvo! 🚀',
      description: 'As alterações na página inicial foram salvas com sucesso.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Editor da Seção Principal (Hero)</CardTitle>
          <CardDescription>
            Altere os textos principais que aparecem na primeira seção da sua página inicial.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título Principal</Label>
            <Input
              id="title"
              value={heroContent.title}
              onChange={handleHeroChange}
              placeholder="Ex: Revolucione seu Restaurante"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtítulo</Label>
            <Textarea
              id="subtitle"
              value={heroContent.subtitle}
              onChange={handleHeroChange}
              placeholder="Descreva o valor principal do seu produto..."
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
              <Label htmlFor="ctaButton">Texto do Botão Principal (CTA)</Label>
              <Input
                  id="ctaButton"
                  value={heroContent.ctaButton}
                  onChange={handleHeroChange}
                  placeholder="Ex: Começar Agora"
              />
              </div>
              <div className="space-y-2">
              <Label htmlFor="demoButton">Texto do Botão Secundário (Demo)</Label>
              <Input
                  id="demoButton"
                  value={heroContent.demoButton}
                  onChange={handleHeroChange}
                  placeholder="Ex: Ver Demonstração"
              />
              </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Editor da Seção de Diferenciais</CardTitle>
            <CardDescription>
                Edite os textos dos diferenciais que aparecem no final da página.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {features.map((feature) => {
                const Icon = feature.icon;
                return (
                    <div key={feature.id} className="space-y-2">
                        <Label htmlFor={`feature-${feature.id}`}>Diferencial {feature.id}</Label>
                        <div className="flex items-center space-x-2">
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <Input
                                id={`feature-${feature.id}`}
                                value={feature.text}
                                onChange={(e) => handleFeatureChange(feature.id, e.target.value)}
                                placeholder={`Texto do diferencial ${feature.id}`}
                            />
                        </div>
                    </div>
                )
            })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <KeyRound className="mr-2 h-5 w-5" />
                Gerenciar Acesso Demo
            </CardTitle>
            <CardDescription>
                Altere as credenciais que são exibidas na página de acesso à demonstração.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="email">Email da Conta Demo</Label>
                <Input
                    id="email"
                    type="email"
                    value={demoCredentials.email}
                    onChange={handleDemoCredentialsChange}
                    placeholder="demo@exemplo.com"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Senha da Conta Demo</Label>
                <Input
                    id="password"
                    type="text"
                    value={demoCredentials.password}
                    onChange={handleDemoCredentialsChange}
                    placeholder="senha_da_demo"
                />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gradient-orange text-white" size="lg">
          <Save className="mr-2 h-4 w-4" />
          Salvar Todas as Alterações
        </Button>
      </div>
    </div>
  );
};

export default LandingPageManager;
