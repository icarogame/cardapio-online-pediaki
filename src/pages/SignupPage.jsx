
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext.jsx';
import { checkSlugAvailability, signup as apiSignup } from '@/services/api.js';

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const { plan: selectedPlan, billing: billingCycle } = location.state || { plan: null };

  const [slug, setSlug] = useState('');
  const [slugStatus, setSlugStatus] = useState({ status: 'idle', message: '' });
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const planDetails = useMemo(() => {
    if (!selectedPlan) {
      return {
        id: 'none',
        name: 'Nenhum plano selecionado',
        price: '-',
        cycle: '',
        features: ['Por favor, volte e escolha um plano para continuar.']
      };
    }
    return {
      id: selectedPlan.id,
      name: selectedPlan.name,
      price: selectedPlan.price,
      cycle: selectedPlan.period,
      features: selectedPlan.features,
    }
  }, [selectedPlan]);
  
  const handleSlugCheck = async () => {
    if (!slug) {
      setSlugStatus({ status: 'unavailable', message: 'Por favor, insira um link para verificar.' });
      return;
    }
    setIsCheckingSlug(true);
    setSlugStatus({ status: 'checking', message: '' });

    try {
      await checkSlugAvailability(slug);
      setSlugStatus({ status: 'available', message: 'Ótima escolha! Este link está disponível.' });
    } catch (error) {
      setSlugStatus({ status: 'unavailable', message: error.message || 'Este link já está em uso.' });
    } finally {
      setIsCheckingSlug(false);
    }
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (slugStatus.status !== 'available') {
        toast({
            title: "Verificação pendente",
            description: "Por favor, verifique a disponibilidade do seu link personalizado.",
            variant: "destructive",
        });
        return;
    }
    setIsSubmitting(true);
    
    const formData = {
      fullName: e.target.elements.fullName.value,
      email: e.target.elements.email.value,
      whatsapp: e.target.elements.whatsapp.value,
      password: e.target.elements.password.value,
      storeName: e.target.elements.storeName.value,
      slug: slug,
      planId: selectedPlan.id,
      billingCycle: billingCycle,
    };

    try {
      const { user, redirectUrl } = await apiSignup(formData);
      
      if (selectedPlan.id === 'trial') {
        toast({
          title: "🎉 Conta criada com sucesso!",
          description: "Bem-vindo ao MenuFlow! Redirecionando para o seu painel.",
          variant: "success",
        });
        const redirectPath = login(user);
        setTimeout(() => navigate(redirectPath), 2000);
      } else {
        toast({
          title: "✅ Quase lá!",
          description: "Sua conta foi pré-criada. Redirecionando para o pagamento.",
        });
        setTimeout(() => {
          if (redirectUrl) {
            // window.location.href = redirectUrl; // In a real scenario
            toast({
              title: '🚧 Redirecionando para Pagamento (Simulação)',
              description: `URL: ${redirectUrl}`,
            });
          } else {
             toast({
              title: '🚧 Pagamento não implementado',
              description: "A integração com o sistema de pagamento pode ser solicitada.",
            });
          }
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message || "Ocorreu um problema. Tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };
  
  const getButtonText = () => {
    if (!selectedPlan) return "Escolha um Plano";
    if (selectedPlan.id === 'trial') {
      return 'Criar Minha Conta e Acessar o Painel';
    }
    return 'Criar Conta e Ir para o Pagamento';
  }

  return (
    <>
      <Helmet>
        <title>Cadastro - Crie sua Conta no MenuFlow</title>
        <meta name="description" content="Complete seu cadastro para começar a usar o MenuFlow e transformar seu negócio." />
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start"
          >
            {/* Coluna Esquerda - Resumo do Plano */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-8 hidden lg:block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Resumo do seu Plano</h2>
              <p className="text-gray-500 mb-6">Você está a um passo de transformar seu negócio.</p>
              
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <p className="text-lg font-semibold text-orange-600">{planDetails.name}</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {planDetails.price}
                  <span className="text-xl font-medium text-gray-500">{planDetails.cycle}</span>
                </p>
                <ul className="mt-6 space-y-3">
                  {planDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-center text-gray-400 mt-8">
                Transação segura e criptografada.
              </p>
            </motion.div>

            {/* Coluna Direita - Formulário */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <Card className="shadow-2xl rounded-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-orange-600">Complete seu Cadastro</CardTitle>
                  <CardDescription className="lg:hidden">Plano: <span className="font-semibold text-gray-800">{planDetails.name}</span></CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    
                    {/* Seção 1: Conta de Administrador */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Crie sua Conta de Administrador</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Seu Nome Completo</Label>
                          <Input id="fullName" placeholder="Ex: João da Silva" required disabled={isSubmitting} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Seu Melhor Email</Label>
                          <Input id="email" type="email" placeholder="voce@exemplo.com" required disabled={isSubmitting} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="whatsapp">Número de WhatsApp</Label>
                          <Input id="whatsapp" type="tel" placeholder="(XX) XXXXX-XXXX" required disabled={isSubmitting} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Crie uma Senha</Label>
                          <Input id="password" type="password" required disabled={isSubmitting} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Seção 2: Configuração da Loja */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Configure sua Loja</h3>
                       <div className="space-y-2">
                          <Label htmlFor="storeName">Nome da sua Empresa/Loja</Label>
                          <Input id="storeName" placeholder="Ex: Lanchonete do Zé" required disabled={isSubmitting} />
                        </div>
                    </div>

                    {/* Seção 3: Link Personalizado */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Crie seu Link Personalizado</h3>
                      <div className="space-y-2">
                        <Label htmlFor="storeSlug">Seu endereço no MenuFlow</Label>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm h-10">
                            pedeaki.online/
                          </span>
                          <Input 
                            id="storeSlug" 
                            placeholder="sua-lanchonete" 
                            className="rounded-l-none flex-grow" 
                            required 
                            value={slug}
                            onChange={(e) => {
                              const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
                              setSlug(newSlug);
                              setSlugStatus({ status: 'idle', message: '' });
                            }}
                            disabled={isSubmitting}
                          />
                          <Button type="button" variant="outline" size="sm" onClick={handleSlugCheck} disabled={isCheckingSlug || isSubmitting}>
                            {isCheckingSlug ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verificar'}
                          </Button>
                        </div>
                        <div className="h-5 mt-1 text-xs">
                          {slugStatus.status === 'available' && (
                            <p className="text-green-600 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> {slugStatus.message}</p>
                          )}
                          {slugStatus.status === 'unavailable' && (
                            <p className="text-red-600 flex items-center"><AlertCircle className="h-4 w-4 mr-1" /> {slugStatus.message}</p>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 pt-1">Este será o endereço do seu cardápio digital.</p>
                      </div>
                    </div>
                  
                    <Button type="submit" size="lg" className="w-full gradient-orange text-white py-6 text-base font-bold" disabled={isSubmitting || slugStatus.status !== 'available' || !selectedPlan}>
                      {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                      {isSubmitting ? 'Processando...' : getButtonText()}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;