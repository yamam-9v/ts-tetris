import { describe, it, expect, beforeEach } from "vitest";
import { canPlace, lockPiece } from "./collision";
import type { ActivePiece, Board, Cell } from "./types";

// 幅4・高さ4の盤面を、行ごとに "揃っている(true)" か "空(false)" かの配列で組み立てるヘルパー。
function makeBoard(rows: readonly boolean[]): Board {
  const width = 4;
  return rows.map((filled): readonly Cell[] =>
    Array.from({ length: width }, () => (filled ? "I" : null)),
  );
}

// Oピース(2x2の正方形、原点からのオフセットが {0,0}/{1,0}/{0,1}/{1,1})を基準に、
// 必要な部分だけ上書きして ActivePiece を組み立てるヘルパー。
function makePiece(overrides: Partial<ActivePiece> = {}): ActivePiece {
  return { kind: "O", x: 0, y: 0, rotation: 0, ...overrides };
}

describe("canPlace", () => {
  const emptyBoard = makeBoard([false, false, false, false]);
  const board = makeBoard([false, true, true, false]);
  const insidePiece = makePiece({x: 1, y: 1});
  const insideTestCases = [
    {piece: makePiece({x: 1, y:1}), direction: "真ん中"},
    {piece: makePiece({x: 0, y:1}), direction: "左"},
    {piece: makePiece({x: 2, y:1}), direction: "右"},
    {piece: makePiece({x: 1, y:2}), direction: "下"},
    {piece: makePiece({x: 0, y:2}), direction: "左下"},
    {piece: makePiece({x: 2, y:2}), direction: "右下"},
  ];
  const outsideTestCases = [
    {piece: makePiece({x: -1, y:1}), direction: "左"},
    {piece: makePiece({x: 3, y:1}), direction: "右"},
    {piece: makePiece({x: 1, y:3}), direction: "下"},
    {piece: makePiece({x: -1, y:3}), direction: "左下"},
    {piece: makePiece({x: 3, y:3}), direction: "右下"},
  ];
  it.each(insideTestCases)("空の盤面の時､盤面内($direction)なら置ける", ({piece}) => {
    expect(canPlace(emptyBoard, piece)).toBe(true);
  });
  it.each(outsideTestCases)("空の盤面の時､盤面外($direction)なら置けない", ({piece}) => {
    expect(canPlace(emptyBoard, piece)).toBe(false);
  });
  it("既存のブロックと重なる位置には置けない", () => {
    expect(canPlace(board, insidePiece)).toBe(false);
  });
});

describe("lockPiece", () => {
  let board: Board;
  let piece: ActivePiece;

  beforeEach(() => {
    board = makeBoard([false, true, true, false]);
    piece = makePiece({x: 1, y:0});
  });

  it("空の盤面にピースをロックすると､そのピースを占めるマスが piece.kind の値で埋まり､それ以外のマスは null のまま", () => {
    const emptyBoard = makeBoard([false, false, false, false]);
    expect(lockPiece(emptyBoard, piece)).toEqual([
      [null, "O", "O", null],
      [null, "O", "O", null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  });
  it("既存のブロックがある盤面にロックしても､ピースが上書きしない部分は元のまま", () => {
    expect(lockPiece(board, piece)).toEqual([
      [null, "O", "O", null],
      ["I", "O", "O", "I"],
      ["I", "I", "I", "I"],
      [null, null, null, null],
    ]);
  });
  it("lockPiece に渡した board は変更されない(イミュータブル)", () => {
    const oldBoard = structuredClone(board);
    lockPiece(board, piece);
    expect(oldBoard).toEqual(board);
  });
});
