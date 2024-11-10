import { z } from "zod";

export const validationSchema = z.object({
  client: z.string(),
  membership_size: z.string(),
  account_type: z.string(),
  service_modules: z.array(
    z.object({
      name: z.string(),
      ghs_fee: z.number(),
      usd_fee: z.number(),
      selected: z.boolean(),
    }),
  ),
  subscription_recuring_cycle: z.string(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  grand_toal_invoice: z.number(),
});

export type SubscriptionSchema = z.infer<typeof validationSchema>;

export const initialFormValues: SubscriptionSchema = {
  client: "",
  membership_size: "",
  account_type: "",
  service_modules: [
    { name: "Database Manager", ghs_fee: 0, usd_fee: 0, selected: false },
    { name: "Attendance Manager", ghs_fee: 0, usd_fee: 0, selected: false },
    { name: "Leave Manager", ghs_fee: 0, usd_fee: 0, selected: false },
    { name: "Postmaster", ghs_fee: 0, usd_fee: 0, selected: false },
  ],
  subscription_recuring_cycle: "",
  start_date: undefined,
  end_date: undefined,
  grand_toal_invoice: 0,
};
