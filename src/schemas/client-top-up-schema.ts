import { z } from "zod";

export const validationSchema = z.object({
  client_type: z.string(),
  client: z.string(),
  service_type: z.string(),
  service_package: z.string(),
  unit_fee: z.number(),
  amount: z.number(),
  total_credit_units: z.number(),
});

export type ClientTopUpSchema = z.infer<typeof validationSchema>;

export const initialFormValues: ClientTopUpSchema = {
  client_type: "",
  client: "",
  service_type: "",
  service_package: "",
  unit_fee: 0,
  amount: 0,
  total_credit_units: 0,
};
