
import { delay, getAuthenticatedUser } from '@/services/helpers.js';
import { menuItems as mockMenuItems } from '@/data/menuData.js';

let mockProducts = [...mockMenuItems];

export const getMenuItems = async () => {
  await delay(500);
  return Promise.resolve(mockProducts);
};

export const createProduct = async (productData) => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado. Faça login novamente."));
    }
    
    console.log(`API: Criando produto para a empresa ${user.company_id}`);
    await delay(1000);
    const newProduct = { 
        ...productData, 
        id: Date.now(), 
        company_id: user.company_id,
        sales: 0 
    };
    mockProducts.push(newProduct);
    return Promise.resolve(newProduct);
};

export const updateProduct = async (productId, productData) => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    
    await delay(1000);
    const productIndex = mockProducts.findIndex(p => p.id === productId && p.company_id === user.company_id);
    if (productIndex > -1) {
        console.log(`API: Atualizando produto ${productId} para a empresa ${user.company_id}`);
        mockProducts[productIndex] = { ...mockProducts[productIndex], ...productData };
        return Promise.resolve(mockProducts[productIndex]);
    }
    return Promise.reject(new Error("Produto não encontrado ou permissão negada."));
}

export const deleteProduct = async (productId) => {
    const user = getAuthenticatedUser();
     if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    await delay(500);
    const initialLength = mockProducts.length;
    mockProducts = mockProducts.filter(p => !(p.id === productId && p.company_id === user.company_id));

    if (mockProducts.length < initialLength) {
        console.log(`API: Deletando produto ${productId} da empresa ${user.company_id}`);
        return Promise.resolve();
    }
    return Promise.reject(new Error("Produto não encontrado ou permissão negada."));
}
