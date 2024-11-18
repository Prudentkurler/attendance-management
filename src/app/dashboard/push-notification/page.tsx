"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useState } from "react";

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

export default function PushNotification() {
  const [notificationTypes, setNotificationTypes] = useState<NotificationType[]>(
    []
  );
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
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
  });
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
  ]);

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

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", {
      notificationTypes,
      userTypes,
      ...formData,
    });
    // Send form data to backend
  };

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Push Notifications</h1>

      <form onSubmit={handleSubmit} className="space-y-6 shadow-md p-4 rounded">
        <div>
          <h2 className="text-lg font-semibold mb-2">Choose Notification Types</h2>
          <div className="flex space-x-4">
            {(["SMS", "Email", "In-app"] as const).map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <Checkbox
                  checked={notificationTypes.includes(type)}
                  onCheckedChange={() => handleNotificationTypeChange(type)}
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Select User Type</h2>
          <div className="flex flex-wrap gap-4">
            {([
              "Admin Users",
              "General Users",
              "Parents",
              "Absentees",
              "Attendees",
            ] as const).map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <Checkbox
                  checked={userTypes.includes(type)}
                  onCheckedChange={() => handleUserTypeChange(type)}
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            onValueChange={(value) => handleInputChange("country", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Ghana">Ghana</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleInputChange("branch", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HQ">HQ</SelectItem>
              <SelectItem value="West Branch">West Branch</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleInputChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Management">Management</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleInputChange("groupSubgroup", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Group/Subgroup" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Group A">Group A</SelectItem>
              <SelectItem value="Subgroup B">Subgroup B</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleInputChange("messageMedium", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Message Medium" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SMS">SMS</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Push Notification">Push Notification</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleInputChange("alertType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Alert Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Recurring">Recurring</SelectItem>
              <SelectItem value="Non-Recurring">Non-Recurring</SelectItem>
            </SelectContent>
          </Select>

          {formData.alertType === "Recurring" && (
            <Select
              onValueChange={(value) => handleInputChange("recurringStatus", value)}
            >
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

          {formData.alertType === "Non-Recurring" && (
            <input
              type="date"
              className="border p-2 rounded text-sm"
              onChange={(e) =>
                handleInputChange("nonRecurringDate", e.target.value)
              }
            />
          )}

          <input
            type="time"
            className="border p-2 rounded text-sm"
            onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-600 text-white">
            Submit
          </Button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Notification Logs</h2>
        <DataTable columns={columns} data={logs} />
      </div>

      <Link href="/dashboard/view-notifications">
        <Button size='sm' variant="default" className="bg-ds-primary text-ds-foreground mt-6">
          View Notifications
        </Button>
      </Link>
    </div>
  );
}
