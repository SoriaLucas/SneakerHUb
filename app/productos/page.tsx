import { Suspense } from "react"
import ProductsPageContent from "./ProductsPageContent"

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Cargando productos...</div>}>
      <ProductsPageContent />
    </Suspense>
  )
}
