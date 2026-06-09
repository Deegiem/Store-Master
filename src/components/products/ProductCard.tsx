"use client"

import type { Product } from "@/types/product"

interface Props {
  product: Product
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {product.name}
        </h2>

        <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
          {product.is_priced
            ? "Priced"
            : "Unpriced"}
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {product.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            Price
          </p>

          <p className="text-xl font-bold">
            ₦{product.price ?? 0}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Margin
          </p>

          <p className="text-xl font-bold">
            {product.margin_percentage ?? 0}%
          </p>
        </div>
      </div>
    </div>
  )
}