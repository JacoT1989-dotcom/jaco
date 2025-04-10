import * as z from "zod";
import { UserRole } from "@prisma/client";

export const userRoles = Object.values(UserRole);

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username cannot exceed 50 characters"),
    email: z
      .string()
      .email("Please enter a valid email address")
      .max(100, "Email cannot exceed 100 characters"),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(100, "First name cannot exceed 100 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(100, "Last name cannot exceed 100 characters"),
    displayName: z
      .string()
      .min(1, "Display name is required")
      .max(100, "Display name cannot exceed 100 characters"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(255, "Password cannot exceed 255 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
    role: z.nativeEnum(UserRole),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
