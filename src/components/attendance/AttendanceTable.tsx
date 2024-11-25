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
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";





export default function AttendanceTable() {
  const [filteredData, setFilteredData] = React.useState<Attendee[]>(AttendeesData);
  const [country, setCountry] = React.useState<string | undefined>(undefined);
  const [branch, setBranch] = React.useState<string | undefined>(undefined);
  const [region, setRegion] = React.useState<string | undefined>(undefined);
  const [schedule, setSchedule] = React.useState<string | undefined>(undefined);
  const [status, setStatus] = React.useState<string | undefined>(undefined);
  const [nameSearch, setNameSearch] = React.useState<string>("");
 
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
 
  const [showAdvancedFilter, setShowAdvancedFilter] = React.useState(false);


  const handleAdvancedFilterOpen = () => {
    setShowAdvancedFilter(!showAdvancedFilter);
  };

  // Get unique values for each filter
  const uniqueCountries = Array.from(new Set(AttendeesData.map(a => a.country)));
  const uniqueBranches = Array.from(new Set(AttendeesData.map(a => a.branch)));
  const uniqueRegions = Array.from(new Set(AttendeesData.map(a => a.region)));
  const uniqueSchedules = Array.from(new Set(AttendeesData.map(a => a.schedule)));
  const uniqueStatuses = ["Low", "High", "Average"];

 React.useEffect(() => {
    const filtered = AttendeesData.filter((attendee) => {
      const matchesCountry = country ? attendee.country === country : true;
      const matchesBranch = branch ? attendee.branch === branch : true;
      const matchesRegion = region ? attendee.region === region : true;
      const matchesSchedule = schedule ? attendee.schedule === schedule : true;
      const matchesStatus = status ? attendee.status === status : true;
      const matchesName = nameSearch
        ? attendee.name.toLowerCase().includes(nameSearch.toLowerCase())
        : true;
      

      // Date filter: only match if selectedDate matches the attendee's start_date
      const matchesDate = selectedDate
        ? attendee.start_date && new Date(attendee.start_date).toISOString().split("T")[0] ===
          selectedDate.toISOString().split("T")[0]
        : true;

      return matchesCountry && matchesBranch && matchesRegion  &&
        matchesSchedule && matchesStatus && matchesName  && matchesDate;
    });
    setFilteredData(filtered);
  }, [country, branch, region, schedule, status, nameSearch, selectedDate]);




  // Reset filters function
  const clearFilters = () => {
    setCountry(undefined);
    setBranch(undefined);
    setRegion(undefined);
    setSchedule(undefined);
    setStatus(undefined);
    setNameSearch("");
    setSelectedDate(undefined);
  };

  return (
    <div className="p-4">
      <div className="w-full flex flex-wrap items-center justify-between py-3">
        <h1 className="text-2xl mb-3 md:mb-0"> Table</h1>
        
        {/* Name Search Filter */}
        <Input
          type="search"
          placeholder="Search..."
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          className="w-[30%] p-2 mb-3 md:mb-0"
        />

        {/* Date Filter with Calendar */}
        <div className="flex flex-col gap-2 mb-3 md:mb-0">


          <Card className="flex flex-col gap-1 rounded-md">
          <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="ghost" >
          
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
        
        {/* Advanced filter */}
        <Card className="rounded-md">
          <Button className="flex gap-2 items-center bg-ds-primary hover:bg-ds-primary-dark" onClick={handleAdvancedFilterOpen}>
            <FaSliders className="text-white text-md"/>
            <h5>Advanced Filter</h5>
          </Button>
        </Card>
      </div>

      {showAdvancedFilter && (
        <div className="filters items-center flex flex-wrap gap-3 space-y-2 py-2">
          {[["Country", uniqueCountries, country, setCountry],
            ["Branch", uniqueBranches, branch, setBranch],
            ["Region", uniqueRegions, region, setRegion],
            ["Schedule", uniqueSchedules, schedule, setSchedule],
            ["Status", uniqueStatuses, status, setStatus]
          ].map(([label, options, value, setValue]) => (
            <Select
              key={label as string}
              onValueChange={(v) => (setValue as React.Dispatch<React.SetStateAction<string>>)(v)}
              value={value as any}
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

         
           

          {/* Clear Filters */}
          <Button onClick={clearFilters} className="flex items-center gap-2">
            Clear Filters
          </Button>
        </div>
      )}

      <DataTable
        columns={baseColumns}
        data={filteredData}
       
      />
    </div>
  );
};


