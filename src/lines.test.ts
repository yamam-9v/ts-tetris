import { describe, it, expect } from "vitest";
import { calculateScore, clearFullRows, type LineClearResult } from "./lines";
import type { Board, Cell } from "./types";

describe("calculateScore", () => {
  it("0行消去なら0点", () => {
    expect(calculateScore(0)).toBe(0);
  });

  it("1行消去なら40点", () => {
    expect(calculateScore(1)).toBe(40);
  });
  it("2行消去なら100点", () => {
    expect(calculateScore(2)).toBe(100);
  });
  it("3行消去なら300点", () => {
    expect(calculateScore(3)).toBe(300);
  });
  it("4行消去なら1200点", () => {
    expect(calculateScore(4)).toBe(1200);
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
  // TODO(human): 以下のケースをそれぞれ it(...) で書く。
  // 1. 揃った行が1つもない盤面 → clearedBoard は元と同じ内容、clearedLineCount は 0
  // 2. 一番下の行だけ揃っている盤面(例: makeBoard([false, false, true])) →
  //    clearedLineCount は 1、clearedBoard は「先頭に空行が1つ追加され、揃っていた行が消えた」形になる
  //    (=makeBoard([false, false, false]) と同じ内容になるはず)
  // 3. 複数行(例: 2行)が同時に揃っている盤面 → clearedLineCount がその行数と一致する
  //
  // ヒント: clearFullRows は { clearedBoard, clearedLineCount } を返すオブジェクトなので、
  //   const result = clearFullRows(makeBoard([...]));
  //   expect(result.clearedLineCount).toBe(...);
  //   expect(result.clearedBoard).toEqual(makeBoard([...]));
  // のように、2つのプロパティをそれぞれ検証する。
  // (オブジェクトや配列の中身を比較するときは toBe ではなく toEqual を使う点に注意)
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
