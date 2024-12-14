'use client';

import * as React from "react";
import { DataTable } from "../ui/data-table";
import { columns, Attendee } from "@/components/attendance/AttendanceData";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "../ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FaSliders } from "react-icons/fa6";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import axios from "axios";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toast";

export default function AttendanceTable() {
  const [attendanceData, setAttendanceData] = React.useState<Attendee[]>([]);
  const [filteredData, setFilteredData] = React.useState<Attendee[]>([]);
  const [country, setCountry] = React.useState<string | undefined>(undefined);
  const [branch, setBranch] = React.useState<string | undefined>(undefined);
  const [region, setRegion] = React.useState<string | undefined>(undefined);
  const [schedule, setSchedule] = React.useState<string | undefined>(undefined);
  const [nameSearch, setNameSearch] = React.useState<string>("");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [showAdvancedFilter, setShowAdvancedFilter] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [toast, setToast] = React.useState<{ title: string; description: string; variant: "default" | "destructive" } | null>(null);

  React.useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('attendance-manager.akwaabahr.com/api/attendance');
      setAttendanceData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setToast({
        title: "Error",
        description: "Failed to fetch attendance data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvancedFilterOpen = () => {
    setShowAdvancedFilter(!showAdvancedFilter);
  };

  // Get unique values for each filter
  const uniqueCountries = Array.from(new Set(attendanceData.map(a => a.country)));
  const uniqueBranches = Array.from(new Set(attendanceData.map(a => a.branch)));
  const uniqueRegions = Array.from(new Set(attendanceData.map(a => a.region)));
  const uniqueSchedules = Array.from(new Set(attendanceData.map(a => a.schedule)));

  React.useEffect(() => {
    const filtered = attendanceData.filter((attendee) => {
      const matchesCountry = country ? attendee.country === country : true;
      const matchesBranch = branch ? attendee.branch === branch : true;
      const matchesRegion = region ? attendee.region === region : true;
      const matchesSchedule = schedule ? attendee.schedule === schedule : true;
      const matchesName = nameSearch
        ? attendee.admin.toLowerCase().includes(nameSearch.toLowerCase())
        : true;
      const matchesDate = selectedDate
        ? attendee.start_date && new Date(attendee.start_date).toISOString().split("T")[0] ===
          selectedDate.toISOString().split("T")[0]
        : true;

      return matchesCountry && matchesBranch && matchesRegion && matchesSchedule && matchesName && matchesDate;
    });
    setFilteredData(filtered);
  }, [attendanceData, country, branch, region, schedule, nameSearch, selectedDate]);

  const clearFilters = () => {
    setCountry(undefined);
    setBranch(undefined);
    setRegion(undefined);
    setSchedule(undefined);
    setNameSearch("");
    setSelectedDate(undefined);
  };

  return (
    <ToastProvider>
      <div className="p-4">
        <div className="w-full flex flex-wrap items-center justify-between py-3">
          <h1 className="text-2xl mb-3 md:mb-0">Attendance Table</h1>
          
          <Input
            type="search"
            placeholder="Search..."
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
            className="w-[30%] p-2 mb-3 md:mb-0"
          />

          <div className="flex flex-col gap-2 mb-3 md:mb-0">
            <Card className="flex flex-col gap-1 rounded-md">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="ghost">
                    <p>Date Picker</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="p-6 rounded-md bg-white shadow-md w-full max-w-md">
                  <Calendar 
                    mode="single"
                    selected={selectedDate}
                    onSelect={(value) => {
                      setSelectedDate(value);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </Card>
          </div>
          
          <Card className="rounded-md">
            <Button className="flex gap-2 items-center bg-ds-primary hover:bg-ds-primary-dark" onClick={handleAdvancedFilterOpen}>
              <FaSliders className="text-white text-md"/>
              <h5>Advanced Filter</h5>
            </Button>
          </Card>
        </div>

        {showAdvancedFilter && (
          <div className="filters items-center flex flex-wrap gap-3 space-y-2 py-2">
            {[
              ["Country", uniqueCountries, country, setCountry],
              ["Branch", uniqueBranches, branch, setBranch],
              ["Region", uniqueRegions, region, setRegion],
              ["Schedule", uniqueSchedules, schedule, setSchedule],
            ].map(([label, options, value, setValue]) => (
              <Select
                key={label as string}
                onValueChange={(v) => (setValue as React.Dispatch<React.SetStateAction<string | undefined>>)(v as string)}
                value={value as string | undefined}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
                <SelectContent>
                  {(options as string[]).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

            <Button onClick={clearFilters} className="flex items-center gap-2">
              Clear Filters
            </Button>
          </div>
        )}

        <DataTable
          columns={columns}
          data={filteredData}
        />

        {toast && (
          <Toast variant={toast.variant}>
            <ToastTitle>{toast.title}</ToastTitle>
            <ToastDescription>{toast.description}</ToastDescription>
          </Toast>
        )}
        <ToastViewport />
      </div>
    </ToastProvider>
  );
}
