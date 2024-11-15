"use client";

import React, { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { Card } from "@/components/ui/card";

// Validation Schema
const registrationSchema = z.object({
  personalDetails: z.object({
    userType: z.enum(["Individual", "Organization"]),
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(1, "First name is required"),
    surname: z.string().min(1, "Surname is required"),
    gender: z.enum(["Male", "Female"]),
    dateOfBirth: z.string().optional(),
    disability: z.boolean(),
    disabilityType: z.string().optional(),
  }),
  contactDetails: z.object({
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().email("Enter a valid email").optional(),
    nationality: z.string().min(1, "Nationality is required"),
    residence: z.string().min(1, "Country of residence is required"),
    region: z.string().optional(),
    district: z.string().optional(),
    constituency: z.string().optional(),
    community: z.string().optional(),
  }),
  parentGuardianDetails: z.object({
    fatherName: z.string().optional(),
    fatherPhone: z.string().optional(),
    motherName: z.string().optional(),
    motherPhone: z.string().optional(),
  }),
  groupingInfo: z.object({
    country: z.string().min(1, "Country is required"),
    branch: z.string().min(1, "Branch is required"),
    category: z.string().min(1, "Category is required"),
    groups: z.array(z.string()).min(1, "At least one group is required"),
    subgroups: z.array(z.string()).optional(),
  }),
});

export default function UserRegistration() {
  const [bulkUploadData, setBulkUploadData] = useState<BulkUploadData[]>([]);
  const form = useForm<FieldValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      personalDetails: {
        userType: "Individual",
        title: "",
        firstName: "",
        surname: "",
        gender: "Male",
        disability: false,
      },
      contactDetails: {
        phone: "",
        nationality: "",
        residence: "",
      },
      parentGuardianDetails: {},
      groupingInfo: {
        country: "",
        branch: "",
        category: "",
        groups: [],
        subgroups: [],
      },
    },
  });

interface PersonalDetails {
    userType: "Individual" | "Organization";
    title: string;
    firstName: string;
    surname: string;
    gender: "Male" | "Female";
    dateOfBirth?: string;
    disability: boolean;
    disabilityType?: string;
}

interface ContactDetails {
    phone: string;
    email?: string;
    nationality: string;
    residence: string;
    region?: string;
    district?: string;
    constituency?: string;
    community?: string;
}

interface ParentGuardianDetails {
    fatherName?: string;
    fatherPhone?: string;
    motherName?: string;
    motherPhone?: string;
}

interface GroupingInfo {
    country: string;
    branch: string;
    category: string;
    groups: string[];
    subgroups?: string[];
}

interface RegistrationData {
    personalDetails: PersonalDetails;
    contactDetails: ContactDetails;
    parentGuardianDetails: ParentGuardianDetails;
    groupingInfo: GroupingInfo;
}

const onSubmit = (data: RegistrationData) => {
    const defaultPassword = data.contactDetails.phone;
    console.log("Registration Data:", { ...data, defaultPassword });
    alert(`Registration Successful! Default password: ${defaultPassword}`);
};

interface BulkUploadData {
    [key: string]: any;
}

const handleBulkUpload = (file: File) => {
    const reader = new FileReader();
    if (file.type.includes("csv")) {
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && typeof e.target.result === "string") {
                Papa.parse<BulkUploadData>(e.target.result, {
                    header: true,
                    complete: (results) => setBulkUploadData(results.data),
                });
            }
        };
    } else {
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && typeof e.target.result === "string") {
                const workbook = XLSX.read(e.target.result, { type: "binary" });
                const sheetName = workbook.SheetNames[0];
                const data: BulkUploadData[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                setBulkUploadData(data);
            }
        };
    }
    reader.readAsBinaryString(file);
};

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) form.reset(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(form.getValues()));
  }, [form.watch()]);

  return (
    <div className="max-w-4xl mx-auto p-6">
        <Card className="p-4">

      <h1 className="text-2xl font-bold mb-4">User Registration</h1>

      <Tabs defaultValue="personalDetails">
        <TabsList>
          <TabsTrigger value="personalDetails">Personal Details</TabsTrigger>
          <TabsTrigger value="contactDetails">Contact Details</TabsTrigger>
          <TabsTrigger value="parentGuardianDetails">Parent/Guardian Details</TabsTrigger>
          <TabsTrigger value="groupingInfo">Grouping Info</TabsTrigger>
          <TabsTrigger value="bulkUpload">Bulk Upload</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(()=>{onSubmit})}>
            {/* Personal Details */}
            <TabsContent value="personalDetails">
              <FormField
                control={form.control}
                name="personalDetails.title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Title" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="personalDetails.firstName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter First Name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalDetails.surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Surname" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="personalDetails.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalDetails.dateOfBirth"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="personalDetails.disability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disability</FormLabel>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="personalDetails.disabilityType"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Disability Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Disability Type" value={field.value || ""} />
                    </FormControl>
                  </FormItem>
                )}
                />
            </TabsContent>

            {/* Contact Details */}
            <TabsContent value="contactDetails">
              <FormField
                control={form.control}
                name="contactDetails.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Phone Number" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="contactDetails.email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Enter Email" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="contactDetails.nationality"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Nationality" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactDetails.residence"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Country of Residence</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Country of Residence" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="contactDetails.region"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Region" />
                      </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactDetails.district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter District" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="contactDetails.constituency"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Constituency</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Constituency" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="contactDetails.community"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Community</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Community" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>

            {/* Parent/Guardian Details */}
            <TabsContent value="parentGuardianDetails">
              <FormField
                control={form.control}
                name="parentGuardianDetails.fatherName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Father's Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Father's Name" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="parentGuardianDetails.fatherPhone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Father's Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Father's Phone Number" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="parentGuardianDetails.motherName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Mother's Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Mother's Name" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="parentGuardianDetails.motherPhone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Mother's Phone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Mother's Phone Number" />
                    </FormControl>
                  </FormItem>
                )}
                />
            </TabsContent>

            {/* Grouping Info */}
            <TabsContent value="groupingInfo">
              <FormField
                control={form.control}
                name="groupingInfo.country"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Country" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="groupingInfo.branch"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Branch" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="groupingInfo.category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Category" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupingInfo.groups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Groups</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Groups (comma-separated)" />
                    </FormControl>
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="groupingInfo.subgroups"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Subgroups</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Subgroups (comma-separated)" />
                    </FormControl>
                  </FormItem>
                )}
                />
            </TabsContent>

            {/* Bulk Upload */}
            <TabsContent value="bulkUpload">
              <div className="space-y-4">
                <FormLabel>Upload CSV or Excel File</FormLabel>
                <Input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                          handleBulkUpload(e.target.files[0]);
                        }
                  }}
                />
                {bulkUploadData.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold">Bulk Upload Data:</h3>
                    <pre>{JSON.stringify(bulkUploadData, null, 2)}</pre>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <Button type="submit" className="bg-ds-primary text-ds-foreground">Submit</Button>
            </div>
          </form>
        </Form>
      </Tabs>
                </Card>
    </div>
  );
}
