import * as z from "zod";
export const specialCharacters = /[!"#$%&'()*+,\-./:;`~<=>?@[\\\]^_]/;
const passwordBaseSchema = z.object({
  newPassword: z
    .string()
    .trim()
    .min(1, { message: "Please enter the new password." })
    .min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: "Please confirm the new password." }),
});

export const changePasswordSchema = passwordBaseSchema
  .extend({
    currentPassword: z
      .string()
      .trim()
      .min(1, { message: "Please enter the current password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message:
      "Passwords do not match. Please ensure both passwords are identical.",
  });

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(1, { message: "Please enter a new password." })
      .min(8, { message: "Password must be at least 8 characters long." }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your new password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The new password and confirm password fields do not match.",
  });

export const loginSchema = z.object({
  username: z
    .string()
    .email("Please enter a valid email address.")
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long."),
});

export const codeSchema = z.object({
  otp: z
    .string()
    .length(5, "Code must be 5 characters long")
    .regex(/^\d+$/, "Code must contain only numbers"),
});

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Please provide a valid email address"),
});

// Define the schema for form validation
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be no longer than 50 characters.")
      .refine(
        (value) => !value.startsWith(" "),
        "Name cannot start with a space",
      )
      .refine(
        (value) => /^[A-Za-z\s]+$/.test(value),
        "Please enter a valid name",
      ),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email(" Please enter a valid email address."),
    // phoneNumber: z
    //   .string()
    //   .min(1, "Phone number is required.")
    //   .regex(/^\d{10}$/, "Please enter a valid phone number."),
    phoneNumber: z
      .string()
      .trim()
      .min(1, { message: "Phone number is required" })
      .refine(
        (val) => /^\(\d{3}\) \d{3}-\d{4}$/.test(val),
        "Phone number must be at least 10 digits",
      ),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters long.")
      .refine((value) => !value.startsWith(" ")),
    confirmPassword: z.string().trim().min(1, "Confirm password is required."),
    is_terms: z
      .boolean()
      .refine(
        (val) => val === true,
        "Please accept Terms & Privacy Policy to continue",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match. Please try again.",
    path: ["confirmPassword"],
  });

// Define the schema for form validation
export const editProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .refine((value) => !value.startsWith(" "), "Name cannot start with a space")
    .refine(
      (value) => /^[A-Za-z\s]+$/.test(value),
      "Please enter a valid name",
    ),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please provide a valid email address"),
  phone: z
    .string()
    .min(2, "Phone number is required.")
    .regex(/^\d{10}$/, "Must be a valid phone number format"),
  avatar: z.string(),
});

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Please provide a valid email address"),
});

type MemberFields = Record<string, string | undefined>;
export const MemberSchema: z.ZodType<MemberFields> = z.object({}).extend(
  Object.fromEntries(
    Array.from({ length: 25 }, (_, i) => [
      `name_${i + 1}`,
      z.union([
        z.literal(""),
        z
          .string()
          .optional()
          .refine(
            (val) => !val || !val.startsWith(" "),
            "Name cannot start with space",
          )
          .refine(
            (val) => !val || /^[A-Za-z\s]+$/.test(val),
            "Please enter a valid name",
          ),
      ]),
    ]),
  ),
);

export const subscriptionSchema = z.object({
  payment_method: z.string(),
  stripe_token: z.string(),
  plan_uid: z.string(),
  members_data: z.array(z.object({ name: z.string() })),
  is_renew: z.boolean(),
});

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be no longer than 50 characters.")
      .refine(
        (value) => !value.startsWith(" "),
        "Name cannot start with a space",
      )
      .refine(
        (value) => /^[A-Za-z\s]+$/.test(value),
        "Please enter a valid name",
      ),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Please provide a valid email address"),
    phone: z
      .string()
      .min(1, { message: "Phone number is required" })
      .refine(
        (val) => /^\(\d{3}\) \d{3}-\d{4}$/.test(val),
        "Phone number must be at least 10 digits",
      ),
    role: z.enum(["Doctor", "Staff"]).optional(),
    speciality_uid: z.string().optional(),
    service_uid: z.string().optional(),
    service_category_uid: z.string().optional(),
    license: z.string().optional(),
    avatar: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "Doctor") {
      if (!data.speciality_uid || data.speciality_uid.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["speciality_uid"],
          message: "Please select a specialization",
        });
      }
      if (!data.service_uid || data.service_uid.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["service_uid"],
          message: "Please select a service category",
        });
      }
      // if (!data.service_category_uid) {
      //   ctx.addIssue({
      //     code: "custom",
      //     path: ["service_category_uid"],
      //     message: "Please select a service",
      //   });
      // }
      if (!data.license || data.license.trim() === "") {
        ctx.addIssue({
          code: "custom",
          path: ["license"],
          message: "License number is required",
        });
      }
      // else if (/\s/.test(data.license)) {
      //   ctx.addIssue({
      //     code: "custom",
      //     path: ["license"],
      //     message: "License number should not contain spaces",
      //   });
      // }
    }
  });
