'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

type NotificationType = 'SMS' | 'Email' | 'In-app'
type UserType = 'Admin Users' | 'General Users' | 'Parents' | 'Absentees' | 'Attendees'
type AlertType = 'Recurring' | 'Non-Recurring'
type RecurringStatus = 'Daily' | 'Monthly' | 'Quarterly' | 'Annually'

type NotificationLog = {
  type: string
  lastUpdate: string
  sentBy: string
  totalUsers: number
  lastSent: string
  medium: string
}

export default function PushNotification() {
  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([])
  const [userTypes, setUserTypes] = useState<UserType[]>([])
  const [isRecurring, setIsRecurring] = useState(false)
  const [formData, setFormData] = useState({
    country: '',
    branch: '',
    category: '',
    groupSubgroup: '',
    messageMedium: '',
    alertUserType: '',
    alertType: '',
    recurringStatus: '',
    nonRecurringDate: '',
    deliveryTime: '',
  })
  const [logs, setLogs] = useState<NotificationLog[]>([
    {
      type: 'Schedule Update',
      lastUpdate: '2024-10-15 10:30',
      sentBy: 'Admin 1',
      totalUsers: 120,
      lastSent: '2024-10-15 10:30 AM',
      medium: 'SMS/Email',
    },
    {
      type: 'Absence Reminder',
      lastUpdate: '2024-10-14 09:00',
      sentBy: 'Admin 2',
      totalUsers: 80,
      lastSent: '2024-10-14 09:00 AM',
      medium: 'Email',
    },
  ])

  const handleNotificationTypeChange = (type: NotificationType) => {
    setNotificationTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleUserTypeChange = (type: UserType) => {
    setUserTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { notificationTypes, userTypes, isRecurring, ...formData })
    // Here you would typically send this data to your backend
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Push Notifications</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Choose Notification Types</h2>
          <div className="flex space-x-4">
            {(['SMS', 'Email', 'In-app'] as const).map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={notificationTypes.includes(type)}
                  onChange={() => handleNotificationTypeChange(type)}
                  className="mr-2"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Select User Type</h2>
          <div className="flex flex-wrap gap-4">
            {(['Admin Users', 'General Users', 'Parents', 'Absentees', 'Attendees'] as const).map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={userTypes.includes(type)}
                  onChange={() => handleUserTypeChange(type)}
                  className="mr-2"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select name="country" onChange={handleInputChange} className="border p-2 rounded text-sm">
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Ghana">Ghana</option>
          </select>

          <select name="branch" onChange={handleInputChange} className="border p-2 rounded text-sm">
            <option value="">Select Branch</option>
            <option value="HQ">HQ</option>
            <option value="West Branch">West Branch</option>
          </select>

          <select name="category" onChange={handleInputChange} className="border p-2 rounded text-sm">
            <option value="">Select Category</option>
            <option value="Management">Management</option>
            <option value="Staff">Staff</option>
          </select>

          <select name="groupSubgroup" onChange={handleInputChange} className="border p-2 rounded text-sm">
            <option value="">Select Group/Subgroup</option>
            <option value="Group A">Group A</option>
            <option value="Subgroup B">Subgroup B</option>
          </select>

          <select name="messageMedium" onChange={handleInputChange} className="border p-2 rounded text-sm">
            <option value="">Select Message Medium</option>
            <option value="SMS">SMS</option>
            <option value="Email">Email</option>
            <option value="Push Notification">Push Notification</option>
          </select>

          <select name="alertUserType" onChange={handleInputChange} className="border p-2 rounded text-sm">
            <option value="">Select Alert User Type</option>
            <option value="Admins">Admins</option>
            <option value="Parents">Parents</option>
            <option value="General Users">General Users</option>
            <option value="Absentees">Absentees</option>
            <option value="Attendees">Attendees</option>
          </select>

          <select name="alertType" onChange={handleInputChange} className="border p-2 rounded text-sm">
            <option value="">Select Alert Type</option>
            <option value="Recurring">Recurring</option>
            <option value="Non-Recurring">Non-Recurring</option>
          </select>

          {formData.alertType === 'Recurring' && (
            <select name="recurringStatus" onChange={handleInputChange} className="border p-2 rounded text-sm">
              <option value="">Select Recurring Status</option>
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
          )}

          {formData.alertType === 'Non-Recurring' && (
            <input
              type="date"
              name="nonRecurringDate"
              onChange={handleInputChange}
              className="border p-2 rounded text-sm"
            />
          )}

          <input
            type="time"
            name="deliveryTime"
            onChange={handleInputChange}
            className="border p-2 rounded text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-[#006994] text-white text-sm font-semibold px-2 py-1 rounded h-9"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Notification Logs</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#212D40] text-white h-10">
              <th className="border p-2 text-md font-semibold">Notification Type</th>
              <th className="border p-2 text-md font-semibold">Last Update</th>
              <th className="border p-2 text-md font-semibold">Sent By</th>
              <th className="border p-2 text-md font-semibold">Total Users</th>
              <th className="border p-2 text-md font-semibold">Last Notification Sent</th>
              <th className="border p-2 text-md font-semibold">Message Medium</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="bg-white">
                <td className="border p-2 text-sm font-normal">{log.type}</td>
                <td className="border p-2 text-sm font-normal">{log.lastUpdate}</td>
                <td className="border p-2 text-sm font-normal">{log.sentBy}</td>
                <td className="border p-2 text-sm font-normal">{log.totalUsers}</td>
                <td className="border p-2 text-sm font-normal">{log.lastSent}</td>
                <td className="border p-2 text-sm font-normal">{log.medium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            <Link href='/dashboard/view-notifications'>
      <Button  variant='default' className='bg-ds-primary text-ds-foreground mt-6'>
        View Notification
      </Button>
      </Link>
    </div>
  )
}