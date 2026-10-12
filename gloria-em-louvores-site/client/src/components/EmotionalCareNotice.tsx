import { HeartHandshake, PhoneCall } from 'lucide-react';

interface EmotionalCareNoticeProps {
  compact?: boolean;
  className?: string;
}

export default function EmotionalCareNotice({ compact = false, className = '' }: EmotionalCareNoticeProps) {
  return (
    <div
      role="note"
      aria-label="Aviso de Acolhimento e Saúde Emocional"
      className={`rounded-2xl border border-amber-300/80 bg-amber-50/90 p-4 sm:p-5 text-amber-950 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-200/70 flex items-center justify-center shrink-0 mt-0.5">
          <HeartHandshake className="w-5 h-5 text-amber-900" />
        </div>
        <div className="space-y-1.5 flex-1">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900">
            Cuidado Integral e Acolhimento Emocional
          </p>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-950">
            <strong>Importante:</strong> A oração e a reflexão espiritual são fontes de fé e consolo, mas não substituem acompanhamento psicológico, médico ou serviços de emergência. Em caso de crise emocional aguda, ligue <strong>188 (CVV)</strong>.
          </p>
          {!compact && (
            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-amber-900/90">
              <a
                href="tel:188"
                className="inline-flex items-center gap-1.5 font-semibold underline hover:text-amber-700"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                Ligar 188 (CVV — 24h e gratuito)
              </a>
              <span>•</span>
              <a
                href="https://www.cvv.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline hover:text-amber-700"
              >
                Chat em cvv.org.br
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
