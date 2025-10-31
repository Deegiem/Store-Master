export interface SaleRecord {
  sale_id: string;
  product_id: string;
  product_name: string;
  quantity_sold: number;
  price_per_unit?: number;
  total_sale_price?: number;
  sold_by: string;
  role: string;
  sold_at: string;
}

export interface SaleResponse {
  message?: string;
  product?: {
    product_id: string;
    name: string;
    category_id: string;
    price: number;
    quantity: number;
    threshold: number;
    created_by: string;
    created_at: string;
    updated_at: string;
  };
  sale_record?: SaleRecord;
}

export interface SaleListResponse {
  message: string;
  count: number;
  data: SaleRecord[];
}

export interface CreateSalePayload {
  product_id: string; // selected behind the scenes
  quantity: number;
}
