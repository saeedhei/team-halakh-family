import type { BoardRepository } from '../../domain/repositories/board.repository';

export async function getBoards(repository: BoardRepository) {
  return repository.findAll();
}
