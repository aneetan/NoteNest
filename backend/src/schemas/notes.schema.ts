import z from "zod";

export const addNoteSchema = z.object({
   body: z.object({
      title: z.string()
         .min(5, "Title must be min 5 characters")
         .max(100, "Title cannot exceed 100 characters"),
      content: z.string()
         .min(5, "Title must be min 5 characters"),
      user: z.string()
         .min(5, "Title must be min 5 characters")
         .max(100, "Title cannot exceed 100 characters"),
      userId: z.number().int().positive(),
   })
});

export const editNoteSchema = z.object({
   body: addNoteSchema.shape.body.partial()
}) 

export type AddNoteUserInput = z.infer<typeof addNoteSchema>;
export type EditNoteUserInput = z.infer<typeof editNoteSchema>;