import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Youtube, BookOpen, Heart, Shield, Moon, Sun, Music, Star, Send, Shuffle, Clock, Award, Smartphone, Quote } from "lucide-react";
import { useData, shuffleArray } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import VideoCarousel from "@/components/VideoCarousel";
import PsalmsCarousel from "@/components/PsalmsCarousel";

const categories = [
  { icon: <Sun className="w-8 h-8" />, title: "Louvores de Adoração", desc: "Momentos intensos de presença de Deus", color: "from-amber-50 to-orange-50", link: "https://www.youtube.com/results?search_query=louvor+adoração+gospel+gloria+em+louvores" },
  { icon: <BookOpen className="w-8 h-8" />, title: "Louvores Para Orar", desc: "Músicas que abrem os céus sobre sua vida", color: "from-blue-50 to-indigo-50", link: "https://www.youtube.com/results?search_query=louvor+para+orar+gospel+gloria+em+louvores" },
  { icon: <Heart className="w-8 h-8" />, title: "Louvores de Paz", desc: "Tranquilidade e descanso em Deus", color: "from-green-50 to-emerald-50", link: "https://www.youtube.com/results?search_query=louvor+paz+gospel+gloria+em+louvores" },
  { icon: <Star className="w-8 h-8" />, title: "Louvores de Fé", desc: "Fortaleça sua fé e crê nos milagres", color: "from-yellow-50 to-amber-50", link: "https://www.youtube.com/results?search_query=louvor+fé+miracles+gospel+gloria+em+louvores" },
  { icon: <Shield className="w-8 h-8" />, title: "Louvores de Proteção", desc: "Cobertura divina sobre sua família", color: "from-purple-50 to-violet-50", link: "https://www.youtube.com/results?search_query=louvor+proteção+gospel+gloria+em+louvores" },
  { icon: <Moon className="w-8 h-8" />, title: "Louvores Para Dormir", desc: "Descanse na presença do Senhor", color: "from-indigo-50 to-blue-50", link: "https://www.youtube.com/results?search_query=louvor+dormir+descanso+gospel+gloria+em+louvores" },
];

