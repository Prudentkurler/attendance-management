"use client";

import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "../ui/label";

const registrationSchema = z.object({
  personalDetails: z.object({
    userType: z.enum(["Individual", "Organization"]),
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    surname: z.string().min(1, "Surname is required"),
    gender: z.enum(["Male", "Female"]),
    dateOfBirth: z.string().optional(),
    disability: z.boolean(),
    disabilityType: z.string().optional(),
  }),
  contactDetails: z.object({
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    whatsapp: z.string().optional(),
    email: z.string().email("Enter a valid email").optional(),
    nationality: z.string().min(1, "Country of nationality is required"),
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
  const [currentStep, setCurrentStep] = useState(0);
  const form = useForm<FieldValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      personalDetails: {
        userType: "Individual",
        title: "",
        firstName: "",
        middleName: "",
        surname: "",
        gender: "Male",
        disability: false,
        disabilityType: "",
        organizationName: "",
        organizationLogo: "",
      },
      contactDetails: {
        phone: "",
        whatsapp: "",
        email: "",
        nationality: "",
        residence: "",
        region: "",
        district: "",
        constituency: "",
        community: "",
      },
      parentGuardianDetails: {
        fatherName: "",
        fatherPhone: "",
        motherName: "",
        motherPhone: "",
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

  const sections = [
    { name: "Personal Details", content: PersonalDetailsSection },
    { name: "Contact Details", content: ContactDetailsSection },
    { name: "Parent/Guardian Details", content: ParentGuardianDetailsSection },
    { name: "Grouping Info", content: GroupingInfoSection },
  ];

  const handleNext = () => {
    if (currentStep < sections.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data: FieldValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="w-full mx-auto p-6">
      <Card className="p-4 py-6">
        <h1 className="text-2xl font-bold mb-4">User Registration</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {React.createElement(sections[currentStep].content, { form })}
            <div className="mt-4 flex justify-between">
              <Button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              {currentStep < sections.length - 1 ? (
                <Button type="button" className="bg-ds-primary font-bold hover:bg-ds-primary-dark text-ds-foreground" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="bg-ds-primary font-bold
                 hover:bg-ds-primary-dark text-ds-foreground">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}

function PersonalDetailsSection({ form }: { form: any }) {
  const [showOrganizationFields, setShowOrganizationFields] = useState(false);

  const handleUserTypeChange = (userType: string) => {
    form.setValue("personalDetails.userType", userType);
    setShowOrganizationFields(userType === "Organization");
  };
  return (
    <div>
      <FormField
        control={form.control}
        name="personalDetails.userType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Type</FormLabel>
            <FormControl>
              <Select onValueChange={handleUserTypeChange}>
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

{showOrganizationFields && (
        <>
          <FormField
            control={form.control}
            name="personalDetails.organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter organization name" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalDetails.organizationLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Logo</FormLabel>
                <FormControl>
                  <Input type="image" {...field} placeholder="Upload organization logo" />
                </FormControl>
              </FormItem>
            )}
          />
        </>
      )}
      {/* Other personal details fields */}
    </div>
  );
}

// Similarly, ensure all fields in each section are implemented.
function ContactDetailsSection({ form }: { form: any }) {
    return (
      <div>
        <h4 className="text-ds-primary-dark mb-4 text-center">Personal Information</h4>
        <FormField
          control={form.control}
          name="contactDetails.FirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload image</FormLabel>
              <FormControl>
                <Input type="image" {...field} placeholder="Enter FirstName" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactDetails.FirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FirstName</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter FirstName" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactDetails.MiddleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MiddleName</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter MiddleName" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactDetails.LastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LastName</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter LastName" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactDetails.DateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Of Birth</FormLabel>
              <FormControl>
                <Input {...field} type="date"  />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
  control={form.control}
  name="contactDetails.gender"
  render={({ field }) => (
    <FormItem className="mb-4">
      <FormLabel>Gender</FormLabel>
      <FormControl>
        <div className="flex gap-4 mb-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="male" 
              checked={field.value === "male"} 
              onCheckedChange={() => field.onChange("male")} 
            />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="female" 
              checked={field.value === "female"} 
              onCheckedChange={() => field.onChange("female")} 
            />
            <Label htmlFor="female">Female</Label>
          </div>
        </div>
      </FormControl>
    </FormItem>
  )}
/>

        <FormField
          control={form.control}
          name="contactDetails.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter phone number" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactDetails.whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter WhatsApp number" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactDetails.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter email address" />
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
                <Input {...field} placeholder="Enter nationality" />
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
                <Input {...field} placeholder="Enter country of residence" />
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
                <Input {...field} placeholder="Enter region" />
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
                <Input {...field} placeholder="Enter district" />
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
                <Input {...field} placeholder="Enter constituency" />
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
                <Input {...field} placeholder="Enter community" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactDetails.disability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disability</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Do you have any disability?" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    );
  }
  
  function GroupingInfoSection({ form }: { form: any }) {
    return (
      <div>
        <h4 className="text-ds-primary-dark mb-4 text-center"> Grouping Section</h4>
        <FormField
          control={form.control}
          name="groupingInfo.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter country" />
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
                <Input {...field} placeholder="Enter branch" />
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
                <Input {...field} placeholder="Enter category" />
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
                <Input
                  {...field}
                  placeholder="Enter groups (comma-separated for multiple)"
                />
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
                <Input
                  {...field}
                  placeholder="Enter subgroups (comma-separated for multiple)"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    );
  }

  
  function ParentGuardianDetailsSection({ form }: { form: any }) {
    return (
      <div>
        <h4 className="text-ds-primary-dark mb-4 text-center">Parent/Guardian Information</h4>
        <FormField
          control={form.control}
          name="parentGuardianDetails.fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter father's name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentGuardianDetails.fatherPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father's Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter father's phone number" />
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
                <Input {...field} placeholder="Enter mother's name" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentGuardianDetails.motherPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother's Phone Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter mother's phone number" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    );
  }
  