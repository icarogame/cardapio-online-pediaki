import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Mail, Lock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth, getRedirectPathByRole } from '@/contexts/AuthContext.jsx';

// Simulação de banco de dados de usuários para demonstração da lógica de roles
const mockUsers = {
  'super@pedeaki.online': {
    email: 'super@pedeaki.online',
    name: 'Super Admin',
    role: 'SUPER_ADMIN',
    company_id: null,
  },
  'admin@sabordivino.com': {
    email: 'admin@sabordivino.com',
    name: 'Admin Sabor Divino',
    role: 'COMPANY_ADMIN',
    company_id: 'sabordivino_id',
  },
  'atendente@sabordivino.com': {
    email: 'atendente@sabordivino.com',
    name: 'Atendente Sabor Divino',
    role: 'ATTENDANT',
    company_id: 'sabordivino_id',
  },
  'entregador@sabordivino.com': {
    email: 'entregador@sabordivino.com',
    name: 'Entregador Sabor Divino',
    role: 'DRIVER',
    company_id: 'sabordivino_id',
  },
};

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Lógica de autenticação com base no mock de usuários
    // A senha é ignorada para simplificar a demonstração
    const user = mockUsers[email.toLowerCase()];

    if (user) {
      const redirectPath = login(user); // O login agora retorna o caminho de redirecionamento
      toast({
        title: "Login bem-sucedido!",
        description: `Bem-vindo, ${user.name}! Redirecionando...`,
        className: "bg-green-100 text-green-800"
      });
      // Redireciona para o local de origem ou para o painel padrão
      const from = location.state?.from?.pathname || redirectPath;
      navigate(from, { replace: true });
    } else {
      toast({
        title: "Erro de Login",
        description: "Email ou senha inválidos. Verifique os emails de teste abaixo.",
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleDemoAccess = (sublink) => {
    navigate(`/${sublink}`);
  };

  const quickLogin = (demoEmail) => {
    const user = mockUsers[demoEmail];
    if (user) {
        const redirectPath = login(user);
        toast({
            title: "Acesso de Demonstração!",
            description: `Logando como ${user.role}. Redirecionando...`,
            className: "bg-blue-100 text-blue-800"
        });
        navigate(redirectPath, { replace: true });
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-pattern">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-20 h-20 gradient-orange rounded-full flex items-center justify-center mb-4">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Acesso à Plataforma</CardTitle>
            <CardDescription>Entre com suas credenciais ou use os acessos de teste.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Qualquer senha funciona para teste"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-lg gradient-orange text-white" disabled={loading}>
                {loading ? 'Entrando...' : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Entrar
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 p-6 pt-0">
             <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Acesso Rápido de Teste
                </span>
              </div>
            </div>
            <div className='w-full grid grid-cols-2 gap-2 text-xs'>
              <Button onClick={() => quickLogin('super@pedeaki.online')} variant="outline">Super Admin</Button>
              <Button onClick={() => quickLogin('admin@sabordivino.com')} variant="outline">Admin Loja</Button>
              <Button onClick={() => quickLogin('atendente@sabordivino.com')} variant="outline">Atendente (PDV)</Button>
              <Button onClick={() => quickLogin('entregador@sabordivino.com')} variant="outline">Entregador</Button>
            </div>
             <Button
              onClick={() => handleDemoAccess('sabordivino')}
              variant="outline"
              className="w-full"
            >
              Ver Cardápio (Cliente Final)
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;