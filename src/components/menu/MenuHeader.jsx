
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChefHat, MapPin, Clock, Instagram, Youtube, Facebook, User, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MenuHeader = () => {
  const { toast } = useToast();
  const { sublink } = useParams();

  const handleSocialClick = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀",
      duration: 3000,
    });
  };

  return (
    <>
      <header className="bg-white shadow-sm pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 gradient-orange rounded-full flex items-center justify-center">
                <ChefHat className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Açaí Mania</h1>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  <span>Rua das Delícias, 123 - Saborlândia</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>Aberto: 10:00 - 22:00</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handleSocialClick}>
                <Instagram className="w-5 h-5" />
              </Button>
               <Button variant="outline" size="icon" onClick={handleSocialClick}>
                <Facebook className="w-5 h-5" />
              </Button>
               <Button variant="outline" size="icon" onClick={handleSocialClick}>
                <Youtube className="w-5 h-5" />
              </Button>
              <Link to={`/${sublink}/profile`}>
                <Button variant="outline" size="icon">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 h-48 sm:h-64 md:h-80 bg-cover bg-center rounded-2xl shadow-lg" style={{backgroundImage: `url('https://images.unsplash.com/photo-1628557996328-3165b38ae207?q=80&w=2070&auto=format&fit=crop')`}}>
            <div className="h-full w-full bg-black/40 rounded-2xl flex flex-col justify-center items-center text-white p-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">Promoção do Dia!</h2>
              <p className="mt-2 md:text-lg">Açaí 500ml com 3 adicionais por apenas R$19,90!</p>
            </div>
          </div>
          <Link to={`/${sublink}/referral`} className="md:col-span-1 h-48 sm:h-64 md:h-80 flex">
            <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg flex flex-col justify-center items-center text-white p-6 text-center hover:scale-105 transition-transform duration-300">
               <Gift className="w-16 h-16 mb-4" />
               <h3 className="text-2xl font-bold">Indique e Ganhe!</h3>
               <p className="mt-2">Indique esta loja e ganhe prêmios exclusivos!</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default MenuHeader;
