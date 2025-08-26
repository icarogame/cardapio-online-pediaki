import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import ProductFormModal from './ProductFormModal';
import { getMenuItems, createProduct, updateProduct, deleteProduct } from '@/services/api';

const MenuTab = () => {
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
        setLoading(true);
        try {
            const data = await getMenuItems();
            setMenuItems(data);
        } catch (error) {
            toast({ title: "Erro ao buscar cardápio", description: error.message, variant: "destructive" });
        }
        setLoading(false);
    };
    fetchMenu();
  }, [toast]);

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    try {
        await deleteProduct(productId);
        setMenuItems(menuItems.filter(item => item.id !== productId));
        toast({ title: "Item excluído com sucesso!", className: "bg-green-100 text-green-800" });
    } catch (error) {
        toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    }
  };
  
  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.id, productData);
        setMenuItems(menuItems.map(item => item.id === editingProduct.id ? updated : item));
        toast({ title: "Produto atualizado com sucesso!", className: "bg-green-100 text-green-800" });
      } else {
        const newProduct = await createProduct(productData);
        setMenuItems([...menuItems, newProduct]);
        toast({ title: "Produto adicionado com sucesso!", className: "bg-green-100 text-green-800" });
      }
    } catch (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    }
  };

  if (loading) {
      return <div>Carregando cardápio...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Gestão do Cardápio</h2>
        <Button 
          className="gradient-orange text-white border-0"
          onClick={handleAddNew}
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Item
        </Button>
      </div>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                <div className="flex items-center space-x-4 flex-grow">
                  <img   
                    className="w-16 h-16 object-cover rounded-lg hidden sm:block" 
                    alt={`${item.name} - item do cardápio`}
                    src={item.imageUrl || "https://images.unsplash.com/photo-1697862040431-f149c8e1ac9d"} />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                        <p className="font-medium">{item.name}</p>
                        {item.is_featured && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                              <Star className="w-3 h-3 mr-1"/> Destaque
                          </Badge>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm text-gray-500">{item.sales} vendas hoje</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between">
                  <span className="font-bold text-orange-600">R$ {item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                      <Badge className={item.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {item.isAvailable ? 'Disponível' : 'Esgotado'}
                      </Badge>
                      {item.stock_quantity !== null && item.stock_quantity !== undefined && (
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Package className="w-3 h-3"/> {item.stock_quantity}
                        </Badge>
                      )}
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={() => handleEdit(item)}
                      className="h-8 w-8 sm:h-auto sm:w-auto sm:px-3"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                     <AlertDialog>
                      <AlertDialogTrigger asChild>
                         <Button 
                          size="icon" 
                          variant="outline"
                          className="h-8 w-8 sm:h-auto sm:w-auto sm:px-3 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Essa ação não pode ser desfeita. Isso excluirá permanentemente o item do cardápio.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-500 hover:bg-red-600">Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <ProductFormModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
};

export default MenuTab;