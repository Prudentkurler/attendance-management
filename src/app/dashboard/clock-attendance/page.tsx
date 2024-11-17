'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

type User = {
  id: string;
  name: string;
  image: string;
  clockInTime?: string;
  clockOutTime?: string;
  location: 'Known' | 'Unknown';
  lastSeen: string;
  clockedBy?: string;
};

export default function ClockAttendance() {
  const [activeTab, setActiveTab] = useState<'clockList' | 'clockedList'>('clockList');
  const [filters, setFilters] = useState({
    userType: '',
    country: '',
    branch: '',
    category: '',
    group: '',
    subgroup: '',
    location: '',
    gender: '',
    clockType: '',
    schedule: '',
    status: '',
    startDate: '',
    endDate: '',
    setTime: '',
  });
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [clockReason, setClockReason] = useState('');

  // Initialize users on mount
  useEffect(() => {
    setUsers([
      {
        id: '1',
        name: 'Helena Abbey',
        image: '/placeholder.svg?height=50&width=50',
        location: 'Known',
        lastSeen: '2024-05-15 09:00',
      },
      {
        id: '2',
        name: 'Daniel Ababio',
        image: '/placeholder.svg?height=50&width=50',
        location: 'Unknown',
        lastSeen: '2024-05-15 08:45',
      },
    ]);
  }, []);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      userType: '',
      country: '',
      branch: '',
      category: '',
      group: '',
      subgroup: '',
      location: '',
      gender: '',
      clockType: '',
      schedule: '',
      status: '',
      startDate: '',
      endDate: '',
      setTime: '',
    });
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCheckAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]); // Uncheck all
    } else {
      setSelectedUsers(users.map((user) => user.id)); // Check all
    }
  };

  const handleBulkAction = (action: 'in' | 'out') => {
    if (selectedUsers.length === 0) {
      alert('Please select users first');
      return;
    }
    if (!clockReason) {
      alert('Please provide a reason for the action');
      return;
    }
    console.log(`Bulk ${action} for users:`, selectedUsers, 'Reason:', clockReason);
    setSelectedUsers([]);
    setClockReason('');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Location,Last Seen,Clock In Time,Clock Out Time']
        .concat(
          users.map(
            (user) =>
              `${user.id},${user.name},${user.location},${user.lastSeen},${user.clockInTime || ''},${
                user.clockOutTime || ''
              }`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      accessorKey: 'Select',
      header: () => (
        <Checkbox
          checked={selectedUsers.length === users.length}
          onCheckedChange={handleCheckAll}
        />
      ),
      cell: ({ row }: { row: any }) => (
        <Checkbox
          checked={selectedUsers.includes(row.original.id)}
          onCheckedChange={() => handleUserSelect(row.original.id)}
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Image/Name',
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center">
          <img
            src={row.original.image}
            alt={row.original.name}
            className="w-8 h-8 rounded-full mr-2"
          />
          {row.original.name}
        </div>
      ),
    },
    { accessorKey: 'clockInTime', header: 'IN', cell: ({ row }: { row: any }) => row.original.clockInTime || '-' },
    { accessorKey: 'clockOutTime', header: 'OUT', cell: ({ row }: { row: any }) => row.original.clockOutTime || '-' },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'lastSeen', header: 'Last Seen' },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }: { row: any }) => (
        activeTab === 'clockList' ? (
          <Button onClick={() => console.log('Clock IN', row.original.id)} >
            Clock IN
          </Button>
        ) : (
          <Button onClick={() => console.log('Clock OUT', row.original.id)} className="bg-red-500 text-white">
            Clock OUT
          </Button>
        )
      ),
    },
  ];

  return (
    <Card className="p-4 max-w-6xl gap-6 flex flex-col mx-auto">
      <h1 className="text-2xl font-bold mb-6">Clock Attendance</h1>

      {/* Tabs */}
      <div className="mb-4 flex space-x-4">
        <Button
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${
            activeTab === 'clockList' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'
          }`}
          onClick={() => setActiveTab('clockList')}
        >
          Clock List
        </Button>
        <Button
          className={`px-4 py-2 text-sm font-semibold rounded-lg ${
            activeTab === 'clockedList' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'
          }`}
          onClick={() => setActiveTab('clockedList')}
        >
          Clocked List
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <Select onValueChange={(value) => handleFilterChange('userType', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Users">All Users</SelectItem>
            <SelectItem value="Individuals">Individuals</SelectItem>
            <SelectItem value="Organizations">Organizations</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('country', value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USA">USA</SelectItem>
            <SelectItem value="Ghana">Ghana</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={clearFilters} variant="outline" className="w-full">
          Clear Filters
        </Button>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-4 mb-6">
        <Input
          value={clockReason}
          onChange={(e) => setClockReason(e.target.value)}
          placeholder="Reason for clocking"
          className="w-full"
        />
        <Button onClick={() => handleBulkAction('in')}>
          Bulk IN
        </Button>
        <Button onClick={() => handleBulkAction('out')} className="bg-red-500 text-white">
          Bulk OUT
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={users} />

      <div className="flex justify-end mt-6">
        <Button onClick={handleExportCSV} className="bg-ds-primary text-ds-foreground">
          Export CSV
        </Button>
      </div>
    </Card>
  );
}
