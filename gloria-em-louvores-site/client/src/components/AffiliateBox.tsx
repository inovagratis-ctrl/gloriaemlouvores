import { BookOpen, ExternalLink, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { AffiliateItem, AffiliateCategory, getAffiliateById, getAffiliatesByCategory, getAffiliates, buildAffiliateUrlWithUtm } from '@/lib/affiliates';
import { trackConversionEvent } from '@/lib/analytics';

interface AffiliateBoxProps {
  affiliateId?: string;
  category?: AffiliateCategory;
  customTitle?: string;
  compact?: boolean;
}

export default function AffiliateBox({
  affiliateId,
  category,
  customTitle,
  compact = false,
}: AffiliateBoxProps) {
  const [location] = useLocation();

  let item: AffiliateItem | undefined;
  if (affiliateId) {
    item = getAffiliateById(affiliateId);
  }
  if (!item && category) {
    const byCat = getAffiliatesByCategory(category);
    item = byCat[0];
  }
  if (!item) {
    const allActive = getAffiliates().filter(a => a.active);
    item = allActive[0];
  }

  if (!item) return null;

  const targetUrl = buildAffiliateUrlWithUtm(item, location);

  const handleClick = () => {
    if (!item) return;
    trackConversionEvent('click_affiliate', {
      label: item.title,
      category: item.category,
      metadata: {
        affiliate_id: item.id,
        partner_store: item.partnerStore,
        source_page: location,
      },
    });
  };

  return (
    <aside
      aria-label="Recomendação de Leitura e Recurso Cristão"
      className="my-8 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#F9F7F4] to-white p-6 sm:p-7 shadow-sm"
    >
      {/* Top Identification Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-[#E8E4E0]">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#1a1f3a] text-[#D4AF37] text-xs font-semibold px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            {customTitle || 'Recomendação de Leitura / Recurso Cristão'}
          </span>
          <span className="inline-flex items-center gap-1 bg-amber-100/80 text-amber-900 border border-amber-300/60 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Link Afiliado
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Verificado em {item.lastVerified}
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              {item.categoryLabel} • {item.authorOrBrand}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[#1a1f3a] leading-snug">
              {item.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {item.description}
            </p>
            {!compact && item.whyWeRecommend && (
              <div className="mt-2 p-3 rounded-xl bg-white border border-[#E8E4E0] text-xs sm:text-sm text-gray-600">
                <strong className="text-[#1a1f3a]">Por que indicamos este recurso: </strong>
                {item.whyWeRecommend}
              </div>
            )}
          </div>

          <div className="sm:self-center shrink-0 pt-2 sm:pt-0">
            <a
              href={targetUrl}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              onClick={handleClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a1f3a] hover:bg-[#2d3561] text-white font-semibold px-5 py-3 text-sm shadow-sm transition-all"
            >
              <span>Ver na {item.partnerStore}</span>
              <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </div>
        </div>
      </div>

      {/* Mandatory Transparency Disclaimer */}
      <div className="mt-4 pt-3 border-t border-[#E8E4E0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500">
        <p className="flex items-start sm:items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong>Transparência Editorial:</strong> Ao adquirir recursos por este link, o portal pode receber uma pequena comissão sem custo extra para você. Jamais associamos livros ou materiais a promessas financeiras ou barganhas espirituais.
          </span>
        </p>
        <Link
          href="/transparencia-afiliados"
          className="inline-flex items-center gap-1 text-[#1a1f3a] hover:text-[#D4AF37] font-medium underline shrink-0"
        >
          <Info className="w-3.5 h-3.5" />
          Política de Afiliados
        </Link>
      </div>
    </aside>
  );
}
