import { Link } from 'wouter';
import { Cookie, ChevronRight, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-[#F9F7F4] flex flex-col">
      <SEOHead
        title="Política de Cookies e Armazenamento Local (LGPD) | Glória em Louvores"
        description="Saiba como o portal Glória em Louvores utiliza cookies essenciais, armazenamento local (localStorage) para ferramentas devocionais e cookies analíticos."
        canonicalPath="/politica-de-cookies"
        breadcrumbs={[
          { name: 'Início', path: '/' },
          { name: 'Política de Cookies', path: '/politica-de-cookies' },
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
            <span className="text-[#D4AF37] font-semibold">Política de Cookies</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <Cookie className="w-7 h-7 text-[#D4AF37]" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Política de Cookies</h1>
          </div>
          <p className="text-white/80 text-sm sm:text-base">
            Transparência sobre como funcionam os recursos técnicos e de armazenamento no seu navegador.
          </p>
        </div>
      </section>

      <main className="container max-w-4xl mx-auto px-4 py-12 flex-1">
        <div className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-[#E8E4E0] space-y-6 text-gray-700 leading-relaxed">
          <p className="text-xs text-gray-400">Última atualização: 12 de outubro de 2026</p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">1. O que são cookies e armazenamento local?</h2>
          <p>
            Cookies e recursos de armazenamento local do navegador (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">localStorage</code>) são pequenos arquivos ou registros salvos no seu dispositivo quando você visita o site <strong>Glória em Louvores</strong> (<code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">gloriaemlouvores.com.br</code>). Eles permitem que o site reconheça suas preferências e mantenha o funcionamento das ferramentas interativas.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">2. Como utilizamos esses recursos no portal</h2>
          <ul className="list-disc list-inside space-y-2.5">
            <li>
              <strong>Armazenamento Devocional e Essencial (Sempre Ativo):</strong> Utilizado para guardar o seu progresso no <Link href="/plano-de-leitura" className="underline font-medium">Plano de Leitura Bíblica (30 Dias e Anual)</Link>, suas anotações pessoais no <Link href="/materiais" className="underline font-medium">Caderno de Oração Interativo</Link> e sua escolha no banner de consentimento LGPD. Esses dados ficam salvos diretamente no seu navegador.
            </li>
            <li>
              <strong>Cookies Analíticos e de Desempenho:</strong> Ajudam nossa equipe editorial a compreender, de forma agregada e anônima, quais estudos bíblicos, devocionais e ferramentas são mais visitados para melhorarmos continuamente o portal.
            </li>
            <li>
              <strong>Cookies de Terceiros (YouTube e Publicidade Elegível):</strong> Ao assistir a um vídeo incorporado oficialmente do YouTube ou navegar em artigos informativos com espaços publicitários ativos (Google AdSense), esses serviços podem utilizar cookies próprios conforme as políticas de privacidade da Google.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">3. Áreas livres de cookies publicitários</h2>
          <p>
            Por decisão editorial e respeito pastoral, <strong>nunca exibimos anúncios publicitários</strong> na página da <Link href="/comunidade" className="underline font-medium">Comunidade de Oração (/comunidade)</Link>, no formulário de <Link href="/contato" className="underline font-medium">Pedidos de Oração (/contato)</Link> nem sobre textos de oração.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a]">4. Como gerenciar ou limpar seus cookies</h2>
          <p>
            Você pode alterar suas preferências a qualquer momento limpando os dados de navegação do seu navegador ou ajustando as permissões de cookies nas configurações do Chrome, Safari, Edge ou Firefox. Caso limpe o <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">localStorage</code>, recomendamos antes exportar seu Caderno de Oração em formato <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">.TXT</code> na página <Link href="/materiais" className="underline font-medium">/materiais</Link>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
