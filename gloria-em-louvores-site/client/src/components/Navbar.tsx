import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Youtube,
  Home,
  BookOpen,
  Heart,
  Shield,
  Calendar,
  FolderHeart,
  Users,
  Sparkles,
  ChevronDown,
  Compass,
} from "lucide-react";

const primaryLinks = [
  { href: "/", label: "Início", icon: <Home className="w-4 h-4" /> },
  { href: "/devocionais", label: "Devocionais", icon: <Sparkles className="w-4 h-4" /> },
  { href: "/oracoes", label: "Orações", icon: <Heart className="w-4 h-4" /> },
  { href: "/estudos-biblicos", label: "Estudos Bíblicos", icon: <BookOpen className="w-4 h-4" /> },
  { href: "/plano-de-leitura", label: "Plano de Leitura", icon: <Calendar className="w-4 h-4" /> },
  { href: "/materiais", label: "Caderno & Guias", icon: <FolderHeart className="w-4 h-4" /> },
  { href: "/comunidade", label: "Comunidade", icon: <Users className="w-4 h-4" /> },
];

const categoryHubs = [
  { href: "/devocionais", label: "Devocionais Diários", desc: "Meditações para manhã e noite" },
  { href: "/oracoes", label: "Orações e Intercessão", desc: "Roteiros bíblicos de oração" },
  { href: "/estudos-biblicos", label: "Estudos Bíblicos", desc: "Exegese acessível e aplicação" },
  { href: "/versiculos", label: "Versículos por Tema", desc: "Passagens contextualizadas" },
  { href: "/familia", label: "Família e Culto Doméstico", desc: "Edificação do lar e filhos" },
  { href: "/jovens", label: "Jovens e Ministério", desc: "Dinâmicas e estudos para juventude" },
  { href: "/musica-e-adoracao", label: "Música e Adoração", desc: "Preparo técnico, espiritual e autoral" },
  { href: "/recursos-para-igrejas", label: "Recursos para Igrejas", desc: "Roteiros para células e pequenos grupos" },
  { href: "/blog", label: "Todos os Artigos (/blog)", desc: "Acervo completo do portal" },
  { href: "/sobre", label: "Sobre Nós e Equipe Editorial", desc: "Missão, metodologia e direitos autorais" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hubOpen, setHubOpen] = useState(false);
  const [location] = useLocation();
  const isHomeTop = location === "/" && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHubOpen(false);
  }, [location]);

  return (
    <>
      <nav
        aria-label="Navegação Principal"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          !isHomeTop
            ? "bg-white/95 backdrop-blur-xl shadow-md shadow-black/5 border-b border-[#E8E4E0]"
            : "bg-gradient-to-b from-black/80 via-black/45 to-transparent"
        }`}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <img
                src="/images/GL%C3%93RIA_EM_LOUVORES-LOGO.png"
                alt="Glória em Louvores — Portal Cristão de Oração, Devocionais e Estudos Bíblicos"
                className={`h-12 sm:h-14 transition-all duration-300 rounded-lg ${
                  !isHomeTop ? "" : "drop-shadow-2xl"
                }`}
              />
              <div className="hidden xl:block">
                <span className={`block text-sm font-bold leading-tight ${!isHomeTop ? "text-[#1a1f3a]" : "text-white"}`}>
                  Glória em Louvores
                </span>
                <span className={`block text-[11px] ${!isHomeTop ? "text-gray-500" : "text-white/75"}`}>
                  Oração, Bíblia & Adoração
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {primaryLinks.map((link) => {
                const active = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 cursor-pointer ${
                        active
                          ? !isHomeTop
                            ? "bg-[#D4AF37]/15 text-[#1a1f3a] font-semibold"
                            : "bg-white/15 text-[#D4AF37] font-semibold"
                          : !isHomeTop
                          ? "text-gray-700 hover:text-[#1a1f3a] hover:bg-gray-100"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </span>
                  </Link>
                );
              })}

              {/* Dropdown Temas & Igrejas */}
              <div className="relative" onMouseLeave={() => setHubOpen(false)}>
                <button
                  type="button"
                  onClick={() => setHubOpen(!hubOpen)}
                  onMouseEnter={() => setHubOpen(true)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 ${
                    !isHomeTop
                      ? "text-gray-700 hover:text-[#1a1f3a] hover:bg-gray-100"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#D4AF37]" />
                  <span>Temas & Igrejas</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {hubOpen && (
                  <div className="absolute right-0 top-full pt-2 w-80 z-50">
                    <div className="rounded-2xl bg-white shadow-2xl border border-[#E8E4E0] p-3 grid gap-1">
                      {categoryHubs.map((hub) => (
                        <Link key={hub.href} href={hub.href}>
                          <div className="p-2.5 rounded-xl hover:bg-[#F9F7F4] transition-colors cursor-pointer">
                            <div className="text-xs font-bold text-[#1a1f3a]">{hub.label}</div>
                            <div className="text-[11px] text-gray-500">{hub.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Link href="/admin">
                <Button
                  variant="ghost"
                  size="sm"
                  title="Painel Administrativo"
                  className={`px-2.5 ${
                    !isHomeTop ? "text-gray-600 hover:text-[#1a1f3a]" : "text-white/80 hover:text-white"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                asChild
                size="sm"
                className="bg-[#1a1f3a] hover:bg-[#2d3561] text-white rounded-full px-4 shadow-sm text-xs"
              >
                <a
                  href="https://www.youtube.com/@gloriaemlouvores"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-4 h-4 mr-1.5 text-[#D4AF37]" />
                  Canal Oficial
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menu de navegação"
              className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                !isHomeTop ? "text-[#1a1f3a] hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <img
                  src="/images/GL%C3%93RIA_EM_LOUVORES-LOGO.png"
                  alt="Glória em Louvores"
                  className="h-11 object-contain"
                />
                <div>
                  <div className="text-sm font-bold text-[#1a1f3a]">Glória em Louvores</div>
                  <div className="text-[11px] text-gray-500">Portal de Utilidade Cristã</div>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 mb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] px-3 mb-2">
                Ferramentas & Acesso Rápido
              </p>
              {primaryLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                      location === link.href
                        ? "bg-[#D4AF37]/15 text-[#1a1f3a] font-semibold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#1a1f3a]"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="space-y-1 pt-3 border-t border-gray-100">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] px-3 mb-2">
                Categorias & Ministérios
              </p>
              {categoryHubs.map((hub) => (
                <Link key={hub.href} href={hub.href}>
                  <span className="block px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-[#1a1f3a] cursor-pointer">
                    {hub.label}
                  </span>
                </Link>
              ))}
              <Link href="/contato">
                <span className="block px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-[#1a1f3a] cursor-pointer">
                  Contato e Pedidos de Oração
                </span>
              </Link>
              <Link href="/admin">
                <span className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-500 hover:bg-gray-50 cursor-pointer">
                  <Shield className="w-3.5 h-3.5" /> Painel Admin
                </span>
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <Button
                asChild
                className="w-full bg-[#1a1f3a] hover:bg-[#2d3561] text-white rounded-xl py-5 text-sm"
              >
                <a
                  href="https://www.youtube.com/@gloriaemlouvores"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  Canal Oficial no YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
