"use client";

import { UseFormRegister, Control } from "react-hook-form";
import {
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

import { Input } from "@/components/ui/input";
import { ClientFormSchema } from "@/schemas/create-client";
import { useState } from "react";

interface BasicInfoProps {
  register: UseFormRegister<ClientFormSchema>;
  control: Control<ClientFormSchema>;
}

function ClientInfo({ control }: BasicInfoProps) {
  const [, setImageURL] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <p className="text-lg font-bold">Client info</p>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* first name */}
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">First Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* last name */}
        <FormField
          control={control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">lastname</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* image */}
        <FormField
          control={control}
          name="image"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Applicant&apos;s image
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                    setImageURL(file ? URL.createObjectURL(file) : null);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* gender */}
        <FormField
          control={control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">Gender</FormLabel>
              <Select value='' onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={field.value} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* contact */}
        <FormField
          control={control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">contact</FormLabel>
              <FormControl>
                <Input {...field} type="tel" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* email */}
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default ClientInfo;
