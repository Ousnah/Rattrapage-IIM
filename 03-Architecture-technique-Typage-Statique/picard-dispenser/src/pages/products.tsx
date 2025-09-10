import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

interface ProductsProps {
  products: Product[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="flex flex-col gap-4">
      {products.length === 0 ? (
        <p>Aucun produit ajouté pour l’instant.</p>
      ) : (
        products.map((p, i) => (
          <ProductCard 
            key={i} 
            product={p} 
            onRemove={() => {}} 
            onQuantityChange={(quantity) => { console.log(quantity); }} 
            onToggleAvailability={() => {}} 
          />
        ))
      )}
    </div>
  );
}
