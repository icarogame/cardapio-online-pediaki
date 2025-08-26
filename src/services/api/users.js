
import { delay, getAuthenticatedUser } from '@/services/helpers.js';

let mockUsers = [
    { id: 1, company_id: 'sabordivino_id', name: 'Admin Master', email: 'admin@sabordivino.com', role: 'Administrador' },
    { id: 2, company_id: 'sabordivino_id', name: 'Ana Carolina', email: 'ana.carolina@atendente.com', role: 'Atendente' },
    { id: 3, company_id: 'sabordivino_id', name: 'Carlos Oliveira', email: 'carlos.oliveira@entregador.com', role: 'Entregador' },
];


export const createUser = async (userData) => {
    const adminUser = getAuthenticatedUser();
    if (!adminUser || !adminUser.company_id) {
        return Promise.reject(new Error("Ação não autorizada."));
    }
    await delay(1000);
    console.log(`API: Admin ${adminUser.email} criando usuário para a empresa ${adminUser.company_id}`);
    const newUser = {
        id: Math.max(...mockUsers.map(u => u.id), 0) + 1,
        ...userData,
        company_id: adminUser.company_id
    };
    mockUsers.push(newUser);
    return Promise.resolve(newUser);
};
