"use client";

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

// import firebase from "../firebase";
// import {
//   signInWithPopup,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
//   getAuth,
// } from "firebase/auth";
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

  // Firebase Google login`
  // const handleGoogleLogin = async () => {
  //   try {
  //     const auth = getAuth();
  //     const provider = new GoogleAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log("Google login successful:", user);

  //     // Redirect after successful login
  //     router.push("/dashboard");
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //     setError("Google login failed. Please try again.");
  //   }
  // };

  // Firebase Facebook login
  // const handleFacebookLogin = async () => {
  //   try {
  //     const auth = getAuth();
  //     const provider = new FacebookAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     console.log("Facebook login successful:", user);

  //     // Redirect after successful login
  //     router.push("/dashboard");
  //   } catch (error) {
  //     console.error("Facebook login error:", error);
  //     setError("Facebook login failed. Please try again.");
  //   }
  // };

  // useEffect(() => {
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //     }
  //   );
  // }, []);

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
    <section className="grid min-h-screen grid-rows-[1fr,_auto]">
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
        <div className="relative hidden h-[32rem] w-[35rem] md:block">
          <Image
            src={AuthPageImg}
            alt=""
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 50vw"
            className="object-contain"
            placeholder="blur"
          />
        </div>

        <div className="space-y-4">
          <span className="mx-auto block w-max">
            <Image src="/logo.png" alt="logo" width={110} height={10} />
          </span>

          <div className="space-y-4 px-8">
            <h1 className="text-center">Super admin login </h1>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* input fields */}
                <div className="space-y-2">
                  {/* email  */}
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ds-foreground">
                          Email
                        </FormLabel>
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

                  {/* password */}
                  <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-ds-foreground">
                          Password
                        </FormLabel>

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
                              onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                              }
                            >
                              {isPasswordVisible ? (
                                <Icons.EyeOff className="text-ds-gray" />
                              ) : (
                                <Icons.Eye className="text-ds-gray" />
                              )}

                              <span className="sr-only">
                                {isPasswordVisible
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

                {/* submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-ds-primary px-8 py-2 text-background"
                >
                  {isLoading ? <LoadingIndicator /> : "Log in"}
                </button>

                {/* separator */}
                <div className="flex items-center justify-between gap-4">
                  <span className="h-[2px] flex-1 bg-ds-primary" />
                  <span>OR</span>
                  <span className="h-[2px] flex-1 bg-ds-primary" />
                </div>

                {/* 3rd party login */}
                <div className="grid gap-4 lg:grid-cols-2 lg:flex-row">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-lg border px-2 py-[2px]"
                    // onClick={handleGoogleLogin}
                  >
                    <Image
                      src="/social-icons/google.png"
                      alt="logo"
                      width={40}
                      height={50}
                    />
                    <span className="">Login with Google</span>
                  </button>

                  <button className="flex items-center justify-center gap-2 rounded-lg border px-2 py-[2px]">
                    <Image
                      src="/social-icons/facebook.png"
                      alt="logo"
                      width={40}
                      height={40}
                      className=""
                    />
                    <span className="">Login with Facebook</span>
                  </button>
                </div>
              </form>
            </Form>

            <p className="flex items-center justify-center gap-2">
              <span>Don&apos;t have an account?</span>

              <Link href="" className="">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <footer className="py-2 text-center">
        <p className="">
          Powered by{" "}
          <Link href="#" className="font-bold underline hover:text-ds-primary">
            Akwaaba Solutions
          </Link>
        </p>

        <Link href="#" className="hover:text-ds-primary">
          Terms and conditions
        </Link>
      </footer>
    </section>
  );
}
