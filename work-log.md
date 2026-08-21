# 作業ログ

`tetris-ts-learning-plan.md` に基づく進捗記録。セッションの節目や作業終了時に追記していく。

## 記録ルール

- 新しいエントリは**ファイル末尾に追記**する(上書きしない)
- 1エントリ = 1セッション(または区切りの良い作業単位)
- 日付は絶対日付で記載する
- 「新しく理解した型の概念」が一言で言えないステップは、計画書 9 節に従い未完了扱いとする

## エントリ テンプレート

```
## YYYY-MM-DD

- マイルストーン / ステップ: #
- やったこと:
- 詰まった点(JS由来 / TS由来 / 環境由来):
- 新しく理解した型の概念:
- 次回やること:
```

---

## 進捗サマリー(最新状態を上書きで更新)

| マイルストーン | ステップ | 状態 |
|---|---|---|
| 第1: ブロックが落ちて積み上がる | 1. WSL2 + Vite 環境構築 | 完了 |
| 第1 | 2. TS 素振り | 完了 |
| 第1 | 3. Canvas 描画とゲームループ | 完了 |
| 第1 | 4. コアの型設計 | 完了 |
| 第1 | 5. 落下と衝突判定 | 未着手 |
| 第2: 遊べる | 6. 回転(簡易版) | 未着手 |
| 第2 | 7. ライン消去とスコア | 未着手 |
| 第2 | 8. キー入力と落下速度調整 | 未着手 |
| 第3: 仕上げる | 9. 状態遷移 | 未着手 |
| 第3 | 10. localStorage + unknown 検証 | 未着手 |
| 第3 | 11. Dev Container 化 | 未着手 |
| 第3 | 12. GitHub Actions で CI | 未着手 |

---

## ログ本体

## 2026-08-19

- マイルストーン / ステップ: (準備段階、ステップ1着手前)
- やったこと: プロジェクトルートに `work-log.md` を作成。学習計画書 (`tetris-ts-learning-plan.md`) を確認。
- 詰まった点: なし
- 新しく理解した型の概念: (該当なし)
- 次回やること: ステップ1(WSL2 + Vite 環境構築)に着手する

## 2026-08-19 (2)

- マイルストーン / ステップ: (準備段階、ステップ1着手前)
- やったこと: Git 管理を開始。Vite/Node 向けの `.gitignore`、プロジェクト概要をまとめた `README.md` を作成し、`git init` からファーストコミット(`.gitignore` / `CLAUDE.md` / `README.md` / `tetris-ts-learning-plan.md` / `work-log.md`)まで実施。`.claude/` はローカル設定のため未追跡のまま保留。
- 詰まった点: なし
- 新しく理解した型の概念: (該当なし。TS学習以前の環境整備タスク)
- 次回やること: ステップ1(WSL2 + Vite 環境構築)に着手する。`npm create vite@latest` 実行後、生成された `.gitignore` の内容と今回作成した手動版を突き合わせて整理する

## 2026-08-19 (3)

- マイルストーン / ステップ: 1. WSL2 + Vite 環境構築
- やったこと:
  - プロジェクトが `/mnt/d/...`(Windows側Dドライブ)に置かれていたため、計画書 4.1 の方針に従い `~/projects/ts-tetris`(WSL2ネイティブファイルシステム)へ `.git` ごと複製して移行。以降はこちらを作業拠点とする。
  - スクラッチパッドで `npm create vite@latest -- --template vanilla-ts` を実行し、生成された `index.html` / `package.json` / `tsconfig.json` / `src/` / `public/` を `~/projects/ts-tetris` に移植。
  - 生成された `.gitignore` と既存の手動版を突き合わせ、不足していた項目(`logs`, `*.sw?` など)を既存版にマージ。
  - `package.json` の `name` を `tetris-ts` に修正。
  - `tsconfig.json` に `strict: true` が入っていないことに気づき追加(計画書3節の必須要件)。個別の厳格化フラグ(`noUnusedLocals` 等)はあっても `strict` 自体は別スイッチなので注意が必要だった。
  - `npm install`(WSL2側で8秒程度)、`npx tsc --noEmit` が通ることを確認。Viteの dev サーバーを一時的に起動し `curl` でHTMLが返ることも確認済み。
  - `/mnt/d/<user>/Documents/ts-tetris` 側の旧コピーは、ユーザーによるブラウザ目視確認が済むまで削除せず保留。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: Vite雛形が非空ディレクトリへの直接生成に対応していなかったため、スクラッチパッド経由での移植という一手間が必要だった。
  - 環境由来: `/mnt/...` 経由のマウントは9pプロトコル越しでI/Oが遅くなるため、計画書どおりWSL2ネイティブパスへの移行が必要だった(実際 `npm install` は数秒で完了)。
