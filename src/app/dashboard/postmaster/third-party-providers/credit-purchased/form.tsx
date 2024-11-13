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

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreditPurchasedSchema,
  initialFormValues,
  validationSchema,
} from "@/schemas/credit-purchased-schema";
import { Input } from "@/components/ui/input";

export default function CreditPurchasedForm() {
  const form = useForm<CreditPurchasedSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<CreditPurchasedSchema> = async (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4">
        <div className="grid gap-4 lg:grid-cols-2">
          {/* date */}
          <FormField
            control={control}
            name="date"
            render={({ field }) => {
              const { onChange, value, ...restField } = field;
              return (
                <FormItem>
                  <FormLabel>Date</FormLabel>
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

          {/* provider name */}
          <FormField
            control={control}
            name="provider"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-ds-foreground">
                  Select provider
                </FormLabel>
                <Select value=''
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MTN GH">MTN</SelectItem>
                    <SelectItem value="Airtel Tigo">Airtel TIGO</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* service type (must be auto fill ) */}
          <FormField
            control={control}
            name="service_type"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Service type</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* credit amount */}
          <FormField
            control={control}
            name="credit_amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Credit amount</FormLabel>
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
              );
            }}
          />

          {/* total credit units*/}
          <FormField
            control={control}
            name="total_credit_units"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Total credit units</FormLabel>
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
              );
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-ds-primary px-8 py-2 text-ds-foreground lg:w-1/2"
        >
          Save
        </button>
      </form>
    </Form>
  );
}
