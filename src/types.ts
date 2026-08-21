// コアの型定義。
// 盤面(Board)は board[y][x] とする(y=行/上から、x=列/左から)。

export type PieceKind = "I" | "O" | "T" | "S" | "Z" | "J" | "L";
export type Cell = PieceKind | null;

export type Board = ReadonlyArray<ReadonlyArray<Cell>>;

export type ActivePiece = {
  kind: PieceKind;
  x: number;
  y: number;
  rotation: 0 | 1 | 2 | 3;
};

export type GameState =
    | { kind: "ready" }
    | { kind: "playing"; board: Board; current: ActivePiece; score: number }
    | { kind: "paused"; board: Board; current: ActivePiece; score: number }
    | { kind: "gameover"; score: number };
