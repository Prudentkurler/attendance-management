'use client'

import { useState, useEffect } from 'react'
import { format, addDays, isSameMonth } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'

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

  useEffect(() => {
    // Mock data initialization
    setUsers([
      {
        id: '1',
        name: 'Helena Abbey',
        image: '/placeholder.svg?height=50&width=50',
        clockIns: 20,
        clockOuts: 20,
        adminClockIns: 2,
        adminClockOuts: 1,
        totalHours: 160,
        breakOverstayHrs: 2,
        absentDays: 1,
        leaveDays: 2,
        excuseDutyDays: 0,
        validated: false,
        validatedBy: '',
        overtimeHours: 5,
        lateHours: 1,
        clockOutBeforeTimeHrs: 0,
        totalWorkHours: 158,
        totalAttendanceExpected: 168,
        country: 'Ghana',
        branch: 'Accra',
        category: 'Staff',
        group: 'IT',
        subgroup: 'Development',
        phone: '+233123456789',
      },
      // Add more mock users as needed
    ])

    setUserBreakdowns([
      {
        id: '1',
        name: 'Helena Abbey',
        records: [
          { date: '2024-01-01', clockIn: '08:00', clockOut: '17:00', clockedBy: 'Self' },
          { date: '2024-01-02', clockIn: '08:05', clockOut: '17:00', clockedBy: 'Admin 1' },
          // Add more daily records
        ],
        phone: '+233123456789',
        country: 'Ghana',
        branch: 'Accra',
        category: 'Staff',
        group: 'IT',
        subgroup: 'Development',
        schedule: 'Regular',
      },
      // Add more mock user breakdowns as needed
    ])
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with filters:', filters)
  }

  const handleSelectAll = () => {
    setSelectedUsers(users.map(user => user.id))
  }

  const handleValidateAll = () => {
    // Implement validate all logic here
    console.log('Validating all selected users')
  }

  const handleDownloadReport = () => {
    // Implement download report logic here
    console.log('Downloading report')
  }

  const handleDownloadBreakdown = () => {
    // Implement download breakdown logic here
    console.log('Downloading report breakdown')
  }

  const handleValidateUser = (userId: string) => {
    // Implement validate user logic here
    console.log('Validating user:', userId)
  }

  const isDateRangeValid = () => {
    if (filters.reportType === 'breakdown' && filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate)
      const end = new Date(filters.endDate)
      return isSameMonth(start, end) && end.getTime() - start.getTime() <= 30 * 24 * 60 * 60 * 1000
    }
    return true
  }

  return (
    <div className="p-6 max-w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold">History Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select onValueChange={(value) => handleFilterChange('userType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="User Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="individual">Individual</SelectItem>
            <SelectItem value="organization">Organization</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('country', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ghana">Ghana</SelectItem>
            <SelectItem value="nigeria">Nigeria</SelectItem>
            {/* Add more countries */}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('branch', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="accra">Accra</SelectItem>
            <SelectItem value="kumasi">Kumasi</SelectItem>
            {/* Add more branches */}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="management">Management</SelectItem>
            {/* Add more categories */}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('group', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="it">IT</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            {/* Add more groups */}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('subgroup', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Subgroup" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            {/* Add more subgroups */}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('schedule', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Schedule" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="shift">Shift</SelectItem>
            {/* Add more schedules */}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('reportType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="summary">Summary Report</SelectItem>
            <SelectItem value="breakdown">Report Breakdown</SelectItem>
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
          type="text"
          placeholder="Search [Name/ID]"
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
        <Button onClick={handleSearch} className="bg-[#006994] text-white">
          Filter
        </Button>
      </div>

      {!isDateRangeValid() && (
        <p className="text-red-500">For Report Breakdown, please select a date range within one month.</p>
      )}

      <div className="flex flex-wrap gap-4">
        <Button onClick={handleSelectAll} variant="secondary">
          Check All
        </Button>
        <Button onClick={handleValidateAll} className="bg-[#004D1B] text-white">
          Validate All
        </Button>
        <Button onClick={handleDownloadReport} className="bg-[#006994] text-white">
          Download Report CSV/Excel
        </Button>
        <Button onClick={handleDownloadBreakdown} className="bg-[#006994] text-white">
          Download Report Breakdown
        </Button>
      </div>

      {filters.reportType === 'summary' ? (
        <Table>
          <TableHeader>
            <TableRow className="bg-[#212D40] text-white">
              <TableHead className="font-semibold">Select</TableHead>
              <TableHead className="font-semibold">User Image/Name</TableHead>
              <TableHead className="font-semibold">User ID</TableHead>
              <TableHead className="font-semibold">User Clock In</TableHead>
              <TableHead className="font-semibold">User Clock Out</TableHead>
              <TableHead className="font-semibold">Admin Clock Ins</TableHead>
              <TableHead className="font-semibold">Admin Clock Outs</TableHead>
              <TableHead className="font-semibold">Total Hours</TableHead>
              <TableHead className="font-semibold">Break Overstay Hrs</TableHead>
              <TableHead className="font-semibold">Absent Days</TableHead>
              <TableHead className="font-semibold">Leave Days</TableHead>
              <TableHead className="font-semibold">Excuse Duty Days</TableHead>
              <TableHead className="font-semibold">Validated</TableHead>
              <TableHead className="font-semibold">Validated By</TableHead>
              <TableHead className="font-semibold">Overtime Hours</TableHead>
              <TableHead className="font-semibold">Late Hours</TableHead>
              <TableHead className="font-semibold">Clock Out Before Time Hrs</TableHead>
              <TableHead className="font-semibold">Total Work Hours</TableHead>
              <TableHead className="font-semibold">Total Attendance Expected</TableHead>
              <TableHead className="font-semibold">Country</TableHead>
              <TableHead className="font-semibold">Branch</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Group</TableHead>
              <TableHead className="font-semibold">Subgroup</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedUsers(prev => [...prev, user.id])
                      } else {
                        setSelectedUsers(prev => prev.filter(id => id !== user.id))
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="flex items-center">
                  <Image src={user.image} alt={user.name} width={32} height={32} className="rounded-full mr-2" />
                  {user.name}
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.clockIns}</TableCell>
                <TableCell>{user.clockOuts}</TableCell>
                <TableCell>{user.adminClockIns}</TableCell>
                <TableCell>{user.adminClockOuts}</TableCell>
                <TableCell>{user.totalHours}</TableCell>
                <TableCell>{user.breakOverstayHrs}</TableCell>
                <TableCell>{user.absentDays}</TableCell>
                <TableCell>{user.leaveDays}</TableCell>
                <TableCell>{user.excuseDutyDays}</TableCell>
                <TableCell>{user.validated ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.validatedBy}</TableCell>
                <TableCell>{user.overtimeHours}</TableCell>
                <TableCell>{user.lateHours}</TableCell>
                <TableCell>{user.clockOutBeforeTimeHrs}</TableCell>
                <TableCell>{user.totalWorkHours}</TableCell>
                <TableCell>{user.totalAttendanceExpected}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>{user.category}</TableCell>
                <TableCell>{user.group}</TableCell>
                <TableCell>{user.subgroup}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Button onClick={() => handleValidateUser(user.id)} className="bg-[#004D1B] text-white">
                    Validate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-[#212D40] text-white">
              <TableHead className="font-semibold">Name</TableHead>
              {Array.from({ length: 31 }, (_, i) => (
                <TableHead key={i} className="font-semibold">{i + 1}</TableHead>
              ))}
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Country</TableHead>
              <TableHead className="font-semibold">Branch</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Group</TableHead>
              <TableHead className="font-semibold">Subgroup</TableHead>
              <TableHead className="font-semibold">Schedule</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userBreakdowns.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                {Array.from({ length: 31 }, (_, i) => {
                  const date = addDays(new Date(filters.startDate), i)
                  const record = user.records.find(r => r.date === format(date, 'yyyy-MM-dd'))
                  return (
                    <TableCell key={i}>
                      {record && (
                        <>
                          <div>{record.clockIn}: Self</div>
                          <div>{record.clockOut}: {record.clockedBy}</div>
                        </>
                      )}
                    </TableCell>
                  )
                })}
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.branch}</TableCell>
                <TableCell>{user.category}</TableCell>
                <TableCell>{user.group}</TableCell>
                <TableCell>{user.subgroup}</TableCell>
                <TableCell>{user.schedule}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}