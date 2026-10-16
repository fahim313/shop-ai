import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useCart } from "../hooks/useCart";

const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

const formatPrice = (price) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);

export default function Checkout() {
  const {
    cart,
    itemCount,
    subtotal,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    district: "Dhaka",
    area: "",
    address: "",
    notes: "",
  });

  const [deliveryLocation, setDeliveryLocation] =
    useState("inside_dhaka");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFreeDelivery = subtotal >= 3000;

  const deliveryCharge = isFreeDelivery
    ? 0
    : deliveryLocation === "inside_dhaka"
      ? 80
      : 130;

  const grandTotal = subtotal + deliveryCharge;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    if (name === "district") {
      setDeliveryLocation(
        value === "Dhaka" ? "inside_dhaka" : "outside_dhaka"
      );
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    const phone = formData.phone.replace(/[\s-]/g, "");

    if (!phone) {
      nextErrors.phone = "Phone number is required.";
    } else if (!BD_PHONE_REGEX.test(phone)) {
      nextErrors.phone = "Enter a valid 11-digit Bangladeshi mobile number.";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.address.trim()) {
      nextErrors.address = "Please enter your delivery address.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const orderId = `NM-${Date.now()}`;

      const orderData = {
        orderId,
        createdAt: new Date().toISOString(),
        customer: {
          fullName: formData.fullName.trim(),
          phone: formData.phone.replace(/[\s-]/g, ""),
          email: formData.email.trim(),
          district: formData.district,
          area: formData.area.trim() || formData.district,
          address: formData.address.trim(),
          notes: formData.notes.trim(),
        },
        items: cart.map((item) => ({ ...item })),
        subtotal,
        deliveryCharge,
        grandTotal,
        deliveryLocation,
        paymentMethod: "Cash on Delivery",
      };

      const previousOrders = JSON.parse(
        localStorage.getItem("shop-ai-orders") || "[]"
      );

      localStorage.setItem(
        "shop-ai-orders",
        JSON.stringify([orderData, ...previousOrders])
      );

      localStorage.setItem(
        "shop-ai-last-order",
        JSON.stringify(orderData)
      );

      clearCart();
      navigate("/order-success");
    } catch (error) {
      console.error("Unable to save order:", error);
      setErrors((previous) => ({
        ...previous,
        submit: "Unable to place your order. Please try again.",
      }));
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <ShoppingBag
          size={48}
          strokeWidth={1.3}
          className="mx-auto text-neutral-400"
        />

        <h1 className="mt-5 text-2xl font-bold text-neutral-900">
          Your Shopping Bag is Empty
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Add products before proceeding to checkout.
        </p>

        <Link
          to="/shop"
          className="mt-6 inline-flex bg-neutral-900 px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-700"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <Link
          to="/cart"
          className="mb-4 inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Shopping Bag
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          Checkout
        </h1>

        <p className="mt-2 text-sm text-neutral-500">
          Enter your details to place a Cash on Delivery order.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} noValidate>
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <section className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 border-b border-neutral-100 pb-3 text-sm font-bold uppercase tracking-wider">
                1. Customer Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-1 block text-sm font-medium"
                  >
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    autoComplete="name"
                    className="w-full rounded border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900"
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-medium"
                    >
                      Mobile Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      autoComplete="tel"
                      placeholder="017XXXXXXXX"
                      className="w-full rounded border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium"
                    >
                      Email (Optional)
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      placeholder="name@example.com"
                      className="w-full rounded border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
              <h2 className="mb-5 border-b border-neutral-100 pb-3 text-sm font-bold uppercase tracking-wider">
                2. Delivery Address
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="district"
                    className="mb-1 block text-sm font-medium"
                  >
                    District *
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-3 text-sm outline-none focus:border-neutral-900"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Gazipur">Gazipur</option>
                    <option value="Narayanganj">Narayanganj</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                    <option value="Other">Other District</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="mb-1 block text-sm font-medium"
                  >
                    Thana / Area
                  </label>
                  <input
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="e.g. Dhanmondi, Uttara"
                    className="w-full rounded border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-1 block text-sm font-medium"
                  >
                    House / Road / Flat Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    autoComplete="street-address"
                    placeholder="House number, road, flat and other details"
                    className="w-full rounded border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="mb-1 block text-sm font-medium"
                  >
                    Delivery Instructions (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special instructions"
                    className="w-full rounded border border-neutral-300 px-3 py-3 text-sm outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
              <h2 className="mb-4 border-b border-neutral-100 pb-3 text-sm font-bold uppercase tracking-wider">
                3. Delivery Options
              </h2>

              <div className="space-y-3">
                {[
                  {
                    value: "inside_dhaka",
                    title: "Inside Dhaka",
                    description: "Estimated delivery: 24–48 hours",
                    charge: 80,
                  },
                  {
                    value: "outside_dhaka",
                    title: "Outside Dhaka",
                    description: "Estimated delivery: 2–3 days",
                    charge: 130,
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer items-start gap-3 rounded border p-4 ${
                      deliveryLocation === option.value
                        ? "border-neutral-900 bg-neutral-50"
                        : "border-neutral-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryLocation"
                      value={option.value}
                      checked={deliveryLocation === option.value}
                      onChange={() => setDeliveryLocation(option.value)}
                      className="mt-1 accent-neutral-900"
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-xs text-neutral-500">
                        {option.description}
                      </span>
                    </span>
                    <span className="text-sm font-semibold">
                      {isFreeDelivery ? "Free" : formatPrice(option.charge)}
                    </span>
                  </label>
                ))}
              </div>

              <p className="mt-3 text-xs text-neutral-500">
                {isFreeDelivery
                  ? "Your order qualifies for free delivery."
                  : "Delivery charge depends on your selected delivery zone."}
              </p>
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
              <h2 className="mb-4 border-b border-neutral-100 pb-3 text-sm font-bold uppercase tracking-wider">
                4. Payment Method
              </h2>

              <div className="flex items-start gap-3 rounded border border-neutral-300 bg-neutral-50 p-4">
                <Banknote size={22} className="shrink-0" />
                <div>
                  <p className="text-sm font-semibold">
                    Cash on Delivery (COD)
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-600">
                    Pay when your order arrives. No advance payment is
                    collected through this demo checkout.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
              <h2 className="border-b border-neutral-100 pb-4 text-sm font-bold uppercase tracking-wider">
                Order Summary ({itemCount} items)
              </h2>

              <div className="mt-4 max-h-80 space-y-4 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="h-16 w-12 shrink-0 overflow-hidden rounded bg-neutral-100">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3 border-t border-neutral-200 pt-4 text-sm">
                <div className="flex justify-between gap-3 text-neutral-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-3 text-neutral-600">
                  <span>Delivery Charge</span>
                  <span>
                    {deliveryCharge === 0
                      ? "Free"
                      : formatPrice(deliveryCharge)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-t border-neutral-200 pt-4 text-base font-bold">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {errors.submit && (
                <p className="mt-4 flex items-start gap-2 text-sm text-red-600">
                  <AlertCircle size={18} className="shrink-0" />
                  {errors.submit}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-2 bg-neutral-900 px-5 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCircle2 size={18} />
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>

              <div className="mt-4 flex items-start justify-center gap-2 text-center text-xs leading-5 text-neutral-500">
                <ShieldCheck size={16} className="mt-0.5 shrink-0" />
                <span>Cash on Delivery · Secure order details</span>
              </div>

              <div className="mt-4 flex items-start gap-2 border-t border-neutral-100 pt-4 text-xs leading-5 text-neutral-500">
                <Truck size={17} className="mt-0.5 shrink-0" />
                <span>Delivery available across Bangladesh.</span>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}