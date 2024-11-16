import { z } from "zod";

export const validationSchema = z.object({
  provider_name: z.string(),
  service_type: z.string(),
  country: z.string().nonempty("Country is required"),
  branch: z.string().nonempty("Branch is required"),
  location_name: z.string().nonempty("Location name is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  radius: z.number().optional(),
  wifi_id: z.string().optional(),
  bluetooth_device_id: z.string().optional(),
});

export type ThirdPartyProviderSchema = z.infer<typeof validationSchema>;

export const initialFormValues: ThirdPartyProviderSchema = {
  provider_name: "",
  service_type: "",
  country: "",
  branch: "",
  location_name: "",
  latitude: 0,
  longitude: 0,
  radius: 0.02,
  wifi_id: "",
  bluetooth_device_id: "",
};
