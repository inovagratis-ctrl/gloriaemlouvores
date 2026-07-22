import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function TermsOfUse() {
  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <header className="bg-white border-b border-[#E8E4E0] sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/"><Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</Button></Link>
          <h1 className="text-xl font-bold text-[#1a1f3a]">Termos de Uso</h1>
        </div>
      </header>
      <main className="container max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#E8E4E0]">
          <p className="text-sm text-gray-400 mb-6">Última atualização: 22 de julho de 2026</p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">1. Aceitação dos Termos</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Ao acessar e utilizar o site Glória em Louvores, você concorda com estes Termos de Uso. Se não concordar com algum dos termos, por favor, não utilize o site.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">2. Sobre o Site</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            O Glória em Louvores é um canal gospel dedicado a compartilhar louvores, músicas cristãs e conteúdo de fé. Nosso site é uma extensão do canal no YouTube, oferecendo blog, orações e comunidade.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">3. Uso do Conteúdo</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Todo o conteúdo do site é de responsabilidade do Glória em Louvores. Você pode:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Compartilhar os links dos vídeos e artigos</li>
            <li>Utilizar as músicas para fins pessoais e de oração</li>
            <li>Compartilhar o conteúdo nas redes sociais</li>
          </ul>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Não é permitido reproduzir o conteúdo total ou parcial sem autorização prévia.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">4. Conduta do Usuário</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Ao utilizar o site, você concorda em:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Respeitar outros membros da comunidade</li>
            <li>Não utilizar o site para fins ilegais ou não autorizados</li>
            <li>Não enviar conteúdos ofensivos, discriminatórios ou inadequados</li>
            <li>Manter o respeito às diversas denominações cristãs</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">5. Pedidos de Oração</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Os pedidos de oração são tratados com sigilo e carinho. Reservamo-nos o direito de não publicar conteúdos que contrariem nossos princípios de fé e respeito.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">6. Links Externos</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            O site pode conter links para plataformas externas (YouTube, etc.). Não nos responsabilizamos pelo conteúdo ou práticas desses sites.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">7. Isenção de Responsabilidade</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            O conteúdo do site é de caráter educativo e espiritual. Não substitui aconselhamento profissional, médico ou psicológico. Em caso de necessidade, busque ajuda especializada.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">8. Alterações nos Termos</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. As alterações entram em vigor imediatamente após a publicação no site.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">9. Contato</h2>
          <p className="text-gray-600 leading-relaxed">
            Em caso de dúvidas sobre estes Termos de Uso, entre em contato através do nosso formulário de contato ou pelo canal no YouTube.
          </p>
        </div>
      </main>
    </div>
  );
}
