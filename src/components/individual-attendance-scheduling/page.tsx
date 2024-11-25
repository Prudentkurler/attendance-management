"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import TimePicker  from "@/components/ui/time-picker";

interface IndividualAttendanceSchedulingProps {
  onClose: () => void;
}

const IndividualAttendanceScheduling = ({ onClose }: IndividualAttendanceSchedulingProps) =>  {
  const [scheduleCategory, setScheduleCategory] = useState("longPeriod");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [hasBreak, setHasBreak] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Individual Attendance Scheduling</h2>

      <div>
        <Label htmlFor="scheduleName">Attendance Schedule Name</Label>
        <Input id="scheduleName" placeholder="Enter schedule name" />
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
        <Label htmlFor="scheduleCategory">Schedule Category</Label>
        <Select onValueChange={(value) => setScheduleCategory(value)}>
          <SelectTrigger id="scheduleCategory">
            <SelectValue placeholder="Select schedule category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="longPeriod">Long Period</SelectItem>
            <SelectItem value="weeklyMonthlyRoster">Weekly/Monthly Roster</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {scheduleCategory === "longPeriod" && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Date</Label>
            <DatePicker selectedDate={startDate} onDateChange={(date: Date| undefined) => setStartDate(date)} />
          </div>
          <div>
            <Label>End Date</Label>
            <DatePicker selectedDate={endDate} onDateChange={(date: Date | undefined) => setEndDate(date)} />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="scheduleSpan">Choose Schedule Span</Label>
        <Input id="scheduleSpan" placeholder="e.g., 2 days or Unlimited" />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Clocking Time</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clockInTime">Clock In Time</Label>
            <TimePicker id="clockInTime" />
          </div>
          <div>
            <Label htmlFor="clockInTimeLimit">Clock In Time Limit (optional)</Label>
            <TimePicker id="clockInTimeLimit" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clockOutTime">Clock Out Time</Label>
            <TimePicker id="clockOutTime" />
          </div>
          <div>
            <Label htmlFor="lateTime">Late Time</Label>
            <TimePicker id="lateTime" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="hasBreak" checked={hasBreak} onCheckedChange={(checked) => setHasBreak(checked as boolean)} />
        <Label htmlFor="hasBreak">Any Schedule Break?</Label>
      </div>

      {hasBreak && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startBreakTime">Start Break Time</Label>
            <TimePicker id="startBreakTime" />
          </div>
          <div>
            <Label htmlFor="endBreakTime">End Break Time</Label>
            <TimePicker id="endBreakTime" />
          </div>
        </div>
      )}

      <Button type="submit" className="w-[150px] bg-ds-primary text-ds-foreground font-semibold hover:bg-ds-primary-dark">Next</Button>
    </form>
  );
};

export default IndividualAttendanceScheduling;

