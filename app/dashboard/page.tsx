"use client"

import { useEffect, useState } from "react"
import { OrdersTable } from "./components/orders-table"
import { OrderColumn } from "./components/columns"
import { OrderModal } from "./components/order-modal"

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

export default function DashboardPage() {
  const [orders, setOrders] = useState<OrderColumn[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders')
        const data = await response.json()
        setOrders(data)
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleOrderClick = async (order: OrderColumn) => {
    try {
      const response = await fetch(`/api/orders/${order.id}`);
      if (!response.ok) {
        throw new Error(`Error fetching order: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Ensure the data has the correct structure before setting it
      if (data && data.id && Array.isArray(data.orderItems)) {
        const formattedOrder: Order = {
          id: data.id,
          items: data.orderItems.map((item: any) => ({
            id: item.id,
            product: {
              id: item.product.id,
              name: item.product.name
            },
            quantity: item.quantity,
            price: item.price
          })),
          createdAt: data.createdAt,
          total: data.totalAmount
        };
        setSelectedOrder(formattedOrder);
      } else {
        console.error('Invalid order data structure:', data);
        throw new Error('Invalid order data structure');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      // toast.error('Failed to load order details');
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrdersTable 
          data={orders} 
          onOrderClick={handleOrderClick}
        />
      </div>
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          open={!!selectedOrder}
          onOpenChange={(open) => {
            if (!open) setSelectedOrder(null);
          }}
        />
      )}
    </div>
  )
}