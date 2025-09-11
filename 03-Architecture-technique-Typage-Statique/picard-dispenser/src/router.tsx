import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Products from "./pages/products";
import AddProduct from "./pages/addProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products products={[]} setProducts={() => {}} /> },
      { path: "add", element: <AddProduct products={[]} setProducts={() => {}} /> },
    ],
  },
]);
