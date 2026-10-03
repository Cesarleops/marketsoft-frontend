import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import Products from "./features/products/pages/index.jsx";
import Home from "./pages/index.jsx";
import CreateProduct from "./features/products/pages/create-product.jsx";
import EditProduct from "./features/products/pages/edit-product.jsx";
import { AppLayout } from "./layout/app-layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AppLayout />}>
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer autoClose={3000} theme="colored" />
  </StrictMode>,
);
