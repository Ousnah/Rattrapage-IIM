import { type NewProductInput } from "../types/product";
import { eurosToCents } from "./format";

export type FieldErrors = Partial<Record<keyof NewProductInput, string>>;

export function validateNewProduct(input: NewProductInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = "Le nom doit contenir au moins 2 caractères.";
  }
  if (!input.description || input.description.trim().length < 10) {
    errors.description = "Description trop courte.";
  }
  const price = eurosToCents(input.priceEuro);
  if (price === null) {
    errors.priceEuro = "Prix invalide.";
  }
  if (input.quantity < 0) {
    errors.quantity = "Quantité invalide.";
  }
  if (input.rating < 0 || input.rating > 5) {
    errors.rating = "La note doit être entre 0 et 5.";
  }
  if (!input.expirationDate) {
    errors.expirationDate = "Date obligatoire.";
  }

  return errors;
}
