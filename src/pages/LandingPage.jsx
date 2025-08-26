import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Smartphone, ShoppingCart, Settings, Truck, Star, CheckCircle, ArrowRight, Users, TrendingUp, Clock, Zap, ShieldCheck, Cloud, Headphones as Headset, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const LandingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate('/demo-access'); // Navigate to the new demo access page
  };

  const features = [
    {
      icon: Smartphone,
      title: 'Cardápio Digital',
      description: 'Interface moderna e intuitiva para clientes fazerem pedidos online',
      link: '/#features'
    },
    {
      icon: ShoppingCart,
      title: 'Sistema PDV',
      description: 'Ponto de venda completo para atendimento no balcão',
      link: '/#features'
    },
    {
      icon: Settings,
      title: 'Painel Administrativo',
      description: 'Gestão completa do negócio, cardápio, usuários e finanças',
      link: '/#features'
    },
    {
      icon: Truck,
      title: 'Gestão de Delivery',
      description: 'Interface otimizada para entregadores e controle de rotas',
      link: '/#features'
    }
  ];

  const benefits = [
    'Aumento de 40% nas vendas online',
    'Redução de 60% no tempo de atendimento',
    'Controle total do seu negócio',
    'Integração com principais plataformas de delivery',
    'Relatórios detalhados em tempo real',
    'Suporte técnico especializado'
  ];

  const stats = [
    { number: '500+', label: 'Restaurantes Ativos' },
    { number: '50k+', label: 'Pedidos por Dia' },
    { number: '98%', label: 'Satisfação' },
    { number: '24/7', label: 'Suporte' }
  ];
  
  const differentials = [
    { icon: Zap, text: 'Carregamento rápido' },
    { icon: LayoutGrid, text: 'Gerenciamento total' },
    { icon: ShieldCheck, text: 'Segurança' },
    { icon: Headset, text: 'Suporte técnico' },
    { icon: Cloud, text: 'Totalmente em nuvem' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 py-20 md:py-28">
        <div className="absolute inset-0 bg-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <div className="space-y-4">
                <Badge className="gradient-orange text-white">
                  🚀 Plataforma SaaS Completa
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight text-shadow">
                  Revolucione seu
                  <span className="text-orange-500 block">Restaurante</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Sistema completo de gestão de pedidos, cardápio digital e delivery.
                  Tudo que você precisa para modernizar seu negócio em uma única plataforma.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="gradient-orange text-white font-bold hover:opacity-90 shadow-lg"
                  onClick={() => navigate('/pricing')}
                >
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100"
                  onClick={handleDemoClick}
                >
                  Ver Demonstração
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  <img  class="w-10 h-10 rounded-full border-2 border-white" alt="Avatar de cliente satisfeito 1" src="https://images.unsplash.com/photo-1649767590910-367f54f3d0e3" />
                  <img  class="w-10 h-10 rounded-full border-2 border-white" alt="Avatar de cliente satisfeito 2" src="https://images.unsplash.com/photo-1649767590910-367f54f3d0e3" />
                  <img  class="w-10 h-10 rounded-full border-2 border-white" alt="Avatar de cliente satisfeito 3" src="https://images.unsplash.com/photo-1649767590910-367f54f3d0e3" />
                  <img  class="w-10 h-10 rounded-full border-2 border-white" alt="Avatar de cliente satisfeito 4" src="https://images.unsplash.com/photo-1649767590910-367f54f3d0e3" />
                </div>
                <div>
                  <div className="flex items-center space-x-1 justify-center sm:justify-start">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Avaliado por 500+ restaurantes</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10">
                <img 
                  class="w-full h-auto rounded-2xl shadow-2xl animate-float"
                  alt="Dashboard do PedeAki Online mostrando interface moderna de gestão de restaurante" src="https://images.unsplash.com/photo-1556742504-16b083241fab" />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-orange-200 rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-orange-300 rounded-full opacity-30 animate-pulse-slow"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Nossos Diferenciais</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
            {differentials.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center space-y-3"
                >
                  <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8"/>
                  </div>
                  <p className="font-semibold text-gray-700">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quatro Interfaces Poderosas
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Cada interface foi cuidadosamente projetada para atender às necessidades específicas
              do seu negócio e proporcionar a melhor experiência para todos os usuários.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                class="w-full h-auto rounded-2xl shadow-xl"
                alt="Restaurante moderno usando sistema PedeAki Online com tablets e interface digital" src="https://images.unsplash.com/photo-1702154895119-56aca63008ad" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Por que escolher o PedeAki Online?
                </h2>
                <p className="text-lg md:text-xl text-gray-600">
                  Mais de 500 restaurantes já transformaram seus negócios com nossa plataforma.
                  Veja os resultados que você pode alcançar.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <Button
                size="lg"
                className="gradient-orange text-white font-bold hover:opacity-90 shadow-lg"
                onClick={() => navigate('/pricing')}
              >
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para revolucionar seu restaurante?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Junte-se a centenas de restaurantes que já aumentaram suas vendas e
              melhoraram a experiência dos clientes com o PedeAki Online.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-orange text-white font-bold hover:opacity-90 shadow-lg"
                onClick={() => navigate('/pricing', { state: { plan: 'Teste Grátis' } })}
              >
                Teste Grátis por 30 Dias
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
                onClick={handleDemoClick}
              >
                Falar com Especialista
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-8 pt-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Setup em 5 minutos</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Suporte especializado</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>ROI garantido</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">PedeAki Online</span>
            </div>

            <div className="text-gray-400 text-center md:text-right">
              <p>&copy; 2025 PedeAki Online. Todos os direitos reservados.</p>
              <p className="text-sm mt-1">Transformando restaurantes em todo o Brasil</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;