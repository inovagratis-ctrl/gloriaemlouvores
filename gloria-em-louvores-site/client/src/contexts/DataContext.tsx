import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  INITIAL_EDITORIAL_ARTICLES,
  EditorialArticle,
  CategorySlug,
  ArticleTOCItem,
  ArticleFAQ,
} from '@/lib/articlesData';
import { AffiliateCategory } from '@/lib/affiliates';

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  views: string;
  category: string;
  featured: boolean;
  date: string;
}

export interface BlogPost {
  id: string;
  icon: string;
  tag: string;
  categorySlug?: CategorySlug;
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  updatedAt?: string;
  readingTime?: string;
  author?: string;
  authorRole?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  summaryBox?: string[];
  requiresEmotionalCareNotice?: boolean;
  affiliateCategory?: AffiliateCategory;
  affiliateId?: string;
  toc?: ArticleTOCItem[];
  practicalApplication?: string[];
  theologicalSources?: string[];
  faqs?: ArticleFAQ[];
}

export interface Psalm {
  id: string;
  text: string;
  reference: string;
}

export interface Short {
  id: string;
  youtubeId: string;
  title: string;
}

export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  type: 'oracao' | 'louvor' | 'contato';
  date: string;
  read: boolean;
  approvedForWall?: boolean;
  prayingCount?: number;
}

