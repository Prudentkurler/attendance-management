'use client'

import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';

type Shift = 'DS' | 'NS'

type UserShift = {
  date: Date
  shift: Shift
  startTime: string
  endTime: string
  actualClockIn?: string
  actualClockOut?: string
}

type User = {
  id: string
  name: string
  shifts: UserShift[]
  workedHours: number
  lateHours: number
  overtimeHours: number
  absentDays: number
}

export default function ViewAssignedRoster() {
  const [filters, setFilters] = useState({
    country: '',
    branch: '',
    category: '',
    group: '',
    subgroup: '',
    schedule: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
  })
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Mock data initialization
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Sam Kofi',
        shifts: [],
        workedHours: 120,
        lateHours: 50,
        overtimeHours: 100,
        absentDays: 2,
      },
      {
        id: '2',
        name: 'Sarah Baah',
        shifts: [],
        workedHours: 120,
        lateHours: 50,
        overtimeHours: 100,
        absentDays: 1,
      },
    ]

    // Generate mock shifts for the selected month
    const start = startOfMonth(selectedMonth)
    const end = endOfMonth(selectedMonth)
    const days = eachDayOfInterval({ start, end })

    mockUsers.forEach(user => {
      user.shifts = days.map(day => ({
        date: day,
        shift: Math.random() > 0.5 ? 'DS' : 'NS',
        startTime: '08:00',
        endTime: '17:00',
        actualClockIn: Math.random() > 0.2 ? '08:05' : undefined,
        actualClockOut: Math.random() > 0.2 ? '17:02' : undefined,
      }))
    })

    setUsers(mockUsers)
  }, [selectedMonth])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setFilters(prev => ({ ...prev, startDate, endDate }))
  }

  const handleExport = () => {
    // Implement export logic here
    console.log('Exporting roster data...')
  }

  const [showFilters, setShowFilters] = useState<boolean>(false)
  const handleShowFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">View Assigned Roster</h1>

        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Select
                value={filters.country}
                onValueChange={(value) => handleFilterChange('country', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ghana">Ghana</SelectItem>
                  <SelectItem value="nigeria">Nigeria</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.branch}
                onValueChange={(value) => handleFilterChange('branch', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="accra">Accra</SelectItem>
                  <SelectItem value="kumasi">Kumasi</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="management">Management</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.group}
                onValueChange={(value) => handleFilterChange('group', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.subgroup}
                onValueChange={(value) => handleFilterChange('subgroup', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Subgroup" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.schedule}
                onValueChange={(value) => handleFilterChange('schedule', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="shift">Shift</SelectItem>
                </SelectContent>
              </Select>
              <div>
                <label htmlFor="startDate" className="block mb-2">
                  Start Date
                </label>
                <Input
                  id="startDate"
                  type="date"
                  value={filters.startDate instanceof Date ? filters.startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateRangeChange(new Date(e.target.value), filters.endDate)}
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block mb-2">
                  End Date
                </label>
                <Input
                  id="endDate"
                  type="date"
                  value={filters.endDate ? filters.endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => handleDateRangeChange(filters.startDate, new Date(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Button onClick={handleShowFilters}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {format(selectedMonth, 'MMMM yyyy')}
          </h2>
          <Button
            className="bg-ds-primary text-ds-foreground font-bold hover:bg-ds-primary-dark"
            onClick={handleExport}
          >
            Export Roster
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] sticky left-0 bg-white z-10">User</TableHead>
                {eachDayOfInterval({
                  start: startOfMonth(selectedMonth),
                  end: endOfMonth(selectedMonth),
                }).map((day) => (
                  <TableHead key={day.toISOString()} className="p-2 text-center">
                    {format(day, 'd')}
                  </TableHead>
                ))}
                <TableHead className="text-right">Worked Hours</TableHead>
                <TableHead className="text-right">Late Hours</TableHead>
                <TableHead className="text-right">Overtime</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium sticky left-0 z-10 bg-white">
                    {user.name}
                  </TableCell>
                  {user.shifts.map((shift) => (
                    <TableCell key={shift.date.toISOString()} className="p-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`cursor-pointer text-center p-2 ${
                              shift.shift === 'DS' ? 'bg-blue-100' : 'bg-purple-100'
                            }`}
                          >
                            {/* Shift Type */}
                            <div>{shift.shift}</div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="p-2 text-sm text-center shadow-md bg-white rounded-md">
                          {/* Time Details */}
                          <div>{`Clock-in: ${shift.actualClockIn || ''}`}</div>
                          <div>{`Clock-out: ${shift.actualClockOut || '-'}`}</div>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  ))}
                  <TableCell className="text-right">{user.workedHours}hrs</TableCell>
                  <TableCell className="text-right">{user.lateHours}hrs</TableCell>
                  <TableCell className="text-right">{user.overtimeHours}hrs</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </TooltipProvider>
  )
}
