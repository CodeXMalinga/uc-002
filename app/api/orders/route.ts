import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    
    const orders = await prisma.order.findMany({
      where: {
        status: status || undefined,
      },
      include: {
        product: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('[ORDERS_GET]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { productId, status, estimatedDelivery } = body

    const order = await prisma.order.create({
      data: {
        productId,
        userId,
        status,
        estimatedDelivery,
        trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('[ORDERS_POST]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}