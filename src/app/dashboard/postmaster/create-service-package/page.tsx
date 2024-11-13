"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  initialFormValues,
  ServicePackageSchema,
  validationSchema,
} from "@/schemas/service-package-schema";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function CreateServicePackage() {
  const form = useForm<ServicePackageSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<ServicePackageSchema> = async (values) => {
    console.log(values);
  };

  return (
    <section className="mx-auto max-w-lg space-y-4">
      <h2>Create Service Package</h2>

      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-4">
              <div className="space-y-4">
                {/* service type */}
                <FormField
                  control={control}
                  name="serviec_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Select service type
                      </FormLabel>
                      <Select value=''
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
                        Enter service package (e.g. 1-100, 101-200)
                      </FormLabel>
                      <Input
                        type="text"
                        {...field}
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="1-100, 101-200, etc."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="block w-full rounded-lg bg-ds-primary px-8 py-2 text-ds-foreground hover:bg-ds-primary-dark"
              >
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}

export default CreateServicePackage;
