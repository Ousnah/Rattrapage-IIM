import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

interface ProductsProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function Products({ products, setProducts }: ProductsProps) {
  const handleDelete = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index: number, delta: number) => {
    setProducts(
      products.map((p, i) =>
        i === index ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
      )
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {products.length === 0 ? (
        <p>Aucun produit ajouté pour l’instant.</p>
      ) : (
        products.map((p, i) => (
          <ProductCard
            key={i}
            product={p}
            onDelete={() => handleDelete(i)}
            onIncrease={() => handleQuantityChange(i, 1)}
            onDecrease={() => handleQuantityChange(i, -1)}
          />
        ))
      )}
    </div>
  );
}
