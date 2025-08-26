
import { delay } from '@/services/helpers.js';
import supabase from '@/services/supabaseClient.js';

export const checkSlugAvailability = async (slug) => {
  await delay(1000);
  if (slug === 'ja-em-uso') {
    return Promise.reject(new Error("Este link já está em uso. Tente outro."));
  }
  return Promise.resolve();
};

export const signup = async (formData) => {
  console.log("Iniciando processo de signup com:", formData);
  await delay(1500);

  if (!supabase) {
    console.warn("Cliente Supabase não inicializado. Operação de signup simulada.");
    const mockUser = {
      name: formData.fullName,
      email: formData.email,
      role: 'COMPANY_ADMIN',
      company_id: `${formData.slug}_id`,
      company_name: formData.storeName,
    };
    
    if (formData.planId === 'trial') {
      return Promise.resolve({ user: mockUser, redirectUrl: null });
    } else {
      const mockPaymentUrl = `https://pagamento.exemplo.com/checkout?plan=${formData.planId}&billing=${formData.billingCycle}`;
      return Promise.resolve({ user: mockUser, redirectUrl: mockPaymentUrl });
    }
  }
  
  // Real Supabase logic would be here
  const { data, error } = await supabase.functions.invoke('signup', {
    body: formData,
  });

  if (error) throw error;
  return data;
};
