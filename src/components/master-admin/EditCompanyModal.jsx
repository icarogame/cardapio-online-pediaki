
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud } from 'lucide-react';

const EditCompanyModal = ({ isOpen, onOpenChange, company, onSave }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    sublink: '',
    adminEmail: '',
    thumbnail_url: '',
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  useEffect(() => {
    if (company) {
      setFormData({
        id: company.id || null,
        name: company.name || '',
        sublink: company.sublink || '',
        adminEmail: company.adminEmail || '',
        thumbnail_url: company.thumbnail_url || '',
      });
      setThumbnailPreview(company.thumbnail_url || '');
      setThumbnailFile(null);
    }
  }, [company, isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
            toast({
                title: 'Arquivo muito grande',
                description: 'Por favor, selecione uma imagem menor que 2MB.',
                variant: 'destructive',
            });
            return;
        }
        setThumbnailFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sublink || !formData.adminEmail) {
      toast({
        title: "Erro de Validação",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    onSave({ ...formData, thumbnailFile });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Empresa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sublink">Sublink</Label>
              <div className="flex items-center">
                  <span className="text-sm text-muted-foreground bg-gray-100 px-2 py-2 rounded-l-md border border-r-0 h-10 flex items-center">pedeaki.online/</span>
                  <Input id="sublink" placeholder="sabordivino" className="rounded-l-none" value={formData.sublink} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="adminEmail">Email do Administrador</Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
             <div className="space-y-2">
                <Label htmlFor="thumbnail">Miniatura para Compartilhamento de Link</Label>
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="thumbnail-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para enviar</span> ou arraste e solte</p>
                            <p className="text-xs text-gray-500">PNG, JPG (MAX. 2MB)</p>
                        </div>
                        <Input id="thumbnail-upload" type="file" className="hidden" onChange={handleThumbnailChange} accept="image/png, image/jpeg"/>
                    </label>
                </div>
                {thumbnailPreview && (
                    <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Pré-visualização:</p>
                        <img-replace src={thumbnailPreview} alt="Pré-visualização da miniatura" className="rounded-lg w-full max-h-48 object-contain border p-1" />
                    </div>
                )}
                 <p className="text-xs text-muted-foreground mt-1">Recomendado: 1200x630px. Esta imagem aparecerá na pré-visualização do link no WhatsApp e redes sociais.</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" className="gradient-orange text-white">Salvar Alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCompanyModal;
