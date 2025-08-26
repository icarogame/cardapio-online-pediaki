
import { delay, getAuthenticatedUser } from '@/services/helpers.js';

let mockOrders = [
  {
    id: '#PIX01',
    company_id: 'sabordivino_id',
    customer: 'Fernanda Souza',
    items: '2x Açaí 500ml',
    total: 'R$ 51,80',
    status: 'Aguardando Confirmação',
    paymentMethod: 'PIX',
    paymentStatus: 'Pendente',
    proofUrl: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf',
    time: '10:45'
  },
  {
    id: '#001',
    company_id: 'sabordivino_id',
    customer: 'Maria Silva',
    items: 'Hambúrguer + Batata',
    total: 'R$ 35,90',
    status: 'Preparando',
    paymentMethod: 'Cartão na Entrega',
    paymentStatus: 'Pendente',
    proofUrl: null,
    time: '10:30'
  },
];

export const createOrder = async (orderData) => {
  const user = getAuthenticatedUser();
  if (!user || !user.company_id) {
      console.warn("Usuário não autenticado, criando pedido para 'sabordivino_id' como fallback");
  }
  
  await delay(1000);
  const companyId = user?.company_id || 'sabordivino_id';
  console.log(`API: Criando pedido para a empresa ${companyId}`);
  
  const newOrder = { 
    id: `#${Math.floor(Math.random() * 10000)}`, 
    ...orderData,
    company_id: companyId,
    number: (mockOrders.filter(o => o.company_id === companyId).length) + 1,
  };
  mockOrders.push(newOrder);
  return Promise.resolve(newOrder);
};

export const getOrders = async () => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    await delay(500);
    console.log(`API: Buscando pedidos para a empresa ${user.company_id}`);
    const companyOrders = mockOrders.filter(o => o.company_id === user.company_id);
    return Promise.resolve(companyOrders);
};

export const updateOrderStatus = async (orderId, updates) => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    await delay(300);
    const orderIndex = mockOrders.findIndex(o => o.id === orderId && o.company_id === user.company_id);
    if (orderIndex > -1) {
        console.log(`API: Atualizando status do pedido ${orderId} para a empresa ${user.company_id}`);
        mockOrders[orderIndex] = { ...mockOrders[orderIndex], ...updates };
        return Promise.resolve(mockOrders[orderIndex]);
    }
    return Promise.reject(new Error("Pedido não encontrado ou permissão negada."));
};
