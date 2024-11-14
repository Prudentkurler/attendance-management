// pages/attendance-history.tsx
import React, { useState } from 'react';
import { FilterSection, SearchInput, ActionButton, DataTable, DateRangePicker } from '../components';

interface AttendanceReport {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  totalClockIns: number;
  totalClockOuts: number;
  adminClockIns: number;
  adminClockOuts: number;
  totalHours: number;
  overtimeHours: number;
  lateHours: number;
  validated: boolean;
}

interface DailyBreakdown {
  date: Date;
  clockIn: Date;
  clockOut: Date;
  clockSource: 'Self' | 'Admin';
  hours: number;
  status: 'On Time' | 'Late' | 'Early Leave';
}

export default function AttendanceHistoryPage() {
  const [viewType, setViewType] = useState<'summary' | 'breakdown'>('summary');
  const [reports, setReports] = useState<AttendanceReport[]>([]);
  const [breakdowns, setBreakdowns] = useState<DailyBreakdown[]>([]);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const summaryColumns = [
    {
      key: 'user',
      title: 'User',
      render: (report: AttendanceReport) => (
        <div className="flex items-center">
          <img
            src={report.userImage}
            alt={report.userName}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <div className="font-medium">{report.userName}</div>
            <div className="text-sm text-gray-500">{report.userId}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'clockEvents',
      title: 'Clock Events',
      render: (report: AttendanceReport) => (
        <div>
          <div>In: {report.totalClockIns} (Admin: {report.adminClockIns})</div>
          <div>Out: {report.totalClockOuts} (Admin: {report.adminClockOuts})</div>
        </div>
      ),
    },
    {
      key: 'hours',
      title: 'Hours',
      render: (report: AttendanceReport) => (
        <div>
          <div>Total: {report.totalHours}h</div>
          <div>OT: {report.overtimeHours}h</div>
          <div>Late: {report.lateHours}h</div>
        </div>
      ),
    },
    {
      key: 'validation',
      title: 'Validation',
      render: (report: AttendanceReport) => (
        <div className="flex items-center">
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              report.validated
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {report.validated ? 'Validated' : 'Pending'}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (report: AttendanceReport) => (
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => handleViewBreakdown(report.id)}
          >
            View Details
          </button>
          {!report.validated && (
            <button
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => handleValidate(report.id)}
            >
              Validate
            </button>
          )}
        </div>
      ),
    },
  ];

  const breakdownColumns = [
    {
      key: 'date',
      title: 'Date',
      render: (date: Date) => date.toLocaleDateString(),
    },
    {
      key: 'clockIn',
      title: 'Clock In',
      render: (date: Date) => date.toLocaleTimeString(),
    },
    {
      key: 'clockOut',
      title: 'Clock Out',
      render: (date: Date) => date.toLocaleTimeString(),
    },
    {
      key: 'clockSource',
      title: 'Source',
      render: (source: 'Self' | 'Admin') => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            source === 'Self'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-purple-100 text-purple-800'
          }`}
        >
          {source}
        </span>
      ),
    },
    {
      key: 'hours',
      title: 'Hours',
      render: (hours: number) => `${hours}h`,
    },
    {
      key: 'status',
      title: 'Status',
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === 'On Time'
              ? 'bg-green-100 text-green-800'
              : status === 'Late'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  const handleViewBreakdown = (reportId: string) => {
    setSelectedReport(reportId);
    setViewType('breakdown');
  };

  const handleValidate = (reportId: string) => {
    // Implementation for validation
    console.log('Validating report:', reportId);
  };

  const handleExport = () => {
    // Implementation for export
    console.log('Exporting data...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Attendance History</h1>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md ${
              viewType === 'summary'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setViewType('summary')}
          >
            Summary
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              viewType === 'breakdown'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setViewType('breakdown')}
          >
            Breakdown
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <FilterSection onFilterChange={() => {}} />

        <div className="flex flex-wrap gap-4 mt-4">
          <select className="px-3 py-2 border rounded-md">
            <option value="">User Type</option>
            {/* Add user type options */}
          </select>

          <select className="px-3 py-2 border rounded-md">
            <option value="">Schedule</option>
            {/* Add schedule options */}
          </select>

          <DateRangePicker
            startDate={new Date()}
            endDate={new Date()}
            onStartDateChange={() => {}}
            onEndDateChange={() => {}}
          />

          <SearchInput
            onSearch={() => {}}
            placeholder="Search by name or ID..."
          />
        </div>

        <div className="flex justify-end mt-4">
          <ActionButton
            label="Export Report"
            onClick={handleExport}
            variant="primary"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <DataTable
          columns={viewType === 'summary' ? summaryColumns : breakdownColumns}
          data={viewType === 'summary' ? reports : breakdowns}
          onRowClick={() => {}}
        />
      </div>
    </div>
  );
}
