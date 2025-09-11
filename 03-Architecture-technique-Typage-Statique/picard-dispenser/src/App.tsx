import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Products from "./pages/products";
import AddProduct from "./pages/addProduct";
import { useState } from "react";
import type { Product } from "./types/product";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Router>
        <nav className="flex gap-6 p-4 bg-picardblue shadow-md">
          <Link to="/" className="hover:underline">Accueil</Link>
          <Link to="/products" className="hover:underline">Produits</Link>
          <Link to="/add" className="hover:underline">Ajouter</Link>
        </nav>

        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-picardblue rounded-2xl shadow-lg p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products"
                element={<Products products={products} setProducts={setProducts} />}
              />
              
              <Route
                path="/add"
                element={<AddProduct products={products} setProducts={setProducts} />}
              />
            </Routes>
          </div>
        </main>
      </Router>
    </div>
  );
}
