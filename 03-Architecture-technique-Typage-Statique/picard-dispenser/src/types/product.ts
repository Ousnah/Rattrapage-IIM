export interface Product {
  id: string;
  name: string;
  description: string;
  priceEuro: string;
  priceCents: number;
  quantity: number;
  rating: number;
  available: boolean;
  imageUrl: string;
  expirationDate: string;
  createdAt: string;
}

export interface NewProductInput {
  name: string;
  description: string;
  priceEuro: string;
  quantity: number;
  rating: number;
  available: boolean;
  imageUrl: string;
  expirationDate: string;
}
