import { prisma } from "@/lib/prisma"
import { ProductCard } from "@/components/ui/product-card"
import type { Product } from '.prisma/client'

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">Our T-Shirts</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}