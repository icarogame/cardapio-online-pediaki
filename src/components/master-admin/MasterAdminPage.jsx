
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Building, Users, BarChart, Settings, PlusCircle, Pencil, Trash2, LayoutTemplate, PackageCheck, CreditCard, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LandingPageManager from '@/components/master-admin/LandingPageManager';
import EditCompanyModal from '@/components/master-admin/EditCompanyModal';
import PlatformPlansManager from '@/components/master-admin/PlatformPlansManager';
import CheckoutSettingsManager from '@/components/master-admin/CheckoutSettingsManager';
import { uploadCompanyThumbnail, updateCompany } from '@/services/api/company';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MasterAdminPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('companies');
  const [newCompany, setNewCompany] = useState({
    name: '',
    sublink: '',
    adminEmail: '',
    tempPassword: ''
  });
  
  const [registeredCompanies, setRegisteredCompanies] = useState([
    { id: 1, name: 'Sabor Divino', sublink: 'sabordivino', adminEmail: 'admin@sabordivino.com', thumbnail_url: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU2MTR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0MjI5ODZ8&ixlib=rb-4.0.3&q=80&w=1080' },
    { id: 2, name: 'Pizza Express', sublink: 'pizzaexpress', adminEmail: 'contato@pizzaexpress.com', thumbnail_url: '' },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const tabs = [
    { id: 'companies', name: 'Gerenciar Empresas', icon: Building },
    { id: 'landing-page', name: 'Gerenciar Página Inicial', icon: LayoutTemplate },
    { id: 'plans', name: 'Gerenciar Planos', icon: PackageCheck },
    { id: 'checkout', name: 'Configurar Checkout', icon: CreditCard },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewCompany(prev => ({ ...prev, [id]: value }));
  };

  const handleRegisterCompany = (e) => {
    e.preventDefault();
    const newCompanyData = {
      id: registeredCompanies.length + 1,
      ...newCompany,
      thumbnail_url: ''
    }
    setRegisteredCompanies([...registeredCompanies, newCompanyData]);
    console.log("Registering new company:", newCompanyData);
    toast({
      title: "Empresa Cadastrada! 🚀",
      description: `A empresa ${newCompany.name} foi criada com sucesso.`,
    });
    setNewCompany({ name: '', sublink: '', adminEmail: '', tempPassword: '' });
  };
  
  const handleEditClick = (company) => {
    setEditingCompany(company);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = async (updatedData) => {
    try {
        let thumbnailUrl = updatedData.thumbnail_url;

        if (updatedData.thumbnailFile) {
            toast({ title: 'Enviando imagem...', description: 'Aguarde enquanto a miniatura é enviada.' });
            const { publicUrl, error } = await uploadCompanyThumbnail(updatedData.id, updatedData.thumbnailFile);
            if (error) throw new Error(error.message);
            thumbnailUrl = publicUrl;
            toast({ title: 'Sucesso!', description: 'Miniatura enviada com sucesso.' });
        }

        const companyToUpdate = {
            id: updatedData.id,
            name: updatedData.name,
            sublink: updatedData.sublink,
            adminEmail: updatedData.adminEmail,
            thumbnail_url: thumbnailUrl,
        };
        
        await updateCompany(companyToUpdate);
        
        setRegisteredCompanies(prev => prev.map(c => c.id === updatedData.id ? companyToUpdate : c));
        
        toast({
            title: "Alterações Salvas! ✨",
            description: `Os dados da empresa ${updatedData.name} foram atualizados.`,
        });

    } catch (error) {
        console.error("Erro ao salvar alterações:", error);
        toast({
            title: "Erro ao Salvar",
            description: `Não foi possível salvar as alterações. ${error.message}`,
            variant: "destructive",
        });
    } finally {
        setIsEditModalOpen(false);
    }
  };

  const handleDeleteClick = (companyName) => {
    toast({
      title: 'Ação: Desativar',
      description: `🚧 Funcionalidade para desativar a empresa ${companyName} ainda não implementada.`,
    });
  };

  const CompanyCard = ({ company }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <img-replace
            src={company.thumbnail_url || 'https://via.placeholder.com/64x33'}
            alt={`Miniatura de ${company.name}`}
            className="w-16 h-auto rounded-md object-cover bg-gray-200"
          />
          <div>
            <p className="font-bold text-gray-900">{company.name}</p>
            <a href={`http://pedeaki.online/${company.sublink}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
              pedeaki.online/{company.sublink}
            </a>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Admin:</span>
            <span className="font-medium truncate">{company.adminEmail}</span>
          </div>
        </div>
        <div className="flex justify-end items-center gap-1 mt-4">
          <Button variant="ghost" size="icon" onClick={() => handleEditClick(company)}>
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(company.name)}>
            <Trash2 className="w-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <>
      <Helmet>
        <title>Super Admin - PedeAki Online</title>
        <meta name="description" content="Painel de Super Admin para gerenciamento da plataforma PedeAki Online." />
      </Helmet>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Painel do Super Admin</h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Restaurantes</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{registeredCompanies.length}</div>
                <p className="text-xs text-muted-foreground">Total de restaurantes ativos</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários Totais</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">+180.1% do último mês</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$12,234.89</div>
                <p className="text-xs text-muted-foreground">+19% do último mês</p>
              </CardContent>
            </Card>
             <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Configurações</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Gerenciar</div>
                <p className="text-xs text-muted-foreground">Configurações da plataforma</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {activeTabInfo && (
                      <>
                        <span className="flex items-center">
                          <activeTabInfo.icon className="w-5 h-5 mr-2" />
                          {activeTabInfo.name}
                        </span>
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-w-[calc(100vw-2rem)]">
                  {tabs.map((tab) => (
                    <DropdownMenuItem key={tab.id} onSelect={() => setActiveTab(tab.id)}>
                      <tab.icon className="w-4 h-4 mr-2" />
                      <span>{tab.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <TabsList className="hidden sm:grid w-full grid-cols-2 md:grid-cols-4">
              {tabs.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="companies" className="mt-6">
              <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Cadastrar Nova Empresa
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRegisterCompany} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                            <div className="lg:col-span-1">
                                <Label htmlFor="name">Nome da Empresa</Label>
                                <Input id="name" placeholder="Ex: Sabor Divino" value={newCompany.name} onChange={handleInputChange} required />
                            </div>
                            <div className="lg:col-span-1">
                                <Label htmlFor="sublink">Sublink</Label>
                                <div className="flex items-center">
                                    <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-2 rounded-l-md border border-r-0 h-10 flex items-center">pedeaki.online/</span>
                                    <Input id="sublink" placeholder="sabordivino" className="rounded-l-none" value={newCompany.sublink} onChange={handleInputChange} required />
                                </div>
                            </div>
                             <div className="lg:col-span-1">
                                <Label htmlFor="adminEmail">Email do Administrador</Label>
                                <Input id="adminEmail" type="email" placeholder="admin@sabordivino.com" value={newCompany.adminEmail} onChange={handleInputChange} required />
                            </div>
                             <div className="lg:col-span-1">
                                <Label htmlFor="tempPassword">Senha Provisória</Label>
                                <Input id="tempPassword" type="password" placeholder="********" value={newCompany.tempPassword} onChange={handleInputChange} required />
                            </div>
                            <Button type="submit" className="w-full lg:w-auto gradient-orange text-white" size="lg">
                                Cadastrar
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Empresas Cadastradas</CardTitle>
                    <CardDescription>Gerencie as empresas existentes na plataforma.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="hidden md:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Miniatura</TableHead>
                            <TableHead>Nome da Empresa</TableHead>
                            <TableHead>Sublink</TableHead>
                            <TableHead>Administrador (Email)</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {registeredCompanies.map((company) => (
                            <TableRow key={company.id}>
                              <TableCell>
                                  <img-replace
                                    src={company.thumbnail_url || 'https://via.placeholder.com/64x33'}
                                    alt={`Miniatura de ${company.name}`}
                                    className="w-16 h-auto rounded-md object-cover bg-gray-200"
                                  />
                              </TableCell>
                              <TableCell className="font-medium">{company.name}</TableCell>
                              <TableCell>
                                <a href={`http://pedeaki.online/${company.sublink}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  pedeaki.online/{company.sublink}
                                </a>
                              </TableCell>
                              <TableCell>{company.adminEmail}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => handleEditClick(company)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(company.name)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                      {registeredCompanies.map((company) => (
                        <CompanyCard key={company.id} company={company} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="landing-page" className="mt-6">
              <LandingPageManager />
            </TabsContent>
            <TabsContent value="plans" className="mt-6">
                <PlatformPlansManager />
            </TabsContent>
            <TabsContent value="checkout" className="mt-6">
                <CheckoutSettingsManager />
            </TabsContent>
          </Tabs>

        </motion.div>
        
        {editingCompany && (
          <EditCompanyModal
            isOpen={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
            company={editingCompany}
            onSave={handleSaveChanges}
          />
        )}
      </div>
    </>
  );
};

export default MasterAdminPage;
