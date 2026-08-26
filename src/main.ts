import "./style.css";
import { getCanvasContext, clearCanvas, drawSprite } from "./render";
import { canPlace, lockPiece, rotate, move, hardDrop } from "./collision";
import { getPieceShape } from "./rotation";
import { clearFullRows, calculateScore } from "./lines";
import { loadAllSprites } from "./sprites";
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

const statusDisplayEl = document.getElementById("status-display");
if (!(statusDisplayEl instanceof HTMLDivElement)) {
  throw new Error("status-displayが見つかりません");
}
const statusDisplay: HTMLDivElement = statusDisplayEl;

function createEmptyBoard(): Board {
  return Array.from({ length: BOARD_HEIGHT }, () =>
    Array.from({ length: BOARD_WIDTH }, () => null),
  );
}

function spawnPiece(): ActivePiece {
  const kind = PIECE_KINDS[Math.floor(Math.random() * PIECE_KINDS.length)];
  return { kind, x: Math.floor(BOARD_WIDTH / 2) - 2, y: 0, rotation: 0 };
}

async function main(): Promise<void> {
  statusDisplay.textContent = "画像を読み込み中...";

  let sprites: Record<PieceKind, HTMLImageElement>;
  try {
    sprites = await loadAllSprites();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    statusDisplay.textContent = `画像の読み込みに失敗しました: ${message}`;
    return;
  }

  statusDisplay.textContent = "";

  let board: Board = createEmptyBoard();
  let current: ActivePiece = spawnPiece();
  let lastFallTime = 0;
  let score = 0;

  function drawBoard(board: Board): void {
    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== null) {
          drawSprite(ctx, sprites[cell], x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        }
      });
    });
  }

  function drawPiece(piece: ActivePiece): void {
    getPieceShape(piece.kind, piece.rotation).forEach((offset) => {
      drawSprite(
        ctx,
        sprites[piece.kind],
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

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        current = rotate(board, current);
        break;
      case "ArrowLeft":
        current = move(board, current, -1, 0);
        break;
      case "ArrowRight":
        current = move(board, current, 1, 0);
        break;
      case "ArrowDown":
        current = move(board, current, 0, 1);
        // 自然落下のタイマーもリセットし、直後に二重で1マス落ちるのを防ぐ。
        lastFallTime = performance.now();
        break;
      case " ":
        current = hardDrop(board, current);
        // lastFallTime をリセットせず 0 のままにしておくことで、
        // 次の loop() の判定 (timestamp - lastFallTime > FALL_INTERVAL_MS) を
        // 必ず真にし、すでに底に着いているピースをすぐロックさせる。
        lastFallTime = 0;
        event.preventDefault(); // スペースキーによるページスクロールを防ぐ
        break;
    }
  });

  requestAnimationFrame(loop);
}

main();
