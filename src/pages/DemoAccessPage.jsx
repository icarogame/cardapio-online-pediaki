
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const DemoAccessPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula uma chamada de API para buscar as credenciais
    const fetchDemoCredentials = async () => {
      setLoading(true);
      // Em um cenário real, isso seria uma chamada para o Supabase
      // const { data, error } = await supabase.from('landing_page_content').select('demo_email, demo_password').single();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula o delay da rede
      
      // Dados mockados por enquanto
      const mockData = {
        email: 'demo@pedeaki.online',
        password: 'demo_password',
      };
      
      setCredentials(mockData);
      setLoading(false);
    };

    fetchDemoCredentials();
  }, []);

  const handleAccessDemo = () => {
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Acesso à Demonstração - MenuFlow</title>
        <meta name="description" content="Acesse o ambiente de demonstração do MenuFlow com credenciais pré-definidas." />
        <meta property="og:title" content="Acesso à Demonstração - MenuFlow" />
        <meta property="og:description" content="Acesse o ambiente de demonstração do MenuFlow com credenciais pré-definidas." />
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-pattern">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full shadow-2xl text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900">Acesse nossa Demonstração</CardTitle>
              <CardDescription className="text-lg text-gray-600 mt-2">
                Use as credenciais abaixo para entrar e explorar todas as funcionalidades do MenuFlow.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center space-y-4 h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                  <p className="text-muted-foreground">Carregando credenciais...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Mail className="h-6 w-6 text-orange-500" />
                    <div className="text-lg font-semibold text-gray-800">
                      Email de Acesso: <span className="font-normal text-gray-600">{credentials.email}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <Lock className="h-6 w-6 text-orange-500" />
                    <div className="text-lg font-semibold text-gray-800">
                      Senha: <span className="font-normal text-gray-600">{credentials.password}</span>
                    </div>
                  </div>
                </div>
              )}
              <Button
                onClick={handleAccessDemo}
                className="w-full h-12 text-lg gradient-orange text-white mt-6"
                disabled={loading}
              >
                Acessar o Painel Demo Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default DemoAccessPage;
