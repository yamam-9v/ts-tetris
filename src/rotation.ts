import type { PieceKind } from "./types";
import type { Offset } from "./pieces";
import { PIECE_SHAPES, PIECE_BOX_SIZE } from "./pieces";

// 盤面座標系(board[y][x])に合わせた回転計算。
// boxSize x boxSize の正方形の枠内で、offset を時計回りに90度回転させる。
//
// TODO(human): 時計回りに90度回転させた新しい Offset を返す実装を書く。
// ヒント: boxSize=3 の枠で (0,0) は「左上」。時計回りに90度回すと「右上」、
// つまり (2,0) に移動する。この対応関係から x, y それぞれの計算式を考えること。
export function rotateOffset(offset: Offset, boxSize: number): Offset {
  // TODO(human)
  const newOffset = {
    x: -offset.y + (boxSize - 1),
    y: offset.x
  }
  return newOffset;
}

// kind(ピースの種類)と rotation(0〜3)から、実際の形(相対オフセットの配列)を返す。
// rotation: 0=回転前、1=時計回りに90度、2=180度、3=270度。
//
// TODO(human): PIECE_SHAPES[kind](回転前の形)の各 Offset に、rotateOffset を
// rotation 回だけ繰り返し適用した配列を返す実装を書く。
// (rotation === 0 のときは回転前のまま返せばよい)
export function getPieceShape(kind: PieceKind, rotation: 0 | 1 | 2 | 3): readonly Offset[] {
  // TODO(human)
  let newOffset = PIECE_SHAPES[kind];

  if (rotation === 0) return newOffset;

  let remaining = rotation;
  for(remaining; remaining > 0; remaining--) {
    newOffset = newOffset.map((offset) => rotateOffset(offset, PIECE_BOX_SIZE[kind]));
  }
  return newOffset;
}
