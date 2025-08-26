import React, { useState } from 'react';
import { 
  BarChart3, 
  Users as UsersIcon, 
  ShoppingBag, 
  Settings as MenuSettings,
  TrendingUp,
  Users,
  Store,
  Gift,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardTab from '@/components/admin/DashboardTab';
import OrdersTab from '@/components/admin/OrdersTab';
import MenuTab from '@/components/admin/MenuTab';
import CustomersTab from '@/components/admin/CustomersTab';
import ReportsTab from '@/components/admin/ReportsTab';
import UserManagementTab from '@/components/admin/UserManagementTab';
import StoreSettingsTab from '@/components/admin/StoreSettingsTab';
import NotificationPopover from '@/components/admin/NotificationPopover';
import ReferralsTab from '@/components/admin/ReferralsTab';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'orders', name: 'Pedidos', icon: ShoppingBag },
    { id: 'menu', name: 'Cardápio', icon: MenuSettings },
    { id: 'customers', name: 'Clientes', icon: UsersIcon },
    { id: 'referrals', name: 'Indicações', icon: Gift },
    { id: 'users', name: 'Gestão de Usuários', icon: Users },
    { id: 'reports', name: 'Relatórios', icon: TrendingUp },
    { id: 'store-settings', name: 'Configurações da Loja', icon: Store }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab setActiveTab={setActiveTab} />;
      case 'orders':
        return <OrdersTab />;
      case 'menu':
        return <MenuTab />;
      case 'customers':
        return <CustomersTab />;
      case 'referrals':
        return <ReferralsTab />;
      case 'users':
        return <UserManagementTab />;
      case 'reports':
        return <ReportsTab />;
      case 'store-settings':
        return <StoreSettingsTab />;
      default:
        return <DashboardTab setActiveTab={setActiveTab} />;
    }
  };
  
  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <>
      <div className="bg-white shadow-sm py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Painel Administrativo</h1>
              <p className="text-gray-600 mt-1">Gestão completa do seu restaurante</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <NotificationPopover />
              <Button 
                className="gradient-orange text-white border-0 hover:opacity-90 flex-1 sm:flex-none"
                onClick={() => setActiveTab('store-settings')}
              >
                <MenuSettings className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Configurações</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6 sm:mb-8">
          {/* Desktop Tabs */}
          <div className="hidden sm:block border-b border-gray-200">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          {/* Mobile Dropdown */}
          <div className="sm:hidden">
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                        {activeTabInfo && (
                            <>
                                <span className="flex items-center">
                                    <activeTabInfo.icon className="w-5 h-5 mr-2" />
                                    {activeTabInfo.name}
                                </span>
                                <ChevronDown className="w-4 h-4" />
                            </>
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full max-w-[calc(100vw-2rem)]">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <DropdownMenuItem key={tab.id} onSelect={() => setActiveTab(tab.id)} className={activeTab === tab.id ? 'bg-orange-50' : ''}>
                                <Icon className="w-4 h-4 mr-2" />
                                <span>{tab.name}</span>
                            </DropdownMenuItem>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {renderActiveTab()}
      </main>
    </>
  );
};

export default AdminPage;