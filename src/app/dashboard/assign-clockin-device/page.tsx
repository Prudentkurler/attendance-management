"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";



import AssignDeviceForm from "@/components/clocking/AssignDeviceForm";
import DeviceAssignmentTable from "@/components/clocking/DeviceAssignmentTable";
import { SelectContent, SelectItem, SelectTrigger } from "@radix-ui/react-select";
import { Card } from "@/components/ui/card";


export interface DeviceAssignment {
    country: string;
    branch: string;                
    admins: string[];                
    devices: string[];              
  }
  

const Page :React.FC  = ()=> {
  const [branchFilter, setBranchFilter] = useState("");
  const [adminFilter, setAdminFilter] = useState("");
  const [assignments, setAssignments] = useState<DeviceAssignment[]>([]);
  const [countryFilter, setCountryFilter] = useState("");

const handleAssign = (newAssignment: DeviceAssignment) => {
    if (!newAssignment.country) {
        newAssignment.country = "Default Country"; // or any default value
    }
    setAssignments([...assignments, newAssignment]);
};

  return (
    <div className="space-y-6 mx-5">
      <h2 className="text-xl text-center md:text-left font-semibold">Assign Clocking Device</h2>

      {/* Assign Clocking Device Panel */}
      <AssignDeviceForm onAssign={handleAssign} />

      {/* View Assigned Clocking Device Panel */}


      <Card className=" p-4 mt-8" >
        <div className="flex flex-col md:flex-row gap-4 justify-between">

        <h3 className="text-sm md:xl font-semibold">View Assigned Devices</h3>

        {/* Filters */}
        <div className="flex w-full md:w-[50%] justify-between items-center">
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
        countryFilter={countryFilter}
        setAssignments={setAssignments}
        />
      </Card>
    </div>
  );
}

export default Page