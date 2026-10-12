import { Link } from 'wouter';
import {
  ShieldCheck,
  BookOpen,
  Users,
  Youtube,
  Scale,
  CheckCircle2,
  ChevronRight,
  Home,
  HeartHandshake,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import EmotionalCareNotice from '@/components/EmotionalCareNotice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Sobre Nós, Equipe Editorial e Direitos Autorais | Glória em Louvores"
        description="Conheça a missão do portal Glória em Louvores, nossa Equipe Editorial, Metodologia de Estudo Bíblico e Política de Direitos Autorais e Incorporação Oficial."
        canonicalPath="/sobre"
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Sobre Nós e Direitos Autorais', path: '/sobre' },
        ]}
      />
      <Navbar />

      <section className="pt-28 pb-12 bg-gradient-to-br from-[#1a1f3a] via-[#1a1f3a] to-[#0f1325] text-white">
        <div className="container max-w-5xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70 mb-6">
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold">Sobre Nós e Direitos Autorais</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Sobre o Glória em Louvores: Missão, Metodologia Editorial e Direitos Autorais
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-3xl leading-relaxed">
            Um portal cristão de utilidade prática dedicado a servir famílias, estudantes da Bíblia e igrejas locais com devocionais, estudos bíblicos contextualizados, ferramentas de oração e curadoria de adoração.
          </p>
        </div>
      </section>

      <main className="container max-w-5xl mx-auto px-4 py-12 flex-1 space-y-10">
        {/* 1. Nossa Missão e Proposta Editorial */}
        <Card className="bg-white border border-[#E8E4E0] shadow-sm">
          <CardContent className="p-7 sm:p-10 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <BookOpen className="w-4 h-4" />
              1. Nossa Missão Cristã
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1f3a]">
              Utilidade prática para a vida devocional e para a igreja local
            </h2>
            <p className="text-gray-700 leading-relaxed">
              O <strong>Glória em Louvores</strong> (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">gloriaemlouvores.com.br</code>) nasceu como uma extensão de serviço cristão ao canal oficial no YouTube (<a href="https://www.youtube.com/@gloriaemlouvores" target="_blank" rel="noopener noreferrer" className="text-[#1a1f3a] font-semibold underline">@gloriaemlouvores</a>). Nosso propósito é oferecer recursos gratuitos, bíblicos e acolhedores que ajudem cada leitor a desenvolver constância na leitura das Escrituras, profundidade na vida de oração e edificação no lar e na comunidade de fé.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Rejeitamos qualquer forma de sensacionalismo religioso, promessas apelativas de prosperidade automática ou barganha espiritual. Nossa linguagem é reverente, cristocêntrica, pastoral e respeitosa com cristãos de diversas tradições e denominações históricas.
            </p>
          </CardContent>
        </Card>

        {/* 2. Equipe Editorial / Autores e Metodologia */}
        <Card className="bg-white border border-[#E8E4E0] shadow-sm">
          <CardContent className="p-7 sm:p-10 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <Users className="w-4 h-4" />
              2. Equipe Editorial e Metodologia de Produção
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1f3a]">
              Como nossos estudos bíblicos, devocionais e guias são elaborados
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Todo o conteúdo publicado em nossas categorias (<Link href="/devocionais" className="underline font-medium">Devocionais</Link>, <Link href="/oracoes" className="underline font-medium">Orações</Link>, <Link href="/estudos-biblicos" className="underline font-medium">Estudos Bíblicos</Link>, <Link href="/familia" className="underline font-medium">Família</Link>, <Link href="/jovens" className="underline font-medium">Jovens</Link> e <Link href="/recursos-para-igrejas" className="underline font-medium">Recursos para Igrejas</Link>) passa por um processo de curadoria e revisão baseado em quatro pilares:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Exegese e Contexto Histórico',
                  desc: 'Nunca isolamos versículos fora do seu contexto. Explicamos quem escreveu, para quem escreveu e o sentido original do texto bíblico.',
                },
                {
                  title: 'Método Indutivo (O.I.A.)',
                  desc: 'Estruturamos os estudos com Observação cuidadosa do texto, Interpretação fiel às Escrituras e Aplicação prática para a rotina.',
                },
                {
                  title: 'Fontes Teológicas Reconhecidas',
                  desc: 'Citamos referências bíblicas precisas, léxicos, comentários clássicos e autores cristãos respeitados ao final de cada estudo.',
                },
                {
                  title: 'Responsabilidade Emocional e Médica',
                  desc: 'Em temas como luto, medo e ansiedade, unimos o consolo bíblico ao incentivo explícito ao acompanhamento médico e psicológico (CVV 188).',
                },
              ].map((pilar, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F9F7F4] border border-[#E8E4E0]">
                  <h3 className="font-bold text-[#1a1f3a] text-base mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    {pilar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{pilar.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 3. Política de Direitos Autorais, Textos Bíblicos e Músicas */}
        <Card className="bg-white border border-[#D4AF37]/40 shadow-sm">
          <CardContent className="p-7 sm:p-10 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <Scale className="w-4 h-4" />
              3. Política de Direitos Autorais e Propriedade Intelectual
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1f3a]">
              Compromisso com a legalidade, textos bíblicos e incorporação oficial
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Em conformidade com a Lei Brasileira de Direitos Autorais (Lei nº 9.610/98), com as políticas do Google Publisher / AdSense e com a ética cristã (Romanos 13:7; 1 Timóteo 5:18), o portal <strong>Glória em Louvores</strong> adota as seguintes diretrizes estritas:
            </p>

            <ul className="space-y-3 text-sm sm:text-base text-gray-700">
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Reflexões e Estudos 100% Originais:</strong> Todos os artigos, roteiros de culto doméstico, guias para células e devocionais publicados neste site são textos autorais originais elaborados para edificação dos leitores.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Citações Bíblicas em Domínio Público e Creditadas:</strong> Utilizamos prioritariamente a tradução <em>João Ferreira de Almeida</em> em domínio público, além de referências devidamente creditadas dentro dos limites legais de citação para estudo e comentário teológico.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Youtube className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  <strong>Incorporação Oficial do YouTube (Sem Redistribuição Indevida):</strong> Este site <strong>NÃO hospeda downloads piratas de MP3</strong> e <strong>NÃO copia nem redistribui letras integrais de músicas ou cifras protegidas sem licença</strong>. Todos os vídeos musicais exibidos utilizam exclusivamente o player oficial de incorporação (<em>embed</em>) do YouTube, garantindo que os direitos e visualizações pertençam integralmente aos canais oficiais.
                </span>
              </li>
            </ul>

            <div className="pt-4 flex flex-wrap gap-3">
              <Link href="/contato">
                <Button className="bg-[#1a1f3a] hover:bg-[#2d3561] text-white">
                  Falar com a Equipe Editorial
                </Button>
              </Link>
              <Link href="/transparencia-afiliados">
                <Button variant="outline">Política de Transparência e Afiliados</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <EmotionalCareNotice />
      </main>

      <Footer />
    </div>
  );
}
