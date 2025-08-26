
import React, { useState } from 'react';
import { Plus, Edit, Trash2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import AddUserModal from '@/components/admin/AddUserModal';
import { createUser } from '@/services/api';

const initialUsers = [
  {
    id: 1,
    name: 'Admin Master',
    email: 'admin@menuflow.com',
    role: 'Administrador'
  },
  {
    id: 2,
    name: 'Ana Carolina',
    email: 'ana.carolina@atendente.com',
    role: 'Atendente'
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@entregador.com',
    role: 'Entregador'
  },
  {
    id: 4,
    name: 'Bruno Alves',
    email: 'bruno.alves@atendente.com',
    role: 'Atendente'
  },
];

const getRoleBadge = (role) => {
  switch (role) {
    case 'Administrador':
      return 'bg-red-100 text-red-800';
    case 'Atendente':
      return 'bg-blue-100 text-blue-800';
    case 'Entregador':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const UserManagementTab = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const handleFeatureClick = (feature) => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
      duration: 3000,
    });
  };

  const handleAddUser = async (newUser) => {
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      toast({
        title: "Usuário Adicionado!",
        description: `${createdUser.name} foi adicionado com sucesso.`,
        className: "bg-green-100 text-green-800"
      });
    } catch (error) {
       toast({
        title: "Erro ao adicionar usuário",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Usuários</h2>
        <Button 
          className="gradient-orange text-white border-0"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Novo Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usuários Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Nome</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Função</th>
                  <th scope="col" className="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                      <UserCircle className="w-6 h-6 mr-3 text-gray-400" />
                      {user.name}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <Badge className={getRoleBadge(user.role)}>{user.role}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex space-x-2 justify-end">
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={() => handleFeatureClick('edit-user')}
                          className="h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="outline"
                          onClick={() => handleFeatureClick('delete-user')}
                          className="h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <AddUserModal 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default UserManagementTab;
