"use client";

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'

type NotificationType = "SMS" | "Email" | "In-app";
type UserType =
  | "Admin Users"
  | "General Users"
  | "Parents"
  | "Absentees"
  | "Attendees";
type AlertType = "Recurring" | "Non-Recurring";
type RecurringStatus = "Daily" | "Monthly" | "Quarterly" | "Annually";

type NotificationLog = {
  type: string;
  lastUpdate: string;
  sentBy: string;
  totalUsers: number;
  lastSent: string;
  medium: string;
};

const columns = [
  { accessorKey: "type", header: "Notification Type" },
  { accessorKey: "lastUpdate", header: "Last Update" },
  { accessorKey: "sentBy", header: "Sent By" },
  { accessorKey: "totalUsers", header: "Total Users" },
  { accessorKey: "lastSent", header: "Last Notification Sent" },
  { accessorKey: "medium", header: "Message Medium" },
];

type Template = {
  id: string
  name: string
  content: string
}

export default function NotificationsPage() {
  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([])
  const [userTypes, setUserTypes] = useState<UserType[]>([])
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
    startingDate: '',
    template: '',
    customMessage: '',
  })
  const [logs, setLogs] = useState<NotificationLog[]>([
    {
      type: "Schedule Update",
      lastUpdate: "2024-10-15 10:30",
      sentBy: "Admin 1",
      totalUsers: 120,
      lastSent: "2024-10-15 10:30 AM",
      medium: "SMS/Email",
    },
    {
      type: "Absence Reminder",
      lastUpdate: "2024-10-14 09:00",
      sentBy: "Admin 2",
      totalUsers: 80,
      lastSent: "2024-10-14 09:00 AM",
      medium: "Email",
    },
  ])
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Attendance Reminder',
      content: 'Hi [User Name], this is a reminder to clock in for your shift today.',
    },
    {
      id: '2',
      name: 'Schedule Update',
      content: 'Hi [User Name], your schedule has been updated. Please check the app for details.',
    },
    {
      id: '3',
      name: 'Absence Notification',
      content: 'Hi [Parent Name], [Student Name] was absent from school today.',
    },
  ])

  const handleNotificationTypeChange = (type: NotificationType) => {
    setNotificationTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleUserTypeChange = (type: UserType) => {
    setUserTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', { notificationTypes, userTypes, ...formData })
    // Here you would typically send this data to your backend
    // For demonstration, let's add a new log entry
    const newLog: NotificationLog = {
      type: formData.template || 'Custom Notification',
      lastUpdate: new Date().toLocaleString(),
      sentBy: 'Current Admin',
      totalUsers: 100, // This would be calculated based on selected user types
      lastSent: new Date().toLocaleString(),
      medium: notificationTypes.join('/'),
    }
    setLogs(prev => [newLog, ...prev])
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notification Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Choose Notification Types</h2>
              <div className="flex space-x-4">
                {(['SMS', 'Email', 'In-app'] as const).map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={notificationTypes.includes(type)}
                      onCheckedChange={() => handleNotificationTypeChange(type)}
                    />
                    <label htmlFor={`type-${type}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Select User Type</h2>
              <div className="flex flex-wrap gap-4">
                {(['Admin Users', 'General Users', 'Parents', 'Absentees', 'Attendees'] as const).map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`user-${type}`}
                      checked={userTypes.includes(type)}
                      onCheckedChange={() => handleUserTypeChange(type)}
                    />
                    <label htmlFor={`user-${type}`}>{type}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select name="country" onValueChange={(value) => handleInputChange({ target: { name: 'country', value } } as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                </SelectContent>
              </Select>

              <Select name="branch" onValueChange={(value) => handleInputChange({ target: { name: 'branch', value } } as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HQ">HQ</SelectItem>
                  <SelectItem value="West Branch">West Branch</SelectItem>
                </SelectContent>
              </Select>

              <Select name="category" onValueChange={(value) => handleInputChange({ target: { name: 'category', value } } as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>

              <Select name="groupSubgroup" onValueChange={(value) => handleInputChange({ target: { name: 'groupSubgroup', value } } as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Group/Subgroup" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Group A">Group A</SelectItem>
                  <SelectItem value="Subgroup B">Subgroup B</SelectItem>
                </SelectContent>
              </Select>

              <Select name="alertType" onValueChange={(value) => handleInputChange({ target: { name: 'alertType', value } } as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Alert Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recurring">Recurring</SelectItem>
                  <SelectItem value="Non-Recurring">Non-Recurring</SelectItem>
                </SelectContent>
              </Select>

              {formData.alertType === 'Recurring' && (
                <Select name="recurringStatus" onValueChange={(value) => handleInputChange({ target: { name: 'recurringStatus', value } } as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Recurring Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {formData.alertType === 'Recurring' && (
                <Input
                  type="date"
                  name="startingDate"
                  placeholder="Starting Date"
                  onChange={handleInputChange}
                />
              )}

              {formData.alertType === 'Non-Recurring' && (
                <Input
                  type="date"
                  name="nonRecurringDate"
                  placeholder="Non-Recurring Date"
                  onChange={handleInputChange}
                />
              )}

              <Input
                type="time"
                name="deliveryTime"
                placeholder="Delivery Time"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Message Template</h2>
              <Select name="template" onValueChange={(value) => handleInputChange({ target: { name: 'template', value } } as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(template => (
                    <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                name="customMessage"
                placeholder="Custom message or edit template here"
                className="mt-2"
                value={formData.customMessage || templates.find(t => t.id === formData.template)?.content || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Notification Type</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>Sent By</TableHead>
                <TableHead>Total Users</TableHead>
                <TableHead>Last Notification Sent</TableHead>
                <TableHead>Message Medium</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>{log.lastUpdate}</TableCell>
                  <TableCell>{log.sentBy}</TableCell>
                  <TableCell>{log.totalUsers}</TableCell>
                  <TableCell>{log.lastSent}</TableCell>
                  <TableCell>{log.medium}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Link href='/dashboard/view-notifications'>
          <Button variant='default' className='bg-ds-primary text-ds-foreground'>
            View Notifications
          </Button>
        </Link>
      </div>
    </div>
  );
}
