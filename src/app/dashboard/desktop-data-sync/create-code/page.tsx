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

import {
  initialFormValues,
  DesktopSyncCodeSchema,
  validationSchema,
} from "@/schemas/desktop-data-sync-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import ReactSelect from "react-select";

function AccessSyncCodeForm() {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const form = useForm<DesktopSyncCodeSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const accessCode = form.watch("access_code");

  const { control, handleSubmit } = form;

  const generateAccessCode = () => {
    const randomCode = Math.random()
      .toString(36)
      .substring(2, 10)
      .toUpperCase();
    setCopySuccess(null);
    form.setValue("access_code", randomCode);

    navigator.clipboard.writeText(randomCode);
  };

  const copyAccessCode = async () => {
    try {
      await navigator.clipboard.writeText(accessCode || "");

      setCopySuccess("copied");
    } catch {
      setCopySuccess("Failed to copy access code.");
    }
  };

  const onSubmit: SubmitHandler<DesktopSyncCodeSchema> = async (values) => {
    console.log(values);
  };

  const options = [
    { value: "all", label: "All" },
    { value: "jacob & co", label: "Jacob & co." },
    { value: "xyz ltd", label: "Xyz Ltd." },
    { value: "abc ventures", label: "Abc ventures" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4">
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
                  options={options}
                  onChange={(selectedOption) => {
                    onChange(selectedOption ? selectedOption.label : null);
                  }}
                />
              )}
            />
          </div>

          {/* data sync module */}
          <FormField
            control={control}
            name="data_sync_module"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Assign data sync module
                </FormLabel>
                <Select value=''
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
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

          {/* monthly data storage fee */}
          <FormField
            control={control}
            name="monthly_data_storage_fee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Monthly data storage fee (GHS)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* outstanding data storage bill */}
          <FormField
            control={control}
            name="outstanding_data_storage_bill"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Outstanding data storage bill (GHS)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* date and time input if possible */}
          {/* start date */}
          <FormField
            control={control}
            name="last_data_storage_payment"
            render={({ field }) => {
              const { onChange, value, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Last data storage payment</FormLabel>
                  <FormControl>
                    <Input
                      {...restField}
                      type="date"
                      className=""
                      value={value ? value.toISOString().split("T")[0] : ""}
                      onChange={(e) =>
                        onChange(
                          e.target.value ? new Date(e.target.value) : undefined,
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

        {/* online sync */}
        <div className="space-y-1 rounded border p-4">
          <p className="text-sm font-bold">Online sync</p>
          <div className="grid gap-4 lg:grid-cols-2">
            {/* start date */}
            <FormField
              control={control}
              name="online_sync.start_date"
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
              name="online_sync.end_date"
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
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* payment status */}
          <FormField
            control={control}
            name="payment_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Payment status
                </FormLabel>
                <Select value=''
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-99">Paid</SelectItem>
                    <SelectItem value="200-399">Unpaid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* total bill */}
          <FormField
            control={control}
            name="total_bill"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Total bill (GHS)
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* access code  */}
          <FormField
            control={control}
            name="access_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Access Code"
                    readOnly
                    className="bg-ds-light-gray"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="">
          {/* Generate Access Code Button */}
          <button
            type="button"
            onClick={generateAccessCode}
            className="rounded bg-blue-500 px-4 py-[2px] text-white"
          >
            Generate access code
          </button>

          {/* Display the generated code */}
          {accessCode && (
            <div className="">
              <span>Generated access code: {accessCode}</span>
              <button
                type="button"
                onClick={copyAccessCode}
                className="ml-2 rounded bg-gray-300 px-2 py-1"
              >
                {copySuccess === "copied" ? "copied" : "copy"}
                {/* <Icons.Clipboard /> */}
              </button>
            </div>
          )}
        </div>

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

export default AccessSyncCodeForm;
