import { z } from "zod";

// Define the schema for updating a Todo
export const TodoUpdateSchema = z.object({
  title: z.string().min(1).optional(), // title is optional during update
  description: z.string().optional(),
  completed: z.boolean().optional(),
  category: z.enum(["work", "personal", "groceries"]).optional(),
});
