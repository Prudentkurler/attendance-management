"use client";

import { useState } from "react";
// import firebase from "../firebase";
// import debounce from "lodash/debounce";
// import { Parser } from "@json2csv/plainjs";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Icons } from "@/components/common/Icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import { CalendarIcon } from "lucide-react";
// import { DateRange } from "react-day-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function AdminActivityLogs() {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  //   useEffect(() => {
  //     const fetchLogs = () => {
  //       const dbRef = firebase
  //         .database()
  //         .ref("adminActivityLogs")
  //         .limitToFirst(logsPerPage * currentPage);
  //       dbRef.on("value", (snapshot) => {
  //         const data = snapshot.val();
  //         const logArray = Object.keys(data).map((key) => ({
  //           id: key,
  //           ...data[key],
  //         }));
  //         setLogs(logArray);
  //         setFilteredLogs(logArray);
  //         setLoading(false);
  //       });
  //     };

  //     fetchLogs();
  //     return () => {
  //       firebase.database().ref("adminActivityLogs").off();
  //     };
  //   }, [currentPage]);

  //   const handleSearch = useCallback(
  //     debounce((query) => {
  //       setSearchQuery(query);
  //       const filtered = logs.filter(
  //         (log) =>
  //           log.adminName.toLowerCase().includes(query.toLowerCase()) ||
  //           log.action.toLowerCase().includes(query.toLowerCase())
  //       );
  //       setFilteredLogs(filtered);
  //     }, 300),
  //     [logs]
  //   );

  //   const handlePageChange = (page) => setCurrentPage(page);

  // const exportToCSV = () => {
  //   const csvData = new Parser().parse(filteredLogs);
  //   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   link.href = URL.createObjectURL(blob);
  //   link.setAttribute("download", "admin-activity-logs.csv");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const columns: ColumnDef<Record<string, string>>[] = [
    {
      accessorKey: "admin_name",
      header: "Admin",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.admin_name}</span>
      ),
    },

    {
      accessorKey: "date_time",
      header: "Date/Time",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.date_time}</span>
      ),
    },

    {
      accessorKey: "activity",
      header: "Activity",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.activity}</span>
      ),
    },
  ];

  const DUMMY_DATA = [
    {
      admin_name: "john",
      date_time: "12:45pm 23/07/23",
      activity: "Logged in",
    },
  ];

  return (
    <div className="container mx-auto space-y-6 overflow-auto rounded bg-background p-4">
      <Card>
        <CardHeader className="flex-row flex-wrap items-center justify-between gap-4">
          <CardTitle className="text-base">Admin Activity Logs</CardTitle>

          {/* filters */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            {/* date filter */}
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

            {/* seachbar */}
            <div className="relative max-w-md flex-1">
              <Icons.Search className="absolute left-[10px] top-[10px] size-4 text-ds-gray" />
              <input
                type="text"
                placeholder="Search"
                className="rounded-lg border border-ds-light-gray px-10 py-[6px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* select filter */}
            <Select value=''>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Select admin type"
                  className="capitalize"
                />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="super-admin">Super admin</SelectItem>
                <SelectItem value="agent-admin">Agent admin</SelectItem>
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
