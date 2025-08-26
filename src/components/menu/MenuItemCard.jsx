
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { WheatOff, MilkOff, Leaf, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const allergenIcons = {
  'gluten-free': { icon: WheatOff, label: 'Sem Glúten', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  'lactose-free': { icon: MilkOff, label: 'Sem Lactose', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  'vegetarian': { icon: Leaf, label: 'Vegetariano', color: 'bg-green-100 text-green-800 border-green-200' },
};

const MenuItemCard = ({ item, onAddToCart }) => {
  const { toast } = useToast();
  const hasCustomization = item.customization && item.customization.length > 0;
  const buttonText = hasCustomization ? 'Escolher Opções' : 'Adicionar ao Pedido';

  const handleButtonClick = (e) => {
    e.stopPropagation();
    if (!hasCustomization && item.isAvailable) {
      onAddToCart(item, 1, {});
    }
  };
  
  const handleShareClick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?product=${item.id}`);
    toast({
        title: "Link Copiado!",
        description: `O link para ${item.name} foi copiado para sua área de transferência.`,
    });
  };

  const tags = Array.isArray(item.tags) 
    ? item.tags 
    : (item.tags && typeof item.tags === 'string' ? item.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []);

  const allergens = item.allergens || [];

  return (
    <Card className={cn(
      "h-full flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-white",
      !item.isAvailable && "filter grayscale opacity-70",
      item.isAvailable && "cursor-pointer"
    )}>
      <div className="relative w-full h-48">
        <img 
          className="w-full h-full object-cover"
          alt={item.name}
          src={item.imageUrl || "https://images.unsplash.com/photo-1595872018818-97555653a011"}
         />
        <div className="absolute top-3 right-3 flex items-center gap-2">
            <Button
              onClick={handleShareClick}
              size="icon"
              variant="secondary"
              className="rounded-full h-9 w-9 bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <Share2 className="h-4 w-4 text-gray-700" />
            </Button>
            <div className="bg-orange-500 text-white rounded-full px-3 py-1.5 text-sm font-bold shadow-lg">
              R$ {item.price.toFixed(2)}
            </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <CardTitle className="text-lg font-bold text-gray-800 mb-1">{item.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500 mb-2 flex-grow line-clamp-2">
          {item.description}
        </CardDescription>

        <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-orange-100 text-orange-800 border-orange-200">
                    {tag}
                </Badge>
            ))}
            {allergens.map((allergenId) => {
              const allergenInfo = allergenIcons[allergenId];
              if (!allergenInfo) return null;
              const Icon = allergenInfo.icon;
              return (
                <Badge key={allergenId} variant="secondary" className={cn("text-xs flex items-center gap-1", allergenInfo.color)}>
                  <Icon className="h-3 w-3" />
                  {allergenInfo.label}
                </Badge>
              );
            })}
        </div>
        
        <Button 
          onClick={handleButtonClick}
          className={cn(
            "w-full text-base py-6 rounded-lg shadow-lg transition-opacity mt-auto",
            item.isAvailable ? "gradient-orange text-white hover:opacity-90" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          )}
          size="lg"
          disabled={!item.isAvailable}
        >
          {item.isAvailable ? buttonText : 'Esgotado'}
        </Button>
      </div>
    </Card>
  );
};

export default MenuItemCard;
