import React, { useState, useRef } from "react";
import { useReactTable } from "@tanstack/react-table";
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getCoreRowModel } from "@tanstack/react-table"; 

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

const initialUsersData: User[] = [
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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

  const [usersData, setUsersData] = useState<User[]>(initialUsersData);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
  };
  const columns: ColumnDef<User>[] = [
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
        <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="font-bold text-xl">...</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
             
                  <Button variant="default" size="sm" onClick={handleEditClick}>Edit</Button>

                  </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  // Remove the user from the table
                  setUsersData(usersData.filter((user) => user.id !== row.original.id));
                }}
              >
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
                  <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogClose}>
                
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>Update the user's information.</DialogDescription>
                  </DialogHeader>
                  {/* Add form fields to edit the user's information */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Update the user information
                      setUsersData(
                        usersData.map((user) => {
                          if (user.id === row.original.id) {
                            return {
                              ...user,
                              title: titleInput.current?.value || "",
                              firstName: firstNameInput.current?.value || "",
                              middleName: middleNameInput.current?.value || "",
                              surname: surnameInput.current?.value || "",
                              gender: genderInput.current?.value || "",
                              phone: phoneInput.current?.value || "",
                              whatsapp: whatsappInput.current?.value || "",
                              email: emailInput.current?.value || "",
                              country: countryInput.current?.value || "",
                              branch: branchInput.current?.value || "",
                              category: categoryInput.current?.value || "",
                              group: groupInput.current?.value || "",
                              subgroup: subgroupInput.current?.value || "",
                              status: statusInput.current?.value || "",
                            };
                          }
                          return user;
                        })
                      );
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        ref={titleInput}
                        defaultValue={row.original.title}
                      />
                      <Input
                        ref={firstNameInput}
                        defaultValue={row.original.firstName}
                      />
                      <Input
                        ref={middleNameInput}
                        defaultValue={row.original.middleName}
                      />
                      <Input
                        ref={surnameInput}
                        defaultValue={row.original.surname}
                      />
                      <Select
                        value='genderInput'
                        defaultValue={row.original.gender}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        ref={phoneInput}
                        defaultValue={row.original.phone}
                      />
                      <Input
                        ref={whatsappInput}
                        defaultValue={row.original.whatsapp}
                      />
                      <Input
                        ref={emailInput}
                        defaultValue={row.original.email}
                      />
                      <Select
                        value='countryInput'
                        defaultValue={row.original.country}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value='branchInput'
                        defaultValue={row.original.branch}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New York">New York</SelectItem>
                          <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value='categoryInput'
                        defaultValue={row.original.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value='groupInput'
                        defaultValue={row.original.group}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="Accounting">Accounting</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value='subgroupInput'
                        defaultValue={row.original.subgroup}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Subgroup" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Backend">Backend</SelectItem>
                          <SelectItem value="Frontend">Frontend</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value='statusInput'
                        defaultValue={row.original.status}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Activated">Activated</SelectItem>
                          <SelectItem value="Deactivated">Deactivated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              </>
           
      ),
    },
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
  ];
  const table = useReactTable({
    data: usersData,
    columns,
    getCoreRowModel: getCoreRowModel(), 
  });

  const titleInput = useRef<HTMLInputElement>(null);
  const firstNameInput = useRef<HTMLInputElement>(null);
  const middleNameInput = useRef<HTMLInputElement>(null);
  const surnameInput = useRef<HTMLInputElement>(null);
  const genderInput = useRef<HTMLSelectElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const whatsappInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const countryInput = useRef<HTMLSelectElement>(null);
  const branchInput = useRef<HTMLSelectElement>(null);
  const categoryInput = useRef<HTMLSelectElement>(null);
  const groupInput = useRef<HTMLSelectElement>(null);
  const subgroupInput = useRef<HTMLSelectElement>(null);
  const statusInput = useRef<HTMLSelectElement>(null);


  const [showFilters, setShowFilters] = useState<boolean>(false)

  const handleShowFilters =()=>{
    setShowFilters(!showFilters)
  }
 
  return (
    <Card className="w-full p-2 md:p-4 m-0">



      
     
      {/* Filters Section */}

      {
        showFilters &&(

      <div className="flex flex-col md:flex-row gap-4 mb-4">
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
            <SelectItem value="Los Angeles">Los Angeles</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IT">IT</SelectItem>
            <SelectItem value="Finance">Finance</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("group", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="Accounting">Accounting</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("subgroup", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Subgroup" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Backend">Backend</SelectItem>
            <SelectItem value="Frontend">Frontend</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Activated">Activated</SelectItem>
            <SelectItem value="Deactivated">Deactivated</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-1/3 md:w-[150px]" onClick={() => setFilters({
          userType: "",
          country: "",
          branch: "",
          category: "",
          group: "",
          subgroup: "",
          gender: "",
          status: "",
          search: "",
        })}>
          Clear Filters
        </Button>
      </div>

)
}

<Button className="font-semibold" onClick={handleShowFilters}>Filters</Button>


        {/* Action Buttons */}
        <div className="flex w-full justify-end items-center my-4 gap-4">
        <Button
        variant='destructive'
        className="text-white font-semibold"
        size='sm'
          onClick={() => {
            // Delete all selected users
            setUsersData(usersData.filter((user) => !table.getSelectedRowModel().rows.some((row) => row.original.id === user.id)));
          }}
        >
          Delete All 
        </Button>
        <Button
        size='sm'
        className="bg-green-600 text-white font-semibold"
          onClick={() => {
            // Activate all selected users
            setUsersData(usersData.map((user) => {
              if (table.getSelectedRowModel().rows.some((row) => row.original.id === user.id)) {
                return { ...user, status: "Activated" };
              }
              return user;
            }));
          }}
        >
          Activate All 
        </Button>
        <Button
        size='sm'
        className=" text-white font-semibold"
          onClick={() => {
            // Deactivate all selected users
            setUsersData(usersData.map((user) => {
              if (table.getSelectedRowModel().rows.some((row) => row.original.id === user.id)) {
                return { ...user, status: "Deactivated" };
              }
              return user;
            }));
          }}
        >
          Deactivate All 
        </Button>
      </div>

      {/* Table Section */}
      <DataTable columns={columns} data={usersData} />

    
    </Card>
  );
}




