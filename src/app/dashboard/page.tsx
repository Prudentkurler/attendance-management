"use client";
import React, { useState } from "react";

import UserGrowth from "./chart-data/user-growth";
import Metrics from "./chart-data/metrics";
import ClientDistribution from "./chart-data/client-distribution";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import firebase from "../firebase";
// import debounce from "lodash/debounce";

export default function Dashboard() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // const [clientData, setClientData] = useState(null);

  // const fetchAnalyticsData = useCallback(
  //   debounce(() => {
  //     const dbRef = firebase.database().ref("analytics");
  //     dbRef.on("value", (snapshot) => {
  //       const data = snapshot.val();
  //       setClientData(data);
  //       setLoading(false);
  //     });
  //   }, 300),
  //   []
  // );

  // useEffect(() => {
  //   fetchAnalyticsData();
  //   return () => {
  //     firebase.database().ref("analytics").off();
  //   };
  // }, [fetchAnalyticsData]);

  const KPIs = [
    { id: 1, value: 20, label: "TOTAL CLIENTS", moderate: 2, percentage: 2 },
    {
      id: 2,
      value: 200,
      label: "TOTAL CLIENTS USERS",
      moderate: 10.2,
      percentage: 2,
    },
    {
      id: 3,
      value: 20,
      label: "TOTAL ACTIVE CLIENTS",
      moderate: 10.2,
      percentage: 2,
    },
    {
      id: 4,
      value: 20,
      label: "TOTAL INACTIVE CLIENTS",
      moderate: 10.2,
      percentage: 2,
    },
    {
      id: 5,
      value: 40,
      label: "TOTAL EXPIRY CLIENTS",
      moderate: 10.2,
      percentage: 2,
    },
    {
      id: 6,
      value: 67,
      label: "TOTAL NON-EXPIRY CLIENTS",
      moderate: 10.2,
      percentage: 2,
    },
    {
      id: 7,
      value: 10,
      label: "TOTAL ARCHIVED CLIENTS",
      moderate: 10.2,
      percentage: 2,
    },
    {
      id: 8,
      value: 20,
      label: "TOTAL SUPER ADMIN USERS",
      moderate: 10.2,
      percentage: 2,
    },
  ];

  return (
    <div className="container space-y-6 rounded bg-background p-4">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1>Main Dashboard</h1>

        <div className="flex flex-wrap items-center gap-4">
          {/* date filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "justify-start bg-background py-[19px] text-left font-normal text-ds-foreground",
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
      </header>

      <div className="space-y-10">
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {KPIs.map((item) => {
            const { id, label, moderate, percentage, value } = item;
            return (
              <div key={id} className="kpi space-y-1 rounded-xl p-4 shadow">
                <div className="">
                  <h3 className="text-3xl text-ds-foreground">{value}</h3>
                  <p className="text-sm font-semibold leading-5 text-ds-gray">
                    {label}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-[#7C8DB5]">
                  <p className="leading-5">{moderate}</p>
                  <p className="leading-5">
                    {percentage} %<span className="pl-1"> this week</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ClientDistribution />
          <UserGrowth />
        </div>

        <Metrics />
      </div>
    </div>
  );
}
