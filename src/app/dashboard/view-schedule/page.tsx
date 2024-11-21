import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const UpdateSchedulePage: React.FC = () => {
  const [schedules, setSchedules] = useState([
    { id: 1, name: "Morning Shift", branch: "HQ", startTime: "08:00 AM", closingTime: "05:00 PM", assignedUsers: 120, locations: "HQ", duration: "Start/end date" },
    { id: 2, name: "Weekly Meeting", branch: "West Branch", startTime: "09:00 AM", closingTime: "11:00 AM", assignedUsers: 60, locations: "Virtual", duration: "Start/end date" },
    { id: 3, name: "Night Shift", branch: "HQ", startTime: "10:00 PM", closingTime: "06:00 AM", assignedUsers: 80, locations: "HQ", duration: "Roster Schedule" },
  ]);

  const handleEdit = (id: number) => {
    // Handle edit logic
    console.log(`Editing schedule with id: ${id}`);
  };

  const handleArchive = (id: number) => {
    // Handle archive logic
    console.log(`Archiving schedule with id: ${id}`);
  };

  const handleAddAgenda = (id: number) => {
    // Handle add agenda logic
    console.log(`Adding agenda to schedule with id: ${id}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Update Attendance Schedules</h2>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {/* Add more countries as needed */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {/* Add more branches as needed */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
              <SelectItem value="management">Management</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="space-x-2">
          <Button variant="outline">Check All</Button>
          <Button variant="outline">Download</Button>
          <Button variant="outline">View Archived Schedules</Button>
        </div>
        <Input className="w-64" placeholder="Search schedules..." />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Schedule Name</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>Closing Time</TableHead>
            <TableHead>Assigned Users</TableHead>
            <TableHead>Locations</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.name}</TableCell>
              <TableCell>{schedule.branch}</TableCell>
              <TableCell>{schedule.startTime}</TableCell>
              <TableCell>{schedule.closingTime}</TableCell>
              <TableCell>{schedule.assignedUsers} [View]</TableCell>
              <TableCell>{schedule.locations} {schedule.locations !== "Virtual" && "(View)"}</TableCell>
              <TableCell>{schedule.duration}</TableCell>
              <TableCell>
                <Button variant="link" onClick={() => handleEdit(schedule.id)}>Edit</Button>
                <Button variant="link" onClick={() => handleArchive(schedule.id)}>Archive</Button>
                <Button variant="link" onClick={() => handleAddAgenda(schedule.id)}>Add Agenda</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UpdateSchedulePage;

