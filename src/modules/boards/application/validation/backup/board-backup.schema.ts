import { z } from 'zod';
import { createBoardSchema } from '@/modules/boards/application/validation/board.schema';
import { createListSchema } from '@/modules/lists/application/validation/list.schema';
import { createCardSchema } from '@/modules/cards/application/validation/card.schema';

export const ListBackupSchema = createListSchema.extend({
  createdAt: z.string(),
  cards: z.array(createCardSchema.extend({ createdAt: z.string() })),
});

export const BoardBackupSchema = createBoardSchema.extend({
  lists: z.array(ListBackupSchema),
});

export const FullBackupSchema = z.object({
  version: z.literal('1.0'),
  exportedAt: z.string(),
  board: BoardBackupSchema,
});

export type BoardBackup = z.infer<typeof FullBackupSchema>;
