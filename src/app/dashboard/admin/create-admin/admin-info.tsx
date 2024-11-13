"use client";

import { useWatch } from "react-hook-form";
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
import { useState } from "react";
import React from "react";
import { TFormProps } from "./page";

function AdminInfo({ control, setValue }: TFormProps) {
  const [, setImageURL] = useState<string | null>(null);
  const adminType = useWatch({ control, name: "admin_type" });

  const handleAdminTypeChange = (newAdminType: string) => {
    if (newAdminType !== adminType) {
      setValue("page_access_role", "");
      setValue("selected_menus", []);
    }
    // Update the admin_type
    setValue("admin_type", newAdminType);
  };

  return (
    <div className="space-y-2">
      <p className="text-lg font-bold">Admin info</p>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* admin type */}
        <FormField
          control={control}
          name="admin_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">Admin type</FormLabel>
              <Select value=''
                onValueChange={(value: string) => {
                  field.onChange(value);
                  handleAdminTypeChange(value);
                }}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.value} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super admin">Super admin</SelectItem>
                  <SelectItem value="agent admin">Agent admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* assign client / (adminType and commission fee)  */}
        {adminType === "super admin" ? (
          <FormField
            control={control}
            name="assigned_clients"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Assign client
                </FormLabel>

                <Select value=''
                  onValueChange={field.onChange}
                  defaultValue={field.value[0]}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="client one">All</SelectItem>
                    <SelectItem value="client one">Client one</SelectItem>
                    <SelectItem value="client two">Client two</SelectItem>
                    <SelectItem value="client three">Client three</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
            {/* admin type */}
            <FormField
              control={control}
              name="admin_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Commission type
                  </FormLabel>
                  <Select value=''
                    onValueChange={(value: string) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time setup">
                        One-Time setup
                      </SelectItem>
                      <SelectItem value="subscriptions">
                        Subscriptions
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* commission_fee */}
            <FormField
              control={control}
              name="commission_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Commission fee (%)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {/* first name */}
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">First name</FormLabel>
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
              <FormLabel className="text-ds-foreground">Last name</FormLabel>
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
              <FormLabel className="text-ds-foreground">Image</FormLabel>
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

        {/* phone */}
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">Phone</FormLabel>
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

        {/* country */}
        <FormField
          control={control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">Country</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* region */}
        <FormField
          control={control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Region/Province
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default AdminInfo;
