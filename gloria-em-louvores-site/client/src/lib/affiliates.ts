// Ethical Christian Affiliate Recommendations for Glória em Louvores
// Permitted categories ONLY: Bíblias de estudo, livros de teologia e vida cristã, devocionais impressos,
// agendas/planners de leitura bíblica, materiais para escola dominical/pequenos grupos, instrumentos musicais/acessórios.
// NEVER associate products with financial prosperity promises, guaranteed healing, or spiritual bargaining.

export type AffiliateCategory =
  | 'biblia-de-estudo'
  | 'teologia-vida-crista'
  | 'devocional-impresso'
  | 'planner-agenda'
  | 'escola-dominical-pequenos-grupos'
  | 'instrumentos-musica';

export interface AffiliateItem {
  id: string;
  title: string;
  authorOrBrand: string;
  category: AffiliateCategory;
  categoryLabel: string;
  description: string;
  whyWeRecommend: string;
  url: string;
  partnerStore: string;
  lastVerified: string;
  active: boolean;
  utmCampaign: string;
}

const AFFILIATES_STORAGE_KEY = 'gloria_affiliates_data_v1';

export const DEFAULT_AFFILIATE_ITEMS: AffiliateItem[] = [
  {
    id: 'biblia-estudo-almeida-naa',
    title: 'Bíblia de Estudo NAA (Nova Almeida Atualizada)',
    authorOrBrand: 'Sociedade Bíblica do Brasil (SBB)',
    category: 'biblia-de-estudo',
    categoryLabel: 'Bíblia de Estudo',
    description: 'Edição com milhares de notas exegéticas, mapas históricos, introduções aos livros bíblicos e referências cruzadas para estudo aprofundado.',
    whyWeRecommend: 'Excelente recurso para quem está iniciando o Plano de Leitura Bíblica ou aplicando o método indutivo (Observação, Interpretação e Aplicação).',
    url: 'https://www.amazon.com.br/s?k=Biblia+de+Estudo+NAA+Sociedade+Biblica+do+Brasil',
    partnerStore: 'Amazon Brasil',
    lastVerified: '2026-10-12',
    active: true,
    utmCampaign: 'estudo_biblico_naa',
  },
  {
    id: 'livro-celebracao-disciplina',
    title: 'Celebração da Disciplina: O Caminho do Crescimento Espiritual',
    authorOrBrand: 'Richard J. Foster (Editora Vida)',
    category: 'teologia-vida-crista',
    categoryLabel: 'Livro de Vida Cristã e Oração',
    description: 'Clássico da espiritualidade cristã que aborda com equilíbrio bíblico disciplinas como oração, meditação nas Escrituras, jejum, simplicidade e serviço.',
    whyWeRecommend: 'Ajuda cristãos de todas as denominações a desenvolverem constância devocional no dia a dia sem legalismo.',
    url: 'https://www.amazon.com.br/s?k=Celebracao+da+Disciplina+Richard+Foster',
    partnerStore: 'Amazon Brasil',
    lastVerified: '2026-10-12',
    active: true,
    utmCampaign: 'rotina_oracao_foster',
  },
  {
    id: 'planner-devocional-diario',
    title: 'Diário e Planner de Oração e Leitura Bíblica Anual',
    authorOrBrand: 'Publicações Pão Diário / Thomas Nelson',
    category: 'planner-agenda',
    categoryLabel: 'Planner de Leitura Bíblica',
    description: 'Caderno estruturado com espaço para registro diário de leitura bíblica, motivos de gratidão, pedidos de intercessão e aplicação prática.',
    whyWeRecommend: 'Ideal para quem prefere anotar suas meditações no papel como complemento ao nosso Caderno de Oração Interativo.',
    url: 'https://www.amazon.com.br/s?k=Planner+Devocional+Leitura+Biblica+Diario+de+Oracao',
    partnerStore: 'Amazon Brasil',
    lastVerified: '2026-10-12',
    active: true,
    utmCampaign: 'planner_devocional',
  },
  {
    id: 'devocional-manha-noite-spurgeon',
    title: 'Manhã e Noite: Meditações Diárias nas Escrituras',
    authorOrBrand: 'Charles H. Spurgeon',
    category: 'devocional-impresso',
    categoryLabel: 'Devocional Impresso',
    description: 'Devocional clássico com reflexões bíblicas breves e profundas para o início da manhã e o encerramento do dia em família ou individualmente.',
    whyWeRecommend: 'Linguagem reverente, centrada em Cristo e no consolo das Escrituras, muito útil para o culto doméstico.',
    url: 'https://www.amazon.com.br/s?k=Devocional+Manha+e+Noite+Charles+Spurgeon',
    partnerStore: 'Amazon Brasil',
    lastVerified: '2026-10-12',
    active: true,
    utmCampaign: 'devocional_spurgeon',
  },
  {
    id: 'manual-pequenos-grupos-ebd',
    title: 'Como Liderar Pequenos Grupos e Estudos Bíblicos na Igreja Local',
    authorOrBrand: 'Edições Vida Nova / Mundo Cristão',
    category: 'escola-dominical-pequenos-grupos',
    categoryLabel: 'Material para Pequenos Grupos e EBD',
    description: 'Guia prático para líderes de células, grupos familiares, ministério de jovens e professores de Escola Bíblica Dominical.',
    whyWeRecommend: 'Oferece ferramentas de acolhimento, condução de perguntas abertas e cuidado pastoral responsável em comunidade.',
    url: 'https://www.amazon.com.br/s?k=Lideranca+de+Pequenos+Grupos+Estudo+Biblico+Igreja',
    partnerStore: 'Amazon Brasil',
    lastVerified: '2026-10-12',
    active: true,
    utmCampaign: 'recursos_igrejas_grupos',
  },
  {
    id: 'acessorios-violao-ministerio-louvor',
    title: 'Kit Capotraste, Afinador Digital de Clip e Encordoamento para Violão',
    authorOrBrand: 'Acessórios para Ministério de Louvor',
    category: 'instrumentos-musica',
    categoryLabel: 'Instrumentos Musicais e Acessórios',
    description: 'Conjunto prático de manutenção e afinação para músicos que servem no ministério de louvor da igreja local, células e cultos domésticos.',
    whyWeRecommend: 'Auxilia no preparo técnico e zelo musical nos ensaios e reuniões da igreja.',
    url: 'https://www.amazon.com.br/s?k=Afinador+Digital+Capotraste+Violao+Louvor',
    partnerStore: 'Amazon Brasil',
    lastVerified: '2026-10-12',
    active: true,
    utmCampaign: 'musica_adoracao_instrumentos',
  },
];

