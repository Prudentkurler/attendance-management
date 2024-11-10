"use client";

import { useState } from "react";
// import firebase from '../firebase';
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Icons } from "@/components/common/Icons";
import NewPackageForm from "./form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptions } from "react-icons/sl";
import { Button } from "@/components/ui/button";

export default function ClientUsersPackage() {
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
      <h1 className="mb-4 text-2xl font-bold">Client Users Package</h1>

      <NewPackageForm />

      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between">
          <CardTitle className="text-base">Package list</CardTitle>

          {/* searchbar */}
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
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={DUMMY_DATA} />
        </CardContent>
      </Card>
    </div>
  );
}
