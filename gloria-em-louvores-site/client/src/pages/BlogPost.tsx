import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calendar,
  Share2,
  BookOpen,
  Clock,
  CheckCircle2,
  ListChecks,
  HelpCircle,
  BookmarkCheck,
  Printer,
  ChevronRight,
  Home,
  UserCheck,
} from 'lucide-react';
import { Link, useParams } from 'wouter';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import AffiliateBox from '@/components/AffiliateBox';
import AdSlot from '@/components/AdSlot';
import EmotionalCareNotice from '@/components/EmotionalCareNotice';
import { trackConversionEvent } from '@/lib/analytics';

export default function BlogPost() {
  const { blogPosts } = useData();
  const params = useParams();
  const post = blogPosts.find(p => p.id === params.id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F9F7F4]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-24 px-4">
          <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-[#E8E4E0] shadow-sm">
            <h1 className="text-3xl font-bold text-[#1a1f3a] mb-3">Artigo não encontrado</h1>
            <p className="text-gray-600 text-sm mb-6">
              O estudo ou devocional que você procura pode ter mudado de endereço. Explore nosso acervo completo abaixo.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/blog">
                <Button className="bg-[#1a1f3a] hover:bg-[#2d3561] text-white">
                  Ver Todos os Estudos
                </Button>
              </Link>
              <Link href="/plano-de-leitura">
                <Button variant="outline">Plano de Leitura</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do estudo copiado para a área de transferência!');
    }
  };

  const handlePrintOrDownload = () => {
    trackConversionEvent('download_devotional', {
      label: post.id,
      category: post.categorySlug || post.tag,
    });
    window.print();
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.categorySlug === post.categorySlug || p.tag === post.tag))
    .slice(0, 3);

  const hubPath = post.categorySlug ? `/${post.categorySlug}` : '/blog';

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.description}
        keywords={post.seoKeywords}
        canonicalPath={`/blog/${post.id}`}
        ogType="article"
        publishedTime={post.date}
        modifiedTime={post.updatedAt || post.date}
        authorName={post.author || 'Equipe Editorial Glória em Louvores'}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: post.tag, path: hubPath },
          { name: post.title, path: `/blog/${post.id}` },
        ]}
        faqs={post.faqs}
      />
      <Navbar />

      {/* Hero Header */}
      <header className="pt-28 pb-12 bg-gradient-to-br from-[#1a1f3a] via-[#1a1f3a] to-[#0f1325] text-white">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-white/70 mb-6">
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link href={hubPath} className="hover:text-[#D4AF37]">
              {post.tag}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold line-clamp-1">{post.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold px-3.5 py-1 rounded-full">
              <span>{post.icon}</span>
              <span>{post.tag}</span>
            </span>
            <span className="text-xs text-white/75 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> Publicado em {post.date}
            </span>
            {post.readingTime && (
              <span className="text-xs text-white/75 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {post.readingTime}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed mb-6">
            {post.description}
          </p>

          {/* Author & Editorial Verification */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-white/15 text-xs text-white/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold">
                GL
              </div>
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  {post.author || 'Equipe Editorial Glória em Louvores'}
                </div>
                <div className="text-white/60">
                  {post.authorRole || 'Revisão Bíblica e Pastoral'} • Textos Bíblicos Almeida
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrintOrDownload}
                className="border-white/25 bg-white/5 text-white hover:bg-white/15 text-xs gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
                Imprimir / Salvar PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-white/25 bg-white/5 text-white hover:bg-white/15 text-xs gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <article className="container max-w-4xl mx-auto px-4 py-10 flex-1">
        <div className="bg-white rounded-2xl border border-[#E8E4E0] p-6 sm:p-10 shadow-sm">
          {/* Mandatory Emotional Care Notice when article covers grief, anxiety, fear, or emotional suffering */}
          {post.requiresEmotionalCareNotice && (
            <div className="mb-8">
              <EmotionalCareNotice />
            </div>
          )}

          {/* Summary Box (O que você vai aprender neste estudo) */}
          {post.summaryBox && post.summaryBox.length > 0 && (
            <div className="mb-8 rounded-2xl bg-[#F9F7F4] border border-[#D4AF37]/30 p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-[#1a1f3a] flex items-center gap-2 mb-3">
                <BookmarkCheck className="w-5 h-5 text-[#D4AF37]" />
                Resumo do Estudo e Pontos-Chave
              </h2>
              <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                {post.summaryBox.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents (Índice TOC) */}
          {post.toc && post.toc.length > 0 && (
            <nav
              aria-label="Índice do Artigo"
              className="mb-8 rounded-2xl border border-[#E8E4E0] bg-white p-5"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1a1f3a] mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                Índice deste Estudo
              </h2>
              <ol className="grid sm:grid-cols-2 gap-2 text-sm">
                {post.toc.map(item => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-gray-700 hover:text-[#1a1f3a] hover:underline flex items-center gap-1.5 py-1"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Main Article Body */}
          {post.content ? (
            <div
              className="prose prose-lg max-w-none prose-headings:text-[#1a1f3a] prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-a:text-[#1a1f3a] prose-a:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-[#D4AF37] prose-blockquote:bg-[#F9F7F4] prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:text-[#1a1f3a]"
              dangerouslySetInnerHTML={{
                __html: post.content.replace(/className=/g, 'class='),
              }}
            />
          ) : null}

          {/* Practical Application Box */}
          {post.practicalApplication && post.practicalApplication.length > 0 && (
            <section className="mt-10 rounded-2xl bg-gradient-to-br from-[#1a1f3a] to-[#252c52] text-white p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 mb-4">
                <ListChecks className="w-6 h-6 text-[#D4AF37]" />
                Aplicação Prática para sua Rotina, Família ou Igreja
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-white/90">
                {post.practicalApplication.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#111528] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Ethical Reading Recommendation (AffiliateBox) */}
          <AffiliateBox
            affiliateId={post.affiliateId}
            category={post.affiliateCategory || 'biblia-de-estudo'}
          />

          {/* FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-10 pt-8 border-t border-[#E8E4E0]">
              <h2 className="text-2xl font-bold text-[#1a1f3a] flex items-center gap-2 mb-6">
                <HelpCircle className="w-6 h-6 text-[#D4AF37]" />
                Perguntas Frequentes sobre este Tema
              </h2>
              <div className="space-y-4">
                {post.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#E8E4E0] bg-[#F9F7F4] p-5"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-[#1a1f3a] mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Theological & Historical Sources */}
          {post.theologicalSources && post.theologicalSources.length > 0 && (
            <section className="mt-10 pt-6 border-t border-[#E8E4E0] text-xs sm:text-sm text-gray-600">
              <h3 className="font-bold text-[#1a1f3a] uppercase tracking-wider text-xs mb-3">
                Fontes Bíblicas, Teológicas e Referências de Estudo
              </h3>
              <ul className="list-disc list-inside space-y-1.5">
                {post.theologicalSources.map((src, i) => (
                  <li key={i}>{src}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Controlled AdSlot at bottom of article */}
          <AdSlot slotId={`article-bottom-${post.id}`} />

          {/* Bottom Navigation & Tools */}
          <div className="mt-10 pt-8 border-t border-[#E8E4E0] flex flex-wrap items-center justify-between gap-4">
            <Link href={hubPath}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar para {post.tag}
              </Button>
            </Link>
            <div className="flex flex-wrap gap-3">
              <Link href="/plano-de-leitura">
                <Button variant="outline" className="border-[#1a1f3a] text-[#1a1f3a]">
                  Plano de Leitura Bíblica
                </Button>
              </Link>
              <Link href="/materiais">
                <Button className="bg-[#D4AF37] hover:bg-[#B8942E] text-[#111528] font-bold">
                  Abrir Caderno de Oração
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[#1a1f3a] mb-6">
              Estudos e Guias Relacionados
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedPosts.map(rel => (
                <Link key={rel.id} href={`/blog/${rel.id}`}>
                  <div className="bg-white rounded-2xl border border-[#E8E4E0] hover:border-[#D4AF37] p-5 h-full flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-md transition-all">
                    <div>
                      <span className="text-2xl mb-2 block">{rel.icon}</span>
                      <h3 className="font-bold text-[#1a1f3a] text-base mb-2 line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">{rel.description}</p>
                    </div>
                    <span className="text-xs font-bold text-[#D4AF37] mt-4 inline-block">
                      Ler estudo →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </div>
  );
}
