import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[440px] overflow-hidden bg-neutral-950 sm:min-h-[520px] lg:min-h-[580px]">
      <img
        src={heroImg}
        alt="NOIR MEN menswear collection"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

      {/* এখানে max-w-7xl এর বদলে max-w-[1160px] করে দেওয়া হয়েছে যাতে নিচের সেকশনগুলোর সাথে একদম নিখুঁতভাবে মিলে যায় */}
      <div className="mx-auto flex min-h-[440px] max-w-[1160px] items-center px-4 sm:px-6 sm:min-h-[520px] lg:min-h-[580px]">
        <div className="max-w-xl text-white">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75 sm:text-xs">
            The NOIR MEN Collection
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
            Style that
            <br />
            speaks for you.
          </h1>

          <p className="mt-5 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            Discover modern menswear designed for everyday confidence,
            from timeless essentials to distinctive statement pieces.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-neutral-200 sm:px-6 sm:text-sm"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/shop?filter=new"
              className="inline-flex items-center rounded-md border border-white/60 px-5 py-3 text-xs font-medium text-white transition hover:bg-white hover:text-black sm:px-6 sm:text-sm"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
