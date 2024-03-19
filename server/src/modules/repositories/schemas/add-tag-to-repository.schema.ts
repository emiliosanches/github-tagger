import * as z from "zod";

export const addTagToRepositorySchema = z.object({
  tagText: z.string(),
});
