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
import { DatePicker } from '@/components/ui/date-picker';
import { toast } from "@/components/ui/use-toast"
import axios from 'axios';

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [filters, activeTab]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/attendance', {
        params: { ...filters, listType: activeTab }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCheckAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleBulkAction = async (action: 'in' | 'out' | 'cancel') => {
    if (selectedUsers.length === 0 && !bulkIds) {
      toast({
        title: "Error",
        description: "Please select users or paste bulk IDs first",
        variant: "destructive",
      });
      return;
    }
    if (!clockReason) {
      toast({
        title: "Error",
        description: "Please provide a reason for the action",
        variant: "destructive",
      });
      return;
    }
    const ids = bulkIds ? bulkIds.split(',').map(id => id.trim()) : selectedUsers;
    setIsLoading(true);
    try {
      await axios.post(`/api/attendance?action=bulk${action}`, { userIds: ids, reason: clockReason });
      toast({
        title: "Success",
        description: `Bulk ${action} action completed successfully`,
      });
      fetchUsers();
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error);
      toast({
        title: "Error",
        description: `Failed to perform bulk ${action}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setSelectedUsers([]);
      setClockReason('');
      setBulkIds('');
    }
  };

  const handleExportCSV = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/attendance/export', {
        params: { ...filters, listType: activeTab },
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance_report.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast({
        title: "Success",
        description: "Report exported successfully",
      });
    } catch (error) {
      console.error('Error exporting CSV:', error);
      toast({
        title: "Error",
        description: "Failed to export report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      accessorKey: 'name',
      header: () => (
        <div className="flex items-center">
          <Checkbox
            checked={selectedUsers.length === users.length}
            onCheckedChange={handleCheckAll}
          />
          <span className="ml-2">Image/Name</span>
        </div>
      ),
      cell: ({ row }: { row: any }) => (
        <div className="flex items-center sticky left-0 bg-white z-10">
          <Checkbox
            checked={selectedUsers.includes(row.original.id)}
            onCheckedChange={() => handleUserSelect(row.original.id)}
            className="mr-2"
          />
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
        </div>
      ),
      meta: { sticky: true, stickyLeft: true },
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }: { row: any }) => (
        <div className="space-x-2">
          {activeTab === 'clockList' ? (
            <Button 
              className='bg-ds-primary text-ds-foreground font-bold hover:bg-ds-primary-dark' 
              onClick={() => handleClockAction(row.original.id, 'in')}
            >
              Clock IN
            </Button>
          ) : (
            <>
              <Button 
                onClick={() => handleClockAction(row.original.id, 'out')}
                className="bg-red-500 font-bold text-white"
              >
                Clock OUT
              </Button>
              <Button onClick={() => handleClockAction(row.original.id, 'cancel')} className='font-bold' variant="outline">
                Cancel
              </Button>
            </>
          )}
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
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'lastSeen', header: 'Last Seen' },
  ];

  const handleClockAction = async (userId: string, action: 'in' | 'out' | 'cancel') => {
    setIsLoading(true);
    try {
      await axios.post(`/api/attendance?action=clock${action}`, { userId, reason: clockReason });
      toast({
        title: "Success",
        description: `User clocked ${action} successfully`,
      });
      fetchUsers();
    } catch (error) {
      console.error(`Error clocking ${action}:`, error);
      toast({
        title: "Error",
        description: `Failed to clock ${action} user. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 max-w-full gap-6 flex flex-col mx-auto">
      <h1 className="text-2xl font-bold mb-6">Clock Attendance</h1>

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
      <div className='flex flex-col gap-3'>
        {/* ... (filter inputs) ... */}
      </div>

      <Button onClick={() => setShowMoreFilters(!showMoreFilters)} className="mb-1 w-1/2 md:w-[150px] font-semibold">
        {showMoreFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>

      {showMoreFilters && (
        <div>
          {/* ... (more filter inputs) ... */}
        </div>
      )}

      <Button onClick={() => setFilters({})} size='default' variant="outline" className="w-[100px] mb-6">
        Clear Filters
      </Button>

      {/* Bulk Actions */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <Textarea
          value={clockReason}
          onChange={(e) => setClockReason(e.target.value)}
          placeholder="Reason for clocking"
          className="w-full"
        />

        <div className='flex w-full flex-row-reverse gap-4 items-center'>
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

          <div className="mb-6 w-full">
            <Label htmlFor="bulkIds">Paste Bulk Clock-In/Out IDs</Label>
            <Textarea
              id="bulkIds"
              value={bulkIds}
              onChange={(e) => setBulkIds(e.target.value)}
              placeholder="Enter user IDs "
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={users}
        isLoading={isLoading}
      />

      <div className="mt-4 text-right">
        Total {activeTab === 'clockList' ? 'Absentees' : 'Attendees'}: {users.length}
      </div>

      <div className="flex justify-end mt-6">
        <Button size='sm' onClick={handleExportCSV} className="bg-ds-primary hover:bg-ds-primary-dark font-bold text-ds-foreground">
          Export CSV
        </Button>
      </div>
    </Card>
  );
}

