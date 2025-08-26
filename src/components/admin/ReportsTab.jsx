
import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon, DollarSign, ShoppingBag, Package, Award, TrendingUp, BarChart2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const bestSellingProducts = [
  { rank: 1, name: 'Açaí Tradicional 500ml', quantity: 182, icon: Award, color: 'text-yellow-500' },
  { rank: 2, name: 'Açaí com Morango 500ml', quantity: 154, icon: Award, color: 'text-gray-400' },
  { rank: 3, name: 'Açaí com Cupuaçu 300ml', quantity: 121, icon: Award, color: 'text-yellow-600' },
  { rank: 4, name: 'Suco de Laranja 500ml', quantity: 98 },
  { rank: 5, name: 'Combo Casal', quantity: 85 },
  { rank: 6, name: 'Refrigerante Lata', quantity: 77 },
  { rank: 7, name: 'Açaí Tradicional 300ml', quantity: 65 },
  { rank: 8, name: 'Barca de Açaí Média', quantity: 52 },
  { rank: 9, name: 'Açaí com Banana 700ml', quantity: 43 },
  { rank: 10, 'name': 'Água Mineral com Gás', quantity: 31 },
];

const ReportsTab = () => {
  const { toast } = useToast();
  const [date, setDate] = useState({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const handleGenerateReport = () => {
    toast({
      title: "Relatório Gerado!",
      description: `Dados de ${format(date.from, "dd/MM/yy")} a ${format(date.to, "dd/MM/yy")} foram processados.`,
      className: "bg-green-100 text-green-800"
    });
  };

  return (
    <Tabs defaultValue="sales" className="space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sales"><BarChart2 className="mr-2 h-4 w-4" />Relatório de Vendas</TabsTrigger>
        <TabsTrigger value="products"><TrendingUp className="mr-2 h-4 w-4" />Produtos Mais Vendidos</TabsTrigger>
      </TabsList>
      
      <TabsContent value="sales" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Filtro de Período</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y", { locale: ptBR })} -{" "}
                        {format(date.to, "LLL dd, y", { locale: ptBR })}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y", { locale: ptBR })
                    )
                  ) : (
                    <span>Escolha um período</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
            <Button onClick={handleGenerateReport} className="w-full sm:w-auto gradient-orange text-white">
              Gerar Relatório
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 12.450,75</div>
              <p className="text-xs text-muted-foreground">+15.2% em relação ao período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">582</div>
              <p className="text-xs text-muted-foreground">+201 em relação ao período anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.237</div>
              <p className="text-xs text-muted-foreground">Média de 2.1 produtos por pedido</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="products" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Ranking de Produtos Mais Vendidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bestSellingProducts.map((product) => (
                <div key={product.rank} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-10 h-10 font-bold text-lg">
                    {product.icon ? <product.icon className={`w-6 h-6 ${product.color}`} /> : <span>{product.rank}º</span>}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-gray-800">{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-600">{product.quantity}</p>
                    <p className="text-xs text-muted-foreground">unidades</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ReportsTab;