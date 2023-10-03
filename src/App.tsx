import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "./redux/feature/ProductsSlice";
import { setCarts } from "./redux/feature/cartSlice";
import dataProducts from "./assets/data/products";
import ManageProduct from "./pages/ManageProduct";

const LOCAL_STORAGE_KEY_PRODUCTS: string = "LOCAL_STORAGE_KEY_PRODUCTS";
const LOCAL_STORAGE_KEY_CARTS: string = "LOCAL_STORAGE_KEY_CARTS";

function App() {
  const dispatch = useDispatch();

  const loadSavedProducts = useCallback(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTS);

    if (saved) {
      const parsedData = JSON.parse(saved);
      if (Array.isArray(parsedData)) {
        dispatch(setProducts(parsedData));
      }
    } else {
      dispatch(setProducts(dataProducts));
    }
  }, [dispatch]);

  const loadSavedCarts = useCallback(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CARTS);

    if (saved) {
      const parsedData = JSON.parse(saved);
        dispatch(setCarts(parsedData));
    }
  }, [dispatch]);

  useEffect(() => {
    loadSavedProducts();
    loadSavedCarts();
  }, [loadSavedProducts, loadSavedCarts]);

  return (
    <div className="overflow-hidden">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/manage" element={<ManageProduct />} />
        </Routes>
        <Sidebar />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
