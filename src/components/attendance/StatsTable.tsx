"use client";

import React from 'react';
import {
  ColumnDef,

} from "@tanstack/react-table";



import { absentees, attendees, lateComers } from './AttendanceData';
import { DataTable } from '../ui/data-table';



const StatsTable: React.FC = () => {
  const data = [
    {
      period: 'Today',
      attendees: attendees.Today,
      lateComers: lateComers.Today,
      absentees: absentees.Today,
    },
    {
      period: 'Yesterday',
      attendees: attendees.Yesterday,
      lateComers: lateComers.Yesterday,
      absentees: absentees.Yesterday,
    },
    {
      period: 'Week',
      attendees: attendees.week,
      lateComers: lateComers.week,
      absentees: absentees.week,
    },
    {
      period: 'Month',
      attendees: attendees.month,
      lateComers: lateComers.month,
      absentees: absentees.month,
    },
  ];

  const columns: ColumnDef<typeof data[0]>[] = [
    {
      header: 'Period',
      accessorKey: 'period',
      cell: ({ getValue }) => (
        <span
          className="hover:cursor-pointer hover:bg-blue-100"
          
        >
          {getValue() as string}
        </span>
      ),
    },
    {
      header: 'Attendees',
      accessorKey: 'attendees',
    },
    {
      header: 'Late Comers',
      accessorKey: 'lateComers',
    },
    {
      header: 'Absentees',
      accessorKey: 'absentees',
    },
  ];

  return (
    <div className='w-full overflow-x-auto shadow-md mt-8'>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default StatsTable;
