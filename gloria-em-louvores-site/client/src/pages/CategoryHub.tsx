import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import {
  Search,
  Calendar,
  Clock,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Home,
  Sparkles,
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { CATEGORY_HUBS_META, CategorySlug } from '@/lib/articlesData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import AffiliateBox from '@/components/AffiliateBox';
import AdSlot from '@/components/AdSlot';
import EmotionalCareNotice from '@/components/EmotionalCareNotice';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CategoryHubProps {
  categorySlug: CategorySlug;
}

const ALL_HUBS: CategorySlug[] = [
  'devocionais',
  'oracoes',
  'estudos-biblicos',
  'versiculos',
  'familia',
  'jovens',
  'musica-e-adoracao',
  'recursos-para-igrejas',
];

export default function CategoryHub({ categorySlug }: CategoryHubProps) {
  const { blogPosts } = useData();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'categoria' | 'todos'>('categoria');

  const meta = CATEGORY_HUBS_META[categorySlug] || CATEGORY_HUBS_META.devocionais;

  const matchingPosts = useMemo(() => {
    const baseList =
      selectedFilter === 'todos'
        ? blogPosts
        : blogPosts.filter(
            p =>
              p.categorySlug === categorySlug ||
              p.tag.toLowerCase().includes(meta.title.split(' ')[0].toLowerCase())
          );

    if (!search.trim()) return baseList;
    const q = search.toLowerCase();
    return baseList.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q)
    );
  }, [blogPosts, categorySlug, meta.title, search, selectedFilter]);

  const showEmotionalNotice =
    categorySlug === 'oracoes' || categorySlug === 'versiculos' || categorySlug === 'devocionais';

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title={meta.seoTitle}
        description={meta.seoDescription}
        canonicalPath={`/${meta.slug}`}
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: meta.title, path: `/${meta.slug}` },
        ]}
      />
      <Navbar />

      {/* Hero Header */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-[#1a1f3a] via-[#1a1f3a] to-[#0f1325] text-white">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70 mb-6">
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold">{meta.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-xs font-semibold text-[#D4AF37] mb-4">
                <span>{meta.icon}</span>
                <span>Hub Temático & Utilidade Prática</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {meta.title}
              </h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                {meta.subtitle}
              </p>
            </div>

            <div className="shrink-0">
              <Link href={meta.relatedToolHref}>
                <Button className="bg-[#D4AF37] hover:bg-[#B8942E] text-[#111528] font-bold px-6 py-6 rounded-xl shadow-lg gap-2">
                  <Sparkles className="w-4 h-4" />
                  {meta.relatedToolLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Switcher Pills & Search */}
      <section className="bg-white border-b border-[#E8E4E0] py-5 sticky top-16 sm:top-20 z-40">
        <div className="container max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {ALL_HUBS.map(slug => {
              const item = CATEGORY_HUBS_META[slug];
              const isCurrent = slug === categorySlug;
              return (
                <Link key={slug} href={`/${slug}`}>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1a1f3a] text-[#D4AF37] shadow-sm'
                        : 'bg-[#F9F7F4] text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.title.split(' ')[0]}</span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar estudo, versículo ou guia..."
                className="pl-9 bg-[#F9F7F4] border-[#E8E4E0] text-sm"
              />
            </div>
            <Button
              variant={selectedFilter === 'todos' ? 'default' : 'outline'}
              size="sm"
              onClick={() =>
                setSelectedFilter(selectedFilter === 'categoria' ? 'todos' : 'categoria')
              }
              className="text-xs shrink-0"
            >
              {selectedFilter === 'categoria' ? 'Ver Todas as Categorias' : 'Apenas desta Categoria'}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-10 flex-1">
        {showEmotionalNotice && (
          <div className="mb-8">
            <EmotionalCareNotice compact />
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a1f3a]">
            {selectedFilter === 'categoria'
              ? `Estudos e Guias em ${meta.title}`
              : 'Todos os Artigos e Estudos do Portal'}{' '}
            <span className="text-sm font-normal text-gray-500">({matchingPosts.length})</span>
          </h2>
          <Link href="/blog" className="text-xs sm:text-sm font-semibold text-[#1a1f3a] hover:text-[#D4AF37]">
            Ver acervo completo →
          </Link>
        </div>

        {matchingPosts.length === 0 ? (
          <Card className="bg-white border-[#E8E4E0]">
            <CardContent className="p-10 text-center space-y-4">
              <p className="text-gray-600">
                Nenhum artigo encontrado para sua busca nesta categoria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('');
                  setSelectedFilter('todos');
                }}
              >
                Mostrar todos os 12 estudos e guias
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="bg-white border border-[#E8E4E0] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer group">
                  <div className="h-36 bg-gradient-to-br from-[#1a1f3a] to-[#283056] flex items-center justify-between px-6 relative overflow-hidden">
                    <span className="text-5xl group-hover:scale-110 transition-transform">
                      {post.icon}
                    </span>
                    <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                          {post.date}
                        </span>
                        {post.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                            {post.readingTime}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#1a1f3a] group-hover:text-[#D4AF37] transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {post.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#1a1f3a] group-hover:text-[#D4AF37]">
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        Ler estudo completo
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Ethical Affiliate Recommendation for this Category */}
        <div className="mt-12">
          <AffiliateBox category={meta.affiliateCategory} />
        </div>

        {/* Controlled AdSlot (respects route rules, never shows on /oracoes if disabled) */}
        <AdSlot slotId={`hub-${categorySlug}`} />
      </main>

      <Footer />
    </div>
  );
}
