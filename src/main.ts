import "./style.css";
import { getCanvasContext, clearCanvas, drawSquare } from "./render";

const CANVAS_WIDTH = 240;
const CANVAS_HEIGHT = 400;
const CELL_SIZE = 20;
const FALL_INTERVAL_MS = 500;

const ctx = getCanvasContext();

let squareY = 0;
let lastFallTime = 0;

function loop(timestamp: number): void {
  if (timestamp - lastFallTime > FALL_INTERVAL_MS) {
    squareY += CELL_SIZE;
    lastFallTime = timestamp;
  }

  clearCanvas(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawSquare(ctx, 100, squareY, CELL_SIZE);

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
