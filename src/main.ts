import "./style.css";
import { getCanvasContext, clearCanvas, drawSprite } from "./render";
import { canPlace, lockPiece, rotate, move, hardDrop } from "./collision";
import { getPieceShape } from "./rotation";
import { clearFullRows, calculateScore } from "./lines";
import { loadAllSprites } from "./sprites";
import { spawnOrGameOver } from "./state";
import { loadFromStorage, isValidHighScore } from "./storage";
import type { Board, ActivePiece, PieceKind, GameState } from "./types";

const HIGH_SCORE_KEY = "tetris-high-score";

function saveHighScore(score: number): void {
  localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(score));
}

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
  // Math.random() は [0, 1) の範囲を返すため、
  // Math.floor(Math.random() * PIECE_KINDS.length) は必ず
  // 0 から PIECE_KINDS.length - 1 の範囲に収まる(数学的に保証されている)。
  const kind = PIECE_KINDS[Math.floor(Math.random() * PIECE_KINDS.length)]!;
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

  let state: GameState = { kind: "ready" };
  let lastFallTime = 0;
  let highScore = loadFromStorage(HIGH_SCORE_KEY, isValidHighScore) ?? 0;

  function startGame(): GameState {
    return {
      kind: "playing",
      board: createEmptyBoard(),
      current: spawnPiece(),
      score: 0,
    };
  }

  function drawBoard(board: Board): void {
    board.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== null) {
          drawSprite(
            ctx,
            sprites[cell],
            x * CELL_SIZE,
            y * CELL_SIZE,
            CELL_SIZE,
          );
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

  function drawMessage(lines: readonly string[]): void {
    ctx.fillStyle = "white";
    ctx.font = "16px sans-serif";
    lines.forEach((line, i) => {
      ctx.fillText(line, 10, 40 + i * 24);
    });
  }

  function loop(timestamp: number): void {
    clearCanvas(ctx, BOARD_WIDTH * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);

    switch (state.kind) {
      case "ready":
        drawMessage(["Enterキーでスタート", `High Score: ${highScore}`]);
        break;

      case "playing": {
        if (timestamp - lastFallTime > FALL_INTERVAL_MS) {
          const moved: ActivePiece = {
            ...state.current,
            y: state.current.y + 1,
          };

          if (canPlace(state.board, moved)) {
            state = { ...state, current: moved };
          } else {
            const locked = lockPiece(state.board, state.current);
            const { clearedBoard, clearedLineCount } = clearFullRows(locked);
            const newScore = state.score + calculateScore(clearedLineCount);
            state = spawnOrGameOver(clearedBoard, spawnPiece(), newScore);

            if (state.kind === "gameover" && state.score > highScore) {
              highScore = state.score;
              saveHighScore(highScore);
            }
          }

          lastFallTime = timestamp;
        }

        if (state.kind === "playing") {
          drawBoard(state.board);
          drawPiece(state.current);
          scoreDisplay.textContent = `Score: ${state.score}`;
        }
        break;
      }

      case "paused":
        drawBoard(state.board);
        drawMessage(["Paused", "Pキーで再開"]);
        break;

      case "gameover":
        drawMessage([
          "Game Over",
          `Score: ${state.score}`,
          `High Score: ${highScore}`,
          "Enterキーでリスタート",
        ]);
        break;

      default:
        state satisfies never;
    }

    requestAnimationFrame(loop);
  }

  window.addEventListener("keydown", (event) => {
    if (state.kind === "ready" || state.kind === "gameover") {
      if (event.key === "Enter") {
        state = startGame();
        lastFallTime = performance.now();
      }
      return;
    }

    if (state.kind === "paused") {
      if (event.key === "p" || event.key === "P") {
        state = { ...state, kind: "playing" };
      }
      return;
    }

    // ここに来る時点で state.kind === "playing"
    switch (event.key) {
      case "ArrowUp":
        state = { ...state, current: rotate(state.board, state.current) };
        break;
      case "ArrowLeft":
        state = { ...state, current: move(state.board, state.current, -1, 0) };
        break;
      case "ArrowRight":
        state = { ...state, current: move(state.board, state.current, 1, 0) };
        break;
      case "ArrowDown":
        state = { ...state, current: move(state.board, state.current, 0, 1) };
        // 自然落下のタイマーもリセットし、直後に二重で1マス落ちるのを防ぐ。
        lastFallTime = performance.now();
        break;
      case " ":
        state = { ...state, current: hardDrop(state.board, state.current) };
        // lastFallTime をリセットせず 0 のままにしておくことで、
        // 次の loop() の判定 (timestamp - lastFallTime > FALL_INTERVAL_MS) を
        // 必ず真にし、すでに底に着いているピースをすぐロックさせる。
        lastFallTime = 0;
        event.preventDefault(); // スペースキーによるページスクロールを防ぐ
        break;
      case "p":
      case "P":
        state = { ...state, kind: "paused" };
        break;
    }
  });

  requestAnimationFrame(loop);
}

main().catch((error: unknown) => {
  console.error(error);
});
