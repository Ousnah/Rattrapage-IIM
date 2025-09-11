import { useEffect, useState } from "react";
import type { Product } from "../types/product";

const STORAGE_KEY = "picard_products";

function loadProducts(): Product[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(loadProducts());
  }, []);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  function addProduct(p: Product) {
    setProducts((prev) => [p, ...prev]);
  }

  function removeProduct(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function updateQuantity(id: string, delta: number) {
    setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p;
          const current = Number(p.quantity);
          const safeCurrent = Number.isFinite(current) ? current : 0;
          const newQty = Math.max(0, Math.round(safeCurrent + delta));
          return { ...p, quantity: newQty };
        })
    );
  }

  function toggleAvailability(id: string) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
    );
  }

  return { products, addProduct, removeProduct, updateQuantity, toggleAvailability };
}
