"use client";

// import firebase from "../firebase";

// import firebase from "../firebase";
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FaPlus } from "react-icons/fa6";
import ClientCreditTopUpForm from "./form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ViewClientCredits() {
  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "client_name",
      header: "Client",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.client_name}</span>
      ),
    },

    {
      accessorKey: "service_type",
      header: "Service type",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.service_type}</span>
      ),
    },

    {
      accessorKey: "credit_purchased",
      header: "Credit purchased",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.credit_purchased}</span>
      ),
    },

    {
      accessorKey: "credit_used",
      header: "Credit used",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.credit_used}</span>
      ),
    },
    {
      accessorKey: "credit_unused",
      header: "Credit unused",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.credit_unused}</span>
      ),
    },
  ];

  const DUMMY_DATA = [
    {
      client_name: "abc capitals",
      service_type: "sms",
      credit_purchased: 200,
      credit_used: 150,
      credit_unused: 50,
    },
  ];

  return (
    <section className="container space-y-4">
      <h2>Manage Clients Credit</h2>

      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="text-base">
            View Clients Credits Purchased / Used
          </CardTitle>

          <div className="flex flex-wrap items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm">
                  <FaPlus />
                  <span>Top up</span>
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <ClientCreditTopUpForm />
              </DialogContent>
            </Dialog>

            <Select value=''>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Client type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Client</SelectItem>
                <SelectItem value="agent admin">Agent admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={DUMMY_DATA} />
        </CardContent>
      </Card>
    </section>
  );
}
