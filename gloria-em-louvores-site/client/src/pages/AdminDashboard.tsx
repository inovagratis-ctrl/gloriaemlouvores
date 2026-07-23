import { useState, useRef, useCallback } from 'react';
import { useData, Video, BlogPost, Psalm, Short } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit, Save, X, Mail, Eye, Music, FileText, Star, ArrowLeft, BookOpen, Smartphone, Image, Bold, Italic, Heading2, Heading3, Quote, Link } from 'lucide-react';
import { Link } from 'wouter';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { videos, blogPosts, prayerRequests, psalms, shorts, addVideo, updateVideo, deleteVideo, toggleFeatured, addBlogPost, updateBlogPost, deleteBlogPost, addPsalm, updatePsalm, deletePsalm, addShort, updateShort, deleteShort, markAsRead, deletePrayerRequest } = useData();

  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingPsalm, setEditingPsalm] = useState<Psalm | null>(null);
  const [editingShort, setEditingShort] = useState<Short | null>(null);
  const [showNewVideo, setShowNewVideo] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewPsalm, setShowNewPsalm] = useState(false);
  const [showNewShort, setShowNewShort] = useState(false);

  const [videoForm, setVideoForm] = useState({ youtubeId: '', title: '', views: '', category: 'adoracao', featured: false, date: new Date().toISOString().split('T')[0] });
  const [postForm, setPostForm] = useState({ icon: '🎵', tag: 'Louvor', title: '', description: '', content: '', image: '', date: new Date().toISOString().split('T')[0], seoTitle: '', seoDescription: '', seoKeywords: '' });
  const [psalmForm, setPsalmForm] = useState({ text: '', reference: '' });
  const [shortForm, setShortForm] = useState({ youtubeId: '', title: '' });

  // Extract YouTube ID from various URL formats
  const extractYouTubeId = (input: string): string => {
    if (!input) return '';
    // Already just an ID (11 chars)
    if (input.length === 11 && !input.includes('/') && !input.includes('.')) return input;
    // youtube.com/watch?v=ID
    const watchMatch = input.match(/[?&]v=([^&]+)/);
    if (watchMatch) return watchMatch[1];
    // youtu.be/ID
    const shortMatch = input.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch) return shortMatch[1];
    // youtube.com/shorts/ID
    const shortsMatch = input.match(/shorts\/([^?&]+)/);
    if (shortsMatch) return shortsMatch[1];
    // youtube.com/embed/ID
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
      setVideoForm({ youtubeId: '', title: '', views: '', category: 'adoracao', featured: false, date: new Date().toISOString().split('T')[0] });
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
      setPostForm({ icon: '🎵', tag: 'Louvor', title: '', description: '', content: '', image: '', date: new Date().toISOString().split('T')[0], seoTitle: '', seoDescription: '', seoKeywords: '' });
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

  const startEditVideo = (video: Video) => {
    setEditingVideo(video);
    setVideoForm({ youtubeId: video.youtubeId, title: video.title, views: video.views, category: video.category, featured: video.featured, date: video.date });
  };

  const startEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({ icon: post.icon, tag: post.tag, title: post.title, description: post.description || '', content: post.content, image: post.image || '', date: post.date, seoTitle: post.seoTitle || '', seoDescription: post.seoDescription || '', seoKeywords: post.seoKeywords || '' });
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

  const insertAtCursor = (insertion: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setPostForm(prev => ({ ...prev, content: prev.content + insertion }));
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setPostForm(prev => {
      const newContent = prev.content.substring(0, start) + insertion + prev.content.substring(end);
      return { ...prev, content: newContent };
    });
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
    }, 0);
  };

  const handleCoverImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
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

  const handleContentImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      if (!result) return;
      insertAtCursor(`<img src="${result}" alt="Imagem do artigo" className="w-full rounded-lg" />`);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  }, [insertAtCursor]);

  const insertHTML = (tag: string, promptText?: string) => {
    let insertion = '';
    if (promptText) {
      const value = prompt(promptText);
      if (!value) return;
      if (tag === 'a') {
        const text = prompt('Texto do link:');
        insertion = `<a href="${value}" target="_blank" className="text-[#D4AF37] underline">${text || value}</a>`;
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
            <Link href="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4" /></Button></Link>
            <Music className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-xl font-bold text-[#1a1f3a]">Painel Admin</h1>
            {unreadCount > 0 && <span className="bg-[#FF0000] text-white text-xs px-2 py-1 rounded-full">{unreadCount} novo(s)</span>}
          </div>
          <Button variant="outline" onClick={onLogout} size="sm">Sair</Button>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="videos">
          <TabsList className="mb-8">
            <TabsTrigger value="videos" className="gap-2"><Music className="w-4 h-4" /> Vídeos ({videos.length})</TabsTrigger>
            <TabsTrigger value="blog" className="gap-2"><FileText className="w-4 h-4" /> Blog ({blogPosts.length})</TabsTrigger>
            <TabsTrigger value="psalms" className="gap-2"><BookOpen className="w-4 h-4" /> Salmos ({psalms.length})</TabsTrigger>
            <TabsTrigger value="shorts" className="gap-2"><Smartphone className="w-4 h-4" /> Shorts ({shorts.length})</TabsTrigger>
            <TabsTrigger value="requests" className="gap-2"><Mail className="w-4 h-4" /> Pedidos {unreadCount > 0 && `(${unreadCount})`}</TabsTrigger>
          </TabsList>

          {/* VIDEOS TAB */}
          <TabsContent value="videos">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a1f3a]">Vídeos</h2>
              <Button onClick={() => { setShowNewVideo(true); setEditingVideo(null); setVideoForm({ youtubeId: '', title: '', views: '', category: 'adoracao', featured: false, date: new Date().toISOString().split('T')[0] }); }} className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2">
                <Plus className="w-4 h-4" /> Novo Vídeo
              </Button>
            </div>

            {(showNewVideo || editingVideo) && (
              <Card className="mb-6">
                <CardHeader><CardTitle>{editingVideo ? 'Editar Vídeo' : 'Novo Vídeo'}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>ID do YouTube</Label>
                    <Input placeholder="Ex: MF8p-aj16Zg ou URL completa" value={videoForm.youtubeId} onChange={e => setVideoForm({ ...videoForm, youtubeId: e.target.value })} onBlur={e => setVideoForm({ ...videoForm, youtubeId: extractYouTubeId(e.target.value) })} />
                  </div>
                  <div>
                    <Label>Título</Label>
                    <Input placeholder="Título do vídeo" value={videoForm.title} onChange={e => setVideoForm({ ...videoForm, title: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Views</Label>
                      <Input placeholder="Ex: 5.6K views" value={videoForm.views} onChange={e => setVideoForm({ ...videoForm, views: e.target.value })} />
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <select className="w-full border rounded-md px-3 py-2" value={videoForm.category} onChange={e => setVideoForm({ ...videoForm, category: e.target.value })}>
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
                      <Input type="date" value={videoForm.date} onChange={e => setVideoForm({ ...videoForm, date: e.target.value })} />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={videoForm.featured} onChange={e => setVideoForm({ ...videoForm, featured: e.target.checked })} className="w-4 h-4 rounded" />
                        <Star className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-medium">Destaque</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveVideo} className="bg-green-600 hover:bg-green-700 text-white gap-2"><Save className="w-4 h-4" /> Salvar</Button>
                    <Button variant="outline" onClick={() => { setShowNewVideo(false); setEditingVideo(null); }} className="gap-2"><X className="w-4 h-4" /> Cancelar</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {videos.map(video => (
                <Card key={video.id} className={video.featured ? 'border-[#D4AF37] bg-[#D4AF37]/5' : ''}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} alt="" className="w-32 h-20 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {video.featured && <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />}
                        <h3 className="font-semibold text-[#1a1f3a] truncate">{video.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500">{video.views} • {video.category} • {video.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toggleFeatured(video.id)} className={video.featured ? 'text-[#D4AF37] border-[#D4AF37]' : ''}><Star className={`w-4 h-4 ${video.featured ? 'fill-[#D4AF37]' : ''}`} /></Button>
                      <Button variant="outline" size="sm" onClick={() => startEditVideo(video)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => deleteVideo(video.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* BLOG TAB */}
          <TabsContent value="blog">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a1f3a]">Blog</h2>
              <Button onClick={() => { setShowNewPost(true); setEditingPost(null); setPostForm({ icon: '🎵', tag: 'Louvor', title: '', description: '', content: '', image: '', date: new Date().toISOString().split('T')[0], seoTitle: '', seoDescription: '', seoKeywords: '' }); }} className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2">
                <Plus className="w-4 h-4" /> Novo Artigo
              </Button>
            </div>

            {(showNewPost || editingPost) && (
              <Card className="mb-6">
                <CardHeader><CardTitle>{editingPost ? 'Editar Artigo' : 'Novo Artigo'}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Ícone</Label>
                      <select value={postForm.icon} onChange={e => setPostForm({ ...postForm, icon: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="🎵">🎵 Música</option>
                        <option value="🔥">🔥 Fogo</option>
                        <option value="🙏">🙏 Oração</option>
                        <option value="📖">📖 Bíblia</option>
                        <option value="✝️">✝️ Cruz</option>
                        <option value="🕊️">🕊️ Pomba</option>
                        <option value="💫">💫 Estrela</option>
                        <option value="🌟">🌟 Brilho</option>
                        <option value="🎶">🎶 Notas</option>
                        <option value="💜">💜 Amor</option>
                        <option value="⚔️">⚔️ Espírito</option>
                        <option value="🛡️">🛡️ Escudo</option>
                        <option value="❤️">❤️ Coração</option>
                        <option value="🌅">🌅 Amanhecer</option>
                        <option value="🌿">🌿 Paz</option>
                      </select>
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <select value={postForm.tag} onChange={e => setPostForm({ ...postForm, tag: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option value="Adoração">Adoração</option>
                        <option value="Oração">Oração</option>
                        <option value="Louvor">Louvor</option>
                        <option value="Paz">Paz</option>
                        <option value="Fé">Fé</option>
                        <option value="Estudo">Estudo</option>
                        <option value="Proteção">Proteção</option>
                        <option value="Milagre">Milagre</option>
                        <option value="Vida Cristã">Vida Cristã</option>
                        <option value="Salmos">Salmos</option>
                      </select>
                    </div>
                  </div>
                  <div><Label>Título</Label><Input placeholder="Título do artigo" value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })} /></div>
                  <div><Label>Resumo</Label><Input placeholder="Breve descrição" value={postForm.description} onChange={e => setPostForm({ ...postForm, description: e.target.value })} /></div>
                  <div>
                    <Label>Imagem de Capa</Label>
                    <div className="space-y-2">
                      <Input placeholder="Cole a URL da imagem aqui" value={postForm.image} onChange={e => setPostForm({ ...postForm, image: e.target.value })} />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">ou</span>
                        <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-sm">
                          <Image className="w-4 h-4" />
                          <span>Enviar do dispositivo</span>
                          <input ref={coverImageRef} type="file" accept="image/*" className="hidden" onChange={handleCoverImage} />
                        </label>
                      </div>
                    </div>
                    {postForm.image && <img src={postForm.image} alt="Preview" className="mt-2 h-32 object-cover rounded-lg" />}
                  </div>
                  <div>
                    <Label>Conteúdo (aceita HTML)</Label>
                    <div className="flex flex-wrap gap-1 mb-2 p-2 bg-gray-50 rounded-lg border">
                      <Button type="button" variant="ghost" size="sm" onClick={() => insertHTML('h2')} className="h-8 px-2 text-xs gap-1"><Heading2 className="w-3 h-3" /> H2</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => insertHTML('h3')} className="h-8 px-2 text-xs gap-1"><Heading3 className="w-3 h-3" /> H3</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => insertHTML('strong', 'Texto em negrito:')} className="h-8 px-2 text-xs gap-1"><Bold className="w-3 h-3" /> Negrito</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => insertHTML('em', 'Texto em itálico:')} className="h-8 px-2 text-xs gap-1"><Italic className="w-3 h-3" /> Itálico</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => insertHTML('blockquote', 'Citação:')} className="h-8 px-2 text-xs gap-1"><Quote className="w-3 h-3" /> Citação</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => contentImageRef.current?.click()} className="h-8 px-2 text-xs gap-1 text-blue-600"><Image className="w-3 h-3" /> Imagem</Button>
                      <input ref={contentImageRef} type="file" accept="image/*" className="hidden" onChange={handleContentImage} />
                      <Button type="button" variant="ghost" size="sm" onClick={() => insertHTML('a', 'URL do link:')} className="h-8 px-2 text-xs gap-1 text-green-600"><Link className="w-3 h-3" /> Link</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => insertHTML('p', 'Parágrafo:')} className="h-8 px-2 text-xs gap-1">¶ Parágrafo</Button>
                    </div>
                    <Textarea ref={textareaRef} placeholder="<h2>Título da Seção</h2>&#10;<p>Conteúdo do artigo...</p>&#10;<blockquote>Citação bíblica</blockquote>&#10;<strong>Texto em negrito</strong>" rows={10} value={postForm.content} onChange={e => setPostForm({ ...postForm, content: e.target.value })} className="font-mono text-sm" />
                    {postForm.content && (
                      <div className="mt-2">
                        <Label className="text-xs text-gray-500">Preview:</Label>
                        <div className="border rounded-lg p-4 mt-1 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: postForm.content }} />
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">🔍 SEO (Opcional)</h3>
                    <div className="space-y-3">
                      <div>
                        <Label>Título SEO</Label>
                        <Input placeholder="Título para Google (máx. 60 caracteres)" maxLength={60} value={postForm.seoTitle} onChange={e => setPostForm({ ...postForm, seoTitle: e.target.value })} />
                        <p className="text-xs text-gray-400 mt-1">{postForm.seoTitle.length}/60 caracteres</p>
                      </div>
                      <div>
                        <Label>Meta Descrição</Label>
                        <Textarea placeholder="Descrição para Google (máx. 160 caracteres)" maxLength={160} rows={2} value={postForm.seoDescription} onChange={e => setPostForm({ ...postForm, seoDescription: e.target.value })} />
                        <p className="text-xs text-gray-400 mt-1">{postForm.seoDescription.length}/160 caracteres</p>
                      </div>
                      <div>
                        <Label>Palavras-chave</Label>
                        <Input placeholder="Separadas por vírgula: louvor, adoração, fé" value={postForm.seoKeywords} onChange={e => setPostForm({ ...postForm, seoKeywords: e.target.value })} />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePost} className="bg-green-600 hover:bg-green-700 text-white gap-2"><Save className="w-4 h-4" /> Salvar</Button>
                    <Button variant="outline" onClick={() => { setShowNewPost(false); setEditingPost(null); }} className="gap-2"><X className="w-4 h-4" /> Cancelar</Button>
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
                      <span className="text-xs bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-full">{post.tag}</span>
                      <h3 className="font-semibold text-[#1a1f3a] mt-1">{post.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{post.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditPost(post)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => deleteBlogPost(post.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
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
              <Button onClick={() => { setShowNewPsalm(true); setEditingPsalm(null); setPsalmForm({ text: '', reference: '' }); }} className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2">
                <Plus className="w-4 h-4" /> Novo Salmo
              </Button>
            </div>

            {(showNewPsalm || editingPsalm) && (
              <Card className="mb-6">
                <CardHeader><CardTitle>{editingPsalm ? 'Editar Salmo' : 'Novo Salmo'}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Texto do Salmo</Label>
                    <Textarea placeholder="Ex: Louvarei ao Senhor em todo o tempo..." rows={3} value={psalmForm.text} onChange={e => setPsalmForm({ ...psalmForm, text: e.target.value })} />
                  </div>
                  <div>
                    <Label>Referência</Label>
                    <Input placeholder="Ex: Salmo 34:1" value={psalmForm.reference} onChange={e => setPsalmForm({ ...psalmForm, reference: e.target.value })} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePsalm} className="bg-green-600 hover:bg-green-700 text-white gap-2"><Save className="w-4 h-4" /> Salvar</Button>
                    <Button variant="outline" onClick={() => { setShowNewPsalm(false); setEditingPsalm(null); }} className="gap-2"><X className="w-4 h-4" /> Cancelar</Button>
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
                      <Button variant="outline" size="sm" onClick={() => startEditPsalm(psalm)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => deletePsalm(psalm.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
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
              <Button onClick={() => { setShowNewShort(true); setEditingShort(null); setShortForm({ youtubeId: '', title: '' }); }} className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2">
                <Plus className="w-4 h-4" /> Novo Short
              </Button>
            </div>

            {(showNewShort || editingShort) && (
              <Card className="mb-6">
                <CardHeader><CardTitle>{editingShort ? 'Editar Short' : 'Novo Short'}</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>ID do YouTube</Label>
                    <Input placeholder="Ex: 5MnuJP2ER1g ou URL completa" value={shortForm.youtubeId} onChange={e => setShortForm({ ...shortForm, youtubeId: e.target.value })} onBlur={e => setShortForm({ ...shortForm, youtubeId: extractYouTubeId(e.target.value) })} />
                    {shortForm.youtubeId && <img src={`https://img.youtube.com/vi/${shortForm.youtubeId}/mqdefault.jpg`} alt="Preview" className="mt-2 h-24 rounded-lg" />}
                  </div>
                  <div>
                    <Label>Título</Label>
                    <Input placeholder="Ex: Louvor Moment" value={shortForm.title} onChange={e => setShortForm({ ...shortForm, title: e.target.value })} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveShort} className="bg-green-600 hover:bg-green-700 text-white gap-2"><Save className="w-4 h-4" /> Salvar</Button>
                    <Button variant="outline" onClick={() => { setShowNewShort(false); setEditingShort(null); }} className="gap-2"><X className="w-4 h-4" /> Cancelar</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {shorts.map(short => (
                <Card key={short.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={`https://img.youtube.com/vi/${short.youtubeId}/mqdefault.jpg`} alt="" className="w-20 h-32 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1a1f3a]">{short.title}</h3>
                      <p className="text-sm text-gray-500">ID: {short.youtubeId}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditShort(short)}><Edit className="w-4 h-4" /></Button>
                      <Button variant="outline" size="sm" onClick={() => deleteShort(short.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* REQUESTS TAB */}
          <TabsContent value="requests">
            <h2 className="text-2xl font-bold text-[#1a1f3a] mb-6">Pedidos de Oração e Contato</h2>
            {prayerRequests.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-gray-500">Nenhum pedido ainda.</CardContent></Card>
            ) : (
              <div className="space-y-4">
                {prayerRequests.map(req => (
                  <Card key={req.id} className={req.read ? 'opacity-60' : 'border-[#D4AF37]'}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${req.type === 'oracao' ? 'bg-blue-100 text-blue-700' : req.type === 'louvor' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                              {req.type === 'oracao' ? 'Pedido de Oração' : req.type === 'louvor' ? 'Pedido de Louvor' : 'Contato'}
                            </span>
                            <span className="text-xs text-gray-400">{req.date}</span>
                            {!req.read && <span className="w-2 h-2 bg-[#FF0000] rounded-full" />}
                          </div>
                          <h3 className="font-semibold text-[#1a1f3a]">{req.name}</h3>
                          <p className="text-sm text-gray-500">{req.email}</p>
                          <p className="text-sm text-gray-600 mt-2">{req.message}</p>
                        </div>
                        <div className="flex gap-2">
                          {!req.read && <Button variant="outline" size="sm" onClick={() => markAsRead(req.id)}><Eye className="w-4 h-4" /></Button>}
                          <Button variant="outline" size="sm" onClick={() => deletePrayerRequest(req.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
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
