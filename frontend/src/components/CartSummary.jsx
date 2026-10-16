import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../hooks/useCart';

export default function CartSummary({ onProceedCheckout, isDrawer = false }) {
  const {
    subtotal,
    deliveryCharge,
    grandTotal,
    deliveryLocation,
    setDeliveryLocation,
    freeDeliveryThreshold,
    isFreeDelivery,
    amountNeededForFreeDelivery,
    totalItems
  } = useCart();

  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="bg-neutral-50 rounded-lg p-5 border border-neutral-200 flex flex-col gap-4">
      {/* Free Delivery Tracker */}
      <div className="bg-white p-3 rounded border border-neutral-200/80">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-800 mb-1.5">
          <Truck className="w-4 h-4 text-neutral-700" />
          {isFreeDelivery ? (
            <span className="text-emerald-700 font-semibold">
              You unlocked Free Nationwide Delivery!
            </span>
          ) : (
            <span>
              Add <strong className="text-neutral-900">{formatPrice(amountNeededForFreeDelivery)}</strong> more for <strong className="text-neutral-900">Free Delivery</strong>
            </span>
          )}
        </div>
        <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${isFreeDelivery ? 'bg-emerald-600' : 'bg-neutral-900'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Location Selector */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
          Delivery Area (Bangladesh)
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setDeliveryLocation('inside_dhaka')}
            className={`py-2 px-2.5 rounded border text-left transition-colors ${
              deliveryLocation === 'inside_dhaka'
                ? 'border-neutral-900 bg-white font-semibold text-neutral-900 shadow-xs'
                : 'border-neutral-200 bg-white/50 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            <span className="block">Inside Dhaka</span>
            <span className="text-[11px] text-neutral-500 font-normal">
              {isFreeDelivery ? 'Free' : '৳80 (24–48 hrs)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDeliveryLocation('outside_dhaka')}
            className={`py-2 px-2.5 rounded border text-left transition-colors ${
              deliveryLocation === 'outside_dhaka'
                ? 'border-neutral-900 bg-white font-semibold text-neutral-900 shadow-xs'
                : 'border-neutral-200 bg-white/50 text-neutral-600 hover:border-neutral-300'
            }`}
          >
            <span className="block">Outside Dhaka</span>
            <span className="text-[11px] text-neutral-500 font-normal">
              {isFreeDelivery ? 'Free' : '৳130 (2–3 days)'}
            </span>
          </button>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2 pt-2 border-t border-neutral-200 text-xs text-neutral-600">
        <div className="flex justify-between">
          <span>Subtotal ({totalItems} items)</span>
          <span className="font-medium text-neutral-900 tabular-nums">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Delivery Charge</span>
          {isFreeDelivery ? (
            <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
          ) : (
            <span className="font-medium text-neutral-900 tabular-nums">{formatPrice(deliveryCharge)}</span>
          )}
        </div>
        <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-bold text-neutral-900">
          <span>Estimated Total</span>
          <span className="text-base tabular-nums">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {/* Primary Action Button */}
      {isDrawer ? (
        <div className="space-y-2 pt-1">
          <Link
            to="/checkout"
            onClick={onProceedCheckout}
            className="w-full py-3 bg-neutral-900 text-white rounded text-xs font-semibold uppercase tracking-wider text-center block hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/cart"
            onClick={onProceedCheckout}
            className="w-full py-2.5 bg-white border border-neutral-300 text-neutral-800 rounded text-xs font-semibold uppercase tracking-wider text-center block hover:border-neutral-900 transition-colors"
          >
            View Full Cart
          </Link>
        </div>
      ) : (
        <Link
          to="/checkout"
          className="w-full py-3.5 bg-neutral-900 text-white rounded text-xs font-semibold uppercase tracking-wider text-center block hover:bg-neutral-800 transition-colors shadow-sm"
        >
          Proceed to Checkout ({formatPrice(grandTotal)})
        </Link>
      )}

      {/* Trust reassurance */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" />
        <span>Cash on Delivery Available Nationwide</span>
      </div>
    </div>
  );
}
