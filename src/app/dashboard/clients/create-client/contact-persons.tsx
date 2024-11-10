"use client";

import { UseFormRegister, Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ClientFormSchema } from "@/schemas/create-client";

interface BasicInfoProps {
  register: UseFormRegister<ClientFormSchema>;
  control: Control<ClientFormSchema>;
  contactFields: Array<any>;
}

function ContactPersons({ control, contactFields }: BasicInfoProps) {
  return (
    <div className="space-y-2">
      <p className="text-lg font-bold">Contact persons</p>

      {contactFields.map((field, index) => {
        return (
          <div className="space-y-2" key={index + 1}>
            <p className="">Contact person {index + 1}</p>

            <div className="grid gap-4 lg:grid-cols-3" key={index}>
              {/*  name */}
              <FormField
                control={control}
                name={`contact_persons.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ds-foreground">Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* contact */}
              <FormField
                control={control}
                name={`contact_persons.${index}.contact`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ds-foreground">
                      Contact
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
                name={`contact_persons.${index}.email`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ds-foreground">Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactPersons;
