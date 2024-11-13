"use client";

import { Icons } from "@/components/common/Icons";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import SetActivationFeeForm from "./form";

// import firebase from "../firebase";

export default function OneTimeActivationFee() {
  const [searchQuery, setSearchQuery] = useState("");

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "package",
      header: "Package",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.package}</span>
      ),
    },

    {
      accessorKey: "created_on",
      header: "Created on",
      cell: ({ row }) => <span>{row.original.created_on}</span>,
    },

    {
      accessorKey: "created_by",
      header: "Created by",
      cell: ({ row }) => <span>{row.original.created_by}</span>,
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
      package: "100-200",
      created_by: "xyz",
      created_on: "22/05/2022",
    },
  ];

  return (
    <div className="container mx-auto space-y-6 overflow-auto rounded bg-background p-6">
      <header className="flex items-center gap-4 md:justify-between">
        <h1 className="mb-4 text-2xl font-bold">One-Time Activation Fee</h1>

        <Dialog>
          <DialogTrigger asChild>
            <button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm">
              <FaPlus />
              <span>Set fee</span>
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>

            <SetActivationFeeForm />
          </DialogContent>
        </Dialog>
      </header>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base text-ds-foreground">
            Activation fees
          </CardTitle>

          <div className="flex items-center justify-between gap-4">
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
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={DUMMY_DATA} />
        </CardContent>
      </Card>
    </div>
  );
}
