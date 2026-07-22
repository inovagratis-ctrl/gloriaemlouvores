import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const { addPrayerRequest } = useData();
  const [type, setType] = useState<'oracao' | 'louvor' | 'contato'>('oracao');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPrayerRequest({ name, email, message, type });
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-[#1a1f3a]">Fale Conosco</CardTitle>
      </CardHeader>
      <CardContent>
        {sent ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-lg font-semibold text-[#1a1f3a]">Mensagem enviada!</p>
            <p className="text-gray-500">Obrigado pelo seu contato.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Tipo</Label>
              <div className="flex gap-2 mt-1">
                {[
                  { value: 'oracao', label: 'Pedido de Oração' },
                  { value: 'louvor', label: 'Pedido de Louvor' },
                  { value: 'contato', label: 'Contato' },
                ].map(opt => (
                  <button key={opt.value} type="button" onClick={() => setType(opt.value as any)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${type === opt.value ? 'bg-[#D4AF37] text-white' : 'bg-[#F9F7F4] text-gray-600 hover:bg-[#E8E4E0]'}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea id="message" placeholder={type === 'oracao' ? 'Compartilhe seu pedido de oração...' : type === 'louvor' ? 'Qual louvor você gostaria de ouvir?' : 'Sua mensagem...'} rows={4} value={message} onChange={e => setMessage(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2">
              <Send className="w-4 h-4" /> Enviar
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
