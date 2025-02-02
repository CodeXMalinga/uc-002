import { NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'
import { createOrder } from '@/lib/actions/order'
import { headers } from 'next/headers'

export async function GET(req: Request) {
  try {
    const headersList = await headers()
    const sessionId = headersList.get('session_id') || ''

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status === 'paid') {
      // Get the metadata from the session
      const metadata = session.metadata
      if (!metadata) {
        throw new Error('No metadata found in session')
      }

      // Parse the items from metadata
      const items = JSON.parse(metadata.items)
      const address = metadata.address
      const contactNumber = metadata.contactNumber
      const userId = metadata.userId

      // Create the order
      const orderData = {
        items: items.map((item: any) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price
        })),
        address,
        contactNumber,
        totalAmount: session.amount_total ? session.amount_total / 100 : 0,
        paymentIntentId: session.payment_intent as string
      }

      const result = await createOrder(orderData)

      if (!result.success) {
        throw new Error('Failed to create order')
      }

      // Redirect to the order confirmation page
      return NextResponse.redirect(new URL(`/orders/${result.order.id}`, req.url))
    }

    throw new Error('Payment not successful')
  } catch (error) {
    console.error('Error in success route:', error)
    return NextResponse.redirect(new URL('/cart?error=payment-failed', req.url))
  }
}