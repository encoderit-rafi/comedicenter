import * as z from "zod";
export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be no longer than 50 characters.")
    .refine((value) => !value.startsWith(" "), "Name cannot start with a space")
    .refine(
      (value) => /^[A-Za-z\s]+$/.test(value),
      "Please enter a valid name",
    ),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine(
      (val) => /^\(\d{3}\) \d{3}-\d{4}$/.test(val),
      "Phone number must be at least 10 digits",
    ),
  avatar: z.any().optional(),
});

export const addMemberSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters")
    .refine(
      (value) => /^[A-Za-z\s]+$/.test(value),
      "Please enter a valid name",
    ),
});
