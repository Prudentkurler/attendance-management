// pages/roster-scheduling.tsx
import React, { useState, useMemo } from 'react';
import { FilterSection, SearchInput, ActionButton, DataTable, DateRangePicker } from '../components';
import { User, Schedule } from '../types';

interface RosterCell {
  userId: string;
  date: string;
  schedule?: Schedule;
  status: 'assigned' | 'leave' | 'excuse' | 'unassigned';
}

export default function RosterSchedulingPage() {
  const [viewType, setViewType] = useState<'weekly' | 'monthly'>('weekly');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [rosterData, setRosterData] = useState<RosterCell[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const dateRange = useMemo(() => {
    const dates: Date[] = [];
    let current = new Date(startDate);
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }, [startDate, endDate]);

  const columns = useMemo(() => {
    return [
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
      ...dateRange.map(date => ({
        key: date.toISOString(),
        title: date.toLocaleDateString(),
        render: (cell: RosterCell) => (
          <div
            className={`p-2 rounded ${
              cell.status === 'assigned' ? 'bg-green-100' :
              cell.status === 'leave' ? 'bg-red-100' :
              cell.status === 'excuse' ? 'bg-orange-100' :
              'bg-gray-50'
            }`}
          >
            {cell.schedule?.abbreviation || '-'}
          </div>
        ),
      })),
    ];
  }, [dateRange]);

  const handleCellClick = (cell: RosterCell) => {
    if (!selectedSchedule) return;

    setRosterData(prev => prev.map(item => 
      item.userId === cell.userId && item.date === cell.date
        ? { ...item, schedule: selectedSchedule, status: 'assigned' }
        : item
    ));
  };

  const handleBulkAssign = () => {
    if (!selectedSchedule) return;

    setRosterData(prev => prev.map(item => 
      selectedUsers.includes(item.userId) && selectedDates.includes(item.date)
        ? { ...item, schedule: selectedSchedule, status: 'assigned' }
        : item
    ));
  };

  const handleExportCSV = () => {
    // Implementation for CSV export
    console.log('Exporting CSV...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Roster Scheduling</h1>
        
        <FilterSection onFilterChange={() => {}} />
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                viewType === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setViewType('weekly')}
            >
              Weekly
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                viewType === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setViewType('monthly')}
            >
              Monthly
            </button>
          </div>
          
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          
          <select
            className="px-3 py-2 border rounded-md"
            onChange={(e) => setSelectedSchedule(JSON.parse(e.target.value))}
          >
            <option value="">Select Schedule</option>
            {/* Add schedule options */}
          </select>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <SearchInput onSearch={() => {}} placeholder="Search by Name/ID" />
          
          <ActionButton
            label="Select All Users"
            onClick={() => {}}
            variant="secondary"
          />
          
          <ActionButton
            label="Select All Dates"
            onClick={() => {}}
            variant="secondary"
          />
          
          <ActionButton
            label="Download Template"
            onClick={() => {}}
            variant="secondary"
          />
          
          <ActionButton
            label="Download CSV"
            onClick={handleExportCSV}
            variant="primary"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={rosterData}
        onRowClick={handleCellClick}
      />
    </div>
  );
}
