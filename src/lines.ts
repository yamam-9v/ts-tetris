import type { Board } from "./types";

// board[y][x] とする(y=行/上から、x=列/左から)。

// TODO(human): ライン消去の結果を表す型を定義する。
// 呼び出し側(main.ts)は「消去後の盤面」と「何行消えたか」の両方を必要とする
// (後者はスコア計算に使う)。プロパティ名・順序は自由に決めてよい。
export type LineClearResult = {
  // TODO(human)
  clearedBoard: Board,
  clearedLineCount: number
};

// 揃った行(すべてのマスが null でない行)を取り除き、
// 取り除いた数だけ盤面上部に空の行を追加して、盤面の高さを保つ。
//
// TODO(human): 実装する。
// ヒント:
//   - 1行が「揃っている」とは、その行のすべてのマスが null でないこと
//   - 揃っていない行だけを残す(揃った行を取り除く)にはどの配列メソッドが使えるか
//   - 取り除いた行数ぶん、幅 board[0].length の空行を先頭に追加する
export function clearFullRows(board: Board): LineClearResult {
  const filteredBoard: Board = board.filter((row) => row.some((item) => item === null));
  const clearedLineCount: LineClearResult["clearedLineCount"] = board.length - filteredBoard.length;
  const newLine: Board = [...Array(clearedLineCount)].map((_) => Array(board[0].length).fill(null));
  const newBoard: LineClearResult = {clearedBoard: [...newLine, ...filteredBoard], clearedLineCount: clearedLineCount};
  return newBoard;
}

// 1回のロックで消えた行数から、加算するスコアを計算する。
//
// TODO(human): 実装する。決め方は自由(参考: 昔ながらのテトリスでは
// 1行=40点、2行=100点、3行=300点、4行(テトリス)=1200点、のように
// 複数行同時消しほど1行あたりの単価が上がるボーナス設計が定番)。
// 0行なら0点を返すこと。
export function calculateScore(clearedLineCount: number): number {
  if (clearedLineCount === 0) return 0;

  const scoreByClearedLines = [40, 100, 300, 1200];
  return scoreByClearedLines[clearedLineCount-1]
}
