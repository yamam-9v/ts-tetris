import type { Board, ActivePiece } from "./types";
import { PIECE_SHAPES } from "./pieces";

// board[y][x] とする(y=行/上から、x=列/左から)。

export function canPlace(board: Board, piece: ActivePiece): boolean {
  const boardPos = PIECE_SHAPES[piece.kind].map((offset) => ({
    x: piece.x + offset.x,
    y: piece.y + offset.y,
  }));

  return boardPos.every(
    (pos) =>
      0 <= pos.x &&
      pos.x < board[0].length &&
      pos.y < board.length &&
      board[pos.y][pos.x] === null,
  );
}

export function lockPiece(board: Board, piece: ActivePiece): Board {
  const boardPos = PIECE_SHAPES[piece.kind].map((offset) => ({
    x: piece.x + offset.x,
    y: piece.y + offset.y,
  }));

  return board.map((row, y) =>
    row.map((cell, x) => {
      if (boardPos.some((pos) => pos.x === x && pos.y === y)) return piece.kind;
      return cell;
    }),
  );
}