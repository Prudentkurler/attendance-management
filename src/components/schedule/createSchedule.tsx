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

type ScheduleType = "Attendance" | "Event";
type ScheduleCategory = "Long Period" | "Weekly/Monthly Roster";

const CreateSchedule: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [scheduleType, setScheduleType] = useState<ScheduleType>("Attendance");
  const [bulkUpload, setBulkUpload] = useState(false);
  const [scheduleCategory, setScheduleCategory] = useState<ScheduleCategory>("Long Period");

  const handleClear = () => {
    // Reset all form fields here
    setScheduleType("Attendance");
    setBulkUpload(false);
    setScheduleCategory("Long Period");
    // Reset other form fields as needed
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Create {scheduleType}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
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

                    {/* Add more form fields based on the selected category */}
                    {scheduleCategory === "Long Period" && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate">Start Date</Label>
                            <Input type="date" id="startDate" />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date</Label>
                            <Input type="date" id="endDate" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="scheduleStatus">Schedule Status</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Limited">Limited</SelectItem>
                              <SelectItem value="Unlimited">Unlimited</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {scheduleCategory === "Weekly/Monthly Roster" && (
                      <>
                        <div>
                          <Label htmlFor="clockInTime">Clock In Time</Label>
                          <Input type="time" id="clockInTime" />
                        </div>
                        <div>
                          <Label htmlFor="clockOutTime">Clock Out Time</Label>
                          <Input type="time" id="clockOutTime" />
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

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleClear}>
                Clear
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateSchedule;