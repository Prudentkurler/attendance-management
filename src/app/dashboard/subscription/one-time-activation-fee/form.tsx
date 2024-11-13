"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  OneTimeActivationSchema,
  defaulValues,
  validationSchema,
} from "@/schemas/one-time-activation-schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import ReactSelect from "react-select";

export default function SetActivationFeeForm() {
  const form = useForm<OneTimeActivationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: defaulValues,
  });

  const { control, handleSubmit, watch, setValue } = form;
  const serviceModules = watch("service_modules");

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
    const usdValue = ghsValue / 11.5;
    setValue(`service_modules.${index}.usd_fee`, usdValue);
  };

  const handleAmountChange = (ghsValue: number) => {
    const usdValue = ghsValue / 11.5;
    setValue(`amount.usd`, usdValue);
  };

  const onSubmit: SubmitHandler<OneTimeActivationSchema> = async (values) => {
    console.log(values);
  };

  const options = [
    { value: "jacob & co", label: "Jacob & co." },
    { value: "xyz ltd", label: "Xyz Ltd." },
    { value: "abc ventures", label: "Abc ventures" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
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
            name="client_name"
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

        {/* membership size */}
        <FormField
          control={control}
          name="membership_size"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-ds-foreground">
                Membership size
              </FormLabel>

              <Select value='' onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={field.value}
                    className="capitalize"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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

        {/* amount */}
        <div className="space-y-2">
          <p className="text-sm">Enter amount</p>

          <div className="grid gap-4 lg:grid-cols-2">
            <FormField
              control={control}
              name="amount.ghs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Amount (GHS)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter amount in GHS"
                      onChange={(e) => {
                        const ghsValue = parseFloat(e.target.value) || 0;
                        field.onChange(ghsValue);
                        handleAmountChange(ghsValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="amount.usd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Amount (USD)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-ds-primary px-8 py-2 text-ds-foreground hover:bg-ds-primary-dark"
        >
          Save
        </button>
      </form>
    </Form>
  );
}
