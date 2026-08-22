import type { PieceKind } from "./types";

// 盤面座標系(board[y][x])に合わせた、各ピース種類の基準点からの相対オフセット。
// 現時点では回転前(rotation: 0)の形のみを定義する。回転はステップ6で扱う。
export type Offset = { readonly x: number; readonly y: number };

// 回転計算で使う境界ボックス(ピースが収まる正方形)の1辺のマス数。
// 例: Iは4x4、Oは2x2、それ以外は3x3の枠内に収まる設計にしている。
export const PIECE_BOX_SIZE: Readonly<Record<PieceKind, number>> = {
  I: 4,
  O: 2,
  T: 3,
  S: 3,
  Z: 3,
  J: 3,
  L: 3,
};

export const PIECE_SHAPES: Readonly<Record<PieceKind, readonly Offset[]>> = {
  I: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
  ],
  O: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  T: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 1 },
  ],
  S: [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
  Z: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  J: [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
  L: [
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
  ],
};
