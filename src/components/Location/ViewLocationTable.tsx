"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
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
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Location } from "./LocationData";

const EditForm = ({ initialData, onSave }: any) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <form>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
        <Input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="p-2 border rounded-md" />
        <Input name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" className="p-2 border rounded-md" />
        <Input name="locationName" value={formData.locationName} onChange={handleChange} placeholder="Location Name" className="p-2 border rounded-md" />
        <Input name="latitude" value={formData.latitude} onChange={handleChange} placeholder="Latitude" className="p-2 border rounded-md" />
        <Input name="longitude" value={formData.longitude} onChange={handleChange} placeholder="Longitude" className="p-2 border rounded-md" />
        <Input name="radius" value={formData.radius} onChange={handleChange} placeholder="Radius" className="p-2 border rounded-md" />
        <Input name="wifiId" value={formData.wifiId} onChange={handleChange} placeholder="Wifi ID" className="p-2 border rounded-md" />
        <Input name="bluetoothDeviceId" value={formData.bluetoothDeviceId} onChange={handleChange} placeholder="Bluetooth Device ID" className="p-2 border rounded-md" />
        <Button onClick={handleSave} variant='default' className="mt-4">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

const columns: ColumnDef<Location>[] = [
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
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              ...
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6 rounded-md bg-white shadow-md w-full max-w-md">
            <DialogTitle>Edit Location</DialogTitle>
            <EditForm initialData={row.original} onSave={handleEditSave} />
            <Button
              variant="destructive"
              size="sm"
              className="mt-4"
              onClick={() => handleDelete(row.original.id)}
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

const ViewLocationTable = () => {
  const [data, setData] = useState<Location[]>([]);
  const [selectCountry, setCountry] = useState('');
  const [selectedBranch, setBranch] = useState('');
  const [selectLocationName, setLocationName] = useState('');
  const [selectLocationType, setLocationType] = useState('');
  const [selectLastUpdated, setLastUpdated] = useState('');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('attendance-manager.akwaabahr.com/api/locations');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch locations. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditSave = async (updatedData: Location) => {
    try {
      await axios.put(`attendance-manager.akwaabahr.com/api/locations`, updatedData);
      fetchLocations();
      toast({
        title: "Success",
        description: "Location updated successfully",
      });
    } catch (error) {
      console.error('Error updating location:', error);
      toast({
        title: "Error",
        description: "Failed to update location. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`attendance-manager.akwaabahr.com/api/locations?id=${id}`);
      fetchLocations();
      toast({
        title: "Success",
        description: "Location deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting location:', error);
      toast({
        title: "Error",
        description: "Failed to delete location. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filterData = data.filter((choice) => {
    const matchesCountry = selectCountry ? choice.country === selectCountry : true;
    const matchesBranch = selectedBranch ? choice.branch === selectedBranch : true;
    const matchesLocationType = selectLocationType ? choice.locationType === selectLocationType : true;
    const matchesLastUpdated = selectLastUpdated ? choice.lastUpdated === selectLastUpdated : true;
    const matchesLocationName = selectLocationName ? choice.locationName === selectLocationName : true;

    return matchesCountry && matchesBranch && matchesLocationType && matchesLastUpdated && matchesLocationName;
  });

  const clearFilters = () => {
    setCountry('');
    setBranch('');
    setLocationName('');
    setLocationType('');
    setLastUpdated('');
  };

  const uniqueCountries = Array.from(new Set(data.map((entry) => entry.country)));
  const uniqueBranches = Array.from(new Set(data.map((entry) => entry.branch)));
  const uniqueLocationTypes = Array.from(new Set(data.map((entry) => entry.locationType)));
  const uniqueLocationNames = Array.from(new Set(data.map((entry) => entry.locationName)));
  const uniqueLastUpdated = Array.from(new Set(data.map((entry) => entry.lastUpdated)));

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Card className="mt-8 p-4 w-full">
      <Button size='lg' className="my-4 font-semibold" onClick={handleShowFilters}>
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>

      {showFilters && (
        <div className="mb-4 flex gap-4 w-full flex-row flex-wrap lg:flex-nowrap overflow-auto">
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

          <Button variant="secondary" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      <DataTable columns={columns} data={filterData} />

      <div className="mt-5 flex justify-end">
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

