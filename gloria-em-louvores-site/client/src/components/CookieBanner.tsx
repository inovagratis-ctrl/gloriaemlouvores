import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'gloria_cookie_consent_v1';

export interface CookieConsentState {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
  updatedAt: string;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [advertising, setAdvertising] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const savePreferences = (acceptAll: boolean, rejectOptional = false) => {
    const state: CookieConsentState = {
      essential: true,
      analytics: rejectOptional ? false : acceptAll ? true : analytics,
      advertising: rejectOptional ? false : acceptAll ? true : advertising,
      updatedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Preferências de Privacidade e Cookies (LGPD)"
      className="fixed bottom-4 left-4 right-4 z-[120] max-w-4xl mx-auto rounded-2xl border border-[#D4AF37]/40 bg-white/95 backdrop-blur-xl shadow-2xl p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-[#1a1f3a] flex items-center gap-2">
              Respeito à sua Privacidade e Dados (LGPD)
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Utilizamos armazenamento local (<code className="text-xs bg-gray-100 px-1 py-0.5 rounded">localStorage</code>) e cookies essenciais para salvar seu progresso no{' '}
              <strong>Plano de Leitura Bíblica</strong> e no <strong>Caderno de Oração</strong>, além de cookies analíticos e de publicidade ética em páginas elegíveis. Leia nossa{' '}
              <Link href="/privacidade" className="text-[#1a1f3a] underline font-medium hover:text-[#D4AF37]">
                Política de Privacidade
              </Link>{' '}
              e{' '}
              <Link href="/politica-de-cookies" className="text-[#1a1f3a] underline font-medium hover:text-[#D4AF37]">
                Política de Cookies
              </Link>.
            </p>
          </div>
        </div>
        <button
          onClick={() => savePreferences(false, true)}
          aria-label="Fechar mantendo apenas essenciais"
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-[#E8E4E0] grid sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#F9F7F4] border border-[#E8E4E0]">
            <div className="flex items-center justify-between font-semibold text-[#1a1f3a] mb-1">
              <span>Essenciais e Devocionais</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">Sempre Ativo</span>
            </div>
            <p className="text-gray-600">Salva seu Plano de Leitura de 30 dias/Anual e Caderno de Oração diretamente no seu dispositivo.</p>
          </div>
          <label className="p-3 rounded-xl bg-[#F9F7F4] border border-[#E8E4E0] cursor-pointer block">
            <div className="flex items-center justify-between font-semibold text-[#1a1f3a] mb-1">
              <span>Métricas e Melhorias</span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={e => setAnalytics(e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>
            <p className="text-gray-600">Ajuda nossa equipe editorial a entender quais estudos bíblicos e guias são mais úteis.</p>
          </label>
          <label className="p-3 rounded-xl bg-[#F9F7F4] border border-[#E8E4E0] cursor-pointer block">
            <div className="flex items-center justify-between font-semibold text-[#1a1f3a] mb-1">
              <span>Publicidade Sustentável</span>
              <input
                type="checkbox"
                checked={advertising}
                onChange={e => setAdvertising(e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>
            <p className="text-gray-600">Anúncios discretos em artigos informativos (nunca exibidos no mural de oração).</p>
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-gray-600 hover:text-[#1a1f3a]"
        >
          {showDetails ? 'Ocultar preferências' : 'Personalizar escolhas'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => savePreferences(false, true)}
          className="text-xs border-gray-300 text-gray-700"
        >
          Apenas Essenciais
        </Button>
        {showDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => savePreferences(false, false)}
            className="text-xs border-[#1a1f3a] text-[#1a1f3a]"
          >
            Salvar Preferências
          </Button>
        )}
        <Button
          size="sm"
          onClick={() => savePreferences(true, false)}
          className="text-xs bg-[#1a1f3a] hover:bg-[#2d3561] text-white gap-1.5"
        >
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          Aceitar e Continuar
        </Button>
      </div>
    </div>
  );
}
