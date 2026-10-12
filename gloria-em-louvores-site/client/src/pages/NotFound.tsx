import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Home, Search, BookOpen, Calendar, Heart, FolderHeart } from "lucide-react";
import { Link } from "wouter";
import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function NotFound() {
  const { blogPosts } = useData();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return blogPosts.slice(0, 3);
    const q = query.toLowerCase();
    return blogPosts
      .filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tag.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [blogPosts, query]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F4]">
      <SEOHead
        title="Página não encontrada (404) | Glória em Louvores"
        description="A página solicitada não foi encontrada. Pesquise em nossos devocionais, estudos bíblicos, plano de leitura e caderno de oração."
        forceNoIndex
      />
      <Navbar />

      <main className="flex-1 container max-w-4xl mx-auto px-4 pt-32 pb-16">
        <Card className="shadow-sm border border-[#E8E4E0] bg-white">
          <CardContent className="p-8 sm:p-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center">
                <AlertCircle className="h-9 w-9 text-[#D4AF37]" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Erro 404 • Página Não Encontrada
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1a1f3a]">
                Não encontramos este endereço, mas temos recursos para edificar o seu dia
              </h1>
              <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
                Use a busca abaixo ou acesse diretamente nossas ferramentas devocionais, plano de leitura bíblica e estudos.
              </p>
            </div>

            {/* Search Input */}
            <div className="max-w-lg mx-auto relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar devocional, versículo, culto doméstico, oração..."
                className="pl-10 bg-[#F9F7F4] border-[#E8E4E0]"
              />
            </div>

            {/* Matching or Suggested Articles */}
            <div className="grid sm:grid-cols-3 gap-4 text-left pt-2">
              {results.map(post => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <div className="p-4 rounded-xl border border-[#E8E4E0] bg-[#F9F7F4] hover:border-[#D4AF37] transition-all cursor-pointer h-full flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#D4AF37]">{post.tag}</span>
                      <h3 className="text-sm font-bold text-[#1a1f3a] mt-1 line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold text-[#1a1f3a] mt-3 inline-block">
                      Ler estudo →
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Navigation Buttons */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap justify-center gap-3">
              <Link href="/">
                <Button className="bg-[#1a1f3a] hover:bg-[#2d3561] text-white gap-2">
                  <Home className="w-4 h-4 text-[#D4AF37]" />
                  Início do Portal
                </Button>
              </Link>
              <Link href="/devocionais">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                  Devocionais
                </Button>
              </Link>
              <Link href="/plano-de-leitura">
                <Button variant="outline" className="gap-2">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  Plano de Leitura
                </Button>
              </Link>
              <Link href="/oracoes">
                <Button variant="outline" className="gap-2">
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                  Orações
                </Button>
              </Link>
              <Link href="/materiais">
                <Button variant="outline" className="gap-2">
                  <FolderHeart className="w-4 h-4 text-[#D4AF37]" />
                  Caderno de Oração
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
