
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, Smartphone, Upload, CheckCircle, Copy } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const paymentMethods = [
  { id: 'cartao_online', label: 'Cartão de Crédito/Débito Online', icon: CreditCard },
  { id: 'pix', label: 'PIX', icon: Smartphone },
  { id: 'cartao_entrega', label: 'Cartão na Entrega', icon: CreditCard },
  { id: 'dinheiro', label: 'Dinheiro', icon: Banknote },
];

const cardOptions = [
  { id: 'visa', name: 'Visa' },
  { id: 'mastercard', name: 'Mastercard' },
  { id: 'elo', name: 'Elo' },
];

const PIX_KEY = "000.111.222-33";

const PaymentOptions = ({ paymentDetails, setPaymentDetails, onOnlinePayment }) => {
  const { toast } = useToast();
  const [pixProof, setPixProof] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({ title: "Arquivo muito grande", description: "Por favor, selecione um arquivo menor que 2MB.", variant: "destructive" });
        return;
      }
      setPixProof(file);
      // In a real app, you'd upload this file and get a URL
      const temporaryUrl = URL.createObjectURL(file);
      setPaymentDetails(prev => ({ ...prev, comprovante_pix_url: temporaryUrl, status_pagamento: "Pendente" }));
      toast({ title: "Comprovante enviado!", description: "O comprovante foi anexado com sucesso." });
    }
  };

  const handleFieldChange = (field, value) => {
    const newDetails = { ...paymentDetails, [field]: value };
    // Reset status when changing method
    if (field === 'metodo_pagamento') {
      newDetails.status_pagamento = "Pendente";
      if (value !== 'pix') {
          setPixProof(null);
          newDetails.comprovante_pix_url = '';
      }
    }
    setPaymentDetails(newDetails);
  };

  const handleCopyPixKey = () => {
    navigator.clipboard.writeText(PIX_KEY);
    toast({ title: "Chave PIX copiada!", description: "A chave foi copiada para a área de transferência." });
  }

  const handleMethodSelection = (value) => {
    if (value === 'cartao_online') {
      onOnlinePayment();
    } else {
      handleFieldChange('metodo_pagamento', value)
    }
  }


  return (
    <div className="space-y-6">
      <RadioGroup 
        value={paymentDetails.metodo_pagamento} 
        onValueChange={handleMethodSelection} 
        className="space-y-4"
      >
        {paymentMethods.map(method => {
          const Icon = method.icon;
          return (
            <Label
              key={method.id}
              htmlFor={method.id}
              className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 transition-all"
            >
              <RadioGroupItem value={method.id} id={method.id} />
              <Icon className="w-6 h-6 text-gray-600" />
              <span className="font-semibold">{method.label}</span>
            </Label>
          );
        })}
      </RadioGroup>

      {paymentDetails.metodo_pagamento === 'cartao_entrega' && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4 pt-4 border-t"
        >
          <h3 className="font-semibold">Detalhes do Cartão</h3>
          <div>
            <Label>Tipo de Cartão</Label>
            <RadioGroup 
              value={paymentDetails.tipo_cartao}
              onValueChange={(value) => handleFieldChange('tipo_cartao', value)}
              className="flex gap-4 mt-2"
            >
              <Label htmlFor="credito" className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="crédito" id="credito" />
                Crédito
              </Label>
              <Label htmlFor="debito" className="flex items-center gap-2 cursor-pointer">
                <RadioGroupItem value="débito" id="debito" />
                Débito
              </Label>
            </RadioGroup>
          </div>
          <div>
            <Label>Bandeira do Cartão</Label>
            <div className="flex gap-2 mt-2">
              {cardOptions.map(card => (
                 <Button
                    key={card.id}
                    variant={paymentDetails.bandeira_cartao === card.name ? 'default' : 'outline'}
                    onClick={() => handleFieldChange('bandeira_cartao', card.name)}
                    className={paymentDetails.bandeira_cartao === card.name ? 'gradient-orange text-white' : ''}
                  >
                   {card.name}
                 </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {paymentDetails.metodo_pagamento === 'pix' && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-4 pt-4 border-t text-center"
        >
          <h3 className="font-semibold">Pagamento com PIX</h3>
          <p className="text-sm text-gray-600">Aponte seu celular para o QR Code abaixo ou copie a chave. Após pagar, anexe o comprovante.</p>
          <div className="flex justify-center">
            <img  class="w-48 h-48 rounded-md" alt="QR Code para pagamento PIX" src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf" />
          </div>
          <div className='flex items-center justify-center gap-2 p-2 bg-gray-100 rounded-md'>
            <span className='text-sm text-gray-700 font-mono'>{PIX_KEY}</span>
             <Button size="icon" variant="ghost" onClick={handleCopyPixKey}>
              <Copy className='w-4 h-4'/>
            </Button>
          </div>
          <input
            id="pix-proof-upload"
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, application/pdf"
          />
          <Button variant="outline" onClick={() => fileInputRef.current.click()}>
            {pixProof ? <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> : <Upload className="mr-2 h-4 w-4" />}
            {pixProof ? pixProof.name : 'Anexar Comprovante'}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentOptions;
