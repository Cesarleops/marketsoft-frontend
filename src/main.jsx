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
import Users from "./features/users/pages/index.jsx";
import CreateUser from "./features/users/pages/create-user.jsx";
import EditUser from "./features/users/pages/edit-user.jsx";
import Providers from "./features/providers/pages/index.jsx";
import CreateProvider from "./features/providers/pages/create-provider.jsx";
import EditProvider from "./features/providers/pages/edit-provider.jsx";
import Sales from "./features/sales/pages/index.jsx";
import CreateSale from "./features/sales/pages/create-sale.jsx";
import EditSale from "./features/sales/pages/edit-sale.jsx";
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
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/create" element={<CreateProvider />} />
          <Route path="/providers/edit/:id" element={<EditProvider />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/create" element={<CreateSale />} />
          <Route path="/sales/edit/:id" element={<EditSale />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer autoClose={3000} theme="colored" />
  </StrictMode>,
);
