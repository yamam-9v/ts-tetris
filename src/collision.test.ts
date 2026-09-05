import { describe, it, expect, beforeEach } from "vitest";
import { canPlace, lockPiece, rotate, move, hardDrop } from "./collision";
import type { ActivePiece, Board, Cell } from "./types";
import { PIECE_BOX_SIZE } from "./pieces";

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
  const insidePiece = makePiece({ x: 1, y: 1 });
  const insideTestCases = [
    { piece: makePiece({ x: 1, y: 1 }), direction: "真ん中" },
    { piece: makePiece({ x: 0, y: 1 }), direction: "左" },
    { piece: makePiece({ x: 2, y: 1 }), direction: "右" },
    { piece: makePiece({ x: 1, y: 2 }), direction: "下" },
    { piece: makePiece({ x: 0, y: 2 }), direction: "左下" },
    { piece: makePiece({ x: 2, y: 2 }), direction: "右下" },
  ];
  const outsideTestCases = [
    { piece: makePiece({ x: -1, y: 1 }), direction: "左" },
    { piece: makePiece({ x: 3, y: 1 }), direction: "右" },
    { piece: makePiece({ x: 1, y: 3 }), direction: "下" },
    { piece: makePiece({ x: -1, y: 3 }), direction: "左下" },
    { piece: makePiece({ x: 3, y: 3 }), direction: "右下" },
  ];
  it.each(insideTestCases)(
    "空の盤面の時､盤面内($direction)なら置ける",
    ({ piece }) => {
      expect(canPlace(emptyBoard, piece)).toBe(true);
    },
  );
  it.each(outsideTestCases)(
    "空の盤面の時､盤面外($direction)なら置けない",
    ({ piece }) => {
      expect(canPlace(emptyBoard, piece)).toBe(false);
    },
  );
  it("既存のブロックと重なる位置には置けない", () => {
    expect(canPlace(board, insidePiece)).toBe(false);
  });
});

describe("lockPiece", () => {
  let board: Board;
  let piece: ActivePiece;

  beforeEach(() => {
    board = makeBoard([false, true, true, false]);
    piece = makePiece({ x: 1, y: 0 });
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

describe("rotate", () => {
  // Tピース(3x3のボックス)を使う。x:0, y:0 に置いたときの各 rotation の占有座標は以下の通り
  // (getPieceShape の計算結果、あらかじめ確認済み):
  //   rotation 0: (0,0) (1,0) (2,0) (1,1)  ← y=0,1 のみ使用
  //   rotation 1: (2,0) (2,1) (2,2) (1,1)  ← (2,2) が y=2 まで届く
  it("十分にスペースが有る盤面で､rotationが 1 → 2 → 3 → 0 と順に遷移する", () => {
    const board = makeBoard([false, false, false, false]);
    const rotationInitial = 0;
    const rotationNum = 4;
    let piece = makePiece({ kind: "T", x: 0, y: 0, rotation: rotationInitial });

    Array.from({ length: rotationNum }).forEach((_, index) => {
      piece = rotate(board, piece);
      expect(piece).toEqual(
        makePiece({
          kind: "T",
          x: 0,
          y: 0,
          rotation: ((rotationInitial + index + 1) % rotationNum) as
            0 | 1 | 2 | 3,
        }),
      );
    });
  });
  it("既存のピースと重なって置けない場合､回転前の piece がそのまま返る", () => {
    const board = makeBoard([false, false, true, false]);
    const piece = makePiece({ kind: "T", x: 0, y: 0, rotation: 0 });

    expect(rotate(board, piece)).toEqual(piece);
  });
});

describe("move", () => {
  // TODO(human): 以下のケースをそれぞれ it(...) で書く。
  // 1. 置ける場合、move(board, piece, dx, dy) は (piece.x + dx, piece.y + dy) の
  //    位置に移動した新しい ActivePiece を返す(左右移動・下移動それぞれ確認するとよい)。
  // 2. 置けない場合(盤面外にはみ出す、または既存ブロックと重なる)、
  //    move は移動前の piece をそのまま返す。
  //
  // ヒント: makeBoard/makePiece は canPlace/lockPiece のテストで使ったものと同じ。
  // 盤面は4x4なので、壁際のケースは x:0 から dx:-1 する、などで作れる。
  const insideTestCases = [
    { dx: 0, dy: 0, direction: "動かない" },
    { dx: -1, dy: 0, direction: "左" },
    { dx: 1, dy: 0, direction: "右" },
    { dx: 0, dy: 1, direction: "下" },
    { dx: -1, dy: 1, direction: "左下" },
    { dx: 1, dy: 1, direction: "右下" },
  ];
  const outsideTestCases = [
    { dx: 0, dy: -1, direction: "既存のピースと被る" },
    { dx: -2, dy: 0, direction: "左" },
    { dx: 2, dy: 0, direction: "右" },
    { dx: 0, dy: 1, direction: "下" },
    { dx: -2, dy: 1, direction: "左下" },
    { dx: 2, dy: 1, direction: "右下" },
  ];

  it.each(insideTestCases)(
    "移動後の位置に置ける場合､新しい位置($direction)の ActivePiece を返す",
    ({ dx, dy }) => {
      const board = makeBoard([false, false, false, false]);
      const initialPos = { x: 1, y: 1 };
      const newPos = { x: initialPos.x + dx, y: initialPos.y + dy };
      const piece = makePiece(initialPos);

      expect(move(board, piece, dx, dy)).toEqual(makePiece(newPos));
    },
  );
  it.each(outsideTestCases)(
    "移動後の位置($direction)に置けない場合､そのまま移動前の ActivePiece を返す",
    ({ dx, dy }) => {
      const board = makeBoard([true, true, false, false]);
      const piece = makePiece({ x: 1, y: 2 });

      expect(move(board, piece, dx, dy)).toEqual(piece);
    },
  );
});

describe("hardDrop", () => {
  it("空の盤面の場合､一番下まで落ちる", () => {
    const board = makeBoard([false, false, false, false]);
    const piece = makePiece({ x: 1, y: 0 });
    const newPos = { x: 1, y: board.length - PIECE_BOX_SIZE["O"] };

    expect(hardDrop(board, piece)).toEqual(makePiece(newPos));
  });
  it("途中に既存ブロックがある場合､その手前で止まる", () => {
    const board = makeBoard([false, false, false, true, false]);
    const piece = makePiece({ x: 1, y: 0 });
    const newPos = { x: 1, y: 1 };

    expect(hardDrop(board, piece)).toEqual(makePiece(newPos));
  });
});
