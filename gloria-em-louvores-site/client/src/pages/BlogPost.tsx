import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2, BookOpen } from "lucide-react";
import { Link, useParams } from "wouter";

export default function BlogPost() {
  const { blogPosts } = useData();
  const params = useParams();
  const post = blogPosts.find(p => p.id === params.id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F4]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1a1f3a] mb-4">Artigo não encontrado</h1>
          <Link href="/blog"><Button className="bg-[#D4AF37] hover:bg-[#B8942E] text-white">Voltar ao Blog</Button></Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.desc, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copiado!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#F9F7F4] border-b border-[#E8E4E0] sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleShare} className="gap-2"><Share2 className="w-4 h-4" /> Compartilhar</Button>
        </div>
      </header>

      <article>
        {/* Hero Image */}
        {post.image ? (
          <div className="w-full h-64 sm:h-80 md:h-96 overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-[#1a1f3a] to-[#0f0f0f] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl sm:text-8xl mb-4">{post.icon}</div>
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full">{post.tag}</span>
            </div>
          </div>
        )}

        <div className="container max-w-3xl mx-auto px-4 py-8 sm:py-12">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full">{post.tag}</span>
            <span className="text-sm text-gray-400 flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-6 leading-tight">{post.title}</h1>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">{post.desc}</p>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[#E8E4E0]" />
            <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            <div className="flex-1 h-px bg-[#E8E4E0]" />
          </div>

          {/* Content */}
          {post.content ? (
            <div className="prose prose-lg prose-headings:text-[#1a1f3a] prose-headings:font-bold prose-a:text-[#D4AF37] prose-blockquote:border-[#D4AF37] prose-blockquote:bg-[#F9F7F4] prose-blockquote:rounded-r-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="text-gray-400 italic text-center py-8">Conteúdo completo em breve...</p>
          )}

          {/* Share */}
          <div className="border-t border-[#E8E4E0] mt-12 pt-8">
            <div className="bg-gradient-to-r from-[#F9F7F4] to-white rounded-2xl p-6 sm:p-8 text-center">
              <p className="text-gray-600 mb-4 text-lg">Gostou deste artigo? Compartilhe com quem precisa de uma palavra de fé.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={handleShare} className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2 px-6">
                  <Share2 className="w-4 h-4" /> Compartilhar
                </Button>
                <Link href="/blog">
                  <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white gap-2 px-6">
                    <BookOpen className="w-4 h-4" /> Ver mais artigos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
