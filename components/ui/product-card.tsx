"use client"

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '.prisma/client'
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { toast } from 'sonner'

interface ProductCardProps {
  product: Product
}   

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success('Added to cart', {
      description: `${quantity} × ${product.name} added to your cart`,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/cart'
      },
    })
    setQuantity(1) // Reset quantity after adding to cart
  }

  return (
    <div className="group relative rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.imageUrl || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-lg font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
        </div>
      </Link>

      {/* Quantity Controls */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <button 
          onClick={decrementQuantity}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>
        <input 
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-16 text-center border rounded-md"
          min="1"
        />
        <button 
          onClick={incrementQuantity}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </button>
    </div>
  )
}