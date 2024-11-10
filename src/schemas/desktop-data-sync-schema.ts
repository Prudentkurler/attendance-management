import { z } from "zod";

export const validationSchema = z.object({
  client: z.string(),
  data_sync_module: z.string(),
  monthly_data_storage_fee: z.number(),
  outstanding_data_storage_bill: z.number(),
  last_data_storage_payment: z.date().optional(),
  online_sync: z.object({
    start_date: z.date().optional(),
    end_date: z.date().optional(),
  }),
  total_bill: z.number(),
  payment_status: z.string(),
  access_code: z.string(),
});

export type DesktopSyncCodeSchema = z.infer<typeof validationSchema>;

export const initialFormValues: DesktopSyncCodeSchema = {
  client: "",
  data_sync_module: "",
  monthly_data_storage_fee: 0,
  outstanding_data_storage_bill: 0,
  last_data_storage_payment: undefined,
  online_sync: {
    start_date: undefined,
    end_date: undefined,
  },
  total_bill: 0,
  payment_status: "",
  access_code: "",
};
