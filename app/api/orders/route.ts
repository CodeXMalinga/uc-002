import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    // 1. Check authentication
    const { userId } = await auth()
    console.log('User ID:', userId) // Debug log

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // 2. Parse request body
    const body = await req.json()
    console.log('Received body:', body) // Debug log

    const { items, address, contactNumber, totalAmount } = body

    // 3. Validate request data
    if (!items?.length) {
      return NextResponse.json(
        { success: false, error: 'No items in order' },
        { status: 400 }
      )
    }

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address is required' },
        { status: 400 }
      )
    }

    if (!contactNumber) {
      return NextResponse.json(
        { success: false, error: 'Contact number is required' },
        { status: 400 }
      )
    }

    // 4. Prepare order data
    const orderData = {
      userId,
      status: "pending",
      address,
      contactNumber,
      totalAmount: Number(totalAmount),
      orderItems: {
        create: items.map((item: any) => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price)
        }))
      }
    }

    console.log('Order data to create:', orderData) // Debug log

    // 5. Create the order
    const order = await prisma.order.create({
      data: orderData,
      include: {
        orderItems: true
      }
    })

    console.log('Created order:', order) // Debug log

    // 6. Return success response
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: order.status,
        totalAmount: order.totalAmount,
        orderItems: order.orderItems
      }
    })

  } catch (error: any) {
    // Log the full error
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    })

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create order',
        details: error.message // Include error details in development
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      include: {
        orderItems: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform the data to match the OrderColumn interface
    const formattedOrders = orders.map((order: { id: string; createdAt: Date; status: string; totalAmount: number }) => ({
      id: order.id,
      createdAt: order.createdAt.toISOString(),
      status: order.status,
      total: order.totalAmount
    }))

    return NextResponse.json(formattedOrders)
  } catch (error: any) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}