- 新しく理解した型の概念: (該当なし。ここまでは環境整備。ステップ2でユニオン型などに入る)
- 次回やること:
  - 確認が取れたら `/mnt/d/<user>/Documents/ts-tetris` の旧コピーを削除するか判断する。
  - ステップ1完了後、ステップ2(TS素振り: tsconfig / strict / ユニオン型)に着手する。

## 2026-08-19 (4)

- マイルストーン / ステップ: 1. WSL2 + Vite 環境構築(完了)
- やったこと: ユーザーが別のWezTermタブで `~/projects/ts-tetris` に入り `npm run dev` を実行、ブラウザで `http://localhost:5173` を開いて Vite + TypeScript の初期画面(「Get started」、`Count is 0` ボタン)を目視確認。ステップ1の完了条件を満たした。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし
- 新しく理解した型の概念: (該当なし。ステップ1は環境構築が主眼で、型の概念はステップ2から本格的に扱う)
- 次回やること:
  - ステップ2(TS素振り: tsconfig / strict / ユニオン型)に着手する。

### 補足: `/mnt/d/<user>/Documents/ts-tetris` を残す理由(2026-08-19時点の判断)

以降のTS学習(第1・第2マイルストーン)は `~/projects/ts-tetris`(WSL2ネイティブ)を正とする。
`/mnt/d/<user>/Documents/ts-tetris` は削除せず、**第3マイルストーンのDev Container化(ステップ11)着手時の作業拠点**として意図的に残す方針とした(ユーザーの判断)。

このため両ディレクトリは一時的に中身が乖離する(`/mnt/d` 側は Vite 雛形なし・旧 `.gitignore`/`tsconfig.json` のまま)。
Docker化に着手するタイミングで、`~/projects/ts-tetris` の最新状態を `/mnt/d` 側に反映し直すか、あるいは `/mnt/d` 側で改めて `git pull` / `git clone` するかを検討すること。
なお計画書 4.2 の通り、Windows側マウント(`/mnt/...`)上での Docker バインドマウントは I/O が遅くなりやすい既知の落とし穴なので、Docker化の際に改めて置き場所を見直す余地がある。

## 2026-08-20

