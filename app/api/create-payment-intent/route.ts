import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
})

export async function POST(req: Request) {
  try {
    const { items, address, contactNumber } = await req.json()
    
    const amount = items.reduce(
      (sum: number, item: any) => sum + item.product.price * item.quantity,
      0
    )

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amounts in cents
      currency: 'usd',
      metadata: {
        address,
        contactNumber,
        items: JSON.stringify(items.map((item: any) => ({
          id: item.product.id,
          quantity: item.quantity
        })))
      }
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
} 