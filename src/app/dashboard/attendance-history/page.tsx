"use client";

import React, { useState, useEffect } from "react";
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
import { CSVLink } from "react-csv";

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
  const [reports, setReports] = useState<AttendanceReport[]>([]);
  const [breakdowns, setBreakdowns] = useState<DailyBreakdown[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [viewType]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (viewType === "summary") {
        const response = await fetch('attendance-manager.akwaabahr.com/api/history-report/summary');
        if (!response.ok) throw new Error('Failed to fetch summary data');
        const data = await response.json();
        setReports(data);
      } else {
        const response = await fetch('attendance-manager.akwaabahr.com/api/history-report/breakdown');
        if (!response.ok) throw new Error('Failed to fetch breakdown data');
        const data = await response.json();
        setBreakdowns(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleValidate = async (reportId: string) => {
    try {
      const response = await fetch('attendance-manager.akwaabahr.com/api/history-report/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId }),
      });
      if (!response.ok) throw new Error('Failed to validate report');
      const updatedReport = await response.json();
      setReports(reports.map(report => 
        report.id === updatedReport.id ? updatedReport : report
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to validate report');
    }
  };

  const handleExport = async () => {
    try {
      const endpoint = viewType === "summary" ? 'summary' : 'breakdown';
      const response = await fetch(`attendance-manager.akwaabahr.com/api/history-report/download/${endpoint}`);
      if (!response.ok) throw new Error('Failed to export data');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `attendance_${viewType}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export data');
    }
  };

  const summaryColumns: ColumnDef<AttendanceReport, unknown>[] = [
    {
      accessorKey: "user",
      header: ({ table }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={
              table.getSelectedRowModel().rows.length === table.getPreFilteredRowModel().rows.length
            }
            onCheckedChange={(isChecked) => {
              const allIds = table.getPreFilteredRowModel().rows.map((row) => row.original.id);
              table.getPreFilteredRowModel().rows.forEach(row => row.toggleSelected(!!isChecked));
            }}
            aria-label="Select all"
          />
          <span>Users</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(isChecked) =>
              row.toggleSelected(!!isChecked)
            }
            aria-label="Select row"
          />
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
      meta: { position: 'sticky', left: 16 },
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
    
  ];
  

  const breakdownColumns: ColumnDef<DailyBreakdown, unknown>[] = [
    {
      accessorKey: "user",
      header: ({ table }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={
              table.getSelectedRowModel().rows.length === table.getPreFilteredRowModel().rows.length
            }
            onCheckedChange={(isChecked) => {
              const allIds = table.getPreFilteredRowModel().rows.map((row) => row.id);
              table.getPreFilteredRowModel().rows.forEach(row => row.toggleSelected(!!isChecked));
            }}
            aria-label="Select all"
          />
          <span>Users</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(isChecked) =>
              row.toggleSelected(!!isChecked)
            }
            aria-label="Select row"
          />
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
      meta: { position: 'sticky', left: 16 },
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
        {showFilter && (
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
                className="md:w-auto"
                placeholder="Search by name or ID..."
              />
            </div>
          </div>
        )}

        <Button variant="default" className="my-4 font-semibold" onClick={handleShowFilter}>
          Filters
        </Button>

        <div className="bg-white rounded-lg overflow-hidden">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : viewType === "summary" ? (
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
              variant="default"
              className="bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark font-semibold"
            >
              Export Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
