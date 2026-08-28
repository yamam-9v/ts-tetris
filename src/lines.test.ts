import { describe, it, expect } from "vitest";
import { calculateScore, clearFullRows, type LineClearResult } from "./lines";
import type { Board, Cell } from "./types";

describe("calculateScore", () => {
  it.each([
    [0, 0],
    [1, 40],
    [2, 100],
    [3, 300],
    [4, 1200],
  ])("%i行消去なら%i点", (lines, score) => {
    expect(calculateScore(lines)).toBe(score);
  });
});

// 幅4の盤面を、行ごとに "揃っている(true)" か "空(false)" かの配列で組み立てるヘルパー。
// 例: makeBoard([false, false, true]) → 上から 空/空/揃った行、の3行の盤面。
function makeBoard(rows: readonly boolean[]): Board {
  const width = 4;
  return rows.map((filled): readonly Cell[] =>
    Array.from({ length: width }, () => (filled ? "I" : null)),
  );
}

describe("clearFullRows", () => {
  it("揃った行が1つもない盤面ならclearedBoardは同じ内容､clearedLineCountは0", () => {
    const board = makeBoard([false]);
    const board1 = makeBoard([false, false, false]);
    const expected: LineClearResult = {clearedBoard: board, clearedLineCount: 0};
    const expected1: LineClearResult = {clearedBoard: board1, clearedLineCount: 0};

    expect(clearFullRows(board)).toEqual(expected);
    expect(clearFullRows(board1)).toEqual(expected1);
  });
  it("1番下の行だけが揃っている盤面ならclearedBoardは先頭に1つ空行が追加され､揃っていた行が消える clearedLineCountは1", () => {
    const board = makeBoard([false, false, true]);
    const clearedBoard = makeBoard([false, false, false]);
    const expected: LineClearResult = {clearedBoard: clearedBoard, clearedLineCount: 1};

    expect(clearFullRows(board)).toEqual(expected);
  });
  it("複数行同時に揃っている盤面ならclearedBoardは先頭に消された行数分だけ空行が追加され､揃っていた行が消える clearedLineCountは揃った行数", () => {
    const board = makeBoard([false, false, true, true]);
    const board1 = makeBoard([false, true, true, false]);
    const clearedBoard = makeBoard([false, false, false, false]);
    const expected: LineClearResult = {clearedBoard: clearedBoard, clearedLineCount: 2};

    expect(clearFullRows(board)).toEqual(expected);
    expect(clearFullRows(board1)).toEqual(expected);
  });
});
