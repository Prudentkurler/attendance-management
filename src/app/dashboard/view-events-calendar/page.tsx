'use client'

import { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Phone, Mail, MessageSquare } from 'lucide-react'

type Event = {
  id: string
  name: string
  date: Date
  startTime: string
  endTime: string
}

type AttendanceRecord = {
  id: string
  name: string
  image: string
  date: string
  checkIn?: string
  checkOut?: string
  totalHours?: number
  lastSeen: string
  gender: 'Male' | 'Female'
  status: 'Attendee' | 'Absentee' | 'Early Check-In' | 'Late Check-In'
  reason?: string
}

export default function ViewEventsCalendar() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [filters, setFilters] = useState({
    country: '',
    branch: '',
    category: '',
    group: '',
    subgroup: '',
    gender: '',
    schedule: '',
    status: '',
    startDate: '',
    endDate: '',
  })

  useEffect(() => {
    // Mock data initialization
    const mockEvents: Event[] = [
      {
        id: '1',
        name: 'Team Meeting',
        date: new Date(2024, 0, 5),
        startTime: '08:00',
        endTime: '17:00',
      },
      {
        id: '2',
        name: 'Project Review',
        date: new Date(2024, 0, 15),
        startTime: '08:00',
        endTime: '17:00',
      },
      {
        id: '3',
        name: 'Training Session',
        date: new Date(2024, 0, 25),
        startTime: '08:00',
        endTime: '17:00',
      },
    ]
    setEvents(mockEvents)

    const mockAttendanceRecords: AttendanceRecord[] = [
      {
        id: '1',
        name: 'John Doe',
        image: '/placeholder.svg?height=50&width=50',
        date: '2024-01-05',
        checkIn: '08:05',
        checkOut: '17:02',
        totalHours: 8.95,
        lastSeen: '2024-01-05 17:02',
        gender: 'Male',
        status: 'Attendee',
      },
      {
        id: '2',
        name: 'Jane Smith',
        image: '/placeholder.svg?height=50&width=50',
        date: '2024-01-05',
        lastSeen: '2024-01-04 18:00',
        gender: 'Female',
        status: 'Absentee',
        reason: 'On Leave',
      },
    ]
    setAttendanceRecords(mockAttendanceRecords)
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleFilter = () => {
    // Implement filter logic here
    console.log('Filtering with:', filters)
  }

  const handleViewAgenda = () => {
    // Implement view agenda logic here
    console.log('Viewing agenda')
  }

  const attendees = attendanceRecords.filter(record => record.status === 'Attendee')
  const absentees = attendanceRecords.filter(record => record.status === 'Absentee')

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">View Events Calendar</h1>

      <div className="flex justify-between items-center">
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {[2023, 2024, 2025].map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-4">
          <Button onClick={() => setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
            &lt;
          </Button>
          <span className="text-lg font-semibold">{format(selectedMonth, 'MMMM yyyy')}</span>
          <Button onClick={() => setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
            &gt;
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
        {eachDayOfInterval({
          start: startOfMonth(selectedMonth),
          end: endOfMonth(selectedMonth),
        }).map((date) => (
          <div
            key={date.toISOString()}
            className={`p-2 border rounded ${
              isToday(date) ? 'bg-blue-100' : ''
            } ${isSameMonth(date, selectedMonth) ? '' : 'text-gray-400'}`}
          >
            <div className="text-right">{format(date, 'd')}</div>
            {events
              .filter((event) => event.date.toDateString() === date.toDateString())
              .map((event) => (
                <Dialog key={event.id}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="p-0 h-auto text-left">
                      {event.name}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{event.name}</DialogTitle>
                    </DialogHeader>
                    <div>
                      <p>Date: {format(event.date, 'MMMM d, yyyy')}</p>
                      <p>Time: {event.startTime} - {event.endTime}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Select onValueChange={(value) => handleFilterChange('country', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ghana">Ghana</SelectItem>
                <SelectItem value="nigeria">Nigeria</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('branch', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accra">Accra</SelectItem>
                <SelectItem value="kumasi">Kumasi</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="management">Management</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('group', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('subgroup', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subgroup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('schedule', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Schedule" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="shift">Shift</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attendees">Attendees</SelectItem>
                <SelectItem value="absentees">Absentees</SelectItem>
                <SelectItem value="early">Early Check-Ins</SelectItem>
                <SelectItem value="late">Late Check-Ins</SelectItem>
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
          </div>
          <div className="flex justify-between mb-4">
            <Button onClick={handleFilter}>Filter</Button>
            <Button onClick={handleViewAgenda}>View Agenda</Button>
          </div>
          <Tabs defaultValue="attendees">
            <TabsList>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="absentees">Absentees</TabsTrigger>
            </TabsList>
            <TabsContent value="attendees">
              <div className="mb-2">
                Total Attendees: {attendees.length} (Male: {attendees.filter(r => r.gender === 'Male').length}, Female: {attendees.filter(r => r.gender === 'Female').length})
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Image/Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Total Hours</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendees.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="flex items-center space-x-2">
                        <img src={record.image} alt={record.name} className="w-8 h-8 rounded-full" />
                        <span>{record.name}</span>
                      </TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.totalHours}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="icon" variant="outline"><Phone className="h-4 w-4" /></Button>
                          <Button size="icon" variant="outline"><Mail className="h-4 w-4" /></Button>
                          <Button size="icon" variant="outline"><MessageSquare className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                      <TableCell>{record.lastSeen}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="absentees">
              <div className="mb-2">
                Total Absentees: {absentees.length} (Male: {absentees.filter(r => r.gender === 'Male').length}, Female: {absentees.filter(r => r.gender === 'Female').length})
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User Image/Name</TableHead>
                    <TableHead>Actions</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {absentees.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="flex items-center space-x-2">
                        <img src={record.image} alt={record.name} className="w-8 h-8 rounded-full" />
                        <span>{record.name}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="icon" variant="outline"><Phone className="h-4 w-4" /></Button>
                          <Button size="icon" variant="outline"><Mail className="h-4 w-4" /></Button>
                          <Button size="icon" variant="outline"><MessageSquare className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                      <TableCell>{record.lastSeen}</TableCell>
                      <TableCell>{record.reason || 'No Reason'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}