# ts-tetris

TypeScript を身につけることを目的とした学習プロジェクト。動くテトリスはその副産物。

- 詳細な方針・スコープ・コーディング規約: [`tetris-ts-learning-plan.md`](./tetris-ts-learning-plan.md)
- 進捗ログ: [`work-log.md`](./work-log.md)

## 技術スタック

- TypeScript(`strict: true`)
- Vite(`vanilla-ts` テンプレート)
- Canvas 2D API
- Vitest

## セットアップ

```bash
npm create vite@latest tetris-ts -- --template vanilla-ts
cd tetris-ts
npm install
npm run dev
```

## 現在の状態

**計画書の全12ステップ(第1〜第3マイルストーン)が完了。**

- 盤面・ピース・ゲーム状態は判別可能ユニオンなどで型付けされており、`any` は不使用。
- 矢印キーで左右移動・回転・ソフトドロップ、スペースキーでハードドロップ。ライン消去・スコア加算も動作。
- ピース画像は `src/sprites.ts` の `loadImage`/`loadAllSprites`(`async`/`await`、`Promise.all` による並行読み込み)で読み込んでから表示。失敗時は画面にエラーメッセージを表示。
- `GameState`(`ready`/`playing`/`paused`/`gameover`)による状態遷移。Enterキーで開始/リスタート、Pキーで一時停止。
- ハイスコアは `localStorage` に保存。`src/storage.ts` の `isValidHighScore`(型ガード)と自作ジェネリック関数 `loadFromStorage<T>` により、壊れたJSONや不正な型が入っていてもクラッシュしない。
- Vitest で全純粋関数(`canPlace` / `lockPiece` / `rotate` / `move` / `hardDrop` / `calculateScore` / `clearFullRows` / `loadImage` / `loadAllSprites`)をテスト(全42ケースパス)。
- `.devcontainer/` による Dev Container 化(VS Codeでの補完・HMR動作確認済み)。
- GitHub Actions で `tsc --noEmit` と `vitest run` を実行するCIが稼働中。

各ステップの詳細な経緯・つまずき・学んだ型の概念は `work-log.md` を参照。
次のアクションは、計画書6.1節にある任意課題(SRSウォールキック、ゴーストピース、ホールド機能、T-Spin判定など)への着手検討。

作業拠点は WSL2 ネイティブファイルシステム上の `~/projects/ts-tetris`。
