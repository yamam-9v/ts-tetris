export function getCanvasContext(): CanvasRenderingContext2D {
  const canvas = document.getElementById("game-canvas");
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("game-canvasが見つかりません");
  }

  const context = canvas.getContext("2d");

  if (!(context instanceof CanvasRenderingContext2D)) {
    throw new Error('getContext("2d")が失敗しました');
  }

  return context;
}

export function clearCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): void {
  ctx.clearRect(0, 0, width, height);
}

export function drawSprite(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  size: number,
): void {
  ctx.drawImage(image, x, y, size, size);
}
