import { useState } from 'react';
import { Link } from 'wouter';
import { Youtube, HeartHandshake, Mail, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { trackConversionEvent } from '@/lib/analytics';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    trackConversionEvent('subscribe_newsletter', {
      label: 'footer_newsletter',
      category: 'devotional_newsletter',
    });
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-[#111528] text-white pt-14 pb-10 border-t border-white/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Newsletter Devocional & Aviso de Acolhimento */}
        <div className="grid lg:grid-cols-12 gap-8 pb-12 mb-12 border-b border-white/10">
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7">
            <div className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              Devocional Semanal Gratuito
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Receba reflexões bíblicas e roteiros de oração no seu e-mail
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Conteúdo pastoral, reverente e sem spam. Estudos bíblicos contextualizados e guias práticos para sua família e igreja local.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium py-2">
                <CheckCircle2 className="w-5 h-5" />
                Inscrição registrada! Que a paz de Cristo fortaleça sua semana.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1"
                />
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#B8942E] text-[#111528] font-bold px-6 shrink-0"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Receber Devocionais
                </Button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 bg-amber-950/40 border border-amber-400/30 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <HeartHandshake className="w-4 h-4" />
                Acolhimento e Saúde Emocional
              </div>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                <strong>Importante:</strong> A oração e a reflexão espiritual são fontes de fé e consolo, mas não substituem acompanhamento psicológico, médico ou serviços de emergência. Em caso de crise emocional aguda, ligue <strong>188 (CVV)</strong>.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-400/20 flex items-center justify-between text-xs text-amber-200/80">
              <span>Atendimento 24h e gratuito em todo o Brasil</span>
              <a href="tel:188" className="font-bold text-amber-300 underline hover:text-white">
                Ligar 188
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-1">
            <img
              src="/images/GL%C3%93RIA_EM_LOUVORES-LOGO.png"
              alt="Glória em Louvores"
              className="h-16 object-contain mb-4"
            />
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
              Portal de utilidade cristã para oração, devocionais diários, estudos bíblicos contextualizados, plano de leitura bíblica e recursos gratuitos para famílias e igrejas.
            </p>
            <a
              href="https://www.youtube.com/@gloriaemlouvores"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:underline"
            >
              <Youtube className="w-4 h-4" />
              youtube.com/@gloriaemlouvores
            </a>
          </div>

          <div>
            <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
              Ferramentas Devocionais
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li><Link href="/plano-de-leitura" className="hover:text-[#D4AF37] transition-colors">Plano de Leitura (30 Dias & Anual)</Link></li>
              <li><Link href="/materiais" className="hover:text-[#D4AF37] transition-colors">Caderno de Oração Interativo</Link></li>
              <li><Link href="/materiais" className="hover:text-[#D4AF37] transition-colors">Guias Imprimíveis (Culto no Lar)</Link></li>
              <li><Link href="/comunidade" className="hover:text-[#D4AF37] transition-colors">Comunidade e Mural de Oração</Link></li>
              <li><Link href="/blog" className="hover:text-[#D4AF37] transition-colors">Acervo Completo (/blog)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
              Categorias e Estudos
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li><Link href="/devocionais" className="hover:text-[#D4AF37] transition-colors">Devocionais Diários</Link></li>
              <li><Link href="/oracoes" className="hover:text-[#D4AF37] transition-colors">Orações e Intercessão</Link></li>
              <li><Link href="/estudos-biblicos" className="hover:text-[#D4AF37] transition-colors">Estudos Bíblicos</Link></li>
              <li><Link href="/versiculos" className="hover:text-[#D4AF37] transition-colors">Versículos Contextualizados</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
              Vida Cristã & Igreja
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li><Link href="/familia" className="hover:text-[#D4AF37] transition-colors">Família e Culto Doméstico</Link></li>
              <li><Link href="/jovens" className="hover:text-[#D4AF37] transition-colors">Jovens e Ministério</Link></li>
              <li><Link href="/musica-e-adoracao" className="hover:text-[#D4AF37] transition-colors">Música e Adoração</Link></li>
              <li><Link href="/recursos-para-igrejas" className="hover:text-[#D4AF37] transition-colors">Recursos para Igrejas e Células</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4">
              Institucional e Transparência
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/75">
              <li><Link href="/sobre" className="hover:text-[#D4AF37] transition-colors">Sobre Nós e Equipe Editorial</Link></li>
              <li><Link href="/sobre" className="hover:text-[#D4AF37] transition-colors">Metodologia e Direitos Autorais</Link></li>
              <li><Link href="/contato" className="hover:text-[#D4AF37] transition-colors">Contato e Pedidos de Oração</Link></li>
              <li><Link href="/transparencia-afiliados" className="hover:text-[#D4AF37] transition-colors">Transparência de Afiliados</Link></li>
              <li><Link href="/privacidade" className="hover:text-[#D4AF37] transition-colors">Política de Privacidade (LGPD)</Link></li>
              <li><Link href="/politica-de-cookies" className="hover:text-[#D4AF37] transition-colors">Política de Cookies</Link></li>
              <li><Link href="/termos" className="hover:text-[#D4AF37] transition-colors">Termos de Uso</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Copyright Policy Summary */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>
              © {new Date().getFullYear()} <strong>Glória em Louvores</strong> (gloriaemlouvores.com.br). Reflexões originais, textos bíblicos em domínio público (Almeida) e vídeos incorporados oficialmente do YouTube.
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/sobre" className="hover:text-[#D4AF37] transition-colors">Direitos Autorais</Link>
            <Link href="/privacidade" className="hover:text-[#D4AF37] transition-colors">Privacidade</Link>
            <Link href="/politica-de-cookies" className="hover:text-[#D4AF37] transition-colors">Cookies</Link>
            <Link href="/termos" className="hover:text-[#D4AF37] transition-colors">Termos</Link>
            <Link href="/transparencia-afiliados" className="hover:text-[#D4AF37] transition-colors">Afiliados</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
