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

第1マイルストーン ステップ1(WSL2 + Vite 環境構築)着手前。詳細は `work-log.md` を参照。
