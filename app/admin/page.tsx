import { DataTable } from "@/app/admin/components/data-table" 
import { columns } from "@/app/admin/components/columns"
import { prisma } from "@/lib/prisma"

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  // Transform the data to match the columns structure
  const transformedOrders = orders.map(order => ({
    id: order.id,
    status: order.status,
    createdAt: order.createdAt,
    totalAmount: order.totalAmount,
    user: {
      name: order.user.name,
      email: order.user.email
    },
    // Get the first product name if there are multiple items
    productName: order.orderItems[0]?.product.name || 'N/A'
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        </div>
        <DataTable columns={columns} data={transformedOrders} />
      </div>
    </div>
  )
}