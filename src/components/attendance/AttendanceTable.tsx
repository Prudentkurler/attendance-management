import * as React from "react";
import { DataTable } from "../ui/data-table";
import { columns as baseColumns } from "@/components/attendance/AttendanceData";
import AttendeesData, { Attendee } from "@/components/attendance/AttendanceData";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "../ui/input";
import { Calendar } from "@/components/ui/calendar"; // Adjust the path as needed
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FaSliders } from "react-icons/fa6";

// Helper functions for latecomers and absentees
function isLate(startDate: string | null): boolean {
  if (!startDate) return false;
  const startTime = new Date(startDate);
  return startTime.getUTCHours() > 9;
}

function isAbsent(startDate: string | null, endDate: string | null): boolean {
  return !startDate || !endDate;
}

const AttendanceTable = () => {
  const [filteredData, setFilteredData] = React.useState(AttendeesData);
  const [country, setCountry] = React.useState<string | undefined>(undefined);
  const [branch, setBranch] = React.useState<string | undefined>(undefined);
  const [region, setRegion] = React.useState<string | undefined>(undefined);
  const [group, setGroup] = React.useState<string | undefined>(undefined);
  const [subgroup, setSubgroup] = React.useState<string | undefined>(undefined);
  const [schedule, setSchedule] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<string | undefined>(undefined);
  const [nameSearch, setNameSearch] = React.useState<string>("");
  const [genderFilter, setGenderFilter] = React.useState<string | undefined>("All");
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [showAdvancedFilter, setShowAdvancedFilter] = React.useState(false);

  const handleDateOpen = () => {
    setShowCalendar(!showCalendar);
  };
  const handleAdvancedFilterOpen = () => {
    setShowAdvancedFilter(!showAdvancedFilter);
  };

  // Get unique values for each filter
  const uniqueCountries = Array.from(new Set(AttendeesData.map(a => a.country)));
  const uniqueBranches = Array.from(new Set(AttendeesData.map(a => a.branch)));
  const uniqueRegions = Array.from(new Set(AttendeesData.map(a => a.region)));
  const uniqueGroups = Array.from(new Set(AttendeesData.map(a => a.group)));
  const uniqueSubgroups = Array.from(new Set(AttendeesData.map(a => a.subgroup)));
  const uniqueSchedules = Array.from(new Set(AttendeesData.map(a => a.schedule)));
  const uniqueStatuses = ["Attendee", "Absentee", "Late Check-ins", "Early Check-ins"];

  React.useEffect(() => {
    const filtered = AttendeesData.filter((attendee) => {
      const matchesCountry = country ? attendee.country === country : true;
      const matchesBranch = branch ? attendee.branch === branch : true;
      const matchesRegion = region ? attendee.region === region : true;
      const matchesGroup = group ? attendee.group === group : true;
      const matchesSubgroup = subgroup ? attendee.subgroup === subgroup : true;
      const matchesSchedule = schedule ? attendee.schedule === schedule : true;
      const matchesStatus = status ? attendee.status === status : true;
      const matchesName = nameSearch
        ? attendee.name.toLowerCase().includes(nameSearch.toLowerCase())
        : true;
      const matchesGender =
        genderFilter === "All" ? true : attendee.gender === genderFilter;

      // Date filter: only match if selectedDate matches the attendee's start_date
      const matchesDate = selectedDate
        ? attendee.start_date && new Date(attendee.start_date).toISOString().split("T")[0] ===
          selectedDate.toISOString().split("T")[0]
        : true;

      return matchesCountry && matchesBranch && matchesRegion && matchesGroup && matchesSubgroup &&
        matchesSchedule && matchesStatus && matchesName && matchesGender && matchesDate;
    });
    setFilteredData(filtered);
  }, [country, branch, region, group, subgroup, schedule, status, nameSearch, genderFilter, selectedDate]);

  // Define the row background color based on the status
  const getRowStyle = (status: string) => {
    switch (status) {
      case "Absent":
        return "bg-red-100";
      case "Late Check-ins":
        return "bg-yellow-100";
      case "Early Check-ins":
        return "bg-green-100";
      default:
        return "";
    }
  };

  // Reset filters function
  const clearFilters = () => {
    setCountry(undefined);
    setBranch(undefined);
    setRegion(undefined);
    setGroup(undefined);
    setSubgroup(undefined);
    setSchedule(undefined);
    setStatus(undefined);
    setNameSearch("");
    setGenderFilter("All");
    setSelectedDate(undefined);
  };

  return (
    <div className="p-4">
      <div className="w-full flex items-center justify-between py-3">
        <h1 className="text-2xl font-semibold text-blue-700">Attendance Table</h1>
        
        {/* Name Search Filter */}
        <Input
          type="search"
          placeholder="Search..."
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="w-[30%] p-2"
        />

        {/* Date Filter with Calendar */}
        <div className="flex flex-col gap-2">
          <Card className="flex flex-col gap-1 relative rounded-md">
            <Button
              variant="ghost"
              size="default"
              onClick={handleDateOpen}
              className="w-36"
            >
              Date Picker
            </Button>
            {showCalendar && (
              <Calendar
                className="absolute top-10 z-10 rounded-md border border-gray-200 shadow-lg"
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            )}
          </Card>
        </div>
        
        {/*Advanced filter*/}
        <Card className="rounded-md">
          <Button className="flex gap-2 items-center bg-blue-700" onClick={handleAdvancedFilterOpen}>
            <FaSliders className="text-white text-md"/>
            <h4>Advanced Filter</h4>
          </Button>
        </Card>
      </div>

      {showAdvancedFilter && (
        <div className="filters items-center flex flex-wrap gap-3 space-y-2 py-2">
          {/* Filters for Country, Branch, Region, Group, Subgroup, Schedule, Status */}
          {[["Country", uniqueCountries, country, setCountry],
            ["Branch", uniqueBranches, branch, setBranch],
            ["Region", uniqueRegions, region, setRegion],
            ["Group", uniqueGroups, group, setGroup],
            ["Subgroup", uniqueSubgroups, subgroup, setSubgroup],
            ["Schedule", uniqueSchedules, schedule, setSchedule],
            ["Status", uniqueStatuses, status, setStatus]
          ].map(([label, options, value, setValue]) => (
            <Select key={label as string} onValueChange={(v: string) => setValue(v)} value={value}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          {/* Gender Filter */}
          <div className="gender-filter flex gap-2">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={genderFilter === "All"}
                onCheckedChange={() => setGenderFilter("All")}
              />
              <span>All</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={genderFilter === "Males"}
                onCheckedChange={() => setGenderFilter("Males")}
              />
              <span>Males</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={genderFilter === "Females"}
                onCheckedChange={() => setGenderFilter("Females")}
              />
              <span>Females</span>
            </label>
          </div>

          {/* Clear Filter Button */}
          <Button
            variant='destructive'
            onClick={clearFilters}
            size='sm'
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* DataTable with row-based conditional styling */}
      <DataTable
        columns={baseColumns}
        data={filteredData}
        rowClassName={(row) => getRowStyle(row.status)}
      />
    </div>
  );
};
export default AttendanceTable;