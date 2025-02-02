"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDate, formatPrice } from "@/lib/utils"

interface Product {
  id: string;
  name: string;
}

interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  createdAt: Date | string;
  total: number;
}

interface OrderModalProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderModal({
  order,
  open,
  onOpenChange,
}: OrderModalProps) {
  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Ordered on {formatDate(new Date(order.createdAt))}
          </div>
          <ScrollArea className="h-[300px] rounded-md border p-4">
            {order.items?.map((item) => (
              <div key={item.id} className="flex items-center py-2">
                <div className="flex-1">
                  <p className="font-medium">{item.product?.name || 'Product Name Not Available'}</p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="font-medium">
                  ${formatPrice(item.price)}
                </div>
              </div>
            )) || (
              <div className="text-sm text-muted-foreground">
                No items in this order
              </div>
            )}
          </ScrollArea>
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">${formatPrice(order.total || 0)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}