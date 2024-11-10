"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Icons } from "@/components/common/Icons";

import AuthPageImg from "/public/auth-page-design.png";
import Link from "next/link";
import { loginSchema, LoginSchema } from "@/schemas/auth-schema";
import { Input } from "@/components/ui/input";
import LoadingIndicator from "@/components/common/loading-indicator";

export default function SuperAdminLogin() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  // useEffect(() => {
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //     }
  //   );
  // }, []);

  // const handleLogin = async (values) => {
  //   try {
  //     await firebase
  //       .auth()
  //       .setPersistence(firebase.auth.Auth.Persistence.SESSION);
  //     await firebase
  //       .auth()
  //       .signInWithEmailAndPassword(values.emailOrPhone, values.password);
  //     router.push("/dashboard");
  //   } catch (error) {
  //     setError("Invalid login credentials. Please try again.");
  //   }
  // };

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<LoginSchema> = (values) => {
    setIsLoading(true);

    setTimeout(() => {
      console.log(values);
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-20 border lg:flex-row">
      <div className="relative hidden h-[35rem] w-[35rem] md:block">
        <Image
          src={AuthPageImg}
          alt=""
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 50vw"
          className="object-contain"
          placeholder="blur"
        />
      </div>

      {isEmailSent ? (
        <EmailSent />
      ) : (
        <div className="space-y-4 px-8">
          <h2 className="text-centerv">Forgot your password?</h2>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-ds-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder=""
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-ds-primary px-8 py-2 text-background"
              >
                {isLoading ? <LoadingIndicator /> : "Log in"}
              </button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}

function EmailSent() {
  return (
    <div className="space-y-2">
      <span className="block">
        <Image src="/email-sent.png" alt="logo" width={60} height={50} />
      </span>

      <h2>Check your email!</h2>
      <p>We’ve sent you a link to reset your password</p>

      <button
        type="submit"
        className="w-full rounded-lg bg-ds-primary py-2 text-background hover:bg-ds-primary-dark"
      >
        Got it
      </button>
    </div>
  );
}
