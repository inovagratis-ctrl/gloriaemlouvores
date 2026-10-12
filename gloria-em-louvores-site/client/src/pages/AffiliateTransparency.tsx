import { Link } from 'wouter';
import { ShieldCheck, CheckCircle2, XCircle, ChevronRight, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getAffiliates } from '@/lib/affiliates';

export default function AffiliateTransparency() {
  const affiliates = getAffiliates().filter(a => a.active);

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Política de Transparência e Ética de Afiliados | Glória em Louvores"
        description="Conheça nossa política ética de recomendações de leitura e recursos cristãos. Total transparência sobre links afiliados e critérios editoriais."
        canonicalPath="/transparencia-afiliados"
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Transparência de Afiliados', path: '/transparencia-afiliados' },
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
            <span className="text-[#D4AF37] font-semibold">Transparência de Afiliados</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-7 h-7 text-[#D4AF37]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Política de Transparência e Ética de Afiliados
            </h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base">
            Como mantemos a sustentabilidade do portal com integridade cristã e respeito absoluto ao leitor.
          </p>
        </div>
      </section>

      <main className="container max-w-4xl mx-auto px-4 py-12 flex-1">
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-[#E8E4E0] space-y-6 text-gray-700 leading-relaxed">
          <p className="text-xs text-gray-400">Última verificação: 12 de outubro de 2026</p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">1. Como funcionam os links afiliados</h2>
          <p>
            Todas as ferramentas devocionais, planos de leitura bíblica, caderno de oração e estudos bíblicos do <strong>Glória em Louvores</strong> são disponibilizados de forma <strong>100% gratuita</strong>. Para auxiliar nos custos de hospedagem, manutenção técnica e produção editorial, alguns artigos apresentam quadros identificados claramente com os selos <em>"Recomendação de Leitura / Recurso Cristão"</em> e <em>"Link Afiliado"</em> (com atributo técnico <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">rel="sponsored nofollow"</code>).
          </p>
          <p>
            Quando você clica em um desses links e adquire um livro ou Bíblia na loja parceira (como a Amazon Brasil), o portal pode receber uma pequena comissão, <strong>sem nenhum acréscimo no preço pago por você</strong>.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">2. Recursos Permitidos vs. Práticas Estritamente Proibidas</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <h3 className="font-bold text-emerald-950 flex items-center gap-2 text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                O que recomendamos
              </h3>
              <ul className="text-xs sm:text-sm text-emerald-900 space-y-1.5 list-disc list-inside">
                <li>Bíblias de Estudo (Almeida, NAA, NVI)</li>
                <li>Livros de teologia, hermenêutica e vida cristã</li>
                <li>Devocionais impressos clássicos</li>
                <li>Agendas e planners de leitura bíblica</li>
                <li>Materiais para Escola Dominical e pequenos grupos</li>
                <li>Instrumentos musicais e acessórios para ministério de louvor</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
              <h3 className="font-bold text-red-950 flex items-center gap-2 text-base">
                <XCircle className="w-5 h-5 text-red-600" />
                O que NUNCA fazemos
              </h3>
              <ul className="text-xs sm:text-sm text-red-900 space-y-1.5 list-disc list-inside">
                <li>Jamais associamos produtos comerciais a promessas de prosperidade financeira</li>
                <li>Jamais prometemos cura médica garantida mediante compra</li>
                <li>Jamais praticamos barganha espiritual ou venda de indulgências</li>
                <li>Jamais recomendamos produtos sem relação com a edificação cristã</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">3. Recursos Atualmente Verificados pela Equipe</h2>
          <div className="space-y-3">
            {affiliates.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#F9F7F4] border border-[#E8E4E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-bold text-[#1a1f3a] text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs text-gray-500">
                    {item.authorOrBrand} • Verificado em {item.lastVerified}
                  </p>
                </div>
                <span className="text-xs font-semibold text-gray-600 shrink-0">
                  Parceiro: {item.partnerStore}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
