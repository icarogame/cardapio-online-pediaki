import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

// Simulação de uma "função de ajuda" que poderia ser usada
// para obter o redirecionamento com base no papel do usuário.
export const getRedirectPathByRole = (role) => {
  switch (role) {
    case 'SUPER_ADMIN':
      return '/master-admin';
    case 'COMPANY_ADMIN':
      return '/admin';
    case 'ATTENDANT':
      return '/pos';
    case 'DRIVER':
      return '/delivery-person';
    default:
      return '/';
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simula a verificação de um usuário logado (ex: de um token no localStorage)
  // No futuro, isso será substituído pela verificação da sessão do Supabase.
  useEffect(() => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Falha ao carregar usuário do localStorage", error);
      setUser(null);
      localStorage.removeItem('user');
    } finally {
        setLoading(false);
    }
  }, []);

  const login = (userData) => {
    // Armazena os dados completos do usuário, incluindo a role.
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    // O redirecionamento é retornado para ser tratado na página de login.
    return getRedirectPathByRole(userData.role);
  };

  const logout = () => {
    // Limpa os dados do usuário do estado e do localStorage
    localStorage.removeItem('user');
    setUser(null);
    // Para garantir que o usuário seja redirecionado para a home ou login
    window.location.href = '/login';
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};