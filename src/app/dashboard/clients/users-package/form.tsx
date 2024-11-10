"use client";

import { z } from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define a regex for valid range pattern, e.g. "1-100, 101-200"
const rangePattern = /^\d+-\d+(,\s*\d+-\d+)*$/;
const formSchema = z.object({
  packageSizeRanges: z
    .string()
    .regex(rangePattern, "Invalid format. Use format: 1-100, 101-200, etc."),
});

type AuthForm = z.infer<typeof formSchema>;

export default function NewPackageForm() {
  const form = useForm<AuthForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      packageSizeRanges: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<AuthForm> = async (values) => {
    console.log(values);
  };

  return (
    <Card className="max-w-md">
      <CardHeader className="space-y-0">
        <CardTitle className="text-base text-ds-foreground">
          Create package
        </CardTitle>
      </CardHeader>

      <CardContent className="px-0">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
            <FormField
              control={control}
              name="packageSizeRanges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-ds-foreground">
                    Enter package size range (e.g. 1-100, 101-200)
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

            <Button
              type="submit"
              className="w-full rounded-lg bg-ds-primary px-8 py-2 text-ds-foreground hover:bg-ds-primary-dark"
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
