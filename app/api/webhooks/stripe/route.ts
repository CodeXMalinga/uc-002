import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get('stripe-signature')

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig!, endpointSecret)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

    // Create orders for each item
    try {
      const orders = await Promise.all(
        lineItems.data.map(async (item) => {
          const productName = item.description
          // Find the product in our database
          const product = await prisma.product.findFirst({
            where: { name: productName }
          })

          if (!product) {
            throw new Error(`Product not found: ${productName}`)
          }

          return prisma.order.create({
            data: {
              status: 'pending',
              productId: product.id,
              userId: session.metadata?.userId || 'unknown',
              // Add any additional order details from session.metadata
              // such as shipping address, contact number etc.
            }
          })
        })
      )

      return NextResponse.json({ orders })
    } catch (error) {
      console.error('Error creating orders:', error)
      return NextResponse.json(
        { error: 'Error creating orders' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
} 