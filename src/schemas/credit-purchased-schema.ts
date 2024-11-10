import { z } from "zod";

export const validationSchema = z.object({
  date: z.date().optional(),
  provider: z.string(),
  service_type: z.string(),
  credit_amount: z.number(),
  total_credit_units: z.number(),
});

export type CreditPurchasedSchema = z.infer<typeof validationSchema>;

export const initialFormValues: CreditPurchasedSchema = {
  date: undefined,
  provider: "",
  service_type: "",
  credit_amount: 0,
  total_credit_units: 0,
};
