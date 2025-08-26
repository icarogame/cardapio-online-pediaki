
import { delay, getAuthenticatedUser } from '@/services/helpers.js';

let mockCustomers = [
    { 
        id: 1, 
        company_id: 'sabordivino_id', 
        name: 'João Silva', 
        email: 'joao.silva@example.com', 
        phone: '11987654321', 
        totalSpent: 150.75, 
        lastOrderDate: '2023-08-15', 
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cfd293ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjk3NTQ1NjY3fDA&ixlib=rb-4.0.3&q=80&w=200',
        loyaltyPoints: 75,
        totalOrders: 3,
        addresses: [
            { name: 'Casa', street: 'Rua das Flores', number: '123', neighborhood: 'Jardim Primavera', city: 'São Paulo' },
            { name: 'Trabalho', street: 'Avenida Principal', number: '456', neighborhood: 'Centro', city: 'São Paulo' },
        ],
        orderHistory: [
            { id: 'A123', total: 50.25, date: '2023-08-15', status: 'Entregue' },
            { id: 'B456', total: 100.50, date: '2023-08-10', status: 'Entregue' },
        ]
    },
    { 
        id: 2, 
        company_id: 'sabordivino_id', 
        name: 'Maria Oliveira', 
        email: 'maria.o@example.com', 
        phone: '11998765432', 
        totalSpent: 230.00, 
        lastOrderDate: '2023-08-20', 
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxmZW1hbGUlMjBwb3J0cmFpdHxlbnwwfHx8fDE2OTc1NDU2Njd8MA&ixlib=rb-4.0.3&q=80&w=200',
        loyaltyPoints: 115,
        totalOrders: 5,
        addresses: [
            { name: 'Casa', street: 'Rua dos Pássaros', number: '789', neighborhood: 'Vila Madalena', city: 'São Paulo' },
        ],
        orderHistory: [
            { id: 'C789', total: 230.00, date: '2023-08-20', status: 'Entregue' },
        ]
    },
    { 
        id: 3, 
        company_id: 'sabordivino_id', 
        name: 'Pedro Santos', 
        email: 'pedro.s@example.com', 
        phone: '11976543210', 
        totalSpent: 80.50, 
        lastOrderDate: '2023-08-10', 
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxtYWxlJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjk3NTQ1NjY3fDA&ixlib=rb-4.0.3&q=80&w=200',
        loyaltyPoints: 40,
        totalOrders: 2,
        addresses: [],
        orderHistory: []
    },
];

export const getCustomers = async (searchTerm = '') => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    await delay(500);
    console.log(`API: Buscando clientes para a empresa ${user.company_id} com termo: ${searchTerm}`);
    let companyCustomers = mockCustomers.filter(c => c.company_id === user.company_id);

    if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        companyCustomers = companyCustomers.filter(c => 
            c.name.toLowerCase().includes(lowerCaseSearchTerm) ||
            c.email.toLowerCase().includes(lowerCaseSearchTerm) ||
            (c.phone && c.phone.includes(lowerCaseSearchTerm))
        );
    }
    return Promise.resolve(companyCustomers);
};

export const createCustomer = async (customerData) => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    await delay(1000);
    console.log(`API: Criando cliente para a empresa ${user.company_id}`);
    const newCustomer = {
        id: Math.max(...mockCustomers.map(c => c.id), 0) + 1,
        ...customerData,
        company_id: user.company_id,
        totalSpent: 0,
        lastOrderDate: 'N/A',
        avatarUrl: customerData.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(customerData.name)}&background=random`,
        loyaltyPoints: 0,
        totalOrders: 0,
        addresses: [],
        orderHistory: []
    };
    mockCustomers.push(newCustomer);
    return Promise.resolve(newCustomer);
};

export const updateCustomer = async (customerId, customerData) => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    await delay(1000);
    const customerIndex = mockCustomers.findIndex(c => c.id === customerId && c.company_id === user.company_id);
    if (customerIndex > -1) {
        console.log(`API: Atualizando cliente ${customerId} para a empresa ${user.company_id}`);
        mockCustomers[customerIndex] = { ...mockCustomers[customerIndex], ...customerData };
        return Promise.resolve(mockCustomers[customerIndex]);
    }
    return Promise.reject(new Error("Cliente não encontrado ou permissão negada."));
};

export const deleteCustomer = async (customerId) => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    await delay(500);
    const initialLength = mockCustomers.length;
    mockCustomers = mockCustomers.filter(c => !(c.id === customerId && c.company_id === user.company_id));

    if (mockCustomers.length < initialLength) {
        console.log(`API: Deletando cliente ${customerId} da empresa ${user.company_id}`);
        return Promise.resolve();
    }
    return Promise.reject(new Error("Cliente não encontrado ou permissão negada."));
};
