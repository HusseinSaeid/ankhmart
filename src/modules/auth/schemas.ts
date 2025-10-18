import z from "zod";
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  username: z
    .string()
    .min(3, "must be at least 3 characters")
    .max(63, "must be less than 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain lowercase letters, numbers, and hyphens (cannot start or end with a hyphen)"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphens '--'."
    )
    .transform((val) => val.toLowerCase()),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
