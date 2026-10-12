import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  FolderHeart,
  Plus,
  Trash2,
  CheckCircle2,
  Heart,
  Sparkles,
  BookOpen,
  Printer,
  Download,
  ChevronRight,
  Home,
  FileText,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import AffiliateBox from '@/components/AffiliateBox';
import EmotionalCareNotice from '@/components/EmotionalCareNotice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { trackConversionEvent } from '@/lib/analytics';

type NotebookItemType = 'pedido' | 'gratidao' | 'versiculo';

interface PrayerNotebookEntry {
  id: string;
  type: NotebookItemType;
  category: string;
  title: string;
  notes: string;
  createdAt: string;
  answered: boolean;
}

const NOTEBOOK_STORAGE_KEY = 'gloria_prayer_notebook_v1';

const DEFAULT_NOTEBOOK_ENTRIES: PrayerNotebookEntry[] = [
  {
    id: 'nb-1',
    type: 'pedido',
    category: 'Família & Lar',
    title: 'Sabedoria e paz para o nosso culto doméstico semanal',
    notes: 'Deuteronômio 6:6-7 — Que a Palavra do Senhor seja amada e praticada em nossa casa.',
    createdAt: '2026-10-12',
    answered: false,
  },
  {
    id: 'nb-2',
    type: 'gratidao',
    category: 'Ação de Graças',
    title: 'Pelo sustento diário, saúde e cuidado fiel de Deus',
    notes: 'Lamentações 3:22-23 — As misericórdias do Senhor renovam-se a cada manhã.',
    createdAt: '2026-10-12',
    answered: true,
  },
  {
    id: 'nb-3',
    type: 'versiculo',
    category: 'Meditação',
    title: 'Filipenses 4:6-7 — A Paz que excede todo o entendimento',
    notes: 'Apresentar toda inquietação diante de Deus pela oração e súplica com ações de graças.',
    createdAt: '2026-10-12',
    answered: false,
  },
];

interface PrintableGuide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  duration: string;
  steps: string[];
  scripture: string;
  articleHref: string;
}

const PRINTABLE_GUIDES: PrintableGuide[] = [
  {
    id: 'guia-culto-domestico',
    title: 'Roteiro Imprimível de Culto Doméstico em Família (15 Minutos)',
    subtitle: 'Estrutura simples e acolhedora para casais, crianças e adolescentes ao redor da mesa.',
    badge: 'Família & Lar',
    duration: '15 a 20 min',
    scripture: 'Deuteronômio 6:6-7; Salmo 127:1; Colossenses 3:16',
    articleHref: '/blog/como-organizar-culto-domestico-simples-edificante-familia',
    steps: [
      '1. Acolhimento e Silêncio (2 min): Desligar celulares e agradecer a Deus por estarem reunidos.',
      '2. Cântico ou Louvor (3 min): Cantar um hino conhecido ou ouvir um louvor congregacional.',
      '3. Leitura Bíblica Breve (4 min): Ler um Salmo ou trecho de 8 a 10 versículos dos Evangelhos.',
      '4. Duas Perguntas Práticas (4 min): "O que aprendemos sobre Deus aqui?" e "Como praticar isso amanhã?"',
      '5. Oração de Gratidão e Intercessão (3 min): Cada membro agradece por algo do dia e ora pelo lar.',
    ],
  },
  {
    id: 'guia-pequenos-grupos',
    title: 'Roteiro para Líderes de Pequenos Grupos, Células e Jovens (60 Minutos)',
    subtitle: 'Modelo dos 4 Pilares (Acolhimento, Adoração, Edificação Bíblica e Intercessão Mútua).',
    badge: 'Igreja Local & Células',
    duration: '60 min',
    scripture: 'Atos 2:42-47; Gálatas 6:2; Hebreus 10:24-25',
    articleHref: '/blog/recursos-praticos-roteiro-lideres-pequenos-grupos-celulas',
    steps: [
      '1. Boas-vindas e Quebra-Gelo Edificante (10 min): Receber visitantes pelo nome sem constrangê-los.',
      '2. Louvor e Leitura de Salmo (10 min): Dois cânticos cristocêntricos e oração de abertura.',
      '3. Estudo Bíblico Participativo (25 min): Leitura do texto + 3 perguntas de Observação e Aplicação.',
      '4. Oração em Duplas e Cuidado Fraterno (15 min): Registrar motivos no caderno e orar uns pelos outros.',
    ],
  },
  {
    id: 'guia-metodo-indutivo',
    title: 'Folha de Estudo Bíblico Individual (Observação, Interpretação e Aplicação)',
    subtitle: 'Modelo prático para estudar qualquer capítulo da Bíblia com profundidade e fidelidade ao contexto.',
    badge: 'Estudo Bíblico',
    duration: '20 a 30 min',
    scripture: 'Atos 17:11; 2 Timóteo 2:15; Tiago 1:22',
    articleHref: '/blog/como-estudar-texto-biblico-metodo-observacao-interpretacao-aplicacao',
    steps: [
      '1. Oração de Iluminação: "Senhor, desvenda os meus olhos para contemplar as maravilhas da Tua Palavra" (Salmo 119:18).',
      '2. Observação (O que o texto diz?): Quem fala? Para quem? Quais palavras se repetem?',
      '3. Interpretação (O que o texto significa?): Qual a mensagem central para os ouvintes originais e o que revela sobre Cristo?',
      '4. Aplicação (O que devo praticar?): Qual atitude, arrependimento ou ação de amor farei hoje?',
    ],
  },
];

