import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, totalItems } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            <h3 className="font-bold text-sm tracking-tight text-neutral-900 uppercase">
              Shopping Bag
            </h3>
            <span className="text-xs text-neutral-500 font-medium">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h4 className="text-base font-semibold text-neutral-900 mb-1">
              Your bag is empty
            </h4>
            <p className="text-xs text-neutral-500 max-w-xs mb-6">
              Looks like you haven't added any premium menswear items yet.
            </p>
            <Link
              to="/shop"
              onClick={closeCart}
              className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <>
            {/* Scrollable items */}
            <div className="flex-1 overflow-y-auto px-5 divide-y divide-neutral-100">
              {items.map(item => (
                <CartItem key={item.cartItemId} item={item} />
              ))}
            </div>

            {/* Bottom summary */}
            <div className="p-5 border-t border-neutral-200 bg-neutral-50/50">
              <CartSummary onProceedCheckout={closeCart} isDrawer={true} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