- マイルストーン / ステップ: 2. TS 素振り(完了)
- やったこと:
  - `src/playground.ts` を作成し、`strict: true` が実際に何を弾くかを実験。
    - `noImplicitAny`: 型注釈のない引数がエラーになることを確認。`x: number` を付けて解消。
    - `strictNullChecks`: `string | undefined` な値に `.toUpperCase()` を直接呼ぶとエラーになることを確認。`typeof name === "string"` による型ガード(絞り込み/narrowing)で解消。
  - 判別可能ユニオン `RequestState`(idle/loading/success/error)を設計。
    1. 最初は「1つのオブジェクト型の中で `kind` だけをユニオンにする」誤った設計をし、`switch` 内で絞り込みが効かない(存在しないはずのプロパティを読んでもエラーにならない)ことを実験で確認。
    2. バリアントごとに別々のオブジェクト型を `|` で連結する正しい判別可能ユニオンに書き直し、絞り込みが効くことを確認。
    3. `interface` を4つ定義する版はユーザーから「冗長」との指摘があり、`type` のインラインユニオンに簡潔化。あわせて `interface Error` が組み込み `Error` 型をシャドーイングする問題も解消。
  - `never` 型による網羅チェック(exhaustiveness check)を体験。
    - 戻り値のある関数はたまたま戻り値型チェックで守られるが、`void` を返す関数ではバリアント追加の対応漏れが検出されないことを実験で確認。
    - `switch` の `default` 節で `state satisfies never` を使うことで、バリアント追加時の対応漏れをコンパイルエラーとして検出できることを確認。`const _exhaustive: never = state` 版は `noUnusedLocals` に引っかかるため、`satisfies` 版を採用。
  - 空文字列の表記を `""` に統一する方針を決定し、`tetris-ts-learning-plan.md` 5.4節に追記。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - TS由来: 判別可能ユニオンを最初「共通オブジェクト内で1プロパティだけユニオンにする」形で誤解しやすいと判明。実験で「コンパイルは通るが意図した絞り込みが効かない」ことを可視化して修正した。
  - TS由来: `_exhaustive` 変数への `_` プレフィックスの慣習は `noUnusedParameters`(引数)には効くが `noUnusedLocals`(ローカル変数)には効かないことが判明。`satisfies never` で変数宣言自体を回避して解決。
- 新しく理解した型の概念(本人の言葉):
  - 「tsでの型ガード、判別可能ユニオンを学習した」
  - 「判別可能ユニオンと値オブジェクトの違いとして、新しい関数を増やすのが簡単な判別可能ユニオン、新しい種類(バリアント)を増やすのが簡単な値オブジェクトという違いを認識した」(expression problem)
  - 「判別可能ユニオンでバリアントを増やした時、実装忘れ対策(網羅チェック)で never 型が使えるということを学んだ」
- 次回やること: ステップ3(Canvas描画とゲームループの土台)に着手する。

## 2026-08-21

- マイルストーン / ステップ: 3. Canvas 描画とゲームループの土台(完了)
- やったこと:
  - Vite雛形の装飾部分(`counter.ts`、`src/assets/`、`index.html`/`style.css`の装飾HTML・CSS)を削除し、`<canvas id="game-canvas" width="240" height="400">` とシンプルな中央寄せCSSに置き換え。
  - `src/render.ts` を新規作成。定型的な描画処理として `clearCanvas`(`ctx.clearRect`)、`drawSquare`(`ctx.fillRect`)をClaudeが実装。
  - `getCanvasContext()`(canvas要素の取得と `getContext('2d')` のnullチェック)を `TODO(human)` として学習者に依頼。ステップ2で学んだ `strictNullChecks` / 型ガードの実践課題と位置づけ。
    1. 最初は `document.getElementById` の戻り値を `instanceof HTMLElement` で絞り込む実装になり、`getContext` が呼べない(絞り込み先が具体的すぎない)ことに気づいて `instanceof HTMLCanvasElement` に修正。
    2. `getContext("2d")` の戻り値も `CanvasRenderingContext2D | null` であることを確認し、同様に `instanceof CanvasRenderingContext2D` でnullチェック。
    3. 最初は `if/else` のネストで実装し、両方の `else` が `throw` で終わることに着目して**ガード節(早期リターン)**にリファクタリング。TypeScriptの型の絞り込みが `if (!(x instanceof T)) { throw }` の後のコードにも及ぶことを確認。
    4. エラーの投げ方について、`throw` vs カスタムErrorクラス vs 判別可能ユニオンでの失敗表現、の3択を比較。今回は「起動時一度きりで回復不能な失敗」のため素直な `throw new Error(明確なメッセージ)` を採用。判別可能ユニオンでの失敗表現はステップ10(localStorage検証、回復可能な失敗)向けと位置づけ。
  - `main.ts` にゲームループの土台(`requestAnimationFrame` で0.5秒ごとに四角形を1マス下に動かす)をClaudeが実装。ブラウザで四角形が一定間隔で下に動くことを目視確認済み。
  - `src/playground.ts`(ステップ2の実験用ファイル)は参照用に残す方針とし、未使用エクスポートによる `tsc --noEmit` エラーを解消するため `double` / `greet` / `describeState` に `export` を付与(ロジック変更なし)。
  - `npx tsc --noEmit` が通ることを確認。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - TS由来: `HTMLElement` への絞り込みでは `getContext` メソッドが呼べない(型が具体的すぎない)ことに気づかず、一旦 `HTMLCanvasElement` まで絞り込む必要があると学んだ。
  - TS由来: `else` が常に `throw`/`return` で終わる分岐は省略でき、絞り込みがブロックの外にも及ぶ(制御フロー解析)ことを実験で確認。
