"use client";

import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";

const bulkRegistrationSchema = z.object({
  country: z.string().min(1, "Country is required"),
  branch: z.string().min(1, "Branch is required"),
  userType: z.enum(["Individual", "Organization"]),
  file: z
    .any()
    .refine((file) => file?.[0], "File is required")
    .refine(
      (file) =>
        file?.[0]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file?.[0]?.type === "application/vnd.ms-excel",
      "Invalid file type. Only Excel files are allowed"
    ),
});

export default function BulkRegistration() {
  const form = useForm<FieldValues>({
    resolver: zodResolver(bulkRegistrationSchema),
    defaultValues: {
      country: "",
      branch: "",
      userType: "Individual",
      file: null,
    },
  });

  const onSubmit = (data: FieldValues) => {
    console.log("Bulk Registration Data:", data);
  };

  const downloadTemplate = () => {
    // Logic for downloading the template
    console.log("Download Excel Template");
  };

  return (
    <div className="w-full mx-auto p-6">
      <Card className="p-4 py-6">

        <div className="w-full flex justify-between items-center">
          <h1 className="md:text-2xl text-lg font-bold mb-4">Bulk Registration</h1>
          
              {/* Download Template Button */}
              <div>
                <Button
                  type="button"
                  variant="default"
                  onClick={downloadTemplate}
                  className="w-full bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark font-bold"
                >
                  Download Excel Template
                </Button>
              </div>

        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Select Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="USA">USA</SelectItem>
                        <SelectItem value="UK">UK</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Select Branch */}
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter branch" />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Select User Type */}
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select User Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>
                        <SelectItem value="Organization">Organization</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* File Upload */}
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Excel File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />


            {/* Submit Button */}
            <Button
              type="submit"
              variant='default'
              className="w-full bg-ds-primary hover:bg-ds-primary-dark font-bold text-ds-foreground"
            >
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
