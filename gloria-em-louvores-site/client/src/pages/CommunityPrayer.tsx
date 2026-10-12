import { useState } from 'react';
import { Link } from 'wouter';
import {
  Users,
  Heart,
  Send,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  Home,
  BookOpen,
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import EmotionalCareNotice from '@/components/EmotionalCareNotice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function CommunityPrayer() {
  const { prayerRequests, addPrayerRequest, incrementPrayerCount } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [prayedIds, setPrayedIds] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    await addPrayerRequest({
      name: name.trim(),
      email: email.trim() || 'comunidade@gloriaemlouvores.com.br',
      message: message.trim(),
      type: 'oracao',
    });
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handlePrayForRequest = (id: string) => {
    if (prayedIds.includes(id)) return;
    incrementPrayerCount(id);
    setPrayedIds(prev => [...prev, id]);
  };

  const publicPrayers = prayerRequests.filter(r => r.type === 'oracao');

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Comunidade de Oração e Intercessão Mútua | Glória em Louvores"
        description="Mural cristão de intercessão e pedidos de oração. Compartilhe seu motivo de oração, interceda pelos irmãos na fé e veja orientações para grupos de oração."
        keywords="comunidade de oração, mural de oração cristão, pedir oração online, intercessão mútua"
        canonicalPath="/comunidade"
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Comunidade de Oração', path: '/comunidade' },
        ]}
      />
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-[#1a1f3a] via-[#1a1f3a] to-[#0f1325] text-white">
        <div className="container max-w-6xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70 mb-6">
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold">Comunidade de Oração</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full px-3.5 py-1 text-xs font-semibold text-[#D4AF37] mb-4">
              <Users className="w-3.5 h-3.5" />
              Espaço Livre de Publicidade • Intercessão e Fraternidade
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Comunidade de Oração e Intercessão Mútua
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              "Orai uns pelos outros, para que sareis" (Tiago 5:16). Compartilhe seu pedido com discrição e dedique alguns minutos para interceder pelos irmãos na fé.
            </p>
          </div>
        </div>
      </section>

      <main className="container max-w-6xl mx-auto px-4 py-10 flex-1 space-y-10">
        {/* Mandatory Emotional Care & CVV 188 Notice */}
        <EmotionalCareNotice />

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Submit Prayer Request Form */}
          <div className="lg:col-span-5">
            <Card className="bg-white border border-[#E8E4E0] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-[#1a1f3a] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#D4AF37]" />
                  Enviar Pedido de Oração
                </CardTitle>
                <p className="text-xs text-gray-500">
                  Para proteger sua privacidade, recomendamos usar apenas seu primeiro nome e cidade/estado (ex.: Maria S. — Recife, PE). Seu e-mail nunca é exibido publicamente.
                </p>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="p-6 text-center rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h3 className="font-bold text-emerald-950 text-base">
                      Pedido recebido com carinho!
                    </h3>
                    <p className="text-xs text-emerald-800">
                      Seu motivo já foi registrado no mural e na nossa equipe de intercessão.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="comm-name" className="text-xs font-bold uppercase text-gray-600">
                        Seu Nome (ou Primeiro Nome + Cidade) *
                      </Label>
                      <Input
                        id="comm-name"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ex.: Irmão João (Campinas, SP)"
                        className="mt-1.5 bg-[#F9F7F4]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="comm-email" className="text-xs font-bold uppercase text-gray-600">
                        Seu E-mail (Opcional — nunca publicado)
                      </Label>
                      <Input
                        id="comm-email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="mt-1.5 bg-[#F9F7F4]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="comm-msg" className="text-xs font-bold uppercase text-gray-600">
                        Motivo de Oração ou Ação de Graças *
                      </Label>
                      <Textarea
                        id="comm-msg"
                        required
                        rows={4}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Compartilhe com paz e respeito seu motivo de oração..."
                        className="mt-1.5 bg-[#F9F7F4]"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-[#F9F7F4] border border-[#E8E4E0] text-[11px] text-gray-600 flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>
                        Este espaço é moderado pela equipe editorial e é <strong>100% livre de anúncios</strong>. Não exponha dados bancários, documentos ou informações médicas sigilosas de terceiros.
                      </span>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#1a1f3a] hover:bg-[#2d3561] text-white font-bold py-5 gap-2"
                    >
                      <Send className="w-4 h-4 text-[#D4AF37]" />
                      Compartilhar Pedido de Oração
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Moderated Prayer Wall */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1a1f3a]">
                Mural de Intercessão ({publicPrayers.length})
              </h2>
              <span className="text-xs text-gray-500">
                Clique em "Estou Orando" para encorajar um irmão
              </span>
            </div>

            <div className="space-y-4">
              {publicPrayers.map(req => {
                const hasPrayed = prayedIds.includes(req.id);
                return (
                  <Card key={req.id} className="bg-white border border-[#E8E4E0] shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <span className="inline-block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                            Pedido de Intercessão • {req.date}
                          </span>
                          <h3 className="text-base font-bold text-[#1a1f3a] mt-0.5">{req.name}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => handlePrayForRequest(req.id)}
                          disabled={hasPrayed}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                            hasPrayed
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#1a1f3a] text-[#D4AF37] hover:bg-[#2d3561]'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${hasPrayed ? 'fill-white' : ''}`} />
                          <span>
                            {hasPrayed ? 'Orando por você' : 'Estou Orando'} (
                            {req.prayingCount || 1})
                          </span>
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{req.message}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* Guide for Prayer Groups */}
        <section className="bg-white rounded-2xl border border-[#E8E4E0] p-6 sm:p-8 shadow-sm">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Guia para Grupos de Intercessão
              </span>
              <h2 className="text-2xl font-bold text-[#1a1f3a]">
                Como organizar uma corrente de oração saudável na sua família ou igreja
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Evite fofocas disfarçadas de pedidos de oração: peça sempre autorização antes de compartilhar a necessidade de alguém, interceda com base em promessas bíblicas contextualizadas e combine a oração com atitudes práticas de serviço fraterno (Tiago 2:15-16).
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3">
              <Link href="/blog/guia-pratico-de-oracao-para-familias-intercedendo-pelo-lar-e-filhos">
                <Button className="w-full bg-[#1a1f3a] hover:bg-[#2d3561] text-white gap-2">
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  Guia de Oração Familiar
                </Button>
              </Link>
              <Link href="/materiais">
                <Button variant="outline" className="w-full">
                  Abrir Meu Caderno Privado
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
