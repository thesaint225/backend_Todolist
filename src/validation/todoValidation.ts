import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  slug: z.string().optional(), // This is usually generated, so optional
  description: z.string().trim().optional(),
  completed: z.boolean().default(false),
  category: z.enum(["Work", "Personal", "Groceries"]),
  createdAt: z.date().optional(), // These are usually handled by Mongoose
  updatedAt: z.date().optional(),
});

// Type inference from Zod schema
export type TodoType = z.infer<typeof TodoSchema>;
