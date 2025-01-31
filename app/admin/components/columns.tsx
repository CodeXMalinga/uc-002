"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"


export type Order = {
  id: string
  status: string
  trackingNumber: string | null
  estimatedDelivery: Date | null
  createdAt: Date
  product: {
    name: string
    price: number
  }
  user: {
    name: string | null
    email: string
  }
}

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "trackingNumber",
    header: "Tracking Number",
  },
  {
    accessorKey: "product.name",
    header: "Product",
  },
  {
    accessorKey: "user.email",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className={`font-medium ${
          status === "delivered" ? "text-green-600" :
          status === "shipped" ? "text-blue-600" :
          "text-orange-600"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )
    }
  },
  {
    accessorKey: "estimatedDelivery",
    header: "Estimated Delivery",
    cell: ({ row }) => {
      const date = row.getValue("estimatedDelivery") as Date
      return date ? formatDate(date) : "Not set"
    }
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => {
      return formatDate(row.getValue("createdAt") as Date)
    }
  },
]