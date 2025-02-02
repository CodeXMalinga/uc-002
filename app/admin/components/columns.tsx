"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"

const ORDER_STATUSES = [
  "Pending",
  "Order Processing",
  "Order Ready to Dispatch",
  "Order Dispatched",
  "Delivered"
] as const

export type Order = {
  id: string
  status: string
  createdAt: Date
  totalAmount: number
  user: {
    name: string | null
    email: string
  }
  productName: string
}

async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const response = await fetch(`/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })

    if (!response.ok) {
      throw new Error('Failed to update order status')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order No.",
  },
  {
    accessorKey: "user.name",
    header: "Customer Name",
    cell: ({ row }) => {
      const name = row.original.user.name
      const email = row.original.user.email
      return name || email.split('@')[0]
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return formatDate(row.getValue("createdAt") as Date)
    }
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount)
      return formatted
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const [isUpdating, setIsUpdating] = useState(false)
      const order = row.original
      
      const handleStatusUpdate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value
        try {
          setIsUpdating(true)
          await updateOrderStatus(order.id, newStatus)
          toast.success('Order status updated successfully')
          // Refresh the page to get updated data
          window.location.reload()
        } catch (error) {
          toast.error('Failed to update order status')
        } finally {
          setIsUpdating(false)
        }
      }

      return (
        <div className="flex items-center gap-2">
          <select
            className="w-[180px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            value={order.status}
            onChange={handleStatusUpdate}
            disabled={isUpdating}
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          {isUpdating && (
            <span className="text-sm text-muted-foreground">Updating...</span>
          )}
        </div>
      )
    }
  },
]