
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { DatePicker } from '@/components/ui/date-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMenuItems } from '@/services/api';
import ProductSizesEditor from './ProductSizesEditor';
import ProductComplementsEditor from './ProductComplementsEditor';
import ProductSuggestionsEditor from './ProductSuggestionsEditor';
import { UploadCloud, Image as ImageIcon, WheatOff, MilkOff, Leaf, Star, CalendarClock, Package, HelpCircle, UtensilsCrossed, Puzzle, Link as LinkIcon, Info, CreditCard } from 'lucide-react';

const allergenOptions = [
  { id: 'gluten-free', label: 'Sem Glúten', icon: WheatOff },
  { id: 'lactose-free', label: 'Sem Lactose', icon: MilkOff },
  { id: 'vegetarian', label: 'Vegetariano', icon: Leaf },
];

const ProductFormModal = ({ isOpen, onOpenChange, product, onSave }) => {
  const { toast } = useToast();
  const [allProducts, setAllProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    tags: '',
    isAvailable: true,
    imageUrl: '',
    link_pagamento_online: '',
    allergens: [],
    stock_quantity: '',
    is_featured: false,
    visible_from: null,
    visible_until: null,
    sizes: [],
    complementGroups: [],
    productSuggestions: [],
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
        try {
            const data = await getMenuItems();
            // Exclui o produto atual da lista de sugestões possíveis
            if(product) {
                setAllProducts(data.filter(p => p.id !== product.id));
            } else {
                setAllProducts(data);
            }
        } catch (error) {
            toast({ title: "Erro ao buscar produtos para sugestão", description: error.message, variant: "destructive" });
        }
    };

    if (isOpen) {
        fetchAllProducts();
        if (product) {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                category: product.category || '',
                price: product.price || '',
                tags: Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags || ''),
                isAvailable: product.isAvailable !== undefined ? product.isAvailable : true,
                imageUrl: product.imageUrl || '',
                link_pagamento_online: product.link_pagamento_online || '',
                allergens: product.allergens || [],
                stock_quantity: product.stock_quantity === null || product.stock_quantity === undefined ? '' : product.stock_quantity,
                is_featured: product.is_featured || false,
                visible_from: product.visible_from ? new Date(product.visible_from) : null,
                visible_until: product.visible_until ? new Date(product.visible_until) : null,
                sizes: product.sizes || [],
                complementGroups: product.complementGroups || [],
                productSuggestions: product.productSuggestions || [],
            });
            setImagePreview(product.imageUrl || null);
        } else {
            setFormData({
                name: '',
                description: '',
                category: '',
                price: '',
                tags: '',
                isAvailable: true,
                imageUrl: '',
                link_pagamento_online: '',
                allergens: [],
                stock_quantity: '',
                is_featured: false,
                visible_from: null,
                visible_until: null,
                sizes: [],
                complementGroups: [],
                productSuggestions: [],
            });
            setImagePreview(null);
        }
    }
  }, [product, isOpen, toast]);
  
  const handleChildStateChange = (key, value) => {
    setFormData(prev => ({...prev, [key]: value}));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = (id, checked) => {
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const handleAllergenChange = (allergenId) => {
    setFormData((prev) => {
      const newAllergens = prev.allergens.includes(allergenId)
        ? prev.allergens.filter((id) => id !== allergenId)
        : [...prev.allergens, allergenId];
      return { ...prev, allergens: newAllergens };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const priceAsNumber = parseFloat(formData.price);
    if (isNaN(priceAsNumber)) {
        toast({
            title: "Erro de Validação",
            description: "Por favor, insira um preço válido.",
            variant: "destructive"
        })
        return;
    }
    
    const tagsAsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const stockAsNumber = formData.stock_quantity === '' ? null : parseInt(formData.stock_quantity, 10);
    
    // Validação dos complementos para garantir que os preços sejam números
    const validatedComplementGroups = formData.complementGroups.map(group => ({
        ...group,
        items: group.items.map(item => ({...item, price: parseFloat(item.price) || 0})),
    }));

     // Validação dos tamanhos para garantir que os preços sejam números
    const validatedSizes = formData.sizes.map(size => ({
        ...size,
        price: parseFloat(size.price) || 0
    }));


    onSave({
      ...formData,
      price: priceAsNumber,
      tags: tagsAsArray,
      stock_quantity: stockAsNumber,
      visible_from: formData.visible_from ? formData.visible_from.toISOString() : null,
      visible_until: formData.visible_until ? formData.visible_until.toISOString() : null,
      sizes: validatedSizes,
      complementGroups: validatedComplementGroups,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl w-[95vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{product ? 'Editar Produto' : 'Adicionar Novo Produto'}</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-4 -mr-4">
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                {/* Coluna Esquerda: Informações Básicas */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome do Produto</Label>
                        <Input id="name" value={formData.name} onChange={handleChange} placeholder="Ex: Hambúrguer Clássico"/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descrição Detalhada</Label>
                        <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Descreva seu produto, ingredientes, etc."/>
                    </div>
                    <div className="space-y-2">
                        <Label>Imagem do Produto</Label>
                        <div className="flex items-center gap-4">
                            <div className="w-24 h-24 rounded-lg border border-dashed flex items-center justify-center bg-gray-50">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Prévia do produto" className="h-full w-full object-cover rounded-lg" />
                                ) : (
                                    <ImageIcon className="h-10 w-10 text-gray-400" />
                                )}
                            </div>
                            <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload').click()}>
                                <UploadCloud className="mr-2 h-4 w-4" />
                                Fazer Upload
                            </Button>
                            <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Input id="category" value={formData.category} onChange={handleChange} placeholder="Ex: Principais"/>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="price">Preço Base</Label>
                        <Input id="price" type="number" value={formData.price} onChange={handleChange} placeholder="Ex: 25.50"/>
                        </div>
                    </div>
                </div>

                {/* Coluna Direita: Personalização */}
                <div className="space-y-6">
                    <Tabs defaultValue="customization">
                        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5">
                            <TabsTrigger value="customization"><Puzzle className="h-4 w-4 sm:mr-1"/> <span className="hidden sm:inline">Personalização</span></TabsTrigger>
                            <TabsTrigger value="advanced"><Star className="h-4 w-4 sm:mr-1"/> <span className="hidden sm:inline">Avançado</span></TabsTrigger>
                            <TabsTrigger value="allergens"><WheatOff className="h-4 w-4 sm:mr-1"/> <span className="hidden sm:inline">Alergênicos</span></TabsTrigger>
                            <TabsTrigger value="payment"><CreditCard className="h-4 w-4 sm:mr-1"/> <span className="hidden sm:inline">Pagamento</span></TabsTrigger>
                            <TabsTrigger value="visibility"><CalendarClock className="h-4 w-4 sm:mr-1"/> <span className="hidden sm:inline">Visibilidade</span></TabsTrigger>
                        </TabsList>

                        <TabsContent value="customization" className="pt-4">
                            <div className="space-y-6 rounded-lg border p-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><UtensilsCrossed className="h-5 w-5" />Personalização do Produto</h3>
                                <Tabs defaultValue="sizes">
                                    <TabsList>
                                        <TabsTrigger value="sizes">Tamanhos</TabsTrigger>
                                        <TabsTrigger value="complements">Complementos</TabsTrigger>
                                        <TabsTrigger value="suggestions">Sugestões</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="sizes" className="pt-4">
                                        <ProductSizesEditor sizes={formData.sizes} setSizes={(value) => handleChildStateChange('sizes', value)} />
                                    </TabsContent>
                                    <TabsContent value="complements" className="pt-4">
                                        <ProductComplementsEditor complementGroups={formData.complementGroups} setComplementGroups={(value) => handleChildStateChange('complementGroups', value)} />
                                    </TabsContent>
                                    <TabsContent value="suggestions" className="pt-4">
                                        <ProductSuggestionsEditor allProducts={allProducts} suggestions={formData.productSuggestions} setSuggestions={(value) => handleChildStateChange('productSuggestions', value)} />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </TabsContent>

                        <TabsContent value="advanced" className="pt-4">
                            <div className="space-y-4 rounded-lg border p-4">
                                <h3 className="text-lg font-semibold text-gray-800">Opções Avançadas</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="isAvailable" className="flex items-center gap-2 font-medium"><Package className="h-4 w-4"/>Produto Disponível</Label>
                                        <Switch id="isAvailable" checked={formData.isAvailable} onCheckedChange={(checked) => handleSwitchChange('isAvailable', checked)} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="is_featured" className="flex items-center gap-2 font-medium"><Star className="h-4 w-4" />Marcar como Destaque</Label>
                                        <Switch id="is_featured" checked={formData.is_featured} onCheckedChange={(checked) => handleSwitchChange('is_featured', checked)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="stock_quantity">Quantidade em Estoque</Label>
                                        <Input id="stock_quantity" type="number" value={formData.stock_quantity} onChange={handleChange} placeholder="Ilimitado"/>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1"><HelpCircle className="h-3 w-3" /> Deixe em branco para estoque ilimitado.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                                        <Input id="tags" value={formData.tags} onChange={handleChange} placeholder="Ex: Popular, Vegano, Lançamento"/>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="allergens" className="pt-4">
                            <div className="space-y-4 rounded-lg border p-4">
                                <Label className="font-medium">Etiquetas de Alergênicos</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {allergenOptions.map((option) => {
                                    const Icon = option.icon;
                                    return (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <Checkbox
                                        id={option.id}
                                        checked={formData.allergens.includes(option.id)}
                                        onCheckedChange={() => handleAllergenChange(option.id)}
                                        />
                                        <Label htmlFor={option.id} className="flex items-center gap-2 font-normal cursor-pointer">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                        {option.label}
                                        </Label>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="payment" className="pt-4">
                            <div className="space-y-4 rounded-lg border p-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><CreditCard className="h-5 w-5" />Pagamento Online</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="link_pagamento_online">Link de Pagamento Online (Opcional)</Label>
                                    <Input
                                        id="link_pagamento_online"
                                        value={formData.link_pagamento_online}
                                        onChange={handleChange}
                                        placeholder="Cole aqui o link de pagamento do produto"
                                    />
                                    <p className="text-xs text-muted-foreground flex items-center gap-1"><HelpCircle className="h-3 w-3" /> Use para integrações manuais com Mercado Pago, PagSeguro, etc.</p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="visibility" className="pt-4">
                            <div className="space-y-4 rounded-lg border p-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><CalendarClock className="h-5 w-5" />Visibilidade Agendada (Opcional)</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="visible_from">Mostrar a partir de</Label>
                                        <DatePicker date={formData.visible_from} setDate={(date) => setFormData(p => ({...p, visible_from: date}))} placeholder="Selecione uma data" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="visible_until">Ocultar a partir de</Label>
                                        <DatePicker date={formData.visible_until} setDate={(date) => setFormData(p => ({...p, visible_until: date}))} placeholder="Selecione uma data" />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
        <DialogFooter className="col-span-1 md:col-span-2 mt-6 flex-shrink-0">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="gradient-orange text-white">Salvar Produto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
