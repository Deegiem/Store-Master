// /services/productService.ts

import { api } from "@/lib/api"

import type {
  Product,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
  GetProductsParams,
  GetProductsResponse,
  SetProductPricePayload,
  SetProductPriceResponse,
  DeleteProductResponse,
  GetPriceHistoryResponse,
} from "@/types/product"

export const productService = {

  // ======================================================
  // 1. CREATE PRODUCT
  // ======================================================

  createProduct: async (
    payload: CreateProductPayload
  ): Promise<CreateProductResponse> => {

    const res = await api.post<CreateProductResponse>(
      "/products/",
      payload
    )

    return res.data
  },

  updateProduct: async (
    productId: string,
    payload: UpdateProductPayload
  ): Promise<Product> => {

    const res = await api.put<Product>(
      `/products/${productId}`,
      payload
    )

    return res.data
  },

  // ======================================================
  // 2. GET PRODUCTS
  // ======================================================

  getProducts: async (
    params?: GetProductsParams
  ): Promise<GetProductsResponse> => {

    const res = await api.get<GetProductsResponse>(
      "/products/",
      {
        params,
      }
    )

    return res.data
  },

  // ======================================================
  // 3. GET PRODUCT BY ID
  // ======================================================

  getProductById: async (
    productId: string
  ): Promise<Product> => {

    const res = await api.get<Product>(
      `/products/${productId}`
    )

    return res.data
  },

  // ======================================================
  // 4. SET PRODUCT PRICE
  // ======================================================

  setProductPrice: async (
    productId: string,
    payload: SetProductPricePayload
  ): Promise<SetProductPriceResponse> => {

    const res = await api.put<SetProductPriceResponse>(
      `/products/${productId}/price`,
      payload
    )

    return res.data
  },

  // ======================================================
  // 5. DELETE PRODUCT
  // ======================================================

  deleteProduct: async (
    productId: string
  ): Promise<DeleteProductResponse> => {

    const res = await api.delete<DeleteProductResponse>(
      `/products/${productId}`
    )

    return res.data
  },

  // ======================================================
  // 6. GET PRICE HISTORY
  // ======================================================

  getPriceHistory: async (
    productId: string
  ): Promise<GetPriceHistoryResponse> => {

    const res =
      await api.get<GetPriceHistoryResponse>(
        `/products/${productId}/price-history`
      )

    return res.data
  },
}
