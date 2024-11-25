"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/ui/date-picker";
import TimePicker from "@/components/ui/time-picker";
import { useForm, Controller } from "react-hook-form";

type ScheduleType = "Attendance" | "Event";
type ScheduleCategory = "Long Period" | "Weekly/Monthly Roster";

interface Schedule {
  id: number;
  name: string;
  branch: string;
  startTime: string;
  closingTime: string;
  assignedUsers: number;
  location: string;
}

interface FilterForm {
  country: string;
  branch: string;
  category: string;
  scheduleType: string;
  scheduleLocation: string;
}

const CreateSchedule: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { control, handleSubmit: handleFilterSubmit, reset } = useForm<FilterForm>();
  const [scheduleType, setScheduleType] = useState<ScheduleType>("Attendance");
  const [bulkUpload, setBulkUpload] = useState(false);
  const [scheduleCategory, setScheduleCategory] = useState<ScheduleCategory>("Long Period");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [hasBreak, setHasBreak] = useState(false);
  const [filteredData, setFilteredData] = useState<Schedule[]>([]);



  const handleClear = () => {
    reset();
    setScheduleType("Attendance");
    setBulkUpload(false);
    setScheduleCategory("Long Period");
    setStartDate(undefined);
    setEndDate(undefined);
    setHasBreak(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

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
        closingTime: "05:00 PM",
        assignedUsers: 120,
        location: "Known",
      },
      {
        id: 2,
        name: "Weekly Meeting",
        branch: "West Branch",
        startTime: "09:00 AM",
        closingTime: "11:00 AM",
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

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Create {scheduleType}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <RadioGroup
              defaultValue={scheduleType}
              onValueChange={(value) => setScheduleType(value as ScheduleType)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Attendance" id="attendance" />
                <Label htmlFor="attendance">Attendance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Event" id="event" />
                <Label htmlFor="event">Event</Label>
              </div>
            </RadioGroup>

            {scheduleType === "Attendance" && (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bulkUpload"
                    checked={bulkUpload}
                    onCheckedChange={(checked) => setBulkUpload(checked as boolean)}
                  />
                  <Label htmlFor="bulkUpload">Bulk Schedule Upload</Label>
                </div>

                {bulkUpload ? (
                  <div>
                    <Button variant="outline">Download Schedule Template</Button>
                    <Input type="file" className="mt-2" />
                  </div>
                ) : (
                  <>
                    <Select onValueChange={(value) => setScheduleCategory(value as ScheduleCategory)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Schedule Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Long Period">Long Period</SelectItem>
                        <SelectItem value="Weekly/Monthly Roster">Weekly/Monthly Roster</SelectItem>
                      </SelectContent>
                    </Select>

                    {scheduleCategory === "Long Period" && (
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-1/3">
                          <Label>Start Date</Label>
                          <DatePicker
                            selectedDate={startDate}
                            onDateChange={(date: Date | undefined) => setStartDate(date)}
                            
                          />
                        </div>
                        <div className="w-1/3">
                          <Label>End Date</Label>
                          <DatePicker
                            selectedDate={endDate}
                            onDateChange={(date: Date | undefined) => setEndDate(date)}
                          />
                        </div>
                      </div>
                    )}

                    {scheduleCategory === "Weekly/Monthly Roster" && (
                      <>
                        <div>
                          <Label htmlFor="clockInTime">Clock In Time</Label>
                          <TimePicker id="clockInTime" />
                        </div>
                        <div>
                          <Label htmlFor="clockOutTime">Clock Out Time</Label>
                          <TimePicker id="clockOutTime" />
                        </div>
                        {/* Add more fields for Weekly/Monthly Roster */}
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {scheduleType === "Event" && (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bulkEventUpload"
                    checked={bulkUpload}
                    onCheckedChange={(checked) => setBulkUpload(checked as boolean)}
                  />
                  <Label htmlFor="bulkEventUpload">Bulk Events Template</Label>
                </div>

                {bulkUpload ? (
                  <div>
                    <Button variant="outline">Download Bulk Events Template</Button>
                    <Input type="file" className="mt-2" />
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="eventName">Event Name</Label>
                      <Input id="eventName" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input type="date" id="startDate" />
                      </div>
                      <div>
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input type="time" id="startTime" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input type="date" id="endDate" />
                      </div>
                      <div>
                        <Label htmlFor="endTime">End Time</Label>
                        <Input type="time" id="endTime" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="aboutEvent">About Event</Label>
                      <Textarea id="aboutEvent" placeholder="Enter event details (optional)" />
                    </div>
                    <div>
                      <Label htmlFor="attachFile">Attach File</Label>
                      <Input type="file" id="attachFile" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="recurring" />
                      <Label htmlFor="recurring">Recurring</Label>
                    </div>
                    {/* Add more fields for event creation */}
                  </>
                )}
              </>
            )}

            {/* Filters */}
            

           
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateSchedule;
