import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Youtube, BookOpen, Heart, Shield, Moon, Sun, Music, Star } from "lucide-react";

const videos = [
  { id: "MF8p-aj16Zg", title: "O SOM DO MILAGRE | 12 Louvores Para Quem Precisa de um Milagre", views: "5.6K views" },
  { id: "TvNd8KgQRGc", title: "TRONO DE DEUS | 70 Louvores Para Afastar Todo Mal", views: "Louvores poderosos" },
  { id: "vD6vp5AJ4bU", title: "Louvor Gospel Worship Emocionante 2026", views: "Worship poderoso" },
];

const categories = [
  { icon: <Sun className="w-8 h-8" />, title: "Louvores de Adoração", desc: "Momentos intensos de presença de Deus", href: "#adoracao" },
  { icon: <BookOpen className="w-8 h-8" />, title: "Louvores Para Orar", desc: "Músicas que abrem os céus sobre sua vida", href: "#oracao" },
  { icon: <Heart className="w-8 h-8" />, title: "Louvores de Paz", desc: "Tranquilidade e descanso em Deus", href: "#paz" },
  { icon: <Star className="w-8 h-8" />, title: "Louvores de Fé", desc: "Fortaleça sua fé e crê nos milagres", href: "#fe" },
  { icon: <Shield className="w-8 h-8" />, title: "Louvores de Proteção", desc: "Cobertura divina sobre sua família", href: "#protecao" },
  { icon: <Moon className="w-8 h-8" />, title: "Louvores Para Dormir", desc: "Descanse na presença do Senhor", href: "#dormir" },
];

