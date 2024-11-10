"use client";

import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

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

import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  initialFormValues,
  ServiceFeeSchema,
  validationSchema,
} from "@/schemas/postmaster-service-fee-schema";
import ReactSelect from "react-select";

function CreateServiceModuleFee() {
  const form = useForm<ServiceFeeSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit, setValue, watch } = form;

  // Watch for form changes
  const unitFee = watch("unit_fee");
  const servicePackage = watch("service_package");

  const CLIENT_TYPE = useWatch({ control, name: "client_type" });

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

  const onSubmit: SubmitHandler<ServiceFeeSchema> = (values) => {
    console.log(values);
  };

  const CLIENTS = [
    { value: "jacob & co", label: "Jacob & co." },
    { value: "xyz ltd", label: "Xyz Ltd." },
    { value: "abc ventures", label: "Abc ventures" },
  ];

  const AGENTS = [
    { value: "agent one", label: "Agent one" },
    { value: "agent two", label: "Agent two" },
    { value: "agent three", label: "Agent four" },
  ];

  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h2>Set Credit Fee</h2>

      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4">
              <div className="grid gap-4 lg:grid-cols-2">
                {/* client type */}
                <FormField
                  control={control}
                  name="client_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Client type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clients">Clients</SelectItem>
                          <SelectItem value="admin agent">
                            Admin agent{" "}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* the client list below will depend on the type of client selected above */}
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
                        options={CLIENT_TYPE === "clients" ? CLIENTS : AGENTS}
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
                  name="serviec_type"
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
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="smsmain">SMSMail</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="voice call">Voice Call</SelectItem>
                          <SelectItem value="whatsapp">Whatsapp</SelectItem>
                          <SelectItem value="telegram">Telegram</SelectItem>
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

                <Button
                  type="submit"
                  className="block w-full max-w-xs rounded-lg bg-ds-green px-8 py-2 text-background hover:bg-ds-green"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default CreateServiceModuleFee;
