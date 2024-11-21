"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRangePicker } from "@/components/DateRangePicker"; // Replace with ShadCN date picker

// Example data type
type DataType = {
  id: number;
  name: string;
  country: string;
  branch: string;
  category: string;
  gender: string;
  attendanceStatus: string;
  schedule: string;
  startDate: string;
  endDate: string;
};

const initialData: DataType[] = [
  // Sample data
  { id: 1, name: "John Doe", country: "USA", branch: "HQ", category: "Staff", gender: "Male", attendanceStatus: "Attendee", schedule: "Morning", startDate: "2024-11-01", endDate: "2024-11-15" },
  { id: 2, name: "Jane Smith", country: "Ghana", branch: "Regional", category: "Student", gender: "Female", attendanceStatus: "Absentee", schedule: "Afternoon", startDate: "2024-11-05", endDate: "2024-11-10" },
];

import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<DataType>[] = [
  { header: "ID", accessorKey: "id" },
  { header: "Name", accessorKey: "name" },
  { header: "Country", accessorKey: "country" },
  { header: "Branch", accessorKey: "branch" },
  { header: "Category", accessorKey: "category" },
  { header: "Gender", accessorKey: "gender" },
  { header: "Attendance Status", accessorKey: "attendanceStatus" },
  { header: "Schedule", accessorKey: "schedule" },
  { header: "Start Date", accessorKey: "startDate" },
  { header: "End Date", accessorKey: "endDate" },
];

const FiltersTable = () => {
  const [data, setData] = useState(initialData);
  const [filters, setFilters] = useState({
    country: "all",
    regionState: "all",
    branch: "all",
    category: "all",
    schedule: "all",
    gender: "all",
    attendanceStatus: "all",
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleFilterChange = (key: string, value: string | Date | null) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const applyFilters = () => {
    // Apply filtering logic
    let filteredData = initialData;

    if (filters.country !== "all") {
      filteredData = filteredData.filter((item) => item.country === filters.country);
    }

    if (filters.regionState !== "all") {
      filteredData = filteredData.filter((item) => item.branch === filters.regionState);
    }

    if (filters.branch !== "all") {
      filteredData = filteredData.filter((item) => item.branch === filters.branch);
    }

    if (filters.category !== "all") {
      filteredData = filteredData.filter((item) => item.category === filters.category);
    }

    if (filters.schedule !== "all") {
      filteredData = filteredData.filter((item) => item.schedule === filters.schedule);
    }

    if (filters.gender !== "all") {
      filteredData = filteredData.filter((item) => item.gender.toLowerCase() === filters.gender.toLowerCase());
    }

    if (filters.attendanceStatus !== "all") {
      filteredData = filteredData.filter((item) => item.attendanceStatus.toLowerCase() === filters.attendanceStatus.toLowerCase());
    }

    // Add more filter conditions as needed
    setData(filteredData);
  };

  return (
    <div className="space-y-6">

      <h3>Summary Analytics</h3>
      {/* Filter Section */}
      <div className="flex  gap-4 w-full overflow-auto">
        {/* Country Filter */}
        <Select onValueChange={(value) => handleFilterChange("country", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="USA">USA</SelectItem>
            <SelectItem value="Ghana">Ghana</SelectItem>
          </SelectContent>
        </Select>

        {/* Region/State Filter */}
        <Select onValueChange={(value) => handleFilterChange("regionState", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Region/State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="California">California</SelectItem>
            <SelectItem value="Accra">Accra</SelectItem>
          </SelectContent>
        </Select>

        {/* Branch Filter */}
        <Select onValueChange={(value) => handleFilterChange("branch", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="HQ">HQ</SelectItem>
            <SelectItem value="Regional">Regional</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Staff">Staff</SelectItem>
            <SelectItem value="Student">Student</SelectItem>
          </SelectContent>
        </Select>

        {/* Schedule Filter */}
        <Select onValueChange={(value) => handleFilterChange("schedule", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Morning">Morning</SelectItem>
            <SelectItem value="Afternoon">Afternoon</SelectItem>
          </SelectContent>
        </Select>

        {/* Gender Filter */}
        <Select onValueChange={(value) => handleFilterChange("gender", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        {/* Attendance Status Filter */}
        <Select onValueChange={(value) => handleFilterChange("attendanceStatus", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Attendance Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Attendee">Attendee</SelectItem>
            <SelectItem value="Absentee">Absentee</SelectItem>
            <SelectItem value="Late Check-ins">Late Check-ins</SelectItem>
            <SelectItem value="Early Check-ins">Early Check-ins</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range Picker */}
        <DateRangePicker
          startDate={filters.startDate}
          endDate={filters.endDate}
          onStartDateChange={(startDate) => handleFilterChange("startDate", startDate)}
          onEndDateChange={(endDate) => handleFilterChange("endDate", endDate)}
        />

        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>

      {/* Data Table Section */}
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default FiltersTable;
