import { z } from "zod";

export const validationSchema = z.object({
  client_type: z.string(),
  client: z.string(),
  serviec_type: z.string(),
  service_package: z.string(),
  unit_fee: z.number(),
  total_credit_units: z.number(),
});

export type ServiceFeeSchema = z.infer<typeof validationSchema>;

export const initialFormValues: ServiceFeeSchema = {
  client: "",
  client_type: "",
  serviec_type: "",
  service_package: "",
  unit_fee: 0,
  total_credit_units: 0,
};
