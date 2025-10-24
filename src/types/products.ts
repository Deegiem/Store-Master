// /types/product.ts
export interface Product {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  threshold: number;
  category_id: string;
  created_at?: string;
  created_by?: string;
}

export interface CreateProductPayload {
  category_id: string;
  products: {
    name: string;
    quantity: number;
    price: number;
    threshold: number;
  }[];
}

export interface UpdateProductPayload {
  name?: string;
  quantity?: number;
  price?: number;
}
