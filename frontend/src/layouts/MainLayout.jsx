import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-neutral-200 bg-neutral-950 px-4 py-10 text-center text-xs tracking-widest text-neutral-400">
        <p className="font-semibold tracking-[0.25em] text-white">
          NOIR MEN
        </p>
        <p className="mt-3">
          TIMELESS STYLE. EVERYDAY CONFIDENCE.
        </p>
        <p className="mt-5">
          © {new Date().getFullYear()} NOIR MEN. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}