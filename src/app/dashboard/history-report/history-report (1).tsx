'use client'

import { useState } from 'react'
import { format } from 'date-fns'

type User = {
  id: string
  name: string
  image: string
  clockIns: number
  clockOuts: number
  adminClockIns: number
  adminClockOuts: number
  totalHours: number
  breakOverstayHrs: number
  absentDays: number
  leaveDays: number
  excuseDutyDays: number
  validated: boolean
  validatedBy: string
  overtimeHours: number
  lateHours: number
  clockOutBeforeTimeHrs: number
  totalWorkHours: number
  totalAttendanceExpected: number
  country: string
  branch: string
  category: string
  group: string
  subgroup: string
  phone: string
}

type DailyRecord = {
  date: string
  clockIn: string
  clockOut: string
  clockedBy: string
}

type UserBreakdown = {
  id: string
  name: string
  records: DailyRecord[]
  phone: string
  country: string
  branch: string
  category: string
  group: string
  subgroup: string
  schedule: string
}

export default function HistoryReport() {
  const [filters, setFilters] = useState({
    userType: '',
    country: '',
    branch: '',
    category: '',
    group: '',
    subgroup: '',
    schedule: '',
    reportType: 'summary',
    startDate: '',
    endDate: '',
    search: '',
  })
  const [users, setUsers] = useState<User[]>([])
  const [userBreakdowns, setUserBreakdowns] = useState<UserBreakdown[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSearch = () => {
    // Implement search logic here
  }

  const handleSelectAll = () => {
    setSelectedUsers(users.map(user => user.id))
  }

  const handleValidateAll = () => {
    // Implement validate all logic here
  }

  const handleDownloadReport = () => {
    // Implement download report logic here
  }

  const handleDownloadBreakdown = () => {
    // Implement download breakdown logic here
  }

  const handleValidateUser = (userId: string) => {
    // Implement validate user logic here
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">History Report</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <select name="userType" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">User Type</option>
          <option value="all">All</option>
          <option value="individual">Individual</option>
          <option value="organization">Organization</option>
        </select>
        <select name="country" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Country</option>
          {/* Add country options */}
        </select>
        <select name="branch" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Branch</option>
          {/* Add branch options */}
        </select>
        <select name="category" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Category</option>
          {/* Add category options */}
        </select>
        <select name="group" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Group</option>
          {/* Add group options */}
        </select>
        <select name="subgroup" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Subgroup</option>
          {/* Add subgroup options */}
        </select>
        <select name="schedule" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Schedule</option>
          {/* Add schedule options */}
        </select>
        <select name="reportType" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="summary">Summary Report</option>
          <option value="breakdown">Report Breakdown</option>
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
        <input
          type="text"
          name="search"
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm"
          placeholder="Search [Name/ID]"
        />
        <button onClick={handleSearch} className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9">
          Filter
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={handleSelectAll} className="bg-[#999999] text-white px-2 py-1 text-sm font-semibold rounded h-9 mr-2">
          Check All
        </button>
        <button onClick={handleValidateAll} className="bg-[#004D1B] text-white px-2 py-1 text-sm font-semibold rounded h-9 mr-2">
          Validate All
        </button>
        <button onClick={handleDownloadReport} className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9 mr-2">
          Download Report CSV/Excel
        </button>
        <button onClick={handleDownloadBreakdown} className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9">
          Download Report Breakdown
        </button>
      </div>

      {filters.reportType === 'summary' ? (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-[#212D40] text-white h-10">
              <th className="border p-2 text-md font-semibold">Select</th>
              <th className="border p-2 text-md font-semibold">User Image/Name</th>
              <th className="border p-2 text-md font-semibold">User ID</th>
              <th className="border p-2 text-md font-semibold">User Clock In</th>
              <th className="border p-2 text-md font-semibold">User Clock Out</th>
              <th className="border p-2 text-md font-semibold">Admin Clock Ins</th>
              <th className="border p-2 text-md font-semibold">Admin Clock Outs</th>
              <th className="border p-2 text-md font-semibold">Total Hours</th>
              <th className="border p-2 text-md font-semibold">Break Overstay Hrs</th>
              <th className="border p-2 text-md font-semibold">Absent Days</th>
              <th className="border p-2 text-md font-semibold">Leave Days</th>
              <th className="border p-2 text-md font-semibold">Excuse Duty Days</th>
              <th className="border p-2 text-md font-semibold">Validated</th>
              <th className="border p-2 text-md font-semibold">Validated By</th>
              <th className="border p-2 text-md font-semibold">Overtime Hours</th>
              <th className="border p-2 text-md font-semibold">Late Hours</th>
              <th className="border p-2 text-md font-semibold">Clock Out Before Time Hrs</th>
              <th className="border p-2 text-md font-semibold">Total Work Hours</th>
              <th className="border p-2 text-md font-semibold">Total Attendance Expected</th>
              <th className="border p-2 text-md font-semibold">Country</th>
              <th className="border p-2 text-md font-semibold">Branch</th>
              <th className="border p-2 text-md font-semibold">Category</th>
              <th className="border p-2 text-md font-semibold">Group</th>
              <th className="border p-2 text-md font-semibold">Subgroup</th>
              <th className="border p-2 text-md font-semibold">Phone</th>
              <th className="border p-2 text-md font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="bg-white">
                <td className="border p-2 text-sm font-normal">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => setSelectedUsers(prev =>
                      prev.includes(user.id) ? prev.filter(id => id !== user.id) : [...prev, user.id]
                    )}
                  />
                </td>
                <td className="border p-2 text-sm font-normal flex items-center">
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                  {user.name}
                </td>
                <td className="border p-2 text-sm font-normal">{user.id}</td>
                <td className="border p-2 text-sm font-normal">{user.clockIns}</td>
                <td className="border p-2 text-sm font-normal">{user.clockOuts}</td>
                <td className="border p-2 text-sm font-normal">{user.adminClockIns}</td>
                <td className="border p-2 text-sm font-normal">{user.adminClockOuts}</td>
                <td className="border p-2 text-sm font-normal">{user.totalHours}</td>
                <td className="border p-2 text-sm font-normal">{user.breakOverstayHrs}</td>
                <td className="border p-2 text-sm font-normal">{user.absentDays}</td>
                <td className="border p-2 text-sm font-normal">{user.leaveDays}</td>
                <td className="border p-2 text-sm font-normal">{user.excuseDutyDays}</td>
                <td className="border p-2 text-sm font-normal">{user.validated ? 'Yes' : 'No'}</td>
                <td className="border p-2 text-sm font-normal">{user.validatedBy}</td>
                <td className="border p-2 text-sm font-normal">{user.overtimeHours}</td>
                <td className="border p-2 text-sm font-normal">{user.lateHours}</td>
                <td className="border p-2 text-sm font-normal">{user.clockOutBeforeTimeHrs}</td>
                <td className="border p-2 text-sm font-normal">{user.totalWorkHours}</td>
                <td className="border p-2 text-sm font-normal">{user.totalAttendanceExpected}</td>
                <td className="border p-2 text-sm font-normal">{user.country}</td>
                <td className="border p-2 text-sm font-normal">{user.branch}</td>
                <td className="border p-2 text-sm font-normal">{user.category}</td>
                <td className="border p-2 text-sm font-normal">{user.group}</td>
                <td className="border p-2 text-sm font-normal">{user.subgroup}</td>
                <td className="border p-2 text-sm font-normal">{user.phone}</td>
                <td className="border p-2 text-sm font-normal">
                  <button
                    onClick={() => handleValidateUser(user.id)}
                    className="bg-[#004D1B] text-white px-2 py-1 text-sm font-semibold rounded h-9"
                  >
                    Validate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-[#212D40] text-white h-10">
              <th className="border p-2 text-md font-semibold">Name</th>
              {Array.from({ length: 31 }, (_, i) => (
                <th key={i} className="border p-2 text-md font-semibold">{i + 1}</th>
              ))}
              <th className="border p-2 text-md font-semibold">Phone</th>
              <th className="border p-2 text-md font-semibold">Country</th>
              <th className="border p-2 text-md font-semibold">Branch</th>
              <th className="border p-2 text-md font-semibold">Category</th>
              <th className="border p-2 text-md font-semibold">Group</th>
              <th className="border p-2 text-md font-semibold">Subgroup</th>
              <th className="border p-2 text-md font-semibold">Schedule</th>
            </tr>
          </thead>
          <tbody>
            {userBreakdowns.map(user => (
              <tr key={user.id} className="bg-white">
                <td className="border p-2 text-sm font-normal">{user.name}</td>
                {Array.from({ length: 31 }, (_, i) => {
                  const record = user.records.find(r => parseInt(r.date.split('-')[2]) === i + 1)
                  return (
                    <td key={i} className="border p-2 text-sm font-normal">
                      {record ? (
                        <>
                          <div>{record.clockIn}: Self</div>
                          <div>{record.clockOut}: {record.clockedBy}</div>
                        </>
                      ) : null}
                    </td>
                  )
                })}
                <td className="border p-2 text-sm font-normal">{user.phone}</td>
                <td className="border p-2 text-sm font-normal">{user.country}</td>
                <td className="border p-2 text-sm font-normal">{user.branch}</td>
                <td className="border p-2 text-sm font-normal">{user.category}</td>
                <td className="border p-2 text-sm font-normal">{user.group}</td>
                <td className="border p-2 text-sm font-normal">{user.subgroup}</td>
                <td className="border p-2 text-sm font-normal">{user.schedule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}