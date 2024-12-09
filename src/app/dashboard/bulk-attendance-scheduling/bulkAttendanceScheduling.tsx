import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from '@/components/ui/date-picker'
import { toast } from "@/components/ui/use-toast"

const BulkAttendanceScheduling: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [scheduleType, setScheduleType] = useState("longPeriod");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
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
      if (!response.ok) throw new Error('Failed to submit bulk schedule');
      toast({
        title: "Success",
        description: "Bulk schedule submitted successfully",
      });
      onClose();
    } catch (error) {
      console.error('Error submitting bulk schedule:', error);
      toast({
        title: "Error",
        description: "Failed to submit bulk schedule",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch('/api/attendance-scheduling/template', {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Failed to download template');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schedule_template.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading template:', error);
      toast({
        title: "Error",
        description: "Failed to download template",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Bulk Attendance Scheduling</h2>
        <Button variant="outline" onClick={handleDownloadTemplate}>Download Schedule Template</Button>
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
        <Label htmlFor="scheduleType">Attendance Schedule Type</Label>
        <Select name="scheduleType" onValueChange={(value) => setScheduleType(value)}>
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
            <DatePicker selectedDate={startDate} onDateChange={setStartDate} />
          </div>
          <div>
            <Label>End Date</Label>
            <DatePicker selectedDate={endDate} onDateChange={setEndDate} />
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="scheduleStatus">Schedule Status</Label>
        <Select name="scheduleStatus">
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
        <Input id="bulkScheduleFile" name="bulkScheduleFile" type="file" />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default BulkAttendanceScheduling;

