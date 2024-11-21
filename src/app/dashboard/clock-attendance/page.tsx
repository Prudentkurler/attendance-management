'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

type User = {
  id: string;
  name: string;
  image: string;
  clockInTime?: string;
  clockOutTime?: string;
  location: 'Known' | 'Unknown';
  lastSeen: string;
  clockedBy?: string;
  status?: 'Early Arrival' | 'Late Arrival';
  coordinates?: string;
  landmark?: string;
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
  const [bulkIds, setBulkIds] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize users on mount
  useEffect(() => {
    setUsers([
      {
        id: '1',
        name: 'Helena Abbey',
        image: '/placeholder.svg?height=50&width=50',
        location: 'Known',
        lastSeen: '2024-05-15 09:00',
        status: 'Early Arrival',
      },
      {
        id: '2',
        name: 'Daniel Ababio',
        image: '/placeholder.svg?height=50&width=50',
        location: 'Unknown',
        lastSeen: '2024-05-15 08:45',
        status: 'Late Arrival',
        coordinates: '5.603716, -0.187988',
        landmark: 'Independence Square',
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
    setSearchTerm('');
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

  const handleBulkAction = (action: 'in' | 'out' | 'cancel') => {
    if (selectedUsers.length === 0 && !bulkIds) {
      alert('Please select users or paste bulk IDs first');
      return;
    }
    if (!clockReason) {
      alert('Please provide a reason for the action');
      return;
    }
    const ids = bulkIds ? bulkIds.split(',').map(id => id.trim()) : selectedUsers;
    console.log(`Bulk ${action} for users:`, ids, 'Reason:', clockReason);
    // Here you would typically make an API call to perform the bulk action
    setSelectedUsers([]);
    setClockReason('');
    setBulkIds('');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Name,Location,Last Seen,Clock In Time,Clock Out Time,Status,Coordinates,Landmark']
        .concat(
          users.map(
            (user) =>
              `${user.id},${user.name},${user.location},${user.lastSeen},${user.clockInTime || ''},${
                user.clockOutTime || ''
              },${user.status || ''},${user.coordinates || ''},${user.landmark || ''}`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'attendance.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredUsers = users.filter(user => {
    if (activeTab === 'clockList' && user.clockInTime) return false;
    if (activeTab === 'clockedList' && !user.clockInTime) return false;
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase()) && !user.id.includes(searchTerm)) return false;
    if (filters.userType && filters.userType !== 'All' && user.id[0] !== filters.userType[0]) return false;
    if (filters.location && filters.location !== 'All' && user.location !== filters.location) return false;
    if (filters.status && filters.status !== 'All' && user.status !== filters.status) return false;
    return true;
  });

  const columns = [
    {
      accessorKey: 'Select',
      header: () => (
        <Checkbox
          checked={selectedUsers.length === filteredUsers.length}
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
          <Image
            src={row.original.image}
            alt={row.original.name}
            className="w-8 h-8 rounded-full mr-2"
            width={32}
            height={32}
          />
          {row.original.name}
        </div>
      ),
    },
    
    
    { 
      accessorKey: 'location', 
      header: 'Location',
      cell: ({ row }: { row: any }) => {
        const user = row.original;
        return (
          <div>
            {user.location}
            {user.location === 'Unknown' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-blue-500 underline ml-2">View</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Location Details</DialogTitle>
                  </DialogHeader>
                  <div>
                    <p>Coordinates: {user.coordinates}</p>
                    <p>Nearest Landmark: {user.landmark}</p>
                    <a href={`https://www.google.com/maps?q=${user.coordinates}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View on Google Maps
                    </a>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        );
      }
    },
    { accessorKey: 'lastSeen', header: 'Last Seen' },
    { accessorKey: 'status', header: 'Status' },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }: { row: any }) => (
        <div className="space-x-2">
          {activeTab === 'clockList' ? (
            <Button className='bg-ds-primary text-ds-foreground font-bold hover:bg-ds-primary-dark' onClick={() => console.log('Clock IN', row.original.id)}>
              Clock IN
            </Button>
          ) : (
            <>
              <Button onClick={() => console.log('Clock OUT', row.original.id)} className="bg-red-500 font-bold text-white">
                Clock OUT
              </Button>
              <Button onClick={() => console.log('Cancel', row.original.id)} className='font-bold' variant="outline">
                Cancel
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Card className="p-4 max-w-full gap-6 flex flex-col mx-auto">
      <h1 className="text-2xl font-bold mb-6">Clock Attendance</h1>

      {/* Tabs */}
      <div className="mb-4 flex space-x-4">
        <Button
          className={`px-4 py-2 text-sm font-bold rounded-lg ${
            activeTab === 'clockList' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'
          }`}
          onClick={() => setActiveTab('clockList')}
        >
          Clock List
        </Button>
        <Button
          className={`px-4 py-2 text-sm font-bold rounded-lg ${
            activeTab === 'clockedList' ? 'bg-red-500 text-white' : 'bg-gray-400 text-white'
          }`}
          onClick={() => setActiveTab('clockedList')}
        >
          Clocked List
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Select onValueChange={(value) => handleFilterChange('userType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Users</SelectItem>
            <SelectItem value="Individuals">Individuals</SelectItem>
            <SelectItem value="Organizations">Organizations</SelectItem>
          </SelectContent>
        </Select>
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
            <SelectItem value="HQ">HQ</SelectItem>
            <SelectItem value="Branch1">Branch 1</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Category1">Category 1</SelectItem>
            <SelectItem value="Category2">Category 2</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('group', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Group1">Group 1</SelectItem>
            <SelectItem value="Group2">Group 2</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('subgroup', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subgroup" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Subgroup1">Subgroup 1</SelectItem>
            <SelectItem value="Subgroup2">Subgroup 2</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Search User [Name/ID]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select onValueChange={(value) => handleFilterChange('location', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Known">Known</SelectItem>
            <SelectItem value="Unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('gender', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* More Filters */}
      <div className="mb-4">
        <Button onClick={() => setShowMoreFilters(!showMoreFilters)}>
          {showMoreFilters ? 'Hide More Filters' : 'Show More Filters'}
        </Button>
      </div>
      {showMoreFilters && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Select onValueChange={(value) => handleFilterChange('schedule', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Schedule1">Schedule 1</SelectItem>
              <SelectItem value="Schedule2">Schedule 2</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Early Arrival">Early Arrival</SelectItem>
              <SelectItem value="Late Arrival">Late Arrival</SelectItem>
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
          <Input
            type="time"
            placeholder="Set Time"
            onChange={(e) => handleFilterChange('setTime', e.target.value)}
          />
        </div>
      )}

      <Button onClick={clearFilters} variant="outline" className="w-full mb-6">
        Clear Filters
      </Button>

      {/* Bulk Actions */}
      <div className="flex items-center gap-4 mb-6">
        <Textarea
          value={clockReason}
          onChange={(e) => setClockReason(e.target.value)}
          placeholder="Reason for clocking"
          className="w-full"
        />
        {activeTab === 'clockList' ? (
          <Button className='bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark font-bold' onClick={() => handleBulkAction('in')}>
            Bulk IN
          </Button>
        ) : (
          <>
            <Button onClick={() => handleBulkAction('out')} className="bg-red-500 text-white">
              Bulk OUT
            </Button>
            <Button onClick={() => handleBulkAction('cancel')} variant="outline">
              Bulk Cancel
            </Button>
          </>
        )}
      </div>

      {/* Bulk IDs Input */}
      <div className="mb-6">
        <Label htmlFor="bulkIds">Paste Bulk Clock-In/Out IDs</Label>
        <Textarea
          id="bulkIds"
          value={bulkIds}
          onChange={(e) => setBulkIds(e.target.value)}
          placeholder="Enter user IDs separated by commas"
          className="mt-2"
        />
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filteredUsers} />

      {/* Total Count */}
      <div className="mt-4 text-right">
        Total {activeTab === 'clockList' ? 'Absentees' : 'Attendees'}: {filteredUsers.length}
      </div>

      <div className="flex justify-end mt-6">
        <Button size='sm' onClick={handleExportCSV} className="bg-ds-primary hover:bg-ds-primary-dark font-bold text-ds-foreground">
          Export CSV
        </Button>
      </div>
    </Card>
  );
}