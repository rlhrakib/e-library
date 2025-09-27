import z from "zod";

export const createBookZodSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(200, { message: "Title cannot exceed 200 characters." }),

  author: z
    .string({ invalid_type_error: "Author must be string" })
    .min(2, { message: "Author name must be at least 2 characters long." })
    .max(100, { message: "Author name cannot exceed 100 characters." }),

  category: z
    .string({ invalid_type_error: "Category must be string" })
    .min(2, { message: "Category must be at least 2 characters long." })
    .max(50, { message: "Category cannot exceed 50 characters." }),

  publishedYear: z
    .number({ invalid_type_error: "Published year must be a number" })
    .int({ message: "Published year must be an integer" })
    .min(1500, { message: "Published year must be later than 1500" })
    .max(new Date().getFullYear(), {
      message: "Published year cannot be in the future",
    }),

  copiesAvailable: z
    .number({ invalid_type_error: "Copies available must be a number" })
    .int({ message: "Copies must be an integer" })
    .min(0, { message: "Copies cannot be negative" }),

  imageURL: z
    .string({ invalid_type_error: "Image URL must be string" })
    .url({ message: "Invalid image URL format" }),

  description: z
    .string({ invalid_type_error: "Description must be string" })
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(1000, { message: "Description cannot exceed 1000 characters." })
    .optional(), // ✅ optional
});

export const updateBookZodSchema = z.object({
  title: z
    .string({ invalid_type_error: "Title must be string" })
    .min(2, { message: "Title must be at least 2 characters long." })
    .max(200, { message: "Title cannot exceed 200 characters." })
    .optional(),

  author: z
    .string({ invalid_type_error: "Author must be string" })
    .min(2, { message: "Author name must be at least 2 characters long." })
    .max(100, { message: "Author name cannot exceed 100 characters." })
    .optional(),

  category: z
    .string({ invalid_type_error: "Category must be string" })
    .min(2, { message: "Category must be at least 2 characters long." })
    .max(50, { message: "Category cannot exceed 50 characters." })
    .optional(),

  publishedYear: z
    .number({ invalid_type_error: "Published year must be a number" })
    .int({ message: "Published year must be an integer" })
    .min(1500, { message: "Published year must be later than 1500" })
    .max(new Date().getFullYear(), {
      message: "Published year cannot be in the future",
    })
    .optional(),

  copiesAvailable: z
    .number({ invalid_type_error: "Copies available must be a number" })
    .int({ message: "Copies must be an integer" })
    .min(0, { message: "Copies cannot be negative" })
    .optional(),

  imageURL: z
    .string({ invalid_type_error: "Image URL must be string" })
    .url({ message: "Invalid image URL format" })
    .optional(),

  description: z
    .string({ invalid_type_error: "Description must be string" })
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(1000, { message: "Description cannot exceed 1000 characters." })
    .optional(), // ✅ optional
});