export function getAffiliates(): AffiliateItem[] {
  try {
    const raw = localStorage.getItem(AFFILIATES_STORAGE_KEY);
    if (!raw) return DEFAULT_AFFILIATE_ITEMS;
    const parsed: AffiliateItem[] = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_AFFILIATE_ITEMS;
  } catch {
    return DEFAULT_AFFILIATE_ITEMS;
  }
}

export function saveAffiliates(items: AffiliateItem[]): void {
  localStorage.setItem(AFFILIATES_STORAGE_KEY, JSON.stringify(items));
}

export function getAffiliateById(id: string): AffiliateItem | undefined {
  return getAffiliates().find(item => item.id === id && item.active);
}

export function getAffiliatesByCategory(category: AffiliateCategory): AffiliateItem[] {
  return getAffiliates().filter(item => item.category === category && item.active);
}

export function buildAffiliateUrlWithUtm(item: AffiliateItem, sourcePage: string): string {
  try {
    const url = new URL(item.url);
    url.searchParams.set('utm_source', 'gloriaemlouvores');
    url.searchParams.set('utm_medium', 'affiliate_box');
    url.searchParams.set('utm_campaign', item.utmCampaign || item.id);
    url.searchParams.set('utm_content', sourcePage.replace(/\//g, '_') || 'home');
    return url.toString();
  } catch {
    const sep = item.url.includes('?') ? '&' : '?';
    return `${item.url}${sep}utm_source=gloriaemlouvores&utm_medium=affiliate_box&utm_campaign=${encodeURIComponent(item.utmCampaign || item.id)}`;
  }
}
