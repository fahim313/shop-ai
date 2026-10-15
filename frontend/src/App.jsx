import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";
import Hero from "./components/Hero";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <HomePage />
              </>
            }
          />
          <Route path="/shop" element={<ProductsPage />} />
          <Route path="/shop/:slug" element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}