
import { delay, getAuthenticatedUser } from '@/services/helpers.js';
import supabase from '@/services/supabaseClient.js';

let mockCompanies = {
    'sabordivino': {
        id: 1,
        name: 'Sabor Divino',
        sublink: 'sabordivino',
        adminEmail: 'admin@sabordivino.com',
        thumbnail_url: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU2MTR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTk0MjI5ODZ8&ixlib=rb-4.0.3&q=80&w=1080',
        phone: '11987654321',
        address: 'Rua das Delícias, 123, Centro, Saborlândia - SP, 12345-678',
        workingHours: 'Segunda a Domingo, das 14h às 23h',
    },
    'pizzaexpress': {
        id: 2,
        name: 'Pizza Express',
        sublink: 'pizzaexpress',
        adminEmail: 'contato@pizzaexpress.com',
        thumbnail_url: '',
        phone: '21912345678',
        address: 'Avenida das Pizzas, 456, Saborlândia - SP',
        workingHours: 'Terça a Domingo, das 18h às 00h',
    }
};

let mockCompanySettings = {
    '1': {
        name: 'Sabor Divino',
        sublink: 'sabordivino',
        phone: '11987654321', 
        address: 'Rua das Delícias, 123, Centro, Saborlândia - SP, 12345-678',
        workingHours: 'Segunda a Domingo, das 14h às 23h',
    },
    '2': {
         name: 'Pizza Express',
        sublink: 'pizzaexpress',
        phone: '21912345678',
        address: 'Avenida das Pizzas, 456, Saborlândia - SP',
        workingHours: 'Terça a Domingo, das 18h às 00h',
    }
};

export const getCompanyBySublink = async (sublink) => {
    await delay(300);
    const company = mockCompanies[sublink];
    if (company) {
        return Promise.resolve(company);
    }
    return Promise.reject(new Error("Empresa não encontrada"));
}

export const getCompanySettings = async () => {
    const user = getAuthenticatedUser();
    // Fallback for public menu page where user might not be logged in
    const companyId = user?.company_id || '1'; // Defaulting to Sabor Divino
    await delay(200);
    return Promise.resolve(mockCompanySettings[companyId] || {});
};

export const updateCompanySettings = async (settingsData) => {
    const user = getAuthenticatedUser();
    if (!user || !user.company_id) {
        return Promise.reject(new Error("Não autorizado."));
    }
    await delay(1000);
    console.log(`API: Atualizando configurações para a empresa ${user.company_id}`);
    mockCompanySettings[user.company_id] = { ...mockCompanySettings[user.company_id], ...settingsData };
    
    // also update the main company object
    const companyToUpdate = Object.values(mockCompanies).find(c => c.id === user.company_id);
    if(companyToUpdate) {
        mockCompanies[companyToUpdate.sublink] = { ...companyToUpdate, ...settingsData };
    }

    return Promise.resolve(mockCompanySettings[user.company_id]);
};

// Mock function for Super Admin
export const updateCompany = async (companyData) => {
    await delay(500);
    const company = Object.values(mockCompanies).find(c => c.id === companyData.id);
    if (company) {
        mockCompanies[company.sublink] = { ...company, ...companyData };
        // if sublink changed, we need to update the key
        if(companyData.sublink !== company.sublink) {
            delete mockCompanies[company.sublink];
            mockCompanies[companyData.sublink] = { ...company, ...companyData };
        }
        console.log("Mock API: Empresa atualizada", mockCompanies[companyData.sublink]);
        return Promise.resolve(mockCompanies[companyData.sublink]);
    }
    return Promise.reject(new Error("Empresa não encontrada"));
}


// A Supabase não está integrada. Esta função simulará o upload.
export const uploadCompanyThumbnail = async (companyId, file) => {
    if (!supabase) {
        console.warn("Supabase não configurado. Simulando upload de imagem.");
        await delay(1500); // Simular tempo de upload
        const mockUrl = URL.createObjectURL(file); // Criar uma URL local para preview
        // Em um cenário real, você não faria isso, mas para mock é aceitável.
        console.log(`Simulando upload para companyId: ${companyId}. URL gerada: ${mockUrl}`);
        return { publicUrl: mockUrl, error: null };
    }

    // A lógica abaixo só executaria com a integração Supabase completa.
    const fileExt = file.name.split('.').pop();
    const fileName = `${companyId}-thumbnail-${Date.now()}.${fileExt}`;
    const filePath = `public/company-thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('pedeaki-assets')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
        });

    if (uploadError) {
        console.error('Erro no upload da imagem:', uploadError);
        return { publicUrl: null, error: uploadError };
    }

    const { data } = supabase.storage
        .from('pedeaki-assets')
        .getPublicUrl(filePath);

    return { publicUrl: data.publicUrl, error: null };
};
