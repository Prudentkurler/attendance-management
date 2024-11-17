"use client";

import React from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";


interface ScheduleForm {
  scheduleType: string;
  country: string;
  branch: string;
  category: string;
  group: string;
  subgroup: string;
  scheduleName: string;
  scheduleSpan: string;
  clockInTime: string;
  clockOutTime: string;
  breakTime: boolean;
  startBreakTime?: string;
  endBreakTime?: string;
  recurring: boolean;
  recurringDays?: string;
}

const CreateSchedule: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<ScheduleForm>();
  const breakTime = watch("breakTime");
  const recurring = watch("recurring");

  const onSubmit = (data: ScheduleForm) => {
    console.log("Submitted Schedule Data:", data);
  };
  
  return(
   
         <Card className="flex flex-col gap-3 w-full p-6 mt-7 lg:w-2/3 mx-auto">

<form onSubmit={handleSubmit(onSubmit)}>
  {/* Schedule Type */}
  <div className="mb-4">
    <Label>Schedule Type</Label>
    <Controller
      name="scheduleType"
      control={control}
      defaultValue="Attendance"
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

  {/* Country */}
  <div className="mb-4">
    <Label>Country</Label>
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

  {/* Branch */}
  <div className="mb-4">
    <Label>Branch</Label>
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

  {/* Schedule Name */}
  <div className="mb-4">
    <Label>Schedule Name</Label>
    <Controller
      name="scheduleName"
      control={control}
      render={({ field }) => (
        <Input {...field} placeholder="Enter Schedule Name" />
      )}
    />
  </div>

  {/* Schedule Span */}
  <div className="mb-4">
    <Label>Schedule Span</Label>
    <Controller
      name="scheduleSpan"
      control={control}
      render={({ field }) => (
        <Input {...field} placeholder="e.g., 2 days or Unlimited" />
      )}
    />
  </div>

  {/* Clock-In and Clock-Out */}
  <div className="mb-4">
    <Label>Clock-In Time</Label>
    <Controller
      name="clockInTime"
      control={control}
      render={({ field }) => <Input type="time" {...field} />}
    />
  </div>
  <div className="mb-4">
    <Label>Clock-Out Time</Label>
    <Controller
      name="clockOutTime"
      control={control}
      render={({ field }) => <Input type="time" {...field} />}
    />
  </div>

  {/* Break Time */}
  <div className="mb-4 flex items-center gap-3">
    <Label>Break Time</Label>
    <Controller
      name="breakTime"
      control={control}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        >
          Set Break Time
        </Checkbox>
      )}
    />
    {breakTime && (
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Controller
          name="startBreakTime"
          control={control}
          render={({ field }) => (
            <Input type="time" {...field} placeholder="Start Break Time" />
          )}
        />
        <Controller
          name="endBreakTime"
          control={control}
          render={({ field }) => (
            <Input type="time" {...field} placeholder="End Break Time" />
          )}
        />
      </div>
    )}
  </div>

  {/* Recurring */}
  <div className="mb-4 flex items-center gap-3">
    <Label>Recurring</Label>
    <Controller
      name="recurring"
      control={control}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        >
          Is Schedule Recurring?
        </Checkbox>
      )}
    />
    {recurring && (
      <div className="mt-2">
        <Label>Recurring Days</Label>
        <Controller
          name="recurringDays"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select Recurring Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monday">Monday</SelectItem>
                <SelectItem value="Tuesday">Tuesday</SelectItem>
                <SelectItem value="Wednesday">Wednesday</SelectItem>
                <SelectItem value="Thursday">Thursday</SelectItem>
                <SelectItem value="Friday">Friday</SelectItem>
                <SelectItem value="Saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
    )}
  </div>

  <Button type="submit" className="mt-4">
    Submit
  </Button>
</form>

</Card>
    
  )
}

export default CreateSchedule