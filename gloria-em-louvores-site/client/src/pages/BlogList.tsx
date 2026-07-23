import { useData } from "@/contexts/DataContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

export default function BlogList() {
  const { blogPosts } = useData();

  useEffect(() => {
    document.title = "Blog — Glória em Louvores | Reflexões de Fé e Louvor Gospel";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Artigos sobre louvor, oração e vida cristã. Reflexões bíblicas, salmos e testemunhos para fortalecer sua fé. Glória em Louvores.");
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <header className="bg-white border-b border-[#E8E4E0] sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</Button>
          </Link>
          <h1 className="text-xl font-bold text-[#1a1f3a]">Blog</h1>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] mb-4">
            Reflexões de <span className="text-[#D4AF37]">fé</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">Artigos sobre louvor, oração e vida cristã</p>
        </div>

        {blogPosts.length === 0 ? (
          <Card><CardContent className="p-12 text-center text-gray-500">Nenhum artigo publicado ainda.</CardContent></Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="border border-[#E8E4E0] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer h-full">
                  {post.image ? (
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-40 sm:h-48 bg-gradient-to-br from-[#F4E4C1] to-[#F9F7F4] flex items-center justify-center text-5xl sm:text-6xl">
                      {post.icon}
                    </div>
                  )}
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-full">
                        {post.tag}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0f0f0f] mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{post.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
