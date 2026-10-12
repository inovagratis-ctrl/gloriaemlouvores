// Central Analytics & Event Tracking + AdSense & NoIndex Control for Glória em Louvores

export type ConversionEvent =
  | 'subscribe_newsletter'
  | 'download_devotional'
  | 'reading_plan_check'
  | 'prayer_notebook_save'
  | 'click_affiliate';

export interface TrackEventPayload {
  event: ConversionEvent;
  label?: string;
  category?: string;
  value?: number;
  metadata?: Record<string, string | number | boolean>;
  timestamp?: string;
}

const ANALYTICS_STORAGE_KEY = 'gloria_analytics_events';
const ADSENSE_CONFIG_KEY = 'gloria_adsense_config';

export interface RouteAdConfig {
  path: string;
  label: string;
  adsenseAllowed: boolean;
  noindex: boolean;
  lockedNoAdsense?: boolean; // True for routes where AdSense is strictly prohibited by editorial policy
  reason?: string;
}

export const DEFAULT_ROUTE_AD_CONFIGS: RouteAdConfig[] = [
  { path: '/', label: 'Página Inicial (Portal)', adsenseAllowed: true, noindex: false },
  { path: '/devocionais', label: 'Hub: Devocionais Diários', adsenseAllowed: true, noindex: false },
  { path: '/oracoes', label: 'Hub: Orações e Intercessão', adsenseAllowed: false, noindex: false, reason: 'Baixa densidade / foco em oração reverente' },
  { path: '/estudos-biblicos', label: 'Hub: Estudos Bíblicos', adsenseAllowed: true, noindex: false },
  { path: '/versiculos', label: 'Hub: Versículos por Tema', adsenseAllowed: true, noindex: false },
  { path: '/familia', label: 'Hub: Família e Culto Doméstico', adsenseAllowed: true, noindex: false },
  { path: '/jovens', label: 'Hub: Jovens e Ministério', adsenseAllowed: true, noindex: false },
  { path: '/musica-e-adoracao', label: 'Hub: Música e Adoração', adsenseAllowed: true, noindex: false },
  { path: '/recursos-para-igrejas', label: 'Hub: Recursos para Igrejas', adsenseAllowed: true, noindex: false },
  { path: '/plano-de-leitura', label: 'Ferramenta: Plano de Leitura Bíblica', adsenseAllowed: true, noindex: false },
  { path: '/materiais', label: 'Ferramenta: Caderno de Oração e Guias', adsenseAllowed: false, noindex: false, reason: 'Uso devocional pessoal sem distração' },
  { path: '/comunidade', label: 'Comunidade de Oração (Mural)', adsenseAllowed: false, noindex: false, lockedNoAdsense: true, reason: 'PROIBIDO: Área sensível de intercessão e acolhimento emocional' },
  { path: '/blog', label: 'Lista de Artigos e Estudos (/blog)', adsenseAllowed: true, noindex: false },
  { path: '/sobre', label: 'Sobre Nós, Equipe e Direitos Autorais', adsenseAllowed: false, noindex: false },
  { path: '/contato', label: 'Contato e Pedidos de Oração', adsenseAllowed: false, noindex: false, lockedNoAdsense: true, reason: 'PROIBIDO: Formulário de pedido de oração e suporte' },
  { path: '/privacidade', label: 'Política de Privacidade', adsenseAllowed: false, noindex: false, lockedNoAdsense: true },
  { path: '/politica-de-cookies', label: 'Política de Cookies', adsenseAllowed: false, noindex: false, lockedNoAdsense: true },
  { path: '/termos', label: 'Termos de Uso', adsenseAllowed: false, noindex: false, lockedNoAdsense: true },
  { path: '/transparencia-afiliados', label: 'Transparência e Ética de Afiliados', adsenseAllowed: false, noindex: false, lockedNoAdsense: true },
  { path: '/admin', label: 'Painel Administrativo', adsenseAllowed: false, noindex: true, lockedNoAdsense: true, reason: 'PROIBIDO: Área administrativa restrita' },
];

export function getRouteAdConfigs(): RouteAdConfig[] {
  try {
    const saved = localStorage.getItem(ADSENSE_CONFIG_KEY);
    if (!saved) return DEFAULT_ROUTE_AD_CONFIGS;
    const parsed: RouteAdConfig[] = JSON.parse(saved);
    return DEFAULT_ROUTE_AD_CONFIGS.map(def => {
      const found = parsed.find(p => p.path === def.path);
      if (!found) return def;
      return {
        ...def,
        adsenseAllowed: def.lockedNoAdsense ? false : found.adsenseAllowed,
        noindex: found.noindex,
      };
    });
  } catch {
    return DEFAULT_ROUTE_AD_CONFIGS;
  }
}

export function saveRouteAdConfigs(configs: RouteAdConfig[]): void {
  const sanitized = configs.map(c => ({
    ...c,
    adsenseAllowed: c.lockedNoAdsense ? false : c.adsenseAllowed,
  }));
  localStorage.setItem(ADSENSE_CONFIG_KEY, JSON.stringify(sanitized));
}

export function isAdSenseAllowedForPath(pathname: string): boolean {
  // Strictly forbidden paths
  const forbiddenPrefixes = ['/comunidade', '/contato', '/admin', '/privacidade', '/politica-de-privacidade', '/politica-de-cookies', '/termos', '/termos-de-uso', '/transparencia-afiliados'];
  if (forbiddenPrefixes.some(prefix => pathname === prefix || pathname.startsWith(prefix + '/'))) {
    return false;
  }
  const configs = getRouteAdConfigs();
  const exact = configs.find(c => c.path === pathname);
  if (exact) return exact.lockedNoAdsense ? false : exact.adsenseAllowed;
  if (pathname.startsWith('/blog/')) {
    const blogConfig = configs.find(c => c.path === '/blog');
    return blogConfig ? blogConfig.adsenseAllowed : true;
  }
  return false;
}

export function isNoIndexForPath(pathname: string): boolean {
  if (pathname.startsWith('/admin')) return true;
  const configs = getRouteAdConfigs();
  const exact = configs.find(c => c.path === pathname);
  return exact ? exact.noindex : false;
}

export function trackConversionEvent(
  event: ConversionEvent,
  options?: { label?: string; category?: string; value?: number; metadata?: Record<string, string | number | boolean> }
): void {
  const payload: TrackEventPayload = {
    event,
    label: options?.label,
    category: options?.category,
    value: options?.value,
    metadata: options?.metadata,
    timestamp: new Date().toISOString(),
  };

  try {
    // Push to dataLayer if GTM/GA4 is present
    const win = window as unknown as { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: payload.event,
        event_label: payload.label,
        event_category: payload.category || 'engagement',
        value: payload.value,
        ...payload.metadata,
      });
    }
    if (typeof win.gtag === 'function') {
      win.gtag('event', payload.event, {
        event_label: payload.label,
        event_category: options?.category || 'christian_utility',
        value: options?.value,
        ...options?.metadata,
      });
    }

    // Also persist locally for Admin Dashboard inspection
    const existingRaw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    const existing: TrackEventPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
    const updated = [payload, ...existing].slice(0, 200);
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Analytics tracking fallback:', err);
  }
}

export function getTrackedEvents(): TrackEventPayload[] {
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
