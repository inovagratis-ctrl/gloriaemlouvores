import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Youtube,
  BookOpen,
  Heart,
  Calendar,
  FolderHeart,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  CheckCircle2,
  Compass,
  ShieldCheck,
} from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { CATEGORY_HUBS_META, CategorySlug } from "@/lib/articlesData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import VideoCarousel from "@/components/VideoCarousel";
import PsalmsCarousel from "@/components/PsalmsCarousel";
import AffiliateBox from "@/components/AffiliateBox";
import AdSlot from "@/components/AdSlot";

const HUB_LIST: CategorySlug[] = [
  "devocionais",
  "oracoes",
  "estudos-biblicos",
  "versiculos",
  "familia",
  "jovens",
  "musica-e-adoracao",
  "recursos-para-igrejas",
];

export default function Home() {
  const { videos, blogPosts } = useData();
  const [channelStats, setChannelStats] = useState({
    subscribers: 1470,
    videos: 107,
    views: 96530,
  });

  useEffect(() => {
    fetch("/api/channel-stats")
      .then(res => res.json())
      .then(data => {
        if (data && data.subscribers) setChannelStats(data);
      })
      .catch(() => {});
  }, []);

  const featuredVideos = useMemo(() => {
    const feat = videos.filter(v => v.featured);
    return feat.length > 0 ? feat : videos.slice(0, 3);
  }, [videos]);

  const devotionalOfTheDay = useMemo(() => {
    return (
      blogPosts.find(
        p => p.id === "devocional-comecar-a-semana-com-proposito-paz-e-sabedoria"
      ) || blogPosts[0]
    );
  }, [blogPosts]);

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Glória em Louvores — Portal Cristão de Oração, Devocionais, Estudos Bíblicos e Adoração"
        description="Portal cristão de utilidade prática: Devocional do Dia, Plano de Leitura Bíblica de 30 Dias e Anual, Caderno de Oração Interativo, Estudos Bíblicos, Guias para Família e Igrejas e Louvores Oficiais."
        keywords="devocional diário, plano de leitura bíblica 30 dias, caderno de oração, estudos bíblicos, culto doméstico em família, recursos para igrejas, glória em louvores"
        canonicalPath="/"
        breadcrumbs={[{ name: "Início", path: "/" }]}
      />
      <Navbar />

      {/* Hero Section — Reverent, Welcoming, Clear Utility Proposal */}
      <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 overflow-hidden bg-[#111528]">
        <div className="absolute inset-0">
          <img
            src="/images/hero.png"
            alt="Leitura Bíblica, Oração e Adoração"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111528]/90 via-[#111528]/80 to-[#111528]" />
        </div>

        <div className="relative z-10 container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-white/90 text-xs sm:text-sm font-medium">
                Portal de Utilidade Cristã • Oração, Bíblia, Família & Igreja Local
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Recursos Bíblicos para sua{" "}
              <span className="text-[#D4AF37]">Vida Devocional, Lar e Igreja</span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
              Estudos bíblicos contextualizados, devocionais diários, plano de leitura bíblica interativo, caderno de oração e curadoria de louvores oficiais — com reverência, fidelidade às Escrituras e acolhimento para cristãos de todas as denominações.
            </p>

            {/* Primary Utility Actions (1 Click) */}
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <Link href="/plano-de-leitura">
                <Button
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#B8942E] text-[#111528] font-bold px-6 py-6 rounded-xl shadow-lg gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Plano de Leitura (30 Dias & Anual)
                </Button>
              </Link>
              <Link href="/materiais">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-6 py-6 rounded-xl gap-2"
                >
                  <FolderHeart className="w-5 h-5 text-[#D4AF37]" />
                  Caderno de Oração & Guias
                </Button>
              </Link>
              <Link href="/comunidade">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/5 text-white hover:bg-white/15 px-6 py-6 rounded-xl gap-2"
                >
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                  Mural de Oração
                </Button>
              </Link>
            </div>
          </div>

          {/* 4 Quick Utility Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Calendar className="w-6 h-6 text-[#D4AF37]" />,
                title: "Plano de Leitura Bíblica",
                desc: "Jornada de 30 dias e Plano Anual com marcação automática no navegador.",
                href: "/plano-de-leitura",
                cta: "Começar leitura →",
              },
              {
                icon: <FolderHeart className="w-6 h-6 text-[#D4AF37]" />,
                title: "Caderno de Oração",
                desc: "Organize pedidos, gratidão, versículos e baixe roteiros de culto doméstico.",
                href: "/materiais",
                cta: "Abrir caderno →",
              },
              {
                icon: <BookOpen className="w-6 h-6 text-[#D4AF37]" />,
                title: "12 Estudos & Guias",
                desc: "Estudos bíblicos com método indutivo, contexto histórico e aplicação.",
                href: "/estudos-biblicos",
                cta: "Explorar estudos →",
              },
              {
                icon: <Users className="w-6 h-6 text-[#D4AF37]" />,
                title: "Comunidade de Oração",
                desc: "Intercessão fraterna moderada, guia para grupos e acolhimento pastoral.",
                href: "/comunidade",
                cta: "Participar →",
              },
            ].map((tool, i) => (
              <Link key={i} href={tool.href}>
                <div className="rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 p-5 transition-all cursor-pointer h-full flex flex-col justify-between backdrop-blur-sm">
                  <div>
                    <div className="mb-3">{tool.icon}</div>
                    <h2 className="text-base font-bold text-white mb-1.5">{tool.title}</h2>
                    <p className="text-xs text-white/75 leading-relaxed">{tool.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-[#D4AF37] mt-4 inline-block">
                    {tool.cta}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Devocional em Destaque & Versículo de Meditação */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#E8E4E0]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-[#F9F7F4] rounded-2xl border border-[#D4AF37]/30 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                <Sparkles className="w-4 h-4" />
                Devocional & Reflexão em Destaque
              </div>
              {devotionalOfTheDay && (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1f3a] mb-3">
                    {devotionalOfTheDay.title}
                  </h2>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                    {devotionalOfTheDay.description}
                  </p>
                  <blockquote className="border-l-4 border-[#D4AF37] pl-4 py-1 text-sm italic text-[#1a1f3a] mb-6">
                    "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; novidades são cada manhã; grande é a tua fidelidade." — Lamentações 3:22-23
                  </blockquote>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/blog/${devotionalOfTheDay.id}`}>
                      <Button className="bg-[#1a1f3a] hover:bg-[#2d3561] text-white gap-2">
                        Ler Devocional Completo <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/devocionais">
                      <Button variant="outline">Mais Devocionais</Button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#F9F7F4] border border-[#E8E4E0] p-6">
                <div className="text-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    Salmos & Meditação (Almeida)
                  </span>
                </div>
                <PsalmsCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Thematic Category Hubs (1 Click Navigation) */}
      <section className="py-14 sm:py-20 bg-[#F9F7F4]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Navegação por Temas e Ministérios
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1f3a] mt-2 mb-3">
              Explore Nossos Hubs de Conteúdo e Recursos Práticos
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Acesse em 1 clique estudos bíblicos, roteiros de oração, guias para famílias, reuniões de jovens e células.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HUB_LIST.map(slug => {
              const hub = CATEGORY_HUBS_META[slug];
              return (
                <Link key={slug} href={`/${slug}`}>
                  <Card className="bg-white border border-[#E8E4E0] hover:border-[#D4AF37] hover:shadow-lg transition-all cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="text-3xl mb-3">{hub.icon}</div>
                        <h3 className="text-lg font-bold text-[#1a1f3a] mb-2">
                          {hub.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                          {hub.subtitle}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#1a1f3a] flex items-center gap-1 group-hover:text-[#D4AF37]">
                        Acessar categoria <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Complete Editorial Library (12 Original Studies, Devotionals & Guides) */}
      <section className="py-14 sm:py-20 bg-white border-t border-[#E8E4E0]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                Biblioteca Devocional e Teológica
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1f3a] mt-1">
                Estudos Bíblicos, Devocionais e Guias Práticos
              </h2>
            </div>
            <Link href="/blog">
              <Button variant="outline" className="border-[#1a1f3a] text-[#1a1f3a] gap-2">
                <BookOpen className="w-4 h-4" />
                Ver Todos os {blogPosts.length} Estudos
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 6).map(post => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="border border-[#E8E4E0] hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 bg-[#F9F7F4]/50 cursor-pointer h-full flex flex-col group">
                  <div className="h-32 bg-gradient-to-br from-[#1a1f3a] to-[#283056] flex items-center justify-between px-6">
                    <span className="text-4xl group-hover:scale-110 transition-transform">
                      {post.icon}
                    </span>
                    <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                        <span>{post.date}</span>
                        {post.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            {post.readingTime}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#1a1f3a] group-hover:text-[#D4AF37] transition-colors mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-4">
                        {post.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#1a1f3a] group-hover:text-[#D4AF37] flex items-center gap-1">
                      Ler estudo completo <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Remaining 6 links in a compact quick-access directory */}
          {blogPosts.length > 6 && (
            <div className="mt-8 p-6 rounded-2xl bg-[#F9F7F4] border border-[#E8E4E0]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1a1f3a] mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                Mais Guias Práticos e Estudos do Portal:
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {blogPosts.slice(6, 12).map(post => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <div className="p-3.5 rounded-xl bg-white border border-[#E8E4E0] hover:border-[#D4AF37] transition-all cursor-pointer flex items-start gap-3">
                      <span className="text-2xl shrink-0">{post.icon}</span>
                      <div>
                        <span className="text-[11px] font-bold text-[#D4AF37] block">
                          {post.tag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#1a1f3a] line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Official YouTube Channel Curated Embeds */}
      {featuredVideos.length > 0 && (
        <section className="py-14 sm:py-20 bg-[#F9F7F4] border-t border-[#E8E4E0]">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                  <Award className="w-4 h-4" />
                  Curadoria Oficial no YouTube (@gloriaemlouvores)
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1f3a]">
                  Louvores e Momentos de Adoração para Acompanhar sua Oração
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Vídeos incorporados oficialmente do YouTube em respeito aos direitos autorais ({channelStats.subscribers.toLocaleString("pt-BR")} inscritos).
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-[#1a1f3a] text-[#1a1f3a] gap-2 shrink-0"
              >
                <a
                  href="https://www.youtube.com/@gloriaemlouvores"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-4 h-4 text-[#FF0000]" />
                  Visitar Canal no YouTube
                </a>
              </Button>
            </div>
            <VideoCarousel videos={featuredVideos} />
          </div>
        </section>
      )}

      {/* Editorial Transparency, Unity in Christ & Ethical Recommendation */}
      <section className="py-14 bg-white border-t border-[#E8E4E0]">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#1a1f3a] to-[#111528] text-white p-8 sm:p-10 mb-8">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  <ShieldCheck className="w-4 h-4" />
                  Unidade Cristã e Compromisso Editorial
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Um espaço reverente, bíblico e acolhedor para toda a família da fé
                </h2>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  Seja você evangélico, católico, reformado, batista, presbiteriano, metodista ou assembleiano — aqui você encontra ferramentas gratuitas centradas nas Escrituras, sem promessas apelativas e com profundo respeito aos direitos autorais e ao cuidado emocional.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-white/80">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Textos Bíblicos Almeida
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Reflexões 100% Originais
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Sem Anúncios no Mural de Oração
                  </span>
                </div>
              </div>
              <div className="md:col-span-4 flex flex-col gap-3">
                <Link href="/sobre">
                  <Button className="w-full bg-[#D4AF37] hover:bg-[#B8942E] text-[#111528] font-bold">
                    Conhecer Nossa Metodologia
                  </Button>
                </Link>
                <Link href="/transparencia-afiliados">
                  <Button
                    variant="outline"
                    className="w-full border-white/25 text-white hover:bg-white/10"
                  >
                    Política de Transparência
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <AffiliateBox affiliateId="biblia-estudo-almeida-naa" />
          <AdSlot slotId="home-bottom-editorial" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
