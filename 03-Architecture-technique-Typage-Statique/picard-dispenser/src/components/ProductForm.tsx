import { useState } from "react";
import type { NewProductInput, Product } from "../types/product";
import { validateNewProduct } from "../utils/validation";
import { eurosToCents } from "../utils/format";
import { v4 as uuid } from "uuid";

interface ProductFormProps {
  onSubmit: (product: Product) => void;
}

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [form, setForm] = useState<NewProductInput>({
    name: "",
    description: "",
    priceEuro: "",
    quantity: 0,
    rating: 0,
    image: "/images/test.jpg",
    available: true,
    expirationDate: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? checked
          : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateNewProduct(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const product: Product = {
        id: uuid(),
        name: form.name.trim(),
        description: form.description.trim(),
        priceEuro: form.priceEuro.trim(), 
        priceCents: eurosToCents(form.priceEuro)!,
        quantity: Number(form.quantity),         
        rating: Number(form.rating),
        image: form.image.trim(), 
        available: !!form.available,
        expirationDate: form.expirationDate,
        createdAt: new Date().toISOString(),
    };

    onSubmit(product);

    setForm({
      name: "",
      description: "",
      priceEuro: "",
      quantity: 0,
      rating: 0,
      image: "/images/test.jpg",
      available: true,
      expirationDate: "",
    });
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block font-medium">Nom</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Prix (€)</label>
        <input
          name="priceEuro"
          value={form.priceEuro}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.priceEuro && (
          <p className="text-red-600 text-sm">{errors.priceEuro}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Quantité</label>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.quantity && (
          <p className="text-red-600 text-sm">{errors.quantity}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Note (0-5)</label>
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.rating && (
          <p className="text-red-600 text-sm">{errors.rating}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Image (URL)</label>
        <input
          name="imageUrl"
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.imageUrl && (
          <p className="text-red-600 text-sm">{errors.imageUrl}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Date limite de consommation</label>
        <input
          type="date"
          name="expirationDate"
          value={form.expirationDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        {errors.expirationDate && (
          <p className="text-red-600 text-sm">{errors.expirationDate}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="available"
          checked={form.available}
          onChange={handleChange}
        />
        <label>Disponible</label>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Ajouter
      </button>
    </form>
  );
}
