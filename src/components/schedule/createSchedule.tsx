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
import { useToast} from "@/hooks/use-toast";

type ScheduleType = "Attendance" | "Event";
type ScheduleCategory = "Long Period" | "Weekly/Monthly Roster";

interface CreateScheduleForm {
  scheduleType: ScheduleType;
  bulkUpload: boolean;
  scheduleCategory: ScheduleCategory;
  startDate: Date | null;
  endDate: Date | null;
  clockInTime: string;
  clockOutTime: string;
  eventName: string;
  aboutEvent: string;
  recurring: boolean;
  recurringType: string;
}

const CreateSchedule: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { control, handleSubmit, watch, reset } = useForm<CreateScheduleForm>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scheduleType = watch("scheduleType");
  const bulkUpload = watch("bulkUpload");
  const scheduleCategory = watch("scheduleCategory");

  const onSubmit = async (data: CreateScheduleForm) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/event-scheduling', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create schedule');
      toast({
        title: "Success",
        description: "Schedule created successfully",
      });
      onClose();
    } catch (error) {
      console.error('Error creating schedule:', error);
      toast({
        title: "Error",
        description: "Failed to create schedule",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    reset();
  };

  const handleDownloadTemplate = async () => {
    try {
      const response = await fetch('/api/event-scheduling/template', {
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
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Create {scheduleType}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Controller
              name="scheduleType"
              control={control}
              defaultValue="Attendance"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
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
              )}
            />

            {scheduleType === "Attendance" && (
              <>
                <Controller
                  name="bulkUpload"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bulkUpload"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="bulkUpload">Bulk Schedule Upload</Label>
                    </div>
                  )}
                />

                {bulkUpload ? (
                  <div>
                    <Button variant="outline" onClick={handleDownloadTemplate}>Download Schedule Template</Button>
                    <Input type="file" className="mt-2" />
                  </div>
                ) : (
                  <>
                    <Controller
                      name="scheduleCategory"
                      control={control}
                      defaultValue="Long Period"
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Schedule Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Long Period">Long Period</SelectItem>
                            <SelectItem value="Weekly/Monthly Roster">Weekly/Monthly Roster</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />

                    {scheduleCategory === "Long Period" && (
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-1/3">
                          <Label>Start Date</Label>
                          <Controller
                            name="startDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                selectedDate={field.value ?? undefined}
                                onDateChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                        <div className="w-1/3">
                          <Label>End Date</Label>
                          <Controller
                            name="endDate"
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                selectedDate={field.value ?? undefined}
                                onDateChange={field.onChange}
                              />
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {scheduleCategory === "Weekly/Monthly Roster" && (
                      <>
                        <div>
                          <Label htmlFor="clockInTime">Clock In Time</Label>
                          <Controller
                            name="clockInTime"
                            control={control}
                            render={({ field }) => (
                              <TimePicker id="clockInTime" {...field} />
                            )}
                          />
                        </div>
                        <div>
                          <Label htmlFor="clockOutTime">Clock Out Time</Label>
                          <Controller
                            name="clockOutTime"
                            control={control}
                            render={({ field }) => (
                              <TimePicker id="clockOutTime" {...field} />
                            )}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {scheduleType === "Event" && (
              <>
                <Controller
                  name="bulkUpload"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bulkEventUpload"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="bulkEventUpload">Bulk Events Template</Label>
                    </div>
                  )}
                />

                {bulkUpload ? (
                  <div>
                    <Button variant="outline" onClick={handleDownloadTemplate}>Download Bulk Events Template</Button>
                    <Input type="file" className="mt-2" />
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="eventName">Event Name</Label>
                      <Controller
                        name="eventName"
                        control={control}
                        render={({ field }) => (
                          <Input id="eventName" {...field} />
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Controller
                          name="startDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              selectedDate={field.value ?? undefined}
                              onDateChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="startTime">Start Time</Label>
                        <Controller
                          name="clockInTime"
                          control={control}
                          render={({ field }) => (
                            <TimePicker id="startTime" {...field} />
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Controller
                          name="endDate"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              selectedDate={field.value ?? undefined}
                              onDateChange={field.onChange}
                            />
                          )}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime">End Time</Label>
                        <Controller
                          name="clockOutTime"
                          control={control}
                          render={({ field }) => (
                            <TimePicker id="endTime" {...field} />
                          )}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="aboutEvent">About Event</Label>
                      <Controller
                        name="aboutEvent"
                        control={control}
                        render={({ field }) => (
                          <Textarea id="aboutEvent" placeholder="Enter event details (optional)" {...field} />
                        )}
                      />
                    </div>
                    <div>
                      <Label htmlFor="attachFile">Attach File</Label>
                      <Input type="file" id="attachFile" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="recurring"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <Switch
                            id="recurring"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label htmlFor="recurring">Recurring</Label>
                    </div>
                    {watch("recurring") && (
                      <Controller
                        name="recurringType"
                        control={control}
                        defaultValue="daily"
                        render={({ field }) => (
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                            <div className="flex flex-wrap gap-4">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="daily" id="daily" />
                                <Label htmlFor="daily">Daily</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="weekly" id="weekly" />
                                <Label htmlFor="weekly">Weekly</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="monthly" id="monthly" />
                                <Label htmlFor="monthly">Monthly</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="quarterly" id="quarterly" />
                                <Label htmlFor="quarterly">Quarterly</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="annually" id="annually" />
                                <Label htmlFor="annually">Annually</Label>
                              </div>
                            </div>
                          </RadioGroup>
                        )}
                      />
                    )}
                  </>
                )}
              </>
            )}

            <div className="flex justify-between">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </Button>
              <Button type="button" variant="outline" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateSchedule;

