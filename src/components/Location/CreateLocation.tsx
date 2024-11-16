"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ThirdPartyProviderSchema,
  validationSchema,
  initialFormValues,
} from "@/schemas/third-party-provider-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateLocation() {
  const form = useForm<ThirdPartyProviderSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit, setValue } = form;

  // Auto-generate latitude, longitude, and radius
  const autoGenerateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          setValue("radius", 0.02); // Default radius value, you can adjust this
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Failed to retrieve location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const onSubmit: SubmitHandler<ThirdPartyProviderSchema> = async (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
        {/* Country */}
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Ghana">Ghana</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Branch */}
        <FormField
          control={control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HQ">HQ</SelectItem>
                    <SelectItem value="West Branch">West Branch</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Name */}
        <FormField
          control={control}
          name="location_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter location name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Latitude */}
        <FormField
          control={control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter latitude" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Longitude */}
        <FormField
          control={control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter longitude" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Auto Generate Button */}
        <Button
          type="button"
          onClick={autoGenerateLocation}
          size="lg"
          className="bg-ds-primary text-ds-foreground"
        >
          Auto Generate
        </Button>

        {/* Radius */}
        <FormField
          control={control}
          name="radius"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Radius (km)</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Enter radius" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* WiFi ID (Optional) */}
        <FormField
          control={control}
          name="wifi_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WiFi ID (Optional)</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter WiFi ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bluetooth Device ID (Optional) */}
        <FormField
          control={control}
          name="bluetooth_device_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bluetooth Device ID (Optional)</FormLabel>
              <FormControl>
                <Input {...field} type="text" placeholder="Enter Bluetooth Device ID" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-lg bg-ds-primary px-8 py-2 text-ds-foreground hover:bg-ds-primary-dark"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}
