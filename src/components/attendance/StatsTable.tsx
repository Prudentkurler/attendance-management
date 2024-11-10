import React from 'react';
import { absentees, attendees, lateComers } from './AttendanceData';

interface StatsTableProps {
  onPeriodSelect: (period: string) => void;
}

const StatsTable: React.FC<StatsTableProps> = ({ onPeriodSelect }) => {
  return (
    <div className='w-full overflow-x-scroll shadow-md mt-8'>
      <table className='p-3 w-full'>
        <thead className='w-full py-2 bg-gray-300'>
          <tr className='border-y-2 p-4 text-[11px]  md:text-sm border-gray-300 mt-3 text-gray-900 font-serif'>
            <th>Period</th>
            <th>Attendees</th>
            <th>Late Comers</th>
            <th>Absentees</th>
           
          </tr>
        </thead>
        <tbody>
          <tr className='border-y-2 text-center hover:cursor-pointer hover:bg-blue-100' onClick={() => onPeriodSelect('Today')}>
            <td>Today</td>
            <td>{attendees.Today}</td>
            <td>{lateComers.Today}</td>
            <td>{absentees.Today}</td>
          
          </tr>
          <tr  className='border-y-2  text-center hover:cursor-pointer hover:bg-blue-100 ' onClick={() => onPeriodSelect('Yesterday')}>
            <td>Yesterday</td>
            <td>{attendees.Yesterday}</td>
            <td>{lateComers.Yesterday}</td>
            <td>{absentees.Yesterday}</td>
       
          </tr>
          <tr  className='border-y-2 text-center  hover:cursor-pointer hover:bg-blue-100 'onClick={() => onPeriodSelect('Week')}>
            <td>Week</td>
            <td>{attendees.week}</td>
            <td>{lateComers.week}</td>
            <td>{absentees.week}</td>
      
          </tr>
          <tr  className='border-y-2 text-center  hover:cursor-pointer hover:bg-blue-100 ' onClick={() => onPeriodSelect('Month')}>
            <td>Month</td>
            <td>{attendees.month}</td>
            <td>{lateComers.month}</td>
            <td>{absentees.month}</td>
          
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable;
