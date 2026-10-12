import { useState, useRef, useCallback } from 'react';
import { useData, Video, BlogPost, Psalm, Short } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Mail,
  Eye,
  Music,
  FileText,
  Star,
  ArrowLeft,
  BookOpen,
  Smartphone,
  Image,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  Link as LinkIcon,
  ExternalLink,
  ShieldCheck,
  Sliders,
  Lock,
} from 'lucide-react';
import { Link } from 'wouter';
import {
  AffiliateItem,
  AffiliateCategory,
  getAffiliates,
  saveAffiliates,
} from '@/lib/affiliates';
import {
  RouteAdConfig,
  getRouteAdConfigs,
  saveRouteAdConfigs,
  getTrackedEvents,
} from '@/lib/analytics';

interface AdminDashboardProps {
  onLogout: () => void;
}

const PERMITTED_AFFILIATE_CATEGORIES: { value: AffiliateCategory; label: string }[] = [
  { value: 'biblia-de-estudo', label: 'Bíblia de Estudo' },
  { value: 'teologia-vida-crista', label: 'Livro de Teologia e Vida Cristã' },
  { value: 'devocional-impresso', label: 'Devocional Impresso' },
  { value: 'planner-agenda', label: 'Planner / Agenda de Leitura Bíblica' },
  { value: 'escola-dominical-pequenos-grupos', label: 'Material para EBD e Pequenos Grupos' },
  { value: 'instrumentos-musica', label: 'Instrumentos Musicais e Acessórios' },
];

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const {
    videos,
    blogPosts,
    prayerRequests,
    psalms,
    shorts,
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
    markAsRead,
    deletePrayerRequest,
  } = useData();

  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingPsalm, setEditingPsalm] = useState<Psalm | null>(null);
  const [editingShort, setEditingShort] = useState<Short | null>(null);
  const [showNewVideo, setShowNewVideo] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewPsalm, setShowNewPsalm] = useState(false);
  const [showNewShort, setShowNewShort] = useState(false);

  const [videoForm, setVideoForm] = useState({
    youtubeId: '',
    title: '',
    views: '',
    category: 'adoracao',
    featured: false,
    date: new Date().toISOString().split('T')[0],
  });
  const [postForm, setPostForm] = useState({
    icon: '🎵',
    tag: 'Devocionais',
    title: '',
    description: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });
  const [psalmForm, setPsalmForm] = useState({ text: '', reference: '' });
  const [shortForm, setShortForm] = useState({ youtubeId: '', title: '' });

  // Affiliates Management State
  const [affiliatesList, setAffiliatesList] = useState<AffiliateItem[]>(() => getAffiliates());
  const [showNewAffiliate, setShowNewAffiliate] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<AffiliateItem | null>(null);
  const [affiliateForm, setAffiliateForm] = useState<Omit<AffiliateItem, 'id'>>({
    title: '',
    authorOrBrand: '',
    category: 'biblia-de-estudo',
    categoryLabel: 'Bíblia de Estudo',
    description: '',
    whyWeRecommend: '',
    url: '',
    partnerStore: 'Amazon Brasil',
    lastVerified: new Date().toISOString().split('T')[0],
    active: true,
    utmCampaign: '',
  });

  // AdSense & NoIndex Route Governance State
  const [routeConfigs, setRouteConfigs] = useState<RouteAdConfig[]>(() => getRouteAdConfigs());
  const [trackedEvents] = useState(() => getTrackedEvents());

  const extractYouTubeId = (input: string): string => {
    if (!input) return '';
    if (input.length === 11 && !input.includes('/') && !input.includes('.')) return input;
    const watchMatch = input.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];
    const shortMatch = input.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];
    const shortsMatch = input.match(/shorts\/([^?&]+)/);
    if (shortsMatch) return shortsMatch[1];
    const embedMatch = input.match(/embed\/([^?&]+)/);
    if (embedMatch) return embedMatch[1];
    return input;
  };

  const unreadCount = prayerRequests.filter(r => !r.read).length;

  const handleSaveVideo = async () => {
    try {
      const youtubeId = extractYouTubeId(videoForm.youtubeId);
      if (editingVideo) {
        await updateVideo(editingVideo.id, { ...videoForm, youtubeId });
        setEditingVideo(null);
      } else {
        await addVideo({ ...videoForm, youtubeId });
        setShowNewVideo(false);
      }
      setVideoForm({
        youtubeId: '',
        title: '',
        views: '',
        category: 'adoracao',
        featured: false,
        date: new Date().toISOString().split('T')[0],
      });
    } catch (e) {
      alert('Erro ao salvar vídeo: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  const handleSavePost = async () => {
    try {
      const payload = {
        ...postForm,
        date: new Date().toISOString().split('T')[0],
      };
      if (editingPost) {
        await updateBlogPost(editingPost.id, payload);
        setEditingPost(null);
      } else {
        await addBlogPost(payload);
        setShowNewPost(false);
      }
      setPostForm({
        icon: '🎵',
        tag: 'Devocionais',
        title: '',
        description: '',
        content: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
      });
    } catch (e) {
      alert('Erro ao salvar artigo: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  const handleSavePsalm = async () => {
    try {
      if (editingPsalm) {
        await updatePsalm(editingPsalm.id, psalmForm);
        setEditingPsalm(null);
      } else {
        await addPsalm(psalmForm);
        setShowNewPsalm(false);
      }
      setPsalmForm({ text: '', reference: '' });
    } catch (e) {
      alert('Erro ao salvar salmo: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  const handleSaveShort = async () => {
    try {
      const youtubeId = extractYouTubeId(shortForm.youtubeId);
      if (editingShort) {
        await updateShort(editingShort.id, { ...shortForm, youtubeId });
        setEditingShort(null);
      } else {
        await addShort({ ...shortForm, youtubeId });
        setShowNewShort(false);
      }
      setShortForm({ youtubeId: '', title: '' });
    } catch (e) {
      alert('Erro ao salvar short: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  // Affiliates Handlers
  const handleSaveAffiliate = () => {
    if (!affiliateForm.title.trim() || !affiliateForm.url.trim()) {
      alert('Preencha o título e a URL do recurso afiliado.');
      return;
    }
    const catObj = PERMITTED_AFFILIATE_CATEGORIES.find(c => c.value === affiliateForm.category);
    const updatedItem: AffiliateItem = {
      ...affiliateForm,
      id: editingAffiliate ? editingAffiliate.id : `aff-${Date.now()}`,
      categoryLabel: catObj ? catObj.label : affiliateForm.categoryLabel,
    };

    const next = editingAffiliate
      ? affiliatesList.map(a => (a.id === editingAffiliate.id ? updatedItem : a))
      : [updatedItem, ...affiliatesList];

    setAffiliatesList(next);
    saveAffiliates(next);
    setEditingAffiliate(null);
    setShowNewAffiliate(false);
  };

  const handleToggleAffiliateActive = (id: string) => {
    const next = affiliatesList.map(a => (a.id === id ? { ...a, active: !a.active } : a));
    setAffiliatesList(next);
    saveAffiliates(next);
  };

  const handleDeleteAffiliate = (id: string) => {
    const next = affiliatesList.filter(a => a.id !== id);
    setAffiliatesList(next);
    saveAffiliates(next);
  };

  // AdSense & NoIndex Handlers
  const handleToggleRouteAdSense = (path: string) => {
    const next = routeConfigs.map(cfg => {
      if (cfg.path !== path || cfg.lockedNoAdsense) return cfg;
      return { ...cfg, adsenseAllowed: !cfg.adsenseAllowed };
    });
    setRouteConfigs(next);
    saveRouteAdConfigs(next);
  };

  const handleToggleRouteNoIndex = (path: string) => {
    const next = routeConfigs.map(cfg => {
      if (cfg.path !== path) return cfg;
      return { ...cfg, noindex: !cfg.noindex };
    });
    setRouteConfigs(next);
    saveRouteAdConfigs(next);
  };

  const startEditVideo = (video: Video) => {
    setEditingVideo(video);
    setVideoForm({
      youtubeId: video.youtubeId,
      title: video.title,
      views: video.views,
      category: video.category,
      featured: video.featured,
      date: video.date,
    });
  };

  const startEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      icon: post.icon,
      tag: post.tag,
      title: post.title,
      description: post.description || '',
      content: post.content,
      image: post.image || '',
      date: post.date,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      seoKeywords: post.seoKeywords || '',
    });
  };

  const startEditPsalm = (psalm: Psalm) => {
    setEditingPsalm(psalm);
    setPsalmForm({ text: psalm.text, reference: psalm.reference });
  };

  const startEditShort = (short: Short) => {
    setEditingShort(short);
    setShortForm({ youtubeId: short.youtubeId, title: short.title });
  };

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverImageRef = useRef<HTMLInputElement>(null);
  const contentImageRef = useRef<HTMLInputElement>(null);

  const insertAtCursor = useCallback((insertion: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setPostForm(prev => ({ ...prev, content: prev.content + insertion }));
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setPostForm(prev => {
      const newContent =
        prev.content.substring(0, start) + insertion + prev.content.substring(end);
      return { ...prev, content: newContent };
    });
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
    }, 0);
  }, []);

  const handleCoverImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const maxWidth = 800;
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        setPostForm(prev => ({ ...prev, image: canvas.toDataURL('image/jpeg', 0.8) }));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, []);

  const handleContentImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const result = ev.target?.result as string;
        if (!result) return;
        insertAtCursor(`<img src="${result}" alt="Imagem do artigo" class="w-full rounded-lg" />`);
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    },
    [insertAtCursor]
  );

  const insertHTML = (tag: string, promptText?: string) => {
    let insertion = '';
    if (promptText) {
      const value = prompt(promptText);
      if (!value) return;
      if (tag === 'a') {
        const text = prompt('Texto do link:');
        insertion = `<a href="${value}" target="_blank" class="text-[#D4AF37] underline">${text || value}</a>`;
      } else {
        insertion = `<${tag}>${value}</${tag}>`;
      }
    } else {
      insertion = `<${tag}></${tag}>`;
    }
    insertAtCursor(insertion);
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <header className="bg-white border-b border-[#E8E4E0] sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <Music className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-xl font-bold text-[#1a1f3a]">Painel Admin — Glória em Louvores</h1>
            {unreadCount > 0 && (
              <span className="bg-[#FF0000] text-white text-xs px-2 py-1 rounded-full">
                {unreadCount} novo(s)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/blog">
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="w-4 h-4" /> Editor Completo de Artigos
              </Button>
            </Link>
            <Button variant="outline" onClick={onLogout} size="sm">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="blog">
          <TabsList className="mb-8 flex flex-wrap h-auto gap-1">
            <TabsTrigger value="blog" className="gap-2">
              <FileText className="w-4 h-4" /> Artigos & Estudos ({blogPosts.length})
            </TabsTrigger>
            <TabsTrigger value="affiliates" className="gap-2">
              <ExternalLink className="w-4 h-4" /> Afiliados ({affiliatesList.length})
            </TabsTrigger>
            <TabsTrigger value="adsense" className="gap-2">
              <Sliders className="w-4 h-4" /> AdSense & SEO (noindex)
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Music className="w-4 h-4" /> Vídeos ({videos.length})
            </TabsTrigger>
            <TabsTrigger value="psalms" className="gap-2">
              <BookOpen className="w-4 h-4" /> Salmos ({psalms.length})
            </TabsTrigger>
            <TabsTrigger value="shorts" className="gap-2">
              <Smartphone className="w-4 h-4" /> Shorts ({shorts.length})
            </TabsTrigger>
            <TabsTrigger value="requests" className="gap-2">
              <Mail className="w-4 h-4" /> Pedidos {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
          </TabsList>

          {/* AFFILIATES TAB */}
          <TabsContent value="affiliates">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1a1f3a]">
                  Gestão de Links Afiliados Éticos
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Apenas Bíblias de estudo, livros de teologia/vida cristã, devocionais, planners, EBD e instrumentos musicais. Todos os links recebem automaticamente <code className="bg-gray-100 px-1 rounded">rel="sponsored nofollow"</code> e parâmetros UTM.
                </p>
              </div>
              <Button
                onClick={() => {
                  setEditingAffiliate(null);
                  setShowNewAffiliate(true);
                  setAffiliateForm({
                    title: '',
                    authorOrBrand: '',
                    category: 'biblia-de-estudo',
                    categoryLabel: 'Bíblia de Estudo',
                    description: '',
                    whyWeRecommend: '',
                    url: '',
                    partnerStore: 'Amazon Brasil',
                    lastVerified: new Date().toISOString().split('T')[0],
                    active: true,
                    utmCampaign: '',
                  });
                }}
                className="bg-[#1a1f3a] hover:bg-[#2d3561] text-white gap-2 shrink-0"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" /> Novo Recurso Afiliado
              </Button>
            </div>

            {(showNewAffiliate || editingAffiliate) && (
              <Card className="mb-6 border-[#D4AF37]">
                <CardHeader>
                  <CardTitle>
                    {editingAffiliate ? 'Editar Recurso Afiliado' : 'Novo Recurso Afiliado'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Título da Obra / Recurso *</Label>
                      <Input
                        value={affiliateForm.title}
                        onChange={e =>
                          setAffiliateForm({ ...affiliateForm, title: e.target.value })
                        }
                        placeholder="Ex.: Bíblia de Estudo NAA"
                      />
                    </div>
                    <div>
                      <Label>Autor / Editora / Marca *</Label>
                      <Input
                        value={affiliateForm.authorOrBrand}
                        onChange={e =>
                          setAffiliateForm({ ...affiliateForm, authorOrBrand: e.target.value })
                        }
                        placeholder="Ex.: Sociedade Bíblica do Brasil"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label>Categoria Permitida</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm bg-white"
                        value={affiliateForm.category}
                        onChange={e =>
                          setAffiliateForm({
                            ...affiliateForm,
                            category: e.target.value as AffiliateCategory,
                          })
                        }
                      >
                        {PERMITTED_AFFILIATE_CATEGORIES.map(c => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Loja Parceira</Label>
                      <Input
                        value={affiliateForm.partnerStore}
                        onChange={e =>
                          setAffiliateForm({ ...affiliateForm, partnerStore: e.target.value })
                        }
                        placeholder="Ex.: Amazon Brasil"
                      />
                    </div>
                    <div>
                      <Label>Data da Última Verificação</Label>
                      <Input
                        type="date"
                        value={affiliateForm.lastVerified}
                        onChange={e =>
                          setAffiliateForm({ ...affiliateForm, lastVerified: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label>URL do Produto *</Label>
                    <Input
                      value={affiliateForm.url}
                      onChange={e => setAffiliateForm({ ...affiliateForm, url: e.target.value })}
                      placeholder="https://www.amazon.com.br/..."
                    />
                  </div>

                  <div>
                    <Label>Descrição Objetiva (Sem Promessas Apelativas)</Label>
                    <Textarea
                      rows={2}
                      value={affiliateForm.description}
                      onChange={e =>
                        setAffiliateForm({ ...affiliateForm, description: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Por que indicamos este recurso?</Label>
                    <Input
                      value={affiliateForm.whyWeRecommend}
                      onChange={e =>
                        setAffiliateForm({ ...affiliateForm, whyWeRecommend: e.target.value })
                      }
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveAffiliate}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    >
                      <Save className="w-4 h-4" /> Salvar Recurso
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewAffiliate(false);
                        setEditingAffiliate(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-3">
              {affiliatesList.map(item => (
                <Card key={item.id} className={!item.active ? 'opacity-60' : ''}>
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold bg-[#D4AF37]/15 text-[#1a1f3a] px-2.5 py-0.5 rounded-full">
                          {item.categoryLabel}
                        </span>
                        <span className="text-xs text-gray-500">
                          Verificado em {item.lastVerified}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#1a1f3a]">{item.title}</h3>
                      <p className="text-xs text-gray-600">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleAffiliateActive(item.id)}
                      >
                        {item.active ? 'Ativo' : 'Inativo'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingAffiliate(item);
                          setAffiliateForm(item);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAffiliate(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ADSENSE & NOINDEX GOVERNANCE TAB */}
          <TabsContent value="adsense">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#1a1f3a] mb-1">
                Controle de AdSense e Indexação (noindex) por Rota
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Por diretriz ética e pastoral obrigatória, as rotas <strong>/comunidade</strong>, <strong>/contato</strong> e <strong>/admin</strong> possuem bloqueio permanente de AdSense. Nas demais páginas, você pode ativar/desativar anúncios e a meta tag <code className="bg-gray-100 px-1 rounded">noindex</code>.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {routeConfigs.map(cfg => (
                <Card key={cfg.path} className="bg-white border border-[#E8E4E0]">
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-bold bg-gray-100 px-2 py-0.5 rounded text-[#1a1f3a]">
                          {cfg.path}
                        </code>
                        <span className="font-semibold text-sm text-[#1a1f3a]">{cfg.label}</span>
                      </div>
                      {cfg.reason && (
                        <p className="text-xs text-amber-800 mt-1 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> {cfg.reason}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {cfg.lockedNoAdsense ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold bg-red-100 text-red-800 px-3 py-1.5 rounded-lg">
                          <Lock className="w-3.5 h-3.5" /> AdSense Proibido
                        </span>
                      ) : (
                        <Button
                          variant={cfg.adsenseAllowed ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleToggleRouteAdSense(cfg.path)}
                          className={
                            cfg.adsenseAllowed
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white text-xs'
                              : 'text-xs'
                          }
                        >
                          AdSense: {cfg.adsenseAllowed ? 'Permitido' : 'Desativado'}
                        </Button>
                      )}

                      <Button
                        variant={cfg.noindex ? 'destructive' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleRouteNoIndex(cfg.path)}
                        className="text-xs"
                      >
                        SEO: {cfg.noindex ? 'noindex (Oculto)' : 'index, follow'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Conversion Events Log */}
            <Card className="bg-white border border-[#E8E4E0]">
              <CardHeader>
                <CardTitle className="text-lg text-[#1a1f3a]">
                  Eventos de Conversão Recentes ({trackedEvents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {trackedEvents.length === 0 ? (
                  <p className="text-xs text-gray-500">
                    Os eventos (subscribe_newsletter, download_devotional, reading_plan_check, prayer_notebook_save, click_affiliate) aparecerão aqui conforme o uso.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto text-xs">
                    {trackedEvents.slice(0, 20).map((ev, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-[#F9F7F4] flex items-center justify-between"
                      >
                        <div>
                          <strong className="text-[#1a1f3a]">{ev.event}</strong> — {ev.label} (
                          {ev.category})
                        </div>
                        <span className="text-gray-400">{ev.timestamp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* VIDEOS TAB */}
          <TabsContent value="videos">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a1f3a]">Vídeos</h2>
              <Button
                onClick={() => {
                  setShowNewVideo(true);
                  setEditingVideo(null);
                  setVideoForm({
                    youtubeId: '',
                    title: '',
                    views: '',
                    category: 'adoracao',
                    featured: false,
                    date: new Date().toISOString().split('T')[0],
                  });
                }}
                className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2"
              >
                <Plus className="w-4 h-4" /> Novo Vídeo
              </Button>
            </div>

            {(showNewVideo || editingVideo) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{editingVideo ? 'Editar Vídeo' : 'Novo Vídeo'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>ID do YouTube</Label>
                    <Input
                      placeholder="Ex: MF8p-aj16Zg ou URL completa"
                      value={videoForm.youtubeId}
                      onChange={e => setVideoForm({ ...videoForm, youtubeId: e.target.value })}
                      onBlur={e =>
                        setVideoForm({
                          ...videoForm,
                          youtubeId: extractYouTubeId(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label>Título</Label>
                    <Input
                      placeholder="Título do vídeo"
                      value={videoForm.title}
                      onChange={e => setVideoForm({ ...videoForm, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Views</Label>
                      <Input
                        placeholder="Ex: 5.6K views"
                        value={videoForm.views}
                        onChange={e => setVideoForm({ ...videoForm, views: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <select
                        className="w-full border rounded-md px-3 py-2"
                        value={videoForm.category}
                        onChange={e => setVideoForm({ ...videoForm, category: e.target.value })}
                      >
                        <option value="adoracao">Adoração</option>
                        <option value="oracao">Oração</option>
                        <option value="paz">Paz</option>
                        <option value="fe">Fé</option>
                        <option value="protecao">Proteção</option>
                        <option value="dormir">Dormir</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Data de Publicação</Label>
                      <Input
                        type="date"
                        value={videoForm.date}
                        onChange={e => setVideoForm({ ...videoForm, date: e.target.value })}
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={videoForm.featured}
                          onChange={e =>
                            setVideoForm({ ...videoForm, featured: e.target.checked })
                          }
                          className="w-4 h-4 rounded"
                        />
                        <Star className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-medium">Destaque</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveVideo}
                      className="bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <Save className="w-4 h-4" /> Salvar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewVideo(false);
                        setEditingVideo(null);
                      }}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" /> Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {videos.map(video => (
                <Card
                  key={video.id}
                  className={video.featured ? 'border-[#D4AF37] bg-[#D4AF37]/5' : ''}
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt=""
                      className="w-32 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {video.featured && (
                          <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                        )}
                        <h3 className="font-semibold text-[#1a1f3a] truncate">{video.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        {video.views} • {video.category} • {video.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFeatured(video.id)}
                        className={video.featured ? 'text-[#D4AF37] border-[#D4AF37]' : ''}
                      >
                        <Star className={`w-4 h-4 ${video.featured ? 'fill-[#D4AF37]' : ''}`} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => startEditVideo(video)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteVideo(video.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* BLOG TAB */}
          <TabsContent value="blog">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a1f3a]">Artigos, Devocionais e Estudos</h2>
              <Button
                onClick={() => {
                  setShowNewPost(true);
                  setEditingPost(null);
                  setPostForm({
                    icon: '🎵',
                    tag: 'Devocionais',
                    title: '',
                    description: '',
                    content: '',
                    image: '',
                    date: new Date().toISOString().split('T')[0],
                    seoTitle: '',
                    seoDescription: '',
                    seoKeywords: '',
                  });
                }}
                className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2"
              >
                <Plus className="w-4 h-4" /> Novo Artigo
              </Button>
            </div>

            {(showNewPost || editingPost) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{editingPost ? 'Editar Artigo' : 'Novo Artigo'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Ícone</Label>
                      <select
                        value={postForm.icon}
                        onChange={e => setPostForm({ ...postForm, icon: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="📖">📖 Bíblia</option>
                        <option value="🙏">🙏 Oração</option>
                        <option value="🌅">🌅 Devocional</option>
                        <option value="🏡">🏡 Família</option>
                        <option value="🔥">🔥 Jovens</option>
                        <option value="⛪">⛪ Igreja</option>
                        <option value="🎵">🎵 Música</option>
                        <option value="🕊️">🕊️ Consolo</option>
                        <option value="🌿">🌿 Paz</option>
                      </select>
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <select
                        value={postForm.tag}
                        onChange={e => setPostForm({ ...postForm, tag: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="Devocionais">Devocionais</option>
                        <option value="Orações">Orações</option>
                        <option value="Estudos Bíblicos">Estudos Bíblicos</option>
                        <option value="Versículos">Versículos</option>
                        <option value="Família">Família</option>
                        <option value="Jovens">Jovens</option>
                        <option value="Música e Adoração">Música e Adoração</option>
                        <option value="Recursos para Igrejas">Recursos para Igrejas</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label>Título</Label>
                    <Input
                      placeholder="Título do artigo"
                      value={postForm.title}
                      onChange={e => setPostForm({ ...postForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Resumo</Label>
                    <Input
                      placeholder="Breve descrição"
                      value={postForm.description}
                      onChange={e => setPostForm({ ...postForm, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Imagem de Capa</Label>
                    <div className="space-y-2">
                      <Input
                        placeholder="Cole a URL da imagem aqui"
                        value={postForm.image}
                        onChange={e => setPostForm({ ...postForm, image: e.target.value })}
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">ou</span>
                        <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-sm">
                          <Image className="w-4 h-4" />
                          <span>Enviar do dispositivo</span>
                          <input
                            ref={coverImageRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleCoverImage}
                          />
                        </label>
                      </div>
                    </div>
                    {postForm.image && (
                      <img
                        src={postForm.image}
                        alt="Preview"
                        className="mt-2 h-32 object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <Label>Conteúdo (aceita HTML)</Label>
                    <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-50 rounded-lg border">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertHTML('h2')}
                        className="h-8 px-2 text-xs gap-1"
                      >
                        <Heading2 className="w-3 h-3" /> H2
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertHTML('h3')}
                        className="h-8 px-2 text-xs gap-1"
                      >
                        <Heading3 className="w-3 h-3" /> H3
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertHTML('strong', 'Texto em negrito:')}
                        className="h-8 px-2 text-xs gap-1"
                      >
                        <Bold className="w-3 h-3" /> Negrito
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertHTML('em', 'Texto em itálico:')}
                        className="h-8 px-2 text-xs gap-1"
                      >
                        <Italic className="w-3 h-3" /> Itálico
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertHTML('blockquote', 'Citação:')}
                        className="h-8 px-2 text-xs gap-1"
                      >
                        <Quote className="w-3 h-3" /> Citação
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => contentImageRef.current?.click()}
                        className="h-8 px-2 text-xs gap-1 text-blue-600"
                      >
                        <Image className="w-3 h-3" /> Imagem
                      </Button>
                      <input
                        ref={contentImageRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleContentImage}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => insertHTML('a', 'URL do link:')}
                        className="h-8 px-2 text-xs gap-1 text-green-600"
                      >
                        <LinkIcon className="w-3 h-3" /> Link
                      </Button>
                    </div>
                    <Textarea
                      ref={textareaRef}
                      rows={10}
                      value={postForm.content}
                      onChange={e => setPostForm({ ...postForm, content: e.target.value })}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSavePost}
                      className="bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <Save className="w-4 h-4" /> Salvar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewPost(false);
                        setEditingPost(null);
                      }}
                      className="gap-2"
                    >
                      <X className="w-4 h-4" /> Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {blogPosts.map(post => (
                <Card key={post.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="text-3xl">{post.icon}</div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs bg-[#D4AF37]/10 text-[#1a1f3a] font-semibold px-2.5 py-0.5 rounded-full">
                        {post.tag}
                      </span>
                      <h3 className="font-semibold text-[#1a1f3a] mt-1">{post.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{post.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditPost(post)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteBlogPost(post.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PSALMS TAB */}
          <TabsContent value="psalms">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a1f3a]">Salmos</h2>
              <Button
                onClick={() => {
                  setShowNewPsalm(true);
                  setEditingPsalm(null);
                  setPsalmForm({ text: '', reference: '' });
                }}
                className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2"
              >
                <Plus className="w-4 h-4" /> Novo Salmo
              </Button>
            </div>

            {(showNewPsalm || editingPsalm) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{editingPsalm ? 'Editar Salmo' : 'Novo Salmo'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Texto do Salmo</Label>
                    <Textarea
                      rows={3}
                      value={psalmForm.text}
                      onChange={e => setPsalmForm({ ...psalmForm, text: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Referência</Label>
                    <Input
                      value={psalmForm.reference}
                      onChange={e => setPsalmForm({ ...psalmForm, reference: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSavePsalm}
                      className="bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <Save className="w-4 h-4" /> Salvar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewPsalm(false);
                        setEditingPsalm(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {psalms.map(psalm => (
                <Card key={psalm.id}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="text-3xl">📖</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#1a1f3a] italic">"{psalm.text}"</p>
                      <p className="text-sm text-[#D4AF37] mt-1">— {psalm.reference}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditPsalm(psalm)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePsalm(psalm.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SHORTS TAB */}
          <TabsContent value="shorts">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a1f3a]">YouTube Shorts</h2>
              <Button
                onClick={() => {
                  setShowNewShort(true);
                  setEditingShort(null);
                  setShortForm({ youtubeId: '', title: '' });
                }}
                className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2"
              >
                <Plus className="w-4 h-4" /> Novo Short
              </Button>
            </div>

            {(showNewShort || editingShort) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{editingShort ? 'Editar Short' : 'Novo Short'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>ID do YouTube</Label>
                    <Input
                      value={shortForm.youtubeId}
                      onChange={e => setShortForm({ ...shortForm, youtubeId: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Título</Label>
                    <Input
                      value={shortForm.title}
                      onChange={e => setShortForm({ ...shortForm, title: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSaveShort}
                      className="bg-green-600 hover:bg-green-700 text-white gap-2"
                    >
                      <Save className="w-4 h-4" /> Salvar
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowNewShort(false);
                        setEditingShort(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {shorts.map(short => (
                <Card key={short.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={`https://img.youtube.com/vi/${short.youtubeId}/mqdefault.jpg`}
                      alt=""
                      className="w-20 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1a1f3a]">{short.title}</h3>
                      <p className="text-sm text-gray-500">ID: {short.youtubeId}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditShort(short)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteShort(short.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* REQUESTS TAB */}
          <TabsContent value="requests">
            <h2 className="text-2xl font-bold text-[#1a1f3a] mb-6">
              Pedidos de Oração e Contato
            </h2>
            {prayerRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center text-gray-500">
                  Nenhum pedido ainda.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {prayerRequests.map(req => (
                  <Card key={req.id} className={req.read ? 'opacity-60' : 'border-[#D4AF37]'}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                req.type === 'oracao'
                                  ? 'bg-blue-100 text-blue-700'
                                  : req.type === 'louvor'
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {req.type === 'oracao'
                                ? 'Pedido de Oração'
                                : req.type === 'louvor'
                                ? 'Sugestão'
                                : 'Contato'}
                            </span>
                            <span className="text-xs text-gray-400">{req.date}</span>
                            {!req.read && <span className="w-2 h-2 bg-[#FF0000] rounded-full" />}
                          </div>
                          <h3 className="font-semibold text-[#1a1f3a]">{req.name}</h3>
                          <p className="text-sm text-gray-500">{req.email}</p>
                          <p className="text-sm text-gray-600 mt-2">{req.message}</p>
                        </div>
                        <div className="flex gap-2">
                          {!req.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(req.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deletePrayerRequest(req.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
