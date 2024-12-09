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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TooltipProvider } from '@/components/ui/tooltip'
import { FaChevronDown } from 'react-icons/fa'
import { toast } from "@/components/ui/use-toast"

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
  country?: string
  branch?: string
  category?: string[]
  group?: string
  subgroup?: string
  schedule?: string
  rosterType?: string
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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [filters, selectedMonth])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams({
        ...filters,
        month: selectedMonth.toISOString(),
      })
      const response = await fetch(`/api/roster?${queryParams}`)
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setFilters(prev => ({ ...prev, startDate, endDate }))
  }

  const handleExport = async () => {
    try {
      const response = await fetch('/api/roster/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users, filters }),
      })
      if (!response.ok) throw new Error('Failed to export roster')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'roster.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting roster:', error)
      toast({
        title: "Error",
        description: "Failed to export roster",
        variant: "destructive",
      })
    }
  }

  const handleAssignSchedule = async (userId: string, date: string, shiftType: Shift) => {
    try {
      const response = await fetch('/api/roster', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, date, shiftType }),
      })
      if (!response.ok) throw new Error('Failed to assign schedule')
      setUserShiftAssignments(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          [date]: shiftType === 'Undo' ? null : shiftType,
        },
      }))
      toast({
        title: "Success",
        description: "Schedule assigned successfully",
      })
      fetchUsers()
    } catch (error) {
      console.error('Error assigning schedule:', error)
      toast({
        title: "Error",
        description: "Failed to assign schedule",
        variant: "destructive",
      })
    }
  }

  const handleBulkAssignment = async () => {
    if (!selectedUsers.length || !selectedDates.length) {
      toast({
        title: "Error",
        description: "Please select at least one user and one date to proceed",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch('/api/roster/bulk-assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIds: selectedUsers, dates: selectedDates, shiftType: 'DS' }),
      })
      if (!response.ok) throw new Error('Failed to bulk assign schedules')
      toast({
        title: "Success",
        description: "Bulk assignment completed successfully",
      })
      fetchUsers()
    } catch (error) {
      console.error('Error in bulk assign:', error)
      toast({
        title: "Error",
        description: "Failed to complete bulk assignment",
        variant: "destructive",
      })
    }
  }

  const handleUploadBulkRoster = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const response = await fetch('/api/roster/upload', {
          method: 'POST',
          body: formData,
        })
        if (!response.ok) throw new Error('Failed to upload roster')
        toast({
          title: "Success",
          description: "Roster uploaded successfully",
        })
        fetchUsers()
      } catch (error) {
        console.error('Error uploading roster:', error)
        toast({
          title: "Error",
          description: "Failed to upload roster",
          variant: "destructive",
        })
      }
    }
  }

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSelectAllUsers = (checked: boolean) => {
    setSelectAllUsers(checked)
    setSelectedUsers(checked ? users.map(user => user.id) : [])
  }

  const handleSelectAllDates = (checked: boolean) => {
    setSelectAllDates(checked)
    setSelectedDates(checked ? eachDayOfInterval({ start: startOfMonth(selectedMonth), end: endOfMonth(selectedMonth) }) : [])
  }

  const handleDownloadBulkRosterTemplate = () => {
    const templateData = "User ID,Date,Shift Type\nSampleID,2024-12-01,DS"
    const blob = new Blob([templateData], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'bulk_roster_template.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const clearFilters = () => {
    setFilters({
      country: '',
      branch: '',
      category: '',
      group: '',
      subgroup: '',
      schedule: '',
      rosterType: '',
      startDate: null,
      endDate: null,
    })
    setSearchQuery('')
  }

  const filteredUsers = users.filter(user => {
    const matchesFilters = (
      (!filters.country || user.country === filters.country) &&
      (!filters.branch || user.branch === filters.branch) &&
      (!filters.category || user.category?.includes(filters.category)) &&
      (!filters.group || user.group === filters.group) &&
      (!filters.subgroup || user.subgroup === filters.subgroup) &&
      (!filters.schedule || user.schedule === filters.schedule) &&
      (!filters.rosterType || user.rosterType === filters.rosterType)
    )

    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())

    const hasAssignedShifts = user.shifts.some(shift => shift.shift !== null)

    return matchesFilters && matchesSearch && (showAssignedSchedule ? hasAssignedShifts : !hasAssignedShifts)
  })

  const [showFilters, setShowFilters] = useState<boolean>(false)

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Roster Schedule</h1>

        <Button onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>

        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Select onValueChange={(value) => handleFilterChange('country', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleFilterChange('branch', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Branch A">Branch A</SelectItem>
                  <SelectItem value="Branch B">Branch B</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Category"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              />
              <Select onValueChange={(value) => handleFilterChange('group', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Group A">Group A</SelectItem>
                  <SelectItem value="Group B">Group B</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Subgroup"
                value={filters.subgroup}
                onChange={(e) => handleFilterChange('subgroup', e.target.value)}
              />
              <Select onValueChange={(value) => handleFilterChange('schedule', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Schedule 1">Schedule 1</SelectItem>
                  <SelectItem value="Schedule 2">Schedule 2</SelectItem>
                </SelectContent>
              </Select>
              <Select onValueChange={(value) => handleFilterChange('rosterType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Roster Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Type A">Type A</SelectItem>
                  <SelectItem value="Type B">Type B</SelectItem>
                </SelectContent>
              </Select>
              <div className="col-span-2 flex justify-start">
                <Button variant="secondary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between items-center">
          <Input
            placeholder="Search [Name/ID]"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            className="max-w-xs"
          />
          <div className="flex items-center gap-2">
            <Button onClick={handleDownloadBulkRosterTemplate}>
              Download Bulk Roster Template
            </Button>
            <Button onClick={handleExport}>
              Download CSV
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant={showAssignedSchedule ? "default" : "outline"}
                onClick={() => setShowAssignedSchedule(true)}
              >
                Assigned Schedule
              </Button>
              <Button
                variant={!showAssignedSchedule ? "default" : "outline"}
                onClick={() => setShowAssignedSchedule(false)}
              >
                Unassigned Schedule
              </Button>
            </div>
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
          Export Roster
        </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] sticky left-0 bg-white z-10">
                  <Checkbox
                    checked={selectAllUsers}
                    onCheckedChange={handleSelectAllUsers}
                  />
                </TableHead>
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
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
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
                            <DropdownMenuItem onClick={() => handleAssignSchedule(user.id, shift.date.toISOString(), "DS")}>
                              <span className="text-blue-500">Day Shift</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignSchedule(user.id, shift.date.toISOString(), "NS")}>
                              <span className="text-purple-500">Night Shift</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAssignSchedule(user.id, shift.date.toISOString(), "Undo")}>
                              <span className="text-red-500">Undo</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
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

