import { z } from "zod";

export const validationSchema = z
  .object({
    // basic info
    admin_type: z.string(),
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
    assigned_clients: z.string(),
    commission_fee: z.string(),

    // access role
    access_role_type: z.string(),
    page_access_role: z.string(),

    selected_menus: z.array(
      z.object({
        label: z.string(),
        edit: z.boolean().optional(),
        delete: z.boolean().optional(),
      }),
    ),

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
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export type AdminFormSchema = z.infer<typeof validationSchema>;

export const initialFormValues: AdminFormSchema = {
  // basic info
  admin_type: "",
  first_name: "xyz",
  last_name: "",
  image: undefined,
  phone: "",
  email: "",
  country: "",
  region: "",
  assigned_clients: "",
  commission_fee: "",

  // access role
  access_role_type: "",
  page_access_role: "",

  selected_menus: [],

  password: "",
  password_confirmation: "",
};
