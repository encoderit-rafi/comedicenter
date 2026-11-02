import * as z from "zod";
export const contactFormchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be no longer than 50 characters")
    .refine(
      (value) => /^[A-Za-z\s]+$/.test(value),
      "Please enter a valid name",
    ),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .refine(
      (val) => /^\(\d{3}\) \d{3}-\d{4}$/.test(val),
      "Phone must be at least 10 digits",
    ),
  specialization: z
    .string({ message: "Specialization is required" })
    .trim()
    .min(1, { message: "Specialization is required" })
    .max(100, {
      message: "Specialization cannot be longer than 100 characters",
    }),

  address: z
    .string({ message: "Address is required" })
    .trim()
    .min(1, { message: "Address is required" })
    .min(6, { message: "Address must be at least 6 characters long" })
    .max(200, { message: "Address cannot be longer than 200 characters" }),
  city: z
    .string({ message: "City is required" })
    .trim()
    .min(1, { message: "City is required" })
    .min(2, { message: "City must be at least 2 characters long" })
    .max(100, { message: "City cannot be longer than 100 characters" }),
  state_id: z
    .string({ message: "State is required" })
    .min(1, { message: "State is required" })
    .max(50, { message: "State cannot be longer than 50 characters" }),

  zip: z
    .string({ message: "Zip code is required" })
    .min(1, { message: "Zip code is required" })
    .min(5, { message: "Zip code must be at least 5 digits long" })
    .max(5, { message: "Zip code cannot be longer than 5 digits" })
    .regex(/^\d{5,5}$/, {
      message: "Zip code must be 5 digits",
    }),
  license: z
    .string()
    .trim()
    .max(20, { message: "License can't be longer than 20 characters" })
    .optional(),
});

export const supportSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(50, "Name must be no longer than 50 characters")
    .refine(
      (value) => /^[A-Za-z\s]+$/.test(value),
      "Please enter a valid name",
    ),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email("Please enter a valid email address"),
  message: z
    .string({ message: "Message is required" })
    .trim()
    .min(1, { message: "Message is required" })
    .max(500, { message: "Message cannot be longer than 500 characters" }),
});