interface DataContextType {
  videos: Video[];
  blogPosts: BlogPost[];
  psalms: Psalm[];
  shorts: Short[];
  prayerRequests: PrayerRequest[];
  loading: boolean;
  error: string | null;
  addVideo: (video: Omit<Video, 'id'>) => Promise<void>;
  updateVideo: (id: string, video: Partial<Video>) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>;
  deleteBlogPost: (id: string) => Promise<void>;
  addPsalm: (psalm: Omit<Psalm, 'id'>) => Promise<void>;
  updatePsalm: (id: string, psalm: Partial<Psalm>) => Promise<void>;
  deletePsalm: (id: string) => Promise<void>;
  addShort: (short: Omit<Short, 'id'>) => Promise<void>;
  updateShort: (id: string, short: Partial<Short>) => Promise<void>;
  deleteShort: (id: string) => Promise<void>;
  addPrayerRequest: (request: Omit<PrayerRequest, 'id' | 'date' | 'read'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deletePrayerRequest: (id: string) => Promise<void>;
  incrementPrayerCount: (id: string) => void;
  refreshData: () => Promise<void>;
}

const DEFAULT_VIDEOS: Video[] = [
  {
    id: 'vid-1',
    youtubeId: 'MF8p-aj16Zg',
    title: 'Momento de Adoração e Oração — Louvores Congregacionais para Comunhão com Deus',
    views: 'Canal Oficial',
    category: 'adoracao',
    featured: true,
    date: '2026-07-20',
  },
  {
    id: 'vid-2',
    youtubeId: 'TvNd8KgQRGc',
    title: 'Louvores de Adoração Profunda — Seleção para Culto Doméstico e Meditação',
    views: 'Canal Oficial',
    category: 'oracao',
    featured: true,
    date: '2026-07-18',
  },
  {
    id: 'vid-3',
    youtubeId: 'vD6vp5AJ4bU',
    title: 'Paz e Descanso em Cristo — Louvores Instrumentais e Cantados para Momentos de Oração',
    views: 'Canal Oficial',
    category: 'paz',
    featured: true,
    date: '2026-07-15',
  },
];

const DEFAULT_PSALMS: Psalm[] = [
  {
    id: 'ps-1',
    text: 'Louvarei ao Senhor em todo o tempo; o seu louvor estará continuamente na minha boca.',
    reference: 'Salmo 34:1 (Almeida)',
  },
  {
    id: 'ps-2',
    text: 'O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.',
    reference: 'Salmo 23:1-2 (Almeida)',
  },
  {
    id: 'ps-3',
    text: 'Lâmpada para os meus pés é a tua palavra e, luz para os meus caminhos.',
    reference: 'Salmo 119:105 (Almeida)',
  },
  {
    id: 'ps-4',
    text: 'Perto está o Senhor dos que têm o coração quebrantado e salva os contritos de espírito.',
    reference: 'Salmo 34:18 (Almeida)',
  },
];

const DEFAULT_SHORTS: Short[] = [
  {
    id: 'sh-1',
    youtubeId: '5MnuJP2ER1g',
    title: 'Reflexão e Oração Diária — Confie no Cuidado do Senhor',
  },
];

const DEFAULT_COMMUNITY_PRAYERS: PrayerRequest[] = [
  {
    id: 'pr-seed-1',
    name: 'Irmã Helena M. (São Paulo, SP)',
    email: 'helena@exemplo.com',
    message: 'Peço oração pela saúde e fortalecimento da minha mãe durante o tratamento médico, e para que toda a nossa família permaneça firme na paz de Cristo.',
    type: 'oracao',
    date: '2026-10-10',
    read: true,
    approvedForWall: true,
    prayingCount: 28,
  },
  {
    id: 'pr-seed-2',
    name: 'Carlos Eduardo (Belo Horizonte, MG)',
    email: 'carlos@exemplo.com',
    message: 'Agradeço a Deus pela reconciliação no meu lar e peço sabedoria para iniciarmos o culto doméstico semanal com nossos dois filhos.',
    type: 'oracao',
    date: '2026-10-11',
    read: true,
    approvedForWall: true,
    prayingCount: 19,
  },
  {
    id: 'pr-seed-3',
    name: 'Liderança de Jovens (Curitiba, PR)',
    email: 'jovens@exemplo.com',
    message: 'Pedimos intercessão pelos jovens da nossa igreja local que prestarão exames e vestibulares neste semestre, para que tenham serenidade e direção de Deus.',
    type: 'oracao',
    date: '2026-10-12',
    read: true,
    approvedForWall: true,
    prayingCount: 34,
  },
];

const LOCAL_PRAYER_REQUESTS_KEY = 'gloria_community_prayer_requests_v1';
const LOCAL_CUSTOM_POSTS_KEY = 'gloria_custom_blog_posts_v1';

const DataContext = createContext<DataContextType | null>(null);

const API_BASE = '/api';

async function fetchAPI<T>(resource: string, options?: RequestInit, resourceId?: string): Promise<T> {
  let url: string;
  if (resource.startsWith('/')) {
    url = `${API_BASE}${resource}`;
  } else if (resourceId) {
    url = `${API_BASE}/${resource}/${resourceId}`;
  } else {
    url = `${API_BASE}/${resource}`;
  }
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return transformKeys(data) as T;
}

async function apiCall<T>(path: string, method: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (method === 'DELETE') return undefined as T;
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return transformKeys(data) as T;
}

function transformKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(transformKeys);
  if (obj && typeof obj === 'object') {
    const transformed: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
      transformed[camelKey] = transformKeys(value);
    }
    return transformed;
  }
  return obj;
}

function mergeEditorialArticles(remotePosts: BlogPost[]): BlogPost[] {
  let customLocal: BlogPost[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_POSTS_KEY);
    if (raw) customLocal = JSON.parse(raw);
  } catch {
    // ignore
  }

  const combinedMap = new Map<string, BlogPost>();
  for (const editorial of INITIAL_EDITORIAL_ARTICLES as EditorialArticle[]) {
    combinedMap.set(editorial.id, editorial);
  }
  for (const localPost of customLocal) {
    combinedMap.set(localPost.id, localPost);
  }
  for (const remote of remotePosts) {
    if (!combinedMap.has(remote.id)) {
      combinedMap.set(remote.id, remote);
    }
  }
  return Array.from(combinedMap.values());
}

