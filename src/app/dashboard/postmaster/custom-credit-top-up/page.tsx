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

import ReactSelect from "react-select";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CustomCreditSchema,
  validationSchema,
  initialFormValues,
} from "@/schemas/custom-credit-schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientCreditTopUpForm() {
  const form = useForm<CustomCreditSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit, watch, setValue } = form;

  // Watch for form changes
  const unitFee = watch("unit_fee");
  const servicePackage = watch("service_package");

  const [maxPackageValue, setMaxPackageValue] = useState<number | null>(null);

  // Update maxPackageValue based on selected service package
  useEffect(() => {
    if (servicePackage) {
      const packageRange = servicePackage.match(/\d+/g); // Extract numbers from service package
      if (packageRange) {
        const maxValue = Math.max(...packageRange.map(Number)); // Get highest value
        setMaxPackageValue(maxValue);
      }
    }
  }, [servicePackage]);

  // Automatically calculate total credit units
  useEffect(() => {
    if (unitFee && maxPackageValue) {
      const totalCreditUnits = unitFee / maxPackageValue;
      setValue("total_credit_units", totalCreditUnits);
    }
  }, [unitFee, maxPackageValue, setValue]);

  const onSubmit: SubmitHandler<CustomCreditSchema> = async (values) => {
    console.log(values);
  };

  const SERVICE_TYPES = [
    "All",
    "SMS",
    "SMSmail",
    "Email",
    "Voice Call",
    "WhatsApp",
    "Telegram",
  ];

  const OPTIONS = [
    { value: "jacob & co", label: "Jacob & co." },
    { value: "xyz ltd", label: "Xyz Ltd." },
    { value: "abc ventures", label: "Abc ventures" },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2>Custom Credit Top-Up</h2>

      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {/* select client */}
                <div className="space-y-2">
                  <label
                    htmlFor="client"
                    className="text-sm font-medium text-ds-foreground"
                  >
                    Select client
                  </label>

                  <Controller
                    control={control}
                    name="client"
                    render={({ field: { onChange } }) => (
                      <ReactSelect
                        id="client"
                        placeholder=""
                        options={OPTIONS}
                        onChange={(selectedOption) => {
                          onChange(
                            selectedOption ? selectedOption.label : null,
                          );
                        }}
                      />
                    )}
                  />
                </div>

                {/* service type */}
                <FormField
                  control={control}
                  name="service_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Select service type
                      </FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>

                        <SelectContent>
                          {SERVICE_TYPES.map((service, index) => {
                            return (
                              <SelectItem key={index} value={service}>
                                {service}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* service package */}
                <FormField
                  control={control}
                  name="service_package"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Select service package
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-99">1-99</SelectItem>
                          <SelectItem value="200-399">200-399</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* unit fee */}
                <FormField
                  control={control}
                  name="unit_fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Enter unit fee (GHS)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? parseFloat(e.target.value)
                                : undefined,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* total credit units */}
                <FormField
                  control={control}
                  name="total_credit_units"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Total credit units
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="number" readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg bg-ds-green px-8 py-2 text-background hover:bg-ds-green"
              >
                Credit account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
