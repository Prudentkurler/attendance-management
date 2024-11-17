"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";



import AssignDeviceForm from "@/components/clocking/AssignDeviceForm";
import DeviceAssignmentTable from "@/components/clocking/DeviceAssignmentTable";
import { SelectContent, SelectItem, SelectTrigger } from "@radix-ui/react-select";
import { Card } from "@/components/ui/card";


export interface DeviceAssignment {
    branch: string;                
    admins: string[];                
    devices: string[];              
  }
  

const Page :React.FC  = ()=> {
  const [branchFilter, setBranchFilter] = useState("");
  const [adminFilter, setAdminFilter] = useState("");
  const [assignments, setAssignments] = useState<DeviceAssignment[]>([]);

  // Add new assignment
const handleAssign = (newAssignment: DeviceAssignment) => {
    setAssignments([...assignments, newAssignment]);
};

  return (
    <div className="space-y-6 mx-5">
      <h2 className="text-2xl font-semibold">Assign Clocking Device</h2>

      {/* Assign Clocking Device Panel */}
      <AssignDeviceForm onAssign={handleAssign} />

      {/* View Assigned Clocking Device Panel */}


      <Card className=" p-4 mt-8" >
        <div className="flex gap-4 justify-between">

        <h3 className="text-xl font-semibold">View Assigned Devices</h3>

        {/* Filters */}
        <div className="flex w-[50%] justify-between items-center">
          <Select
            value={branchFilter}
            onValueChange={setBranchFilter}
            
            >
            <SelectTrigger>
                Filter by Branch
                </SelectTrigger>
                <SelectContent className="w-60">
                    <SelectItem value="Branch A">Branch A</SelectItem>
                    <SelectItem value="Branch B">Branch B</SelectItem>
                </SelectContent>
            
          </Select>

          <Input
            value={adminFilter}
            onChange={(e) => setAdminFilter(e.target.value)}
            placeholder="Search by Admin Name"
            />
        </div>
            </div>

        {/* Device Assignment Table */}
        <DeviceAssignmentTable
          data={assignments}
          branchFilter={branchFilter}
          adminFilter={adminFilter}
          setAssignments={setAssignments}
        />
      </Card>
    </div>
  );
}

export default Page