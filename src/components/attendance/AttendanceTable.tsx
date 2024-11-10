"use client"
import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import data from './AttendanceData';
import { CSVLink } from 'react-csv'; 
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { FaSliders } from 'react-icons/fa6';

interface AttendanceTableProps {
  selectedPeriod: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ selectedPeriod }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null); // for start date filter
  

  // Advanced Filters
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubgroup, setSelectedSubgroup] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // Filter data to only include entries with an exact match for the selected period and the search term
  const filteredData = data.filter(
    (entry) => {
      // Filter by period, name, and advanced filters
      const matchesPeriodAndName = entry.period === selectedPeriod && entry.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry = selectedCountry ? entry.country === selectedCountry : true;
      const matchesSchedule = selectedSchedule ? entry.schedule === selectedSchedule : true;
      const matchesGroup = selectedGroup ? entry.group === selectedGroup : true;
      const matchesSubgroup = selectedSubgroup ? entry.subgroup === selectedSubgroup : true;
      const matchesBranch = selectedBranch ? entry.branch === selectedBranch : true;
      const matchesRegion = selectedRegion ? entry.region === selectedRegion : true;

      // Additional filter by start date and end date if provided
      const matchesStartDate = startDate ? (entry.start_date ? new Date(entry.start_date).getTime() >= startDate.getTime() : false) : true;
      

      return matchesPeriodAndName && matchesCountry && matchesSchedule && matchesGroup && matchesSubgroup && matchesBranch && matchesRegion && matchesStartDate 
    }
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  // Handle page change
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Format data for CSV export
  const csvData = filteredData.map((entry) => ({
    ID: entry.id,
    Name: entry.name,
    Period: entry.period,
    'Start Date': entry.start_date ? new Date(entry.start_date).toLocaleString() : 'N/A',
    'End Date': entry.end_date ? new Date(entry.end_date).toLocaleString() : 'N/A',
    Schedule: entry.schedule,
    Country: entry.country,
    Region: entry.region,
    Branch: entry.branch,
    Category: entry.category,
    Group: entry.group,
    Subgroup: entry.subgroup,
  }));

  const uniqueCountries = Array.from(new Set(data.map(entry => entry.country)));
  const uniqueSchedules = Array.from(new Set(data.map(entry => entry.schedule)));
    const uniqueGroups = Array.from(new Set(data.map(entry => entry.group)));
    const uniqueSubgroups = Array.from(new Set(data.map(entry => entry.subgroup)));
    const uniqueBranches = Array.from(new Set(data.map(entry => entry.branch)));
    const uniqueRegions = Array.from(new Set(data.map(entry => entry.region)));

    const clearFilters = () => {
        setSelectedCountry('');
        setSelectedSchedule('');
        setSelectedGroup('');
        setSelectedSubgroup('');
        setSelectedBranch('');
        setSelectedRegion('');
        setStartDate(null);
        };



  return (
    <div className="w-full h-auto p-4 gap-4 flex mt-5 flex-col rounded-lg shadow-lg">
      <div className="flex gap-6 items-center justify-evenly w-full">
        <h4 className="text-blue-900 w-[70%] md:w-[27%] text-sm md:text-md font-bold">
          Attendance Overview
        </h4>
        <div className="hidden md:flex relative w-[50%]">
          <BiSearch className="absolute top-3 left-2 text-gray-600 font-bold" />
          <input
            type="text"
            placeholder="Quick Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full p-2 ring-2 ring-gray-300 rounded-md focus:ring-blue-500"
          />
        </div>

        {/* Date Filter - Start Date */}
        <div className="flex items-center">
          <div className="relative">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              className="p-2 pl-7 border-2 border-gray-300 rounded-sm shadow-sm text-gray-700 bg-blue-100 focus:ring-2 focus:ring-blue-400 focus:outline-none w-[140px]"
              dateFormat="dd MMM yyyy"
              placeholderText="Start Date"
            />
            <FaCalendarAlt className="absolute top-3 left-2 text-gray-400" />
          </div>
        </div>

        {/* Advanced Filter */}
        <button
          className="bg-blue-500 text-white text-md p-2 rounded-md w-[30%] font-semibold flex items-center gap-2"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          <FaSliders />
          <p>Advanced Filter</p>
        </button>
      </div>

      {showAdvancedFilters && (
        <div className="mt-4 p-4 border-2 border-gray-300 rounded-md bg-blue-50">
          <div className="flex gap-4">

            
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Country</option>
            {uniqueCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
            
            <select value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)} className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <option value="">Schedule</option>
              {/* Add options for schedules */}
              {uniqueSchedules.map((schedule) => (
                <option key={schedule} value={schedule}>
                  {schedule}
                </option>
              ))}
            </select>
            <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <option value="">Group</option>
              {/* Add options for groups */}
              {uniqueGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <select value={selectedSubgroup} onChange={(e) => setSelectedSubgroup(e.target.value)} className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <option value="">Subgroup</option>
              {/* Add options for subgroups */}
              {uniqueSubgroups.map((subgroup) => (
                <option key={subgroup} value={subgroup}>
                  {subgroup}
                </option>
              ))}
            </select>
            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <option value="">Branch</option>
              {/* Add options for branches */}
              {uniqueBranches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="p-2 border-2 border-gray-300 rounded-md shadow-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none">
              <option value="">Region</option>
              {/* Add options for regions */}
              {uniqueRegions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <button
              onClick={clearFilters}
              className="bg-red-500 text-white p-2 rounded-md font-semibold"
            >
                Clear 
            </button>
        
            
           
            
          </div>
        </div>
      )}

      <div className="overflow-x-scroll w-full">
        <table className="pl-4 w-full">
          <thead>
            <tr className="border-y-2 p-4 text-[11px] md:text-sm border-gray-300 mt-3 text-gray-400 font-serif">
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Period</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">End Date</th>
              <th className="p-4">Schedule</th>
              <th className="p-4">Country</th>
              <th className="p-4">Region</th>
              <th className="p-4">Branch</th>
              <th className="p-4">Category</th>	
              <th className="p-4">Group</th>
              <th className="p-4">Subgroup</th>
            </tr>
          </thead>
          <tbody>
                      {currentEntries.map((entry) => (
                        <tr key={entry.id}>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.id}</td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.name}</td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.period}</td>
                          <td
                            className={
                              entry.start_date == null
                                ? 'p-2 text-center text-gray-600 text-sm font-semibold bg-red-200'
                                : 'p-2 text-center text-gray-600 text-sm font-semibold'
                            }
                          >
                            {entry.start_date ? new Date(entry.start_date).toLocaleString() : 'N/A'}
                          </td>
                          <td
                            className={
                              entry.end_date == null
                                ? 'p-2 text-center text-gray-600 text-sm font-semibold bg-red-200'
                                : 'p-2 text-center text-gray-600 text-sm font-semibold'
                            }
                          >
                            {entry.end_date ? new Date(entry.end_date).toLocaleString() : 'N/A'}
                          </td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.schedule}</td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.country}</td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.region}</td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.branch}</td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.category}</td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.group}</td>
                          <td className="p-2 text-center text-gray-600 text-sm font-semibold">{entry.subgroup}</td>
                        </tr>
                      ))}
                    </tbody>
                      </table>
              
                      {/* Pagination Controls and Export CSV button */}
                      <div className="w-full flex flex-row justify-between items-center mt-5">
                        <div className="flex flex-row gap-1 items-center">
                          <button onClick={handleBack} className="border-2 border-gray-300 p-1 rounded-sm" disabled={currentPage === 1}>
                            <IoChevronBack />
                          </button>
                          <p className="p-1 px-4 text-white font-semibold bg-gray-400">
                            {currentPage} / {totalPages}
                          </p>
                          <button
                            onClick={handleNext}
                            className="border-2 border-gray-300 p-1 rounded-sm"
                            disabled={currentPage === totalPages}
                          >
                            <IoChevronForward />
                          </button>
                        </div>
              
                        <button className="bg-red-500 text-sm p-1 font-semibold text-white rounded-sm">
                          <CSVLink data={csvData} filename="attendance_data.csv">
                            Export to CSV
                          </CSVLink>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              };
              
              export default AttendanceTable;
              