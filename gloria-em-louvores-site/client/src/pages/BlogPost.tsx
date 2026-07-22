import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
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

      <article className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{post.icon}</div>
          <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {post.tag}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#0f0f0f] mb-4">{post.title}</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" /> {post.date}
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 text-lg leading-relaxed mb-6">{post.desc}</p>
          {post.content ? (
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
          ) : (
            <p className="text-gray-400 italic">Conteúdo completo em breve...</p>
          )}
        </div>

        <div className="border-t border-[#E8E4E0] mt-12 pt-8 text-center">
          <p className="text-gray-500 mb-4">Gostou? Compartilhe com quem precisa de uma palavra de fé.</p>
          <Button onClick={handleShare} className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2">
            <Share2 className="w-4 h-4" /> Compartilhar
          </Button>
        </div>
      </article>
    </div>
  );
}