- 新しく理解した型の概念(本人の言葉):
  - 「HTMLCanvasElement, CanvasRenderingContext2Dという型の絞り込み方を学んだ」
- 次回やること: ステップ4(コアの型設計: Piece / Board / GameState)に着手する。

## 2026-08-21 (2)

- マイルストーン / ステップ: 4. コアの型設計(完了)
- やったこと:
  - `src/types.ts` を新規作成し、`PieceKind` / `Cell` / `Board` / `ActivePiece` / `GameState` の5つの型を学習者が段階的に実装。ファイル冒頭に `board[y][x]` の座標系規約をコメントで明記。
  - `PieceKind`: 最初は各バリアントを `{ kind: "I" }` のようなオブジェクトにする判別可能ユニオン風の設計をしたが、バリアント間でデータの形が同じ(タグ以外に情報がない)ため過剰と判断し、文字列リテラルの合併型 `"I" | "O" | ... | "L"` に修正。
  - `Cell`: `PieceKind | null` として一発で正しく実装(`0`や`""`ではなく`null`を選んだ理由を確認)。
  - `Board`: `ReadonlyArray<ReadonlyArray<Cell>>` として正しく実装。`readonly Cell[][]`だと外側の配列しか`readonly`にならない落とし穴を回避できた。あわせて「ジェネリクスの`<T>`(要素の型を決める)」と「`ReadonlyArray`自体(書き込み不可にする)」が独立した軸であることを確認。
  - `ActivePiece`: 最初 `{posX} | {posY} | {kind} | {rotation}` という誤ったユニオン(OR)で実装してしまい、`piece.kind` にアクセスしようとするとエラーになることを`tsc --noEmit`で実際に確認してから、1つのオブジェクト型(AND、全プロパティを同時に持つ)に修正。回転状態は形状データそのものではなく `rotation: 0 | 1 | 2 | 3` というインデックスのみを持つ設計を選択(実際の形状テーブルはステップ5で用意する方針)。
  - `GameState`: `ready` / `playing` / `paused` / `gameover` の4バリアントを、今度はバリアントごとにデータの形が異なる正しい判別可能ユニオンとして一発で実装。`playing`と`paused`は同じ形(`board` / `current` / `score`)になったが、重複が小さいため共通化はせずそのままとした。
  - すべての型に `export` を付与(`Board`・`ActivePiece`・`GameState`がどこからも使われておらず`tsc`の未使用警告に引っかかったため。`export`された宣言は他ファイルから使われる可能性があるとみなされ対象外になることを確認)。
  - `npx tsc --noEmit` が通ることを確認。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - TS由来: `PieceKind`で「バリアント間の情報量が同じなら文字列リテラル合併型で十分、判別可能ユニオン(オブジェクト化)は情報量が違うときに使う」という使い分けを誤りかけた。
  - TS由来: `ActivePiece`で「複数のプロパティを同時に持つ(AND)」型を`|`(OR)で書いてしまう間違いをした。`tsc --noEmit`で実際にプロパティアクセスのエラーを起こして体感し、1つのオブジェクト型にまとめる形に修正した。
- 新しく理解した型の概念(本人の言葉):
  - 「ただ単に選択肢のどれかの型、プロパティを全て持つ必要がある型、バリアントごとに持つべきプロパティが異なる型を学んだ」
- 次回やること: ステップ5(落下と衝突判定)に着手する。座標系規約(計画書5.1)を先に再確認すること。ステップ5は計画書で「最難関」とされている。
