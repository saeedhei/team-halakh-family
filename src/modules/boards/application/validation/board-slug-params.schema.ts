import { z } from 'zod';

export const boardSlugParamsSchema = z.object({
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid board slug'),
});
