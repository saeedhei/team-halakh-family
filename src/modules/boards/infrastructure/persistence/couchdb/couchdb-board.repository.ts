import { getKanbanDb } from '@/lib/couchdb';

import type { Board } from '@/modules/boards/domain/entities/board';
import type { BoardRepository } from '@/modules/boards/domain/repositories/board.repository';

export class CouchDBBoardRepository implements BoardRepository {
  private get db() {
    return getKanbanDb();
  }

  async findAll(): Promise<Board[]> {
    const result = await this.db.find({
      selector: {
        type: 'board',
      },
      sort: [{ createdAt: 'desc' }],
    });

    return result.docs as Board[];
  }

  async findById(id: string): Promise<Board | null> {
    try {
      const board = (await this.db.get(id)) as Board;

      if (board.type !== 'board') {
        return null;
      }

      return board;
    } catch {
      return null;
    }
  }

  async findBySlug(slug: string): Promise<Board | null> {
    const result = await this.db.find({
      selector: {
        type: 'board',
        slug,
      },
      limit: 1,
    });

    return (result.docs[0] as Board | undefined) ?? null;
  }

  async create(board: Board): Promise<Board> {
    await this.db.insert(board);

    return board;
  }

  async update(board: Board): Promise<Board> {
    await this.db.insert(board);

    return board;
  }

  async delete(id: string, rev: string): Promise<void> {
    await this.db.destroy(id, rev);
  }
}
