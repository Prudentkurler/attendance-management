import { z } from "zod";

export const validationSchema = z.object({
  provider_name: z.string(),
  service_type: z.string(),
});

export type ThirdPartyProviderSchema = z.infer<typeof validationSchema>;

export const initialFormValues: ThirdPartyProviderSchema = {
  provider_name: "",
  service_type: "",
};
