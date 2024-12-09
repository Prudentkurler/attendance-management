"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import TimePicker  from "@/components/ui/time-picker";
import { toast } from "@/components/ui/use-toast"

interface IndividualAttendanceSchedulingProps {
  onClose: () => void;
}

const IndividualAttendanceScheduling = ({ onClose }: IndividualAttendanceSchedulingProps) =>  {
  const [scheduleCategory, setScheduleCategory] = useState("longPeriod");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [hasBreak, setHasBreak] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch('/api/attendance-scheduling', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to submit individual schedule');
      toast({
        title: "Success",
        description: "Individual schedule submitted successfully",
      });
      onClose();
    } catch (error) {
      console.error('Error submitting individual schedule:', error);
      toast({
        title: "Error",
        description: "Failed to submit individual schedule",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Individual Attendance Scheduling</h2>

      <div>
        <Label htmlFor="scheduleName">Attendance Schedule Name</Label>
        <Input id="scheduleName" name="scheduleName" placeholder="Enter schedule name" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select name="country">
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
          <Select name="branch">
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
        <Select name="scheduleCategory" onValueChange={(value) => setScheduleCategory(value)}>
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
        <Input id="scheduleSpan" name="scheduleSpan" placeholder="e.g., 2 days or Unlimited" />
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Clocking Time</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clockInTime">Clock In Time</Label>
            <TimePicker id="clockInTime" name="clockInTime" />
          </div>
          <div>
            <Label htmlFor="clockInTimeLimit">Clock In Time Limit (optional)</Label>
            <TimePicker id="clockInTimeLimit" name="clockInTimeLimit" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="clockOutTime">Clock Out Time</Label>
            <TimePicker id="clockOutTime" name="clockOutTime" />
          </div>
          <div>
            <Label htmlFor="lateTime">Late Time</Label>
            <TimePicker id="lateTime" name="lateTime" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="hasBreak" name="hasBreak" checked={hasBreak} onCheckedChange={(checked) => setHasBreak(checked as boolean)} />
        <Label htmlFor="hasBreak">Any Schedule Break?</Label>
      </div>

      {hasBreak && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startBreakTime">Start Break Time</Label>
            <TimePicker id="startBreakTime" name="startBreakTime" />
          </div>
          <div>
            <Label htmlFor="endBreakTime">End Break Time</Label>
            <TimePicker id="endBreakTime" name="endBreakTime" />
          </div>
        </div>
      )}

      <Button type="submit" className="w-[150px] bg-ds-primary text-ds-foreground font-semibold hover:bg-ds-primary-dark" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default IndividualAttendanceScheduling;

