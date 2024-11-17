
"use client"
// pages/schedule-notifications.tsx
import React, { useState } from 'react';
import { ActionButton } from '@/components/ActionButtons';
import { FilterSection } from '@/components/FilterSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface NotificationTemplate {
  id: string;
  title: string;
  content: string;
  variables: string[];
}

interface ActivityLog {
  id: string;
  timestamp: Date;
  updatedBy: string;
  totalUsers: number;
  lastNotification: Date;
  medium: 'SMS' | 'Voice' | 'Email';
}

const columns:ColumnDef<ActivityLog>[] = [
  {
    accessorKey: 'timestamp',
    header: 'Last Update',
  },
  {
    accessorKey: 'updatedBy',
    header: 'Updated By',
  },  
  {
    accessorKey: 'totalUsers',
    header: 'Total Users',
  },
  {
    accessorKey: 'lastNotification',
    header: 'Last Notification',
  },
  {
    accessorKey: 'medium',
    header: 'Medium',
  },
];

const  page = ()=> {
  const [medium, setMedium] = useState<'SMS' | 'Voice' | 'Email'>('SMS');
  const [alertType, setAlertType] = useState<'Recurring' | 'Non-recurring'>('Recurring');
  const [SelectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [additionalText, setAdditionalText] = useState('');
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  const handleSendNotification = () => {
    // Implementation for sending notification
    console.log('Sending notification...');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Schedule Notifications</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <FilterSection onFilterChange={() => {}} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Select value='' >
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
           
              <SelectItem value="select">
               Select
              </SelectItem>
          
          </SelectContent>
        </Select>

          <Select
           
            value={alertType}
            
          >
            <SelectContent>

            <SelectItem value="Recurring">Recurring</SelectItem>
            <SelectItem value="Non-Recurring">Non-Recurring</SelectItem>
            </SelectContent>
            
          </Select>
        </div>

        {alertType === 'Recurring' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Select value=''>
              <SelectContent>

              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
             
              placeholder="Start Date"
            />

            <Input
              type="time"
             
              placeholder="Delivery Time"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Input
              type="date"
             
              placeholder="Date"
            />

            <Input
              type="time"
             
              placeholder="Delivery Time"
            />

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => {}}
            >
              Add More Dates
            </button>
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Message Template</h3>
          <Select
           value=''
            onValueChange={(value) => setSelectedTemplate(JSON.parse(value))}
          >
            <SelectContent>
            <SelectItem value="Template">Select Template</SelectItem>

            </SelectContent>
            {/* Add template options */}
          </Select>

          {SelectedTemplate && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-2">Default Message:</h4>
              <p>{SelectedTemplate.content}</p>
            </div>
          )}

          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Text
            </Label>
            <textarea
             
              rows={4}
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
              maxLength={160}
            />
            <p className="text-sm text-gray-500 mt-1">
              {160 - additionalText.length} characters remaining
            </p>
          </div>

          <div className="mt-4">
            <ActionButton
              label="Preview Message"
              onClick={() => {}}
              variant="secondary"
            />
            <ActionButton
              label="Send Notification"
              onClick={handleSendNotification}
              variant="primary"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium mb-4">Activity Logs</h2>
        
      </div>

      <DataTable columns={columns} data={activityLogs}/>
    </div>
  );
}

export default page