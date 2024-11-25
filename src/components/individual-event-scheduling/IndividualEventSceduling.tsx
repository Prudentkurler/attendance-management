"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import TimePicker  from "@/components/ui/TimePicker";
import { DateRangePicker } from "@/components/DateRangePicker";



const IndividualEventScheduling = ({ onClose }: { onClose: () => void }) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [reminderDates, setReminderDates] = useState<{ date: Date | null; time: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
    onClose();
  };

  const addReminderDate = () => {
    setReminderDates([...reminderDates, { date: null, time: "" }]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4>Event Scheduling</h4>
      <div>
        <Label htmlFor="eventName">Enter Event Name</Label>
        <Input id="eventName" placeholder="Event name" required />
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
        <div className="flex items-center space-x-2">
          <Checkbox id="assignAllUsers" />
          <Label htmlFor="assignAllUsers">Assign All Users</Label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="users">Users</Label>
          <Select>
            <SelectTrigger id="users">
              <SelectValue placeholder="Select users" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {/* Add more users as needed */}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Start Date</Label>
          <DateRangePicker 
            startDate={new Date()} 
            endDate={new Date()} 
            onStartDateChange={(date) => console.log(date)} 
            onEndDateChange={(date) => console.log(date)} 
          />
        </div>
        <div>
          <Label>Start Time</Label>
          <TimePicker />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>End Date</Label>
          <DateRangePicker 
            startDate={new Date()} 
            endDate={new Date()} 
            onStartDateChange={(date) => console.log(date)} 
            onEndDateChange={(date) => console.log(date)} 
          />
        </div>
        <div>
          <Label>End Time</Label>
          <TimePicker />
        </div>
      </div>

      <div>
        <Label htmlFor="aboutEvent">About Event (optional)</Label>
        <Textarea id="aboutEvent" placeholder="Enter event details (max 500 words)" maxLength={500} />
      </div>

      <div>
        <Label htmlFor="attachFile">Attach File (optional)</Label>
        <Input id="attachFile" type="file" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="recurring" checked={isRecurring} onCheckedChange={(checked) => setIsRecurring(checked as boolean)} />
        <Label htmlFor="recurring">Recurring</Label>
      </div>

      {isRecurring && (
        <RadioGroup defaultValue="daily">
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
              <RadioGroupItem value="sixMonths" id="sixMonths" />
              <Label htmlFor="sixMonths">Every 6 Months</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="annually" id="annually" />
              <Label htmlFor="annually">Annually</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="twoYears" id="twoYears" />
              <Label htmlFor="twoYears">Every 2 years</Label>
            </div>
          </div>
        </RadioGroup>
      )}

      <div>
        <h3 className="text-lg font-semibold mb-2">Event Reminder (Optional)</h3>
        {reminderDates.map((reminder, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-2">
            <div>
              <Label>Set Date</Label>
              <DateRangePicker 
              startDate={new Date()} 
              endDate={new Date()}  
                onStartDateChange={(date: Date | null) => {
                  const newDates = [...reminderDates];
                  newDates[index].date = date;
                  setReminderDates(newDates);
                }} 
                onEndDateChange={(date: Date | null) => {
                  const newDates = [...reminderDates];
                  newDates[index].date = date;
                  setReminderDates(newDates);
                }} 
              />
            </div>
            <div>
              <Label>Set Time</Label>
              <TimePicker value={reminder.time} onChange={(time) => {
                const newDates = [...reminderDates];
                newDates[index].time = time;
                setReminderDates(newDates);
              }} />
            </div>
          </div>
        ))}
        <Button type="button" onClick={addReminderDate} variant="outline" className="mt-2">
          Add Date/Time
        </Button>
      </div>

      <div>
        <Label>Medium</Label>
        <RadioGroup defaultValue="sms">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sms" id="sms" />
              <Label htmlFor="sms">SMS</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="both" id="both" />
              <Label htmlFor="both">Both</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" placeholder="Reminder subject" />
      </div>

      <div>
        <Label htmlFor="reminderMessage">Reminder Message</Label>
        <Textarea id="reminderMessage" placeholder="Enter reminder message (max 500 characters)" maxLength={500} />
      </div>

      <div className="flex justify-between">
        <Button onClick={onClose} type="submit">Submit</Button>
        <Button type="button" variant="outline">Add New Event</Button>
      </div>
    </form>
  );
};

export default IndividualEventScheduling;

