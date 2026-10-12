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
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { CATEGORY_HUBS_META, CategorySlug } from '@/lib/articlesData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import AffiliateBox from '@/components/AffiliateBox';
import AdSlot from '@/components/AdSlot';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const HUB_SLUGS: CategorySlug[] = [
  'devocionais',
  'oracoes',
  'estudos-biblicos',
  'versiculos',
  'familia',
  'jovens',
  'musica-e-adoracao',
  'recursos-para-igrejas',
];

export default function BlogList() {
  const { blogPosts } = useData();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState<string>('todos');

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(p => {
      const matchCat =
        activeCat === 'todos' ||
        p.categorySlug === activeCat ||
        p.tag.toLowerCase() === activeCat.toLowerCase();
      const matchQuery =
        !search.trim() ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tag.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [blogPosts, activeCat, search]);

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Acervo de Estudos Bíblicos, Devocionais e Guias Cristãos | Glória em Louvores"
        description="Explore todos os devocionais diários, estudos bíblicos contextualizados, roteiros de oração e guias práticos para famílias, jovens e igrejas."
        canonicalPath="/blog"
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Acervo de Estudos e Devocionais', path: '/blog' },
        ]}
      />
      <Navbar />

      <section className="pt-28 pb-12 bg-gradient-to-br from-[#1a1f3a] to-[#0f1325] text-white">
        <div className="container max-w-6xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70 mb-5">
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold">Estudos, Devocionais e Guias</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Acervo de Estudos Bíblicos, Devocionais e Guias Práticos
          </h1>
          <p className="text-white/80 max-w-3xl text-base sm:text-lg leading-relaxed">
            Todo o nosso conteúdo editorial original reunido em um só lugar: estudos com método indutivo, roteiros para culto doméstico, oração e recursos para igrejas locais.
          </p>
        </div>
      </section>

      <main className="container max-w-6xl mx-auto px-4 py-10 flex-1">
        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl border border-[#E8E4E0] p-4 sm:p-5 mb-8 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar por tema, livro bíblico, luto, ansiedade, culto doméstico..."
                className="pl-10 bg-[#F9F7F4] border-[#E8E4E0]"
              />
            </div>
            <div className="text-xs text-gray-500 font-medium shrink-0">
              Exibindo <strong>{filteredPosts.length}</strong> de {blogPosts.length} publicações
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setActiveCat('todos')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCat === 'todos'
                  ? 'bg-[#1a1f3a] text-[#D4AF37]'
                  : 'bg-[#F9F7F4] text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({blogPosts.length})
            </button>
            {HUB_SLUGS.map(slug => {
              const hub = CATEGORY_HUBS_META[slug];
              return (
                <button
                  key={slug}
                  type="button"
                  onClick={() => setActiveCat(slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    activeCat === slug
                      ? 'bg-[#1a1f3a] text-[#D4AF37]'
                      : 'bg-[#F9F7F4] text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{hub.icon}</span>
                  <span>{hub.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Articles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="border border-[#E8E4E0] overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 bg-white cursor-pointer h-full flex flex-col group">
                {post.image ? (
                  <div className="h-44 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-36 bg-gradient-to-br from-[#1a1f3a] to-[#283056] flex items-center justify-between px-6">
                    <span className="text-5xl group-hover:scale-110 transition-transform">
                      {post.icon}
                    </span>
                    <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                )}
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
                    <h2 className="text-lg font-bold text-[#1a1f3a] group-hover:text-[#D4AF37] transition-colors mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
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

        <AffiliateBox category="biblia-de-estudo" />
        <AdSlot slotId="blog-list-bottom" />
      </main>

      <Footer />
    </div>
  );
}
