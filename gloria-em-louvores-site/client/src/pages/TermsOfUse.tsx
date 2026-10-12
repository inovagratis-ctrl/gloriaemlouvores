import { Link } from "wouter";
import { ChevronRight, Home, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Termos de Uso e Responsabilidade Editorial | Glória em Louvores"
        description="Termos de Uso do portal Glória em Louvores: regras de utilização do conteúdo devocional, direitos autorais e aviso de saúde emocional."
        canonicalPath="/termos"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Termos de Uso", path: "/termos" },
        ]}
      />
      <Navbar />

      <section className="pt-28 pb-10 bg-gradient-to-br from-[#1a1f3a] to-[#0f1325] text-white">
        <div className="container max-w-4xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/70 mb-5">
            <Link href="/" className="hover:text-[#D4AF37] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[#D4AF37] font-semibold">Termos de Uso</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <Scale className="w-7 h-7 text-[#D4AF37]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Termos de Uso</h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base">
            Diretrizes de uso das ferramentas devocionais, estudos bíblicos e comunidade de oração.
          </p>
        </div>
      </section>

      <main className="container max-w-4xl mx-auto px-4 py-12 flex-1">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#E8E4E0] space-y-6 text-gray-700 leading-relaxed">
          <p className="text-xs text-gray-400">Última atualização: 12 de outubro de 2026</p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar o portal <strong>Glória em Louvores</strong> (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">gloriaemlouvores.com.br</code>), você concorda com estes Termos de Uso.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">2. Uso do Conteúdo e Direitos Autorais</h2>
          <p>
            Você pode imprimir e utilizar gratuitamente nossos roteiros de culto doméstico, planos de leitura bíblica e estudos para uso pessoal, familiar ou em pequenos grupos/Escola Dominical na sua igreja local, desde que citada a fonte (<strong>Glória em Louvores — gloriaemlouvores.com.br</strong>). Não é permitida a reprodução comercial ou republicação integral em outros sites sem autorização prévia.
          </p>
          <p>
            Os vídeos musicais exibidos no portal são incorporados oficialmente do YouTube, sem redistribuição de arquivos fonográficos ou letras protegidas sem licença (veja mais em <Link href="/sobre" className="underline font-medium">/sobre</Link>).
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">3. Conduta na Comunidade de Oração</h2>
          <p>
            No mural de <Link href="/comunidade" className="underline font-medium">Comunidade de Oração</Link>, os usuários comprometem-se a manter linguagem respeitosa, fraterna e cristã, sem expor dados sensíveis de terceiros, discursos de ódio ou propaganda comercial.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">4. Isenção de Responsabilidade Médica e Psicológica</h2>
          <p>
            Todo o conteúdo deste portal possui caráter exclusivamente espiritual, devocional e educativo. <strong>Importante: A oração e a reflexão espiritual são fontes de fé e consolo, mas não substituem acompanhamento psicológico, médico ou serviços de emergência. Em caso de crise emocional aguda, ligue 188 (CVV).</strong>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
