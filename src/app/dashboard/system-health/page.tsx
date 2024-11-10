"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

// import firebase from "../firebase";
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptions } from "react-icons/sl";
import { Button } from "@/components/ui/button";

export default function SystemDiagnostic() {
  const setStatus = (arg: string): JSX.Element | null => {
    let status: JSX.Element | null;

    switch (arg) {
      case "healthy":
        status = <span className="block size-3 rounded-full bg-green-500" />;
        break;
      case "warning":
        status = <span className="block size-3 rounded-full bg-yellow-500" />;
        break;
      case "critical":
        status = <span className="block size-3 rounded-full bg-red-500" />;
        break;
      default:
        status = null;
    }

    return status;
  };

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "module_name",
      header: "Module name",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.module_name}</span>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <p className="flex items-center gap-2 capitalize">
          {setStatus(row.original.status)}
          {row.original.status}
        </p>
      ),
    },

    {
      accessorKey: "load",
      header: "Load",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.load}</span>
      ),
    },

    {
      accessorKey: "errors",
      header: "Errors",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.errors}</span>
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
              <Button size="sm" className="h-5 bg-ds-gray">
                Troubleshoot
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Button size="sm" className="h-5 bg-ds-gray">
                View detailed log
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const DUMMY_DATA = [
    {
      module_name: "Database manager",
      status: "healthy",
      load: "50%",
      errors: 0,
    },

    {
      module_name: "Database manager",
      status: "warning",
      load: "50%",
      errors: 0,
    },

    {
      module_name: "Database manager",
      status: "critical",
      load: "50%",
      errors: 0,
    },
  ];

  return (
    <div className="container mx-auto space-y-6 overflow-auto rounded bg-background px-6">
      <h2> System Health</h2>

      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={DUMMY_DATA} />
        </CardContent>
      </Card>

      <div className="space-y-2">
        <p className="font-semibold text-ds-foreground">
          Recent activity (last 24 hrs)
        </p>

        <ul className="flex flex-col">
          <li className="text-sm">
            Payroll manager (
            <span className="font-semibold"> 5 errors resolved</span>)
          </li>

          <li className="text-sm">
            Attendance manager (
            <span className="font-semibold">2 users experiencing delays</span>)
          </li>
        </ul>
      </div>
    </div>
  );
}
