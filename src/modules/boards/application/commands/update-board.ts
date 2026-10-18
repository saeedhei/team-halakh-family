// src\modules\boards\application\commands\update-board.ts
import { generateSlug } from '@/lib/slug';

import type { BoardRepository } from '../../domain/repositories/board.repository';

type UpdateBoardInput = {
  title?: string;
  description?: string;
};

export async function updateBoard(
  repository: BoardRepository,
  boardId: string,
  input: UpdateBoardInput,
) {
  const existing = await repository.findById(boardId);

  if (!existing) {
    throw new Error('Board not found');
  }

  const titleChanged = input.title !== undefined && input.title !== existing.title;

  let slug = existing.slug;

  if (titleChanged) {
    slug = generateSlug(input.title!);

    const boardWithSlug = await repository.findBySlug(slug);

    if (boardWithSlug && boardWithSlug._id !== existing._id) {
      throw new Error('A board with this title already exists');
    }
  }

  const updated = {
    ...existing,
    ...input,
    slug,
    updatedAt: new Date().toISOString(),
  };

  return repository.update(updated);
}

// Board title changed
//        ↓
// generateSlug()
//        ↓
// findBySlug()
//        ↓
// already exists?
//    ↓          ↓
//   yes         no
//  409         update
