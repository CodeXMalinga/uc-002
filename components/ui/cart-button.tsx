"use client"

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/lib/store/cart'

export function CartButton() {
  const items = useCartStore((state) => state.items)
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCart className="w-6 h-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}