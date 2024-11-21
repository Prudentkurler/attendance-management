import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

const BulkAttendanceScheduling: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [scheduleType, setScheduleType] = useState("longPeriod");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Bulk Attendance Scheduling</h2>
        <Button variant="outline">Download Schedule Template</Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select countries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more countries as needed */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="branch">Branch</Label>
          <Select>
            <SelectTrigger id="branch">
              <SelectValue placeholder="Select branches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more branches as needed */}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="scheduleType">Attendance Schedule Type</Label>
        <Select onValueChange={(value) => setScheduleType(value)}>
          <SelectTrigger id="scheduleType">
            <SelectValue placeholder="Select schedule type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="longPeriod">Long Period</SelectItem>
            <SelectItem value="weeklyMonthlyRoster">Weekly/Monthly Roster</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {scheduleType === "longPeriod" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div>
            <Label>End Date</Label>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="scheduleStatus">Schedule Status</Label>
        <Select>
          <SelectTrigger id="scheduleStatus">
            <SelectValue placeholder="Select schedule status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="limited">Limited</SelectItem>
            <SelectItem value="unlimited">Unlimited</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="bulkScheduleFile">Upload Bulk Schedules File</Label>
        <Input id="bulkScheduleFile" type="file" />
      </div>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  );
};

export default BulkAttendanceScheduling;

