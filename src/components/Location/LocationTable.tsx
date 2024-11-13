"use client"

import * as React from "react";
import { Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormLabel,
  FormControl,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";


interface FormData {
  country: string;
  branch: string;
  locationName: string;
  latitude: string;
  longitude: string;
  wifiId?: string;
  bluetoothDeviceId: string;
  radius: number;
}

const LocationTable: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [radius, setRadius] = useState(0.02);

  const handleGenerateCoordinates = () => {
    setLoading(true);
    // Simulate coordinate generation with a timeout
    setTimeout(() => {
      setLoading(false);
      alert("Coordinates generated and filled in.");
    }, 2000);
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    // Perform any additional actions with the form data here
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-md space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-center">Create Location</h1>
      <p className="text-center text-gray-600">
        Set up a physical or virtual location for attendance verification.
      </p>
     
     
        <form onSubmit={handleSubmit((data: FormData) => console.log(data))}>
          {/* Form */}
          {/* Country Selector */}
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {/* Insert Country Options */}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>Select the country of the location.</FormDescription>
          </FormItem>

          {/* Branch Selector */}
          <FormItem>
            <FormLabel>Branch</FormLabel>
            <FormControl>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {/* Insert Branch Options */}
                </SelectContent>
              </Select>
            </FormControl>
          </FormItem>

          {/* Location Name */}
          <FormItem>
            <FormLabel>Location Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter location name" />
            </FormControl>
          </FormItem>

          {/* Latitude & Longitude */}
          <FormItem>
            <FormLabel>Latitude & Longitude</FormLabel>
            <div className="flex space-x-2">
              <FormControl>
                <Input placeholder="Latitude" />
              </FormControl>
              <FormControl>
                <Input placeholder="Longitude" />
              </FormControl>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-full mt-2"
              onClick={handleGenerateCoordinates}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Coordinates"}
            </Button>
            <FormDescription>
              Auto-fill latitude and longitude using the button.
            </FormDescription>
          </FormItem>

          {/* WiFi ID */}
          <FormItem>
            <FormLabel>WiFi ID (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter WiFi ID" />
            </FormControl>
            <FormDescription>
              Useful for verification when GPS is unreliable.
            </FormDescription>
          </FormItem>

          {/* Bluetooth Device ID */}
          <FormItem>
            <FormLabel>Bluetooth Device ID</FormLabel>
            <FormControl>
              <Input placeholder="Enter Bluetooth Device ID" />
            </FormControl>
            <FormDescription>
              Pair a device for location proximity verification.
            </FormDescription>
          </FormItem>

          {/* Radius */}
          <FormItem>
            <FormLabel>Radius (km)</FormLabel>
            <div className="flex items-center space-x-2">
              <FormControl>
                <Input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                />
              </FormControl>
              <input
                type="range"
                min="0.01"
                max="1.0"
                step="0.01"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <FormDescription>
              Adjust the allowed radius around the location.
            </FormDescription>
          </FormItem>

          {/* Map Placeholder */}
          <FormItem>
            <FormLabel>Map Location</FormLabel>
            <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              [Map will be displayed here]
            </div>
            <FormDescription>
              Adjust the location visually by moving the marker on the map.
            </FormDescription>
          </FormItem>

          {/* Save Location Button */}
          <Button className="w-full mt-4">Save Location</Button>
        </form>
      );

      {/* Notification Example */}
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mt-4" role="alert">
        Location created successfully! Notifications have been sent.
      </div>
    </div>
  );
};

export default LocationTable;