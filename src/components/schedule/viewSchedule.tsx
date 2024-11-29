"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import {
  ColumnDef,
} from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table"; // Assuming DataTable wraps @tanstack/react-table functionality
import { Card } from "../ui/card";

interface FilterForm {
  country: string;
  branch: string;
  category: string;
  scheduleType: string;
  scheduleLocation: string;

}

interface Schedule {
  id: number;
  name: string;
  branch: string;
  startTime: string;
  endTime: string;
  eventStatus:string;
  assignedUsers: number;
  location: string;
}

const UpdateSchedulePage: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FilterForm>();
  const [filteredData, setFilteredData] = useState<Schedule[]>([
    {
      id: 1,
      name: "Morning Shift",
      branch: "HQ",
      startTime: "08:00 AM",
      endTime: "05:00 PM",
      eventStatus:"Recuring",
      assignedUsers: 120,
      location: "Known",
    },
    {
      id: 2,
      name: "Weekly Meeting",
      branch: "West Branch",
      startTime: "09:00 AM",
      endTime: "11:00 AM",
      eventStatus:"Non-REcuring",
      assignedUsers: 60,
      location: "Virtual",
    },
  ]);
  
  // Columns for the Data Table
  const columns: ColumnDef<Schedule>[] = [
    {
      accessorFn: row => row.name,
      header: "Schedule Name",
    },
    {
      accessorFn: row => row.branch,
      header: "Branch",
    },
    {
      accessorFn: row => row.startTime,
      header: "Start Time",
    },
    {
      accessorFn: row => row.endTime,
      header: "End Time",
    },
    {
      accessorFn: row => row.eventStatus,
      header: "Event Status",
    },
    {
      accessorFn: row => row.assignedUsers,
      header: "Assigned Users",
    },
    {
      accessorFn: row => row.location,
      header: "Location",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditSchedule(row.original)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="ml-2"
            onClick={() => onDeleteSchedule(row.original.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Filter form submission
  const onFilterSubmit = (data: FilterForm) => {
    console.log("Filter Data:", data);
    // Fetch filtered data based on form inputs
    setFilteredData([
      {
        id: 1,
        name: "Morning Shift",
        branch: "HQ",
        startTime: "08:00 AM",
        endTime: "05:00 PM",
        eventStatus:"Recuring",
        assignedUsers: 120,
        location: "Known",
      },
      {
        id: 2,
        name: "Weekly Meeting",
        branch: "West Branch",
        startTime: "09:00 AM",
        endTime: "11:00 AM",
        eventStatus:"Non-REcuring",
        assignedUsers: 60,
        location: "Virtual",
      },
    ]);
  };

  // Edit schedule
  const onEditSchedule = (schedule: Schedule) => {
    console.log("Editing schedule:", schedule);
  };

  // Delete schedule
  const onDeleteSchedule = (id: number) => {
    console.log("Deleting schedule:", id);
  };

  const [showFilters, setShowFilters] = useState<boolean>(false)

  const handleShowFilters = ()=>{
    setShowFilters(!showFilters)
  }

  return (
    <Card className=" mt-8 w-full">
    <div className="container w-full">
      <h1 className="text-lg md:text-2xl font-bold mb-4">Update Schedules</h1>

      {/* Filters */}

      {
        showFilters && (
      <form onSubmit={handleSubmit(onFilterSubmit)} className="flex gap-4 flex-col md:flex-wrap md:flex-row mb-6 w-full ">
        <div>
          
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
         
          <Controller
            name="branch"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="HQ">HQ</SelectItem>
                  <SelectItem value="West Branch">West Branch</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
         
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
         
          <Controller
            name="scheduleType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Schedule Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Attendance">Attendance</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div>
        
          <Controller
            name="scheduleLocation"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Known">Known</SelectItem>
                  <SelectItem value="Unknown">Unknown</SelectItem>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex items-end">
          <Button type="submit">Filter</Button>
          <Button type="button" variant="secondary" onClick={() => reset()} className="ml-2">
            Clear
          </Button>
        </div>
      </form>

)
}
      <div className="w-full flex justify-end items-center">
        <Button
          onClick={handleShowFilters}
          variant="default"
          className="font-semibold mb-3"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>

      </div>
      {/* Data Table */}
      <DataTable columns={columns} data={filteredData} />
    </div>
    </Card>
  );
};

export default UpdateSchedulePage;
