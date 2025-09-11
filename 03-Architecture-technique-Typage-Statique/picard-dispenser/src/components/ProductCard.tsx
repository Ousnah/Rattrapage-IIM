import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onDelete: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function ProductCard({
  product,
  onDelete,
  onIncrease,
  onDecrease,
}: ProductCardProps) {
  return (
    <div className="border rounded p-4 shadow">
    <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover rounded"
      />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>{product.description}</p>
      <p>Prix : {product.priceEuro} €</p>
      <p>Quantité : {product.quantity}</p>
      <p>Note : {product.rating}/5</p>
      <p>Disponible : {product.available ? "Oui" : "Non"}</p>
      <p>Date limite : {product.expirationDate}</p>
      <p>Ajouté le : {new Date(product.createdAt).toLocaleDateString()}</p>

      <div className="flex gap-2 mt-4">
        <button onClick={onDecrease} className="bg-yellow-500 text-white px-2 rounded">
          -1
        </button>
        <button onClick={onIncrease} className="bg-green-500 text-white px-2 rounded">
          +1
        </button>
        <button onClick={onDelete} className="bg-red-500 text-white px-2 rounded">
          Supprimer
        </button>
      </div>
    </div>
  );
}
