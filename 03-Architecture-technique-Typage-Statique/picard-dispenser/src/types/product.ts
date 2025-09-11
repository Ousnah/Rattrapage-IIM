export interface Product {
  id: string;
  name: string;
  description: string;
  priceEuro: string;
  priceCents: number;
  quantity: number;
  rating: number;
  image: string;
  available: boolean;
  expirationDate: string;
  createdAt: string;
}

export interface NewProductInput {
  name: string;
  description: string;
  priceEuro: string;
  quantity: number;
  rating: number;
  image: string;
  available: boolean;
  expirationDate: string;
}
