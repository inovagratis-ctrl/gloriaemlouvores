import { Link } from "wouter";
import { ChevronRight, Home, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Política de Privacidade e Proteção de Dados (LGPD) | Glória em Louvores"
        description="Política de Privacidade do portal Glória em Louvores conforme a LGPD (Lei nº 13.709/2018). Saiba como protegemos seus dados e respeitamos sua privacidade."
        canonicalPath="/privacidade"
        breadcrumbs={[
          { name: "Início", path: "/" },
          { name: "Política de Privacidade", path: "/privacidade" },
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
            <span className="text-[#D4AF37] font-semibold">Política de Privacidade</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Política de Privacidade (LGPD)
            </h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base">
            Compromisso com a segurança, o sigilo pastoral e a proteção dos seus dados pessoais.
          </p>
        </div>
      </section>

      <main className="container max-w-4xl mx-auto px-4 py-12 flex-1">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#E8E4E0] space-y-6 text-gray-700 leading-relaxed">
          <p className="text-xs text-gray-400">Última atualização: 12 de outubro de 2026</p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">1. Sobre o Glória em Louvores</h2>
          <p>
            O <strong>Glória em Louvores</strong> (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">gloriaemlouvores.com.br</code>) é um portal cristão de utilidade prática dedicado a devocionais, oração, estudos bíblicos e adoração. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">2. Informações Coletadas</h2>
          <p>Coletamos apenas informações fornecidas voluntariamente ou essenciais para a navegação:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Nome e e-mail quando você envia uma mensagem de contato, pedido de oração ou se inscreve no devocional semanal.</li>
            <li>Registros salvos localmente no seu próprio dispositivo (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">localStorage</code>) para funcionamento do Plano de Leitura Bíblica e do Caderno de Oração Interativo.</li>
            <li>Cookies essenciais, analíticos e de publicidade em páginas informativas elegíveis (conforme detalhado em nossa <Link href="/politica-de-cookies" className="underline font-medium">Política de Cookies</Link>).</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">3. Uso e Sigilo das Informações</h2>
          <p>
            Não vendemos, alugamos nem comercializamos dados pessoais de nossos leitores. Os e-mails informados no formulário de pedidos de oração nunca são exibidos publicamente no mural da comunidade.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">4. Links Afiliados e Incorporações Externas</h2>
          <p>
            Nosso site incorpora vídeos oficiais do YouTube e apresenta recomendações éticas de livros e Bíblias por meio de links afiliados identificados (<Link href="/transparencia-afiliados" className="underline font-medium">Política de Transparência de Afiliados</Link>). Ao clicar em links externos, aplicam-se as políticas de privacidade das respectivas plataformas.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">5. Seus Direitos (LGPD)</h2>
          <p>
            Você pode solicitar a confirmação, correção ou exclusão de qualquer dado enviado por formulário a qualquer momento por meio da nossa página de <Link href="/contato" className="underline font-medium">Contato</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
