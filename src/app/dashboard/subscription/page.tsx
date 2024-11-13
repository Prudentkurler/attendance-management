"use client";

import { useState } from "react";
// import firebase from '../firebase';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/common/Icons";
import { FaPlus } from "react-icons/fa6";
import SubscriptionForm from "./create-subscription/page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlOptions } from "react-icons/sl";
import { Button } from "@/components/ui/button";
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

export default function ViewServiceModules() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const fetchModules = () => {
  //     const dbRef = firebase
  //       .database()
  //       .ref("serviceModules")
  //       .limitToFirst(modulesPerPage * currentPage);
  //     dbRef.on("value", (snapshot) => {
  //       const data = snapshot.val();
  //       const moduleArray = Object.keys(data).map((key) => ({
  //         id: key,
  //         ...data[key],
  //       }));
  //       setModules(moduleArray);
  //       setFilteredModules(moduleArray);
  //       setLoading(false);
  //     });
  //   };

  //   fetchModules();
  //   return () => {
  //     firebase.database().ref("serviceModules").off();
  //   };
  // }, [currentPage]);

  // const handleSearch = useCallback(
  //   debounce((query) => {
  //     setSearchQuery(query);
  //     const filtered = modules.filter((module) =>
  //       module.name.toLowerCase().includes(query.toLowerCase())
  //     );
  //     setFilteredModules(filtered);
  //   }, 300),
  //   [modules]
  // );

  // const handlePageChange = (page) => setCurrentPage(page);

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "module_name",
      header: "Module name",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.module_name}</span>
      ),
    },

    {
      accessorKey: "usd_unit_fee",
      header: "USD unit fee",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.usd_unit_fee}</span>
      ),
    },

    {
      accessorKey: "ghs_unit_fee",
      header: "GHS unit fee",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.ghs_unit_fee}</span>
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
      module_name: "Attendance manager",
      usd_unit_fee: 200,
      ghs_unit_fee: 200,
      created_on: "25 / 5 / 24",
    },
  ];

  return (
    <div className="container mx-auto rounded bg-background p-4">
      <h1 className="mb-4 text-2xl font-bold">Manage Subscriptions</h1>

      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm">
                  <FaPlus />
                  <span>Add subscription</span>
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <SubscriptionForm />
              </DialogContent>
            </Dialog>
          </CardTitle>

          {/* filters */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
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

            {/* search */}
            <div className="relative max-w-xl">
              <Icons.Search className="absolute left-[8px] top-[9px] size-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-ds-light-gray p-1 px-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            {/* select filter */}
            <Select value=''>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter" className="capitalize" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="account-admin">Account admin</SelectItem>
                <SelectItem value="status-admin">Status admin</SelectItem>
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
