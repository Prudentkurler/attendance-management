'use client'

import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TooltipProvider } from '@/components/ui/tooltip'
import { FaChevronDown } from 'react-icons/fa'

type Shift = 'DS' | 'NS' | 'Undo'

type UserShift = {
  date: Date
  shift: Shift | null
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
    rosterType: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
  })
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [selectAllUsers, setSelectAllUsers] = useState<boolean>(false)
  const [selectAllDates, setSelectAllDates] = useState<boolean>(false)
  const [showAssignedSchedule, setShowAssignedSchedule] = useState<boolean>(true)
  const [shiftTypeDropdown, setShiftTypeDropdown] = useState<{ [key: string]: boolean }>({})
  const [userShiftAssignments, setUserShiftAssignments] = useState<{ [key: string]: { [key: string]: Shift | null } }>({})

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
        shift: null,
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

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSelectAllUsers = (checked: boolean) => {
    setSelectAllUsers(checked)
    if (checked) {
      setSelectedUsers(users.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectAllDates = (checked: boolean) => {
    setSelectAllDates(checked)
    if (checked) {
      setSelectedDates(eachDayOfInterval({ start: startOfMonth(selectedMonth), end: endOfMonth(selectedMonth) }))
    } else {
      setSelectedDates([])
    }
  }

  const handleDownloadBulkRosterTemplate = () => {
    // Implement the logic to generate and download the template
    console.log('Downloading Bulk Roster Template...')
  }

  const handleDownloadCSV = () => {
    // Implement the logic to generate and download the CSV file
    console.log('Downloading CSV...')
  }

  const handleAssignedSchedule = () => {
    setShowAssignedSchedule(true)
  }

  const handleUnassignedSchedule = () => {
    setShowAssignedSchedule(false)
  }

  const handleShiftTypeAssignment = (userId: string, date: Date, shiftType: Shift) => {
    // Implement the logic to assign the shift type to the user on the specified date
    console.log(`Assigning ${shiftType} to user ${userId} on ${date.toISOString()}`)

    setUserShiftAssignments(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [date.toISOString()]: shiftType === 'Undo' ? null : shiftType,
      },
    }))

    // Send SMS and email notifications to the user
    sendNotifications(userId, date, shiftType)
  }

  const handleBulkAssignment = () => {
    // Implement the logic to bulk assign the selected users and dates
    console.log('Bulk assigning selected users and dates...')

    // Send SMS and email notifications to the selected users
    selectedUsers.forEach(userId => {
      selectedDates.forEach(date => {
        sendNotifications(userId, date, 'DS')
      })
    })
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sendNotifications = (userId: string, date: Date, shiftType: Shift) => {
    // Implement the logic to send SMS and email notifications to the user
    console.log(`Sending notifications to user ${userId} for shift type ${shiftType} on ${date.toISOString()}`)
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold"> Roster Schedule</h1>

        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Filter components */}
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-center">
          <Button onClick={handleShowFilters}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search [Name/ID]"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            <Button onClick={handleDownloadBulkRosterTemplate}>
              Download Bulk Roster Template
            </Button>
            <Button onClick={handleDownloadCSV}>
              Download CSV
            </Button>
            <Button onClick={handleAssignedSchedule}>
              Assigned Schedule
            </Button>
            <Button onClick={handleUnassignedSchedule}>
              Unassigned Schedule
            </Button>
          </div>
        </div>

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
                <TableHead className="w-[200px] sticky left-0 bg-white z-10">
                  User
                </TableHead>
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
                <TableHead className="w-[50px] sticky left-0 bg-white z-10">
                  <Checkbox
                    checked={selectAllUsers}
                    onCheckedChange={handleSelectAllUsers}
                  />
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="w-[200px] sticky left-0 z-10 bg-white font-medium">
                    {user.name}
                  </TableCell>
                 
{user.shifts.map((shift) => (
  <TableCell key={shift.date.toISOString()} className="border-1 border relative">
    {userShiftAssignments[user.id]?.[shift.date.toISOString()] ? (
      <div
        className={`cursor-pointer text-center ${
          userShiftAssignments[user.id]?.[shift.date.toISOString()] === "DS"
            ? "bg-blue-100"
            : userShiftAssignments[user.id]?.[shift.date.toISOString()] === "NS"
            ? "bg-purple-100"
            : "bg-gray-100"
        }`}
      >
        {userShiftAssignments[user.id]?.[shift.date.toISOString()]}
      </div>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="absolute top-0 right-0 text-gray-500 text-xs cursor-pointer text-center p-0">
            <FaChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute bg-white shadow-md rounded-md z-40">
          <DropdownMenuItem onClick={() => handleShiftTypeAssignment(user.id, shift.date, "DS")}>
            DS
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShiftTypeAssignment(user.id, shift.date, "NS")}>
            NS
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShiftTypeAssignment(user.id, shift.date, "Undo")}>
            Undo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  </TableCell>
))}
                  <TableCell className="text-right">{user.workedHours}hrs</TableCell>
                  <TableCell className="text-right">{user.lateHours}hrs</TableCell>
                  <TableCell className="text-right">{user.overtimeHours}hrs</TableCell>
                  <TableCell className="w-[50px] sticky left-0 z-10 bg-white">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedUsers([...selectedUsers, user.id])
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                          setSelectAllUsers(false)
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {!showAssignedSchedule && (
          <div className="flex justify-end">
            <Button onClick={handleBulkAssignment}>
              Bulk Assign
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
