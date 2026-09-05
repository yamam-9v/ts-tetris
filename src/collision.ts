import type { Board, ActivePiece } from "./types";
import { getPieceShape } from "./rotation";

// board[y][x] とする(y=行/上から、x=列/左から)。

export function canPlace(board: Board, piece: ActivePiece): boolean {
  const boardPos = getPieceShape(piece.kind, piece.rotation).map((offset) => ({
    x: piece.x + offset.x,
    y: piece.y + offset.y,
  }));

  return boardPos.every(
    (pos) =>
      0 <= pos.x &&
      pos.x < board[0].length &&
      pos.y < board.length &&
      board[pos.y][pos.x] === null,
  );
}

export function lockPiece(board: Board, piece: ActivePiece): Board {
  const boardPos = getPieceShape(piece.kind, piece.rotation).map((offset) => ({
    x: piece.x + offset.x,
    y: piece.y + offset.y,
  }));

  return board.map((row, y) =>
    row.map((cell, x) => {
      if (boardPos.some((pos) => pos.x === x && pos.y === y)) return piece.kind;
      return cell;
    }),
  );
}

// ピースを時計回りに90度回転させる。回転後の位置に置けない場合は、
// キック(壁際でのずらし)は行わず、回転前の piece をそのまま返す(スコープ外・計画書6.1)。
//
// TODO(human): rotation を次の状態(0→1→2→3→0)に進めた新しい ActivePiece を作り、
// canPlace で置けるか確認する。置けなければ元の piece を返す。
//
// 型のヒント: rotation の型は number ではなく 0 | 1 | 2 | 3(リテラル型のユニオン)。
// piece.rotation + 1 は型としては number になってしまうので、そのままは代入できない。
// 対処法はいくつかある(自分で選んでよい):
//   - switch文で 0→1, 1→2, 2→3, 3→0 を明示的に書く
//   - (piece.rotation + 1) % 4 を計算した上で、それが 0|1|2|3 であることを
//     TypeScriptに伝える(as を使う、など)
export function rotate(board: Board, piece: ActivePiece): ActivePiece {
  const newRotation: ActivePiece["rotation"] = ((piece.rotation + 1) % 4) as
    0 | 1 | 2 | 3;
  const newPiece: ActivePiece = { ...piece, rotation: newRotation };

  if (canPlace(board, newPiece)) return newPiece;
  return piece;
}

// piece を (dx, dy) だけずらせるか試す。
// 左右移動(dx=±1, dy=0)とソフトドロップ(dx=0, dy=1)の両方をこの1つの関数でまかなう。
// 置ければずらした新しい ActivePiece を、置けなければ元の piece をそのまま返す(rotate と同じ形)。
export function move(
  board: Board,
  piece: ActivePiece,
  dx: number,
  dy: number,
): ActivePiece {
  const newX: ActivePiece["x"] = piece.x + dx;
  const newY: ActivePiece["y"] = piece.y + dy;
  const newPiece: ActivePiece = { ...piece, x: newX, y: newY };

  if (canPlace(board, newPiece)) return newPiece;
  return piece;
}

// piece を、これ以上下に動かせなくなる(= move(board, piece, 0, 1) を呼んでも
// 位置が変わらなくなる)ところまで一気に落とした ActivePiece を返す。
// ロック(lockPiece)まではここでは行わない(呼び出し側の責任)。
//
// TODO(human): 実装する。move を繰り返し使えばよい。
export function hardDrop(board: Board, piece: ActivePiece): ActivePiece {
  let newPiece = piece;
  const tryMove = () => move(board, newPiece, 0, 1);
  while (true) {
    const next = tryMove();
    if (next === newPiece) break;
    newPiece = next;
  }
  return newPiece;
}
