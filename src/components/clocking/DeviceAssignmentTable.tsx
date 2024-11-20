import { Button} from "@/components/ui/button";
import {  Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {DataTable} from '@/components/ui/data-table'
import { ColumnDef } from "@tanstack/react-table";



interface DeviceAssignmentTableProps {
    data: {
        branch: string;
        admins: string[];
        devices: string[];
    }[];
    branchFilter: string;
    adminFilter: string;
    setAssignments: React.Dispatch<
        React.SetStateAction<{
        branch: string;
        admins: string[];
        devices: string[];
        }[]>
    >;
    }

    interface AssignmentData {
        branch: string;
        admins: string[];
        devices: string[];
    }

    const columns: ColumnDef<AssignmentData>[] = [
        {
          accessorKey: 'timestamp',
          header: 'Last Update',
        },
        {
          accessorKey: 'updatedBy',
          header: 'Updated By',
        },  
        {
          accessorKey: 'totalUsers',
          header: 'Total Users',
        },
        {
          accessorKey: 'lastNotification',
          header: 'Last Notification',
        },
        {
          accessorKey: 'medium',
          header: 'Medium',
        },
      ];
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

  // Toggle assignment selection
const toggleSelection = (index: number) => {
    setSelectedAssignments((prev) =>
        prev.includes(index)
            ? prev.filter((i) => i !== index)
            : [...prev, index]
    );
};

  // Delete selected assignments
  const handleDeleteSelected = () => {
    setAssignments((prev) =>
      prev.filter((_, index) => !selectedAssignments.includes(index))
    );
    setSelectedAssignments([]);
  };

  return (
    <div className="mt-4">
      {/* Bulk Actions */}
      <div className="flex justify-end items-center gap-2 mb-2">
        <Checkbox
          checked={selectedAssignments.length === filteredData.length}
          onChange={(e) =>
            setSelectedAssignments(
              (e.target as HTMLInputElement).checked ? filteredData.map((_, i) => i) : []
            )
          }
        />
        <Button size='sm' variant="destructive" onClick={handleDeleteSelected}>
          Delete Selected
        </Button>
      </div>

      {/* Table */}


      <DataTable columns={columns} data={filteredData}/>
    </div>
  );
}
