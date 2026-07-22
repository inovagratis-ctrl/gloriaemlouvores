import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  desc: string;
  content: string;
  image: string;
  date: string;
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
  prayerRequests: PrayerRequest[];
  addVideo: (video: Omit<Video, 'id'>) => void;
  updateVideo: (id: string, video: Partial<Video>) => void;
  deleteVideo: (id: string) => void;
  toggleFeatured: (id: string) => void;
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  addPrayerRequest: (request: Omit<PrayerRequest, 'id' | 'date' | 'read'>) => void;
  markAsRead: (id: string) => void;
  deletePrayerRequest: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultVideos: Video[] = [
  { id: '1', youtubeId: 'MF8p-aj16Zg', title: 'O SOM DO MILAGRE | 12 Louvores Para Quem Precisa de um Milagre', views: '5.6K views', category: 'adoracao', featured: true, date: '2026-07-20' },
  { id: '2', youtubeId: 'TvNd8KgQRGc', title: 'TRONO DE DEUS | 70 Louvores Para Afastar Todo Mal', views: 'Louvores poderosos', category: 'protecao', featured: true, date: '2026-07-18' },
  { id: '3', youtubeId: 'vD6vp5AJ4bU', title: 'Louvor Gospel Worship Emocionante 2026', views: 'Worship poderoso', category: 'adoracao', featured: false, date: '2026-07-15' },
];

const defaultBlogPosts: BlogPost[] = [
  { id: '1', icon: '🔥', tag: 'Adoração', title: 'O Poder do Louvor na Hora da Batalha', desc: 'Quando Jó cantou no meio do sofrimento, algo se quebrou nos céus.', content: '', image: '', date: '21 de julho de 2026' },
  { id: '2', icon: '🙏', tag: 'Oração', title: 'Como Orar com Louvor e Mudar Situações', desc: 'A combinação de oração e louvor é devastadora.', content: '', image: '', date: '18 de julho de 2026' },
  { id: '3', icon: '🕊️', tag: 'Paz', title: '7 Louvores Que Trazem Paz Para o Coração', desc: 'A ansiedade não convive com a presença de Deus.', content: '', image: '', date: '15 de julho de 2026' },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('gloria-videos');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((v: any) => ({ ...v, featured: v.featured ?? false, date: v.date ?? '' }));
    }
    return defaultVideos;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('gloria-blog');
    return saved ? JSON.parse(saved) : defaultBlogPosts;
  });

  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('gloria-requests');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('gloria-videos', JSON.stringify(videos)); }, [videos]);
  useEffect(() => { localStorage.setItem('gloria-blog', JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem('gloria-requests', JSON.stringify(prayerRequests)); }, [prayerRequests]);

  const addVideo = (video: Omit<Video, 'id'>) => setVideos(prev => [...prev, { ...video, id: Date.now().toString() }]);
  const updateVideo = (id: string, video: Partial<Video>) => setVideos(prev => prev.map(v => v.id === id ? { ...v, ...video } : v));
  const deleteVideo = (id: string) => setVideos(prev => prev.filter(v => v.id !== id));
  const toggleFeatured = (id: string) => setVideos(prev => prev.map(v => v.id === id ? { ...v, featured: !v.featured } : v));

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => setBlogPosts(prev => [...prev, { ...post, id: Date.now().toString() }]);
  const updateBlogPost = (id: string, post: Partial<BlogPost>) => setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...post } : p));
  const deleteBlogPost = (id: string) => setBlogPosts(prev => prev.filter(p => p.id !== id));

  const addPrayerRequest = (request: Omit<PrayerRequest, 'id' | 'date' | 'read'>) => setPrayerRequests(prev => [...prev, { ...request, id: Date.now().toString(), date: new Date().toLocaleDateString('pt-BR'), read: false }]);
  const markAsRead = (id: string) => setPrayerRequests(prev => prev.map(r => r.id === id ? { ...r, read: true } : r));
  const deletePrayerRequest = (id: string) => setPrayerRequests(prev => prev.filter(r => r.id !== id));

  return (
    <DataContext.Provider value={{ videos, blogPosts, prayerRequests, addVideo, updateVideo, deleteVideo, toggleFeatured, addBlogPost, updateBlogPost, deleteBlogPost, addPrayerRequest, markAsRead, deletePrayerRequest }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}

export { shuffleArray };
