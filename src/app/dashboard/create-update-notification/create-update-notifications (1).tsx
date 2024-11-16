'use client'

import { useState } from 'react'

type NotificationTemplate = {
  id: string
  title: string
  message: string
  lastUpdate: string
  updatedBy: string
  totalAssignedUsers: number
  lastNotificationSent: string
  messageMedium: string[]
}

export default function CreateUpdateNotifications() {
  const [filters, setFilters] = useState({
    country: '',
    branch: '',
    category: '',
    group: '',
    subgroup: '',
    messageMedium: '',
    alertUserType: '',
    alertType: '',
    recurringStatus: '',
    startingDate: '',
    deliveryTime: '',
    nonRecurringDate: '',
  })
  const [templates, setTemplates] = useState<NotificationTemplate[]>([])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleUpdate = () => {
    // Implement update logic here
  }

  const handleAddNonRecurringDate = () => {
    // Implement logic to add non-recurring date
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create/Update Notifications</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
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
        <select name="messageMedium" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Message Medium</option>
          <option value="sms">SMS</option>
          <option value="voiceCall">Voice Call</option>
          <option value="email">Email</option>
        </select>
        <select name="alertUserType" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Alert Users Type</option>
          <option value="admins">Admins</option>
          <option value="parents">Parents</option>
          <option value="absentees">Absentees</option>
          <option value="attendees">Attendees</option>
          <option value="generalUsers">General Users</option>
        </select>
        <select name="alertType" onChange={handleFilterChange} className="border p-2 rounded text-sm">
          <option value="">Select Alert Type</option>
          <option value="recurring">Recurring Alert</option>
          <option value="nonRecurring">Non-Recurring Alert</option>
        </select>
      </div>
      {filters.alertType === 'recurring' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <select name="recurringStatus" onChange={handleFilterChange} className="border p-2 rounded text-sm">
            <option value="">Select Recurring Status</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="semiAnnually">Every 6 months</option>
            <option value="annually">Annually</option>
          </select>
          <input
            type="date"
            name="startingDate"
            onChange={handleFilterChange}
            className="border p-2 rounded text-sm"
            placeholder="Starting Date"
          />
          <input
            type="time"
            name="deliveryTime"
            onChange={handleFilterChange}
            className="border p-2 rounded text-sm"
            placeholder="Delivery Time"
          />
        </div>
      )}
      {filters.alertType === 'nonRecurring' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="date"
            name="nonRecurringDate"
            onChange={handleFilterChange}
            className="border p-2 rounded text-sm"
            placeholder="Non-Recurring Date"
          />
          <input
            type="time"
            name="deliveryTime"
            onChange={handleFilterChange}
            className="border p-2 rounded text-sm"
            placeholder="Delivery Time"
          />
          <button 
            onClick={handleAddNonRecurringDate} 
            className="bg-[#006994] text-white text-sm font-semibold px-2 py-1 rounded h-9"
          >
            Add New Non-Recurring Date
          </button>
        </div>
      )}
      <div className="flex justify-end mb-4">
        <button 
          onClick={handleUpdate} 
          className="bg-[#004D1B] text-white text-sm font-semibold px-2 py-1 rounded h-9"
        >
          UPDATE
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">UPDATE SMS/VOICE CALL/EMAIL NOTIFICATIONS</h2>
        {templates.map(template => (
          <div key={template.id} className="mb-4 p-4 border rounded">
            <h3 className="font-bold">{template.title}</h3>
            <p>{template.message}</p>
            <textarea
              className="w-full border p-2 mt-2 rounded text-sm"
              placeholder="Type additional information here (340 characters maximum)"
              maxLength={340}
            ></textarea>
            <div className="mt-2">
              <p className="font-semibold">Activity Logs</p>
              <p className="text-sm">Last update: {template.lastUpdate}</p>
              <p className="text-sm">Updated By: {template.updatedBy}</p>
              <p className="text-sm">Total Assigned users: {template.totalAssignedUsers}</p>
              <p className="text-sm">Last Notification Sent: {template.lastNotificationSent}</p>
              <p className="text-sm">Message Medium: {template.messageMedium.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}