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
  countryFilter: string;
  setAssignments: React.Dispatch<
    React.SetStateAction<
      {
        branch: string;
        country: string;
        admins: string[];
        devices: string[];
      }[]
    >
  >;
}

interface AssignmentData {
  country: string;
  branch: string;
  admins: string[];
  devices: string[];
}

const sampleData: { country: string; branch: string; admins: string[]; devices: string[] }[] = [
  {
    country: "Ghana",
    branch: "Accra",
    admins: ["John Doe", "Jane Smith"],
    devices: ["Laptop 1", "Laptop 2", "Desktop 1"],
  },
  {
    country: "Ghana",
    branch: "Kumasi",
    admins: ["Michael Johnson", "Sarah Lee"],
    devices: ["Tablet 1", "Tablet 2", "Desktop 2"],
  },
  {
    country: "Nigeria",
    branch: "Lagos",
    admins: ["Adekunle Ajayi", "Fatima Bello"],
    devices: ["Smartphone 1", "Smartphone 2", "Laptop 3"],
  },
  {
    country: "Nigeria",
    branch: "Abuja",
    admins: ["Chika Okorie", "Amina Suleiman"],
    devices: ["Desktop 3", "Desktop 4", "Tablet 3"],
  },
];

export default function DeviceAssignmentTable({
  data,
  branchFilter,
  adminFilter,
  countryFilter,
  setAssignments,
}: DeviceAssignmentTableProps) {
  const [selectedAssignments, setSelectedAssignments] = useState<number[]>([]);

  // Filter data based on branch, admin name, and country
  const filteredData = sampleData.filter(
    (assignment) =>
      (branchFilter === "" || assignment.branch === branchFilter) &&
      (adminFilter === "" ||
        assignment.admins.some((admin) => admin.includes(adminFilter))) &&
      (countryFilter === "" || assignment.country === countryFilter)
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
            <Button variant="ghost" size="icon" className="font-bold">
              ...
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleEdit(row.index)}>
              <Button variant='default'>
                Edit
              </Button>
              
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.index)}
              className="font-semibold"
            >
              <Button variant='destructive'>
                Delete
              </Button>
              
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
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