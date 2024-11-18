'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

type User = {
  id: string;
  name: string;
  image: string;
  schedules: { [key: string]: string };
};

export default function RosterScheduling() {
  const [filters, setFilters] = useState({
    country: '',
    branch: '',
    category: '',
    group: '',
    subgroup: '',
    rosterType: '',
    startDate: '',
    endDate: '',
    schedule: '',
    time: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Helena Abbey',
      image: '/placeholder.svg?height=50&width=50',
      schedules: { '2024-01-01': 'DS', '2024-01-02': '', '2024-01-03': 'AS' },
    },
    {
      id: '2',
      name: 'Daniel Ababio',
      image: '/placeholder.svg?height=50&width=50',
      schedules: { '2024-01-01': '', '2024-01-02': '', '2024-01-03': 'DS' },
    },
    {
      id: '3',
      name: 'Yaw Ansah',
      image: '/placeholder.svg?height=50&width=50',
      schedules: { '2024-01-01': '', '2024-01-02': 'DS', '2024-01-03': '' },
    },
  ]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportCSV = () => {
    const dates = ['2024-01-01', '2024-01-02', '2024-01-03']; // Modify based on schedule dates
    const csvHeader = ['ID', 'Name', 'Image URL', ...dates].join(',');
    const csvRows = users.map((user) => {
      const scheduleValues = dates.map((date) => user.schedules[date] || '');
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

  const handleAssignedSchedule = (userId: string) => {
    alert(`Assigned Schedule for User ID: ${userId}`);
  };

  const handleUnassignedSchedule = (userId: string) => {
    alert(`Unassigned Schedule for User ID: ${userId}`);
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
    ...['2024-01-01', '2024-01-02', '2024-01-03'].map((date) => ({
      accessorKey: date,
      header: date,
      cell: ({ row }: { row: any }) => {
        const schedule = row.original.schedules[date];
        const bgColor =
          schedule === 'DS'
            ? 'bg-green-500 text-white'
            : schedule === 'AS'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100';
        return <span className={`p-2 rounded ${bgColor}`}>{schedule || ''}</span>;
      },
    })),
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }: { row: any }) => (
        <div className="flex space-x-2">
          <Button size='sm' onClick={() => handleAssignedSchedule(row.original.id)} >
            Assigned
          </Button>
          <Button size='sm' onClick={() => handleUnassignedSchedule(row.original.id)} className="bg-red-500 text-white">
            Unassigned
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="p-6 max-w-7xl mx-auto space-y-6">
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

        <Input
          type="date"
          placeholder="Start Date"
          onChange={(e) => handleFilterChange('startDate', e.target.value)}
        />
        <Input
          type="date"
          placeholder="End Date"
          onChange={(e) => handleFilterChange('endDate', e.target.value)}
        />
      </div>

      {/* Search */}
      <div className="flex gap-3 flex-col md:flex-row justify-between">
        <Input
          placeholder="Search [Name/ID]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-lg"
        />
        <div className="space-x-4">
          <Checkbox onCheckedChange={(checked) => setSelectedUsers(checked ? users.map((u) => u.id) : [])} />
          <span className='text-sm'>Select All Users</span>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={users} />

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className='hidden md:flex'>Download Bulk Roster Template</Button>
        <Button size='sm' onClick={handleExportCSV} variant="default" className='bg-ds-primary text-ds-foreground'>
          Export CSV
        </Button>

      </div>
    </Card>
  );
}