function getInitialPrayerRequests(): PrayerRequest[] {
  try {
    const raw = localStorage.getItem(LOCAL_PRAYER_REQUESTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_COMMUNITY_PRAYERS;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useState<Video[]>(DEFAULT_VIDEOS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => mergeEditorialArticles([]));
  const [psalms, setPsalms] = useState<Psalm[]>(DEFAULT_PSALMS);
  const [shorts, setShorts] = useState<Short[]>(DEFAULT_SHORTS);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(getInitialPrayerRequests);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [v, b, p, s, r] = await Promise.all([
        fetchAPI<Video[]>('videos').catch(() => DEFAULT_VIDEOS),
        fetchAPI<BlogPost[]>('blog').catch(() => []),
        fetchAPI<Psalm[]>('psalms').catch(() => DEFAULT_PSALMS),
        fetchAPI<Short[]>('shorts').catch(() => DEFAULT_SHORTS),
        fetchAPI<PrayerRequest[]>('requests').catch(() => []),
      ]);
      setVideos(Array.isArray(v) && v.length > 0 ? v : DEFAULT_VIDEOS);
      setBlogPosts(mergeEditorialArticles(Array.isArray(b) ? b : []));
      setPsalms(Array.isArray(p) && p.length > 0 ? p : DEFAULT_PSALMS);
      setShorts(Array.isArray(s) && s.length > 0 ? s : DEFAULT_SHORTS);
      if (Array.isArray(r) && r.length > 0) {
        setPrayerRequests([...r, ...getInitialPrayerRequests()]);
      }
    } catch {
      // Fallback already populated with rich editorial data
      setBlogPosts(mergeEditorialArticles([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Videos
  const addVideo = async (video: Omit<Video, 'id'>) => {
    try {
      const newVideo = await fetchAPI<Video>('videos', { method: 'POST', body: JSON.stringify(video) });
      setVideos(prev => [newVideo, ...prev]);
    } catch {
      const fallback: Video = { ...video, id: `vid-${Date.now()}` };
      setVideos(prev => [fallback, ...prev]);
    }
  };
  const updateVideo = async (id: string, video: Partial<Video>) => {
    try {
      await fetchAPI<Video>('videos', { method: 'POST', body: JSON.stringify(video) }, id);
    } catch {
      // local update fallback
    }
    setVideos(prev => prev.map(v => (v.id === id ? { ...v, ...video } : v)));
  };
  const deleteVideo = async (id: string) => {
    try {
      await apiCall(`/videos/${id}`, 'DELETE');
    } catch {
      // local delete fallback
    }
    setVideos(prev => prev.filter(v => v.id !== id));
  };
  const toggleFeatured = async (id: string) => {
    const video = videos.find(v => v.id === id);
    if (video) await updateVideo(id, { featured: !video.featured });
  };

  // Blog Posts
  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    try {
      const newPost = await fetchAPI<BlogPost>('blog', { method: 'POST', body: JSON.stringify(post) });
      setBlogPosts(prev => [newPost, ...prev]);
    } catch {
      const fallback: BlogPost = { ...post, id: `artigo-${Date.now()}` };
      setBlogPosts(prev => {
        const updated = [fallback, ...prev];
        try {
          localStorage.setItem(LOCAL_CUSTOM_POSTS_KEY, JSON.stringify([fallback]));
        } catch {
          // ignore
        }
        return updated;
      });
    }
  };
  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    try {
      await fetchAPI<BlogPost>('blog', { method: 'POST', body: JSON.stringify(post) }, id);
    } catch {
      // fallback
    }
    setBlogPosts(prev => prev.map(p => (p.id === id ? { ...p, ...post } : p)));
  };
  const deleteBlogPost = async (id: string) => {
    try {
      await apiCall(`/blog/${id}`, 'DELETE');
    } catch {
      // fallback
    }
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  // Psalms
  const addPsalm = async (psalm: Omit<Psalm, 'id'>) => {
    try {
      const newPsalm = await fetchAPI<Psalm>('psalms', { method: 'POST', body: JSON.stringify(psalm) });
      setPsalms(prev => [newPsalm, ...prev]);
    } catch {
      setPsalms(prev => [{ ...psalm, id: `ps-${Date.now()}` }, ...prev]);
    }
  };
  const updatePsalm = async (id: string, psalm: Partial<Psalm>) => {
    try {
      await fetchAPI<Psalm>('psalms', { method: 'POST', body: JSON.stringify(psalm) }, id);
    } catch {
      // fallback
    }
    setPsalms(prev => prev.map(p => (p.id === id ? { ...p, ...psalm } : p)));
  };
  const deletePsalm = async (id: string) => {
    try {
      await apiCall(`/psalms/${id}`, 'DELETE');
    } catch {
      // fallback
    }
    setPsalms(prev => prev.filter(p => p.id !== id));
  };

  // Shorts
  const addShort = async (short: Omit<Short, 'id'>) => {
    try {
      const newShort = await fetchAPI<Short>('shorts', { method: 'POST', body: JSON.stringify(short) });
      setShorts(prev => [newShort, ...prev]);
    } catch {
      setShorts(prev => [{ ...short, id: `sh-${Date.now()}` }, ...prev]);
    }
  };
  const updateShort = async (id: string, short: Partial<Short>) => {
    try {
      await fetchAPI<Short>('shorts', { method: 'POST', body: JSON.stringify(short) }, id);
    } catch {
      // fallback
    }
    setShorts(prev => prev.map(s => (s.id === id ? { ...s, ...short } : s)));
  };
  const deleteShort = async (id: string) => {
    try {
      await apiCall(`/shorts/${id}`, 'DELETE');
    } catch {
      // fallback
    }
    setShorts(prev => prev.filter(s => s.id !== id));
  };

  // Prayer Requests
  const addPrayerRequest = async (request: Omit<PrayerRequest, 'id' | 'date' | 'read'>) => {
    const fallbackItem: PrayerRequest = {
      ...request,
      id: `pr-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      read: false,
      approvedForWall: true,
      prayingCount: 1,
    };

    setPrayerRequests(prev => {
      const next = [fallbackItem, ...prev];
      try {
        localStorage.setItem(LOCAL_PRAYER_REQUESTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    try {
      await fetchAPI<PrayerRequest>('requests', { method: 'POST', body: JSON.stringify(request) });
    } catch {
      // local storage already updated
    }
  };

  const markAsRead = async (id: string) => {
    setPrayerRequests(prev => {
      const next = prev.map(r => (r.id === id ? { ...r, read: true } : r));
      try {
        localStorage.setItem(LOCAL_PRAYER_REQUESTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    try {
      await fetchAPI('requests', { method: 'POST', body: JSON.stringify({ read: true }) }, id);
    } catch {
      // ignore
    }
  };

  const deletePrayerRequest = async (id: string) => {
    setPrayerRequests(prev => {
      const next = prev.filter(r => r.id !== id);
      try {
        localStorage.setItem(LOCAL_PRAYER_REQUESTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    try {
      await apiCall(`/requests/${id}`, 'DELETE');
    } catch {
      // ignore
    }
  };

  const incrementPrayerCount = (id: string) => {
    setPrayerRequests(prev => {
      const next = prev.map(r =>
        r.id === id ? { ...r, prayingCount: (r.prayingCount || 1) + 1 } : r
      );
      try {
        localStorage.setItem(LOCAL_PRAYER_REQUESTS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <DataContext.Provider
      value={{
        videos,
        blogPosts,
        psalms,
        shorts,
        prayerRequests,
        loading,
        error,
        addVideo,
        updateVideo,
        deleteVideo,
        toggleFeatured,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addPsalm,
        updatePsalm,
        deletePsalm,
        addShort,
        updateShort,
        deleteShort,
        addPrayerRequest,
        markAsRead,
        deletePrayerRequest,
        incrementPrayerCount,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}