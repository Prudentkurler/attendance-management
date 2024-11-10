"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import {
  AdminProfileSchema,
  initialFormValues,
  validationSchema,
} from "@/schemas/profile-schema";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Profile() {
  const [, setImageURL] = useState<string | null>(null);

  const [registrationLink, setRegistrationLink] = useState("");

  const generateLink = (agentId: string) => {
    const link = `${window.location.origin}/client/register/${agentId}`;
    setRegistrationLink(link);
  };

  const form = useForm<AdminProfileSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: initialFormValues,
  });

  const { control } = form;

  const onSubmit: SubmitHandler<AdminProfileSchema> = async (values) => {
    console.log(values);
  };

  return (
    <section className="container space-y-6">
      <h2 className="text-center">Admin Profile</h2>

      {/* image and name */}
      <div className="flex flex-col items-center gap-3 bg-background">
        <div className="size-28 rounded-full bg-ds-gray" />

        <div className="space-y-1 text-center">
          <p className="text-lg font-bold leading-5">Collins williams</p>
          <p className="leading-5 text-ds-gray">Super admin</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mx-auto space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* personal info */}
              <div className="grid gap-4 rounded-md border p-4 lg:grid-cols-2">
                {/* last name */}
                <FormField
                  control={control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Last name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* image */}
                <FormField
                  control={control}
                  name="image"
                  render={({ field: { onChange } }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Image
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file);
                            setImageURL(
                              file ? URL.createObjectURL(file) : null,
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* phone */}
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* email */}
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* country */}
                <FormField
                  control={control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* region */}
                <FormField
                  control={control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-ds-foreground">
                        Region/Province
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark">
                  Update profile
                </Button>
              </div>

              {/* reset password */}
              <div className="space-y-4 rounded-md border p-4">
                <p className="text-lg font-bold text-ds-foreground">
                  Password reset
                </p>

                <div className="grid gap-4 lg:grid-cols-2">
                  {/* old password */}
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ds-foreground">
                          Old password
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* new password */}
                  <FormField
                    control={control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ds-foreground">
                          New password
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* new password */}
                  <FormField
                    control={control}
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ds-foreground">
                          Confirm new password
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button className="w-full bg-ds-primary text-ds-foreground hover:bg-ds-primary-dark lg:w-1/2">
                  Reset password
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>

      <Input
        value={registrationLink}
        readOnly
        placeholder="Generated link will appear here"
        className="max-w-lg bg-ds-gray"
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={() => generateLink("12345")}>Generate Link</Button>

        {registrationLink && (
          <Button
            onClick={() => navigator.clipboard.writeText(registrationLink)}
          >
            Copy to Clipboard
          </Button>
        )}
      </div>
    </section>
  );
}

export default Profile;
