import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DeviceAssignmentTableProps {
  data: {
    country: string;
    branch: string;
    admins: string[];
    devices: string[];
  }[];
  branchFilter: string;
  adminFilter: string;
  countryFilter:string;
  setAssignments: React.Dispatch<
    React.SetStateAction<
      {
        branch: string;
        country:string;
        admins: string[];
        devices: string[];
      }[]
    >
  >;
}

interface AssignmentData {
  country:string;
  branch: string;
  admins: string[];
  devices: string[];
}

export default function DeviceAssignmentTable({
  data,
  branchFilter,
  adminFilter,
  setAssignments,
}: DeviceAssignmentTableProps) {
  const [selectedAssignments, setSelectedAssignments] = useState<number[]>([]);

  // Filter data based on branch and admin name
  const filteredData = data.filter(
    (assignment) =>
      (branchFilter === "" || assignment.branch === branchFilter) &&
      (adminFilter === "" ||
        assignment.admins.some((admin) => admin.includes(adminFilter)))
  );

  // Toggle selection for a single row
  const toggleSelection = (index: number) => {
    setSelectedAssignments((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Toggle selection for all rows
  const toggleSelectAll = (checked: boolean) => {
    setSelectedAssignments(checked ? filteredData.map((_, i) => i) : []);
  };

  // Check if all rows are selected
  const areAllSelected = selectedAssignments.length === filteredData.length;

  // Delete selected assignments
  const handleDeleteSelected = () => {
    setAssignments((prev) =>
      prev.filter((_, index) => !selectedAssignments.includes(index))
    );
    setSelectedAssignments([]);
  };

  // Delete a single assignment
  const handleDelete = (index: number) => {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  };

  // Edit a single assignment
  const handleEdit = (index: number) => {
    console.log("Edit Assignment:", data[index]);
    // Add edit logic here
  };

  // Add checkbox and action columns to table
  const columns: ColumnDef<AssignmentData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={areAllSelected}
          onCheckedChange={(checked) => toggleSelectAll(!!checked)}
        />
      ),
      cell: ({ row, table }) => (
        <Checkbox
          checked={selectedAssignments.includes(row.index)}
          onCheckedChange={() => toggleSelection(row.index)}
        />
      ),
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "branch",
      header: "Branch",
    },
    {
      accessorKey: "admins",
      header: "Admins",
      cell: ({ row }) => row.original.admins.join(", "),
    },
    {
      accessorKey: "devices",
      header: "Devices",
      cell: ({ row }) => row.original.devices.join(", "),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              &#x22EE; {/* Vertical three dots */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleEdit(row.index)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.index)}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="mt-4">
      {/* Bulk Actions */}
      <div className="flex justify-end items-center gap-2 mb-2">
        <Checkbox
          checked={areAllSelected}
          onCheckedChange={(checked) => toggleSelectAll(!!checked)}
        />
        <Button
          size="sm"
          variant="destructive"
          className="text-sm font-bold"
          onClick={handleDeleteSelected}
        >
          Delete Selected
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
