import * as z from "zod";
export const reviewSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(250, { message: "Description cannot be longer than 250 characters" }),
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Maximum rating is 5"),
});
