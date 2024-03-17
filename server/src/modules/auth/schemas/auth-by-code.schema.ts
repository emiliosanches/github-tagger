import * as z from 'zod';

export const authByCodeSchema = z.object({
  code: z.string(),
});
