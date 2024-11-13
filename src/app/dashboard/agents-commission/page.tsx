"use client";

// import firebase from '../firebase';
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/common/Icons";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AgentCreditTopUpForm from "./top-up-form";
import RenewAccountForm from "./renew-account";
import { FaPlus } from "react-icons/fa6";
import CreateClientForm from "../clients/create-client/page";

export default function AgentsCommission() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const isSuperAdmin = true;

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "agent",
      header: "Agent",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.agent}</span>
      ),
    },

    {
      accessorKey: "client",
      header: "Client",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.client}</span>
      ),
    },

    {
      accessorKey: "amount_paid",
      header: "Amount paid",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.amount_paid}</span>
      ),
    },

    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.date}</span>
      ),
    },

    {
      accessorKey: "commission",
      header: "Commission",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.commission}</span>
      ),
    },

    //  only for super admins
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        if (isSuperAdmin)
          return (
            <Select value='' onValueChange={() => {}} defaultValue="">
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="full payment">Full payment</SelectItem>
                <SelectItem value="part payment">Part payment</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          );

        return <span className="capitalize">{row.original.status}</span>;
      },
    },

    // only for agent admins
    {
      accessorKey: "",
      header: "Action",
      cell: () => (
        <div className="flex flex-col gap-2">
          <Dialog>
            <DialogTrigger asChild className="max-w-[120px]">
              <Button
                size="sm"
                className="edit-btn h-6 rounded-md px-3 text-sm"
              >
                Top-up credit
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
              <AgentCreditTopUpForm />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild className="max-w-[120px]">
              <Button
                size="sm"
                className="suspend-btn h-6 max-w-[120px] px-3 text-sm"
              >
                Renew account
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
              <RenewAccountForm />
            </DialogContent>
          </Dialog>
        </div>
      ),
    },

    // add a pay now action for only super admins
  ];

  const DUMMY_DATA = [
    {
      agent: "Joe Williams",
      client: "XYZ ventures",
      amount_paid: "200",
      date: "23 / 5 / 24",
      commission: "5200",
      status: "Status",
    },
  ];

  const CARDS = [
    { id: 1, label: "SMS", value: 200 },
    { id: 1, label: "VOICE", value: 200 },
    { id: 1, label: "WHATSAPP", value: 200 },
    { id: 1, label: "EMAIL", value: 200 },
    { id: 1, label: "SMSMail", value: 200 },
    { id: 1, label: "TELEGRAM", value: 200 },
  ];

  return (
    <div className="container mx-auto space-y-8 bg-background p-4">
      <h2>Agents commissions</h2>

      {/* available credits */}
      <div className="space-y-4">
        <p className="text-lg font-bold">Available credits</p>

        <ul className="grid gap-4 lg:grid-cols-3">
          {CARDS.map((item) => {
            return (
              <li
                key={item.id}
                className="kpi gap-4 space-y-2 rounded-lg p-6 font-medium text-ds-foreground shadow"
              >
                <h3 className="text-3xl text-ds-foreground">{item.value}</h3>
                <p className="font-bold text-ds-gray">{item.label}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-between">
        {/* commission earned & paid*/}
        <div className="mb-2 flex flex-wrap items-center gap-4">
          <p className="rounded bg-ds-green px-3 py-1 text-sm leading-5 text-background">
            Total Commission Earned :{" "}
            <span className="bg-background px-[3px] font-semibold text-ds-green">
              GHS 8550
            </span>
          </p>

          <p className="rounded bg-ds-light-gray px-3 py-1 text-sm leading-5 text-ds-foreground">
            Total Commission Paid :{" "}
            <span className="bg-ds-foreground px-[3px] font-semibold text-background">
              GHS 8550
            </span>
          </p>
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
      </div>

      {/* table */}
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="text-base">Agents commission</CardTitle>

          <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
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
                    <span>Date filter</span>
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

            <div className="relative max-w-xl">
              <Icons.Search className="absolute left-[10px] top-[13px] size-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-ds-light-gray p-2 px-8"
              />
            </div>

            <Select value='' onValueChange={() => {}}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select agent"
                  className="capitalize"
                />
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
