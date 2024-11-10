"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactSelect from "react-select";

import {
  initialFormValues,
  SubscriptionSchema,
  validationSchema,
} from "@/schemas/susbscription-schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getRecurringMultiplier } from "@/lib/utils";
import { addDays } from "date-fns";

function SubscriptionForm() {
  const [isCustomInputVisible, setIsCustomInputVisible] = useState(false);

  const form = useForm<SubscriptionSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit, watch, setValue } = form;
  const serviceModules = watch("service_modules");
  const subscriptionRecurringCycle = watch("subscription_recuring_cycle");
  const startDate = watch("start_date");

  const extractDaysFromCycle = (cycle: string) => {
    const match = cycle.match(/(\d+)/); // Extract the number part from the cycle
    return match ? parseInt(match[0], 10) : 0;
  };

  // Update end date based on start date and recurring cycle
  useEffect(() => {
    if (startDate && subscriptionRecurringCycle) {
      const daysToAdd = extractDaysFromCycle(subscriptionRecurringCycle);
      if (daysToAdd > 0) {
        const newEndDate = addDays(new Date(startDate), daysToAdd);
        setValue("end_date", newEndDate); // Autofill the end date
      }
    }
  }, [startDate, subscriptionRecurringCycle, setValue]);

  const handleCheckAll = (isChecked: boolean) => {
    form.setValue(
      "service_modules",
      serviceModules.map((module) => ({
        ...module,
        selected: isChecked,
      })),
    );
  };

  const handleGHSChange = (index: number, ghsValue: number) => {
    const usdValue = ghsValue / 15;
    setValue(`service_modules.${index}.usd_fee`, usdValue);
  };

  const onSubmit: SubmitHandler<SubscriptionSchema> = async (values) => {
    console.log(values);
  };

  // Get multiplier based on the recurring cycle
  const multiplier = getRecurringMultiplier(subscriptionRecurringCycle);

  const ghsSubtotal = serviceModules.reduce(
    (sum, module) => sum + (module.selected ? module.ghs_fee : 0),
    0,
  );
  const usdSubtotal = serviceModules.reduce(
    (sum, module) => sum + (module.selected ? module.usd_fee : 0),
    0,
  );

  // Calculate Grand Total by multiplying subtotal with the cycle multiplier
  const ghsGrandTotal = ghsSubtotal * multiplier;
  const usdGrandTotal = usdSubtotal * multiplier;

  const options = [
    { value: "jacob & co", label: "Jacob & co." },
    { value: "xyz ltd", label: "Xyz Ltd." },
    { value: "abc ventures", label: "Abc ventures" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
        <div className="space-y-4">
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
                  options={options}
                  onChange={(selectedOption) => {
                    onChange(selectedOption ? selectedOption.label : null);
                  }}
                />
              )}
            />
          </div>

          {/* select membership size */}
          <FormField
            control={control}
            name="membership_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Select membership size
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-99">50-99</SelectItem>
                    <SelectItem value="100-200">100-200</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* assign account type */}
          <FormField
            control={control}
            name="account_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Assign account type
                </FormLabel>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expiry" id="expiry" />
                    <Label htmlFor="expiry">Expiry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-expiry" id="non-expiry" />
                    <Label htmlFor="non-expiry">Non-expiry</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="self-host" id="self-host" />
                    <Label htmlFor="self-host">Self-host</Label>
                  </div>
                </RadioGroup>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* service modules */}
        <div className="space-y-3">
          <p className="text-sm">Service modules</p>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Checkbox
                onCheckedChange={(checked) => handleCheckAll(!!checked)}
              />
              <Label>Check All</Label>
            </div>

            <div className="flex flex-col gap-4 lg:gap-2">
              {serviceModules.map((module, index) => {
                return (
                  <div
                    key={module.name}
                    className="grid items-center gap-2 lg:grid-cols-2"
                  >
                    <div className="flex gap-2">
                      <Controller
                        name={`service_modules.${index}.selected`}
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) =>
                              field.onChange(!!checked)
                            }
                          />
                        )}
                      />
                      <Label>{module.name}</Label>
                    </div>

                    {/* GHS and USD FEES  */}
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1">
                        <Label>GHS</Label>
                        <Controller
                          name={`service_modules.${index}.ghs_fee`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="GHS"
                              // {...field}
                              value={field.value}
                              onChange={(e) => {
                                const ghsValue =
                                  parseFloat(e.target.value) || 0;
                                field.onChange(ghsValue);
                                handleGHSChange(index, ghsValue);
                              }}
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <Label>USD</Label>
                        <Controller
                          name={`service_modules.${index}.usd_fee`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="USD"
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Subtotals */}
        <div className="mt-4">
          <p className="font-semibold">Subtotal</p>

          <p className="text-sm leading-5">GHS: {ghsSubtotal.toFixed(2)}</p>
          <p className="text-sm leading-5">USD: {usdSubtotal.toFixed(2)}</p>
        </div>

        {/* recurring cycle */}
        <FormField
          control={control}
          name="subscription_recuring_cycle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Subscription recurring cycle
              </FormLabel>

              {!isCustomInputVisible && (
                <Select
                  onValueChange={(value) => {
                    if (value === "other") {
                      setIsCustomInputVisible(true);
                    }

                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="30 days">30 days</SelectItem>
                    <SelectItem value="90 days">90 days</SelectItem>
                    <SelectItem value="180 days">180 days</SelectItem>
                    <SelectItem value="356 days">365 days</SelectItem>
                    <SelectItem value="other">other</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {/* Custom Input Field for "Others" */}
              {isCustomInputVisible && (
                <div>
                  <p className="text-sm text-ds-foreground">
                    Enter custom cycle
                  </p>

                  <Input
                    placeholder="Specify custom cycle"
                    value={subscriptionRecurringCycle}
                    onChange={(e) => {
                      const value = e.target.value;
                      setValue("subscription_recuring_cycle", value);
                    }}
                  />
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        {/* start and end date(autofill) */}
        {subscriptionRecurringCycle && (
          <div className="grid gap-4 lg:grid-cols-2">
            {/* start date */}
            <FormField
              control={control}
              name="start_date"
              render={({ field }) => {
                const { onChange, value, ...restField } = field;
                return (
                  <FormItem>
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                      <Input
                        {...restField}
                        type="date"
                        className=""
                        value={value ? value.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                          onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* end date */}
            <FormField
              control={control}
              name="end_date"
              render={({ field }) => {
                const { onChange, value, ...restField } = field;
                return (
                  <FormItem>
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                      <Input
                        {...restField}
                        type="date"
                        className=""
                        value={value ? value.toISOString().split("T")[0] : ""}
                        onChange={(e) =>
                          onChange(
                            e.target.value
                              ? new Date(e.target.value)
                              : undefined,
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        )}

        {/* Grand Total */}
        <div className="mt-4">
          <p className="font-semibold">Grand Total</p>

          <p className="text-sm leading-5">
            GHS: {ghsGrandTotal.toFixed(2)} ({multiplier.toFixed(2)} months)
          </p>

          <p className="text-sm leading-5">
            USD: {usdGrandTotal.toFixed(2)} ({multiplier.toFixed(2)} months)
          </p>
        </div>

        {/* subit button */}
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

export default SubscriptionForm;
