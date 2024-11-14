// pages/schedule-notifications.tsx
import React, { useState } from 'react';
import { FilterSection, ActionButton } from '../components';

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

export default function ScheduleNotificationsPage() {
  const [medium, setMedium] = useState<'SMS' | 'Voice' | 'Email'>('SMS');
  const [alertType, setAlertType] = useState<'Recurring' | 'Non-recurring'>('Recurring');
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
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
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={medium}
            onChange={(e) => setMedium(e.target.value as any)}
          >
            <option value="SMS">SMS</option>
            <option value="Voice">Voice Call</option>
            <option value="Email">Email</option>
          </select>

          <select
            className="w-full px-3 py-2 border rounded-md"
            value={alertType}
            onChange={(e) => setAlertType(e.target.value as any)}
          >
            <option value="Recurring">Recurring</option>
            <option value="Non-recurring">Non-recurring</option>
          </select>
        </div>

        {alertType === 'Recurring' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <select className="w-full px-3 py-2 border rounded-md">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Start Date"
            />

            <input
              type="time"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Delivery Time"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Date"
            />

            <input
              type="time"
              className="w-full px-3 py-2 border rounded-md"
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
          <select
            className="w-full px-3 py-2 border rounded-md mb-4"
            onChange={(e) => setSelectedTemplate(JSON.parse(e.target.value))}
          >
            <option value="">Select Template</option>
            {/* Add template options */}
          </select>

          {selectedTemplate && (
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-2">Default Message:</h4>
              <p>{selectedTemplate.content}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Text
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
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
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Notification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medium
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activityLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.timestamp.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.updatedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.totalUsers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.lastNotification.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.medium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
