"use client"

import { useCartStore } from '@/lib/store/cart'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createOrder } from '@/lib/actions/order'
import { toast } from 'sonner'

export default function CartPage() {
  const { user } = useUser()
  const router = useRouter()
  const { items, removeItem, updateQuantity, clearCart } = useCartStore()
  const [address, setAddress] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [errors, setErrors] = useState({ address: '', contactNumber: '' })
  const [isProcessing, setIsProcessing] = useState(false)

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const handleCheckout = async () => {
    setIsProcessing(true)
    setErrors({ address: '', contactNumber: '' })

    // Validate inputs
    if (!address.trim()) {
      setErrors(prev => ({ ...prev, address: 'Address is required' }))
      setIsProcessing(false)
      return
    }

    if (!contactNumber.trim()) {
      setErrors(prev => ({ ...prev, contactNumber: 'Contact number is required' }))
      setIsProcessing(false)
      return
    }
  
    try {
      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: Number(item.product.price)
        })),
        address: address.trim(),
        contactNumber: contactNumber.trim(),
        totalAmount: Number(total)
      }
  
      console.log('Sending order data:', JSON.stringify(orderData, null, 2)) // Enhanced logging
  
      // Create order using API route
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })
  
      const responseText = await response.text()
      console.log('Response status:', response.status) // Added status logging
      console.log('Raw server response:', responseText)
  
      let result
      try {
        result = JSON.parse(responseText)
      } catch (e) {
        console.error('Failed to parse response:', e)
        throw new Error(`Invalid server response: ${responseText.substring(0, 200)}...`)
      }
  
      if (!response.ok) {
        throw new Error(result.error || result.details || `Server error: ${response.status}`)
      }
  
      if (result.success) {
        clearCart()
        toast.success('Order placed successfully!', {
          description: `Order ID: ${result.order.id}`,
        })
        router.push(`/orders/${result.order.id}`)
      } else {
        throw new Error(result.error || result.details || 'Failed to create order')
      }
    } catch (error: any) {
      console.error('Checkout error:', {
        message: error.message,
        stack: error.stack,
        cause: error.cause
      })
      toast.error('Failed to create order', {
        description: error.message || 'Please try again later'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please sign in to view your cart</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        href="/shop" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Shop
      </Link>

      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link 
            href="/shop" 
            className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 border rounded-lg p-4"
              >
                <div className="relative w-24 h-24">
                  <Image
                    src={item.product.imageUrl || '/placeholder.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-gray-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium">Customer Details</p>
                <p>{user.fullName}</p>
                <p>{user.primaryEmailAddress?.emailAddress}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Delivery Address*
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded-md p-2"
                  rows={3}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Contact Number*
                </label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full border rounded-md p-2"
                />
                {errors.contactNumber && (
                  <p className="text-red-500 text-sm">{errors.contactNumber}</p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {isProcessing ? 'Processing...' : 'Continue to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}