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

**第1マイルストーン(ブロックが落ちて積み上がる)完了。**
`src/collision.ts` に `canPlace` / `lockPiece` を実装し、`main.ts` のゲームループに統合。
ランダムなピースが一定間隔で落下し、底や既存ブロックにぶつかると止まって積み上がる状態。
**第2マイルストーン(遊べる)完了。**
矢印キーで左右移動・回転・ソフトドロップ、スペースキーでハードドロップが効く。
ピース画像は `src/sprites.ts` の `loadImage`/`loadAllSprites`(Promise化・`Promise.all`による並行読み込み)で `async`/`await` 読み込みしてから盤面が表示され、読み込み失敗時は画面にエラーメッセージが出る状態。
Vitestを導入し、全純粋関数(`canPlace` / `lockPiece` / `rotate` / `move` / `hardDrop` / `calculateScore` / `clearFullRows` / `loadImage` / `loadAllSprites`)にテストを実装(全42ケースパス)。
意図的なバグを使ったデバッグ体験(`console.log`、`beforeEach`によるテスト独立性の確保、`toEqual`の限界、`Image`のモック化など)も実施。
**第3マイルストーン ステップ10(localStorage + unknown の検証 + ジェネリクス)完了。**
`src/state.ts` の `spawnOrGameOver` と `main.ts` の `GameState`(`ready`/`playing`/`paused`/`gameover`)導入により、Enterキーでスタート、Pキーで一時停止/再開、積み上がったらゲームオーバー、Enterキーでリスタートという一連の状態遷移が動く状態(`satisfies never` による網羅チェックも導入済み)。
`src/storage.ts` の `isValidHighScore`(型述語による型ガード)と `loadFromStorage<T>`(自作のジェネリック関数)により、ハイスコアを `localStorage` に保存・読み込みし、壊れたJSONや不正な型が入っていてもクラッシュせず `0` にフォールバックする状態。
**第3マイルストーン ステップ11(Dev Container化)完了。**
`.devcontainer/devcontainer.json`(`node_modules` を名前付きボリュームに分離、`postCreateCommand` での所有権修正込み)と `vite.config.js`(`DEVCONTAINER` 環境変数でのポーリング監視切り替え)を追加。`@devcontainers/cli` での検証(`npm install` / `tsc --noEmit` / `vitest run` 全42ケース / Vite起動 / HMR)に加え、VS Codeの「Reopen in Container」での補完(IntelliSense)・シンタックスハイライトも実機確認済み。
次は第3マイルストーン ステップ12(GitHub Actions で CI)。詳細は `work-log.md` と `tetris-ts-learning-plan.md` を参照。

作業拠点は WSL2 ネイティブファイルシステム上の `~/projects/ts-tetris`(Dev Container化もこの拠点上で行う方針に決定)。
