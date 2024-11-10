import { z } from "zod";

export const validationSchema = z
  .object({
    // basic info
    first_name: z.string(),
    last_name: z.string(),
    image: z
      .custom<File>((file) => file instanceof File, {
        message: "Image is required",
      })
      .optional(),
    phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
    email: z.string().email({ message: "Invalid email address" }),
    country: z.string().min(1, ""),
    region: z.string().min(1, ""),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
    //   "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol",
    // ),

    password_confirmation: z
      .string()
      .min(8, "Password must be at least 8 characters long"),

    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type AdminProfileSchema = z.infer<typeof validationSchema>;

export const initialFormValues: AdminProfileSchema = {
  first_name: "xyz",
  last_name: "",
  image: undefined,
  phone: "",
  email: "",
  country: "",
  region: "",

  password: "",
  new_password: "",
  password_confirmation: "",
};
