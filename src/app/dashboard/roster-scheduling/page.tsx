'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';

type User = {
  id: string;
  name: string;
  image: string;
  schedules: { [key: string]: string };
};

type Schedule = {
  id: string;
  name: string;
  abbreviation: string;
};

export default function RosterScheduling() {
  const [filters, setFilters] = useState({
    country: '',
    branch: '',
    category: '',
    group: '',
    subgroup: '',
    rosterType: 'Weekly',
    startDate: '',
    endDate: '',
    schedule: '',
    time: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Helena Abbey',
      image: '/placeholder.svg?height=50&width=50',
      schedules: {},
    },
    {
      id: '2',
      name: 'Daniel Ababio',
      image: '/placeholder.svg?height=50&width=50',
      schedules: {},
    },
    {
      id: '3',
      name: 'Yaw Ansah',
      image: '/placeholder.svg?height=50&width=50',
      schedules: {},
    },
  ]);
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: '1', name: 'Day Shift', abbreviation: 'DS' },
    { id: '2', name: 'Afternoon Shift', abbreviation: 'AS' },
  ]);
  const [showAssigned, setShowAssigned] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [dateRange, setDateRange] = useState<string[]>([]);

  useEffect(() => {
    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate);
      const end = new Date(filters.endDate);
      const days = eachDayOfInterval({ start, end });
      setDateRange(days.map(day => format(day, 'yyyy-MM-dd')));
    }
  }, [filters.startDate, filters.endDate]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      if (name === 'rosterType') {
        if (value === 'Weekly') {
          const start = new Date();
          const end = new Date(start);
          end.setDate(start.getDate() + 6);
          newFilters.startDate = format(start, 'yyyy-MM-dd');
          newFilters.endDate = format(end, 'yyyy-MM-dd');
        } else if (value === 'Monthly') {
          const start = startOfMonth(new Date());
          const end = endOfMonth(new Date());
          newFilters.startDate = format(start, 'yyyy-MM-dd');
          newFilters.endDate = format(end, 'yyyy-MM-dd');
        }
      }
      return newFilters;
    });
  };

  const handleExportCSV = () => {
    const csvHeader = ['ID', 'Name', 'Image URL', ...dateRange].join(',');
    const csvRows = users.map((user) => {
      const scheduleValues = dateRange.map((date) => user.schedules[date] || '');
      return [user.id, user.name, user.image, ...scheduleValues].join(',');
    });

    const csvContent = [csvHeader, ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'roster_schedules.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAssignSchedule = (userId: string, date: string) => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (user.id === userId) {
          const newSchedules = { ...user.schedules };
          if (newSchedules[date]) {
            delete newSchedules[date];
          } else {
            newSchedules[date] = filters.schedule;
          }
          return { ...user, schedules: newSchedules };
        }
        return user;
      });
    });
    setLastUpdated(`Mr. samuel Janitey | at: ${format(new Date(), 'EEEE, MMMM d, yyyy \'at\' hh:mm:ss a')}`);
    // TODO: Implement SMS and email alert functionality here
  };

  const handleBulkAssign = () => {
    setUsers(prevUsers => {
      return prevUsers.map(user => {
        if (selectedUsers.includes(user.id)) {
          const newSchedules = { ...user.schedules };
          selectedDates.forEach(date => {
            newSchedules[date] = filters.schedule;
          });
          return { ...user, schedules: newSchedules };
        }
        return user;
      });
    });
    setLastUpdated(`Mr. samuel Janitey | at: ${format(new Date(), 'EEEE, MMMM d, yyyy \'at\' hh:mm:ss a')}`);
    // TODO: Implement SMS and email alert functionality here
  };

  const handleUploadBulkRoster = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement file parsing and roster assignment logic
      console.log('Uploaded file:', file.name);
    }
  };

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center">
          <img src={row.original.image} alt={row.original.name} className="w-8 h-8 rounded-full mr-2" />
          {row.original.name}
        </div>
      ),
    },
    ...dateRange.map((date) => ({
      accessorKey: date,
      header: format(new Date(date), 'EEE d'),
      cell: ({ row }: { row: any }) => {
        const schedule = row.original.schedules[date];
        let bgColor = 'bg-white';
        if (schedule) {
          bgColor = 'bg-green-500 text-white';
        } else if (Math.random() < 0.1) { // Simulating leave (10% chance)
          bgColor = 'bg-red-500';
        } else if (Math.random() < 0.1) { // Simulating excuse duty (10% chance)
          bgColor = 'bg-orange-500';
        }
        return (
          <button
            className={`p-2 rounded w-full h-full ${bgColor}`}
            onClick={() => handleAssignSchedule(row.original.id, date)}
          >
            {schedule || ''}
          </button>
        );
      },
    })),
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }: { row: any }) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleAssignSchedule(row.original.id, '')} >
            Assigned
          </Button>
          <Button onClick={() => handleAssignSchedule(row.original.id, '')} className="bg-red-500 text-white">
            Unassigned
          </Button>
        </div>
      ),
    }, 
  ];

  return (
    <Card className="p-6 max-w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Roster Scheduling</h1>

      {/* Filters */}
      <div className="flex overflow-auto gap-4">
        <Select onValueChange={(value) => handleFilterChange('country', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USA">USA</SelectItem>
            <SelectItem value="Ghana">Ghana</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('branch', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Branch 1">Branch 1</SelectItem>
            <SelectItem value="Branch 2">Branch 2</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Category 1">Category 1</SelectItem>
            <SelectItem value="Category 2">Category 2</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('group', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Group 1">Group 1</SelectItem>
            <SelectItem value="Group 2">Group 2</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('subgroup', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subgroup" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Subgroup 1">Subgroup 1</SelectItem>
            <SelectItem value="Subgroup 2">Subgroup 2</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleFilterChange('rosterType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Roster Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Weekly">Weekly</SelectItem>
            <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          placeholder="Start Date"
          value={filters.startDate}
          onChange={(e) => handleFilterChange('startDate', e.target.value)}
        />
        <Input
          type="date"
          placeholder="End Date"
          value={filters.endDate}
          onChange={(e) => handleFilterChange('endDate', e.target.value)}
        />

        <Select onValueChange={(value) => handleFilterChange('schedule', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Schedule" />
          </SelectTrigger>
          <SelectContent>
            {schedules.map(schedule => (
              <SelectItem key={schedule.id} value={schedule.abbreviation}>{schedule.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="time"
          placeholder="Select Time"
          onChange={(e) => handleFilterChange('time', e.target.value)}
        />
      </div>

      {/* Search and Select All */}
      <div className="flex justify-between">
        <Input
          placeholder="Search [Name/ID]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-lg"
        />
        <div className="space-x-4">
          <Checkbox
            checked={selectedUsers.length === users.length}
            onCheckedChange={(checked) => setSelectedUsers(checked ? users.map((u) => u.id) : [])}
          />
          <span>Select All Users</span>
        </div>
      </div>

      {/* Select All Dates */}
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={selectedDates.length === dateRange.length}
          onCheckedChange={(checked) => setSelectedDates(checked ? dateRange : [])}
        />
        <span>Select All Dates</span>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={users.filter(user => showAssigned ? Object.keys(user.schedules).length > 0 : Object.keys(user.schedules).length === 0)} />

      {/* Buttons */}
      <div className="flex justify-between items-center">
        <div>
          <Button variant="outline" className="mr-2">Download Bulk Roster Template</Button>
          <Button onClick={handleExportCSV} variant="default" className='bg-ds-primary text-ds-foreground'>
            Export CSV
          </Button>
        </div>
        <div>
          <Button onClick={() => setShowAssigned(true)} variant={showAssigned ? 'default' : 'outline'} className="mr-2">
            Assigned Schedule
          </Button>
          <Button onClick={() => setShowAssigned(false)} variant={!showAssigned ? 'default' : 'outline'} className="mr-2">
            Unassigned Schedule
          </Button>
          <Input type="file" accept=".csv" onChange={handleUploadBulkRoster} className="hidden" id="bulkUpload" />
          <Button variant="outline" onClick={() => document.getElementById('bulkUpload')?.click()}>
            Upload Bulk Roster Template
          </Button>
        </div>
      </div>

      {/* Assign Roster Button */}
      <Button onClick={handleBulkAssign} variant="default" className='bg-ds-primary text-ds-foreground'>
        ASSIGN ROSTER
      </Button>

      {/* Last Updated */}
      <div className="text-sm text-gray-500">
        Last Updated by: {lastUpdated}
      </div>
    </Card>
  );
}