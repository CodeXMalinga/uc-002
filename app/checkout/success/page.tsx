'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/store/cart'
import Link from 'next/link'

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="mb-8">Your payment has been processed successfully.</p>
      <Link
        href="/shop"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  )
} 