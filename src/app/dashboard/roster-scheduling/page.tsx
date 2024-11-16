"use client";

import { useState } from 'react'

type User = {
  id: string
  name: string
  image: string
  schedules: { [key: string]: string }
}

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
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Helena Abbey', image: '/placeholder.svg?height=50&width=50', schedules: { '2024-01-01': 'DS', '2024-01-02': '', '2024-01-03': 'AS' } },
    { id: '2', name: 'Daniel Ababio', image: '/placeholder.svg?height=50&width=50', schedules: { '2024-01-01': '', '2024-01-02': '', '2024-01-03': 'DS' } },
    { id: '3', name: 'Yaw Ansah', image: '/placeholder.svg?height=50&width=50', schedules: { '2024-01-01': '', '2024-01-02': 'DS', '2024-01-03': '' } },
  ])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSearch = () => {
    // Implement search logic here
  }

  const handleSelectAllUsers = () => {
    setSelectedUsers(users.map(user => user.id))
  }

  const handleSelectAllDates = () => {
    // Implement select all dates logic here
  }

  const handleDownloadTemplate = () => {
    // Implement download template logic here
  }

  const handleDownloadCSV = () => {
    // Implement download CSV logic here
  }

  const handleAssignedSchedule = () => {
    // Implement assigned schedule logic here
  }

  const handleUnassignedSchedule = () => {
    // Implement unassigned schedule logic here
  }

  const handleUploadTemplate = () => {
    // Implement upload template logic here
  }

  const handleAssignRoster = () => {
    // Implement assign roster logic here
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Roster Scheduling</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <select name="country" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Country</option>
          {/* Add country options */}
        </select>
        <select name="branch" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Branch</option>
          {/* Add branch options */}
        </select>
        <select name="category" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Category</option>
          {/* Add category options */}
        </select>
        <select name="group" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Group</option>
          {/* Add group options */}
        </select>
        <select name="subgroup" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Subgroup</option>
          {/* Add subgroup options */}
        </select>
        <select name="rosterType" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Roster Type</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <input
          type="date"
          name="startDate"
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm"
          placeholder="Start Date"
        />
        <input
          type="date"
          name="endDate"
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm"
          placeholder="End Date"
        />
        <select name="schedule" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Schedule</option>
          {/* Add schedule options */}
        </select>
        <input
          type="time"
          name="time"
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm"
          placeholder="Select Time"
        />
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search [Name/ID]"
            className="border p-2 rounded text-sm mr-2"
          />
          <button onClick={handleSearch} className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedUsers.length === users.length}
              onChange={handleSelectAllUsers}
              className="mr-2"
            />
            <span className="text-sm">Select All Users</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={selectedDates.length > 0}
              onChange={handleSelectAllDates}
              className="mr-2"
            />
            <span className="text-sm">Select All Dates</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mb-4">
        <button onClick={handleDownloadTemplate} className="bg-[#999999] text-white px-2 py-1 text-sm font-semibold rounded h-9">
          Download Bulk Roster Template
        </button>
        <button onClick={handleDownloadCSV} className="bg-[#999999] text-white px-2 py-1 text-sm font-semibold rounded h-9">
          Download CSV
        </button>
        <button onClick={handleAssignedSchedule} className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9">
          Assigned Schedule
        </button>
        <button onClick={handleUnassignedSchedule} className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9">
          Unassigned Schedule
        </button>
      </div>

      <p className="text-sm mb-4">
        Last Updated by: Mr. samuel Janitey | at: Friday, May 10, 2024 at 01:30:54 PM
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-[#212D40] text-white h-10">
              <th className="border p-2 text-md font-semibold">Days</th>
              <th className="border p-2 text-md font-semibold">Mon</th>
              <th className="border p-2 text-md font-semibold">Tue</th>
              <th className="border p-2 text-md font-semibold">Wed</th>
              <th className="border p-2 text-md font-semibold">Thu</th>
              <th className="border p-2 text-md font-semibold">Fri</th>
              <th className="border p-2 text-md font-semibold">Sat</th>
              <th className="border p-2 text-md font-semibold">Sun</th>
            </tr>
            <tr className="bg-[#212D40] text-white h-10">
              <th className="border p-2 text-md font-semibold">January 2024</th>
              <th className="border p-2 text-md font-semibold">1</th>
              <th className="border p-2 text-md font-semibold">2</th>
              <th className="border p-2 text-md font-semibold">3</th>
              <th className="border p-2 text-md font-semibold">4</th>
              <th className="border p-2 text-md font-semibold">5</th>
              <th className="border p-2 text-md font-semibold">6</th>
              <th className="border p-2 text-md font-semibold">7</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="bg-white">
                <td className="border p-2 text-sm font-normal flex items-center">
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                  {user.name}
                </td>
                {['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07'].map(date => (
                  <td key={date} className={`border p-2 text-sm font-normal text-center ${
                    user.schedules[date] ? 'bg-green-500 text-white' : 
                    date === '2024-01-04' ? 'bg-red-500' : 
                    date === '2024-01-05' ? 'bg-orange-500' : ''
                  }`}>
                    {user.schedules[date] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <button onClick={handleUploadTemplate} className="bg-[#999999] text-white px-2 py-1 text-sm font-semibold rounded h-9">
          Upload Bulk Roster Template
        </button>
        <button onClick={handleAssignRoster} className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9">
          ASSIGN ROSTER
        </button>
      </div>
    </div>
  )
}