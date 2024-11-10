"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Icons } from "@/components/common/Icons";
import { TFormProps } from "./page";

function CreatePassword({ control }: TFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  return (
    <div className="space-y-2">
      <p className="text-lg font-bold">Create password</p>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* password */}
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className="w-full pl-4 pr-[40px] text-base text-ds-foreground"
                    type={isPasswordVisible ? "text" : "password"}
                  />

                  <button
                    type="button"
                    className="absolute right-[8px] top-[8px] block"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <Icons.EyeOff className="text-ds-gray" />
                    ) : (
                      <Icons.Eye className="text-ds-gray" />
                    )}

                    <span className="sr-only">
                      {isPasswordVisible ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* confirm password */}
        <FormField
          control={control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-ds-foreground">
                Confirm password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className="w-full pl-4 pr-[40px] text-base text-ds-foreground"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                  />

                  <button
                    type="button"
                    className="absolute right-[8px] top-[8px] block"
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <Icons.EyeOff className="text-ds-gray" />
                    ) : (
                      <Icons.Eye className="text-ds-gray" />
                    )}

                    <span className="sr-only">
                      {isConfirmPasswordVisible
                        ? "Hide password"
                        : "Show password"}
                    </span>
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default CreatePassword;
