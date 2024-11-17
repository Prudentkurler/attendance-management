"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { sampleLocationData } from "@/components/Location/LocationData";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "../ui/dialog";
import { CSVLink } from "react-csv";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";


// Define columns for DataTable


const handleDelete = ()=>{
    console.log('Data deleted')
}
const  handleEditSave = ()=> {
    throw new Error("Function not implemented.");
}
const columns: ColumnDef<typeof sampleLocationData[0]>[] = [
  {
    accessorKey: "country",
    header: "Country",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "branch",
    header: "Branch",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "locationName",
    header: "Location",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "locationType",
    header: "Location Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "radius",
    header: "Radius",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "wifiId",
    header: "Wifi ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "bluetoothDeviceId",
    header: "Bluetooth ID",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "updatedBy",
    header: "Updated By",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <div className="relative flex gap-2">
        <Dialog>
          
          <DialogTitle>
          
          </DialogTitle>
        
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              ...
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6 rounded-md bg-white shadow-md w-full max-w-md">
            <EditForm initialData={row.original} onSave={({updatedData}:any) => handleEditSave()} />
            <Button
              variant="destructive"
              size="sm"
              className="mt-4"
              onClick={() => handleDelete}
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="mt-2 text-center">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    ),
  },
];

// Edit Form Component
const EditForm = ({ initialData, onSave }:any) => {
  const [formData, setFormData] = useState(initialData);


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(({prev}:any) => ({ ...prev, [name]: value }));
};

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <form>
      <div className="flex flex-col gap-4">
      <Input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="p-2 border rounded-md" />
      <Input name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" className="p-2 border rounded-md" />
      <Input name="locationName" value={formData.locationName} onChange={handleChange} placeholder="Location Name" className="p-2 border rounded-md" />
      <Input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" className="p-2 border rounded-md" />
      <Input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" className="p-2 border rounded-md" />
      <Input name="Radius" value={formData.Radius} onChange={handleChange} placeholder="Radius" className="p-2 border rounded-md" />
      <Input name="Wifi-Id" value={formData.wifi_id} onChange={handleChange} placeholder="Wifi-Id" className="p-2 border rounded-md" />
        <Button onClick={handleSave} variant='default' className="mt-4">
          Save Changes
        </Button>
      </div>
    </form>
    
  );
};

// View Location Table Component
const ViewLocationTable = () => {
  const [data] = useState(sampleLocationData);
  const [selectCountry, setCountry] = useState('');
  const [selectedBranch, setBranch] = useState('');
  const [selectLocationName, setLocationName] = useState('');
  const [selectLocationType, setLocationType] = useState('');
  const [selectLastUpdated, setLastUpdated] = useState('');


  // Filter data based on selected filters
  const filterData = data.filter((choice) => {
    const matchesCountry = selectCountry ? choice.country === selectCountry : true;
    const matchesBranch = selectedBranch ? choice.branch === selectedBranch : true;
    const matchesLocationType = selectLocationType ? choice.locationType === selectLocationType : true;
    const matchesLastUpdated = selectLastUpdated ? choice.lastUpdated === selectLastUpdated : true;
    const matchesLocationName = selectLocationName ? choice.locationName === selectLocationName : true;

    return matchesCountry && matchesBranch && matchesLocationType && matchesLastUpdated && matchesLocationName;
  });


  // Clear all filters
  const clearFilters = () => {
    setCountry('');
    setBranch('');
    setLocationName('');
    setLocationType('');
    setLastUpdated('');
  };

  // Unique filter options
  const uniqueCountries = Array.from(new Set(data.map((entry) => entry.country)));
  const uniqueBranches = Array.from(new Set(data.map((entry) => entry.branch)));
  const uniqueLocationTypes = Array.from(new Set(data.map((entry) => entry.locationType)));
  const uniqueLocationNames = Array.from(new Set(data.map((entry) => entry.locationName)));
  const uniqueLastUpdated = Array.from(new Set(data.map((entry) => entry.lastUpdated)));

  return (
    <Card className="mt-8 p-4">
      {/* Filter Controls */}
      <div className="mb-4 flex gap-4">
        <Select value={selectCountry} onValueChange={(value) => setCountry(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCountries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedBranch} onValueChange={(value) => setBranch(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {uniqueBranches.map((branch) => (
              <SelectItem key={branch} value={branch}>
                {branch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectLocationName} onValueChange={(value) => setLocationName(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {uniqueLocationNames.map((locationName) => (
              <SelectItem key={locationName} value={locationName}>
                {locationName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectLocationType} onValueChange={(value) => setLocationType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location Type" />
          </SelectTrigger>
          <SelectContent>
            {uniqueLocationTypes.map((locationType) => (
              <SelectItem key={locationType} value={locationType}>
                {locationType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectLastUpdated} onValueChange={(value) => setLastUpdated(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select Last Updated" />
          </SelectTrigger>
          <SelectContent>
            {uniqueLastUpdated.map((lastUpdated) => (
              <SelectItem key={lastUpdated} value={lastUpdated}>
                {lastUpdated}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters Button */}
        <Button variant="secondary" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filterData} />

      <div className="mt-5 flex justify-end">
        {/* Export CSV Button */}
        <CSVLink
          data={filterData}
          filename="location_data.csv"
          className="bg-ds-foreground text-white py-2 px-4 rounded-md"
        >
          Export CSV
        </CSVLink>
      </div>
    </Card>
  );
};

export default ViewLocationTable;




