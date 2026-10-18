// src/modules/boards/domain/repositories/board.repository.ts
import type { Board } from '@/modules/boards/domain/entities/board';

export interface BoardRepository {
  findAll(): Promise<Board[]>;
  findById(id: string): Promise<Board | null>;
  findBySlug(slug: string): Promise<Board | null>;

  create(board: Board): Promise<Board>;
  update(board: Board): Promise<Board>;
  delete(id: string, rev: string): Promise<void>;
}

// this file should not know anything about:

// CouchDB
// Nano
// Next.js
// HTTP
// NextResponse
