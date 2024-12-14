import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { CSVLink } from "react-csv";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "../ui/date-picker";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

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
  absentReason?: string;
}

export default function ViewUsers() {
  const path = usePathname()
  const isArchivesPath = path.includes('/archives-table')
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

  const [usersData, setUsersData] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('attendance-manager.akwaabahr.com/api/users');
      setUsersData(response.data);
    } catch (error) {
      console.log('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await axios.put(`attendance-manager.akwaabahr.com/api/users/${editingUser.id}`, editingUser);
      fetchUsers();
      setIsEditDialogOpen(false);
      toast({
        title: "Success",
        description: "User updated successfully",
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`attendance-manager.akwaabahr.com/api/users/${id}`);
      fetchUsers();
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      console.log('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const columns: ColumnDef<User>[] = [
    // ... (previous columns remain the same)
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "surname",
      header: "Surname",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="font-bold text-xl">...</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button variant="default" size="sm" onClick={() => handleEditClick(row.original)}>Edit</Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(row.original.id)}
              >
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: usersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [showFilters, setShowFilters] = useState<boolean>(false)

  const handleShowFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <Card className="w-full p-2 md:p-4 m-0">
      <Button className="font-semibold" onClick={handleShowFilters}>Filters</Button>

      {showFilters && (
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Search"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
          <Select
            value={filters.userType}
            onValueChange={(value) => handleFilterChange("userType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="User Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.country}
            onValueChange={(value) => handleFilterChange("country", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
            </SelectContent>
          </Select>
          {/* Add more filter inputs as needed */}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex w-full justify-end items-center my-4 gap-4">
        <Button variant="default" onClick={fetchUsers}>Refresh</Button>
        <Button variant="default" onClick={() => setIsEditDialogOpen(true)}>Add User</Button>
      </div>

      {/* Table Section */}
      <DataTable columns={columns} data={usersData} />

      {/* Export CSV button */}
      <Button className="bg-ds-primary text-ds-foreground font-semibold hover:bg-ds-primary-dark mt-4">
        <CSVLink data={usersData} filename="Users">
          Export CSV
        </CSVLink>
      </Button>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleEditDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            {/* Example: */}
            <Input
              value={editingUser?.surname || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, surname: e.target.value} : null)}
              placeholder="Surname"
            />
            <Input
              value={editingUser?.email || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, email: e.target.value} : null)}
              placeholder="Email"
            />
            <Input
              value={editingUser?.phone || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, phone: e.target.value} : null)}
              placeholder="Phone"
            />
            <Select
              value={editingUser?.gender || ''}
              onValueChange={(value) => setEditingUser(prev => prev ? {...prev, gender: value} : null)}
            >
              <SelectTrigger>
              <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Input
              value={editingUser?.country || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, country: e.target.value} : null)}
              placeholder="Country"
            />
            <Input
              value={editingUser?.branch || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, branch: e.target.value} : null)}
              placeholder="Branch"
            />
            <Input
              value={editingUser?.category || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, category: e.target.value} : null)}
              placeholder="Category"
            />
            <Input
              value={editingUser?.group || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, group: e.target.value} : null)}
              placeholder="Group"
            />
            <Input
              value={editingUser?.subgroup || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, subgroup: e.target.value} : null)}
              placeholder="Subgroup"
            />
            <Input
              value={editingUser?.status || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, status: e.target.value} : null)}
              placeholder="Status"
            />
            <Textarea
              value={editingUser?.absentReason || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, absentReason: e.target.value} : null)}
              placeholder="Absent Reason"
            />
            <Input
              value={editingUser?.firstName || ''}
              onChange={(e) => setEditingUser(prev => prev ? {...prev, firstName: e.target.value} : null)}
              placeholder="First Name"
            />
            {/* Add more fields as needed */}
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

