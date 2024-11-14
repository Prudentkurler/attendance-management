"use client"

// pages/clock-attendance.tsx
import React, { useState } from 'react';

import { ClockEvent, User, Location } from '../types';
import { FilterSection } from '@/components/FilterSection';

interface AttendanceRecord {
  id: string;
  user: User;
  clockIn?: Date;
  clockOut?: Date;
  location: Location;
  lastSeen: Date;
  status: 'present' | 'absent' | 'late';
}

export default function Page() {
  const [view, setView] = useState<'list' | 'clocked'>('list');
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);

  const listColumns = [
    {
      key: 'user',
      title: 'User',
      render: (user: User) => (
        <div className="flex items-center">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'schedule',
      title: 'Schedule',
      render: (schedule: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {schedule}
        </span>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === 'present'
              ? 'bg-green-100 text-green-800'
              : status === 'late'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      key: 'location',
      title: 'Location',
      render: (location: Location) => (
        <div>
          {location.type === 'KNOWN' ? (
            <span className="text-green-600">✓ Known Location</span>
          ) : (
            <button className="text-blue-600 hover:underline">
              View on Map
            </button>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (record: AttendanceRecord) => (
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handleClockIn(record.id)}
          >
            Clock In
          </button>
          <button
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            onClick={() => handleCancel(record.id)}
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  const clockedColumns = [
    {
      key: 'user',
      title: 'User',
      render: (user: User) => (
        <div className="flex items-center">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-500">{user.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'clockIn',
      title: 'Clock In',
      render: (date: Date) => date.toLocaleTimeString(),
    },
    {
      key: 'clockOut',
      title: 'Clock Out',
      render: (date?: Date) => date?.toLocaleTimeString() || '-',
    },
    {
      key: 'location',
      title: 'Location',
      render: (location: Location) => (
        <div>
          {location.type === 'KNOWN' ? (
            <span className="text-green-600">✓ Known Location</span>
          ) : (
            <button className="text-blue-600 hover:underline">
              View on Map
            </button>
          )}
        </div>
      ),
    },
    {
      key: 'lastSeen',
      title: 'Last Seen',
      render: (date: Date) => date.toLocaleString(),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (record: AttendanceRecord) => (
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handleClockOut(record.id)}
          >
            Clock Out
          </button>
          <button
            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => handleCancel(record.id)}
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  const handleClockIn = (id: string) => {
    // Implementation for clock in
    console.log('Clock in:', id);
  };

  const handleClockOut = (id: string) => {
    // Implementation for clock out
    console.log('Clock out:', id);
  };

  const handleCancel = (id: string) => {
    // Implementation for cancel
    console.log('Cancel:', id);
  };

  const handleBulkClockIn = () => {
    // Implementation for bulk clock in
    console.log('Bulk clock in:', selectedRecords);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clock Attendance</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              view === 'list'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setView('list')}
          >
            Attendance List
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              view === 'clocked'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setView('clocked')}
          >
            Clocked List
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <FilterSection onFilterChange={() => {}} />
        
        <div className="flex flex-wrap gap-4 mt-4">
          <select className="px-3 py-2 border rounded-md">
            <option value="">Location Status</option>
            <option value="known">Known</option>
            <option value="unknown">Unknown</option>
          </select>

          <select className="px-3 py-2 border rounded-md">
            <option value="">Schedule</option>
            {/* Add schedule options */}
            </select>
            </div>
            </div>
            </div>
  )
}

