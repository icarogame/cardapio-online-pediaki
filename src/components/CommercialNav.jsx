
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChefHat,
  X,
  Menu as HamburgerMenu,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CommercialNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/#features', label: 'Funcionalidades' },
    { path: '/pricing', label: 'Planos' },
  ];

  const handleNavigation = (path) => {
    if (path.startsWith('/#')) {
      navigate('/'); // Navigate to home first if it's an anchor link
      setTimeout(() => {
        const element = document.getElementById(path.substring(2));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleDemoClick = () => {
    navigate('/demo-access');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 gradient-orange rounded-lg flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">PedeAki Online</span>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path.startsWith('/#') && location.pathname === '/');
              return (
                <button key={item.path} onClick={() => handleNavigation(item.path)} className="focus:outline-none">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'text-orange-600 font-semibold'
                        : 'text-gray-600 hover:text-orange-600'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </button>
              );
            })}
             <button onClick={() => navigate('/login')} className="focus:outline-none">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg transition-colors text-gray-600 hover:text-orange-600`}
                  >
                    <span className="font-medium">Login</span>
                  </motion.div>
             </button>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              onClick={handleDemoClick}
              className="hidden sm:flex border-gray-300 text-gray-800 hover:bg-gray-100"
            >
              Demo Gratuito
            </Button>
            <Button
              className="gradient-orange text-white font-bold hover:opacity-90 shadow-md"
              onClick={() => navigate('/pricing')}
            >
              Começar Agora <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <HamburgerMenu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path.startsWith('/#') && location.pathname === '/');
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-3 py-2 rounded-md text-base font-medium focus:outline-none ${
                      isActive ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
               <button
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium focus:outline-none text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                >
                  Login
                </button>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-5 flex flex-col space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-gray-300 text-gray-800 hover:bg-gray-100"
                  onClick={() => { handleDemoClick(); setIsMobileMenuOpen(false); }}
                >
                  Demo Gratuito
                </Button>
                <Button
                  className="w-full gradient-orange text-white font-bold hover:opacity-90 shadow-md"
                  onClick={() => { navigate('/pricing'); setIsMobileMenuOpen(false); }}
                >
                  Começar Agora <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default CommercialNav;
