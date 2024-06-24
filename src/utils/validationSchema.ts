import { z } from "zod";

export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title must be a string",
    })
    .min(2, { message: "title must be at least 2 characters long" })
    .max(200, { message: "title must be less than 200 characters long" }),
  description: z.string().min(10),
});

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .min(2, { message: "username must be at least 2 characters long" })
    .max(200, { message: "username must be less than 200 characters long" }),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email("email must be a valid email"),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(8, { message: "password must be at least 8 characters long" })
    .max(20, { message: "password must be less than 200 characters long" }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email("email must be a valid email"),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(8, { message: "password must be at least 8 characters long" })
    .max(20, { message: "password must be less than 200 characters long" }),
});

export const createCommentSchema = z.object({
  articleId: z.number(),
  text: z.string().min(2).max(500),
});

export const updateUserSchema = z.object({
  username: z
    .string({
      required_error: "username is required",
      invalid_type_error: "username must be a string",
    })
    .min(2, { message: "username must be at least 2 characters long" })
    .max(200, { message: "username must be less than 200 characters long" })
    .optional(),
  email: z
    .string({
      required_error: "email is required",
      invalid_type_error: "email must be a string",
    })
    .email("email must be a valid email")
    .optional(),
  password: z
    .string({
      required_error: "password is required",
      invalid_type_error: "password must be a string",
    })
    .min(8, { message: "password must be at least 8 characters long" })
    .max(20, { message: "password must be less than 200 characters long" })
    .optional(),
});
