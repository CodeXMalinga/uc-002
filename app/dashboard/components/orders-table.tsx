'use client';

import { columns } from "./columns";
import { DataTable } from "@/app/admin/components/data-table";
import { OrderColumn } from "./columns";

interface OrdersTableProps {
  data: OrderColumn[];
  onOrderClick: (order: any) => void;
}

export const OrdersTable = ({ data, onOrderClick }: OrdersTableProps) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <DataTable 
      columns={columns} 
      data={data}
      onRowClick={onOrderClick}
    />
  );
};

export default OrdersTable;
