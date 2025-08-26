
import React from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Navigation2, Package, User, Phone, CreditCard, ChevronLeft, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { deliveryTasks } from '@/data/deliveryData';

const DeliveryOrderDetailPage = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const { toast } = useToast();
    
    // In a real app, you would fetch this data based on orderId
    const order = location.state?.order || deliveryTasks.find(t => t.id === orderId);

    const handleViewRoute = (address) => {
        toast({
        title: 'Rota Traçada!',
        description: `Abrindo mapa para: ${address}`,
        duration: 3000,
        });
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
    };

    const handleUpdateStatus = (status) => {
      toast({
        title: "Status Atualizado!",
        description: `O pedido foi marcado como "${status}".`,
        duration: 3000
      });
      // Here you would typically update the state in your backend
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Pedido não encontrado</h1>
                    <Link to="/delivery-person">
                        <Button>Voltar para Minhas Entregas</Button>
                    </Link>
                </div>
            </div>
        );
    }
  
    return (
        <div className="min-h-screen bg-gray-50 p-4 font-sans">
            <div className="max-w-md mx-auto">
                <header className="flex items-center mb-6">
                    <Link to="/delivery-person">
                        <Button variant="ghost" size="icon" className="mr-2">
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Detalhes da Entrega</h1>
                </header>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="shadow-lg overflow-hidden">
                        <CardHeader className="bg-gray-50 p-4">
                            <CardTitle className="text-lg font-bold">Pedido {order.id}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 space-y-5">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center"><User className="w-5 h-5 mr-2 text-orange-500" /> Cliente</h3>
                                <p className="text-gray-600 ml-7">{order.customer}</p>
                                <p className="text-gray-600 ml-7 flex items-center mt-1"><Phone className="w-4 h-4 mr-2" />{order.phone}</p>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center"><MapPin className="w-5 h-5 mr-2 text-orange-500" /> Endereço</h3>
                                <p className="text-gray-600 ml-7">{order.address}</p>
                            </div>

                             <div>
                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center"><Package className="w-5 h-5 mr-2 text-orange-500" /> Itens do Pedido</h3>
                                <ul className="list-disc list-inside ml-7 text-gray-600">
                                    {order.items.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>

                             <div>
                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center"><CreditCard className="w-5 h-5 mr-2 text-orange-500" /> Pagamento</h3>
                                <p className="text-gray-600 ml-7">{order.paymentMethod}</p>
                            </div>
                            
                            <div className="border-t pt-4 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-800 flex items-center"><DollarSign className="w-5 h-5 mr-2 text-orange-500" /> Total a Cobrar</h3>
                                <p className="text-xl font-bold text-green-600">{order.amount}</p>
                            </div>

                        </CardContent>
                        <CardFooter className="p-0">
                           <Button 
                              className="w-full rounded-none rounded-b-lg gradient-orange text-white py-8 text-lg"
                              onClick={() => handleViewRoute(order.address)}
                            >
                              <Navigation2 className="w-6 h-6 mr-3" />
                              VER ROTA NO MAPA
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <Button variant="outline" size="lg" className="py-6 text-base" onClick={() => handleUpdateStatus('Retirado')}>
                           <Truck className="w-5 h-5 mr-2" /> Pedido Retirado
                        </Button>
                        <Button size="lg" className="py-6 text-base bg-green-600 hover:bg-green-700 text-white" onClick={() => handleUpdateStatus('Entregue')}>
                           <CheckCircle className="w-5 h-5 mr-2" /> Pedido Entregue
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DeliveryOrderDetailPage;
