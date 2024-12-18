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
import { useEffect, useState } from "react";
import axios from "axios";

interface CreateLocationProps {
  onLocationCreated: () => void;
}

export default function CreateLocation({ onLocationCreated }: CreateLocationProps) {
  const form = useForm<ThirdPartyProviderSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit, setValue } = form;

  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [accuracyLevel, setAccuracyLevel] = useState<string | null>(null);

  const determineAccuracyLevel = (accuracy: number) => {
    if (accuracy <= 10) return "High";
    if (accuracy <= 50) return "Average";
    return "Low";
  };

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          setValue("radius", 0.02);
          setAccuracy(accuracy);
          setAccuracyLevel(determineAccuracyLevel(accuracy));
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  }, [setValue]);

  const autoGenerateLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setValue("latitude", latitude);
          setValue("longitude", longitude);
          setValue("radius", 0.02);
          setAccuracy(accuracy);
          setAccuracyLevel(determineAccuracyLevel(accuracy));
        },
        (error) => console.error("Geolocation error:", error)
      );
    }
  };

  const onSubmit: SubmitHandler<ThirdPartyProviderSchema> = async (values) => {
    try {
      await axios.post('attendance-manager.akwaabahr.com/api/locations', values);
      onLocationCreated();
    } catch (error) {
      console.error('Error creating location:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
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

        {accuracy !== null && (
          <div className="text-sm text-gray-600">
            Accuracy: {accuracy} meters (
            <span
              className={`font-bold ${
                accuracyLevel === "Low"
                  ? "text-red-500"
                  : accuracyLevel === "Average"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {accuracyLevel}
            </span>
            )
          </div>
        )}

        <Button
          type="button"
          onClick={autoGenerateLocation}
          size="lg"
          className="bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark"
        >
          Auto Generate
        </Button>

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

