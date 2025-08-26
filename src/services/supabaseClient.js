
import { createClient } from '@supabase/supabase-js';

// As chaves de ambiente serão injetadas aqui pelo sistema Hostinger.
// Não é necessário criar um arquivo .env.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifique se as variáveis de ambiente foram fornecidas.
// Se não, exiba uma mensagem útil no console e evite criar o cliente.
let supabase;
if (supabaseUrl && supabaseAnonKey) {
  // Inicialize o cliente do Supabase.
  // Esta instância pode ser importada em qualquer lugar do seu aplicativo.
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn("Supabase URL ou Anon Key não fornecidas.");
  console.warn("Por favor, complete a integração do Supabase nas configurações do seu projeto Hostinger para habilitar a funcionalidade de backend.");
}

// Exporte o cliente inicializado (ou nulo se não configurado).
export default supabase;
