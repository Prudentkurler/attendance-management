"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccessSyncCodeForm from "./create-code/page";
import { FaPlus } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SlOptions } from "react-icons/sl";
import { Icons } from "@/components/common/Icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import firebase from "../firebase";

export default function DesktopSyncAccessCode() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  //   useEffect(() => {
  //     const fetchClients = async () => {
  //       const clientsRef = firebase.database().ref("clients");
  //       clientsRef.on("value", (snapshot) => {
  //         const data = snapshot.val();
  //         setClients(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
  //       });
  //     };

  //     const fetchAccessCodes = async () => {
  //       const codesRef = firebase.database().ref("desktopSyncAccessCodes");
  //       codesRef.on("value", (snapshot) => {
  //         const data = snapshot.val();
  //         setAccessCodes(
  //           Object.keys(data).map((key) => ({ id: key, ...data[key] }))
  //         );
  //       });
  //     };

  //     fetchClients();
  //     fetchAccessCodes();
  //   }, []);

  // const generateAccessCode = () => {
  //   const randomCode = Math.random()
  //     .toString(36)
  //     .substring(2, 10)
  //     .toUpperCase();
  //   setFormData({ ...formData, accessCode: randomCode });
  // };

  const columns: ColumnDef<Record<string, any>>[] = [
    // client
    {
      accessorKey: "client",
      header: "Client",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.client}</span>
      ),
    },

    // data_sync_module
    {
      accessorKey: "data_sync_module",
      header: "Data sync module",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.data_sync_module}</span>
      ),
    },

    // monthly_data_storage_fee
    {
      accessorKey: "monthly_data_storage_fee",
      header: "Monthly data storage fee",
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original.monthly_data_storage_fee}
        </span>
      ),
    },

    // outstanding_data_storage_bill
    {
      accessorKey: "outstanding_data_storage_bill",
      header: "Outstanding data storage bill",
      cell: ({ row }) => (
        <span className="capitalize">
          {row.original.outstanding_data_storage_bill}
        </span>
      ),
    },

    // last_data_storage_payment
    {
      accessorKey: "online_sync.start_date",
      header: "Last data storage amount",
      cell: ({ row }) => {
        const startDate = row.original.last_data_storage_payment
          ? new Date(row.original.last_data_storage_payment)
          : undefined;

        return (
          <span>{startDate ? format(startDate, "MM/dd/yyyy") : "N/A"}</span>
        );
      },
    },

    // access code
    {
      accessorKey: "access_code",
      header: "Access code",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.access_code}</span>
      ),
    },

    // online_sync.start_date
    {
      accessorKey: "online_sync.start_date",
      header: "Start date",
      cell: ({ row }) => {
        const startDate = row.original.online_sync.start_date
          ? new Date(row.original.online_sync.start_date)
          : undefined;

        return (
          <span>{startDate ? format(startDate, "MM/dd/yyyy") : "N/A"}</span>
        );
      },
    },

    // online_sync.start_date
    {
      accessorKey: "online_sync.end_date",
      header: "Start date",
      cell: ({ row }) => {
        const date = row.original.online_sync.end_date
          ? new Date(row.original.online_sync.end_date)
          : undefined;

        return <span>{date ? format(date, "MM/dd/yyyy") : "N/A"}</span>;
      },
    },

    // payment status
    {
      accessorKey: "payment_status",
      header: "Payment status",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.payment_status}</span>
      ),
    },

    // action
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
              <Button size="sm" className="cancel-btn h-5">
                Cancel
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button size="sm" className="delete-btn h-5">
                Deactivate desktop
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const DUMMY_DATA = [
    {
      client: "xyz ventures",
      data_sync_module: "one",
      monthly_data_storage_fee: 0,
      outstanding_data_storage_bill: 0,
      last_data_storage_payment: new Date("12/12/24"),
      access_code: "ad44vv556",
      online_sync: {
        start_date: new Date(),
        end_date: new Date(),
      },
      payment_status: "paid",
      // total_bill: 0,
    },
  ];

  return (
    <div className="container mx-auto space-y-4 rounded bg-background p-4">
      <header className="flex items-center gap-4 md:justify-between">
        <h1 className="text-2xl font-bold">Desktop Sync Access Code</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-ds-primary-dark">
              <FaPlus />
              <span>Create access code</span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            {/* ***** */}
            <AccessSyncCodeForm />
          </DialogContent>
        </Dialog>
      </header>

      <Card>
        <CardHeader className="items-center md:flex-row md:justify-between">
          <CardTitle className="text-base">Access codes</CardTitle>

          {/* filters */}
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {/* date range picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "justify-start bg-background py-[19px] text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 size-4" />
                  {date?.from ? (
                    date.to ? (
                      <div>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </div>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={date}
                  onSelect={(value) => {
                    setDate(value);
                  }}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>

            {/* serchbar */}
            <div className="relative">
              <Icons.Search className="absolute left-[10px] top-[9px] size-4" />
              <input
                type="text"
                placeholder="Search"
                className="rounded-lg border border-ds-light-gray p-1 px-8"
              />
            </div>

            {/* select option */}
            <Select value=''>
              <SelectTrigger className="max-w-[200px]">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="one">One</SelectItem>
                <SelectItem value="two">Two</SelectItem>
                <SelectItem value="three">Three</SelectItem>
              </SelectContent>
            </Select>

            {/* select option */}
            <Select value=''>
              <SelectTrigger className="max-w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inative">Inative</SelectItem>
                <SelectItem value="deactivated">Deactivated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <DataTable columns={columns} data={DUMMY_DATA} />

          <div className="flex items-center justify-between">
            {/* pagination */}
            <div></div>

            <div className="hidden items-center gap-4">
              <button className="rounded-md bg-ds-gray px-3 py-2 text-sm text-background">
                Archive all
              </button>

              <button className="rounded-md bg-ds-red px-3 py-2 text-sm text-background">
                export csv
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
