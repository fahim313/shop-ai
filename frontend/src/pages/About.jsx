import { Link } from 'react-router-dom';
import { ArrowRight, Feather, Scissors, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/images/hero.jpg';

export default function About() {
  return (
    <div className="pb-16 sm:pb-24">
      {/* Hero Banner */}
      <section className="bg-neutral-900 text-white py-16 sm:py-24 border-b border-neutral-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            The Brand Story
          </span>
          <h1
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Modern Men's Fashion
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            Born in Dhaka, crafted for the discerning modern man. Elevating Bangladeshi menswear through refined minimalism and uncompromising quality.
          </p>
        </div>
      </section>

      {/* Main Editorial Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2
              className="text-2xl font-bold tracking-tight text-neutral-900 mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Our Philosophy
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              NOIR MEN was founded with a singular conviction: Bangladeshi men deserve contemporary garments that seamlessly honor cultural heritage while providing the crisp lines and understated poise of modern luxury.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              From our signature monochromatic silk Panjabis to our 260+ GSM heavyweight drop-shoulder t-shirts, every piece is designed for longevity, breathability in high humidity, and effortless pairing.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-md aspect-4/3 bg-neutral-100">
            <img
              src={heroImg}
              alt="NOIR MEN Craft"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
          <div className="p-6 bg-white rounded-lg border border-neutral-200">
            <Feather className="w-6 h-6 text-neutral-900 mb-3" />
            <h3 className="font-semibold text-neutral-900 text-sm mb-1.5">Natural Fibers</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We prioritize organic flax linen, long-staple combed cotton, and mulberry silk blends engineered for our climate.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-neutral-200">
            <Scissors className="w-6 h-6 text-neutral-900 mb-3" />
            <h3 className="font-semibold text-neutral-900 text-sm mb-1.5">Precision Tailoring</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Every collar curve, placket stitch, and pant taper is rigorously fitted across standard Bangladeshi body profiles.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-neutral-200">
            <ShieldCheck className="w-6 h-6 text-neutral-900 mb-3" />
            <h3 className="font-semibold text-neutral-900 text-sm mb-1.5">Responsible Value</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Transparent pricing, direct-to-consumer accessibility, and risk-free Cash on Delivery nationwide.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-neutral-800 transition-colors"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
