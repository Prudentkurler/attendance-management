'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

type NotificationType = "SMS" | "Email" | "In-app"
type UserType = "Admin Users" | "General Users" | "Parents" | "Absentees" | "Attendees"
type AlertType = "Recurring" | "Non-Recurring"
type RecurringStatus = "Daily" | "Monthly" | "Quarterly" | "Annually"

type NotificationLog = {
  type: string
  lastUpdate: string
  sentBy: string
  totalUsers: number
  lastSent: string
  medium: string
}

type Template = {
  id: string
  name: string
  content: string
}

const columns = [
  { accessorKey: "type", header: "Notification Type" },
  { accessorKey: "lastUpdate", header: "Last Update" },
  { accessorKey: "sentBy", header: "Sent By" },
  { accessorKey: "totalUsers", header: "Total Users" },
  { accessorKey: "lastSent", header: "Last Notification Sent" },
  { accessorKey: "medium", header: "Message Medium" },
]

export default function NotificationsPage() {
  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>([])
  const [userTypes, setUserTypes] = useState<UserType[]>([])
  const [formData, setFormData] = useState({
    country: "",
    branch: "",
    category: "",
    groupSubgroup: "",
    messageMedium: "",
    alertUserType: "",
    alertType: "",
    recurringStatus: "",
    nonRecurringDate: "",
    deliveryTime: "",
    startingDate: "",
    template: "",
    customMessage: "",
  })
  const [logs, setLogs] = useState<NotificationLog[]>([])
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchTemplates()
    fetchLogs()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/notifications?type=templates')
      if (!response.ok) throw new Error('Failed to fetch templates')
      const data = await response.json()
      setTemplates(data)
    } catch (error) {
      console.error('Error fetching templates:', error)
      toast({
        title: "Error",
        description: "Failed to fetch notification templates",
        variant: "destructive",
      })
    }
  }

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/notifications?type=logs')
      if (!response.ok) throw new Error('Failed to fetch logs')
      const data = await response.json()
      setLogs(data)
    } catch (error) {
      console.error('Error fetching logs:', error)
      toast({
        title: "Error",
        description: "Failed to fetch notification logs",
        variant: "destructive",
      })
    }
  }

  const fetchFilteredData = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams(formData)
      const response = await fetch(`/api/notifications?${queryParams}`)
      if (!response.ok) throw new Error('Failed to fetch filtered data')
      const data = await response.json()
      setFilteredUsers(data)
    } catch (error) {
      console.error('Error fetching filtered data:', error)
      toast({
        title: "Error",
        description: "Failed to fetch filtered data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const sendNotification = async (message: string, medium: string) => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, medium }),
      })
      if (!response.ok) throw new Error('Failed to send notification')
      toast({
        title: "Success",
        description: "Notification sent successfully",
      })
    } catch (error) {
      console.error('Error sending notification:', error)
      toast({
        title: "Error",
        description: "Failed to send notification",
        variant: "destructive",
      })
    }
  }

  const handlePreview = () => {
    const selectedTemplate = templates.find(t => t.id === formData.template)?.content
    const message = formData.customMessage || selectedTemplate || "No message provided."
    alert(`Previewing Message:\n\n${message}`)
  }

  const handleBulkAssign = async () => {
    setIsLoading(true)
    try {
      for (const user of filteredUsers) {
        const selectedTemplate = templates.find(t => t.id === formData.template)?.content
        const message = formData.customMessage || selectedTemplate || ""
        await sendNotification(message, notificationTypes.join("/"))
      }
      toast({
        title: "Success",
        description: "Bulk assign completed successfully",
      })
      fetchLogs()
    } catch (error) {
      console.error('Error in bulk assign:', error)
      toast({
        title: "Error",
        description: "Failed to complete bulk assign",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleBulkAssign()
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="md:text-2xl text-xl font-bold mb-6">Notifications</h1>

      <Button variant='default' size='lg' className="font-semibold mb-3" onClick={() => setShowFilters(!showFilters)}>
        Filters
      </Button>

      {showFilters && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg mb-3">Filter Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Select name="country" onValueChange={(value) => handleInputChange({ target: { name: "country", value } } as any)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Ghana">Ghana</SelectItem>
                </SelectContent>
              </Select>
              <Select name="branch" onValueChange={(value) => handleInputChange({ target: { name: "branch", value } } as any)}>
                <SelectTrigger  className="w-[130px]">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HQ">HQ</SelectItem>
                  <SelectItem value="West Branch">West Branch</SelectItem>
                </SelectContent>
              </Select>
              <Select name="category" onValueChange={(value) => handleInputChange({ target: { name: "category", value } } as any)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Staff">Staff</SelectItem>
                </SelectContent>
              </Select>
              <Select name="groupSubgroup" onValueChange={(value) => handleInputChange({ target: { name: "groupSubgroup", value } } as any)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Select Group/Subgroup" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Group A">Group A</SelectItem>
                  <SelectItem value="Subgroup B">Subgroup B</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={fetchFilteredData} disabled={isLoading}>
                {isLoading ? 'Fetching...' : 'Fetch Users'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl mb-3">Notification Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Choose Notification Types</h2>
              <div className="flex space-x-4">
                {(["SMS", "Email", "In-app"] as const).map((type) => (
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
                {(["Admin Users", "General Users", "Parents", "Absentees", "Attendees"] as const).map((type) => (
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
              <Select name="alertType" onValueChange={(value) => handleInputChange({ target: { name: "alertType", value } } as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Alert Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Recurring">Recurring</SelectItem>
                  <SelectItem value="Non-Recurring">Non-Recurring</SelectItem>
                </SelectContent>
              </Select>
              {formData.alertType === "Recurring" && (
                <Select name="recurringStatus" onValueChange={(value) => handleInputChange({ target: { name: "recurringStatus", value } } as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Recurring Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily</SelectItem>
                    <SelectItem value="Weekly">Weekly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {formData.alertType === "Non-Recurring" && (
                <Input
                  type="date"
                  placeholder="Non-Recurring Date"
                  name="nonRecurringDate"
                  onChange={handleInputChange}
                />
              )}
              <Input
                type={formData.alertType === "Recurring" ? "date" : "time"}
                placeholder={formData.alertType === "Recurring" ? "Starting Date" : "Delivery Time"}
                name={formData.alertType === "Recurring" ? "startingDate" : "deliveryTime"}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Message Template</h2>
              <Select name="template" onValueChange={(value) => {
                handleInputChange({ target: { name: "template", value } } as any);
                const selectedTemplate = templates.find((t) => t.id === value)?.content;
                setFormData((prev) => ({ ...prev, customMessage: selectedTemplate || "" }));
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                name="customMessage"
                placeholder="Custom message or edit template here"
                value={formData.customMessage}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-between">
              <Button onClick={handlePreview} variant="outline">
                Preview Message
              </Button>
              <Button type="submit" className="bg-ds-primary text-ds-foreground font-semibold hover:bg-ds-primary-dark" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
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
                {columns.map((column) => (
                  <TableHead
                    key={column.accessorKey}
                    className={column.accessorKey === "type" ? "sticky left-0 bg-white" : ""}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessorKey}
                      className={column.accessorKey === "type" ? "sticky left-0 bg-white" : ""}
                    >
                      {log[column.accessorKey as keyof NotificationLog]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

