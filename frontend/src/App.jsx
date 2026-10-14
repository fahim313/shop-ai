import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/shop" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
