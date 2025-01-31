import { DataTable } from "@/app/admin/components/data-table" 
import { columns } from "@/app/admin/components/columns"
import { prisma } from "@/lib/prisma"

export default async function AdminPage() {
  const orders = await prisma.order.findMany({
    include: {
      product: true,
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        </div>
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  )
}