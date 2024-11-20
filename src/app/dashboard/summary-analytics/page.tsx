"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type SummaryData = {
  country: string
  regionState: string
  branch: string
  category: string
  schedule: string
  dateRange: string
  attendees: { count: number; percentage: number }
  absentees: { count: number; percentage: number }
  lateComers: { count: number; percentage: number }
  earlyComers: { count: number; percentage: number }
  attendanceStatus: 'Low' | 'Average' | 'High'
  admins: { name: string; phone: string }[]
}

const SummaryAnalytics = () => {
  const [filters, setFilters] = useState({
    country: 'all',
    regionState: 'all',
    branch: 'all',
    category: 'all',
    schedule: 'all',
    startDate: null,
    endDate: null,
    attendanceStatus: 'all',
  })
  const [summaryData, setSummaryData] = useState<SummaryData[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleFilterChange = (key: string, value: string | Date | null) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with term:', searchTerm)
  }

  const handleDownloadCSV = () => {
    // Implement CSV download logic here
    console.log('Downloading CSV')
  }

  const fetchSummaryData = () => {
    // Implement data fetching logic here
    // This should update summaryData state
    const mockData: SummaryData[] = [
      {
        country: 'USA',
        regionState: 'California',
        branch: 'HQ',
        category: 'Staff',
        schedule: 'Morning Shift',
        dateRange: '2024-01-01 to 2024-01-31',
        attendees: { count: 120, percentage: 80 },
        absentees: { count: 15, percentage: 10 },
        lateComers: { count: 10, percentage: 6.67 },
        earlyComers: { count: 5, percentage: 3.33 },
        attendanceStatus: 'High',
        admins: [
          { name: 'John Doe', phone: '+1234567890' },
          { name: 'Jane Smith', phone: '+0987654321' },
        ],
      },
      // Add more mock data as needed
    ]
    setSummaryData(mockData)
  }

  useEffect(() => {
    fetchSummaryData()
  }, [filters])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Summary Analytics</h1>

      <Card>
        <CardContent className="flex flex-wrap gap-4 p-4">
          <Select onValueChange={(value) => handleFilterChange('country', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="ghana">Ghana</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('regionState', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Region/State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="california">California</SelectItem>
              <SelectItem value="accra">Accra</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('branch', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="hq">HQ</SelectItem>
              <SelectItem value="westBranch">West Branch</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="management">Management</SelectItem>
              <SelectItem value="staff">Staff</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('schedule', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="morningShift">Morning Shift</SelectItem>
              <SelectItem value="nightShift">Night Shift</SelectItem>
            </SelectContent>
          </Select>
          <DatePicker
            selected={filters.startDate}
            onSelect={(date) => handleFilterChange('startDate', date)}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={filters.endDate}
            onSelect={(date) => handleFilterChange('endDate', date)}
            placeholderText="End Date"
          />
          <Select onValueChange={(value) => handleFilterChange('attendanceStatus', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Attendance Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="average">Average</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchSummaryData}>Filter</Button>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleDownloadCSV}>Download CSV</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Country</TableHead>
            <TableHead>Region/State</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Date Range</TableHead>
            <TableHead>Attendees</TableHead>
            <TableHead>Absentees</TableHead>
            <TableHead>Late Comers</TableHead>
            <TableHead>Early Comers</TableHead>
            <TableHead>Attendance Status</TableHead>
            <TableHead>Admins</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summaryData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.regionState}</TableCell>
              <TableCell>{row.branch}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.schedule}</TableCell>
              <TableCell>{row.dateRange}</TableCell>
              <TableCell>{row.attendees.count} / {row.attendees.percentage.toFixed(2)}%</TableCell>
              <TableCell>{row.absentees.count} / {row.absentees.percentage.toFixed(2)}%</TableCell>
              <TableCell>{row.lateComers.count} / {row.lateComers.percentage.toFixed(2)}%</TableCell>
              <TableCell>{row.earlyComers.count} / {row.earlyComers.percentage.toFixed(2)}%</TableCell>
              <TableCell>{row.attendanceStatus}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link">View</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Admins</DialogTitle>
                    </DialogHeader>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {row.admins.map((admin, adminIndex) => (
                          <TableRow key={adminIndex}>
                            <TableCell>{admin.name}</TableCell>
                            <TableCell>{admin.phone}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SummaryAnalytics