import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <div className="pt-16 sm:pt-18 lg:pt-23.5">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}