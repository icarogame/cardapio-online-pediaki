
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const [cicloFaturamento, setCicloFaturamento] = useState('mensal');
  const navigate = useNavigate();

  const plans = {
    mensal: [
      {
        id: 'trial',
        name: 'Teste Grátis',
        price: 'R$0',
        period: 'por 30 dias',
        description: 'Comece a explorar sem compromisso.',
        features: [
          'Cardápio Digital Básico',
          'Gestão de Pedidos',
          '1 Ponto de Venda (PDV)',
          'Suporte via Chat',
        ],
        cta: 'Começar Teste Grátis',
        isFeatured: false,
      },
      {
        id: 'essencial_mensal',
        name: 'Essencial',
        price: 'R$99',
        period: '/mês',
        description: 'Para negócios que estão começando a crescer.',
        features: [
          'Tudo do Teste Grátis, e mais:',
          'Cardápio Digital Completo',
          'Múltiplos PDVs',
          'Gestão de Clientes (CRM)',
          'Relatórios Básicos',
        ],
        cta: 'Escolher Essencial',
        isFeatured: true,
      },
      {
        id: 'profissional_mensal',
        name: 'Profissional',
        price: 'R$199',
        period: '/mês',
        description: 'A solução completa para escalar seu negócio.',
        features: [
          'Tudo do Essencial, e mais:',
          'Gestão de Entregadores',
          'Programa de Fidelidade',
          'Relatórios Avançados',
          'Suporte Prioritário',
        ],
        cta: 'Escolher Profissional',
        isFeatured: false,
      },
    ],
    anual: [
      {
        id: 'trial',
        name: 'Teste Grátis',
        price: 'R$0',
        period: 'por 30 dias',
        description: 'Comece a explorar sem compromisso.',
        features: [
          'Cardápio Digital Básico',
          'Gestão de Pedidos',
          '1 Ponto de Venda (PDV)',
          'Suporte via Chat',
        ],
        cta: 'Começar Teste Grátis',
        isFeatured: false,
      },
      {
        id: 'essencial_anual',
        name: 'Essencial',
        price: 'R$82,50',
        period: '/mês',
        annualPrice: 'Cobrado R$990 por ano',
        benefit: '2 meses grátis!',
        description: 'Economize com o plano anual.',
        features: [
          'Tudo do Teste Grátis, e mais:',
          'Cardápio Digital Completo',
          'Múltiplos PDVs',
          'Gestão de Clientes (CRM)',
          'Relatórios Básicos',
        ],
        cta: 'Escolher Essencial Anual',
        isFeatured: true,
      },
      {
        id: 'profissional_anual',
        name: 'Profissional',
        price: 'R$165,80',
        period: '/mês',
        annualPrice: 'Cobrado R$1990 por ano',
        benefit: 'Economize!',
        description: 'O melhor custo-benefício para escalar.',
        features: [
          'Tudo do Essencial, e mais:',
          'Gestão de Entregadores',
          'Programa de Fidelidade',
          'Relatórios Avançados',
          'Suporte Prioritário',
        ],
        cta: 'Escolher Profissional Anual',
        isFeatured: false,
      },
    ],
  };

  const handlePlanSelection = (plan) => {
    navigate('/signup', { state: { plan: plan, billing: cicloFaturamento } });
  };

  return (
    <>
      <Helmet>
        <title>Planos e Preços - MenuFlow</title>
        <meta name="description" content="Escolha o plano perfeito para o seu restaurante. Opções flexíveis para todos os tamanhos de negócio, com teste grátis de 30 dias." />
        <meta property="og:title" content="Planos e Preços - MenuFlow" />
        <meta property="og:description" content="Escolha o plano perfeito para o seu restaurante. Opções flexíveis para todos os tamanhos de negócio, com teste grátis de 30 dias." />
      </Helmet>
      <div className="bg-gray-50 min-h-screen">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="gradient-orange text-white mb-4">Nossos Planos</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Escolha o plano perfeito para você
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Planos flexíveis e transparentes que crescem com o seu negócio. Sem taxas escondidas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex items-center justify-center space-x-2 bg-gray-200 p-1 rounded-full relative"
            >
              <Button
                onClick={() => setCicloFaturamento('mensal')}
                className={`w-32 rounded-full transition-colors duration-300 ${
                  cicloFaturamento === 'mensal'
                    ? 'gradient-orange text-white shadow'
                    : 'bg-transparent text-gray-600 hover:bg-gray-300'
                }`}
                style={{ zIndex: cicloFaturamento === 'mensal' ? 20 : 10 }}
              >
                Plano Mensal
              </Button>
              <Button
                onClick={() => setCicloFaturamento('anual')}
                className={`w-32 rounded-full transition-colors duration-300 relative ${
                  cicloFaturamento === 'anual'
                  ? 'gradient-orange text-white shadow'
                  : 'bg-transparent text-gray-600 hover:bg-gray-300'
                }`}
                style={{ zIndex: cicloFaturamento === 'anual' ? 20 : 10 }}
              >
                Plano Anual
                <Badge variant="outline" className="absolute -top-2 -right-4 bg-green-100 border-green-500 text-green-700 text-xs px-2 py-0.5">
                  -15%
                </Badge>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {plans[cicloFaturamento].map((plan, index) => (
              <motion.div
                key={plan.id + cicloFaturamento}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className={`h-full flex flex-col rounded-2xl transition-all duration-300 ${plan.isFeatured ? 'border-orange-500 border-2 shadow-2xl scale-105' : 'hover:shadow-xl'}`}>
                  {plan.isFeatured && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-orange text-white flex items-center gap-1">
                      <Star className="w-4 h-4" /> Mais Popular
                    </Badge>
                  )}
                   {cicloFaturamento === 'anual' && plan.benefit && (
                    <Badge variant="secondary" className="absolute top-4 right-4 bg-green-100 text-green-700">{plan.benefit}</Badge>
                   )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div className="text-center mb-8">
                      <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1">{plan.period}</span>
                      {cicloFaturamento === 'anual' && plan.annualPrice && (
                        <p className="text-sm text-gray-500 mt-1">{plan.annualPrice}</p>
                      )}
                    </div>
                    <ul className="space-y-4 text-gray-600 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="lg"
                      className={`w-full ${plan.isFeatured ? 'gradient-orange text-white' : 'bg-orange-100 text-orange-600 hover:bg-orange-200'}`}
                      onClick={() => handlePlanSelection(plan)}
                    >
                      {plan.cta} <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;