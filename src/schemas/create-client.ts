import { z } from "zod";

export const validationSchema = z.object({
  // basic info
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Surname name is required"),
  image: z
    .custom<File>((file) => file instanceof File, {
      message: "Image is required",
    })
    .optional(),
  gender: z.string().min(1, "Gender is required"),
  email: z.string().email({ message: "Invalid email address" }),
  contact: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),

  // org info
  organization_name: z.string().min(1, "Organization name is required"),
  isOrganization_registered: z.string({
    required_error: "Please select if the organization is registered",
  }),
  account_category: z.string().min(1, "Account category is required"),
  membership_size: z.string().min(1, "Membership size is required"),
  organization_logo: z
    .custom<File>((file) => file instanceof File, {
      message: "Image is required",
    })
    .optional(),
  website: z.string().url("Invalid URL format").optional().or(z.literal("")),
  country: z.string({ required_error: "Country is required" }),
  region: z.string().optional(),
  district: z.string().optional(),
  constituency: z.string().optional(),
  community: z.string().optional(),

  //   contact persons
  contact_persons: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      contact: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
      email: z.string().email({ message: "Invalid email address" }),
    }),
  ),

  password: z.string().min(1, "Password"),
  confirm_password: z.string().min(1, "Password"),
});

export type ClientFormSchema = z.infer<typeof validationSchema>;

export const initialFormValues: ClientFormSchema = {
  // personal info
  first_name: "",
  last_name: "",
  image: undefined,
  gender: "",
  email: "",
  contact: "",

  //   orgaization section
  organization_name: "",
  isOrganization_registered: "",
  account_category: "",
  membership_size: "",
  organization_logo: undefined,
  website: "",
  country: "",
  region: "",
  district: "",
  constituency: "",
  community: "",

  //   contact persons
  contact_persons: [
    { name: "", contact: "", email: "" },
    { name: "", contact: "", email: "" },
    { name: "", contact: "", email: "" },
  ],

  password: "",
  confirm_password: "",
};
