import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Users, DollarSign, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const mockReferrals = [
  { id: 1, referrer: 'João Silva', referred: 'Ana Costa', date: '22/07/2025', status: 'Pendente', reward: 'R$ 10,00' },
  { id: 2, referrer: 'Maria Oliveira', referred: 'Carlos Souza', date: '21/07/2025', status: 'Recompensado', reward: 'R$ 10,00' },
  { id: 3, referrer: 'Pedro Santos', referred: 'Beatriz Lima', date: '20/07/2025', status: 'Pendente', reward: 'R$ 10,00' },
  { id: 4, referrer: 'João Silva', referred: 'Mariana Fernandes', date: '18/07/2025', status: 'Recompensado', reward: 'R$ 10,00' },
];

const ReferralsTab = () => {
  const { toast } = useToast();
  const [referrals, setReferrals] = useState(mockReferrals);

  const handleConfirmReward = (id) => {
    setReferrals(prevReferrals =>
      prevReferrals.map(ref =>
        ref.id === id ? { ...ref, status: 'Recompensado' } : ref
      )
    );
    toast({
      title: 'Recompensa Confirmada!',
      description: 'O status da indicação foi atualizado e a recompensa foi processada.',
      className: 'bg-green-100 text-green-800',
    });
  };

  const stats = [
    { title: 'Total de Indicações', value: referrals.length, icon: Users },
    { title: 'Recompensas Pendentes', value: referrals.filter(r => r.status === 'Pendente').length, icon: Gift },
    { title: 'Total Recompensado', value: `R$ ${(referrals.filter(r => r.status === 'Recompensado').length * 10).toFixed(2)}`, icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Programa de Indicação</h2>
        <p className="text-gray-600">Gerencie as indicações e recompensas dos seus clientes.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Indicações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quem Indicou</TableHead>
                <TableHead>Indicado</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Recompensa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {referrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.referrer}</TableCell>
                  <TableCell>{referral.referred}</TableCell>
                  <TableCell>{referral.date}</TableCell>
                  <TableCell>{referral.reward}</TableCell>
                  <TableCell>
                    <Badge variant={referral.status === 'Pendente' ? 'destructive' : 'default'}>
                      {referral.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {referral.status === 'Pendente' ? (
                      <Button size="sm" onClick={() => handleConfirmReward(referral.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirmar Recompensa
                      </Button>
                    ) : (
                      <span className="text-sm text-green-600 font-semibold flex items-center justify-end gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Confirmado
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralsTab;