import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Music, Menu, X, Youtube, Home, BookOpen, Mail, Shield } from "lucide-react";

const navLinks = [
  { href: "/", label: "Início", icon: <Home className="w-4 h-4" /> },
  { href: "/blog", label: "Blog", icon: <BookOpen className="w-4 h-4" /> },
  { href: "/#contato", label: "Contato", icon: <Mail className="w-4 h-4" /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[#E8E4E0]"
            : "bg-transparent"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <img src="/images/logotipo.png" alt="Glória em Louvores" className={`h-10 sm:h-12 object-contain transition-all duration-300 ${scrolled ? "drop-shadow-sm" : "drop-shadow-lg"}`} />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    location === link.href
                      ? scrolled
                        ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                        : "bg-white/10 text-[#D4AF37]"
                      : scrolled
                        ? "text-gray-600 hover:text-[#1a1f3a] hover:bg-gray-100"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}>
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className={`gap-2 ${
                  scrolled ? "text-gray-600 hover:text-[#1a1f3a]" : "text-white/70 hover:text-white"
                }`}>
                  <Shield className="w-4 h-4" />
                </Button>
              </Link>
              <Button asChild size="sm" className="bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-full px-5 shadow-lg shadow-[#FF0000]/20">
                <a href="https://www.youtube.com/@gloriaemlouvores?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4 mr-1.5" />
                  Inscreva-se
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                scrolled ? "text-[#1a1f3a] hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-0 right-0 w-72 h-full bg-white shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <img src="/images/logotipo.png" alt="Glória em Louvores" className="h-10 object-contain" />
              <button onClick={() => setMobileOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    location === link.href
                      ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#1a1f3a]"
                  }`}>
                    {link.icon}
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/admin">
                <span className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#1a1f3a] transition-all cursor-pointer">
                  <Shield className="w-4 h-4" />
                  Admin
                </span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Button asChild className="w-full bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-xl py-5">
                <a href="https://www.youtube.com/@gloriaemlouvores?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-5 h-5 mr-2" />
                  Inscreva-se no Canal
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
