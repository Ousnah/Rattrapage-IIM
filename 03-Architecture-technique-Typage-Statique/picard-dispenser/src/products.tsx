import { useProducts } from "./hooks/useProducts";
import { centsToEuros } from "./utils/format";

export default function Products() {
  const { products, removeProduct, updateQuantity, toggleAvailability } = useProducts();

  if (products.length === 0) {
    return <p className="text-white">Aucun produit pour le moment.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Liste des produits</h1>
      <table className="w-full border-collapse bg-picardlightblue shadow rounded-lg overflow-hidden">
        <thead className="bg-picardlightblue">
          <tr>
            <th className="p-2 text-left">Nom</th>
            <th className="p-2">Prix</th>
            <th className="p-2">Qté</th>
            <th className="p-2">Dispo</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{centsToEuros(p.priceCents)}</td>
              <td className="p-2">{p.quantity}</td>
              <td className="p-2">
                {p.available ? (
                  <span className="text-green-600">Oui</span>
                ) : (
                  <span className="text-red-600">Non</span>
                )}
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => updateQuantity(p.id, +1)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  +1
                </button>
                <button
                  onClick={() => updateQuantity(p.id, -1)}
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  -1
                </button>
                <button
                  onClick={() => toggleAvailability(p.id)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded"
                >
                  Toggle
                </button>
                <button
                  onClick={() => removeProduct(p.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
