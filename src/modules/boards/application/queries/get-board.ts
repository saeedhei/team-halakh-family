import type { BoardRepository } from '../../domain/repositories/board.repository';

export async function getBoard(repository: BoardRepository, boardId: string) {
  const board = await repository.findById(boardId);

  if (!board) {
    throw new Error('Board not found');
  }

  return board;
}

// The application doesn't even know that our database is CouchDB.
