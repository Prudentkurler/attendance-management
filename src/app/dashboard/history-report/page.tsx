'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { format, addDays, isSameMonth } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { toast } from "@/components/ui/use-toast"

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
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchReport()
  }, [filters])

  const fetchReport = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/attendance', { params: filters })
      if (filters.reportType === 'summary') {
        setUsers(response.data)
      } else {
        setUserBreakdowns(response.data)
      }
    } catch (error) {
      console.error('Error fetching report:', error)
      toast({
        title: "Error",
        description: "Failed to fetch report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    fetchReport()
  }

  const handleSelectAll = () => {
    setSelectedUsers(users.map(user => user.id))
  }

  const handleValidateAll = async () => {
    setIsLoading(true)
    try {
      await axios.post('/api/attendance?action=validate', { userIds: selectedUsers })
      toast({
        title: "Success",
        description: "All selected users have been validated.",
      })
      fetchReport()
    } catch (error) {
      console.error('Error validating users:', error)
      toast({
        title: "Error",
        description: "Failed to validate users. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadReport = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/attendance/download', {
        params: filters,
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'attendance_report.csv')
      document.body.appendChild(link)
      link.click()
      link.parentNode?.removeChild(link)
    } catch (error) {
      console.error('Error downloading report:', error)
      toast({
        title: "Error",
        description: "Failed to download report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleValidateUser = async (userId: string) => {
    setIsLoading(true)
    try {
      await axios.post('/api/attendance?action=validate', { userIds: [userId] })
      toast({
        title: "Success",
        description: "User has been validated.",
      })
      fetchReport()
    } catch (error) {
      console.error('Error validating user:', error)
      toast({
        title: "Error",
        description: "Failed to validate user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ... (filter inputs) ... */}
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
      </div>

      {/* Table */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            {/* ... (table header) ... */}
          </TableHeader>
          <TableBody>
            {(filters.reportType === 'summary' ? users : userBreakdowns).map(user => (
              <TableRow key={user.id}>
                {/* ... (table cells) ... */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

