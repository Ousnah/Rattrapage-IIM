import type { Product } from "../types/product";
import { centsToEuros } from "../utils/format";

interface ProductCardProps {
  product: Product;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, delta: number) => void;
  onToggleAvailability: (id: string) => void;
}

export default function ProductCard({
  product,
  onRemove,
  onQuantityChange,
  onToggleAvailability,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm flex gap-4 items-start bg-picardlightblue">

      <div className="flex-1">
        <h2 className="text-lg font-bold">{product.name}</h2>
        <p className="text-sm text-white">{product.description}</p>
        <p className="mt-1 font-medium">{centsToEuros(parseFloat(product.priceEuro))}</p>
        <p>Quantité : {product.quantity}</p>
        <p>Note : ⭐ {product.rating}</p>
        <p>
          Disponible :{" "}
          <span
            className={`font-semibold ${
              product.available ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.available ? "Oui" : "Non"}
          </span>
        </p>
        <p className="text-sm text-white">
          DLC : {new Date(product.expirationDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-white">
          Ajouté le : {new Date(product.createdAt).toLocaleDateString()}
        </p>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onQuantityChange(product.id, 1)}
            className="px-2 py-1 bg-blue-600 text-white rounded"
          >
            +1
          </button>
          <button
            onClick={() => onQuantityChange(product.id, -1)}
            className="px-2 py-1 bg-yellow-600 text-white rounded"
          >
            -1
          </button>
          <button
            onClick={() => onToggleAvailability(product.id)}
            className="px-2 py-1 bg-purple-600 text-white rounded"
          >
            {product.available ? "Désactiver" : "Activer"}
          </button>
          <button
            onClick={() => onRemove(product.id)}
            className="px-2 py-1 bg-red-600 text-white rounded"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
