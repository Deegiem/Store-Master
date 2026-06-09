// /stores/productStore.ts

import { create } from "zustand"

import { productService } from "@/services/productService"

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

const normalizeProduct = (product: Product): Product => ({
  ...product,
  product_id: product.product_id ?? product.id,
  threshold: product.threshold ?? product.low_stock_threshold,
})

interface ProductState {

  // ======================================================
  // STATE
  // ======================================================

  products: Product[]
  productsByCategory: Record<string, Product[]>

  selectedProduct: Product | null

  priceHistory: GetPriceHistoryResponse | null

  total: number
  page: number
  unpricedCount: number

  productloading: {
    products: boolean
    selectedProduct: boolean
    createProduct: boolean
    setPrice: boolean
    deleteProduct: boolean
    priceHistory: boolean
  }

  loading: boolean

  error: {
    products: string | null
    selectedProduct: string | null
    createProduct: string | null
    setPrice: string | null
    deleteProduct: string | null
    priceHistory: string | null
  }

  // ======================================================
  // ACTIONS
  // ======================================================

  fetchProducts: (
    params?: GetProductsParams
  ) => Promise<void>

  fetchProductById: (
    productId: string
  ) => Promise<void>

  createProduct: (
    payload: CreateProductPayload
  ) => Promise<CreateProductResponse | null>

  updateProduct: (
    productId: string,
    payload: UpdateProductPayload
  ) => Promise<Product | null>

  setProductPrice: (
    productId: string,
    payload: SetProductPricePayload
  ) => Promise<SetProductPriceResponse | null>

  deleteProduct: (
    productId: string
  ) => Promise<DeleteProductResponse | null>

  fetchPriceHistory: (
    productId: string
  ) => Promise<void>

  fetchProductsByCategory: (
    categoryId: string,
    force?: boolean
  ) => Promise<void>
}

