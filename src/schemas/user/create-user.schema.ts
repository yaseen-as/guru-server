import { z } from "zod";

const createUserBodySchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
  role: z.enum(["STUDENT", "MENTOR"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be either STUDENT or MENTOR",
  }),
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .trim()
    .min(1, "First name cannot be empty"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .trim()
    .min(1, "Last name cannot be empty"),

  phoneNumber: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .min(10, "minimum 10 numbers is required"),
  timezone: z.string({
    required_error: "Timezone is required",
    invalid_type_error: "Timezone must be a string",
  }),
});

export const createUserSchema = z.object({
  body: createUserBodySchema,
});

export type RequestUserDto = z.infer<typeof createUserBodySchema>;
