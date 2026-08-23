import "./style.css";
import { getCanvasContext, clearCanvas, drawSquare } from "./render";
import { canPlace, lockPiece, rotate } from "./collision";
import { getPieceShape } from "./rotation";
import { clearFullRows, calculateScore } from "./lines";
import type { Board, ActivePiece, PieceKind } from "./types";

const BOARD_WIDTH = 12;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 20;
const FALL_INTERVAL_MS = 500;

const PIECE_KINDS: readonly PieceKind[] = ["I", "O", "T", "S", "Z", "J", "L"];

const ctx = getCanvasContext();

const scoreDisplayEl = document.getElementById("score-display");
if (!(scoreDisplayEl instanceof HTMLDivElement)) {
  throw new Error("score-displayが見つかりません");
}
const scoreDisplay: HTMLDivElement = scoreDisplayEl;

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
let score = 0;

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
  getPieceShape(piece.kind, piece.rotation).forEach((offset) => {
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
      const locked = lockPiece(board, current);
      const { clearedBoard, clearedLineCount } = clearFullRows(locked);
      board = clearedBoard;
      score += calculateScore(clearedLineCount);
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
  scoreDisplay.textContent = `Score: ${score}`;

  requestAnimationFrame(loop);
}

// 暫定のキー入力(ステップ6の動作確認用)。
// 本格的なキー入力(左右移動・ソフト/ハードドロップ含む)はステップ8で扱う。
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    current = rotate(board, current);
  }
});

requestAnimationFrame(loop);
