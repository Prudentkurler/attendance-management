import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DeviceAssignment } from "@/app/dashboard/assign-clockin-device/page";

interface AssignDeviceFormProps {
  onAssign: (assignment: Omit<DeviceAssignment, 'id'>) => void;
}

export default function AssignDeviceForm({ onAssign }: AssignDeviceFormProps) {
  const [country, setCountry] = useState("");
  const [branch, setBranch] = useState("");
  const [selectedAdmins, setSelectedAdmins] = useState<string[]>([]);
  const [deviceIds, setDeviceIds] = useState<string[]>([]);

  const handleAssign = () => {
    const newAssignment = {
      country,
      branch,
      admins: selectedAdmins,
      devices: deviceIds,
    };
    onAssign(newAssignment);
    setCountry("");
    setBranch("");
    setSelectedAdmins([]);
    setDeviceIds([]);
  };

  return (
    <Card className="flex w-full flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="p-2 border border-gray-300 rounded-md">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Country A">Country A</SelectItem>
            <SelectItem value="Country B">Country B</SelectItem>
          </SelectContent>
        </Select>

        <Select value={branch} onValueChange={setBranch}>
          <SelectTrigger className="p-2 border border-gray-300 rounded-md">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Branch A">Branch A</SelectItem>
            <SelectItem value="Branch B">Branch B</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedAdmins.join(",")}
          onValueChange={(value) => setSelectedAdmins(value.split(","))}
        >
          <SelectTrigger className="p-2 border border-gray-300 rounded-md">
            <SelectValue placeholder='Select Admin'/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Admin1">Admin 1</SelectItem>
            <SelectItem value="Admin2">Admin 2</SelectItem>
            <SelectItem value="Admin3">Admin 3</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={deviceIds.join(",")}
          onValueChange={(value) => setDeviceIds(value.split(","))}
        >
          <SelectTrigger className="p-2 border border-gray-300 rounded-md">
            <SelectValue placeholder='Select Device Id' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Device1">Device 1</SelectItem>
            <SelectItem value="Device2">Device 2</SelectItem>
            <SelectItem value="Device3">Device 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleAssign}
        className="bg-ds-primary w-[120px] text-lg font-bold text-ds-foreground mt-4 hover:bg-ds-primary-dark"
      >
        Assign
      </Button>
    </Card>
  );
}

