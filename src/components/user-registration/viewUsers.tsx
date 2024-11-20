import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  DataTable
} from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card } from "../ui/card";

interface User {
  id: string;
  profileImage: string;
  title: string;
  firstName: string;
  middleName: string;
  surname: string;
  gender: string;
  phone: string;
  whatsapp: string;
  email: string;
  dateRegistered: string;
  country: string;
  branch: string;
  category: string;
  group: string;
  subgroup: string;
  status: string;
}

const usersData: User[] = [
  {
    id: "1",
    profileImage: "/placeholder.jpg",
    title: "Mr.",
    firstName: "John",
    middleName: "William",
    surname: "Doe",
    gender: "Male",
    phone: "123456789",
    whatsapp: "123456789",
    email: "john.doe@example.com",
    dateRegistered: "2024-01-01",
    country: "USA",
    branch: "New York",
    category: "IT",
    group: "Development",
    subgroup: "Backend",
    status: "Activated",
  },

  // Add more sample users here
];

export default function ViewUsers() {
  const [filters, setFilters] = useState({
    userType: "",
    country: "",
    branch: "",
    category: "",
    group: "",
    subgroup: "",
    gender: "",
    status: "",
    search: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const columns: ColumnDef<User>[] = [
    {
      id: "checkbox",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) =>
            table.toggleAllRowsSelected(!!value)
          }
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) =>
            row.toggleSelected(!!value)
          }
        />
      ),
    },
    {
      accessorKey: "profileImage",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.original.profileImage}
          alt={row.original.firstName}
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "middleName", header: "Middle Name" },
    { accessorKey: "surname", header: "Surname" },
    { accessorKey: "gender", header: "Gender" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "whatsapp", header: "WhatsApp" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "id", header: "ID" },
    { accessorKey: "dateRegistered", header: "Date Registered" },
    { accessorKey: "country", header: "Country" },
    { accessorKey: "branch", header: "Branch" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "group", header: "Group" },
    { accessorKey: "subgroup", header: "Subgroup" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded text-white ${
            row.original.status === "Activated" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <Card className="w-full p-2 md:p-4 m-0">
      {/* Filters Section */}
      <div className="flex overflow-auto gap-4 mb-6">
      <Input
            className="w-[150px] md:w-auto"
          placeholder="Search by Name, Clocking ID, or Staff ID"
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
        <Select onValueChange={(value) => handleFilterChange("userType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Individual">Individual</SelectItem>
            <SelectItem value="Organization">Organization</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("country", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USA">USA</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("branch", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="New York">New York</SelectItem>
            <SelectItem value="Toronto">Toronto</SelectItem>
          </SelectContent>
        </Select>
    
        <Button onClick={() => console.log("Apply filters:", filters)}>Apply Filters</Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={usersData} />
    </Card>
  );
}
    