import { useState, useEffect, useRef } from 'react'
import { Plus, Edit3, Trash2, Eye, EyeOff, Star, StarOff, Search, X, Save, Image, Tag, Bold, Italic, Heading1, Link2, List, Quote, Code, RefreshCw, ArrowLeft } from 'lucide-react'
import { Link } from 'wouter'

interface BlogPost {
  id: string
  icon: string
  tag: string
  title: string
  description: string
  content: string
  image: string
  date: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

interface FormData {
  icon: string
  tag: string
  title: string
  description: string
  content: string
  image: string
  date: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

const CATEGORIES = [
  'Adoração',
  'Oração',
  'Louvor',
  'Paz',
  'Fé',
  'Estudo',
  'Proteção',
  'Milagre',
  'Vida Cristã',
  'Salmos',
]

const ICONS = ['🎵', '🔥', '🙏', '📖', '✝️', '🕊️', '💫', '🌟', '🎶', '💜', '⚔️', '🛡️', '❤️', '🌅', '🌿']

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [formData, setFormData] = useState<FormData>({
    icon: '🎵',
    tag: 'Louvor',
    title: '',
    description: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('gloria-admin-auth')
    if (saved === 'true') {
      setIsAuthenticated(true)
      fetchPosts()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'gloria2026') {
      localStorage.setItem('gloria-admin-auth', 'true')
      setIsAuthenticated(true)
      fetchPosts()
    } else {
      alert('Senha incorreta!')
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/blog?t=${Date.now()}`)
      const data = await response.json()
      setPosts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingPost) {
        const response = await fetch(`/api/blog/${editingPost.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (data.id) {
          setShowForm(false)
          setEditingPost(null)
          resetForm()
          fetchPosts()
        } else {
          alert(data.error || 'Erro ao atualizar post')
        }
      } else {
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (data.id) {
          setShowForm(false)
          setEditingPost(null)
          resetForm()
          fetchPosts()
        } else {
          alert(data.error || 'Erro ao criar post')
        }
      }
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Erro ao salvar post')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      icon: post.icon,
      tag: post.tag,
      title: post.title,
      description: post.description || '',
      content: post.content || '',
      image: post.image || '',
      date: post.date,
      seoTitle: post.seoTitle || '',
      seoDescription: post.seoDescription || '',
      seoKeywords: post.seoKeywords || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Excluir o post "${title}"?`)) return

    try {
      const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      if (response.status === 204) {
        fetchPosts()
      } else {
        alert('Erro ao excluir post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Erro ao excluir post')
    }
  }

  const resetForm = () => {
    setFormData({
      icon: '🎵',
      tag: 'Louvor',
      title: '',
      description: '',
      content: '',
      image: '',
      date: new Date().toISOString().split('T')[0],
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    })
  }

  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = contentRef.current
    if (!textarea) return
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = formData.content.substring(start, end)
    const newContent = formData.content.substring(0, start) + before + selected + after + formData.content.substring(end)
    setFormData(prev => ({ ...prev, content: newContent }))
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length)
    }, 0)
  }

  const handleInsertImage = () => {
    if (imageUrl) {
      const html = `<figure class="my-6"><img src="${imageUrl}" alt="${imageAlt || 'Imagem do artigo'}" class="w-full rounded-lg" /><figcaption class="text-center text-sm text-gray-500 mt-2">${imageAlt || ''}</figcaption></figure>`
      insertAtCursor('\n' + html + '\n')
      setShowImageModal(false)
      setImageUrl('')
      setImageAlt('')
    }
  }

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('Imagem muito grande. Máximo 5MB.')
      return
    }
    setUploadingImage(true)
    try {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          if (!ctx) return
          const maxWidth = 800
          let { width, height } = img
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0, width, height)
          setFormData(prev => ({ ...prev, image: canvas.toDataURL('image/jpeg', 0.8) }))
        }
        img.src = ev.target?.result as string
      }
      reader.readAsDataURL(file)
    } catch (error) {
      alert('Erro ao processar imagem')
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !filterCategory || post.tag === filterCategory
    return matchesSearch && matchesCategory
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Blog</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Digite a senha"
              />
            </div>
            <button type="submit" className="w-full bg-[#D4AF37] text-white py-3 rounded-lg hover:bg-[#B8942E] font-medium">
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gerenciar Blog</h1>
            <p className="text-gray-500 mt-1">{posts.length} posts cadastrados</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4" /> Voltar
            </Link>
            <button
              onClick={() => { resetForm(); setEditingPost(null); setShowForm(true) }}
              className="flex items-center gap-2 bg-[#D4AF37] text-white px-4 py-2 rounded-lg hover:bg-[#B8942E]"
            >
              <Plus className="w-4 h-4" />
              Novo Post
            </button>
            <button
              onClick={fetchPosts}
              disabled={loading}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">Todas categorias</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-10">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  {editingPost ? 'Editar Post' : 'Novo Post'}
                </h2>
                <button onClick={() => { setShowForm(false); setEditingPost(null) }} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa</label>
                  <div className="flex items-start gap-4">
                    {formData.image ? (
                      <div className="relative">
                        <img src={formData.image} alt="Preview" className="w-40 h-28 object-cover rounded-lg border" />
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: '' }))} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-40 h-28 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                    <div className="flex-1">
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleCoverImageUpload} className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50">
                        {uploadingImage ? 'Enviando...' : 'Selecionar Imagem'}
                      </button>
                      <p className="text-xs text-gray-500 mt-2">JPG, PNG ou WebP. Máximo 5MB.</p>
                      <input type="text" placeholder="Ou cole a URL da imagem" value={formData.image} onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))} className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título *</label>
                  <input type="text" required value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" placeholder="Título do post" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Resumo *</label>
                  <textarea required rows={2} value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" placeholder="Breve resumo do post" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo * (HTML permitido)</label>
                  <div className="flex flex-wrap gap-1 p-2 bg-gray-100 border border-b-0 rounded-t-lg">
                    <button type="button" onClick={() => insertAtCursor('<strong>', '</strong>')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Negrito"><Bold className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertAtCursor('<em>', '</em>')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Itálico"><Italic className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertAtCursor('<h2>', '</h2>')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Título H2"><Heading1 className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertAtCursor('<h3>', '</h3>')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Título H3"><span className="text-xs font-bold">H3</span></button>
                    <button type="button" onClick={() => insertAtCursor('<ul>\n  <li>', '</li>\n</ul>')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Lista"><List className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertAtCursor('<blockquote class="border-l-4 border-[#D4AF37] pl-4 italic text-gray-600 my-4">', '</blockquote>')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Citação"><Quote className="w-4 h-4" /></button>
                    <button type="button" onClick={() => insertAtCursor('<a href="" target="_blank">', '</a>')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Link"><Link2 className="w-4 h-4" /></button>
                    <div className="w-px bg-gray-300 mx-1" />
                    <button type="button" onClick={() => setShowImageModal(true)} className="flex items-center gap-1 px-3 py-1.5 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 rounded text-sm font-medium" title="Inserir imagem no conteúdo">
                      <Image className="w-4 h-4" />
                      Inserir Imagem
                    </button>
                    <button type="button" onClick={() => insertAtCursor('<p class="bg-[#F9F7F4] border-l-4 border-[#D4AF37] p-4 rounded-r-lg my-4">', '</p>')} className="p-2 hover:bg-gray-200 rounded text-gray-700" title="Destaque"><Code className="w-4 h-4" /></button>
                  </div>
                  <textarea ref={contentRef} required rows={14} value={formData.content} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-[#D4AF37] font-mono text-sm" placeholder="Conteúdo completo do post. Use os botões acima para formatar." />
                  <p className="text-xs text-gray-400 mt-1">Dica: Selecione o texto e clique nos botões para formatar</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ícone</label>
                    <div className="flex flex-wrap gap-2">
                      {ICONS.map(icon => (
                        <button key={icon} type="button" onClick={() => setFormData(prev => ({ ...prev, icon }))} className={`text-2xl p-2 rounded-lg border-2 transition-all ${formData.icon === icon ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-gray-200 hover:border-gray-300'}`}>
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                    <select required value={formData.tag} onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]">
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                    <input type="date" value={formData.date} onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">🔍 SEO (Opcional)</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Título</label>
                      <input type="text" value={formData.seoTitle} onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" placeholder="Título para SEO (opcional)" maxLength={60} />
                      <p className="text-xs text-gray-400 mt-1">{formData.seoTitle.length}/60 caracteres</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Descrição</label>
                      <textarea rows={2} value={formData.seoDescription} onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" placeholder="Descrição para SEO (opcional)" maxLength={160} />
                      <p className="text-xs text-gray-400 mt-1">{formData.seoDescription.length}/160 caracteres</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Palavras-chave</label>
                      <input type="text" value={formData.seoKeywords} onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37]" placeholder="Separadas por vírgula: louvor, adoração, fé" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button type="button" onClick={() => { setShowForm(false); setEditingPost(null) }} className="px-6 py-3 text-gray-600 hover:text-gray-800">Cancelar</button>
                  <button type="submit" disabled={saving} className="flex items-center gap-2 bg-[#D4AF37] text-white px-6 py-3 rounded-lg hover:bg-[#B8942E] disabled:opacity-50">
                    <Save className="w-4 h-4" />
                    {saving ? 'Salvando...' : editingPost ? 'Atualizar' : 'Criar Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showImageModal && (
          <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Inserir Imagem no Conteúdo</h3>
                <button onClick={() => setShowImageModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
                  <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="https://..." />
                </div>
                {imageUrl && (
                  <div><img src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg border" /></div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Texto Alternativo (alt)</label>
                  <input type="text" value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Descrição da imagem" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => { setShowImageModal(false); setImageUrl(''); setImageAlt('') }} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancelar</button>
                  <button onClick={handleInsertImage} disabled={!imageUrl} className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8942E] disabled:opacity-50 text-sm">Inserir Imagem</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37] mx-auto"></div>
            <p className="text-gray-500 mt-4">Carregando posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <p className="text-gray-500 text-lg">Nenhum post encontrado</p>
            <button onClick={() => { resetForm(); setEditingPost(null); setShowForm(true) }} className="mt-4 text-[#D4AF37] hover:text-[#B8942E] font-medium">Criar primeiro post</button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {post.image ? (
                    <img src={post.image} alt={post.title} className="w-full md:w-40 h-28 object-cover rounded-lg" />
                  ) : (
                    <div className="w-full md:w-40 h-28 bg-gradient-to-br from-[#F4E4C1] to-[#F9F7F4] flex items-center justify-center text-4xl rounded-lg">
                      {post.icon}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs rounded-full font-medium">{post.tag}</span>
                      <span className="text-2xl">{post.icon}</span>
                      <span className="text-xs text-gray-400">{post.date}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">{post.title}</h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{post.description}</p>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    <button onClick={() => handleEdit(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Editar"><Edit3 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(post.id, post.title)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Excluir"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
