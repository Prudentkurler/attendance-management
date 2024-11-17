import { DataTable } from "@/components/ui/data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import DeviceRequestModal from "./DeviceRequestModal";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface DeviceRequest {
  id: number;
  requester: string;
  branch: string;
  deviceId: string;
  status: string;
}

interface DeviceRequestTableProps {
  data: DeviceRequest[];
  branchFilter: string;
  statusFilter: string;
  selectedRequests: number[];
  setSelectedRequests: React.Dispatch<React.SetStateAction<number[]>>; // Allow functional updates
  onOpenModal: (request: DeviceRequest) => void;
}

const columns = (
  onOpenModal: (request: DeviceRequest) => void,
  selectedRequests: number[],
  handleCheckboxChange: (id: number, isChecked: boolean) => void
): ColumnDef<DeviceRequest>[] => [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={selectedRequests.includes(row.original.id)}
        onCheckedChange={(isChecked) =>
          handleCheckboxChange(row.original.id, !!isChecked)
        }
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "requester",
    header: "Requester",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "deviceId",
    header: "Device ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded ${
          row.original.status === "approved"
            ? "bg-green-200 text-green-800"
            : row.original.status === "denied"
            ? "bg-red-200 text-red-800"
            : "bg-yellow-200 text-yellow-800"
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button size="sm" onClick={() => onOpenModal(row.original)}>
        View
      </Button>
    ),
  },
];

export default function DeviceRequestTable({
  data,
  branchFilter,
  statusFilter,
  selectedRequests,
  setSelectedRequests,
  onOpenModal,
}: DeviceRequestTableProps) {
  // Filter data based on branch and status filters
  const filteredData = data.filter(
    (request) =>
      (branchFilter === "" || request.branch === branchFilter) &&
      (statusFilter === "" || request.status === statusFilter)
  );

  // Handle selection for individual checkboxes
  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setSelectedRequests((prevSelected) =>
      isChecked ? [...prevSelected, id] : prevSelected.filter((reqId) => reqId !== id)
    );
  };

  return (
    <DataTable
      columns={columns(onOpenModal, selectedRequests, handleCheckboxChange)}
      data={filteredData}
    />
  );
}
