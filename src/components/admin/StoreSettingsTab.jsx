import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, Image as ImageIcon, Instagram, Facebook, Link as LinkIcon, Save, PlusCircle, Trash2, Power, PowerOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { updateCompanySettings } from '@/services/api';

const StoreSettingsTab = () => {
    const { toast } = useToast();
    const [logoPreview, setLogoPreview] = useState(null);
    const [isStoreOpen, setIsStoreOpen] = useState(true);
    const [deliveryFees, setDeliveryFees] = useState([{ id: 1, neighborhood: '', fee: '' }]);
    const [isSaving, setIsSaving] = useState(false);
    
    // Supondo que você buscaria esses dados da API
    const [settings, setSettings] = useState({
        companyName: 'Açaí do Bairro',
        phone: '(88) 98765-4321',
        address: 'Rua das Delícias, 123, Centro, Saborlândia - SP, 12345-678',
        workingHours: 'Segunda a Domingo, das 14h às 23h',
        instagram: '',
        facebook: '',
        ifood: '',
        deliverymuch: '',
        minOrderValue: '20.00',
        deliveryTime: '45-60',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSettings(prev => ({ ...prev, [id]: value }));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateCompanySettings({ ...settings, deliveryFees, isStoreOpen, logo: logoPreview });
            toast({
                title: "Configurações Salvas!",
                description: "As informações da sua loja foram atualizadas com sucesso.",
                className: "bg-green-100 text-green-800"
            });
        } catch (error) {
            toast({
                title: "Erro ao salvar",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
            };
            reader.readAsDataURL(file);
            toast({
                title: "Logo carregado!",
                description: "Não se esqueça de salvar as alterações."
            });
        }
    };

    const handleAddFee = () => {
        setDeliveryFees([...deliveryFees, { id: Date.now(), neighborhood: '', fee: '' }]);
    };

    const handleRemoveFee = (id) => {
        setDeliveryFees(deliveryFees.filter(fee => fee.id !== id));
    };

    const handleFeeChange = (id, field, value) => {
        setDeliveryFees(deliveryFees.map(fee => fee.id === id ? { ...fee, [field]: value } : fee));
    };

    return (
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Perfil da Empresa</CardTitle>
                    <CardDescription>Informações que aparecerão para seus clientes.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="logo-upload">Logo da Empresa</Label>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg border border-dashed flex items-center justify-center bg-gray-50">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Prévia do logo" className="h-full w-full object-cover rounded-lg" />
                                ) : (
                                    <ImageIcon className="h-10 w-10 text-gray-400" />
                                )}
                            </div>
                            <Button type="button" variant="outline" onClick={() => document.getElementById('logo-upload').click()}>
                                <UploadCloud className="mr-2 h-4 w-4" />
                                Fazer Upload
                            </Button>
                            <Input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                        </div>
                        <p className="text-xs text-muted-foreground">Recomendado: formato PNG com fundo transparente, tamanho mínimo de 256x256px.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Nome da Empresa</Label>
                            <Input id="companyName" placeholder="Ex: Açaí do Bairro" value={settings.companyName} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone / WhatsApp</Label>
                            <Input id="phone" placeholder="(99) 99999-9999" value={settings.phone} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Endereço Completo</Label>
                        <Input id="address" placeholder="Rua, Número, Bairro, Cidade - Estado, CEP" value={settings.address} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="workingHours">Horários e Dias de Funcionamento</Label>
                        <Input id="workingHours" placeholder="Ex: Seg a Sex: 18h - 23h | Sáb e Dom: 17h - 00h" value={settings.workingHours} onChange={handleInputChange} />
                    </div>

                    <div>
                        <Label>Links e Redes Sociais</Label>
                        <div className="mt-2 space-y-4">
                            <div className="flex items-center gap-3">
                                <Instagram className="h-5 w-5 text-gray-500" />
                                <Input id="instagram" placeholder="https://instagram.com/seu_usuario" value={settings.instagram} onChange={handleInputChange} />
                            </div>
                            <div className="flex items-center gap-3">
                                <Facebook className="h-5 w-5 text-gray-500" />
                                <Input id="facebook" placeholder="https://facebook.com/sua_pagina" value={settings.facebook} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <Label>Links Externos</Label>
                        <div className="mt-2 space-y-4">
                            <div className="flex items-center gap-3">
                                <LinkIcon className="h-5 w-5 text-gray-500" />
                                <Input id="ifood" placeholder="Link do seu perfil no iFood" value={settings.ifood} onChange={handleInputChange} />
                            </div>
                            <div className="flex items-center gap-3">
                                <LinkIcon className="h-5 w-5 text-gray-500" />
                                <Input id="deliverymuch" placeholder="Link do seu perfil no Delivery Much" value={settings.deliverymuch} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Regras de Pedido e Operação</CardTitle>
                    <CardDescription>Defina as regras para delivery e o status da sua loja.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="store-status" className="text-base font-medium">Status da Loja</Label>
                            <p className="text-sm text-muted-foreground">
                                {isStoreOpen ? "Estamos aceitando pedidos no momento." : "Sua loja está fechada para novos pedidos."}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {isStoreOpen ? <Power className="h-5 w-5 text-green-500" /> : <PowerOff className="h-5 w-5 text-red-500" />}
                            <Switch id="store-status" checked={isStoreOpen} onCheckedChange={setIsStoreOpen} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="minOrderValue">Valor do Pedido Mínimo (R$)</Label>
                            <Input id="minOrderValue" type="number" placeholder="20.00" value={settings.minOrderValue} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deliveryTime">Tempo Estimado de Entrega (min)</Label>
                            <Input id="deliveryTime" placeholder="45-60" value={settings.deliveryTime} onChange={handleInputChange} />
                        </div>
                    </div>

                    <div>
                        <Label>Taxas de Entrega por Bairro</Label>
                        <div className="mt-2 space-y-3">
                            {deliveryFees.map((fee, index) => (
                                <div key={fee.id} className="flex items-center gap-2">
                                    <Input 
                                        placeholder="Nome do Bairro" 
                                        value={fee.neighborhood}
                                        onChange={(e) => handleFeeChange(fee.id, 'neighborhood', e.target.value)}
                                    />
                                    <Input 
                                        type="number" 
                                        placeholder="Taxa (R$)" 
                                        className="w-32" 
                                        value={fee.fee}
                                        onChange={(e) => handleFeeChange(fee.id, 'fee', e.target.value)}
                                    />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveFee(fee.id)} disabled={deliveryFees.length <= 1}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button type="button" variant="outline" size="sm" className="mt-3" onClick={handleAddFee}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Adicionar Bairro
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button type="submit" className="gradient-orange text-white" disabled={isSaving}>
                    {isSaving ? 'Salvando...' : (
                        <>
                         <Save className="mr-2 h-4 w-4" />
                         Salvar Todas as Alterações
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default StoreSettingsTab;
