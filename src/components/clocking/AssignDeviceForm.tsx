import { useState } from "react";
import { Select, SelectContent } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SelectItem, SelectTrigger } from "@radix-ui/react-select";
import { Card } from "../ui/card";

interface AssignDeviceFormProps {
  onAssign: (assignment: { branch: string; admins: string[]; devices: string[] }) => void;
}

export default function AssignDeviceForm({ onAssign }: AssignDeviceFormProps) {
  const [branch, setBranch] = useState("");
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [deviceIds, setDeviceIds] = useState<string[]>([]);

  // Handle assignment submission
  const handleAssign = () => {
    const newAssignment = {
      branch,
      admins: selectedAdmins,
      devices: deviceIds,
    };
    onAssign(newAssignment);
    setBranch("");
    setSelectedAdmins([]);
    setDeviceIds([]);
  };

  return (
    <Card className="flex  md:flex-row gap-3 justify-between items-center   p-4">

      

      {/* Branch Selection */}
      <div className="flex gap-4">

      <Select
        value={branch}
        onValueChange={setBranch}
        
        >
        <SelectTrigger className="p-2">
            {branch || "Select Branch"}
        </SelectTrigger>

        <SelectContent>
        <SelectItem value="Branch A">Branch A</SelectItem>
        <SelectItem value="Branch B">Branch B</SelectItem>
        </SelectContent>    
       
      </Select>

      {/* Admin Selection */}
      <Select
        value={selectedAdmins.join(',')}
        onValueChange={(value) => setSelectedAdmins(value.split(','))}
        
        >
        <SelectTrigger className="p-2">
            {selectedAdmins.length ? `${selectedAdmins.length} Admins Selected` : "Select Admins"}
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="Admin1">Admin 1</SelectItem>
        <SelectItem value="Admin2">Admin 2</SelectItem>
        </SelectContent>
       
      </Select>

      {/* Device ID Selection */}
      <Select
        value={deviceIds.join(',')}
        onValueChange={(value) => setDeviceIds(value.split(','))}
        >
        <SelectTrigger className="p-2">
            {deviceIds.length ? `${deviceIds.length} Devices Selected` : "Select Device IDs"}
        </SelectTrigger>
        <SelectContent>
        <SelectItem value="Device1">Device 1</SelectItem>
        <SelectItem value="Device2">Device 2</SelectItem>
        </SelectContent>
      </Select>
          </div>

      {/* Assign Button */}
      <Button onClick={handleAssign} className="bg-ds-primary text-ds-foreground">
        Assign
      </Button>
    
        </Card>
  );
}
