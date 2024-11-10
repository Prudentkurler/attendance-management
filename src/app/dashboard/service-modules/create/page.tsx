"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  initialFormValues,
  ServiceModuleSchema,
  validationSchema,
} from "@/schemas/service-module-schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ServiceModuleForm() {
  const form = useForm<ServiceModuleSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<ServiceModuleSchema> = async (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
        {/* module name */}
        <FormField
          control={control}
          name="module_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Enter service module
              </FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mx-auto block w-full max-w-xs rounded-lg bg-ds-primary px-8 py-2 text-background hover:bg-ds-primary-dark"
        >
          Save
        </Button>
      </form>
    </Form>
  );
}

export default ServiceModuleForm;
