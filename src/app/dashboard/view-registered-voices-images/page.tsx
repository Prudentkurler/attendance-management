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

  useEffect(() => {
    // Mock data initialization
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        image: '/placeholder.svg?height=50&width=50',
        country: 'Ghana',
        branch: 'Accra',
        voiceStatus: 'Available',
        imageStatus: 'Available',
        registrationDate: '2024-01-15 14:30',
      },
      {
        id: '2',
        name: 'Jane Smith',
        image: '/placeholder.svg?height=50&width=50',
        country: 'Nigeria',
        branch: 'Lagos',
        voiceStatus: 'Empty',
        imageStatus: 'Available',
        registrationDate: '2024-01-16 09:45',
      },
      // Add more mock users as needed
    ]
    setUsers(mockUsers)
  }, [])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredUsers = users.filter(user => 
    (filters.country === '' || user.country === filters.country) &&
    (filters.branch === '' || user.branch === filters.branch) &&
    (filters.search === '' || user.name.toLowerCase().includes(filters.search.toLowerCase()) || user.id.includes(filters.search))
  )

  const handleRecordVoice = (phrase: string) => {
    setIsRecording(true)
    setRecordingStatus('recording')
    // Simulating voice recording process
    setTimeout(() => {
      setIsRecording(false)
      setRecordingStatus('success')
    }, 3000)
  }

  const handleSubmitVoice = () => {
    // Simulating voice submission process
    setTimeout(() => {
      setRecordingStatus('idle')
      alert('Voice registration successful')
    }, 1000)
  }

  const handleCaptureImage = () => {
    setImageSource('capture')
    // Implement image capture logic here
  }

  const handleUploadImage = () => {
    setImageSource('upload')
    // Implement image upload logic here
  }

  const handleSubmitImage = () => {
    // Simulating image submission process
    setTimeout(() => {
      alert('Image registration successful')
      setImageSource(null)
    }, 1000)
  }

  const handleVerifyOrganization = () => {
    // Implement organization verification logic here
    console.log('Verifying organization:', organizationCode)
  }

  const handleVerifyUser = () => {
    // Implement user verification logic here
    console.log('Verifying user:', userId)
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
              {/* Add more countries as needed */}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => handleFilterChange('branch', value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Accra">Accra</SelectItem>
              <SelectItem value="Lagos">Lagos</SelectItem>
              {/* Add more branches as needed */}
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
            <TableHead>User Image/Name</TableHead>
            <TableHead>Date/Time</TableHead>
            <TableHead>Voice Status</TableHead>
            <TableHead>Image Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center space-x-2">
                <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                <span>{user.name}</span>
              </TableCell>
              <TableCell>{user.registrationDate}</TableCell>
              <TableCell>
                {user.voiceStatus === 'Available' ? (
                  <span className="text-green-500 flex items-center"><Check className="w-4 h-4 mr-1" /> Available</span>
                ) : (
                  <span className="text-red-500 flex items-center"><X className="w-4 h-4 mr-1" /> Empty</span>
                )}
              </TableCell>
              <TableCell>
                {user.imageStatus === 'Available' ? (
                  <span className="text-green-500 flex items-center"><Check className="w-4 h-4 mr-1" /> Available</span>
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
                          <Button className=' font-bold ' onClick={() => handleRecordVoice('CLOCK ME IN')} disabled={isRecording}>
                            <Mic  />
                            Record "CLOCK ME IN"
                          </Button>
                          <Button className=' font-bold ' onClick={() => handleRecordVoice('CLOCK ME OUT')} disabled={isRecording}>
                            <Mic className="" />
                            Record "CLOCK ME OUT"
                          </Button>
                          {recordingStatus === 'recording' && <p>Recording...</p>}
                          {recordingStatus === 'success' && <p>Recording successful</p>}
                          {recordingStatus === 'error' && <p>Recording failed</p>}
                         
                        </div>
                        <Button className='bg-ds-primary text-ds-foreground font-bold hover:bg-ds-primary-dark' onClick={handleSubmitVoice} >Submit Voice</Button>
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
                          <Button variant='outline'  onClick={handleCaptureImage}>
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