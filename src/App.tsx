import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/Products/ProductsPage";
import AddNewPage from "./pages/Products/AddNewPage";
import Home from "./pages/Home/Home";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import { useEffect } from "react";


const App = () => {
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (!cart) {
      const cartItems: ICart = { items: [] };

      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products">
        <Route index element={<ProductsPage />} />
        <Route path=":sku" element={<ProductDetailPage />} />
        <Route path="add" element={<AddNewPage />} />
      </Route>
    </Routes>
  );
};

export default App;
