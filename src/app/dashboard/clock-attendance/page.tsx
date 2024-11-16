'use client'

import { useState } from 'react'

type User = {
  id: string
  name: string
  image: string
  clockInTime?: string
  clockOutTime?: string
  location: 'Known' | 'Unknown'
  lastSeen: string
  clockedBy?: string
}

export default function ClockAttendance() {
  const [activeTab, setActiveTab] = useState<'clockList' | 'clockedList'>('clockList')
  const [filters, setFilters] = useState({
    userType: '',
    country: '',
    branch: '',
    category: '',
    group: '',
    subgroup: '',
    location: '',
    gender: '',
    clockType: '',
    schedule: '',
    status: '',
    startDate: '',
    endDate: '',
    setTime: '',
  })
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Helena Abbey', image: '/placeholder.svg?height=50&width=50', location: 'Known', lastSeen: '2024-05-15 09:00' },
    { id: '2', name: 'Daniel Ababio', image: '/placeholder.svg?height=50&width=50', location: 'Unknown', lastSeen: '2024-05-15 08:45' },
  ])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [clockReason, setClockReason] = useState('')

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    )
  }

  const handleBulkAction = (action: 'in' | 'out' | 'cancel') => {
    if (selectedUsers.length === 0) {
      alert('Please select users first')
      return
    }
    if (!clockReason) {
      alert('Please provide a reason for the action')
      return
    }
    // Implement bulk action logic here
    console.log(`Bulk ${action} for users:`, selectedUsers, 'Reason:', clockReason)
    // Reset selections and reason after action
    setSelectedUsers([])
    setClockReason('')
  }

  const handleIndividualClock = (userId: string, action: 'in' | 'out') => {
    if (!clockReason) {
      alert('Please provide a reason for clocking')
      return
    }
    // Implement individual clock logic here
    console.log(`Clock ${action} for user:`, userId, 'Reason:', clockReason)
    setClockReason('')
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Clock Attendance</h1>

      <div className="mb-4">
        <button
          className={`mr-2 px-2 py-1 text-sm font-semibold rounded h-9 ${activeTab === 'clockList' ? 'bg-[#E54334] text-white' : 'bg-[#999999] text-white'}`}
          onClick={() => setActiveTab('clockList')}
        >
          Clock List
        </button>
        <button
          className={`px-2 py-1 text-sm font-semibold rounded h-9 ${activeTab === 'clockedList' ? 'bg-[#E54334] text-white' : 'bg-[#999999] text-white'}`}
          onClick={() => setActiveTab('clockedList')}
        >
          Clocked List
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <select name="userType" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select User Type</option>
          <option value="All">All</option>
          <option value="Individuals">Individuals</option>
          <option value="Organizations">Organizations</option>
        </select>
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
        <input
          type="text"
          name="search"
          placeholder="Search User [Name/ID]"
          onChange={handleFilterChange}
          className="border p-2 rounded text-sm"
        />
        <select name="location" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Location</option>
          <option value="All">All</option>
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <select name="gender" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="mb-4 flex justify-end">
        <button className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9 mr-2">More Filters</button>
        <button className="bg-[#004D1B] text-white px-2 py-1 text-sm font-semibold rounded h-9">Filter</button>
      </div>

      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={selectedUsers.length === users.length}
            onChange={() => setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u.id))}
            className="mr-2"
          />
          <span className="text-sm">Check All</span>
        </label>
      </div>

      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={clockReason}
          onChange={(e) => setClockReason(e.target.value)}
          placeholder="State reason for clocking"
          className="border p-2 rounded mr-2 text-sm"
        />
        {activeTab === 'clockList' ? (
          <button
            onClick={() => handleBulkAction('in')}
            className="bg-[#004D1B] text-white px-2 py-1 text-sm font-semibold rounded h-9 mr-2"
          >
            Bulk IN
          </button>
        ) : (
          <>
            <button
              onClick={() => handleBulkAction('out')}
              className="bg-[#E54334] text-white px-2 py-1 text-sm font-semibold rounded h-9 mr-2"
            >
              Bulk OUT
            </button>
            <button
              onClick={() => handleBulkAction('cancel')}
              className="bg-[#999999] text-white px-2 py-1 text-sm font-semibold rounded h-9 mr-2"
            >
              Bulk Cancel
            </button>
          </>
        )}
        <button className="bg-[#006994] text-white px-2 py-1 text-sm font-semibold rounded h-9">Download</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#212D40] text-white h-10">
            <th className="border p-2 text-md font-semibold">Select</th>
            <th className="border p-2 text-md font-semibold">Image/Name</th>
            <th className="border p-2 text-md font-semibold">IN</th>
            <th className="border p-2 text-md font-semibold">OUT</th>
            <th className="border p-2 text-md font-semibold">Location</th>
            <th className="border p-2 text-md font-semibold">Last Seen</th>
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
                  onChange={() => handleUserSelect(user.id)}
                />
              </td>
              <td className="border p-2 text-sm font-normal flex items-center">
                <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                {user.name}
              </td>
              <td className="border p-2 text-sm font-normal">{user.clockInTime || '-'}</td>
              <td className="border p-2 text-sm font-normal">{user.clockOutTime || '-'}</td>
              <td className="border p-2 text-sm font-normal">
                {user.location} <button className="text-[#006994]">View</button>
              </td>
              <td className="border p-2 text-sm font-normal">{user.lastSeen}</td>
              <td className="border p-2 text-sm font-normal">
                {activeTab === 'clockList' ? (
                  <button
                    onClick={() => handleIndividualClock(user.id, 'in')}
                    className="bg-[#004D1B] text-white px-2 py-1 text-sm font-semibold rounded h-9"
                  >
                    Clock IN
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleIndividualClock(user.id, 'out')}
                      className="bg-[#E54334] text-white px-2 py-1 text-sm font-semibold rounded h-9 mr-1"
                    >
                      Clock OUT
                    </button>
                    <button className="bg-[#999999] text-white px-2 py-1 text-sm font-semibold rounded h-9">
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}