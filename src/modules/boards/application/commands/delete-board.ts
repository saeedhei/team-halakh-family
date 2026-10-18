// src/modules/boards/application/commands/delete-board.ts

import type { BoardRepository } from '../../domain/repositories/board.repository';
import type { ListRepository } from '@/modules/lists/domain/repositories/list.repository';
import type { CardRepository } from '@/modules/cards/domain/repositories/card.repository';

export async function deleteBoard(
  boardRepository: BoardRepository,
  listRepository: ListRepository,
  cardRepository: CardRepository,
  boardId: string,
) {
  const board = await boardRepository.findById(boardId);

  if (!board) {
    throw new Error('Board not found');
  }

  const lists = await listRepository.findByBoardId(boardId);

  const listIds = lists.map((list) => list._id);

  const cards = listIds.length > 0 ? await cardRepository.findByListIds(boardId, listIds) : [];

  if (!board._rev) {
    throw new Error('Board revision is missing');
  }

  await cardRepository.deleteMany(cards);

  await listRepository.deleteMany(lists);

  await boardRepository.delete(board._id, board._rev);

  return {
    boardId,
    deleted: {
      lists: lists.length,
      cards: cards.length,
    },
  };
}

// deleteBoard()
//      │
//      ├── find Board
//      │
//      ├── find Lists
//      │
//      ├── find Cards
//      │
//      ├── CardRepository.deleteMany()
//      │
//      ├── ListRepository.deleteMany()
//      │
//      └── BoardRepository.delete()
