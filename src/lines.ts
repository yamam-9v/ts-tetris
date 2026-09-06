import type { Board } from "./types";

// board[y][x] とする(y=行/上から、x=列/左から)。

export type LineClearResult = {
  clearedBoard: Board;
  clearedLineCount: number;
};

// 揃った行(すべてのマスが null でない行)を取り除き、
// 取り除いた数だけ盤面上部に空の行を追加して、盤面の高さを保つ。
export function clearFullRows(board: Board): LineClearResult {
  const filteredBoard: Board = board.filter((row) =>
    row.some((item) => item === null),
  );
  const clearedLineCount: LineClearResult["clearedLineCount"] =
    board.length - filteredBoard.length;
  const newLine: Board = Array.from({ length: clearedLineCount }, () =>
    Array.from({ length: board[0]?.length ?? 0 }, () => null),
  );
  const newBoard: LineClearResult = {
    clearedBoard: [...newLine, ...filteredBoard],
    clearedLineCount: clearedLineCount,
  };
  return newBoard;
}

// 1回のロックで消えた行数から、加算するスコアを計算する。
export function calculateScore(clearedLineCount: number): number {
  if (clearedLineCount === 0) return 0;

  const scoreByClearedLines = [40, 100, 300, 1200];
  return scoreByClearedLines[clearedLineCount - 1] ?? 0;
}
