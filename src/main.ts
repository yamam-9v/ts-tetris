import "./style.css";
import { getCanvasContext, clearCanvas, drawSquare } from "./render";
import { canPlace, lockPiece } from "./collision";
import { PIECE_SHAPES } from "./pieces";
import type { Board, ActivePiece, PieceKind } from "./types";

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;
const FALL_INTERVAL_MS = 500;

const PIECE_KINDS: readonly PieceKind[] = ["I", "O", "T", "S", "Z", "J", "L"];

const ctx = getCanvasContext();

function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );
}

function spawnPiece(): ActivePiece {
  const kind = PIECE_KINDS[Math.floor(Math.random() * PIECE_KINDS.length)];
  return { kind, x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0, rotation: 0 };
}

let board: Board = createEmptyBoard();
let current: ActivePiece = spawnPiece();
let lastFallTime = 0;

function drawBoard(board: Board): void {
  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== null) {
        drawSquare(ctx, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      }
    });
  });
}

function drawPiece(piece: ActivePiece): void {
  PIECE_SHAPES[piece.kind].forEach((offset) => {
    drawSquare(
      ctx,
      (piece.x + offset.x) * CELL_SIZE,
      (piece.y + offset.y) * CELL_SIZE,
      CELL_SIZE,
    );
  });
}

function loop(timestamp: number): void {
  if (timestamp - lastFallTime > FALL_INTERVAL_MS) {
    const moved: ActivePiece = { ...current, y: current.y + 1 };

    if (canPlace(board, moved)) {
      current = moved;
    } else {
      board = lockPiece(board, current);
      current = spawnPiece();
      // 新しく出したピースが置けない = 積み上がりすぎ。
      // 正式なゲームオーバー処理はステップ9で扱うので、今は単純にリセットする。
      if (!canPlace(board, current)) {
        board = createEmptyBoard();
      }
    }

    lastFallTime = timestamp;
  }

  clearCanvas(ctx, BOARD_WIDTH * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
  drawBoard(board);
  drawPiece(current);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
