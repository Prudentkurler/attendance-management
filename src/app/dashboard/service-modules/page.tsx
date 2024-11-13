"use client";

// import firebase from '../firebase';
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogHeader,
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
import ServiceModuleForm from "./create/page";
import CreateServiceModuleFee from "./fees/page";

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
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

export default function ViewServiceModules() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const columns: ColumnDef<Record<string, string>>[] = [
    {
      accessorKey: "module_name",
      header: "Module name",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.module_name}</span>
      ),
    },

    {
      accessorKey: "created_at",
      header: "Date created",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.created_at}</span>
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
      created_at: "25/5/24",
    },
  ];

  return (
    <div className="container mx-auto rounded bg-background p-4">
      <h1 className="mb-4 text-2xl font-bold">Manage Service Modules</h1>

      {/* filters */}
      <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
        <div className="relative max-w-xl">
          <Icons.Search className="absolute left-[10px] top-[10px] size-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg border border-ds-light-gray p-2 px-10"
            // value={searchQuery}
            // onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* date range picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "justify-start bg-foreground/5 py-[19px] text-left font-normal",
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
      </div>

      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="flex flex-wrap items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm">
                  <FaPlus />
                  <span>Add service module</span>
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <ServiceModuleForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <button className="create-new-btn flex items-center gap-2 rounded-md px-3 py-2 text-sm">
                  <FaPlus />
                  <span>Add service module fee</span>
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <CreateServiceModuleFee />
              </DialogContent>
            </Dialog>
          </CardTitle>

          <Select value=''>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" className="capitalize" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="option 1">Option 1</SelectItem>
              <SelectItem value="option 2">Op</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        <CardContent>
          <DataTable columns={columns} data={DUMMY_DATA} />
        </CardContent>
      </Card>
    </div>
  );
}
