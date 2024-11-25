'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { format, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Removed redundant User type definition

type Schedule = {
  id: string;
  name: string;
  abbreviation: string;
};


interface User {
  id: string;
  name: string;
  schedules: { [date: string]: string };
  leave: { [date: string]: boolean };
  excuse: { [date: string]: boolean };
}

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

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
 
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
      return [user.id, user.name, ...scheduleValues].join(',');
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

  const [users, setUsers] = useState<User[]>([
    {
      id: 'user1',
      name: 'User 1',
      schedules: {
        '2023-05-01': 'DS',
        '2023-05-02': 'AS',
        '2023-05-03': 'DS',
      },
      leave: {
        '2023-05-04': true,
      },
      excuse: {
        '2023-05-05': true,
      },
    },
    {
      id: 'user2',
      name: 'User 2',
      schedules: {
        '2023-05-01': 'AS',
        '2023-05-02': 'DS',
        '2023-05-03': 'AS',
      },
      leave: {
        '2023-05-04': true,
      },
      excuse: {
        '2023-05-05': true,
      },
    },
    {
      id: 'user3',
      name: 'User 3',
      schedules: {
        '2023-05-01': 'DS',
        '2023-05-02': 'DS',
        '2023-05-03': 'AS',
      },
      leave: {
        '2023-05-04': true,
      },
      excuse: {
        '2023-05-05': true,
      },
    },]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  
  const handleUserSelect = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleScheduleSelect = (schedule: string) => {
    setSelectedSchedule(schedule);
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate) {
      setStartDate(date);
      setEndDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleAssignRoster = () => {
    // Assign the selected schedule to the selected users for the selected date range
    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      if (user) {
        for (let i = startDate?.getDate() || 0; i <= (endDate?.getDate() || 0); i++) {
          const date = new Date(startDate?.getFullYear() || 0, startDate?.getMonth() || 0, i);
          user.schedules[date.toISOString().slice(0, 10)] = selectedSchedule;
        }
      }
    });
    setSelectedUsers([]);
    setSelectedSchedule('');
    setStartDate(null);
    setEndDate(null);
  };

  interface ColumnRenderProps {
    name: string;
    user: User;
  }

  const columns: ColumnDef<User>[] = [
    {
      header: 'User',
      accessorKey: 'name',
      cell: ({ row }: { row: { original: User } }) => {
        const user = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Checkbox checked={selectedUsers.includes(user.id)} onChange={() => handleUserSelect(user.id)} />
            <span>{user.name}</span>
          </div>
        );
      },
    },
    ...Array.from({ length: (endDate?.getDate() || 0) - (startDate?.getDate() || 0) + 1 }, (_, i) => {
      const date = new Date(startDate?.getFullYear() || 0, startDate?.getMonth() || 0, (startDate?.getDate() || 0) + i);
      const dateStr = date.toISOString().slice(0, 10);
      return {
        header: date.toDateString(),
        accessorKey: dateStr,
        cell: ({ row }: { row: { original: User } }) => {
          const user = row.original;
          return (
            <div className="flex items-center justify-between">
              {user.schedules[dateStr] ? (
                <span className={`${user.leave[dateStr] ? 'text-red-500' : user.excuse[dateStr] ? 'text-orange-500' : ''}`}>
                  {user.schedules[dateStr]}
                </span>
              ) : (
                '-'
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-2 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* Render schedule options for this date here */}
                  <button onClick={() => handleScheduleSelect('DS')}>Day Shift</button>
                  <button onClick={() => handleScheduleSelect('AS')}>Afternoon Shift</button>
                </DropdownMenuContent>
              </DropdownMenu>
              {user.leave[dateStr] && (
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-red-500">L</span>
                  </TooltipTrigger>
                  <TooltipContent>On Leave</TooltipContent>
                </Tooltip>
              )}
              {user.excuse[dateStr] && (
                <Tooltip>
                  <TooltipTrigger>
                    <span className="text-orange-500">E</span>
                  </TooltipTrigger>
                  <TooltipContent>On Excuse</TooltipContent>
                </Tooltip>
              )}
            </div>
          );
        },
      };
    }),
  ];

  const [showFilters, setShowFilters] = useState<boolean>(false)

  const handleShowFilters = ()=>{
    setShowFilters(!showFilters)
  }
  return (
    <Card className="p-6 max-w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Roster Scheduling</h1>

     {/* Filters */}
{
  showFilters && (
    <div>

   
    <div className="flex  gap-3 w-full">
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
      </div>
      <div className='flex mt-3 flex-col md:flex-row gap-3'>

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

        </div>
   
  )
}


<Button onClick={handleShowFilters} className='font-semibold'>Filters</Button>
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