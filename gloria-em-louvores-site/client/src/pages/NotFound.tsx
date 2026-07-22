import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <Card className="w-full max-w-lg mx-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-[#D4AF37]" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Glória em Louvores</h1>
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Página não encontrada</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Esta página pode ter sido movida ou não existe.
          </p>
          <Button
            onClick={() => setLocation("/")}
            className="bg-[#D4AF37] hover:bg-[#B8942E] text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
