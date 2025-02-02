"use server"

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"

interface OrderItem {
  productId: string
  quantity: number
  price: number
}

interface CreateOrderData {
  items: OrderItem[]
  address: string
  contactNumber: string
  totalAmount: number
}

export async function createOrder(orderData: CreateOrderData) {
  if (!orderData || typeof orderData !== 'object') {
    throw new Error('Invalid order data received')
  }

  try {
    const { userId } = await auth()
    const user = await currentUser()
    
    if (!userId || !user) {
      throw new Error("User not authenticated")
    }

    // Create or update user first
    const dbUser = await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: user.emailAddresses[0]?.emailAddress || "",
        name: `${user.firstName} ${user.lastName}`.trim() || null,
      },
      create: {
        id: userId,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: `${user.firstName} ${user.lastName}`.trim() || null,
      }
    });

    console.log('User in database:', dbUser); // Debug log

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: dbUser.id, // Make sure we use the confirmed user ID
        status: "pending",
        address: orderData.address,
        contactNumber: orderData.contactNumber,
        totalAmount: orderData.totalAmount,
        orderItems: {
          create: orderData.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: true
      }
    })

    return { success: true, order }
  } catch (error) {
    console.error('Error creating order:', error)
    return { success: false, error: String(error) }
  }
}