const blogPosts = [
  { icon: "🔥", tag: "Adoração", title: "O Poder do Louvor na Hora da Batalha", desc: "Quando Jó cantou no meio do sofrimento, algo se quebrou nos céus." },
  { icon: "🙏", tag: "Oração", title: "Como Orar com Louvor e Mudar Situações", desc: "A combinação de oração e louvor é devastadora." },
  { icon: "🕊️", tag: "Paz", title: "7 Louvores Que Trazem Paz Para o Coração", desc: "A ansiedade não convive com a presença de Deus." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1f3a] via-[#0f0f0f] to-[#1a1f3a]">
        {/* Background glow effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full px-6 py-2 mb-8">
            <Music className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium">+1.400 inscritos confiam em Deus</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            A Glória de Deus
            <span className="block text-[#D4AF37]">Desce Sobre Você</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Louvores gospel poderosos que expulsam todo mal e trazem a paz de Deus para o seu coração.
          </p>

          <Button
            asChild
            size="lg"
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-[#FF0000]/25"
          >
            <a href="https://www.youtube.com/@gloriaemlouvores?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-6 h-6 mr-3" />
              Assistir no YouTube
            </a>
          </Button>

          <div className="flex justify-center gap-12 mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">107+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">Vídeos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">1.4K+</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">Inscritos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#D4AF37]">6.8K</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider mt-1">Views no Top</div>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-24 bg-[#F9F7F4]">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl text-[#1a1f3a] italic font-serif leading-relaxed">
            "Louvarei ao Senhor em todo o tempo; o seu louvor estará continuamente na minha boca."
          </blockquote>
          <cite className="block mt-6 text-gray-500 not-italic">— Salmo 34:1</cite>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[3px] mb-4">O Canal</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-6">
              Adoração que <span className="text-[#D4AF37]">transforma</span> vidas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              O Glória em Louvores é um canal dedicado a levar a presença de Deus através da música.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎶", title: "Louvores Poderosos", desc: "Mais de 100 louvores gospel selecionados" },
              { icon: "🙏", title: "Oração Guiada", desc: "Momentos de oração guiada" },
              { icon: "📖", title: "Estudo Bíblico", desc: "Reflexões baseadas nas Escrituras" },
              { icon: "✨", title: "Adoração 24/7", desc: "Experiências de adoração contínua" },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg bg-[#F9F7F4] hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-[#F9F7F4]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[3px] mb-4">Explore</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-6">
              Escolha o seu <span className="text-[#D4AF37]">momento</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <a key={i} href={cat.href} className="block">
                <Card className="border border-[#E8E4E0] bg-white hover:border-[#D4AF37] hover:shadow-xl transition-all h-full">
                  <CardContent className="p-8">
                    <div className="text-[#D4AF37] mb-4">{cat.icon}</div>
                    <h3 className="text-xl font-bold text-[#1a1f3a] mb-2">{cat.title}</h3>
                    <p className="text-gray-600 mb-4">{cat.desc}</p>
                    <span className="text-[#D4AF37] font-semibold text-sm">Ver louvores →</span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[3px] mb-4">Destaque</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-6">
              Vídeos que <span className="text-[#D4AF37]">tocam</span> a alma
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, i) => (
              <Card key={i} className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-[#1a1f3a] mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-gray-500 text-sm">{video.views}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Playlists */}
      <section className="py-24 bg-[#F9F7F4]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[3px] mb-4">Playlists</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-6">
              Escolha seu <span className="text-[#D4AF37]">momento</span> de adoração
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf"
                  title="Louvores Para Orar"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#D4AF37]">🎵 Louvores Para Orar</h3>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf"
                  title="Adoração e Oração"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#D4AF37]">🎵 Adoração e Oração</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[3px] mb-4">Blog</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-6">
              Reflexões de <span className="text-[#D4AF37]">fé</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <Card key={i} className="border border-[#E8E4E0] overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#F4E4C1] to-[#F9F7F4] flex items-center justify-center text-6xl">
                  {post.icon}
                </div>
                <CardContent className="p-6">
                  <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {post.tag}
                  </span>
                  <h3 className="text-xl font-bold text-[#0f0f0f] mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#1a1f3a] to-[#0f0f0f]">
        <div className="container max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-6">
            Não perca nenhum louvor
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Inscreva-se no canal e ative o sininho para receber notificações sempre que um novo louvor for publicado.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-[#FF0000]/25"
          >
            <a href="https://www.youtube.com/@gloriaemlouvores?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-6 h-6 mr-3" />
              Inscreva-se no Canal
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E4E0] py-12 bg-[#F9F7F4]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Music className="w-6 h-6 text-[#D4AF37]" />
                <span className="text-lg font-bold text-[#1a1f3a]">Glória em Louvores</span>
              </div>
              <p className="text-gray-500 text-sm">
                Levando a presença de Deus através da música.
              </p>
            </div>
            <div>
              <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[2px] mb-4">Canal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="https://www.youtube.com/@gloriaemlouvores/videos" target="_blank" className="hover:text-[#D4AF37]">Vídeos</a></li>
                <li><a href="https://www.youtube.com/@gloriaemlouvores/playlists" target="_blank" className="hover:text-[#D4AF37]">Playlists</a></li>
                <li><a href="https://www.youtube.com/@gloriaemlouvores/shorts" target="_blank" className="hover:text-[#D4AF37]">Shorts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[2px] mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#adoracao" className="hover:text-[#D4AF37]">Louvores de Adoração</a></li>
                <li><a href="#oracao" className="hover:text-[#D4AF37]">Músicas Para Orar</a></li>
                <li><a href="#paz" className="hover:text-[#D4AF37]">Louvores de Paz</a></li>
                <li><a href="#dormir" className="hover:text-[#D4AF37]">Louvores Para Dormir</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[2px] mb-4">Comunidade</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#D4AF37]">Blog</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Pedidos de Oração</a></li>
                <li><a href="#" className="hover:text-[#D4AF37]">Contato</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#E8E4E0] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 <a href="https://www.youtube.com/@gloriaemlouvores" target="_blank" className="text-[#D4AF37]">Glória em Louvores</a>. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[#D4AF37]">Política de Privacidade</a>
              <a href="#" className="hover:text-[#D4AF37]">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
