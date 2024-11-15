"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define Types for Form Fields
interface PersonalDetails {
  userType: "Individual" | "Organization";
  title: string;
  firstName: string;
  middleName?: string;
  surname: string;
  gender: "Male" | "Female";
  dateOfBirth?: string;
  disability: boolean;
  disabilityType?: string;
}

interface ContactDetails {
  phone: string;
  whatsapp?: string;
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
  subgroups: string[];
}

interface RegistrationFormData {
  personalDetails: PersonalDetails;
  contactDetails: ContactDetails;
  parentGuardianDetails?: ParentGuardianDetails;
  groupingInfo: GroupingInfo;
}

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
    whatsapp: z.string().optional(),
    email: z.string().email().optional(),
    nationality: z.string().min(1, "Nationality is required"),
    residence: z.string().min(1, "Country of residence is required"),
    region: z.string().optional(),
    district: z.string().optional(),
    constituency: z.string().optional(),
    community: z.string().optional(),
  }),
  parentGuardianDetails: z
    .object({
      fatherName: z.string().optional(),
      fatherPhone: z.string().optional(),
      motherName: z.string().optional(),
      motherPhone: z.string().optional(),
    })
    .optional(),
  groupingInfo: z.object({
    country: z.string().min(1, "Country is required"),
    branch: z.string().min(1, "Branch is required"),
    category: z.string().min(1, "Category is required"),
    groups: z.array(z.string()).min(1, "At least one group is required"),
    subgroups: z.array(z.string()).optional(),
  }),
});

export default function UserForm() {
  const [step, setStep] = useState(0);

  // React Hook Form Initialization
  const form = useForm<RegistrationFormData>({
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
      groupingInfo: {
        country: "",
        branch: "",
        category: "",
        groups: [],
        subgroups: [],
      },
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Submitted Data:", data);
    alert("Registration Successful! Welcome SMS/Email sent.");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Personal Details</h2>
              <FormField
                control={form.control}
                name="personalDetails.title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                       Title
                        <SelectValue placeholder="Select Title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mr.">Mr.</SelectItem>
                        <SelectItem value="Mrs.">Mrs.</SelectItem>
                        <SelectItem value="Dr.">Dr.</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <RadioGroupItem value="Male">Male</RadioGroupItem>
                        <RadioGroupItem value="Female">Female</RadioGroupItem>
                      </FormControl>
                    </RadioGroup>
                  </FormItem>
                )}
              />
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Contact Details</h2>
              <FormField
                control={form.control}
                name="contactDetails.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
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
                      <Input {...field} placeholder="Enter Email Address" />
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
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Parent/Guardian Information</h2>
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
                      <Input {...field} placeholder="Enter Father's Phone" />
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
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Grouping Information</h2>
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
            </div>
          )}
          <div className="flex justify-between mt-4">
            {step > 0 && (
              <Button onClick={() => setStep((prev) => prev - 1)}>Previous</Button>
            )}
            {step < 3 ? (
              <Button onClick={() => setStep((prev) => prev + 1)}>Next</Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}  