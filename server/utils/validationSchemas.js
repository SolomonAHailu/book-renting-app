const { z } = require("zod");

// Define allowed user types
const userTypeEnum = z.enum(["0", "1", "2"], {
  errorMap: () => ({ message: "Invalid user type." }),
});

// Define the phone number regex pattern
const phoneNumberRegex = /^(07|2517|\+2517|09|2519|\+2519)\d{8}$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const signupSchema = z
  .object({
    userType: userTypeEnum,
    email: z.string().email({ message: "Invalid email format." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(passwordRegex, {
        message:
          "Password must be alphanumeric and include at least one uppercase letter.",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Confirm password must be at least 8 characters long.",
      })
      .regex(passwordRegex, {
        message:
          "Confirm password must be alphanumeric and include at least one uppercase letter.",
      }),
    location: z.string().optional(),
    phoneNumber: z.string().regex(phoneNumberRegex, {
      message: "Phone number is not in a valid format.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // Indicate which field the error is related to
  });

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])(?=.*[a-zA-Z0-9]).*$/, {
      message:
        "Password must be alphanumeric and include at least one uppercase letter.",
    }),
});

const bookSchema = z.object({
  title: z.string().min(1, { message: "Title cannot be empty" }),
  bookImage: z.array(
    z.string().url({ message: "Each bookImage must be a valid URL" })
  ),
  price: z.number().positive({ message: "Price must be a positive number" }),
  description: z.string().optional(), // Description is optional
  category: z
    .array(z.string())
    .nonempty({ message: "Category cannot be an empty array" }),
});

module.exports = { signupSchema, loginSchema, bookSchema };

