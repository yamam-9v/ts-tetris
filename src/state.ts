import type { Board, ActivePiece, GameState } from "./types";
import { canPlace } from "./collision";

// 新しいピースをスポーンさせた結果を GameState として返す。
// newPiece が board に置けるならゲーム続行、置けなければゲームオーバー。
export function spawnOrGameOver(
  board: Board,
  newPiece: ActivePiece,
  score: number,
): GameState {
  if (!canPlace(board, newPiece)) {
    return {
      kind: "gameover",
      score,
    };
  }

  return {
    kind: "playing",
    board: board,
    current: newPiece,
    score,
  };
}
