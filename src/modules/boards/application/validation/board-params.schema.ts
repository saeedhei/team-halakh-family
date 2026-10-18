import { z } from 'zod';

export const boardParamsSchema = z.object({
  boardId: z.string().trim().startsWith('board:', 'Invalid board id'),
});
