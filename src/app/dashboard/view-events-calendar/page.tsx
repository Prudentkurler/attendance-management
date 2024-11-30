"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ViewEventsCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const daysInMonth = 31; // Simplified for this example
  const firstDayOfMonth = 1; // Assuming Monday is the first day of the month

  const events = [
    { name: "Event Name 1", startTime: "8am", endTime: "5pm", date: 1 },
    { name: "Event Name 2", startTime: "8am", endTime: "5pm", date: 10 },
    { name: "Event Name 3", startTime: "8am", endTime: "5pm", date: 18 },
  ];

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = events.filter((event) => event.date === i);
      days.push(
        <TableCell
          key={i}
          className="h-24 align-top border-r border-gray-300 cursor-pointer"
          onClick={() => {
            setSelectedDay(i);
            setModalOpen(true);
          }}
        >
          <div className="font-bold">{i}</div>
          {dayEvents.map((event, index) => (
            <div key={index} className="text-xs">
              {event.name}
              <br />
              {event.startTime}-{event.endTime}
            </div>
          ))}
        </TableCell>
      );
    }
    return days;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">View Events Calendar</h2>
      <div className="flex space-x-4">
        <Select onValueChange={(value) => console.log("Selected country:", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => console.log("Selected branch:", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger>
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center">
        <Button variant="outline">&lt;&lt;</Button>
        <h3 className="text-xl font-semibold">{selectedMonth}</h3>
        <Button variant="outline">&gt;&gt;</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mon</TableHead>
            <TableHead>Tue</TableHead>
            <TableHead>Wed</TableHead>
            <TableHead>Thu</TableHead>
            <TableHead>Fri</TableHead>
            <TableHead>Sat</TableHead>
            <TableHead>Sun</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(Math.ceil((daysInMonth + firstDayOfMonth - 1) / 7))].map((_, weekIndex) => (
            <TableRow className="border-b border-gray-300" key={weekIndex}>
              {[...Array(7)].map((_, dayIndex) => {
                const day = weekIndex * 7 + dayIndex - firstDayOfMonth + 2;
                return day > 0 && day <= daysInMonth
                  ? renderCalendarDays()[day - 1]
                  : <TableCell key={dayIndex} className="border-r border-gray-300" />;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Events for Day {selectedDay}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 p-3 bg-green-50">
            {events
              .filter((event) => event.date === selectedDay)
              .map((event, index) => (
                <div key={index}>
                  <p className="font-bold">{event.name}</p>
                  <p>
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
              ))}
            {events.filter((event) => event.date === selectedDay).length === 0 && (
              <p>No events for this day.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewEventsCalendar;
