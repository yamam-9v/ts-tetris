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

第1マイルストーン ステップ1〜4(WSL2 + Vite 環境構築 / TS 素振り / Canvas 描画とゲームループの土台 / コアの型設計)完了。
`src/types.ts` に `PieceKind` / `Cell` / `Board` / `ActivePiece` / `GameState` を `any` なしで定義済み。
ステップ5(落下と衝突判定、計画書で「最難関」とされるステップ)着手前。詳細は `work-log.md` を参照。

作業拠点は WSL2 ネイティブファイルシステム上の `~/projects/ts-tetris`。
(Windows 側 `/mnt/d/.../ts-tetris` は第3マイルストーンの Dev Container 化用に別途保持)
