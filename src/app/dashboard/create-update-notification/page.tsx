'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

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
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications')
      if (!response.ok) throw new Error('Failed to fetch templates')
      const data = await response.json()
      setTemplates(data)
    } catch (error) {
      console.error('Error fetching templates:', error)
      toast.toast({
        title: "Error",
        description: "Failed to fetch notification templates",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      })
      if (!response.ok) throw new Error('Failed to update notification')
      toast.toast({
        title: "Success",
        description: "Notification updated successfully",
      })
      fetchTemplates()
    } catch (error) {
      console.error('Error updating notification:', error)
      toast.toast({
        title: "Error",
        description: "Failed to update notification",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNonRecurringDate = () => {
    // Implement logic to add non-recurring date
    console.log('Adding non-recurring date:', filters.nonRecurringDate)
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Create/Update Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select onValueChange={(value) => handleFilterChange('country', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usa">USA</SelectItem>
            <SelectItem value="uk">UK</SelectItem>
            <SelectItem value="canada">Canada</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('branch', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="branch_a">Branch A</SelectItem>
            <SelectItem value="branch_b">Branch B</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="category_1">Category 1</SelectItem>
            <SelectItem value="category_2">Category 2</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('group', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="group_1">Group 1</SelectItem>
            <SelectItem value="group_2">Group 2</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('subgroup', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Subgroup" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="subgroup_1">Subgroup 1</SelectItem>
            <SelectItem value="subgroup_2">Subgroup 2</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('messageMedium', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Message Medium" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="voiceCall">Voice Call</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('alertUserType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Alert Users Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admins">Admins</SelectItem>
            <SelectItem value="parents">Parents</SelectItem>
            <SelectItem value="absentees">Absentees</SelectItem>
            <SelectItem value="attendees">Attendees</SelectItem>
            <SelectItem value="generalUsers">General Users</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange('alertType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Alert Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recurring">Recurring Alert</SelectItem>
            <SelectItem value="nonRecurring">Non-Recurring Alert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filters.alertType === 'recurring' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Select onValueChange={(value) => handleFilterChange('recurringStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Recurring Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="semiAnnually">Every 6 months</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="date"
            onChange={(e) => handleFilterChange('startingDate', e.target.value)}
            className="border p-2 rounded text-sm"
            placeholder="Starting Date"
          />
          <Input
            type="time"
            onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
            className="border p-2 rounded text-sm"
            placeholder="Delivery Time"
          />
        </div>
      )}
      {filters.alertType === 'nonRecurring' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            type="date"
            onChange={(e) => handleFilterChange('nonRecurringDate', e.target.value)}
            className="border p-2 rounded text-sm"
            placeholder="Non-Recurring Date"
          />
          <Input
            type="time"
            onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
            className="border p-2 rounded text-sm"
            placeholder="Delivery Time"
          />
          <Button 
            onClick={handleAddNonRecurringDate} 
            className="bg-[#006994] text-white text-sm font-semibold px-2 py-1 rounded h-9"
          >
            Add New Non-Recurring Date
          </Button>
        </div>
      )}
      <div className="flex justify-end mb-4">
        <Button 
          onClick={handleUpdate} 
          className="bg-[#004D1B] text-white text-sm font-semibold px-2 py-1 rounded h-9"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'UPDATE'}
        </Button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">UPDATE SMS/VOICE CALL/EMAIL NOTIFICATIONS</h2>
        {isLoading ? (
          <p>Loading templates...</p>
        ) : (
          templates.map(template => (
            <div key={template.id} className="mb-4 p-4 border rounded">
              <h3 className="font-bold">{template.title}</h3>
              <p>{template.message}</p>
              <Textarea
                className="w-full border p-2 mt-2 rounded text-sm"
                placeholder="Type additional information here (340 characters maximum)"
                maxLength={340}
              />
              <div className="mt-2">
                <p className="font-semibold">Activity Logs</p>
                <p className="text-sm">Last update: {template.lastUpdate}</p>
                <p className="text-sm">Updated By: {template.updatedBy}</p>
                <p className="text-sm">Total Assigned users: {template.totalAssignedUsers}</p>
                <p className="text-sm">Last Notification Sent: {template.lastNotificationSent}</p>
                <p className="text-sm">Message Medium: {template.messageMedium.join(', ')}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

