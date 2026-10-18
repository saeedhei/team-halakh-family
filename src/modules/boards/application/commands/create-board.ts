// src\modules\boards\application\commands\create-board.ts
import { v7 as uuidv7 } from 'uuid';

import { generateSlug } from '@/lib/slug';

import type { Board } from '@/modules/boards/domain/entities/board';
import type { BoardRepository } from '../../domain/repositories/board.repository';

type CreateBoardInput = {
  title: string;
  description?: string;
};

export async function createBoard(
  repository: BoardRepository,
  input: CreateBoardInput,
): Promise<Board> {
  const slug = generateSlug(input.title);

  const existing = await repository.findBySlug(slug);

  if (existing) {
    throw new Error('A board with this title already exists');
  }

  const now = new Date().toISOString();

  const board: Board = {
    _id: `board:${uuidv7()}`,
    type: 'board',
    title: input.title,
    slug,
    description: input.description,
    createdAt: now,
    updatedAt: now,
  };

  return repository.create(board);
}
