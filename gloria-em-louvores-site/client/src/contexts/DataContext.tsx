import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  title: string;
  description: string;
  content: string;
  image: string;
  date: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
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
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

const API_BASE = '/api';

async function fetchAPI<T>(resource: string, options?: RequestInit): Promise<T> {
  const url = resource.startsWith('/') ? `${API_BASE}${resource}` : `${API_BASE}?resource=${resource}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return transformKeys(data) as T;
}

async function apiCall<T>(path: string, method: string, body?: any): Promise<T> {
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

function transformKeys(obj: any): any {
  if (Array.isArray(obj)) return obj.map(transformKeys);
  if (obj && typeof obj === 'object') {
    const transformed: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      transformed[camelKey] = transformKeys(value);
    }
    return transformed;
  }
  return obj;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [psalms, setPsalms] = useState<Psalm[]>([]);
  const [shorts, setShorts] = useState<Short[]>([]);
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [v, b, p, s, r] = await Promise.all([
        fetchAPI<Video[]>('videos'),
        fetchAPI<BlogPost[]>('blog'),
        fetchAPI<Psalm[]>('psalms'),
        fetchAPI<Short[]>('shorts'),
        fetchAPI<PrayerRequest[]>('requests'),
      ]);
      setVideos(v);
      setBlogPosts(b);
      setPsalms(p);
      setShorts(s);
      setPrayerRequests(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshData(); }, []);

  // Videos
  const addVideo = async (video: Omit<Video, 'id'>) => {
    const newVideo = await fetchAPI<Video>('videos', { method: 'POST', body: JSON.stringify(video) });
    setVideos(prev => [newVideo, ...prev]);
  };
  const updateVideo = async (id: string, video: Partial<Video>) => {
    await fetchAPI<Video>('videos', { method: 'POST', body: JSON.stringify({ ...video, id }) });
    setVideos(prev => prev.map(v => v.id === id ? { ...v, ...video } : v));
  };
  const deleteVideo = async (id: string) => {
    await apiCall(`/videos/${id}`, 'DELETE');
    setVideos(prev => prev.filter(v => v.id !== id));
  };
  const toggleFeatured = async (id: string) => {
    const video = videos.find(v => v.id === id);
    if (video) await updateVideo(id, { featured: !video.featured });
  };

  // Blog Posts
  const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
    const newPost = await fetchAPI<BlogPost>('blog', { method: 'POST', body: JSON.stringify(post) });
    setBlogPosts(prev => [newPost, ...prev]);
  };
  const updateBlogPost = async (id: string, post: Partial<BlogPost>) => {
    await fetchAPI<BlogPost>('blog', { method: 'POST', body: JSON.stringify({ ...post, id }) });
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...post } : p));
  };
  const deleteBlogPost = async (id: string) => {
    await apiCall(`/blog/${id}`, 'DELETE');
    setBlogPosts(prev => prev.filter(p => p.id !== id));
  };

  // Psalms
  const addPsalm = async (psalm: Omit<Psalm, 'id'>) => {
    const newPsalm = await fetchAPI<Psalm>('psalms', { method: 'POST', body: JSON.stringify(psalm) });
    setPsalms(prev => [newPsalm, ...prev]);
  };
  const updatePsalm = async (id: string, psalm: Partial<Psalm>) => {
    await fetchAPI<Psalm>('psalms', { method: 'POST', body: JSON.stringify({ ...psalm, id }) });
    setPsalms(prev => prev.map(p => p.id === id ? { ...p, ...psalm } : p));
  };
  const deletePsalm = async (id: string) => {
    await apiCall(`/psalms/${id}`, 'DELETE');
    setPsalms(prev => prev.filter(p => p.id !== id));
  };

  // Shorts
  const addShort = async (short: Omit<Short, 'id'>) => {
    const newShort = await fetchAPI<Short>('shorts', { method: 'POST', body: JSON.stringify(short) });
    setShorts(prev => [newShort, ...prev]);
  };
  const updateShort = async (id: string, short: Partial<Short>) => {
    await fetchAPI<Short>('shorts', { method: 'POST', body: JSON.stringify({ ...short, id }) });
    setShorts(prev => prev.map(s => s.id === id ? { ...s, ...short } : s));
  };
  const deleteShort = async (id: string) => {
    await apiCall(`/shorts/${id}`, 'DELETE');
    setShorts(prev => prev.filter(s => s.id !== id));
  };

  // Prayer Requests
  const addPrayerRequest = async (request: Omit<PrayerRequest, 'id' | 'date' | 'read'>) => {
    const newRequest = await fetchAPI<PrayerRequest>('requests', { method: 'POST', body: JSON.stringify(request) });
    setPrayerRequests(prev => [newRequest, ...prev]);
  };
  const markAsRead = async (id: string) => {
    await fetchAPI('requests', { method: 'POST', body: JSON.stringify({ read: true, id }) });
    setPrayerRequests(prev => prev.map(r => r.id === id ? { ...r, read: true } : r));
  };
  const deletePrayerRequest = async (id: string) => {
    await apiCall(`/requests/${id}`, 'DELETE');
    setPrayerRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <DataContext.Provider value={{
      videos, blogPosts, psalms, shorts, prayerRequests,
      loading, error,
      addVideo, updateVideo, deleteVideo, toggleFeatured,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addPsalm, updatePsalm, deletePsalm,
      addShort, updateShort, deleteShort,
      addPrayerRequest, markAsRead, deletePrayerRequest,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}