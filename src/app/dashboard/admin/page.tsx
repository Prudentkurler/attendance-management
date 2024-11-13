"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SlOptions } from "react-icons/sl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import firebase from "../firebase";
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";
import { Icons } from "@/components/common/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaPlus } from "react-icons/fa6";
import CreateAdminForm from "./create-admin/page";
import { Button } from "@/components/ui/button";

export default function ViewAdmins() {
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const fetchAdmins = () => {
  //     const dbRef = firebase
  //       .database()
  //       .ref("admins")
  //       .limitToFirst(adminsPerPage * currentPage);
  //     dbRef.on("value", (snapshot) => {
  //       const data = snapshot.val();
  //       const adminArray = Object.keys(data).map((key) => ({
  //         id: key,
  //         ...data[key],
  //       }));
  //       setAdmins(adminArray);
  //       setFilteredAdmins(adminArray);
  //       setLoading(false);
  //     });
  //   };

  //   fetchAdmins();
  //   return () => {
  //     firebase.database().ref("admins").off();
  //   };
  // }, [currentPage]);

  // const handleSearch = useCallback(
  //   debounce((query) => {
  //     setSearchQuery(query);
  //     const filtered = admins.filter(
  //       (admin) =>
  //         admin.firstName.toLowerCase().includes(query.toLowerCase()) ||
  //         admin.email.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredAdmins(filtered);
  //   }, 300),
  //   [admins]
  // );

  // const handlePageChange = (page) => setCurrentPage(page);

  // const exportToCSV = () => {
  //   const csvData = new Parser().parse(filteredAdmins);
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.setAttribute("download", "admins.csv");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <p className="capitalize">{row.original.name}</p>,
    },

    {
      accessorKey: "profile",
      header: "Profile",
      cell: () => <div className="size-14 rounded-full bg-ds-gray" />,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.status}</span>
      ),
    },

    {
      accessorKey: "",
      header: "Action",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SlOptions />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button size="sm" className="edit-btn h-5">
                Edit
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Button size="sm" className="suspend-btn h-5">
                Suspend
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Button size="sm" className="delete-btn h-5">
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const DUMMY_DATA = [
    {
      name: "john",
      profile: "profile",
      status: "Limited",
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const KPIs = [
    {
      id: 1,
      value: 20,
      label: "total admins",
      moderate: 2.56,
      percentage: 2,
      bg: "#00C49F",
    },
    {
      id: 2,
      value: 200,
      label: "total super admins",
      moderate: 10.2,
      percentage: 2,
      bg: "#0088FE",
    },

    {
      id: 3,
      value: 200,
      label: "total agent admins",
      moderate: 10.2,
      percentage: 2,
      bg: "#FF8042",
    },
    {
      id: 4,
      value: 200,
      label: "total assigned clients",
      moderate: 10.2,
      percentage: 2,
      background: "#FFBB28",
    },
  ];

  return (
    <div className="container space-y-10 overflow-auto rounded bg-background">
      <h1>Manage Admin</h1>

      {/* cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {KPIs.map((item, index) => {
          const { id, label, value } = item;
          return (
            <div
              key={id}
              style={{ backgroundColor: COLORS[index] }}
              className={`kpi space-y-3 rounded-xl p-6 shadow`}
            >
              <div className="space-y-1">
                <h3 className="text-5xl font-bold text-background">{value}</h3>
                <p className="text-sm font-semibold uppercase text-background/95">
                  {label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* table */}
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between">
          <CardTitle className="text-base">Admin Users</CardTitle>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm">
                  <FaPlus />
                  <span>Add admin</span>
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <CreateAdminForm />
              </DialogContent>
            </Dialog>

            <div className="relative max-w-xl">
              <Icons.Search className="absolute left-[10px] top-[9px] size-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-ds-light-gray p-1 px-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value=''>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="super admin">Super admin</SelectItem>
                <SelectItem value="agent admin">Agent admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <DataTable columns={columns} data={DUMMY_DATA} />

          <div className="flex items-center justify-between">
            {/* pagination */}
            <div></div>

            <div className="flex items-center gap-4">
              <button className="rounded-md bg-ds-gray px-3 py-2 text-sm text-background">
                Archive all
              </button>

              <button className="rounded-md bg-ds-red px-3 py-2 text-sm text-background">
                Export csv
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
