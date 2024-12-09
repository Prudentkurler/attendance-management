'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Mic, Camera, Upload, Check, X } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  image: string
  country: string
  branch: string
  voiceStatus: 'Available' | 'Empty'
  imageStatus: 'Available' | 'Empty'
  registrationDate: string
}

export default function ViewRegisteredVoicesImages() {
  const [users, setUsers] = useState<User[]>([])
  const [filters, setFilters] = useState({
    country: '',
    branch: '',
    search: '',
  })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<'voice' | 'image'>('voice')
  const [organizationCode, setOrganizationCode] = useState('')
  const [userId, setUserId] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'success' | 'error'>('idle')
  const [imageSource, setImageSource] = useState<'capture' | 'upload' | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [filters])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const queryParams = new URLSearchParams(filters)
      const response = await fetch(`/api/biometric?${queryParams}`)
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleRecordVoice = async (phrase: string) => {
    setIsRecording(true)
    setRecordingStatus('recording')
    try {
      // Implement actual voice recording logic here
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 3000))
      setRecordingStatus('success')
    } catch (error) {
      console.error('Error recording voice:', error)
      setRecordingStatus('error')
    } finally {
      setIsRecording(false)
    }
  }

  const handleSubmitVoice = async () => {
    try {
      const response = await fetch('/api/biometric', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser?.id, type: 'voice' }),
      })
      if (!response.ok) throw new Error('Failed to submit voice')
      toast({
        title: "Success",
        description: "Voice registration successful",
      })
      setRecordingStatus('idle')
      fetchUsers()
    } catch (error) {
      console.error('Error submitting voice:', error)
      toast({
        title: "Error",
        description: "Failed to submit voice",
        variant: "destructive",
      })
    }
  }

  const handleCaptureImage = async () => {
    setImageSource('capture')
    // Implement actual image capture logic here
  }

  const handleUploadImage = async () => {
    setImageSource('upload')
    // Implement actual image upload logic here
  }

  const handleSubmitImage = async () => {
    try {
      const response = await fetch('/api/biometric', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: selectedUser?.id, type: 'image' }),
      })
      if (!response.ok) throw new Error('Failed to submit image')
      toast({
        title: "Success",
        description: "Image registration successful",
      })
      setImageSource(null)
      fetchUsers()
    } catch (error) {
      console.error('Error submitting image:', error)
      toast({
        title: "Error",
        description: "Failed to submit image",
        variant: "destructive",
      })
    }
  }

  const handleVerifyOrganization = async () => {
    try {
      const response = await fetch(`/api/biometric/verify-organization?code=${organizationCode}`)
      if (!response.ok) throw new Error('Failed to verify organization')
      toast({
        title: "Success",
        description: "Organization verified successfully",
      })
    } catch (error) {
      console.error('Error verifying organization:', error)
      toast({
        title: "Error",
        description: "Failed to verify organization",
        variant: "destructive",
      })
    }
  }

  const handleVerifyUser = async () => {
    try {
      const response = await fetch(`/api/biometric/verify-user?id=${userId}`)
      if (!response.ok) throw new Error('Failed to verify user')
      toast({
        title: "Success",
        description: "User verified successfully",
      })
    } catch (error) {
      console.error('Error verifying user:', error)
      toast({
        title: "Error",
        description: "Failed to verify user",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">View Registered Voices/Images</h1>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Select onValueChange={(value) => handleFilterChange('country', value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ghana">Ghana</SelectItem>
              <SelectItem value="Nigeria">Nigeria</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('branch', value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Accra">Accra</SelectItem>
              <SelectItem value="Lagos">Lagos</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Search User [Name/ID]"
            className="w-[300px]"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='sticky left-0 z-10 bg-white'>User Image/Name</TableHead>
            <TableHead>Date/Time</TableHead>
            <TableHead>Voice Status</TableHead>
            <TableHead>Image Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center space-x-2 sticky left-0 bg-white z-10">
                <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                <span>{user.name}</span>
              </TableCell>
              <TableCell>{user.registrationDate}</TableCell>
              <TableCell>
                {user.voiceStatus === 'Available' ? (
                  <span className="text-green-800 flex items-center"><Check className="w-4 h-4 mr-1" /> Available</span>
                ) : (
                  <span className="text-red-500 flex items-center"><X className="w-4 h-4 mr-1" /> Empty</span>
                )}
              </TableCell>
              <TableCell>
                {user.imageStatus === 'Available' ? (
                  <span className="text-green-800 flex items-center"><Check className="w-4 h-4 mr-1" /> Available</span>
                ) : (
                  <span className="text-red-500 flex items-center"><X className="w-4 h-4 mr-1" /> Empty</span>
                )}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedUser(user)}>Manage</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[525px] p-6">
                    <DialogHeader>
                      <DialogTitle>Manage Biometric Data - {selectedUser?.name}</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="voice" className="w-full" onValueChange={(value) => setActiveTab(value as 'voice' | 'image')}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="voice">Voice</TabsTrigger>
                        <TabsTrigger value="image">Image</TabsTrigger>
                      </TabsList>
                      <TabsContent value="voice">
                        <div className="mt-5 mb-5 flex gap-3 items-center">
                          <Button className='font-bold' onClick={() => handleRecordVoice('CLOCK ME IN')} disabled={isRecording}>
                            <Mic />
                            Record "CLOCK ME IN"
                          </Button>
                          <Button className='font-bold' onClick={() => handleRecordVoice('CLOCK ME OUT')} disabled={isRecording}>
                            <Mic className="" />
                            Record "CLOCK ME OUT"
                          </Button>
                          {recordingStatus === 'recording' && <p>Recording...</p>}
                          {recordingStatus === 'success' && <p>Recording successful</p>}
                          {recordingStatus === 'error' && <p>Recording failed</p>}
                        </div>
                        <Button className='bg-ds-primary text-ds-foreground font-bold hover:bg-ds-primary-dark' onClick={handleSubmitVoice}>Submit Voice</Button>
                      </TabsContent>
                      <TabsContent value="image">
                        <div className="space-y-4">
                          <Input
                            placeholder="Enter Organization Code"
                            value={organizationCode}
                            onChange={(e) => setOrganizationCode(e.target.value)}
                          />
                          <Button className='font-semibold' onClick={handleVerifyOrganization}>Verify Organization</Button>
                          <Input
                            placeholder="Enter User ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                          />
                          <Button className='bg-ds-primary text-ds-foreground font-bold hover:bg-ds-primary-dark' onClick={handleVerifyUser}>Verify User</Button>
                          <Button variant='outline' onClick={handleCaptureImage}>
                            <Camera className="w-4 h-4 mx-2" />
                            Capture Image
                          </Button>
                          <Button variant='outline' onClick={handleUploadImage}>
                            <Upload className="w-4 h-4 mx-2" />
                            Attach Image
                          </Button>
                          {imageSource && (
                            <Button className='bg-ds-primary text-ds-foreground font-bold hover:bg-ds-primary-dark' onClick={handleSubmitImage}>Submit Image</Button>
                          )}
                          <Button variant="outline" className='font-bold'>Read Instructions</Button>
                        </div>
                      </TabsContent>
                    </Tabs>
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

