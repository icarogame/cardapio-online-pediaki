
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import CustomerDetailModal from '@/components/admin/CustomerDetailModal';
import CustomerFormModal from '@/components/admin/CustomerFormModal';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from '@/services/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomersTab = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCustomers(searchTerm);
      setCustomers(data);
    } catch (error) {
      toast({
        title: "Erro ao buscar clientes",
        description: "Não foi possível carregar a lista de clientes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, toast]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchCustomers();
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailModalOpen(true);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setIsFormModalOpen(true);
  };
  
  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsFormModalOpen(true);
  };
  
  const openDeleteConfirmation = (customer) => {
    setCustomerToDelete(customer);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;

    try {
        await deleteCustomer(customerToDelete.id);
        toast({
            title: 'Cliente Excluído!',
            description: `${customerToDelete.name} foi removido com sucesso.`
        });
        fetchCustomers();
    } catch (error) {
        toast({
            title: 'Erro ao excluir cliente',
            description: error.message,
            variant: 'destructive'
        });
    } finally {
        setIsDeleteAlertOpen(false);
        setCustomerToDelete(null);
    }
  };


  const handleSaveCustomer = async (customerData) => {
    try {
      let savedCustomer;
      if (selectedCustomer) {
        savedCustomer = await updateCustomer(selectedCustomer.id, customerData);
        toast({
          title: 'Cliente Atualizado!',
          description: `${savedCustomer.name} foi atualizado com sucesso.`,
        });
      } else {
        savedCustomer = await createCustomer(customerData);
        toast({
          title: 'Cliente Adicionado!',
          description: `${savedCustomer.name} foi adicionado com sucesso.`,
        });
      }
      fetchCustomers();
      setIsFormModalOpen(false);
    } catch (error) {
       toast({
        title: 'Erro ao salvar cliente',
        description: 'Ocorreu um problema ao salvar os dados do cliente.',
        variant: "destructive"
      });
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '';
  };

  const CustomerCard = ({ customer }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage src={customer.avatarUrl} alt={customer.name} />
            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-gray-900">{customer.name}</p>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Total Gasto:</span>
            <span className="font-medium">R$ {customer.totalSpent.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Último Pedido:</span>
            <span className="font-medium">{customer.lastOrderDate}</span>
          </div>
        </div>
        <div className="flex justify-end items-center gap-1 mt-4">
          <Button variant="ghost" size="icon" onClick={() => handleViewDetails(customer)}>
            <Eye className="w-5 h-5 text-blue-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleEditCustomer(customer)}>
            <Edit className="w-5 h-5 text-yellow-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => openDeleteConfirmation(customer)}>
            <Trash2 className="w-5 h-5 text-red-600" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Clientes</h2>
          <p className="text-gray-600">Visualize e gerencie as informações dos seus clientes.</p>
        </div>
        <Button 
          className="gradient-orange text-white border-0 w-full sm:w-auto"
          onClick={handleAddCustomer}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar cliente por nome ou email..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </form>
      </div>
      
      {/* Desktop Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead className="text-right">Total Gasto</TableHead>
              <TableHead className="text-center">Último Pedido</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Carregando clientes...
                </TableCell>
              </TableRow>
            ) : customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                        <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell className="text-right font-medium">R$ {customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="text-center">{customer.lastOrderDate}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(customer)}>
                        <Eye className="w-5 h-5 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditCustomer(customer)}>
                        <Edit className="w-5 h-5 text-yellow-600" />
                      </Button>
                       <Button variant="ghost" size="icon" onClick={() => openDeleteConfirmation(customer)}>
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
               <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {isLoading ? (
          <p className="col-span-full text-center">Carregando clientes...</p>
        ) : customers.length > 0 ? (
          customers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))
        ) : (
          <p className="col-span-full text-center">Nenhum cliente encontrado.</p>
        )}
      </div>

      {selectedCustomer && (
        <CustomerDetailModal
          isOpen={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          customer={selectedCustomer}
        />
      )}
      
      <CustomerFormModal
        isOpen={isFormModalOpen}
        onOpenChange={setIsFormModalOpen}
        customer={selectedCustomer}
        onSave={handleSaveCustomer}
      />

       <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá excluir permanentemente o cliente 
                        <span className="font-bold"> {customerToDelete?.name}</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Excluir</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
};

export default CustomersTab;
