import type { PieceKind } from "./types";

export const SPRITE_PATHS: Readonly<Record<PieceKind, string>> = {
  I: "/sprites/I.svg",
  O: "/sprites/O.svg",
  T: "/sprites/T.svg",
  S: "/sprites/S.svg",
  Z: "/sprites/Z.svg",
  J: "/sprites/J.svg",
  L: "/sprites/L.svg",
};

// 画像1枚を非同期に読み込む。
// HTMLImageElement の読み込みはコールバック形式(onload/onerror)の古いAPIなので、
// それを Promise でラップして async/await から使えるようにする。
// 読み込みに失敗した場合は reject し、呼び出し側でエラーメッセージを分かりやすくできるようにする。
//
// TODO(human): 実装する。
// ヒント:
//   - `new Promise<HTMLImageElement>((resolve, reject) => { ... })` の形になる。
//   - `new Image()` で img 要素を作り、`img.src = src` を設定すると読み込みが始まる。
//   - `img.onload` が呼ばれたら成功、`img.onerror` が呼ばれたら失敗。
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {resolve(img)}
    img.onerror = () => {reject(new Error("画像が読み込まれませんでした"))}
    img.src = src;
  });
}

// SPRITE_PATHS にある7種類すべてのスプライトを並行読み込みし、
// PieceKind ごとに引ける Record にまとめて返す。
// 1枚でも読み込みに失敗すれば、この関数全体が reject される。
//
// TODO(human): 実装する。
// ヒント:
//   - `Object.keys(SPRITE_PATHS) as PieceKind[]` で7種類のキー配列が得られる。
//   - キー配列を `.map()` で `loadImage(...)` の呼び出し(Promiseの配列)に変換し、
//     `Promise.all(...)` に渡すと「全部読み込み終わるまで待つ」1つのPromiseになる。
//     (直列に1枚ずつ await するのではなく、7枚を同時に読み込み始める点がポイント)
//   - 得られた HTMLImageElement の配列と、元のキー配列を組み合わせて
//     Record<PieceKind, HTMLImageElement> を組み立てる(方法は自由。
//     `.reduce()` はこの「配列からオブジェクトを組み立てる」用途にはよく合う)。
export async function loadAllSprites(): Promise<Record<PieceKind, HTMLImageElement>> {
  const spriteKeys = Object.keys(SPRITE_PATHS) as PieceKind[];
  const spriteImages = await Promise.all(
    spriteKeys.map((key) => loadImage(SPRITE_PATHS[key]))
  );
  const loadedSprites = spriteImages.reduce((object, image, index) => {
    object[spriteKeys[index]] = image;
    return object;
  }, {} as Record<PieceKind, HTMLImageElement>);

  return loadedSprites;
}
