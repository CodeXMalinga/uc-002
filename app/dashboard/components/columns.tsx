"use client"

import { ColumnDef, Row } from "@tanstack/react-table"
import { Button, buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'text-yellow-500';
    case 'processing':
      return 'text-blue-500';
    case 'completed':
      return 'text-green-500';
    case 'cancelled':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

export type OrderColumn = {
  id: string;
  createdAt: string;
  status: string;
  total: number;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Order No.",
    cell: ({ row }: { row: Row<OrderColumn> }) => (
      <Button
        className={buttonVariants({ variant: "link", className: "text-blue-600 hover:underline" })}
      >
        #{row.getValue("id")}
      </Button>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }: { row: Row<OrderColumn> }) => formatDate(row.getValue("createdAt")),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<OrderColumn> }) => (
      <div className={`capitalize px-2 py-1 rounded-full text-sm ${
        getStatusColor(row.getValue("status"))
      }`}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }: { row: Row<OrderColumn> }) => (
      <div className="font-medium">
        ${row.getValue("total")}
      </div>
    ),
  },
]