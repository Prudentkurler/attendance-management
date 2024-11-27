"use client"

import { useState, useEffect } from "react"
import { CgSearch } from "react-icons/cg"
import { FiSun } from "react-icons/fi"
import { PiUsersFill } from "react-icons/pi"
import { HiPlusCircle } from "react-icons/hi"
import { MdOutlineWatchLater } from "react-icons/md"
import { ImStopwatch } from "react-icons/im"
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5"
import { BsMoon } from "react-icons/bs"
import { TiCloudStorageOutline } from "react-icons/ti"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/DateRangePicker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import   BarChart   from "@/components/attendance/BarChart"
import  LineChart   from "@/components/attendance/LineChart"

const Page = () => {
  const [currentDate, setCurrentDate] = useState('')
  const [filters, setFilters] = useState({
    dateInterval: 'today',
    customStartDate: new Date(),
    customEndDate: new Date(),
    schedule: 'all',
    country: 'all',
    region: 'all',
    branch: 'all',
    category: 'all',
    group: 'all',
    subgroup: 'all',
  })
  const [stats, setStats] = useState({
    totalEmployees: 425,
    lateArrivals: 62,
    onTime: 360,
    earlyDepartures: 6,
    absent: 30,
    timeOff: 42,
  })
  const [attendanceData, setAttendanceData] = useState([])

  useEffect(() => {
    updateCurrentDate()
    const intervalId = setInterval(updateCurrentDate, 60000)
    return () => clearInterval(intervalId)
  }, [])

  const updateCurrentDate = () => {
    const date = new Date()
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]
    const day = date.getDate()
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    const suffix = ["th", "st", "nd", "rd"][day % 10 > 3 ? 0 : (day % 100 - 20) % 10 || day]
    setCurrentDate(`${day}${suffix} ${month} ${year}`)
  }

  interface Filters {
    dateInterval: string;
    customStartDate: Date | null;
    customEndDate: Date | null;
    schedule: string;
    country: string;
    region: string;
    branch: string;
    category: string;
    group: string;
    subgroup: string;
  }

  interface Stats {
    totalEmployees: number;
    lateArrivals: number;
    onTime: number;
    earlyDepartures: number;
    absent: number;
    timeOff: number;
  }

  const handleFilterChange = (key: keyof Filters, value: string | Date | null) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleExportData = () => {
    // Implement export logic here
    console.log("Exporting data...")
  }

  const fetchAttendanceData = () => {
    // Implement data fetching logic here
    // This should update attendanceData state
  }

  useEffect(() => {
    fetchAttendanceData()
  }, [filters])

  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false)

  const handleShowFilters = ()=>{
    setShowMoreFilters(!showMoreFilters)
  }

  return (
    <div className="py-4 md:px-8 px-4 flex flex-col gap-8">
      <div className="flex justify-between items-center flex-col sm:flex-row gap-4">
        <h3 className="font-semibold">Attendance Manager</h3>
        <div className="flex relative">
          <CgSearch className="absolute top-3 left-2"/>
          <Input type="text" placeholder="Search Database" className="pl-8" />
        </div>
      </div>

      <Button variant='default' className="font-semibold  mb-5 md:w-[200px]" onClick={handleShowFilters}>Show Filters</Button>

      {
        showMoreFilters && (

       
      <Card className="p-4">
        <CardContent className="flex flex-wrap gap-4">
          <Select onValueChange={(value) => handleFilterChange('dateInterval', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date Interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
              <SelectItem value="lastWeek">Last Week</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          {filters.dateInterval === 'custom' && (
            <>
              <DateRangePicker
                startDate={filters.customStartDate as Date}
                endDate={filters.customEndDate as Date}
                onStartDateChange={(date) => handleFilterChange('customStartDate', date)}
                onEndDateChange={(date) => handleFilterChange('customEndDate', date)}
              />
              <DateRangePicker
                startDate={filters.customStartDate as Date}
                endDate={filters.customEndDate as Date}
                onStartDateChange={(date) => handleFilterChange('customStartDate', date)}
                onEndDateChange={(date) => handleFilterChange('customEndDate', date)}
              />
            </>
          )}

          

          
          <Select onValueChange={(value) => handleFilterChange('schedule', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Schedule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="nightShift">Night Shift</SelectItem>
              <SelectItem value="morningShift">Morning Shift</SelectItem>
            </SelectContent>
          </Select>
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
          <Select onValueChange={(value) => handleFilterChange('region', value)}>
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
          <Select onValueChange={(value) => handleFilterChange('group', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="groupA">Group A</SelectItem>
              <SelectItem value="groupB">Group B</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('subgroup', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Subgroup" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="subgroup1">Subgroup 1</SelectItem>
              <SelectItem value="subgroup2">Subgroup 2</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchAttendanceData}>Filter</Button>
          <Button variant="outline" onClick={() => setFilters({
            dateInterval: 'today',
            customStartDate: new Date(),
            customEndDate: new Date(),
            schedule: 'all',
            country: 'all',
            region: 'all',
            branch: 'all',
            category: 'all',
            group: 'all',
            subgroup: 'all',
          })}>Clear</Button>
        </CardContent>
      </Card>

)
}

      <div className="flex flex-col md:flex-row gap-3 w-full items-center">
        <Card className="w-full md:w-1/3 h-[240px] flex gap-3 items-center justify-center rounded-lg">
          <FiSun className="text-6xl text-ds-primary"/>
          <div className="flex flex-col gap-1">
            <p className="text-4xl text-gray-400 mt-8 font-semibold">{new Date().toLocaleTimeString()}</p>
            <p className="text-md text-indigo-950 font-semibold">{currentDate}</p>
          </div>
        </Card>
        
        <div className="w-full md:w-1/4 flex gap-4 flex-col">
          <Card className="w-full h-[50%] rounded-lg p-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-3xl text-indigo-950">{stats.totalEmployees}</p>
              <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">
                <PiUsersFill className="text-orange-400" />
              </div>
            </div>
            <p className="text-indigo-950 font-semibold text-md">Total Employees</p>
            <div className="flex gap-1 items-center">
              <HiPlusCircle className="text-black-100 bg-teal-100 rounded-full"/>
              <p className="text-gray-800 text-sm opacity-80">2 new Employees added</p>
            </div>
          </Card>
          <Card className="w-full h-[50%] rounded-lg p-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-3xl text-indigo-950">{stats.lateArrivals}</p>
              <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">
                <MdOutlineWatchLater className="text-orange-400" />
              </div>
            </div>
            <p className="text-indigo-950 font-semibold text-md">Late Arrival</p>
            <div className="flex gap-1 items-center">
              <IoTrendingDown className="text-black-100 p-1 bg-red-200 rounded-full"/>
              <p className="text-gray-800 text-sm opacity-80">3% increase than yesterday</p>
            </div>
          </Card>
        </div>

        <div className="w-full md:w-1/4 flex gap-4 flex-col">
          <Card className="w-full h-[50%] rounded-lg p-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-3xl text-indigo-950">{stats.onTime}</p>
              <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">
                <ImStopwatch className="text-orange-400" />
              </div>
            </div>
            <p className="text-indigo-950 font-semibold text-md">On Time</p>
            <div className="flex gap-1 items-center">
              <IoTrendingUp className="text-black-100 bg-teal-100 rounded-full"/>
              <p className="text-gray-800 text-sm opacity-80">10% less yesterday</p>
            </div>
          </Card>
          <Card className="w-full h-[50%] rounded-lg p-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-3xl text-indigo-950">{stats.earlyDepartures}</p>
              <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">
                <BsMoon className="text-orange-400" />
              </div>
            </div>
            <p className="text-indigo-950 font-semibold text-md">Early Departures</p>
            <div className="flex gap-1 items-center">
              <HiPlusCircle className="text-black-100 bg-teal-100 rounded-full"/>
              <p className="text-gray-800 text-sm opacity-80">3% increase than yesterday</p>
            </div>
          </Card>
        </div>

        <div className="w-full md:w-1/4 flex gap-4 flex-col">
          <Card className="w-full h-[50%] rounded-lg p-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-3xl text-indigo-950">{stats.absent}</p>
              <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">
                <TiCloudStorageOutline className="text-orange-400" />
              </div>
            </div>
            <p className="text-indigo-950 font-semibold text-md">Absent</p>
            <div className="flex gap-1 items-center">
              <IoTrendingDown className="text-black-100 p-1 bg-red-200 rounded-full"/>
              <p className="text-gray-800 text-sm opacity-80">3% increase than yesterday</p>
            </div>
          </Card>
          <Card className="w-full h-[50%] rounded-lg p-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-3xl text-indigo-950">{stats.timeOff}</p>
              <div className="p-3 rounded-full flex items-center justify-center bg-blue-100">
                <ImStopwatch className="text-orange-400" />
              </div>
            </div>
            <p className="text-indigo-950 font-semibold text-md">Time-Off</p>
            <div className="flex gap-1 items-center">
              <HiPlusCircle className="text-black-100 bg-blue-100 rounded-full"/>
              <p className="text-gray-800 text-sm opacity-80">2% increase than yesterday</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="w-full h-[400px] flex flex-col md:flex-row gap-4 mt-8 mb-9">
        <Card className="md:w-[60%] w-full shadow-lg rounded-lg p-2">
          <CardContent className="w-full h-full">
            <LineChart  />
          </CardContent>
        </Card>
        <Card className="md:w-[40%] w-full h-[320px] md:h-full p-4">
          <CardContent className="w-full h-full">
            <BarChart  />
          </CardContent>
        </Card>
      </div>

     

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Attendees</TableHead>
                <TableHead>Late Comers</TableHead>
                <TableHead>Absentees</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {['Today', 'Yesterday', '3 days ago', 'Last Week','Last 2 Months','Last 3 Months', "Last 6 Months", ' Last year'].map((period) => (
                <TableRow key={period}>
                  <TableCell>{period}</TableCell>
                  <TableCell>100</TableCell>
                  <TableCell>40</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>
                    <Button onClick={() => handleExportData()}>Download</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Button onClick={handleExportData} className="self-end">Export All Data</Button>
    </div>
  )
}

export default Page