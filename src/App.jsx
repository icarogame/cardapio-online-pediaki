import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage.jsx';
import MenuPage from '@/pages/MenuPage.jsx';
import POSPage from '@/pages/POSPage.jsx';
import AdminPage from '@/pages/AdminPage.jsx';
import DeliveryPage from '@/pages/DeliveryPage.jsx';
import DeliveryPersonPage from '@/pages/DeliveryPersonPage.jsx';
import DeliveryOrderDetailPage from '@/pages/DeliveryOrderDetailPage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import CheckoutPage from '@/pages/checkout/CheckoutPage.jsx';
import ProfilePage from '@/pages/ProfilePage.jsx';
import OrderStatusPage from '@/pages/OrderStatusPage.jsx';
import LoyaltyPage from '@/pages/LoyaltyPage.jsx';
import ReferralPage from '@/pages/ReferralPage.jsx';
import CouponPage from '@/pages/CouponPage.jsx';
import TableMenuPage from '@/pages/TableMenuPage.jsx';
import ProtectedRoute from '@/components/auth/ProtectedRoute.jsx';
import { AuthProvider, AuthContext } from '@/contexts/AuthContext.jsx';
import { CartProvider } from '@/hooks/useCart.jsx';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage.jsx';
import MasterAdminPage from '@/pages/MasterAdminPage.jsx';
import PricingPage from '@/pages/PricingPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import TenantWrapper from '@/components/TenantWrapper.jsx';
import CommercialNav from '@/components/CommercialNav.jsx';
import DemoAccessPage from '@/pages/DemoAccessPage.jsx';
import Navigation from '@/components/Navigation.jsx';

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const showCommercialNav = !user && !loading && ['/', '/pricing', '/signup', '/login', '/demo-access'].includes(location.pathname);
  
  const showMainNavigation = user && !loading && !['/', '/pricing', '/signup', '/login', '/demo-access'].includes(location.pathname) && !location.pathname.startsWith('/menu');


  const shouldShowNavigation = user && !loading;

  const protectedRoutes = [
    '/admin', '/pos', '/delivery', '/delivery-person', '/master-admin', '/profile'
  ];

  const isProtectedRoute = protectedRoutes.some(path => location.pathname.startsWith(path));

  return (
    <>
      {showCommercialNav && <CommercialNav />}
      {isProtectedRoute && shouldShowNavigation && <Navigation />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/demo-access" element={<DemoAccessPage />} />

        {/* Tenant-specific routes */}
        <Route path="/:sublink" element={<TenantWrapper />}>
          <Route index element={<MenuPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="order-status/:orderId" element={<OrderStatusPage />} />
          <Route path="loyalty" element={<LoyaltyPage />} />
          <Route path="referral" element={<ReferralPage />} />
          <Route path="coupons" element={<CouponPage />} />
          <Route path="table/:tableNumber" element={<TableMenuPage />} />
        </Route>
        
        {/* Protected Routes */}
        <Route path="/admin/*" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/pos" element={<ProtectedRoute><POSPage /></ProtectedRoute>} />
        <Route path="/delivery" element={<ProtectedRoute><DeliveryPage /></ProtectedRoute>} />
        <Route path="/delivery-person" element={<ProtectedRoute><DeliveryPersonPage /></ProtectedRoute>} />
        <Route path="/delivery-person/:orderId" element={<ProtectedRoute><DeliveryOrderDetailPage /></ProtectedRoute>} />
        <Route path="/master-admin" element={<ProtectedRoute><MasterAdminPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Helmet>
            <title>PedeAki Online - Sistema Completo de Gestão para Restaurantes</title>
            <meta name="description" content="Plataforma SaaS completa para gestão de pedidos, cardápio digital e delivery para restaurantes, lancherias e deliveries." />
            <meta property="og:title" content="PedeAki Online - Sistema Completo de Gestão para Restaurantes" />
            <meta property="og:description" content="Plataforma SaaS completa para gestão de pedidos, cardápio digital e delivery para restaurantes, lancherias e deliveries." />
          </Helmet>
          
          <div className="min-h-screen bg-gray-50">
            <AppContent />
            <Toaster />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;