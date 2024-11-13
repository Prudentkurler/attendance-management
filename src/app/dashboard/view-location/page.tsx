"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { sampleLocationData } from "@/components/Location/LocationData";
import { Button } from "@/components/ui/button";

// Define columns for DataTable
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
    header: "Wifi-Id",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "bluetoothDeviceId",
    header: "Bluetooth-Id",
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
    cell: (info) => (
      <div className="flex gap-2">
        <Button variant="secondary" size="sm">
          Edit
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    ),
  },
];

const Page = () => {
  const [selectCountry, setCountry] = useState('');
  const [selectedBranch, setBranch] = useState('');
  const [selectLocationName, setLocationName] = useState('');
  const [selectLocationType, setLocationType] = useState('');
  const [selectLastUpdated, setLastUpdated] = useState('');

  // Filter the data based on selected filters
  const filterData = sampleLocationData.filter((choice) => {
    const matchesCountry = selectCountry ? choice.country === selectCountry : true;
    const matchesBranch = selectedBranch ? choice.branch === selectedBranch : true;
    const matchesLocationType = selectLocationType ? choice.locationType === selectLocationType : true;
    const matchesLastUpdated = selectLastUpdated ? choice.lastUpdated === selectLastUpdated : true;
    const matchesLocationName = selectLocationName ? choice.locationName === selectLocationName : true;

    return matchesCountry && matchesBranch && matchesLocationType && matchesLastUpdated && matchesLocationName;
  });

  // Get unique values for dropdown options
  const uniqueCountries = Array.from(new Set(sampleLocationData.map((entry) => entry.country)));
  const uniqueBranches = Array.from(new Set(sampleLocationData.map((entry) => entry.branch)));
  const uniqueLocationTypes = Array.from(new Set(sampleLocationData.map((entry) => entry.locationType)));
  const uniqueLocationNames = Array.from(new Set(sampleLocationData.map((entry) => entry.locationName)));
  const uniqueLastUpdated = Array.from(new Set(sampleLocationData.map((entry) => entry.lastUpdated)));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Filter Controls */}
      <div className="mb-4 flex gap-4">
        <select value={selectCountry} onChange={(e) => setCountry(e.target.value)} className="px-2 py-1">
          <option value="">Select Country</option>
          {uniqueCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select value={selectedBranch} onChange={(e) => setBranch(e.target.value)} className="px-2 py-1">
          <option value="">Select Branch</option>
          {uniqueBranches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
        <select value={selectLocationName} onChange={(e) => setLocationName(e.target.value)} className="px-2 py-1">
          <option value="">Select Location</option>
          {uniqueLocationNames.map((locationName) => (
            <option key={locationName} value={locationName}>
              {locationName}
            </option>
          ))}
        </select>
        <select value={selectLocationType} onChange={(e) => setLocationType(e.target.value)} className="px-2 py-1">
          <option value="">Select Location Type</option>
          {uniqueLocationTypes.map((locationType) => (
            <option key={locationType} value={locationType}>
              {locationType}
            </option>
          ))}
        </select>
        <select value={selectLastUpdated} onChange={(e) => setLastUpdated(e.target.value)} className="px-2 py-1">
          <option value="">Select Last Updated</option>
          {uniqueLastUpdated.map((lastUpdated) => (
            <option key={lastUpdated} value={lastUpdated}>
              {lastUpdated}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filterData} />
    </div>
  );
};

export default Page;
