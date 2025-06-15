import { z} from "zod";
export const taskSchema = z
  .object({
    title: z.string().min(3, "Title is required"),
    description: z.string().min(10, "DEscription is required"),
    imageUrl: z.string().url("Please select a valid category image"),
    priority: z.enum(["High", "Medium", "Low"], {
    required_error: "Priority is required",
  }),
  dueDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Please enter a valid date",
    }),
});
