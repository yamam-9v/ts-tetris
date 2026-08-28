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
Vitestを導入済み(`npm test` / `npm run test:watch`)。`calculateScore` / `clearFullRows` / `canPlace` / `lockPiece` にテストを実装。
意図的なバグを使ったデバッグ体験(`console.log`、`beforeEach`によるテスト独立性の確保など)も実施。
残りの純粋関数(`rotate`, `move`, `hardDrop`, `loadImage`, `loadAllSprites`)へのテストは次回。
その後、第3マイルストーン ステップ9(状態遷移: ゲームオーバー/リスタート)に着手予定。
学習計画にステップ10へのジェネリクス学習統合を追加済み(実装は未着手)。詳細は `work-log.md` と `tetris-ts-learning-plan.md` を参照。

作業拠点は WSL2 ネイティブファイルシステム上の `~/projects/ts-tetris`。
(Windows 側 `/mnt/d/.../ts-tetris` は第3マイルストーンの Dev Container 化用に別途保持)
