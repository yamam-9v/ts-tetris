import { describe, it, expect } from "vitest";

// branch protectionが実際にCIを強制しているか検証するための一時ファイル。
// 確認後にこのファイルごと削除する。
describe("branch protection check", () => {
  it("わざと失敗させる", () => {
    expect(1).toBe(2);
  });
});
