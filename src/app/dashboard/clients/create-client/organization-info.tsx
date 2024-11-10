"use client";

import { UseFormRegister, Control, Controller } from "react-hook-form";
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

import Image from "next/image";

import ReactSelect from "react-select";

import { Input } from "@/components/ui/input";
import { ClientFormSchema } from "@/schemas/create-client";
import { useState } from "react";
import { useGetCountries } from "@/hooks/api/useFetchCountries";

interface BasicInfoProps {
  register: UseFormRegister<ClientFormSchema>;
  control: Control<ClientFormSchema>;
}

const BasicInfo = ({ control }: BasicInfoProps) => {
  const [, setOrganizationLogo] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { data: countries } = useGetCountries();
  const countryOptions = countries?.map((country: any) => ({
    label: country.name.common,
    value: country.cca2,
    flag: country.flags.svg || country.flags.png,
  }));

  return (
    <div className="space-y-2">
      <p className="text-lg font-bold">Organization info</p>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* org name */}
        <FormField
          control={control}
          name="organization_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Organization name
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* is org registered */}
        <FormField
          control={control}
          name="isOrganization_registered"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-ds-foreground">
                Is organization registered
              </FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={field.value}
                    className="capitalize"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* account category */}
        <FormField
          control={control}
          name="account_category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Account category
              </FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={field.value}
                    className="capitalize"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="religious">Religious</SelectItem>
                  <SelectItem value="non-profit">Non profit</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* membership size */}
        <FormField
          control={control}
          name="membership_size"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Select Membership / users size
              </FormLabel>
              <Select onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder={field.value} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                  <SelectItem value="300">300</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* org logo */}
        <FormField
          control={control}
          name="organization_logo"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Organization logo
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file);
                    setOrganizationLogo(
                      file ? URL.createObjectURL(file) : null,
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* website */}
        <FormField
          control={control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Website if any
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* country */}
        <div className="space-y-2">
          <p className="font-medium text-ds-foreground">Select country</p>
          <Controller
            control={control}
            name="country"
            render={({ field: { onChange, value } }) => (
              <ReactSelect
                options={countryOptions}
                onChange={(selectedOption) => {
                  setSelectedCountry(selectedOption && selectedOption.label);
                  onChange(selectedOption ? selectedOption.label : null);
                }}
                value={countryOptions?.find(
                  (option: { label: string; flag: string }) =>
                    option.label === value,
                )}
                formatOptionLabel={(option: {
                  label: string;
                  flag: string;
                }) => (
                  <div className="flex items-center gap-2">
                    <Image
                      src={option.flag}
                      alt={option.label}
                      width={30}
                      height={20}
                      className=""
                    />
                    <p>{option.label}</p>
                  </div>
                )}
              />
            )}
          />
        </div>

        {selectedCountry === "Ghana" && (
          <div>
            {/* region */}
            <FormField
              control={control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">Region</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* district */}
            <FormField
              control={control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">District</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* constituency */}
            <FormField
              control={control}
              name="constituency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Constituency
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* community */}
            <FormField
              control={control}
              name="community"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Community
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
