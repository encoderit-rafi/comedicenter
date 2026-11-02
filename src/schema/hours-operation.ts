import * as z from "zod";
export const HoursOfOperationSchema = z.object({
  hours: z.array(
    z.object({
      day: z.string(),
      enabled: z.boolean(),
      openTime: z.string().optional(),
      closeTime: z.string().optional(),
    }),
  ),
});
