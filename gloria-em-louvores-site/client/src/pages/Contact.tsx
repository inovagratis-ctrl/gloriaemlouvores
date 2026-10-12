import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle, Mail, Eye, EyeOff, ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import EmotionalCareNotice from '@/components/EmotionalCareNotice';

export default function ContactForm() {
  const { addPrayerRequest } = useData();
  const [type, setType] = useState<'oracao' | 'louvor' | 'contato'>('oracao');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPrayerRequest({ name, email, message, type });
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Contato e Pedidos de Oração | Glória em Louvores"
        description="Envie seu pedido de oração, sugestão de estudo bíblico ou fale com a equipe editorial do portal Glória em Louvores."
        canonicalPath="/contato"
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Contato e Pedidos de Oração', path: '/contato' },
        ]}
      />
      <Navbar />

      <section className="pt-28 pb-10 bg-gradient-to-br from-[#1a1f3a] to-[#0f1325] text-white">
        <div className="container max-w-3xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70 mb-5">
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold">Contato e Pedidos de Oração</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Fale Conosco & Pedidos de Oração
          </h1>
          <p className="text-white/80 text-sm sm:text-base">
            Envie sua mensagem para nossa equipe editorial ou compartilhe um motivo de intercessão.
          </p>
        </div>
      </section>

      <main className="container max-w-3xl mx-auto px-4 py-10 flex-1 space-y-8">
        <EmotionalCareNotice compact />

        <Card className="shadow-sm border border-[#E8E4E0] bg-white">
          <CardHeader>
            <CardTitle className="text-[#1a1f3a] text-2xl">Enviar Mensagem</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              variant="outline"
              className="w-full bg-white border-[#D4AF37] text-[#1a1f3a] hover:bg-[#D4AF37]/10"
              onClick={() => setShowEmail(!showEmail)}
              aria-expanded={showEmail}
            >
              <Mail className="w-4 h-4 mr-2 text-[#D4AF37]" />
              {showEmail ? (
                <>
                  <EyeOff className="w-4 h-4 mr-2" /> Ocultar e-mail de contato direto
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-2" /> Mostrar e-mail de contato direto
                </>
              )}
            </Button>
            {showEmail && (
              <div className="text-center p-4 bg-[#D4AF37]/5 rounded-xl border border-[#D4AF37]/20">
                <p className="text-sm text-gray-500 mb-1">E-mail para contato editorial direto:</p>
                <a
                  href="mailto:ECHODACRIACAO@GMAIL.COM"
                  className="text-lg font-semibold text-[#1a1f3a] break-all hover:text-[#D4AF37] transition-colors"
                >
                  ECHODACRIACAO@GMAIL.COM
                </a>
              </div>
            )}
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-[#1a1f3a]">Mensagem enviada com sucesso!</p>
                <p className="text-gray-500 text-sm">
                  Agradecemos pelo contato. Nossa equipe receberá sua mensagem com atenção.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Assunto</Label>
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {[
                      { value: 'oracao', label: 'Pedido de Oração' },
                      { value: 'louvor', label: 'Sugestão de Estudo / Louvor' },
                      { value: 'contato', label: 'Contato Editorial / Direitos' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setType(opt.value as 'oracao' | 'louvor' | 'contato')}
                        className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                          type === opt.value
                            ? 'bg-[#1a1f3a] text-[#D4AF37]'
                            : 'bg-[#F9F7F4] text-gray-600 hover:bg-[#E8E4E0]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder={
                      type === 'oracao'
                        ? 'Compartilhe seu pedido de oração...'
                        : type === 'louvor'
                        ? 'Qual tema bíblico ou louvor você sugere?'
                        : 'Sua mensagem...'
                    }
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#1a1f3a] hover:bg-[#2d3561] text-white font-bold py-5 gap-2"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" /> Enviar Mensagem
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
