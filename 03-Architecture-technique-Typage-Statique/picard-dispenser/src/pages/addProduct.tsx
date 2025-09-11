import { useState } from "react";
import type { Product } from "../types/product";
import { useNavigate } from "react-router-dom";

interface AddProductProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function AddProduct({ products, setProducts }: AddProductProps) {
  const [formData, setFormData] = useState<Product>({
    id: "", 
    name: "",
    description: "",
    priceEuro: "",
    priceCents: 0,
    quantity: 0,
    rating: 0,
    available: true,
    image: "", 
    expirationDate: "",
    createdAt: new Date().toISOString(),
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : false;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl, 
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = { ...formData, id: crypto.randomUUID() };

    setProducts([...products, newProduct]);
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Nom du produit"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="priceEuro"
        placeholder="Prix"
        value={formData.priceEuro}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantité"
        value={formData.quantity}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="rating"
        placeholder="Note"
        value={formData.rating}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border p-2 rounded"
      />
      {formData.image && (
        <img
          src={formData.image}
          alt="Aperçu"
          className="w-32 h-32 object-cover rounded border"
        />
      )}
      <input
        type="date"
        name="expirationDate"
        value={formData.expirationDate}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white rounded p-2">
        Ajouter
      </button>
    </form>
  );
}
