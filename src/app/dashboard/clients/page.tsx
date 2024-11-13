"use client";

import { useState } from "react";
// import firebase from '../firebase';
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaPlus } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreateClientForm from "./create-client/page";
import { Icons } from "@/components/common/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlOptions } from "react-icons/sl";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export default function ManageClients() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const fetchClients = () => {
  //     const dbRef = firebase
  //       .database()
  //       .ref("clients")
  //       .limitToFirst(clientsPerPage * currentPage);
  //     dbRef.on("value", (snapshot) => {
  //       const data = snapshot.val();
  //       const clientArray = Object.keys(data).map((key) => ({
  //         id: key,
  //         ...data[key],
  //       }));
  //       setClients(clientArray);
  //       setFilteredClients(clientArray);
  //       setLoading(false);
  //     });
  //   };

  //   fetchClients();
  //   return () => {
  //     firebase.database().ref("clients").off();
  //   };
  // }, [currentPage]);

  // const handleSearch = useCallback(
  //   debounce((query) => {
  //     setSearchQuery(query);
  //     const filtered = clients.filter(
  //       (client) =>
  //         client.organizationName.toLowerCase().includes(query.toLowerCase()) ||
  //         client.email.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredClients(filtered);
  //   }, 300),
  //   [clients]
  // );

  // const handlePageChange = (page) => setCurrentPage(page);

  // const exportToCSV = () => {
  //   const csvData = new Parser().parse(filteredClients);
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.setAttribute("download", "clients.csv");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "client_name",
      header: "Name",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.client_name}</span>
      ),
    },

    {
      accessorKey: "created_by",
      header: "Created by",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.created_by}</span>
      ),
    },

    {
      accessorKey: "created_on",
      header: "Created on",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.created_on}</span>
      ),
    },

    {
      accessorKey: "account_type",
      header: "Acc. type",
      cell: ({ row }) => <span>{row.original.account_type}</span>,
    },

    {
      accessorKey: "subscription_date",
      header: "Subs. date",
      cell: ({ row }) => <span>{row.original.subscription_date}</span>,
    },

    {
      accessorKey: "expiry_date",
      header: "Exp.",
      cell: ({ row }) => <span>{row.original.expiry_date}</span>,
    },

    {
      accessorKey: "last_amount_paid",
      header: "Last amt. paid",
      cell: ({ row }) => <span>{row.original.last_amount_paid}</span>,
    },

    {
      accessorKey: "balance",
      header: "Bal",
      cell: ({ row }) => <span>{row.original.balance}</span>,
    },

    {
      accessorKey: "membersip_size",
      header: "Mem. size",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.membersip_size}</span>
      ),
    },

    {
      accessorKey: "total_registered_users",
      header: "Total reg. users",
      cell: ({ row }) => <span>{row.original.total_registered_users}</span>,
    },

    {
      accessorKey: "last_seen",
      header: "Last seen",
      cell: ({ row }) => <span>{row.original.last_seen}</span>,
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span>{row.original.status}</span>,
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
              <Button size="sm" className="h-5 bg-ds-green">
                Renew
              </Button>
            </DropdownMenuItem>

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

            <DropdownMenuItem>
              <Button size="sm" className="h-5 bg-ds-primary">
                Archive
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const DUMMY_DATA = [
    {
      client_name: "John & Co.",
      created_by: "Super admin",
      created_on: "23-2-23",
      account_type: "Expiry",
      membersip_size: 20,
      subscription_date: "23-2-23",
      expiry_date: "23-2-23",
      last_amount_paid: 200,
      balance: 200,
      total_registered_users: 200,
      last_seen: "35min ago",
      status: "Active",
    },
  ];

  const KPIs = [
    { id: 1, value: 20, label: "TOTAL AMOUNTS", moderate: 2.56, percentage: 2 },
    {
      id: 2,
      value: 200,
      label: "TOTAL OUTSTANDING",
      moderate: 10.2,
      percentage: 2,
    },
  ];

  return (
    <div className="container mx-auto space-y-4 overflow-auto rounded bg-background">
      {/* KPIs */}
      <div className="grid gap-4 lg:grid-cols-2">
        {KPIs.map((item) => {
          const { id, label, moderate, percentage, value } = item;
          return (
            <div key={id} className="kpi space-y-3 rounded-lg p-4 shadow">
              <div className="space-y-1">
                <h3 className="text-4xl font-bold text-ds-foreground">
                  GHS {value}.00
                </h3>
                <p className="text-sm font-semibold text-ds-gray">{label}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#7C8DB5]">
                <p className="flex items-center gap-2 leading-5">
                  <Icons.ArrowDownRight />
                  {moderate}
                </p>

                <p className="text-sm">
                  - {percentage}%
                  <span className="pl-[2px] leading-5"> this week</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* add client button */}
      <div className="ml-auto w-max">
        <Dialog>
          <DialogTrigger asChild className="justify-end">
            <button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm">
              <FaPlus />
              <span>Add client</span>
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <CreateClientForm />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="flex items-center justify-between text-base">
            Clients list
          </CardTitle>

          <div className="flex flex-wrap items-center justify-between gap-4">
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

            {/* Search bar */}
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

            {/* select filter */}
            <Select value=''>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expiry">Expiry</SelectItem>
                <SelectItem value="non-expiry">Non-Expiry</SelectItem>
                <SelectItem value="self-host">Self-Host</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          <DataTable columns={columns} data={DUMMY_DATA} />

          <div className="flex items-center justify-between">
            {/* pagination */}
            <div></div>

            {/* action buttons */}
            <div className="flex items-center gap-4">
              <button className="archive-btn rounded-md px-3 py-2 text-sm text-background">
                Archive all
              </button>

              <button className="rounded-md bg-ds-green px-3 py-2 text-sm text-background">
                Export csv
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
