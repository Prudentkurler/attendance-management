"use client";

import * as React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

// Define types for the form data
type LocationFormData = {
  locationName: string;
  country: string;
  branch: string;
  latitude: number;
  longitude: number;
  wifiID: string;
  bluetoothDeviceID: string;
  radius: number;
};

// Define columns for the DataTable
const columns = [
  {
    accessorKey: "locationName",
    header: "Location Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "branch",
    header: "Branch",
  },
  {
    accessorKey: "latitude",
    header: "Latitude",
  },
  {
    accessorKey: "longitude",
    header: "Longitude",
  },
  {
    accessorKey: "radius",
    header: "Radius (m)",
  },
  {
    accessorKey: "wifiID",
    header: "WiFi ID",
  },
  {
    accessorKey: "bluetoothDeviceID",
    header: "Bluetooth ID",
  },
];

// Mock data for DataTable
const data = [
  {
    locationName: "Headquarters",
    country: "USA",
    branch: "Main",
    latitude: 37.7749,
    longitude: -122.4194,
    radius: 100,
    wifiID: "HQ-WiFi",
    bluetoothDeviceID: "HQ-BT",
  },
  // More rows can be added here
];

export default function CreateLocationPage() {
  const form = useForm<LocationFormData>({
    defaultValues: {
      locationName: "",
      country: "",
      branch: "",
      latitude: 0,
      longitude: 0,
      wifiID: "",
      bluetoothDeviceID: "",
      radius: 50,
    },
  });

  const onSubmit = (data: LocationFormData) => {
    console.log("Location Data Submitted: ", data);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Form for Creating Location */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-2xl font-semibold">Create Location</h1>

          <FormItem>
            <FormLabel>Location Name</FormLabel>
            <FormControl>
              <Input {...form.register("locationName", { required: true })} placeholder="Enter location name" />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Select value={form.watch("country")} onValueChange={(value) => form.setValue("country", value)}>
                <SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    {/* Add more country options here */}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Branch</FormLabel>
            <FormControl>
              <Input {...form.register("branch")} placeholder="Enter branch name" />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Coordinates</FormLabel>
            <div className="flex gap-4">
              <FormControl>
                <Input type="number" {...form.register("latitude", { required: true })} placeholder="Latitude" />
              </FormControl>
              <FormControl>
                <Input type="number" {...form.register("longitude", { required: true })} placeholder="Longitude" />
              </FormControl>
            </div>
            <FormDescription>Click Generate Coordinates to autofill based on map location</FormDescription>
          </FormItem>

          <FormItem>
            <FormLabel>WiFi ID</FormLabel>
            <FormControl>
              <Input {...form.register("wifiID")} placeholder="Enter WiFi ID" />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Bluetooth Device ID</FormLabel>
            <FormControl>
              <Input {...form.register("bluetoothDeviceID")} placeholder="Enter Bluetooth ID" />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormItem>
            <FormLabel>Radius</FormLabel>
            <FormControl>
              <Input type="number" {...form.register("radius", { valueAsNumber: true })} placeholder="Enter radius in meters" />
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button type="submit" className="mt-4">
            Save Location
          </Button>
        </form>
      </Form>

      {/* Data Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Locations</h2>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
