import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, PackageCheck, Phone, MapPin, ArrowRight, Home, ShoppingBag, Clock } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

export default function OrderSuccess() {
  const { recentOrder } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Fallback demo order if user navigates directly to /order-success
  const order = recentOrder || {
    orderId: 'NM-20260924-1024',
    createdAt: new Date().toISOString(),
    customer: {
      fullName: 'Tanvir Ahmed',
      phone: '01711000000',
      email: 'tanvir@example.com',
      district: 'Dhaka',
      area: 'Banani',
      address: 'House 12, Road 11, Block D',
      notes: 'Call before delivery'
    },
    items: [
      {
        cartItemId: 'sample-1',
        name: 'The Onyx Signature Silk Panjabi',
        category: 'Panjabi',
        price: 3450,
        size: 'L',
        color: { name: 'Onyx Black', hex: '#111111' },
        quantity: 1
      }
    ],
    subtotal: 3450,
    deliveryCharge: 0,
    grandTotal: 3450,
    deliveryLocation: 'Inside Dhaka (24–48 Hours)',
    paymentMethod: 'Cash on Delivery (COD)'
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Confirmation Badge */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4 border border-emerald-200">
          <CheckCircle2 className="w-9 h-9 stroke-[1.75]" />
        </div>
        <span className="text-xs uppercase tracking-widest text-emerald-700 font-semibold mb-1 block">
          Order Confirmed
        </span>
        <h1
          className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-neutral-600 max-w-md mx-auto">
          Thank you for choosing NOIR MEN. Our team will verify and dispatch your parcel shortly.
        </p>

        {/* Order Reference ID */}
        <div className="mt-4 inline-flex items-center gap-2 bg-neutral-100 text-neutral-800 px-4 py-2 rounded font-mono text-sm font-semibold border border-neutral-200">
          <span>Order ID:</span>
          <span className="text-neutral-950 font-bold select-all">{order.orderId}</span>
        </div>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-8">
        {/* Status Tracker */}
        <div className="bg-neutral-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-neutral-100">Status: Preparing Shipment</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated Delivery: {order.deliveryLocation?.includes('Outside') ? '2–3 Business Days' : '24–48 Hours'}</span>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="p-6 space-y-6">
          {/* Shipping & Payment summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-neutral-100 text-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-neutral-400 text-[11px] block mb-2">
                Delivery Recipient
              </span>
              <p className="text-sm font-semibold text-neutral-900">{order.customer?.fullName}</p>
              <p className="text-neutral-600 mt-1 flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-neutral-400" />
                <span>{order.customer?.phone}</span>
              </p>
              <p className="text-neutral-600 mt-1 flex items-start gap-1.5">
                <MapPin className="w-3 h-3 text-neutral-400 shrink-0 mt-0.5" />
                <span>{order.customer?.address}, {order.customer?.area}, {order.customer?.district}</span>
              </p>
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-neutral-400 text-[11px] block mb-2">
                Payment & Fulfillment
              </span>
              <p className="text-sm font-semibold text-neutral-900">{order.paymentMethod}</p>
              <p className="text-neutral-600 mt-1">{order.deliveryLocation}</p>
              {order.customer?.notes && (
                <p className="text-neutral-500 mt-2 bg-neutral-50 p-2 rounded border border-neutral-200 text-[11px]">
                  <strong>Notes:</strong> {order.customer.notes}
                </p>
              )}
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-3">
              Items in this Order
            </h4>
            <div className="divide-y divide-neutral-100">
              {order.items?.map((item, idx) => (
                <div key={idx} className="py-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-14 object-cover rounded bg-neutral-100 border border-neutral-200 shrink-0"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-neutral-900">{item.name}</p>
                      <p className="text-neutral-500 text-[11px]">
                        Size: {item.size} {item.color?.name && `· Color: ${item.color.name}`} · Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-bold text-neutral-900 tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="pt-4 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-neutral-900 tabular-nums">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span className="font-medium text-neutral-900 tabular-nums">
                {order.deliveryCharge === 0 ? 'Free Delivery' : formatPrice(order.deliveryCharge)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-bold text-neutral-900">
              <span>Total Payable Amount</span>
              <span className="text-base text-neutral-950 tabular-nums">{formatPrice(order.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/shop"
          className="w-full sm:w-auto px-7 py-3.5 bg-neutral-900 text-white rounded text-xs font-semibold uppercase tracking-wider text-center hover:bg-neutral-800 transition-colors inline-flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <Link
          to="/"
          className="w-full sm:w-auto px-7 py-3.5 bg-white border border-neutral-300 text-neutral-800 rounded text-xs font-semibold uppercase tracking-wider text-center hover:border-neutral-900 transition-colors inline-flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
