import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../hooks/useCart';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-3 sm:gap-4 py-4 border-b border-neutral-100 last:border-b-0 items-start">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        referrerPolicy="no-referrer"
        className="w-18 h-24 sm:w-20 sm:h-26 object-cover rounded bg-neutral-100 shrink-0 border border-neutral-200"
      />

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-semibold text-neutral-900 line-clamp-1 leading-snug">
              {item.name}
            </h4>
            <button
              type="button"
              onClick={() => removeFromCart(item.cartItemId)}
              className="text-neutral-400 hover:text-red-600 transition-colors p-1 -mr-1"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
            <span>Size: <strong className="text-neutral-800 font-medium">{item.size}</strong></span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <span>Color:</span>
              <span
                className="w-2.5 h-2.5 rounded-full inline-block border border-neutral-300"
                style={{ backgroundColor: item.color.hex }}
              />
              <strong className="text-neutral-800 font-medium">{item.color.name}</strong>
            </span>
          </div>
        </div>

        {/* Pricing & Quantity Row */}
        <div className="flex items-center justify-between mt-3 pt-2">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(newQty) => updateQuantity(item.cartItemId, newQty)}
            size="sm"
          />

          <div className="text-right">
            <span className="text-sm font-bold text-neutral-900 tabular-nums">
              {formatPrice(item.price * item.quantity)}
            </span>
            {item.quantity > 1 && (
              <span className="block text-[10px] text-neutral-400 tabular-nums">
                ({formatPrice(item.price)} each)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