export default function MaterialsAndNotebook() {
  const [entries, setEntries] = useState<PrayerNotebookEntry[]>(() => {
    try {
      const raw = localStorage.getItem(NOTEBOOK_STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT_NOTEBOOK_ENTRIES;
    } catch {
      return DEFAULT_NOTEBOOK_ENTRIES;
    }
  });

  const [type, setType] = useState<NotebookItemType>('pedido');
  const [category, setCategory] = useState('Família & Lar');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [filterType, setFilterType] = useState<NotebookItemType | 'todos'>('todos');

  useEffect(() => {
    try {
      localStorage.setItem(NOTEBOOK_STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEntry: PrayerNotebookEntry = {
      id: `nb-${Date.now()}`,
      type,
      category,
      title: title.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      answered: false,
    };

    setEntries(prev => [newEntry, ...prev]);
    setTitle('');
    setNotes('');

    trackConversionEvent('prayer_notebook_save', {
      label: type,
      category,
    });
  };

  const toggleAnswered = (id: string) => {
    setEntries(prev =>
      prev.map(item => (item.id === id ? { ...item, answered: !item.answered } : item))
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(item => item.id !== id));
  };

  const handleExportNotebook = () => {
    trackConversionEvent('download_devotional', {
      label: 'caderno_oracao_txt',
      category: 'prayer_notebook',
    });

    const lines = [
      '====================================================================',
      'MEU CADERNO DE ORAÇÃO, GRATIDÃO E MEDITAÇÃO — GLÓRIA EM LOUVORES',
      '====================================================================',
      '',
    ];

    entries.forEach(item => {
      const status = item.answered ? '[RESPONDIDO / CELEBRADO]' : '[EM ORAÇÃO]';
      lines.push(`[${item.type.toUpperCase()}] ${status} (${item.createdAt}) - ${item.category}`);
      lines.push(`Motivo / Título: ${item.title}`);
      if (item.notes) lines.push(`Anotações / Versículo: ${item.notes}`);
      lines.push('--------------------------------------------------------------------');
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu-caderno-de-oracao-gloria-em-louvores.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadGuide = (guide: PrintableGuide) => {
    trackConversionEvent('download_devotional', {
      label: guide.id,
      category: 'printable_guide',
    });

    const content = [
      '====================================================================',
      `GLÓRIA EM LOUVORES — ${guide.title.toUpperCase()}`,
      '====================================================================',
      `Categoria: ${guide.badge} | Duração sugerida: ${guide.duration}`,
      `Base Bíblica: ${guide.scripture}`,
      '',
      guide.subtitle,
      '',
      'PASSO A PASSO:',
      ...guide.steps,
      '',
      `Estudo completo em: https://gloriaemlouvores.com.br${guide.articleHref}`,
      '====================================================================',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${guide.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEntries =
    filterType === 'todos' ? entries : entries.filter(e => e.type === filterType);

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Caderno de Oração Interativo e Materiais Gratuitos | Glória em Louvores"
        description="Organize seus pedidos de oração, motivos de gratidão e versículos de meditação no Caderno de Oração Interativo e baixe guias gratuitos para culto doméstico e células."
        keywords="caderno de oração online, diário de oração cristão, materiais gratuitos culto doméstico, roteiro célula pdf"
        canonicalPath="/materiais"
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Caderno de Oração e Materiais Gratuitos', path: '/materiais' },
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
            <span className="text-[#D4AF37] font-semibold">Caderno de Oração & Materiais</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full px-3.5 py-1 text-xs font-semibold text-[#D4AF37] mb-4">
                <FolderHeart className="w-3.5 h-3.5" />
                100% Gratuito • Privado no seu Dispositivo
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Caderno de Oração Interativo e Central de Guias Práticos
              </h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                Registre seus pedidos de intercessão, celebre orações respondidas, guarde versículos de meditação e imprima roteiros para o culto doméstico e pequenos grupos.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:bg-white/20 gap-2"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                Imprimir Página
              </Button>
              <Button
                onClick={handleExportNotebook}
                className="bg-[#D4AF37] hover:bg-[#B8942E] text-[#111528] font-bold gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar Caderno (.TXT)
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container max-w-6xl mx-auto px-4 py-10 flex-1 space-y-12">
        {/* Interactive Prayer Notebook Section */}
        <section className="grid lg:grid-cols-12 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-5">
            <Card className="bg-white border border-[#E8E4E0] shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-[#1a1f3a] flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#D4AF37]" />
                  Novo Registro no Caderno
                </CardTitle>
                <p className="text-xs text-gray-500">
                  Suas anotações ficam salvas de forma privada no armazenamento local do seu navegador.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEntry} className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold uppercase text-gray-600">
                      Tipo de Registro
                    </Label>
                    <div className="grid grid-cols-3 gap-2 mt-1.5">
                      {[
                        { id: 'pedido', label: '🙏 Pedido' },
                        { id: 'gratidao', label: '🙌 Gratidão' },
                        { id: 'versiculo', label: '📖 Versículo' },
                      ].map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setType(tab.id as NotebookItemType)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                            type === tab.id
                              ? 'bg-[#1a1f3a] text-[#D4AF37] border-[#1a1f3a]'
                              : 'bg-[#F9F7F4] text-gray-700 border-[#E8E4E0]'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="nb-cat" className="text-xs font-bold uppercase text-gray-600">
                      Área / Categoria
                    </Label>
                    <select
                      id="nb-cat"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#E8E4E0] bg-[#F9F7F4] px-3 py-2.5 text-sm"
                    >
                      <option value="Família & Lar">Família & Lar</option>
                      <option value="Saúde & Consolo">Saúde & Consolo</option>
                      <option value="Igreja & Ministério">Igreja & Ministério</option>
                      <option value="Trabalho & Vocação">Trabalho & Vocação</option>
                      <option value="Crescimento Espiritual">Crescimento Espiritual</option>
                      <option value="Ação de Graças">Ação de Graças</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="nb-title" className="text-xs font-bold uppercase text-gray-600">
                      Motivo de Oração, Gratidão ou Referência *
                    </Label>
                    <Input
                      id="nb-title"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Ex.: Pela saúde da família / Salmo 23:1..."
                      className="mt-1.5 bg-[#F9F7F4]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="nb-notes" className="text-xs font-bold uppercase text-gray-600">
                      Versículo de Base ou Anotações Pessoais
                    </Label>
                    <Textarea
                      id="nb-notes"
                      rows={3}
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Escreva detalhes, nomes ou o texto bíblico de meditação..."
                      className="mt-1.5 bg-[#F9F7F4]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#1a1f3a] hover:bg-[#2d3561] text-white font-bold py-5 gap-2"
                  >
                    <Plus className="w-4 h-4 text-[#D4AF37]" />
                    Salvar no Meu Caderno de Oração
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Entries List Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E8E4E0] p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'todos', label: `Todos (${entries.length})` },
                  { id: 'pedido', label: '🙏 Pedidos' },
                  { id: 'gratidao', label: '🙌 Gratidão' },
                  { id: 'versiculo', label: '📖 Versículos' },
                ].map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilterType(f.id as NotebookItemType | 'todos')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      filterType === f.id
                        ? 'bg-[#1a1f3a] text-[#D4AF37]'
                        : 'bg-[#F9F7F4] text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {entries.filter(e => e.answered).length} respondidos/celebrados
              </span>
            </div>

            {filteredEntries.length === 0 ? (
              <Card className="bg-white border-[#E8E4E0]">
                <CardContent className="p-8 text-center text-gray-500 text-sm">
                  Nenhum registro encontrado neste filtro. Adicione seu primeiro motivo ao lado!
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredEntries.map(item => (
                  <Card
                    key={item.id}
                    className={`border transition-all ${
                      item.answered
                        ? 'border-emerald-400/60 bg-emerald-50/30'
                        : 'border-[#E8E4E0] bg-white'
                    }`}
                  >
                    <CardContent className="p-5 flex items-start justify-between gap-4">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1a1f3a]/10 text-[#1a1f3a]">
                            {item.type === 'pedido'
                              ? '🙏 Pedido'
                              : item.type === 'gratidao'
                              ? '🙌 Gratidão'
                              : '📖 Versículo'}
                          </span>
                          <span className="text-xs font-semibold text-[#D4AF37]">
                            {item.category}
                          </span>
                          <span className="text-xs text-gray-400">• {item.createdAt}</span>
                        </div>
                        <h3 className="text-base font-bold text-[#1a1f3a]">{item.title}</h3>
                        {item.notes && (
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            {item.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleAnswered(item.id)}
                          title="Marcar como oração respondida / celebrada"
                          className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                            item.answered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#F9F7F4] text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {item.answered ? 'Respondido' : 'Marcar Resposta'}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteEntry(item.id)}
                          aria-label="Excluir anotação"
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Printable Guides for Domestic Worship and Small Groups */}
        <section className="pt-8 border-t border-[#E8E4E0]">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Guias Imprimíveis & Roteiros Pastorais
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1f3a] mt-1">
              Materiais Gratuitos para Culto Doméstico, Células e Estudo Bíblico
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PRINTABLE_GUIDES.map(guide => (
              <Card
                key={guide.id}
                className="bg-white border border-[#E8E4E0] shadow-sm flex flex-col justify-between"
              >
                <CardContent className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#1a1f3a]">
                        {guide.badge}
                      </span>
                      <span className="text-xs text-gray-500">{guide.duration}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1f3a] mb-1.5">{guide.title}</h3>
                    <p className="text-xs text-gray-600 mb-3">{guide.subtitle}</p>
                    <p className="text-xs font-semibold text-[#1a1f3a] bg-[#F9F7F4] p-2.5 rounded-lg border border-[#E8E4E0]">
                      📖 Base: {guide.scripture}
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs text-gray-700 border-t border-gray-100 pt-3">
                    {guide.steps.map((st, i) => (
                      <li key={i} className="leading-relaxed">
                        {st}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                    <Button
                      onClick={() => handleDownloadGuide(guide)}
                      className="w-full bg-[#1a1f3a] hover:bg-[#2d3561] text-white text-xs font-bold gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Baixar Roteiro Imprimível (.TXT)
                    </Button>
                    <Link href={guide.articleHref}>
                      <Button variant="outline" className="w-full text-xs gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        Ler Estudo Completo
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <EmotionalCareNotice compact />
        <AffiliateBox affiliateId="planner-devocional-diario" />
      </main>

      <Footer />
    </div>
  );
}