export const useProductStore =
  create<ProductState>((set) => ({

    // ======================================================
    // INITIAL STATE
    // ======================================================

    products: [],
    productsByCategory: {},

    selectedProduct: null,

    priceHistory: null,

    total: 0,
    page: 1,
    unpricedCount: 0,

    productloading: {
      products: false,
      selectedProduct: false,
      createProduct: false,
      setPrice: false,
      deleteProduct: false,
      priceHistory: false,
    },

    loading: false,

    error: {
      products: null,
      selectedProduct: null,
      createProduct: null,
      setPrice: null,
      deleteProduct: null,
      priceHistory: null,
    },

    // ======================================================
    // FETCH PRODUCTS
    // ======================================================

    fetchProducts: async (params) => {

      set((state) => ({
        productloading: {
          ...state.productloading,
          products: true,
        },
        loading: true,

        error: {
          ...state.error,
          products: null,
        },
      }))

      try {

        console.log("📡 Fetching products...")

        const data =
          await productService.getProducts(params)

        console.log("✅ Products fetched:", data)

        set((state) => ({
          products: data.items.map(normalizeProduct),

          total: data.total,
          page: data.page,
          unpricedCount: data.unpriced_count,

          productloading: {
            ...state.productloading,
            products: false,
          },
          loading: false,
        }))

      } catch (err: any) {

        console.error(
          "❌ Fetch products failed:",
          err
        )

        set((state) => ({
          error: {
            ...state.error,
            products:
              err.response?.data?.detail ||
              err.message,
          },

          productloading: {
            ...state.productloading,
            products: false,
          },
          loading: false,
        }))
      }
    },

    fetchProductsByCategory: async (categoryId, force = false) => {

      const cached = useProductStore.getState().productsByCategory[categoryId]
      if (!force && cached) return

      set((state) => ({
        productloading: {
          ...state.productloading,
          products: true,
        },
        loading: true,
        error: {
          ...state.error,
          products: null,
        },
      }))

      try {
        const data = await productService.getProducts({
          category_id: categoryId,
        })

        const products = data.items.map(normalizeProduct)

        set((state) => ({
          productsByCategory: {
            ...state.productsByCategory,
            [categoryId]: products,
          },
          productloading: {
            ...state.productloading,
            products: false,
          },
          loading: false,
        }))
      } catch (err: any) {
        set((state) => ({
          error: {
            ...state.error,
            products: err.response?.data?.detail || err.message,
          },
          productloading: {
            ...state.productloading,
            products: false,
          },
          loading: false,
        }))
      }
    },

    // ======================================================
    // FETCH PRODUCT BY ID
    // ======================================================

    fetchProductById: async (productId) => {

      set((state) => ({
        productloading: {
          ...state.productloading,
          selectedProduct: true,
        },

        error: {
          ...state.error,
          selectedProduct: null,
        },
      }))

      try {

        console.log(
          "📡 Fetching product:",
          productId
        )

        const data =
          await productService.getProductById(
            productId
          )

        console.log(
          "✅ Product fetched:",
          data
        )

        set((state) => ({
          selectedProduct: normalizeProduct(data),

          productloading: {
            ...state.productloading,
            selectedProduct: false,
          },
        }))

      } catch (err: any) {

        console.error(
          "❌ Fetch product failed:",
          err
        )

        set((state) => ({
          error: {
            ...state.error,
            selectedProduct:
              err.response?.data?.detail ||
              err.message,
          },

          productloading: {
            ...state.productloading,
            selectedProduct: false,
          },
        }))
      }
    },

    updateProduct: async (productId, payload) => {

      set((state) => ({
        productloading: {
          ...state.productloading,
          selectedProduct: true,
        },
        loading: true,
        error: {
          ...state.error,
          selectedProduct: null,
        },
      }))

      try {
        const data = normalizeProduct(
          await productService.updateProduct(productId, payload)
        )

        set((state) => ({
          products: state.products.map((product) =>
            (product.product_id ?? product.id) === productId ? data : product
          ),
          productsByCategory: Object.fromEntries(
            Object.entries(state.productsByCategory).map(([categoryId, products]) => [
              categoryId,
              products.map((product) =>
                (product.product_id ?? product.id) === productId ? data : product
              ),
            ])
          ),
          selectedProduct:
            (state.selectedProduct?.product_id ?? state.selectedProduct?.id) === productId
              ? data
              : state.selectedProduct,
          productloading: {
            ...state.productloading,
            selectedProduct: false,
          },
          loading: false,
        }))

        return data
      } catch (err: any) {
        set((state) => ({
          error: {
            ...state.error,
            selectedProduct: err.response?.data?.detail || err.message,
          },
          productloading: {
            ...state.productloading,
            selectedProduct: false,
          },
          loading: false,
        }))

        return null
      }
    },

    // ======================================================
    // CREATE PRODUCT
    // ======================================================

    createProduct: async (payload) => {

      set((state) => ({
        productloading: {
          ...state.productloading,
          createProduct: true,
        },

        error: {
          ...state.error,
          createProduct: null,
        },
      }))

      try {

        console.log(
          "📡 Creating product:",
          payload
        )

        const data =
          await productService.createProduct(
            payload
          )

        console.log(
          "✅ Product created:",
          data
        )

        set((state) => ({
          productloading: {
            ...state.productloading,
            createProduct: false,
          },
        }))

        return data

      } catch (err: any) {

        console.error(
          "❌ Create product failed:",
          err
        )

        set((state) => ({
          error: {
            ...state.error,
            createProduct:
              err.response?.data?.detail ||
              err.message,
          },

          productloading: {
            ...state.productloading,
            createProduct: false,
          },
        }))

        return null
      }
    },

    // ======================================================
    // SET PRODUCT PRICE
    // ======================================================

    setProductPrice: async (
      productId,
      payload
    ) => {

      set((state) => ({
        productloading: {
          ...state.productloading,
          setPrice: true,
        },

        error: {
          ...state.error,
          setPrice: null,
        },
      }))

      try {

        console.log(
          "📡 Setting product price:",
          productId
        )

        const data =
          await productService.setProductPrice(
            productId,
            payload
          )

        console.log(
          "✅ Product priced:",
          data
        )

        set((state) => ({
          products: state.products.map(
            (product) =>
              (product.product_id ?? product.id) === productId
                ? {
                    ...product,
                    price: data.new_price,
                    cost_price: data.reference_cost,
                    margin_percentage: data.margin_percentage,
                    is_priced: true,
                  }
                : product
          ),
          selectedProduct:
            state.selectedProduct?.id === productId
              ? {
                  ...state.selectedProduct,
                  price: data.new_price,
                  cost_price: data.reference_cost,
                  margin_percentage: data.margin_percentage,
                  is_priced: true,
                }
              : state.selectedProduct,

          productloading: {
            ...state.productloading,
            setPrice: false,
          },
        }))

        return data

      } catch (err: any) {

        console.error(
          "❌ Set product price failed:",
          err
        )

        set((state) => ({
          error: {
            ...state.error,
            setPrice:
              err.response?.data?.detail ||
              err.message,
          },

          productloading: {
            ...state.productloading,
            setPrice: false,
          },
        }))

        return null
      }
    },

    // ======================================================
    // DELETE PRODUCT
    // ======================================================

    deleteProduct: async (productId) => {

      set((state) => ({
        productloading: {
          ...state.productloading,
          deleteProduct: true,
        },

        error: {
          ...state.error,
          deleteProduct: null,
        },
      }))

      try {

        console.log(
          "📡 Deleting product:",
          productId
        )

        const data =
          await productService.deleteProduct(
            productId
          )

        console.log(
          "✅ Product deleted:",
          data
        )

        set((state) => ({
          products: state.products.filter(
            (product) =>
              (product.product_id ?? product.id) !== productId
          ),

          productloading: {
            ...state.productloading,
            deleteProduct: false,
          },
        }))

        return data

      } catch (err: any) {

        console.error(
          "❌ Delete product failed:",
          err
        )

        set((state) => ({
          error: {
            ...state.error,
            deleteProduct:
              err.response?.data?.detail ||
              err.message,
          },

          productloading: {
            ...state.productloading,
            deleteProduct: false,
          },
        }))

        return null
      }
    },

    // ======================================================
    // FETCH PRICE HISTORY
    // ======================================================

    fetchPriceHistory: async (productId) => {

      set((state) => ({
        productloading: {
          ...state.productloading,
          priceHistory: true,
        },

        error: {
          ...state.error,
          priceHistory: null,
        },
      }))

      try {

        console.log(
          "📡 Fetching price history:",
          productId
        )

        const data =
          await productService.getPriceHistory(
            productId
          )

        console.log(
          "✅ Price history fetched:",
          data
        )

        set((state) => ({
          priceHistory: data,

          productloading: {
            ...state.productloading,
            priceHistory: false,
          },
        }))

      } catch (err: any) {

        console.error(
          "❌ Fetch price history failed:",
          err
        )

        set((state) => ({
          error: {
            ...state.error,
            priceHistory:
              err.response?.data?.detail ||
              err.message,
          },

          productloading: {
            ...state.productloading,
            priceHistory: false,
          },
        }))
      }
    },
  }))
