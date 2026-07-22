import { useState } from 'react';
import { useData, Video, BlogPost } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Edit, Save, X, Mail, Eye, Music, FileText } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { videos, blogPosts, prayerRequests, addVideo, updateVideo, deleteVideo, addBlogPost, updateBlogPost, deleteBlogPost, markAsRead, deletePrayerRequest } = useData();

  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showNewVideo, setShowNewVideo] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);

  const [videoForm, setVideoForm] = useState({ youtubeId: '', title: '', views: '', category: 'adoracao' });
  const [postForm, setPostForm] = useState({ icon: '🎵', tag: 'Louvor', title: '', desc: '', content: '', date: new Date().toLocaleDateString('pt-BR') });

  const unreadCount = prayerRequests.filter(r => !r.read).length;

  const handleSaveVideo = () => {
    if (editingVideo) {
      updateVideo(editingVideo.id, videoForm);
      setEditingVideo(null);
    } else {
      addVideo(videoForm);
      setShowNewVideo(false);
    }
    setVideoForm({ youtubeId: '', title: '', views: '', category: 'adoracao' });
  };

  const handleSavePost = () => {
    if (editingPost) {
      updateBlogPost(editingPost.id, postForm);
      setEditingPost(null);
    } else {
      addBlogPost(postForm);
      setShowNewPost(false);
    }
    setPostForm({ icon: '🎵', tag: 'Louvor', title: '', desc: '', content: '', date: new Date().toLocaleDateString('pt-BR') });
  };

  const startEditVideo = (video: Video) => {
    setEditingVideo(video);
    setVideoForm({ youtubeId: video.youtubeId, title: video.title, views: video.views, category: video.category });
  };

  const startEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({ icon: post.icon, tag: post.tag, title: post.title, desc: post.desc, content: post.content, date: post.date });
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <header className="bg-white border-b border-[#E8E4E0] sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="w-6 h-6 text-[#D4AF37]" />
            <h1 className="text-xl font-bold text-[#1a1f3a]">Painel Admin</h1>
            {unreadCount > 0 && (
              <span className="bg-[#FF0000] text-white text-xs px-2 py-1 rounded-full">{unreadCount} novo(s)</span>
            )}
          </div>
          <Button variant="outline" onClick={onLogout} size="sm">Sair</Button>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="videos">
          <TabsList className="mb-8">
            <TabsTrigger value="videos" className="gap-2"><Music className="w-4 h-4" /> Vídeos</TabsTrigger>
            <TabsTrigger value="blog" className="gap-2"><FileText className="w-4 h-4" /> Blog</TabsTrigger>
            <TabsTrigger value="requests" className="gap-2"><Mail className="w-4 h-4" /> Pedidos {unreadCount > 0 && `(${unreadCount})`}</TabsTrigger>
          </TabsList>

          {/* VIDEOS TAB */}
          <TabsContent value="videos">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a1f3a]">Vídeos</h2>
              <Button onClick={() => { setShowNewVideo(true); setEditingVideo(null); setVideoForm({ youtubeId: '', title: '', views: '', category: 'adoracao' }); }} className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2">
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
                    <Input placeholder="Ex: MF8p-aj16Zg" value={videoForm.youtubeId} onChange={e => setVideoForm({ ...videoForm, youtubeId: e.target.value })} />
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
                  <div className="flex gap-2">
                    <Button onClick={handleSaveVideo} className="bg-green-600 hover:bg-green-700 text-white gap-2"><Save className="w-4 h-4" /> Salvar</Button>
                    <Button variant="outline" onClick={() => { setShowNewVideo(false); setEditingVideo(null); }} className="gap-2"><X className="w-4 h-4" /> Cancelar</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="space-y-4">
              {videos.map(video => (
                <Card key={video.id}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <img src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} alt="" className="w-32 h-20 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[#1a1f3a] truncate">{video.title}</h3>
                      <p className="text-sm text-gray-500">{video.views} • {video.category}</p>
                    </div>
                    <div className="flex gap-2">
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
              <Button onClick={() => { setShowNewPost(true); setEditingPost(null); setPostForm({ icon: '🎵', tag: 'Louvor', title: '', desc: '', content: '', date: new Date().toLocaleDateString('pt-BR') }); }} className="bg-[#D4AF37] hover:bg-[#B8942E] text-white gap-2">
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
                      <Input placeholder="Ex: 🔥" value={postForm.icon} onChange={e => setPostForm({ ...postForm, icon: e.target.value })} />
                    </div>
                    <div>
                      <Label>Categoria</Label>
                      <Input placeholder="Ex: Adoração" value={postForm.tag} onChange={e => setPostForm({ ...postForm, tag: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <Label>Título</Label>
                    <Input placeholder="Título do artigo" value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })} />
                  </div>
                  <div>
                    <Label>Resumo</Label>
                    <Input placeholder="Breve descrição" value={postForm.desc} onChange={e => setPostForm({ ...postForm, desc: e.target.value })} />
                  </div>
                  <div>
                    <Label>Conteúdo</Label>
                    <Textarea placeholder="Conteúdo completo do artigo..." rows={6} value={postForm.content} onChange={e => setPostForm({ ...postForm, content: e.target.value })} />
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
                      <p className="text-sm text-gray-500 truncate">{post.desc}</p>
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
