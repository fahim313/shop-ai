import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="max-w-2xl mb-12">
        <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1 block">
          Client Support
        </span>
        <h1
          className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Get in Touch with NOIR MEN
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600">
          Have an inquiry regarding sizing, custom wedding party orders, or courier delivery? Our customer team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Contact info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-neutral-200 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900">
              Studio & Showroom
            </h3>

            <div className="space-y-4 text-xs text-neutral-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-semibold">Banani Flagship</strong>
                  <p>House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-semibold">Phone & WhatsApp</strong>
                  <p className="font-mono text-neutral-800">+880 1711 000 000</p>
                  <p className="text-neutral-400 text-[11px]">Direct WhatsApp support available</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-semibold">Email Inquiries</strong>
                  <p>support@noirmen.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block font-semibold">Hours of Operation</strong>
                  <p>Saturday – Thursday: 10:00 AM – 10:00 PM</p>
                  <p>Friday: 2:00 PM – 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-neutral-100 rounded-lg border border-neutral-200 text-xs text-neutral-600">
            <p className="font-semibold text-neutral-900 mb-1">Corporate & Festive Orders</p>
            <p className="text-[11px] leading-relaxed">
              We provide tailored packages for corporate uniforms, wedding groomsmen sets, and festive gifting with doorstep delivery across Bangladesh.
            </p>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-neutral-200">
          <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 mb-4 pb-2 border-b border-neutral-100">
            Send Us a Message
          </h3>

          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-neutral-900 mb-1">Message Received</h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Thank you, {form.name}. Our Dhaka customer support team will contact you via phone or WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Shakib Al Hasan"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Mobile Number (BD) *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-800 mb-1">
                  Message / Order Reference
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us what you need help with..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-neutral-300 rounded focus:outline-none focus:border-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 bg-neutral-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
