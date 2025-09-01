export interface Product {
    id: string;
    name: string;
    description: string;
    priceCents: number;
    quantity: number;
    rating: number;
    available: boolean;
    imageUrl: string;
    expirationDate: string; // format YYYY-MM-DD
    createdAt: string; // ISO string
  }
  
  export type NewProductInput = Omit<Product, "id" | "priceCents" | "createdAt"> & {
    priceEuro: string; // saisi par l’utilisateur
  };
  