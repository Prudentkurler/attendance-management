"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import firebase from "../firebase";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Icons } from "@/components/common/Icons";

import AuthPageImg from "/public/auth-page-design.png";

export default function SuperAdminLogin() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // useEffect(() => {
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //     }
  //   );
  // }, []);

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),

    confirm_password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .oneOf([Yup.ref("password"), ""], "Passwords do not match")
      .required("Confirm password is required"),
  });

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

      <div className="max-w-lg space-y-8 p-8">
        <h1>Reset your password</h1>
        <div id="recaptcha-container"></div>
        <Formik
          initialValues={{ password: "", confirm_password: "" }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          // onSubmit={handleLogin}
          onSubmit={() => {}}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* new password */}
              <div className="mb-4 font-bold">
                <label htmlFor="password">New password</label>
                <div className="relative flex">
                  <div className="absolute left-[8px] top-[11px]">
                    <Icons.Lock className="size-5" />
                  </div>

                  <Field
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full rounded-lg border border-gray-300 px-8 py-2"
                    id="password"
                  />

                  <div className="absolute right-[10px] top-[12px]">
                    {isPasswordVisible ? (
                      <Icons.EyeOff
                        className="size-5 cursor-pointer"
                        onClick={() => setIsPasswordVisible(false)}
                      />
                    ) : (
                      <Icons.Eye
                        className="size-5 cursor-pointer"
                        onClick={() => setIsPasswordVisible(true)}
                      />
                    )}
                  </div>
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="font-normal text-red-500"
                />
              </div>

              {/*confirm password */}
              <div className="mb-4 font-bold">
                <label htmlFor="confirm_password">Confirm new password</label>
                <div className="relative flex">
                  <div className="absolute left-[8px] top-[11px]">
                    <Icons.Lock className="size-5" />
                  </div>

                  <Field
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm your password"
                    className="w-full rounded-lg border border-gray-300 px-8 py-2"
                    id="confirm_password"
                  />

                  <div className="absolute right-[10px] top-[12px]">
                    {isConfirmPasswordVisible ? (
                      <Icons.EyeOff
                        className="size-5 cursor-pointer"
                        onClick={() => setIsConfirmPasswordVisible(false)}
                      />
                    ) : (
                      <Icons.Eye
                        className="size-5 cursor-pointer"
                        onClick={() => setIsConfirmPasswordVisible(true)}
                      />
                    )}
                  </div>
                </div>

                <ErrorMessage
                  name="confirm_password"
                  component="p"
                  className="font-normal text-red-500"
                />
              </div>

              {error && (
                <p className="text-sm font-light text-red-500">{error}</p>
              )}

              {/* log in button */}
              <div className="mb-4 font-bold">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-orange-500 py-2 text-white"
                  disabled={isSubmitting}
                >
                  Save changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
