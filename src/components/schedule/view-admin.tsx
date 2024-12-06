"use client";

import React, { useState, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";

const ViewAssignedAdminSchedulesPage = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    country: "",
    branch: "",
    admin: "",
    attendance: "",
  });

  const data = [
    {
      id: 1,
      admin: "Admin 1",
      attendance: "Present",
      event: "Event 1",
      role: "Editor",
      country: "Country 1",
      branch: "Branch 1",
      category: "Category 1",
      group: "Group 1",
      subgroup: "Subgroup 1",
    },
    {
      id: 2,
      admin: "Admin 2",
      attendance: "Absent",
      event: "Event 2",
      role: "Viewer",
      country: "Country 2",
      branch: "Branch 2",
      category: "Category 2",
      group: "Group 2",
      subgroup: "Subgroup 2",
    },
  ];

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesCountry = !filters.country || row.country === filters.country;
      const matchesBranch = !filters.branch || row.branch === filters.branch;
      const matchesAdmin = !filters.admin || row.admin === filters.admin;
      const matchesAttendance =
        !filters.attendance || row.attendance === filters.attendance;
      return matchesCountry && matchesBranch && matchesAdmin && matchesAttendance;
    });
  }, [filters, data]);

  const handleCheckAll = (isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows(filteredData.map((row) => row.id)); // Select all filtered rows
    } else {
      setSelectedRows([]); // Deselect all rows
    }
  };

  const handleRowCheck = (id: number, isChecked: boolean) => {
    setSelectedRows((prev) =>
      isChecked ? [...prev, id] : prev.filter((rowId) => rowId !== id)
    );
  };

  const columns: ColumnDef<typeof data[0]>[] = [
    {
      header: ({ table }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={
              selectedRows.length === filteredData.length && filteredData.length > 0
            }
            onCheckedChange={handleCheckAll}
          />
          <span>Admin</span>
        </div>
      ),
      accessorKey: "admin",
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={selectedRows.includes(row.original.id)}
            onCheckedChange={(isChecked: boolean) =>
              handleRowCheck(row.original.id, isChecked)
            }
          />
          <span>{row.original.admin}</span>
        </div>
      ),
    },
    { header: "Attendance", accessorKey: "attendance" },
    { header: "Event", accessorKey: "event" },
    { header: "Role", accessorKey: "role" },
    { header: "Country", accessorKey: "country" },
    { header: "Branch", accessorKey: "branch" },
    { header: "Category", accessorKey: "category" },
    { header: "Group", accessorKey: "group" },
    { header: "Subgroup", accessorKey: "subgroup" },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: { row: any }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => console.log("Editing row:", row.original.id)}
            >
              <Button variant='default' size='sm'>
                Edit
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Deleting row:", row.original.id)}
            >
              <Button variant='destructive' size='sm'>
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const [showFilters, setShowFilters] = useState(false);
  const handleShowFilters = () => setShowFilters(!showFilters);

  return (
    <div className="p-4">

            <div className="flex justify-between items-center mb-4">


      <h1 className="md:text-2xl text-lg font-bold"> Admin Schedules</h1>

      <Button onClick={handleShowFilters}>
            {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            </div>
        
{
    showFilters && (

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, country: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Country 1">Country 1</SelectItem>
              <SelectItem value="Country 2">Country 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, branch: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Branch 1">Branch 1</SelectItem>
              <SelectItem value="Branch 2">Branch 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
         
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, admin: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Admin 1">Admin 1</SelectItem>
              <SelectItem value="Admin 2">Admin 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          
          <Select
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, attendance: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Attendance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )}
        

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default ViewAssignedAdminSchedulesPage;
