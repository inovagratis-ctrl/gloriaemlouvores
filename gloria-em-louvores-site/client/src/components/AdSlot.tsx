import { useLocation } from 'wouter';
import { isAdSenseAllowedForPath } from '@/lib/analytics';

interface AdSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'fluid';
  className?: string;
  inPrayerContext?: boolean;
}

/**
 * Controlled AdSense Slot component with anti-CLS reserved height and strict policy governance.
 * NEVER renders on /comunidade, prayer request forms, /contato, /admin, or inside prayer text blocks.
 */
export default function AdSlot({
  slotId = 'gloria-editorial-slot-1',
  format = 'horizontal',
  className = '',
  inPrayerContext = false,
}: AdSlotProps) {
  const [location] = useLocation();

  // Never render inside prayer text blocks or when disallowed by route policy
  if (inPrayerContext) return null;
  if (!isAdSenseAllowedForPath(location)) return null;

  const minHeightClass =
    format === 'rectangle'
      ? 'min-h-[250px]'
      : format === 'fluid'
      ? 'min-h-[120px]'
      : 'min-h-[90px] sm:min-h-[100px]';

  return (
    <div
      className={`my-8 w-full rounded-xl border border-[#E8E4E0]/80 bg-[#F9F7F4]/60 p-3 flex flex-col items-center justify-center ${minHeightClass} ${className}`}
      aria-label="Espaço Publicitário"
      data-ad-slot={slotId}
      data-ad-status="reserved-anti-cls"
    >
      <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 select-none">
        Publicidade • Espaço Reservado (Baixa Densidade)
      </span>
      <div className="w-full flex-1 flex items-center justify-center text-center px-4">
        <p className="text-xs text-gray-400 max-w-md">
          Espaço publicitário informativo que apoia a manutenção gratuita das ferramentas devocionais e estudos bíblicos do portal Glória em Louvores.
        </p>
      </div>
    </div>
  );
}
