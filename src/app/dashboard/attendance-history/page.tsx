"use client";

// pages/attendance-history.tsx
import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";

interface AttendanceReport {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  totalClockIns: number;
  totalClockOuts: number;
  adminClockIns: number;
  adminClockOuts: number;
  totalHours: number;
  overtimeHours: number;
  lateHours: number;
  validated: boolean;
  breakOverstay: number;
  absentDays: number;
  leaveDays: number;
  excuseDutyDays: number;
}

interface DailyBreakdown {
  userId: string;
  userName: string;
  userImage: string;
  date: Date;
  clockIn: Date;
  clockOut: Date;
  clockSource: "Self" | "Admin";
  hours: number;
  status: "On Time" | "Late" | "Early Leave";
}

export default function AttendanceHistoryPage() {
  const [viewType, setViewType] = useState<"summary" | "breakdown">("summary");
  const [reports,setReports] = useState<AttendanceReport[]>([
    {
      id: "1",
      userId: "USR001",
      userName: "John Doe",
      userImage: "",
      totalClockIns: 20,
      totalClockOuts: 20,
      adminClockIns: 5,
      adminClockOuts: 5,
      totalHours: 160,
      overtimeHours: 15,
      lateHours: 3,
      validated: true,
      breakOverstay: 2,
      absentDays: 1,
      leaveDays: 2,
      excuseDutyDays: 1,
    },
    {
      id: "2",
      userId: "USR002",
      userName: "Jane Smith",
      userImage: "",
      totalClockIns: 18,
      totalClockOuts: 18,
      adminClockIns: 2,
      adminClockOuts: 2,
      totalHours: 145,
      overtimeHours: 10,
      lateHours: 4,
      validated: false,
      breakOverstay: 1.5,
      absentDays: 2,
      leaveDays: 0,
      excuseDutyDays: 0,
    },
    {
      id: "3",
      userId: "USR003",
      userName: "Alice Johnson",
      userImage: "",
      totalClockIns: 22,
      totalClockOuts: 22,
      adminClockIns: 3,
      adminClockOuts: 3,
      totalHours: 170,
      overtimeHours: 20,
      lateHours: 2,
      validated: true,
      breakOverstay: 0,
      absentDays: 0,
      leaveDays: 1,
      excuseDutyDays: 0,
    },
  ]);
  
const [breakdowns] = useState<DailyBreakdown[]>([
  {
    userId: "USR002",
    userName: "Jane Smith",
    userImage: "",
    date: new Date(2024, 10, 1),
    clockIn: new Date(2024, 10, 1, 9, 0),
    clockOut: new Date(2024, 10, 1, 17, 0),
    clockSource: "Self",
    hours: 8,
    status: "On Time",
  },
  {
    userId: "USR003",
    userName: "Alice Johnson",
    userImage: "",
    date: new Date(2024, 10, 2),
    clockIn: new Date(2024, 10, 2, 9, 15),
    clockOut: new Date(2024, 10, 2, 17, 0),
    clockSource: "Self",
    hours: 7.75,
    status: "Late",
  },
  {
    userId: "USR001",
    userName: "John Doe",
    userImage: "",
    date: new Date(2024, 10, 3),
    clockIn: new Date(2024, 10, 3, 8, 45),
    clockOut: new Date(2024, 10, 3, 16, 45),
    clockSource: "Admin",
    hours: 8,
    status: "On Time",
  },
  {
    userId: "USR002",
    userName: "Jane Jones",
    userImage: "",
    date: new Date(2024, 10, 4),
    clockIn: new Date(2024, 10, 4, 9, 30),
    clockOut: new Date(2024, 10, 4, 17, 15),
    clockSource: "Self",
    hours: 7.75,
    status: "Late",
  },
]);

  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);



  const handleToggleSelectAll = (checked: boolean) => {
    setSelectedReports(checked ? reports.map((report) => report.id) : []);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedReports((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleViewBreakdown = (reportId: string) => {
    setSelectedReport(reportId);
    setViewType("breakdown");
  };

  const handleValidate = (reportId: string) => {
    console.log("Validating report:", reportId);
  
    // Update the report's validation status
    const updatedReports = reports.map((report) => {
      if (report.id === reportId) {
        return {
          ...report,
          validated: true,
        };
      }
      return report;
    });
  
    // Update the state with the modified reports
    setReports(updatedReports);
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const summaryColumns: ColumnDef<AttendanceReport, unknown>[] = [
  {
      accessorKey: "user",
      header: "Users",
      cell: ({ row }) => (
        <div className="flex items-center ">
          <Image
            src={row.original.userImage}
            alt={row.original.userName}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <div className="font-medium">{row.original.userName}</div>
            <div className="text-sm text-gray-500">{row.original.userId}</div>
          </div>
        </div>
      ),
      meta: { position:'sticky', left:16 },
    },
    { accessorKey: "breakOverstay", header: "Break Overstay (h)" },
    { accessorKey: "absentDays", header: "Absent Days" },
    { accessorKey: "leaveDays", header: "Leave Days" },
    { accessorKey: "excuseDutyDays", header: "Excused Days" },
    {
      accessorKey: "clockEvents",
      header: "Clock Info",
      cell: ({ row }) => (
        <div>
          <div>In: {row.original.totalClockIns} (Admin: {row.original.adminClockIns})</div>
          <div>Out: {row.original.totalClockOuts} (Admin: {row.original.adminClockOuts})</div>
        </div>
      ),
    },
    {
      accessorKey: "hours",
      header: "Hours",
      cell: ({ row }) => (
        <div>
          <div>Total: {row.original.totalHours}h</div>
          <div>OT: {row.original.overtimeHours}h</div>
          <div>Late: {row.original.lateHours}h</div>
        </div>
      ),
    },
    {
      accessorKey: "validation",
      header: "Validation",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            row.original.validated
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.validated ? "Validated" : "Pending"}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (

        <Popover>
          <PopoverTrigger>...</PopoverTrigger>
          <PopoverContent className="w-9/10">
            
        <div className="flex flex-col gap-3">
          <Button size="sm" onClick={() => handleViewBreakdown(row.original.id)}>
            View Details
          </Button>
          {!row.original.validated && (
            <Button
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => handleValidate(row.original.id)}
            >
              Validate
            </Button>
          )}
        </div>
          </PopoverContent>
          
        </Popover>
      ),
    },

    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={selectedReports.length === reports.length}
          onCheckedChange={(checked) => handleToggleSelectAll(!!checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selectedReports.includes(row.original.id)}
          onCheckedChange={() => handleToggleSelect(row.original.id)}
        />
      ),
    },
    
  ];

  const breakdownColumns: ColumnDef<DailyBreakdown, unknown>[] = [

    {
      accessorKey: "user",
      header: "Users",
      cell: ({ row }) => (
        <div className="flex items-center ">
          <Image
            src={row.original.userImage}
            alt={row.original.userName}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <div className="font-medium">{row.original.userName}</div>
            <div className="text-sm text-gray-500">{row.original.userId}</div>
          </div>
        </div>
      ),
      meta: { position:'sticky', left:16 },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => row.original.date.toLocaleDateString(),
    },
    {
      accessorKey: "clockIn",
      header: "Clock In",
      cell: ({ row }) => row.original.clockIn.toLocaleTimeString(),
    },
    {
      accessorKey: "clockOut",
      header: "Clock Out",
      cell: ({ row }) => row.original.clockOut.toLocaleTimeString(),
    },
    {
      accessorKey: "clockSource",
      header: "Source",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            row.original.clockSource === "Self"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {row.original.clockSource}
        </span>
      ),
    },
    {
      accessorKey: "hours",
      header: "Hours",
      cell: ({ row }) => `${row.original.hours}h`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            row.original.status === "On Time"
              ? "bg-green-100 text-green-800"
              : row.original.status === "Late"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
  ];

  const [showFilter, setSHowFilter] = useState<boolean>(false)

  const handleShowFilter = ()=>{
    setSHowFilter(!showFilter)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex md:flex-row flex-col gap-4 justify-between items-center mb-6">
        <h1 className="text-xl md:2xl font-bold">Attendance History</h1>
        <div className="flex space-x-4">
          <Button
            className={`${
              viewType === "summary"
                ? "bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark font-bold"
                : "bg-green-400 font-bold"
            }`}
            onClick={() => setViewType("summary")}
          >
            Summary
          </Button>
          <Button
            className={`${
              viewType === "breakdown"
                ? "bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark font-bold"
                : "bg-green-400 font-bold"
            }`}
            onClick={() => setViewType("breakdown")}
          >
            Breakdown
          </Button>
        </div>
      </div>

      <Card className="p-3">

        {
          showFilter &&(

        
        <div className="bg-white rounded-lg mb-3">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Select value="">
              <SelectTrigger className="">
                <SelectValue placeholder="User Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
              </SelectContent>
            </Select>
            <Select value="">
              <SelectTrigger className="">
                <SelectValue placeholder="Schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning Shift</SelectItem>
                <SelectItem value="weekly">Weekly Roster</SelectItem>
              </SelectContent>
            </Select>
            <Input type="date" placeholder="Start Date" />
            <Input type="date" placeholder="End Date" />
            <Input
              className=" md:w-auto"
              placeholder="Search by name or ID..."
            />
          </div>
        </div>
          )
        }

        <Button variant='default' className="my-4 font-semibold" onClick={handleShowFilter}>
          Filters
        </Button>

        <div className="bg-white rounded-lg overflow-hidden">
          {viewType === "summary" ? (
            <DataTable<AttendanceReport, unknown>
              columns={summaryColumns}
              data={reports}
            />
          ) : (
            <DataTable<DailyBreakdown, unknown>
              columns={breakdownColumns}
              data={breakdowns}
            />
          )}
          <div className="flex justify-end mt-3">
            <Button
              size="sm"
              onClick={handleExport}
              variant="destructive"
              className="font-bold"
            >
              Export Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
