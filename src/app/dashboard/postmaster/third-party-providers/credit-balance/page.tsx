"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
// import firebase from "../firebase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Icons } from "@/components/common/Icons";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

export default function CreditBalance() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // useEffect(() => {
  //   const fetchProviders = () => {
  //     const dbRef = firebase.database().ref("thirdPartyProviders");
  //     dbRef.on("value", (snapshot) => {
  //       const data = snapshot.val();
  //       const providerArray = Object.keys(data).map((key) => ({
  //         id: key,
  //         ...data[key],
  //       }));
  //       setProviders(providerArray);
  //       setLoading(false);
  //     });
  //   };

  //   fetchProviders();
  //   return () => {
  //     firebase.database().ref("thirdPartyProviders").off();
  //   };
  // }, []);

  // const handleDeleteProvider = async (providerId) => {
  //   await firebase.database().ref(`thirdPartyProviders/${providerId}`).remove();
  //   setProviders(providers.filter((provider) => provider.id !== providerId));
  // };

  const columns: ColumnDef<Record<string, any>>[] = [
    {
      accessorKey: "provider_name",
      header: "Provider",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.provider_name}</span>
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
      accessorKey: "last_credit",
      header: "Last credit",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.last_credit}</span>
      ),
    },

    {
      accessorKey: "date_bought",
      header: "Date bought",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.date_bought}</span>
      ),
    },

    {
      accessorKey: "credit_available",
      header: "Credit available",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.credit_available}</span>
      ),
    },
  ];

  const DUMMY_DATA = [
    {
      provider_name: "MTN GH",
      service_type: "SMS",
      last_credit: 200,
      date_bought: "25/2/24",
      credit_available: 200,
    },
  ];

  return (
    <div className="container bg-background">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">
            Third-Party Credit Balance
          </CardTitle>

          {/* filters */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            {/* date filter */}
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
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
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
              <Icons.Search className="absolute left-[10px] top-[10px] size-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border border-ds-light-gray p-2 px-10"
              />
            </div>

            {/* select filter */}
            <Select value=''>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select service provider"
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
