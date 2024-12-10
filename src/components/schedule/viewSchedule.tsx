"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";


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
  eventStatus: string;
  assignedUsers: number;
  location: string;
  username?: string;
}

const UpdateSchedulePage: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<FilterForm>();
  const [filteredData, setFilteredData] = useState<Schedule[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { toast } = useToast();
  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/event-scheduling');
      if (!response.ok) throw new Error('Failed to fetch schedules');
      const data = await response.json();
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast({
        title: "Error",
        description: "Failed to fetch schedules",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(e.target.value);
  };

  const toggleDropdown = (id: number) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

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
      cell: ({ row }) => (
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleDropdown(row.original.id)}
          >
            {row.original.assignedUsers} Users
          </Button>
          {dropdownOpen === row.original.id && (
            <div className="absolute top-full mt-2 w-64 bg-white border shadow-md rounded-md z-40">
              <Input
                placeholder="Search users..."
                value={userSearch}
                onChange={handleUserSearch}
                className="mb-2"
              />
              <ul className="max-h-40 overflow-y-auto">
                {/* Example user list */}
                {["John Doe", "Jane Doe", "Emily Smith", "Michael Brown"]
                  .filter((user) =>
                    user.toLowerCase().includes(userSearch.toLowerCase())
                  )
                  .map((user, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => console.log(`User selected: ${user}`)}
                    >
                      {user}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ),
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

  const onFilterSubmit = async (data: FilterForm) => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams(Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = value || '';
        return acc;
      }, {} as Record<string, string>));
      const response = await fetch(`/api/event-scheduling?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch filtered schedules');
      const filteredSchedules = await response.json();
      setFilteredData(filteredSchedules);
    } catch (error) {
      console.error('Error fetching filtered schedules:', error);
      toast({
        title: "Error",
        description: "Failed to fetch filtered schedules",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onEditSchedule = async (schedule: Schedule) => {
    try {
      const response = await fetch(`/api/event-scheduling/${schedule.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule),
      });
      if (!response.ok) throw new Error('Failed to update schedule');
      
      toast({
        title: "Success",
        description: "Schedule updated successfully",
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error updating schedule:', error);
      toast({
        title: "Error",
        description: "Failed to update schedule",
        variant: "destructive",
      });
    }
  };

  const onDeleteSchedule = async (id: number) => {
    try {
      const response = await fetch(`/api/event-scheduling?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete schedule');
      toast({
        title: "Success",
        description: "Schedule deleted successfully",
      });
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast({
        title: "Error",
        description: "Failed to delete schedule",
        variant: "destructive",
      });
    }
  };

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Card className="mt-8 w-full">
      <div className="container w-full">
        <h1 className="text-lg md:text-2xl font-bold mb-4">Update Schedules</h1>

        <div className="w-full flex justify-end items-center mb-4">
          <Button
            onClick={handleShowFilters}
            variant="default"
            className="font-semibold"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {showFilters && (
          <form onSubmit={handleSubmit(onFilterSubmit)} className="flex gap-4 flex-col md:flex-wrap md:flex-row mb-6 w-full">
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Filtering...' : 'Filter'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => reset()} className="ml-2">
                Clear
              </Button>
            </div>
          </form>
        )}

        <DataTable 
          columns={columns} 
          data={filteredData}
        />
      </div>
    </Card>
  );
};

export default UpdateSchedulePage;

function toast(arg0: { title: string; description: string; variant: string; }) {
  throw new Error("Function not implemented.");
}

