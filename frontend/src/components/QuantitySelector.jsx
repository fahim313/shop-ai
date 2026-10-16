import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onChange, min = 1, max = 10, size = 'default' }) {
  const isSmall = size === 'sm';

  return (
    <div className={`inline-flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden ${isSmall ? 'h-8' : 'h-10'}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className={`${isSmall ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>

      <span className={`${isSmall ? 'w-8 text-xs' : 'w-10 text-sm'} font-medium text-center text-neutral-900 tabular-nums select-none`}>
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className={`${isSmall ? 'w-8 h-8' : 'w-10 h-10'} flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus className={isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      </button>
    </div>
  );
}