export default function Home() {
  const { videos, blogPosts, psalms, shorts } = useData();
  const [randomVideos, setRandomVideos] = useState(() => shuffleArray(videos).slice(0, 3));

  const featuredVideos = useMemo(() => videos.filter(v => v.featured), [videos]);
  const recentVideos = useMemo(() => [...videos].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3), [videos]);

  const refreshRandom = () => setRandomVideos(shuffleArray(videos).slice(0, 3));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero.png"
            alt="Adoração"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/80 via-[#0f0f0f]/60 to-[#0f0f0f]/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f3a]/50 to-transparent" />
        </div>
        {/* Glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/8 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-2.5 mb-8 backdrop-blur-sm">
            <Music className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-white/80 text-sm font-medium">+1.400 irmãos em Cristo</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            A Glória de Deus<span className="block text-[#D4AF37] mt-2">Desce Sobre Você</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
            Louvores gospel poderosos que <span className="text-white font-medium">expulsam todo mal</span> e trazem a paz de Deus para o seu coração.
            <br className="hidden md:block" />
            <span className="text-white/50 text-sm md:text-base">Católicos, evangélicos, todas as denominações — todos são bem-vindos na presença do Senhor.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-[#FF0000]/25">
              <a href="https://www.youtube.com/@gloriaemlouvores?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6 mr-3" /> Assistir no YouTube
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
              <a href="#contato"><Send className="w-5 h-5 mr-3" /> Pedir Oração</a>
            </Button>
          </div>
          <div className="flex justify-center gap-8 sm:gap-12 mt-16">
            <div className="text-center"><div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D4AF37]">107+</div><div className="text-xs sm:text-sm text-white/50 uppercase tracking-wider mt-1">Vídeos</div></div>
            <div className="text-center"><div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D4AF37]">1.4K+</div><div className="text-xs sm:text-sm text-white/50 uppercase tracking-wider mt-1">Inscritos</div></div>
            <div className="text-center"><div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D4AF37]">6.8K</div><div className="text-xs sm:text-sm text-white/50 uppercase tracking-wider mt-1">Views no Top</div></div>
          </div>
        </div>
      </section>

      {/* Scripture */}
      <section className="py-16 sm:py-24 bg-[#F9F7F4]">
        <PsalmsCarousel />
      </section>

      {/* About */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[3px] mb-4">O Canal</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-6">Adoração que <span className="text-[#D4AF37]">transforma</span> vidas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">O Glória em Louvores é um canal dedicado a levar a presença de Deus através da música. Uma família de fé que cresce a cada dia.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "🎶", title: "Louvores Poderosos", desc: "Mais de 100 louvores gospel selecionados para adorar e glorificar a Deus." },
              { icon: "🙏", title: "Oração Guiada", desc: "Momentos de oração guiada para fortalecer sua fé e conexão com o Pai." },
              { icon: "📖", title: "Estudo Bíblico", desc: "Reflexões e estudos baseados nas Escrituras para crescimento espiritual." },
              { icon: "✨", title: "Adoração 24/7", desc: "Experiências de adoração que tocam o coração e transformam vidas." },
            ].map((item, i) => (
              <Card key={i} className="border-0 shadow-lg bg-[#F9F7F4] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="text-4xl sm:text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#D4AF37] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VÍDEOS EM DESTAQUE */}
      {featuredVideos.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F9F7F4]">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f]">Destaques</h2>
            </div>
            <VideoCarousel videos={featuredVideos} />
          </div>
        </section>
      )}

      {/* VÍDEOS RECENTES */}
      {recentVideos.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f]">Recentes</h2>
            </div>
            <VideoCarousel videos={recentVideos} />
          </div>
        </section>
      )}

      {/* VÍDEOS ALEATÓRIOS */}
      <section className="py-16 sm:py-24 bg-[#F9F7F4]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shuffle className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f0f0f]">Descubra</h2>
            </div>
            <Button variant="outline" size="sm" onClick={refreshRandom} className="gap-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white">
              <Shuffle className="w-4 h-4" /> Trocar
            </Button>
          </div>
          <VideoCarousel videos={randomVideos} />
        </div>
      </section>

      {/* SHORTS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FF0000]/10 rounded-full px-4 py-1.5 mb-4">
              <Smartphone className="w-4 h-4 text-[#FF0000]" />
              <span className="text-[#FF0000] text-sm font-semibold">YouTube Shorts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-4">Momentos de <span className="text-[#FF0000]">fé</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Clipes curtos que tocam o coração — perfeitos para compartilhar a Palavra</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {shorts.map((short) => (
              <a key={short.id} href={`https://youtube.com/shorts/${short.youtubeId}`} target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1f3a] to-[#0f0f0f] border-2 border-transparent hover:border-[#FF0000] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <img
                    src={`https://img.youtube.com/vi/${short.youtubeId}/maxresdefault.jpg`}
                    alt={short.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-[#FF0000] rounded-full flex items-center justify-center shadow-lg shadow-[#FF0000]/30">
                      <Youtube className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-xs font-semibold truncate">{short.title}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="border-[#FF0000] text-[#FF0000] hover:bg-[#FF0000] hover:text-white gap-2">
              <a href="https://www.youtube.com/@gloriaemlouvores/shorts" target="_blank" rel="noopener noreferrer">
                <Smartphone className="w-5 h-5" /> Ver todos os Shorts
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[3px] mb-4">Explore</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-6">Escolha o seu <span className="text-[#D4AF37]">momento</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <a key={i} href={cat.link} target="_blank" rel="noopener noreferrer">
                <Card className={`border border-[#E8E4E0] bg-gradient-to-br ${cat.color} hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full`}>
                  <CardContent className="p-6 sm:p-8">
                    <div className="text-[#D4AF37] mb-4">{cat.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1a1f3a] mb-2">{cat.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-4">{cat.desc}</p>
                    <span className="text-[#D4AF37] font-semibold text-sm">Ver louvores →</span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      {blogPosts.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F9F7F4]">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 rounded-full px-4 py-1.5 mb-4">
                <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm font-semibold">Blog</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0f0f0f] mb-4">Reflexões de fé</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Artigos sobre louvor, oração e vida cristã</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <a key={post.id} href={`/blog/${post.id}`}>
                  <Card className="border border-[#E8E4E0] overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white cursor-pointer h-full group">
                    {post.image ? (
                      <div className="h-40 sm:h-48 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    ) : (
                      <div className="h-40 sm:h-48 bg-gradient-to-br from-[#F4E4C1] to-[#F9F7F4] flex items-center justify-center text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-500">{post.icon}</div>
                    )}
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-full">{post.tag}</span>
                        <span className="text-xs text-gray-400">{post.date}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0f0f0f] mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">{post.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{post.desc}</p>
                      <span className="text-[#D4AF37] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Ler artigo <span>→</span></span>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
            <div className="text-center mt-10">
              <a href="/blog">
                <Button variant="outline" size="lg" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white gap-2 px-8">
                  <BookOpen className="w-5 h-5" /> Ver mais reflexões
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Inclusive Message */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1a1f3a] to-[#0f0f0f]">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl sm:text-6xl mb-8">✝️</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">Uma Família em <span className="text-[#D4AF37]">Cristo</span></h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Seja você católico, evangélico, presbiteriano, batista, assembleiano, metodista ou de qualquer outra denominação — aqui todos são bem-vindos. Pois em Cristo não há divisão, mas <span className="text-white font-medium">unidade na fé</span>.
          </p>
          <blockquote className="text-white/50 italic text-sm sm:text-base border-l-2 border-[#D4AF37] pl-4 max-w-xl mx-auto">
            "Há um só corpo e um só Espírito, como também fuiis chamados em uma só esperança da vossa vocação."
            <cite className="block mt-2 not-italic">— Efésios 4:4</cite>
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1a1f3a] via-[#1a1f3a] to-[#0f0f0f] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#D4AF37] rounded-full blur-[80px]" />
        </div>
        <div className="container max-w-3xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Youtube className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-white text-sm font-medium">+1.400 inscritos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">Não perca nenhum louvor</h2>
          <p className="text-white/70 text-base sm:text-lg mb-10 max-w-xl mx-auto">Inscreva-se no canal e ative o sininho para receber notificações sempre que um novo louvor for publicado.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#FF0000] hover:bg-[#CC0000] text-white px-8 py-6 text-lg rounded-full shadow-xl font-bold gap-2 shadow-[#FF0000]/25">
              <a href="https://www.youtube.com/@gloriaemlouvores?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                <Youtube className="w-6 h-6" /> Inscreva-se Agora
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full gap-2">
              <a href="https://www.youtube.com/@gloriaemlouvores/videos" target="_blank" rel="noopener noreferrer">
                Assistir Vídeos
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[#E8E4E0] py-10 sm:py-12 bg-[#1a1f3a] overflow-hidden">
        {/* Silhueta de Jesus */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 100 140" className="h-[500px] w-auto text-white/[0.06]" fill="currentColor">
            {/* Cabeça */}
            <circle cx="50" cy="18" r="12" />
            {/* Corpo com braços levantados */}
            <path d="M38 30 C25 45 15 65 12 90 L18 90 C20 70 25 55 30 45 L35 45 L35 120 L28 120 L28 132 L72 132 L72 120 L65 120 L65 45 L70 45 C75 55 80 70 82 90 L88 90 C85 65 75 45 62 30 Z" />
            {/* Braços */}
            <path d="M38 30 C30 25 20 22 10 25 C15 30 25 38 38 42 Z" />
            <path d="M62 30 C70 25 80 22 90 25 C85 30 75 38 62 42 Z" />
          </svg>
        </div>
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="/images/GL%C3%93RIA_EM_LOUVORES-LOGO.png" alt="Glória em Louvores" className="h-20 object-contain mb-4" />
              <p className="text-white/60 text-sm">Levando a presença de Deus através da música. Uma família de fé que cresce a cada dia.</p>
            </div>
            <div>
              <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[2px] mb-4">Canal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="https://www.youtube.com/@gloriaemlouvores/videos" target="_blank" className="hover:text-[#D4AF37] transition-colors">Vídeos</a></li>
                <li><a href="https://www.youtube.com/@gloriaemlouvores/playlists" target="_blank" className="hover:text-[#D4AF37] transition-colors">Playlists</a></li>
                <li><a href="https://www.youtube.com/@gloriaemlouvores/shorts" target="_blank" className="hover:text-[#D4AF37] transition-colors">Shorts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[2px] mb-4">Categorias</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#adoracao" className="hover:text-[#D4AF37] transition-colors">Louvores de Adoração</a></li>
                <li><a href="#oracao" className="hover:text-[#D4AF37] transition-colors">Músicas Para Orar</a></li>
                <li><a href="#paz" className="hover:text-[#D4AF37] transition-colors">Louvores de Paz</a></li>
                <li><a href="#dormir" className="hover:text-[#D4AF37] transition-colors">Louvores Para Dormir</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[2px] mb-4">Comunidade</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</a></li>
                <li><a href="#contato" className="hover:text-[#D4AF37] transition-colors">Pedidos de Oração</a></li>
                <li><a href="#contato" className="hover:text-[#D4AF37] transition-colors">Contato</a></li>
                <li><a href="/admin" className="hover:text-[#D4AF37] transition-colors">Admin</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">© 2026 <a href="https://www.youtube.com/@gloriaemlouvores" target="_blank" className="text-[#D4AF37] hover:underline">Glória em Louvores</a>. Todos os direitos reservados.</p>
            <div className="flex gap-6 text-sm text-white/40">
              <a href="/privacidade" className="hover:text-[#D4AF37] transition-colors">Política de Privacidade</a>
              <a href="/termos" className="hover:text-[#D4AF37] transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
