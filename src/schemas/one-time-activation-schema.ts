import { z } from "zod";

export const validationSchema = z.object({
  client_name: z.string(),
  membership_size: z.string(),
  service_modules: z.array(
    z.object({
      name: z.string(),
      ghs_fee: z.number(),
      usd_fee: z.number(),
      selected: z.boolean(),
    }),
  ),
  amount: z.object({
    usd: z.number().optional(),
    ghs: z.number().optional(),
  }),
  free_trial_duration: z.string(),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
});

export type OneTimeActivationSchema = z.infer<typeof validationSchema>;

export const defaulValues: OneTimeActivationSchema = {
  client_name: "",
  membership_size: "",
  service_modules: [
    { name: "Database Manager", ghs_fee: 0, usd_fee: 0, selected: false },
    { name: "Attendance Manager", ghs_fee: 0, usd_fee: 0, selected: false },
    { name: "Leave Manager", ghs_fee: 0, usd_fee: 0, selected: false },
    { name: "Postmaster", ghs_fee: 0, usd_fee: 0, selected: false },
  ],
  amount: { ghs: undefined, usd: undefined },
  free_trial_duration: "",
  start_date: undefined,
  end_date: undefined,
};
