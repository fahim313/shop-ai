import { useCart } from '../hooks/useCart';
import { CheckCircle2, Info, X } from 'lucide-react';

export default function Toast() {
  const { toast, dismissToast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="bg-[#111111] text-white px-4 py-3.5 rounded-lg shadow-xl border border-white/10 flex items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          {toast.type === 'info' ? (
            <Info className="w-4 h-4 text-neutral-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span className="truncate text-neutral-200">{toast.message}</span>
        </div>
        <button
          onClick={dismissToast}
          className="text-neutral-400 hover:text-white p-1 transition-colors shrink-0"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
