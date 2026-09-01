import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { loadImage, loadAllSprites, SPRITE_PATHS } from "./sprites";
import type { PieceKind } from "./types";

// 本物の Image は jsdom 上では画像を実際に読み込まない(onload/onerror が発火しない)ため、
// テスト用の偽物(モック)に差し替える。src に "fail" という文字列が含まれていたら
// onerror を、それ以外なら onload を(非同期で)発火する。
class MockImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  private _src = "";
  get src(): string {
    return this._src;
  }
  set src(value: string) {
    this._src = value;
    queueMicrotask(() => {
      if (value.includes("fail")) {
        this.onerror?.();
      } else {
        this.onload?.();
      }
    });
  }
}

beforeEach(() => {
  vi.stubGlobal("Image", MockImage);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("loadImage", () => {
  it("正しいパスを渡すと解決 (resolve) し､その結果 Imageインスタンスの src プロパティが渡したパスになっている", async () => {
    const path = "/sprites/I.svg"
    const img = await loadImage(path);
    expect(img.src).toEqual(path)
  });
  it("誤ったパスを渡すと reject される", async () => {
    await expect(loadImage("fail.svg")).rejects.toThrow();
  });
});

describe("loadAllSprites", () => {
  it("SPRITE_PATHS に存在する全てのキーが､結果オブジェクトに存在する", async () => {
    const sprites = await loadAllSprites();
    const spriteKeys = Object.keys(sprites).sort();
    const expectKeys = Object.keys(SPRITE_PATHS).sort() as PieceKind[];

    expect(spriteKeys).toEqual(expectKeys);
  });
});
