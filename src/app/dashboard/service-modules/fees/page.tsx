"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import {
  initialFormValues,
  ServiceModuleFeeSchema,
  validationSchema,
} from "@/schemas/service-module-fee-schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

function CreateServiceModuleFee() {
  const [usdValue, setUsdValue] = useState(0);

  const form = useForm<ServiceModuleFeeSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit, setValue, watch } = form;

  const onSubmit: SubmitHandler<ServiceModuleFeeSchema> = async (values) => {
    console.log(values);
  };

  const convertUsdToGhs = (usd: number) => {
    const conversionRate = 11.5;
    const ghsValue = usd * conversionRate;
    return ghsValue;
  };

  useEffect(() => {
    const ghsValue = convertUsdToGhs(usdValue);
    setValue("unit_fee.ghs", ghsValue);
  }, [usdValue, setValue]);

  const options = [
    { value: "jacob & co", label: "Jacob & co." },
    { value: "xyz ltd", label: "Xyz Ltd." },
    { value: "abc ventures", label: "Abc ventures" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4">
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

          {/* service module */}
          <FormField
            control={control}
            name="service_module"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Select service module
                </FormLabel>
                <Select value=''
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super admin">Leave manager</SelectItem>
                    <SelectItem value="agent admin">
                      Database manager
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* select membership size */}
          <FormField
            control={control}
            name="membership_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Select membership size
                </FormLabel>
                <Select value=''
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

          {/* unit fees */}
          <div className="grid gap-4 lg:grid-cols-2">
            <FormField
              control={control}
              name="unit_fee.usd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Enter unit fee (USD)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => {
                        const usd = parseFloat(e.target.value);
                        setUsdValue(usd);
                        field.onChange(usd);
                      }}
                      value={usdValue}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="unit_fee.ghs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Enter unit fee (GHS)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={watch("unit_fee.ghs")}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="block w-full rounded-lg bg-ds-primary px-8 py-2 text-background"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}

export default CreateServiceModuleFee;
