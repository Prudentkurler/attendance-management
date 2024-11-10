import { z } from "zod";

export const validationSchema = z.object({
  client: z.string(),
  service_module: z.string(),
  membership_size: z.string(),
  unit_fee: z.object({
    usd: z.number(),
    ghs: z.number(),
  }),
});

export type ServiceModuleFeeSchema = z.infer<typeof validationSchema>;

export const initialFormValues: ServiceModuleFeeSchema = {
  client: "",
  service_module: "",
  membership_size: "",
  unit_fee: {
    usd: 0,
    ghs: 0,
  },
};
