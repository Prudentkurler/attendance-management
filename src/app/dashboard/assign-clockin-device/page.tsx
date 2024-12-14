"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AssignDeviceForm from "@/components/clocking/AssignDeviceForm";
import DeviceAssignmentTable from "@/components/clocking/DeviceAssignmentTable";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export interface DeviceAssignment {
  id: string;
  country: string;
  branch: string;
  admins: string[];
  devices: string[];
}

const Page: React.FC = () => {
  const [branchFilter, setBranchFilter] = useState("");
  const [adminFilter, setAdminFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [assignments, setAssignments] = useState<DeviceAssignment[]>([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('attendance-manager.akwaabahr.com/api/device-assignments');
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch assignments. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAssign = async (newAssignment: Omit<DeviceAssignment, 'id'>) => {
    try {
      await axios.post('attendance-manager.akwaabahr.com/api/device-assignments', newAssignment);
      fetchAssignments();
      toast({
        title: "Success",
        description: "Device assigned successfully",
      });
    } catch (error) {
      console.error('Error assigning device:', error);
      toast({
        title: "Error",
        description: "Failed to assign device. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 mx-5">
      <h2 className="text-xl text-center md:text-left font-semibold">Assign Clocking Device</h2>

      <AssignDeviceForm onAssign={handleAssign} />

      <Card className="p-4 mt-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <h3 className="text-sm md:xl font-semibold">View Assigned Devices</h3>

          <div className="flex w-full md:w-[50%] justify-between items-center">
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger>
                Filter by Branch
              </SelectTrigger>
              <SelectContent className="w-60">
                <SelectItem value="">All Branches</SelectItem>
                <SelectItem value="Branch A">Branch A</SelectItem>
                <SelectItem value="Branch B">Branch B</SelectItem>
              </SelectContent>
            </Select>

            <Input
              value={adminFilter}
              onChange={(e) => setAdminFilter(e.target.value)}
              placeholder="Search by Admin Name"
            />

            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger>
                Filter by Country
              </SelectTrigger>
              <SelectContent className="w-60">
                <SelectItem value="">All Countries</SelectItem>
                <SelectItem value="Country A">Country A</SelectItem>
                <SelectItem value="Country B">Country B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DeviceAssignmentTable
          data={assignments}
          branchFilter={branchFilter}
          adminFilter={adminFilter}
          countryFilter={countryFilter}
          setAssignments={setAssignments}
          onDelete={fetchAssignments}
          onEdit={fetchAssignments}
        />
      </Card>
    </div>
  );
}

export default Page;

