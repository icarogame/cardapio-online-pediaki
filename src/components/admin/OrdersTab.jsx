
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, FileText, Truck, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getOrders, updateOrderStatus } from '@/services/api.js';

const getStatusPill = (status) => {
  switch (status) {
    case 'Aguardando Confirmação':
      return <Badge variant="destructive" className="bg-orange-100 text-orange-800 border-orange-200">Aguardando Confirmação</Badge>;
    case 'Preparando':
      return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Preparando</Badge>;
    case 'Pronto para Entrega':
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Pronto para Entrega</Badge>;
    case 'Entregue':
      return <Badge className="bg-green-100 text-green-800 border-green-200">Entregue</Badge>;
    case 'Pagamento Recusado':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 border-red-200">Pagamento Recusado</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPaymentStatusPill = (status) => {
    switch (status) {
      case 'Pendente':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Pendente</Badge>;
      case 'Confirmado':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Confirmado</Badge>;
      case 'Recusado':
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Recusado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

const OrdersTab = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        setOrders(data);
      } catch(error) {
        toast({ title: "Erro ao buscar pedidos", description: error.message, variant: "destructive" });
        setOrders([]);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [toast]);

  const handleUpdateStatus = async (orderId, updates) => {
    try {
        const updatedOrder = await updateOrderStatus(orderId, updates);
        const updatedOrders = orders.map(order => order.id === orderId ? updatedOrder : order);
        setOrders(updatedOrders);
        return updatedOrder;
    } catch (error) {
        toast({ title: "Erro ao atualizar pedido", description: error.message, variant: "destructive" });
        return null;
    }
  };

  const handleConfirmPayment = async (orderId) => {
    const updatedOrder = await handleUpdateStatus(orderId, { paymentStatus: 'Confirmado', status: 'Preparando' });
    if(updatedOrder){
        toast({
            title: "Pagamento Confirmado!",
            description: `O pedido ${orderId} foi movido para "Preparando".`,
            className: "bg-green-100 text-green-800"
        });
    }
  };

  const handleDeclinePayment = async (orderId) => {
    const updatedOrder = await handleUpdateStatus(orderId, { paymentStatus: 'Recusado', status: 'Pagamento Recusado' });
    if(updatedOrder) {
        toast({
            title: "Pagamento Recusado!",
            description: `O pagamento do pedido ${orderId} foi recusado.`,
            variant: "destructive"
        });
    }
  };
  
  const handleAssignDelivery = (orderId) => {
     toast({
      title: "🚧 Ação em desenvolvimento!",
      description: "A funcionalidade de atribuir entregadores será implementada em breve.",
    });
  }

  if (loading) {
    return <div>Carregando pedidos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Pedidos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length === 0 && !loading && (
            <p className="col-span-full text-center text-gray-500">Nenhum pedido encontrado para sua loja.</p>
        )}
        {orders.map((order) => (
          <Card key={order.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{order.id}</span>
                {getStatusPill(order.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <div>
                <p className="font-medium">{order.customer}</p>
                <p className="text-sm text-gray-500">{order.items}</p>
              </div>
              <div className="flex justify-between items-center text-sm border-t pt-3">
                <span className="text-gray-600">Pagamento:</span>
                {getPaymentStatusPill(order.paymentStatus)}
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Método:</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold border-t pt-3">
                <span>Total:</span>
                <span className="text-orange-600">{order.total}</span>
              </div>
            </CardContent>
            <div className="p-4 border-t flex flex-col sm:flex-row gap-2">
              {order.paymentMethod === 'PIX' && order.paymentStatus === 'Pendente' && (
                <>
                  <Button asChild variant="outline" className="flex-1">
                    <a href={order.proofUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" /> Ver Comprovante
                    </a>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-red-500 hover:bg-red-600 text-white flex-1">
                        <XCircle className="w-4 h-4 mr-2" /> Recusar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Recusar Pagamento?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação marcará o pagamento como recusado. O pedido não seguirá para produção.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeclinePayment(order.id)} className="bg-red-500 hover:bg-red-600">Sim, Recusar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className="bg-green-500 hover:bg-green-600 text-white flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" /> Confirmar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Pagamento?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Você verificou o recebimento do valor de {order.total} na conta da loja? Esta ação moverá o pedido para a produção.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleConfirmPayment(order.id)} className="bg-green-500 hover:bg-green-600">Sim, Confirmar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
              {order.status === 'Pronto para Entrega' && (
                 <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full" onClick={() => handleAssignDelivery(order.id)}>
                    <Truck className="w-4 h-4 mr-2" /> Atribuir Entregador
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersTab;
