// src\modules\boards\application\queries\get-board-details.ts
import type { BoardRepository } from '../../domain/repositories/board.repository';
import type { ListRepository } from '@/modules/lists/domain/repositories/list.repository';
import type { CardRepository } from '@/modules/cards/domain/repositories/card.repository';

export async function getBoardDetails(
  boardRepository: BoardRepository,
  listRepository: ListRepository,
  cardRepository: CardRepository,
  boardSlug: string,
) {
  const board = await boardRepository.findBySlug(boardSlug);

  if (!board) {
    return null;
  }

  const [lists, cards] = await Promise.all([
    listRepository.findByBoardId(board._id),
    cardRepository.findByBoardId(board._id),
  ]);

  return {
    board,
    lists,
    cards,
  };
}
