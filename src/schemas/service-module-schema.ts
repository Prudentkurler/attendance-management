import { z } from "zod";

export const validationSchema = z.object({
  module_name: z.string(),
});

export const initialFormValues = {
  module_name: "",
};

export type ServiceModuleSchema = z.infer<typeof validationSchema>;
