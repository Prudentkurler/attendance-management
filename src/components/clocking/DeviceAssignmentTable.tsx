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
import { CSVLink } from "react-csv";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { DeviceAssignment } from "@/app/dashboard/assign-clockin-device/page";

interface DeviceAssignmentTableProps {
  data: DeviceAssignment[];
  branchFilter: string;
  adminFilter: string;
  countryFilter: string;
  setAssignments: React.Dispatch<React.SetStateAction<DeviceAssignment[]>>;
  onDelete: () => void;
  onEdit: () => void;
}

export default function DeviceAssignmentTable({
  data,
  branchFilter,
  adminFilter,
  countryFilter,
  setAssignments,
  onDelete,
  onEdit,
}: DeviceAssignmentTableProps) {
  const [selectedAssignments, setSelectedAssignments] = useState<string[]>([]);

  const filteredData = data.filter(
    (assignment) =>
      (branchFilter === "" || assignment.branch === branchFilter) &&
      (adminFilter === "" ||
        assignment.admins.some((admin) => admin.includes(adminFilter))) &&
      (countryFilter === "" || assignment.country === countryFilter)
  );

  const toggleSelection = (id: string) => {
    setSelectedAssignments((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = (checked: boolean) => {
    setSelectedAssignments(checked ? filteredData.map((item) => item.id) : []);
  };

  const areAllSelected = selectedAssignments.length === filteredData.length;

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedAssignments.map(id => 
        axios.delete(`attendance-manager.akwaabahr.com/api/device-assignments?id=${id}`)
      ));
      onDelete();
      setSelectedAssignments([]);
      toast({
        title: "Success",
        description: "Selected assignments deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting assignments:', error);
      toast({
        title: "Error",
        description: "Failed to delete assignments. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`attendance-manager.akwaabahr.com/api/device-assignments?id=${id}`);
      onDelete();
      toast({
        title: "Success",
        description: "Assignment deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting assignment:', error);
      toast({
        title: "Error",
        description: "Failed to delete assignment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (assignment: DeviceAssignment) => {
    try {
      await axios.put('attendance-manager.akwaabahr.com/api/device-assignments', assignment);
      onEdit();
      toast({
        title: "Success",
        description: "Assignment updated successfully",
      });
    } catch (error) {
      console.error('Error updating assignment:', error);
      toast({
        title: "Error",
        description: "Failed to update assignment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<DeviceAssignment>[] = [
    {
      accessorKey: "country",
      header: ({ table }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={areAllSelected}
            onCheckedChange={(checked) => toggleSelectAll(!!checked)}
          />
          <span>Country</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={selectedAssignments.includes(row.original.id)}
            onCheckedChange={() => toggleSelection(row.original.id)}
          />
          <span>{row.original.country}</span>
        </div>
      ),
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
            <DropdownMenuItem onClick={() => handleEdit(row.original)}>
              <Button variant='default'>
                Edit
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(row.original.id)}
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
  ];

  const handleExportCSV = () => {
    console.log("Exporting CSV...");
  };

  return (
    <div className="mt-4">
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

      <DataTable columns={columns} data={filteredData} />

      <div className="flex justify-end mt-2">
        <Button variant='default' size='sm' className="bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark font-semibold mt-3">
          <CSVLink data={filteredData} onClick={handleExportCSV} className="text-sm font-bold">
            Export CSV
          </CSVLink>
        </Button>
      </div>
    </div>
  );
}

