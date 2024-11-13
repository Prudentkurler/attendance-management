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
  ThirdPartyProviderSchema,
  validationSchema,
  initialFormValues,
} from "@/schemas/third-party-provider-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateThirdPartyProviderForm() {
  const form = useForm<ThirdPartyProviderSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<ThirdPartyProviderSchema> = async (values) => {
    console.log(values);
  };

  const SERVICE_TYPES = [
    "SMS",
    "SMSmail",
    "Email",
    "Voice Call",
    "WhatsApp",
    "Telegram",
  ];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
        {/* provider name */}
        <FormField
          control={control}
          name="provider_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Provider name
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* service type */}
        <FormField
          control={control}
          name="service_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">Service type</FormLabel>
              <Select value='' onValueChange={field.onChange} defaultValue={field.value}>
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
