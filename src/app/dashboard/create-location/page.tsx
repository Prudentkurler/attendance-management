"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Form, FormField, FormLabel, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateLocationForm() {
  const methods = useForm();
  const [bulkUpload, setBulkUpload] = useState(false);

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Logic for parsing and handling CSV file
      console.log("Uploaded file:", file);
    }
  };

  const generateCoordinates = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          methods.setValue("latitude", latitude);
          methods.setValue("longitude", longitude);
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Unable to retrieve location. Please enable location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="space-y-0">
        <CardTitle>
          <h2>Create Location</h2>
        </CardTitle>
        <p className="text-center text-gray-600 mt-4">
          Set up a physical or virtual location for attendance verification.
        </p>
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <Form {...methods}>
            <div className="space-y-4">
              <Button  variant="default" onClick={() => setBulkUpload(!bulkUpload)}>
                {bulkUpload ? "Switch to Manual Entry" : "Bulk Upload"}
              </Button>

              {bulkUpload ? (
                <div>
                  <FormItem>
                    <FormLabel>Upload CSV Template</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={handleBulkUpload} />
                    </FormControl>
                  </FormItem>
                </div>
              ) : (
                <div className="space-y-4">
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select value="">
                      <SelectTrigger>
                        <span>Select a country</span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        {/* Add more options as needed */}
                      </SelectContent>
                    </Select>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input placeholder="Branch name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Location name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Latitude" type="number" {...methods.register("latitude")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input placeholder="Longitude" type="number" {...methods.register("longitude")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <Button type="button" onClick={generateCoordinates} className="bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark">
                    Auto Generate Latitude and Longitude
                  </Button>

                  <FormItem>
                    <FormLabel>WiFi ID</FormLabel>
                    <FormControl>
                      <Input placeholder="WiFi ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Bluetooth Device ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Bluetooth Device ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <FormItem>
                    <FormLabel>Radius</FormLabel>
                    <FormControl>
                      <Input placeholder="Radius in meters" type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <Button type="submit" className="bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark">
                    Create Location
                  </Button>
                </div>
              )}
            </div>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
