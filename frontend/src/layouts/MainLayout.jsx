import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="pt-16 sm:pt-[72px] lg:pt-[102px]">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}