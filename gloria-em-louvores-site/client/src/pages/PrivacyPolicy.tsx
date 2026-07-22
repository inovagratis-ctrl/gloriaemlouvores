import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <header className="bg-white border-b border-[#E8E4E0] sticky top-0 z-50">
        <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/"><Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="w-4 h-4" /> Voltar</Button></Link>
          <h1 className="text-xl font-bold text-[#1a1f3a]">Política de Privacidade</h1>
        </div>
      </header>
      <main className="container max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-[#E8E4E0]">
          <p className="text-sm text-gray-400 mb-6">Última atualização: 22 de julho de 2026</p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">1. Sobre o Glória em Louvores</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            O Glória em Louvores é um canal gospel dedicado a levar a presença de Deus através da música. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações ao utilizar nosso site e serviços.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">2. Informações Coletadas</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Coletamos apenas as informações que você nos fornece voluntariamente:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Nome e e-mail (quando você envia um pedido de oração ou contato)</li>
            <li>Mensagens enviadas através do formulário de contato</li>
            <li>Dados de navegação (cookies básicos para funcionamento do site)</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">3. Uso das Informações</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Suas informações são utilizadas exclusivamente para:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
            <li>Responder aos seus pedidos de oração e mensagens</li>
            <li>Melhorar a experiência de navegação no site</li>
            <li>Enviar atualizações sobre novos louvores (apenas se você consentir)</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">4. Compartilhamento de Dados</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros. Seus dados são mantidos em sigilo e utilizados apenas pelos responsáveis pelo canal.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">5. Cookies</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Utilizamos cookies essenciais para o funcionamento do site. Você pode desativar os cookies nas configurações do seu navegador, mas isso pode afetar a experiência de uso.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">6. Links Externos</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Nosso site contém links para o YouTube e outras plataformas. Recomendamos que você leia as políticas de privacidade desses sites, pois não nos responsabilizamos por suas práticas.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">7. Segurança</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Adotamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração ou destruição.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">8. Seus Direitos</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Você pode solicitar a exclusão dos seus dados a qualquer momento, entrando em contato conosco através do formulário do site.
          </p>

          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">9. Contato</h2>
          <p className="text-gray-600 leading-relaxed">
            Em caso de dúvidas sobre esta Política de Privacidade, entre em contato através do nosso formulário de contato ou pelo canal no YouTube.
          </p>
        </div>
      </main>
    </div>
  );
}
