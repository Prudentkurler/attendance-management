import { z } from "zod";

const rangePattern = /^\d+-\d+(,\s*\d+-\d+)*$/;
export const validationSchema = z.object({
  serviec_type: z.string(),
  service_package: z
    .string()
    .regex(rangePattern, "Invalid format. Use format: 1-100, 101-200, etc."),
});

export type ServicePackageSchema = z.infer<typeof validationSchema>;

export const initialFormValues: ServicePackageSchema = {
  serviec_type: "",
  service_package: "",
};
