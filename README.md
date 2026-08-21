# ts-tetris

TypeScript を身につけることを目的とした学習プロジェクト。動くテトリスはその副産物。

- 詳細な方針・スコープ・コーディング規約: [`tetris-ts-learning-plan.md`](./tetris-ts-learning-plan.md)
- 進捗ログ: [`work-log.md`](./work-log.md)

## 技術スタック

- TypeScript(`strict: true`)
- Vite(`vanilla-ts` テンプレート)
- Canvas 2D API
- Vitest(第2マイルストーン以降)

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
第2マイルストーン ステップ6(回転・簡易版)着手前。このマイルストーンからVitestを導入予定。詳細は `work-log.md` を参照。

作業拠点は WSL2 ネイティブファイルシステム上の `~/projects/ts-tetris`。
(Windows 側 `/mnt/d/.../ts-tetris` は第3マイルストーンの Dev Container 化用に別途保持)
