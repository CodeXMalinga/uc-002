import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

// Define a reusable type for params
type RouteParams = {
  params: {
    orderId: string;
  };
};

export async function PATCH(
  req: NextRequest, // Use NextRequest instead of Request
  { params }: RouteParams
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { status, estimatedDelivery } = body

    const order = await prisma.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        status,
        estimatedDelivery,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('[ORDER_PATCH]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest, // Use NextRequest instead of Request
  { params }: RouteParams
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const order = await prisma.order.delete({
      where: {
        id: params.orderId,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('[ORDER_DELETE]', error)
    return new NextResponse("Internal error", { status: 500 })
  }
}