import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useData } from "@/contexts/DataContext";

export default function PsalmsCarousel() {
  const { psalms } = useData();
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    if (psalms.length === 0) return;
    setCurrent(prev => (prev + 1) % psalms.length);
  }, [psalms.length]);

  const prev = useCallback(() => {
    if (psalms.length === 0) return;
    setCurrent(prev => (prev - 1 + psalms.length) % psalms.length);
  }, [psalms.length]);

  useEffect(() => {
    if (psalms.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, psalms.length]);

  if (psalms.length === 0) return null;

  const psalm = psalms[current];

  return (
    <div className="relative max-w-3xl mx-auto px-4">
      <div className="text-center min-h-[160px] flex flex-col items-center justify-center">
        <Quote className="w-10 h-10 text-[#D4AF37]/30 mb-4" />
        <blockquote className="text-xl sm:text-2xl md:text-3xl text-[#1a1f3a] italic font-serif leading-relaxed mb-4 transition-opacity duration-500">
          "{psalm.text}"
        </blockquote>
        <cite className="text-[#D4AF37] font-semibold not-italic text-sm sm:text-base">— {psalm.reference}</cite>
      </div>

      {psalms.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-6">
          <Button variant="ghost" size="icon" onClick={prev} className="w-10 h-10 rounded-full hover:bg-[#D4AF37]/10">
            <ChevronLeft className="w-5 h-5 text-[#D4AF37]" />
          </Button>
          <div className="flex gap-2">
            {psalms.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-[#D4AF37] w-6" : "bg-[#D4AF37]/30"}`} />
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={next} className="w-10 h-10 rounded-full hover:bg-[#D4AF37]/10">
            <ChevronRight className="w-5 h-5 text-[#D4AF37]" />
          </Button>
        </div>
      )}
    </div>
  );
}
