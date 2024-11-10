import { z } from "zod";

export const validationSchema = z.object({
  client: z.string(),
  service_type: z.string(),
  service_package: z.string(),
  unit_fee: z.number(),
  amount: z.number(),
  // unlimited_package: z.boolean(),
  total_credit_units: z.number(),
});

export type CustomCreditSchema = z.infer<typeof validationSchema>;

export const initialFormValues: CustomCreditSchema = {
  client: "",
  service_type: "",
  service_package: "",
  unit_fee: 0,
  amount: 0,
  // unlimited_package: false,
  total_credit_units: 0,
};
