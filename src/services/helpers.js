
import supabase from './supabaseClient.js';

export const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const getAuthenticatedUser = () => {
    try {
        const userJson = localStorage.getItem('user');
        if (!userJson) return null;

        const user = JSON.parse(userJson);

        // Se o Supabase está integrado, poderíamos validar o token aqui ou
        // confiar que o token será validado no backend.
        // Por agora, apenas retornamos o usuário do localStorage.
        
        return user;

    } catch (e) {
        console.error("Falha ao obter usuário autenticado do localStorage.", e);
        return null;
    }
};
