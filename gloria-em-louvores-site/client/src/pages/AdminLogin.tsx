import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'gloria2026') {
      localStorage.setItem('gloria-admin-auth', 'true');
      onLogin();
    } else {
      setError('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1f3a] to-[#0f0f0f] p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#1a1f3a]">Painel Admin</CardTitle>
          <p className="text-gray-500 text-sm">Glória em Louvores</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username">Usuário</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="username" type="text" placeholder="admin" value={username} onChange={e => setUsername(e.target.value)} className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input id="password" type="password" placeholder="••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#B8942E] text-white">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
