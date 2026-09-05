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
| 第1 | 5. 落下と衝突判定 | 完了(第1マイルストーン完了) |
| 第2: 遊べる | 6. 回転(簡易版) | 完了 |
| 第2 | 7. ライン消去とスコア | 完了 |
| 第2 | 8. キー入力と落下速度調整 | 完了 |
| 第2 | 8.5. 非同期処理(スプライト画像読み込み) | 完了(第2マイルストーン完了) |
| 第3: 仕上げる | 9. 状態遷移 | 完了 |
| 第3 | 10. localStorage + unknown 検証 + ジェネリクス | 完了 |
| 第3 | 11. Dev Container 化 | 完了 |
| 第3 | 12. GitHub Actions で CI | 完了(第3マイルストーン完了、全ステップ完了) |
| 第4: 開発ワークフローの強化 | 13. ESLint + Prettier 導入 | 完了 |
| 第4 | 14. PRベースの開発フローを一度体験する | 完了(branch protectionの実際の強制確認はステップ15公開後に持ち越し) |
| 第4 | 15. リポジトリを公開する | 未着手(計画書のみ追加) |
| 第4 | 16. GitHub Pages にデプロイする | 未着手(計画書のみ追加) |
| 第4 | 17. `noUncheckedIndexedAccess` の導入 | 未着手(計画書のみ追加) |

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

## 2026-08-22

- マイルストーン / ステップ: 5. 落下と衝突判定(完了、第1マイルストーン完了)
- やったこと:
  - `src/pieces.ts` を新規作成。7種類のピースの相対オフセット(`PIECE_SHAPES`)を定義(回転前のみ。回転はステップ6)。事実データのためClaudeが実装。
  - `src/collision.ts` を新規作成。計画書5.3の例そのものである `canPlace(board, piece): boolean` を学習者が実装。
    1. `var boardPos: {...}[]`と型だけ宣言して`.every()`内で`push`する実装から着手し、「使われる前に代入されている可能性がある」というTSエラーに遭遇。`.every()`を副作用目的(push)に使うのは誤りで、1対1変換にあたる`.map()`が適切と気づき修正。
    2. アロー関数の式本体でオブジェクトリテラルを返す際、`{ }`だけだとブロック本体(ラベル付き文)として解釈されてしまうため`({ ... })`で包む必要がある、という構文上の理由(JS由来)を確認。
    3. `.every()`の条件チェック3つで`return`忘れ(ブロック本体なのに`return`なし→常に`undefined`)があり修正。あわせて、その際「`{ }`を`()`で包めば`return`が要らなくなる」という誤解が生じたため、`()`によるオブジェクトリテラルの明示化と、式本体そのものの違いを再整理した。
    4. ブラウザのコンソールで手動テスト(空盤面/範囲外/衝突の5パターン)を実施。当初`collision.ts`が`main.ts`から辿れずモジュールとして読み込まれない(ESモジュールグラフの問題、JS由来)ため`console.log`が出ず、一時的な`import "./collision"`で解決。
    5. テストの結果、2つの実装バグを発見: ①`x=-1`でも`true`になる(「範囲外か」の判定に`.every()`(すべてが)を使っていたため、ピースの一部だけが範囲外のケースを見逃していた。`.some()`または条件反転が必要だった) ②`y=5`でTypeError(範囲チェックより先に`board[pos.y][pos.x]`へ無条件アクセスしていたため)。3つの独立した条件を、1つの`.every()`と`&&`の短絡評価(範囲チェック→中身チェックの順)にまとめる形に書き直して解消。ステップ3のガード節の考え方と同じ発想であることを確認。
  - `lockPiece(board, piece): Board`を学習者が実装。
    1. `board.map()`を1段だけ使い、行(`ReadonlyArray<Cell>`)と`piece.kind`(文字列)を条件によって出し分けようとして型エラー。`Board`が2次元配列であることの理解不足が原因と判明し、行→マスの2段の`.map()`が必要と気づく。
    2. 内側で`boardPos.every()`を使い、コールバック内で`if (...) return piece.kind`としたが、`.every()`の戻り値をどこにも使わず直後に無条件で`return cell`していたため実質何も書き換わらない、という実装ミス。「戻り値を使わなければmap/every/someは違いがないのでは」という疑問が出たため、各メソッドの戻り値の契約(mapは新配列、every/someは真偽値1つ)の違いを整理。存在判定には`.some()`が適切と気づき、真偽値を変数(実質的に条件式)として使って`piece.kind`/`cell`を選択する形に修正。
  - `main.ts`にゲームループの土台をClaudeが実装し直し(盤面生成・ピースのスポーン・`canPlace`/`lockPiece`を使った落下判定・盤面とピースの描画)。ブラウザでランダムなピースが落下し、底や既存ブロックで止まって積み上がることを目視確認済み。
  - `npx tsc --noEmit` が随所で通ることを確認。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - TS由来: `var`宣言に型注釈だけ与えて未初期化のまま閉包(クロージャ)内で使うと`used before being assigned`になる。
  - JS由来: アロー関数の式本体で`{ }`を使うとブロックとして解釈されるため、オブジェクトリテラルを返すには`({ ... })`が必要。
  - JS由来: ESモジュールは実際に`import`で辿れる(モジュールグラフに含まれる)ファイルしかブラウザで実行されない。
  - TS由来/設計理解: `.every()` / `.some()` / `.map()`はいずれも配列を反復するが、戻り値の意味(全称/存在/変換)が異なり、目的に合わない方を選ぶと「コンパイルは通るが意図通り動かない」バグになる。
  - JS由来: `board[pos.y][pos.x]`のような動的インデックスアクセスは、範囲外だと実行時に`TypeError`になる。TypeScriptは数値の実際の範囲までは検査しないため、範囲チェックを先に行う実行時のガードが必要。
- 新しく理解した型の概念(本人の言葉):
  - 「map, every, someはそれぞれ配列のコピー、配列の全要素において条件を満たさない要素はないか、配列の全要素において条件を満たす要素はあるかという機能を持つ。それらの機能を使わず無名関数にするだけならどれを使っても変わらない(forEachを使うのと変わらない)」
  - 「アロー関数において、本体をブロックにするか式にするかという2つの書き方がある。ブロックは複数の文を書けるが、値を返したい場合は明示的にreturnする必要がある。式は評価結果が返り値になる」
- 次回やること: 第2マイルストーン ステップ6(回転・簡易版、キック無し)に着手する。このマイルストーンからVitestを導入し、ステップ5〜7で書いた純粋関数(`canPlace`, `lockPiece`など)にテストを書く(学習者が書く)。

## 2026-08-22 (2)

- マイルストーン / ステップ: (開発作業なし。ステップ6着手前)
- やったこと: `/remote-control` によるリモートコントロール機能の疎通テストのみ実施。セッション開始時の指示に従い `work-log.md` / `tetris-ts-learning-plan.md` を確認し、現状(第1マイルストーン完了、ステップ6未着手)をユーザーに報告した。コードの変更は行っていない。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし
- 新しく理解した型の概念: (該当なし。開発作業なし)
- 次回やること: 第2マイルストーン ステップ6(回転・簡易版、キック無し)に着手する。

## 2026-08-22 (3)

- マイルストーン / ステップ: 6. 回転(簡易版・キック無し)(進行中)
- やったこと:
  - 回転の表現方法として「4方向ぶんの形を全部データで持つ」か「回転前の形だけ持ち数式で回す」かを比較し、後者(数式方式)を採用。理由: データ重複が減り、座標変換の理解にもつながるため。
  - `src/pieces.ts` に `PIECE_BOX_SIZE`(境界ボックスの1辺のマス数。I=4, O=2, 他=3)を追加(事実データのためClaudeが実装)。
  - `src/rotation.ts` を新規作成し、`rotateOffset(offset, boxSize)`(境界ボックス内の1点を時計回りに90度回転)を学習者が導出・実装。`newX = -oldY + (boxSize - 1)`, `newY = oldX`。`npx tsc --noEmit` で確認済み。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし
- 新しく理解した型の概念: (該当なし。今回は座標変換の数式導出が主眼)
- 次回やること: `rotateOffset` を使ってピース全体(4マス)を回転させる関数、および`rotation`状態(0〜3)ごとの形を得る仕組みを実装する。その後 `canPlace` と組み合わせて「回転して置けなければキャンセル」ロジックへ進む。

## 2026-08-23

- マイルストーン / ステップ: 6. 回転(簡易版・キック無し)(完了)
- やったこと:
  - `getPieceShape(kind, rotation)`(`src/rotation.ts`)を学習者が実装。`rotateOffset` を `rotation` 回だけ繰り返し適用する`for`ループ。引数`rotation`を直接デクリメントする書き方から、`let remaining = rotation`という別変数を使う書き方へ、学習者自身の判断でリファクタリング。
  - `collision.ts`(`canPlace`/`lockPiece`)と`main.ts`(`drawPiece`)を、直接`PIECE_SHAPES[piece.kind]`を見ていた実装から`getPieceShape(piece.kind, piece.rotation)`を使う形に置き換え(機械的な配線のためClaudeが実装)。
  - `rotate(board, piece)`(`src/collision.ts`)を学習者が実装。`rotation`を次の状態(0→1→2→3→0)に進めた新しい`ActivePiece`を作り、`canPlace`で置けるか確認、置けなければ元の`piece`をそのまま返す(キック無し)。`(piece.rotation + 1) % 4 as 0|1|2|3`という`as`によるキャストで実装。
  - `main.ts`に動作確認用の暫定キー入力(↑キーで`rotate`呼び出し)を追加(ステップ8で本格的なキー入力に置き換え予定、Claudeが実装)。
  - ブラウザで↑キーによる回転、壁際で置けない場合に何も起きないことを目視確認済み。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - JS由来: `getPieceShape`の実装で、`for`文の終了条件を`remaining > 0`ではなく`remaining <= 0`(＝最初から偽になり1回も実行されない)と書いてしまう間違いをした。`tsc --noEmit`は通ってしまうため、`rotation=1`の場合を手でトレースして気づいた。
- 新しく理解した型の概念(本人の言葉):
  - 「for文は終了条件が真の時だけ実行する、勘違いに注意」(JS由来の教訓として記録。型の概念そのものではない)
  - 「型["プロパティ"]の形でプロパティの型だけ取り出せる」(インデックスアクセス型。`ActivePiece["rotation"]`)
  - 「as演算子は型推論だけで検証は挟まない。`5 as 0|1|2|3`のようになってしまうと型チェックは通るが間違った値が入っていってしまうため気をつける必要がある」
  - 「スプレッド構文で`const foo = {...bar, buz: 1};`のようにオブジェクトの残りの部分を取得できる」
  - (補足)ジェネリクスの命名慣習(`T`=Type, `K`=Key/プロパティ名, `V`=Value)についてもこの回で質問があり説明した。
- 感想: 「今までアロー関数とオブジェクトについて曖昧だったが、だいぶ理解が進んできた」
- 次回やること: 第2マイルストーン ステップ7(ライン消去とスコア)に着手する。このマイルストーンからVitestを導入し、ステップ5〜7で書いた純粋関数(`canPlace`, `lockPiece`, `rotate`など)にテストを書く(学習者が書く)。

## 2026-08-24

- マイルストーン / ステップ: 7. ライン消去とスコア(完了)
- やったこと:
  - `src/lines.ts` を新規作成。`LineClearResult`型(消去後の盤面`clearedBoard`と消去行数`clearedLineCount`を持つオブジェクト型)を学習者が設計。
  - `clearFullRows(board): LineClearResult` を学習者が実装。最初 `.reduce()` で実装しようとして詰まったため、「配列から条件に合う要素だけ残す」操作には`.filter()`の方が適切であること、`.reduce()`は他のメソッドで表現できない集約(合計・オブジェクト構築など)のための汎用手段であることを説明。書き直し後、`.filter()`の条件が反転している実装バグ(揃った行を残し、揃っていない行を消していた)を手動トレースで発見・修正。
  - `calculateScore(clearedLineCount): number` を学習者が実装(昔ながらのテトリスの配点[40, 100, 300, 1200]をルックアップテーブルで採用)。配列の添字アクセスがTypeScript上`number`型のまま(範囲外だと実行時`undefined`)である点を指摘したが、1ピース=4マスという不変条件によりclearedLineCountは最大4までしかあり得ないため実害なしと確認。
  - `main.ts`に`score`変数と`score-display`(`index.html`に追加)への描画、`lockPiece`後に`clearFullRows`→`calculateScore`を呼ぶ配線を追加(Claudeが実装)。配線中、`scoreDisplay`をnarrowingした直後の値を`function loop()`内で使おうとすると「narrowingが関数宣言の中に届かない」型エラーに遭遇し、絞り込み済みの値を型注釈付きの別constに入れ直す手法で解消。
  - 動作確認のため、コンソールから`board`を直接操作できる一時的なデバッグ関数(`setBottomRowFull()`)を`main.ts`に追加し、ブラウザで最下段を埋めて実際のゲームループ(`lockPiece`→`clearFullRows`→`calculateScore`)がスコアを加算する様子を目視確認。確認後、デバッグ関数は削除。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - TS由来: `.reduce()`の初期値`{clearedBoard: [], clearedLineCount: 0}`が文脈から`Board`型と推論されず`never[]`になり、`.push()`できないという型エラーに遭遇(`reduce`の型推論の限界)。
  - JS由来: `.filter()`の述語(揃った行=`every(item !== null)`)をそのまま使うと、消したい行(揃った行)が残り、残したい行(揃っていない行)が消えるという条件の反転バグ。
  - TS由来: `Array(n)`は型注釈があっても実体は`any[]`を返す(標準ライブラリの定義)ため、型チェックが意味を持たない箇所になる。
  - TS由来: `const`変数を`if`文で絞り込んでも、その後に定義される`function`宣言(巻き上げられるため絞り込みチェックより先に呼ばれる可能性があるとTypeScriptが判断する)の中には絞り込みが届かない。絞り込み済みの値を型注釈付きの別constに入れ直すことで回避。
- 新しく理解した型の概念(本人の言葉):
  - 「`.filter()`は配列を受け取り、条件式が真だった要素だけを配列にして返す」
  - 「`.reduce()`は配列を受け取り、累積値・現在の値・初期値などから計算し数値などを返す、なんでもできる汎用的なメソッドなためこれを使用する前に他の関数は使えないかをまず考える」
  - 「`Array.from({length: N})`や`[...Array(N)]`と書けば指定した数だけ要素を持つ配列を作成できる。`[...Array(N)].forEach`で指定した回数だけループできる」
  - 「`Array(N)`では指定した数だけの空要素を持つ配列を作成する。`Array(N).fill(item)`で指定した要素で埋め尽くすことも出来る」
  - 「`Array(N)`は型注釈を書いても`any[]`を返すため注意する必要がある」(型の概念として明示的に確認)
- 次回やること: 第2マイルストーン ステップ8(キー入力と落下速度調整)に着手する。第2マイルストーンの完了が近いので、着手前後でVitestの導入(`canPlace`, `lockPiece`, `rotate`, `clearFullRows`, `calculateScore`へのテスト)も検討する。

## 2026-08-25

- マイルストーン / ステップ: (開発作業なし。計画書の更新のみ)
- やったこと:
  - `/remote-control` 経由でユーザーから学習計画への追加要望(①async/await学習のためのステップ8.5新設、②ステップ10へのジェネリクス学習統合)を受け、変更前に提案・確認質問を実施した上で `tetris-ts-learning-plan.md` を更新。
  - ステップ8.5(非同期処理: スプライト画像の読み込み)を第2マイルストーン末尾に新設。`Promise<HTMLImageElement>` を自作しPromise.allで並行読み込みする方針(効果音案は自動再生ポリシー等の環境由来のハマりどころが多くTS学習から逸れるため不採用)。
  - 計画書6.1節(サウンド等を完了後の任意課題とする方針)に、8.5は演出目的ではなくasync/await学習目的の例外である旨の注記を追加。
  - ステップ10を「localStorage + unknown検証 + ジェネリクス」に拡張。型ガード関数を引数に取る汎用関数 `loadFromStorage<T>` を自力で定義する内容を追加(発展編の`saveToStorage<T>`との対比教材は今回は見送り)。6.2節にも同様の追記。
  - 各マイルストーン・全体の想定時間を更新(第2: 10〜15h→12〜19h、第3: 8〜12h→9〜19h、全体: 35〜60h→38〜68h)。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし
- 新しく理解した型の概念: (該当なし。計画書の更新のみで実装作業なし)
- 次回やること: 第2マイルストーン ステップ8(キー入力と落下速度調整)に着手する。

## 2026-08-26

- マイルストーン / ステップ: 8. キー入力と落下速度調整(進行中)
- やったこと:
  - セッション開始時に `work-log.md` / `tetris-ts-learning-plan.md` を確認し、現状(ステップ7完了、ステップ8未着手)を把握。
  - `src/collision.ts` に `move(board, piece, dx, dy): ActivePiece` の型シグネチャと `TODO(human)` を追加。ステップ6で実装済みの `rotate`(仮の新状態を作る→`canPlace`で確認→置けなければ元の`piece`を返す)と同じパターンの応用と位置づけ、左右移動(`dx=±1, dy=0`)とソフトドロップ(`dx=0, dy=1`)を1つの関数でまかなう設計とした。
  - 学習者への実装依頼(Learn by Doing)を発行し、実装待ちの状態。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし
- 新しく理解した型の概念: (該当なし。`move` の実装は次回セッションに持ち越し)
- 次回やること:
  - `move` の実装を確認し、型の付け方も含めてフィードバックする。
  - `main.ts` の暫定キー入力(↑キーのみ)を、左右矢印キー・下矢印キー(ソフトドロップ)を含む形に置き換える(`move` を使う配線)。
  - ハードドロップ(置けなくなるまで一気に落として即ロックする処理)を実装する。

## 2026-08-27

- マイルストーン / ステップ: 8. キー入力と落下速度調整(完了)
- やったこと:
  - `move` の実装(`rotate` と同じ「仮の新状態を作る→`canPlace`で確認→ダメなら元を返す」パターンの応用)を確認。ロジックは一発で正しく実装できていた。型面では、`rotation`(リテラル型ユニオン)と違い `x`/`y` は素の`number`型のため、インデックスアクセス型による型注釈(`ActivePiece["x"]`)が実質「効いていない」書き方であること(推論結果と代入先の型が同じ場合は注釈不要)をフィードバック。
  - `main.ts` のキー入力配線(左右矢印・下矢印)をClaudeが実装。下矢印(ソフトドロップ)では `lastFallTime` もリセットし、自然落下との二重落下を防止。
  - `chromium-cli` が環境になかったため、`npx playwright install chromium` でPlaywright用Chromiumを導入し、自作のNode.jsスクリプトでVite devサーバーを実際にブラウザ操作(キー入力送信・スクリーンショット取得・コンソールエラー確認)して検証する方式に切り替えた。左右移動(壁際で停止)・回転(形が変わる)・ソフトドロップ(素早く落下)を実際のブラウザで確認。コンソールエラーなし。
  - `src/collision.ts` に `hardDrop(board, piece): ActivePiece` の型シグネチャと `TODO(human)` を追加(`move` を繰り返し使う設計)。
  - 学習者の初回実装(`tryMove = move(board, newPiece, 0, -1)` をループ外で1回だけ計算)に2つのバグを発見。素のJSに書き直したトレーススクリプトで「下ではなく上に1マスだけ動く」ことを実演して指摘。
    1. 方向が `dy=-1`(上向き)になっていた。下方向は `dy=+1`(ソフトドロップと同じ)。
    2. `tryMove` が `while` ループの**外**で1回だけ計算され、ループ内で再計算されていないため、ループが最大1回しか回らない構造になっていた(1回目で `newPiece` が `tryMove` と同じ参照になり、条件が即座に偽になる)。
    3. `tsc --noEmit` はどちらのバグでも通ってしまう(型は正しいが意味が間違っている)ことを確認し、「型は形を守るが意味までは守らない」ことを実演。
  - 学習者から「`tryMove` で、値ではなく“関数と引数を固定する”イメージで実装したい、そういう方法はあるか」との質問。クロージャ(引数なし関数によるサンク/遅延評価)の概念を、`hardDrop`とは別の簡単な例(`value` と `getValue` の比較)で説明。あわせて「評価タイミングを先送りする必要がない場面でクロージャを使うのはオーバーエンジニアリング寄り」という判断基準も伝えた。
  - 学習者がクロージャ版(`const tryMove = () => move(...)` を `while` の条件式と本体の両方で呼ぶ形)に書き直し。方向は修正されたが、`tryMove()` を1ループにつき2回呼んでおり無駄があることを、`move` の呼び出し回数を実測(9回、本来5回で足りる)して指摘。修正は必須でない任意改善として提示。
  - 学習者が `while(true)` + `if` 文での `break` に書き直し、`tryMove()` の呼び出しを1ループ1回に削減。`move` の呼び出し回数が5回に減り、結果も変わらず正しいことをトレースで確認。
  - `main.ts` にスペースキーでの `hardDrop` 配線をClaudeが実装。`lastFallTime = 0` にリセットして次の `loop()` で即座にロックされるようにし、`event.preventDefault()` でページスクロールを防止。
  - Playwrightでスペースキーによるハードドロップの動作を確認(1回目・2回目とも底まで一気に落ちて即座に積み上がり、新しいピースがスポーンすることをスクリーンショットで確認)。コンソールエラーなし。
  - ステップ8の完了条件(左右移動・ソフトドロップ・ハードドロップが効く)を満たしたことを確認。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: `chromium-cli` が使えず、Playwrightを直接導入して自作スクリプトで代替した。
  - JS由来: 関数呼び出しの**結果(値)**をループの外で固定してしまうと、ループ内で状態を更新しても再評価されない(式は書かれた場所で1回評価されるだけ)という、評価タイミングに関する誤解があった。クロージャ(引数なし関数)で包むことで「呼ばれるたびに再評価」できることを学んだ。
  - TS由来: `tsc --noEmit` は「型が正しいか」は守るが「ロジックの意味が正しいか」までは保証しない。方向の逆転・ループが1回しか回らない、いずれのバグも型チェックは素通りした。
- 新しく理解した型の概念(本人の言葉):
  - 「型注釈をとりあえず書くのではなく、推論結果の型と代入先の型がどうなるかを確認する」
  - 「推論結果の型と代入先の型が同じ場合は型注釈がいらない」
  - 「推論結果の型が代入先より広く、リテラル型などのように絞り込みが必要な場合のみ型注釈で絞り込みが必要」
  - 「閉包関数(クロージャ)の形で遅延評価(呼ばれた時に中に入っている関数を評価させること)が出来る」
  - 「閉包関数を使う価値が出てくるのは、評価する場所が異なる場所になってしまう時」
  - 「今回は評価の場所が同じだが、学習として書いた」
- 次回やること: 第2マイルストーン ステップ8.5(非同期処理: スプライト画像読み込み)に着手する。第2マイルストーンの完了が近いので、着手前後でVitestの導入(`canPlace`, `lockPiece`, `rotate`, `move`, `hardDrop`, `clearFullRows`, `calculateScore` へのテスト、学習者が書く)も検討する。

## 2026-08-27 (2)

- マイルストーン / ステップ: 8.5. 非同期処理(スプライト画像読み込み)(完了、第2マイルストーン完了)
- やったこと:
  - `public/sprites/{I,O,T,S,Z,J,L}.svg`(ピース種類ごとに色分けした単色矩形のSVG、標準的なテトリスカラー)をClaudeが用意(定型アセット準備)。
  - `src/sprites.ts` を新規作成。`SPRITE_PATHS`(事実データ)はClaudeが用意し、以下2つの純粋な非同期処理を学習者が実装。
    - `loadImage(src): Promise<HTMLImageElement>`: `new Image()` の `onload`/`onerror`(コールバック形式の古いAPI)を `new Promise((resolve, reject) => {...})` でラップする、いわゆる Promise化(Promisify)。一発で正しく実装(`onload`/`onerror` を先に登録してから `img.src` を設定する順序も正しい)。Playwrightでブラウザ上から実行し、正常系(`HTMLImageElement` として解決、`complete: true`)・異常系(存在しないパスで `Error` としてreject、メッセージも正しい)の両方を確認。
    - `loadAllSprites(): Promise<Record<PieceKind, HTMLImageElement>>`: `Object.keys(SPRITE_PATHS)` のキー配列を `.map()` で `loadImage(...)` の配列に変換し `Promise.all(...)` で並行読み込みし、結果を `.reduce()` で `Record<PieceKind, HTMLImageElement>` に組み立てる、という設計を一発で正しく実装。Playwrightで7種類すべてが正しく揃うことを確認(18ms)。型面のフィードバックとして、`await` 後の変数を `xxxPromise` のまま使い回していた命名(実態は `HTMLImageElement[]`)を指摘し、学習者が `spriteImages` / `image` に修正。
  - `src/render.ts` の `drawSquare`(単色塗りつぶし)を `drawSprite`(`ctx.drawImage` でスプライト画像を描画)に置き換え(Claudeが実装、Canvas描画の定型セットアップ)。
  - `index.html` に `#status-display` を追加し、`src/main.ts` 全体を `async function main()` に組み替え(Claudeが実装、起動フローの配線)。起動時に `await loadAllSprites()` の完了を待ってから盤面表示・ゲームループを開始し、失敗時は `try/catch` で捕捉して `#status-display` にエラーメッセージを表示する形にした。`board`/`current`/`lastFallTime`/`score` などはモジュールトップレベルの変数から `main()` 内のローカル変数(クロージャ経由で `loop`/キーイベントリスナーから参照)に変更。
  - Playwrightで正常系(色分けされたスプライトが実際に描画される、コンソールエラーなし)と異常系(`page.route()` で `T.svg` のリクエストだけ意図的に `abort` し、1枚でも読み込み失敗すれば `Promise.all` 全体がrejectされてゲームループが始まらず、`#status-display` に「画像の読み込みに失敗しました: 画像が読み込まれませんでした」と分かりやすいエラーが表示されることをスクリーンショットで確認)。
  - 学習者からの質問「`async` 関数は内部で `await` して値を取り出しているのに、なぜ関数定義の戻り値は `Promise<T>` のままなのか」に対し、「`async` を付けた関数は、中身の実装に関わらず呼び出し元から見た戻り値は必ず `Promise` になる」というJS/TSの言語仕様であることを、`await` を一切使わない `async function double(x: number): Promise<number> { return x * 2; }` の例で説明。
  - 学習者のまとめ(resolve/reject、Promisify、pending/resolved/rejectedの3状態、asyncの戻り値が必ずPromiseになる仕組み)はおおむね正確だったが、「catchが実行されるとresolvedになる」という1点を訂正。「catchが呼ばれるのはrejectされたから」であり、catch自体が新しいPromiseを作ってそれがresolvedになる場合があるとしても、元のPromiseがresolvedに変わるわけではないことを説明。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし(学習者の実装は両関数とも一発で正しく、今回はロジックバグの発見・修正ではなく型/命名/概念面のフィードバックが中心だった)。
- 新しく理解した型の概念(本人の言葉):
  - 「非同期処理でPromiseを使う時、引数に解決した時に返されるresolve、拒否された時に返されるrejectがある」
  - 「img.onload, img.onerrorなどのイベントベースの古いAPIをPromiseベースの新しいAPIに変換するPromise化(Promisify)としてimg.onload = () => {resolve(img)}, img.onerror = () => {reject(new Error())}などで包む」
  - 「Promiseの後に処理を動かしたい時は、await Promise<T> やresolveした後に実行されるPromise().then() や拒否された後に実行されるPromise().catch()などを使う」
  - 「Promiseはpending(未解決)、resolved(解決済み)、rejected(拒否)の3つの状態がある」
  - 「関数定義時asyncをつけると関数内で何を返したとしても戻り値は必ずPromiseになる Promise<>で包む必要がある」
  - (訂正済み)「catchが実行されるとresolvedになる」→ catchが呼ばれるのはrejectされた後であり、元のPromiseがresolvedになるわけではない。
- 感想: (特記事項なし)
- 次回やること: 第2マイルストーンが完了した。第3マイルストーン ステップ9(状態遷移: ゲームオーバー/リスタート)に着手する前に、計画書どおりVitestの導入(`canPlace`, `lockPiece`, `rotate`, `move`, `hardDrop`, `clearFullRows`, `calculateScore`, `loadImage`, `loadAllSprites` へのテスト、学習者が書く)を検討する。

## 2026-08-28

- マイルストーン / ステップ: (第2マイルストーン完了後、ステップ9着手前。Vitest導入とテスト・デバッグ体験)
- やったこと:
  - `npm install -D vitest` が `npm error Invalid Version:` で失敗する環境問題に遭遇。原因調査の結果、Vitest追加とは無関係に、既存の `package-lock.json` と npm(11.11.0)/Vite 8(rolldown採用)の組み合わせで、`@rolldown/binding-darwin-x64`(Linux環境では使わないはずのオプション依存)を配置しようとする処理でnpm自体がクラッシュしていることが判明。ユーザーに対処方針を確認のうえ、npmを11.19.1にアップグレード(node 24.14.1と非互換な最新12系は断念)しても再現したため、最終的に `package-lock.json` を削除して依存解決をやり直すことで解消(`package.json` 自体は無変更)。
  - `vitest`(devDependencies)と、`loadImage`(DOM APIを使う)のテストに備えて `jsdom` を追加。`vite.config.js` を `vitest/config` の `defineConfig` に切り替え、`test: { environment: 'jsdom' }` を追加。`package.json` に `typecheck` / `test`(`vitest run`) / `test:watch`(`vitest`)スクリプトを追加。
  - `src/lines.test.ts` を新規作成。`calculateScore` を題材にVitestの基本(`describe`/`it`/`expect`、`import`が必要なこと)を実演し、最初の1ケース(0行→0点)をClaudeが書いた後、残り4ケース(1〜4行消去)を学習者が一発で正しく実装。
  - `clearFullRows` のテストへ進む際、盤面組み立て用の `makeBoard(rows: boolean[])` ヘルパーをClaudeが用意(テストのセットアップ扱い)。学習者が3ケース(揃った行なし/1行揃い/複数行同時消去)を実装する過程で、期待値オブジェクトのプロパティ名タイポ(`clearedLineConut`)による自然な失敗が発生。Vitestのdiff出力(`- Expected` / `+ Received`)の読み方を説明し、学習者が「期待値の変数に `LineClearResult` の型注釈を付ける」ことでタイポを型エラーとして検出できる形に自力で修正。
  - 本題として、`clearFullRows` の `filter` 条件(`row.some((item) => item === null)`)を `!==` に反転させる意図的なバグをClaudeが仕込み、Vitestを使ったデバッグ体験を実施。①テストのdiff出力から「`clearedLineCount`は合っているが`clearedBoard`の中身が逆」という手がかりを得る→②学習者自身が `console.log(filteredBoard)` を仕込んで中間状態を可視化→③出力から「揃っている行だけが残っている」というパターンに気づく→④条件式を日本語に翻訳し、コメントに書かれた本来の意図(揃っていない行を残す)と突き合わせる→⑤学習者が `!==` → `===` の反転が原因と特定し、自力で修正・`console.log`も削除。8ケース全てパスすることを確認。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: npm 11.11.0 + Vite 8(rolldown)の組み合わせでの `npm install` クラッシュ。原因は(おそらく古いnpm/Viteバージョンの組み合わせで生成された)`package-lock.json` 側の不整合で、再生成により解消。npmバージョン変更自体は直接の解決には寄与しなかった(念のため11.19.1へは上げたままにしてある)。
- 新しく理解した型の概念 / デバッグ手法(本人の言葉ベース):
  - テスト結果を見て「`clearedBoard`の内容、`clearedLineCount`の値は正しいものが返ってきているように見えるから真偽値関係のバグ?」と自力で見立てをつけ、`console.log`による中間状態の可視化を経て「真偽値関係 `!==`/`===` が逆転している」と正しく原因を特定できた。
  - オブジェクト/配列の中身を比較するときは `toBe` ではなく `toEqual` を使う、という使い分けを実践した。
  - 期待値オブジェクトに明示的な型注釈(`const expected: LineClearResult = {...}`)を付けることで、プロパティ名のタイポを`tsc`が検出できるようになる(`toEqual`自体の引数型は緩いため、注釈なしでは検出されない)ことを体験した。
- 次回やること: 残りの関数(`canPlace`, `lockPiece`, `rotate`, `move`, `hardDrop`, `loadImage`, `loadAllSprites`)のテストを書く。その後、第3マイルストーン ステップ9(状態遷移: ゲームオーバー/リスタート)に着手する。

## 2026-08-28 (2)

- マイルストーン / ステップ: (第2マイルストーン完了後、ステップ9着手前。Vitestテストの続き)
- やったこと:
  - `calculateScore` のテストを、学習者が自発的に `it.each` を使った形に書き直し。前回教えた配列形式(`%i`プレースホルダー)とは別に、オブジェクト配列 + `$プロパティ名` というテスト名展開の書き方を自力で見つけて正しく使えていた。
  - `package.json` に学習者自身が `"debug": "vitest run --testTimeout=0"` を追加(VS Codeデバッガーでブレークポイント使用時、Vitestのデフォルトタイムアウトで強制終了しないようにする実用的な工夫)。特定ファイルだけ実行する方法(`npm test -- <ファイル名>`)についても質問があり回答。
  - `src/collision.test.ts` を新規作成。`makeBoard`(lines.test.tsと同型のヘルパー)と、`Partial<ActivePiece>` の overrides を受け取る `makePiece` ヘルパーをClaudeが用意。
  - `canPlace` のテストを学習者が実装。境界値(左/右/下/左下/右下の5方向、盤面内側も含め)を`it.each`のオブジェクト形式で網羅。最初は「盤面内」のケースが余裕を持った位置(x:1,y:1)のみだったため、範囲チェックの不等号(`<`/`<=`)を間違えるバグを検出しやすくする目的で「盤面ギリギリに収まる位置」(x:2,y:2)も追加するようClaude側から提案し、学習者が追加。全20ケースパス。
  - `lockPiece` のテストを学習者が実装。1・2番目(盤面への焼き込み結果、期待値は`toEqual`で2次元配列を直接記述)は一発で正しく実装。3番目(イミュータブル性の確認)で `const oldBoard = board; ... expect(oldBoard).toBe(board)` という、参照が同じであることしか確認できておらず実質何もテストしていないコードを学習者が書いたため、Claudeが `lockPiece` を一時的に破壊的な実装(`board`を直接書き換える)に差し替えて実演し、そのテストが検出できずに通ってしまうことを可視化。学習者が `structuredClone` でのディープコピー+`toEqual`比較に自力で修正。
  - 再度破壊的な実装で確認したところ、今度も通ってしまう(検出できない)という第2の問題が発覚。原因は `describe` 直下で `board`/`piece` を `const` として3つの `it` 全体で共有していたため、2番目のテストの実行(破壊的な`lockPiece`呼び出し)による副作用が3番目のテストに漏れ出していたこと(テストの独立性の欠如)。学習者は最初「上の変数宣言が飛ばされる」という誤った仮説を立てたが、Claudeが実行順序と共有状態の観点から訂正。`beforeEach` の使い方(`let`宣言+`beforeEach`内での再代入)を説明し、学習者が `board`/`piece` を`beforeEach`で毎回作り直す形に書き換え。再度破壊的な実装で確認し、今度は正しく検出(1件失敗)されることを確認してから、元の非破壊的な実装に戻し、全23ケースパスを確認。
  - 各所に残っていた `TODO(human)` コメントの残骸をClaudeが都度整理。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - JS由来: `const oldBoard = board;` は同じ配列への参照コピーであり、`toBe`(参照比較)と組み合わせても再代入されない限り常にtrueになる、というテスト側の実装ミス。
  - JS由来: `describe` 直下で共有した可変なテストデータに対し、あるテストの副作用(このケースでは意図的に仕込んだ破壊的な実装)が後続のテストの結果に影響する、というテスト間の独立性の問題。`beforeEach` で各テストごとにデータを作り直すことで解消することを実演で確認した。
- 新しく理解した型の概念 / テスト手法(本人の言葉ベース):
  - `it.each` のオブジェクト配列 + `$プロパティ名` によるテスト名展開を自力で発見・活用。
  - 「テストが通る」ことと「そのテストが実際にバグを検出できる」ことは別問題であるという気づき(意図的な破壊的実装への差し替えによる実演を経て)。
  - `structuredClone` によるディープコピーと、`toBe`(参照比較)/`toEqual`(内容比較)の使い分け。
  - `beforeEach` によるテストの独立性の確保(各 `it` 実行前に毎回まっさらな状態を用意する)。
- 次回やること: 残りの関数(`rotate`, `move`, `hardDrop`, `loadImage`, `loadAllSprites`)のテストを書く。その後、第3マイルストーン ステップ9(状態遷移: ゲームオーバー/リスタート)に着手する。

## 2026-09-01

- マイルストーン / ステップ: (第2マイルストーン完了後、ステップ9着手前。Vitestテストの続き)
- やったこと:
  - `board`(`const`)の中身が書き換えられた件について質問があり、「`const`は再代入を禁止するだけで中身の変更は禁止しない」「実際に防いでいたのは`Board`型(`ReadonlyArray`)によるコンパイル時の型チェックであり、`as any`はその型チェックを迂回しただけ」という、`const`とイミュータビリティ、型消去(型情報は実行時に残らない)の違いを整理して回答。「中身の書き換えと再代入の違い」について、ラベルと実体のたとえ、プリミティブ型とオブジェクト型の違いも含めてさらに深掘りして説明。
  - `rotation.ts`(`rotateOffset`, `getPieceShape`)に残っていた`TODO(human)`コメントの残骸を整理。
  - `collision.test.ts` に `rotate` のテストを追加。Tピース(3x3ボックス、回転で形が変わる)を使用し、事前にNode.jsスクリプトで各rotationの占有座標を計算・検証してからTODOを設置。①十分なスペースがあれば`rotation`が0→1→2→3→0と循環すること、②既存ブロックとの重なりで回転できない場合はキック無しで元の`piece`を返すこと、の2ケースを学習者が一発で実装。`expect(piece = rotate(...))`のように代入をexpectの引数に埋め込むスタイルだったため、「更新」と「検証」を分離する形(`piece = rotate(...); expect(piece)...`)に直すよう提案し、学習者が修正。
  - `move` のテストを学習者が実装(`it.each`で6方向の「置ける」ケース、6方向の「置けない」ケースを網羅)。学習者から「そのまま返ってくることを確認する時、`structuredClone`は要らないのか(`lockPiece`の教訓を踏まえた質問)」という良い質問があり、`move`を一時的に「置ける場合に引数の`piece`を直接書き換える」破壊的実装に差し替えて実演。結果、「置けないケース」は`move`が`piece`に触れないため元々安全だが、「置けるケース」は`toEqual`が最終的な値しか見ないため、内容さえ一致すれば新規オブジェクトか書き換えかを区別できず検出できない、という`lockPiece`の時とは別種の盲点が判明。テストの目的次第で必要な厳密さが変わる、という整理をして次に進んだ(追加のイミュータブル性テストは今回は見送り)。
  - `hardDrop` のテストを学習者が実装。事前にNode.jsスクリプトで座標(空盤面→y:2に着地、y=3行が埋まった5行盤面→y:1で停止)を検証してからTODOを設置。`PIECE_BOX_SIZE["O"]`を使って期待値をハードコードせず計算する工夫を学習者が自発的に実施。全39ケースパス。
  - 各所の`TODO(human)`コメント残骸をClaudeが都度整理。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし。
- 新しく理解した型の概念(本人の言葉ベース):
  - `const`は再代入の禁止であり、中身(オブジェクト・配列)の書き換えとは別物であること。
  - `ReadonlyArray`などの`readonly`はTypeScriptのコンパイル時チェックに過ぎず、実行時にはJavaScriptの配列はミュータブルなままであること(`as any`で型チェックを迂回すれば書き換えられる)。
  - `toEqual`(内容比較)は「新しく作られた値か、既存の値を書き換えたものか」を区別できないという限界があること。
- 次回やること: `sprites.ts` の `loadImage`/`loadAllSprites` のテストを書く(jsdom環境でのDOM APIテスト)。その後、第3マイルストーン ステップ9(状態遷移: ゲームオーバー/リスタート)に着手する。

## 2026-09-01 (2)

- マイルストーン / ステップ: (Vitestテストの続き。全純粋関数へのテスト完了)
- やったこと:
  - 「jsdom環境でのテストと今までのテストで違うところはあるか」との質問に、①ブラウザAPI依存の有無(純粋データ操作 vs DOM API)、②同期/非同期(Promiseを返す関数のテストでは`async`/`await`が要る)、③失敗ケースの書き方(`rejects`マッチャー)、の3点を説明。
  - `sprites.ts` の `loadImage`/`loadAllSprites` のテストに着手する前に、jsdom環境で実際に `new Image()` が動くかをClaudeが検証。`environment: 'jsdom'` だけの設定では `onload`/`onerror` がどちらも発火せずタイムアウトすることが判明。`environmentOptions.jsdom.resources = 'usable'` も試したが解消せず、jsdomが `<img>` タグの実際の画像デコード自体をサポートしていないという既知の制限であることが分かった(設定変更は元に戻した)。
  - 方針を「`Image` をテスト用のモック(`MockImage`)に差し替える」に変更。`src` に `"fail"` という文字列が含まれていたら `onerror`、それ以外なら `onload` を(`queueMicrotask`で非同期に)発火するモッククラスと、`vi.stubGlobal`/`vi.unstubAllGlobals` によるセットアップ(`beforeEach`/`afterEach`)をClaudeが用意。モックが正しく機能するかも仮実装で事前検証してから、学習者にTODOとして委ねた。
  - `loadImage` の2ケース(正常系: `.src` プロパティの確認、異常系: `rejects.toThrow()`)と、`loadAllSprites` の1ケース(`SPRITE_PATHS` の全キーが結果オブジェクトに存在すること、`.sort()`してから`toEqual`で順序非依存に比較)を学習者が一発で正しく実装。全42ケースパス。
  - これで計画していた全純粋関数(`calculateScore`, `clearFullRows`, `canPlace`, `lockPiece`, `rotate`, `move`, `hardDrop`, `loadImage`, `loadAllSprites`)へのVitestテストが完了。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: jsdomは`<img>`要素の実際の画像読み込み(デコード)をサポートしておらず、`Image`の`onload`/`onerror`が永久に発火しない。これは設定では回避できず、モック(テストダブル)への差し替えが必要だった。
- 新しく理解した概念(本人の言葉ベースではなくClaude起点の説明が中心だったため要約):
  - モック(テストダブル)の考え方: テスト対象が依存する不確実な外部要素(今回はブラウザのImage API)を、テストが完全にコントロールできる偽物に差し替えることで、対象のロジック自体を安定してテストできるようにする手法。
  - `vi.stubGlobal`/`vi.unstubAllGlobals` によるグローバルオブジェクトの差し替えとクリーンアップ。
- 次回やること: 第3マイルストーン ステップ9(状態遷移: ゲームオーバー/リスタート)に着手する。`GameState`(判別可能ユニオン)を実際に使い始め、`switch`の網羅チェックも活用する。

## 2026-09-02

- マイルストーン / ステップ: 9. 状態遷移(ゲームオーバー/リスタート)(進行中)
- やったこと:
  - セッション開始時に `work-log.md` / `tetris-ts-learning-plan.md` を確認し、現状(第2マイルストーン完了、ステップ9未着手)を把握。`main.ts` を読み返し、`board`/`current`/`score` がバラバラのローカル変数で管理され、ゲームオーバー時は「盤面を空にしてリセットするだけ」の仮実装になっていることを確認。
  - ステップ9の進め方として、まず`ready`/`playing`/`paused`/`gameover`全体の配線を一度に変えるのではなく、最初の一手としてステップ9の核心である「ゲームオーバー判定」を`GameState`(判別可能ユニオン)を組み立てる小さな純粋関数に切り出すことから着手する方針とした(残りのready→playing、playing↔paused、gameover→readyの配線は次回以降)。
  - `src/state.ts` を新規作成。`spawnOrGameOver(board, newPiece, score): GameState`の型シグネチャと`TODO(human)`を設置し、学習者への実装依頼(Learn by Doing)を発行。`canPlace`の結果で`playing`バリアント(`board`/`current`/`score`を持つ)と`gameover`バリアント(`score`のみ)のどちらを返すかを分岐する内容。実装待ちの状態でセッション終了。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし
- 新しく理解した型の概念: (該当なし。`spawnOrGameOver`の実装は次回セッションに持ち越し)
- 次回やること:
  - `spawnOrGameOver`の実装を確認し、`GameState`の組み立て方(バリアントごとに持つプロパティが違う点)を中心にフィードバックする。
  - `main.ts`に`state: GameState`を導入し、`switch(state.kind)`による分岐(`ready`の待機画面、`playing`の既存ロジック、`paused`の一時停止、`gameover`の画面表示とリスタート)に置き換える配線を進める。`default`節での`satisfies never`による網羅チェックも組み込む。

## 2026-09-02 (2)

- マイルストーン / ステップ: 9. 状態遷移(ゲームオーバー/リスタート)(完了)
- やったこと:
  - `spawnOrGameOver`の実装(学習者が一発で正しく実装)を確認。ロジックは`canPlace`による早期リターンで`gameover`/`playing`を組み立てる正しい構造だった。`{ score: score }`という書き方に対し、プロパティ名と変数名が一致する場合の**プロパティショートハンド**(`{ score }`)をフィードバックし、学習者が修正。`TODO(human)`コメントの残骸はClaudeが整理。
  - `main.ts`を`GameState`ベースに書き換え(Claudeが実装、機械的な配線として位置づけ)。`board`/`current`/`score`のバラバラな変数を`state: GameState`(`ready`/`playing`/`paused`/`gameover`)に統合。`loop`関数を`switch(state.kind)`で分岐し(各状態の描画、`playing`での自然落下・ロック・ライン消去・スコア加算・`spawnOrGameOver`呼び出し)、`default`節で`state satisfies never`による網羅チェックを設置。`keydown`ハンドラも`state.kind`に応じて分岐(`ready`/`gameover`でEnterキーによる開始・リスタート、`paused`とのPキートグル、`playing`中の既存の移動・回転・ドロップ操作)する形に配線。`lastFallTime`は`GameState`(ドメイン状態)に含めず、引き続き`main()`内のローカル変数(タイミング管理という実装詳細)として保持する設計とした。
  - Playwrightで動作確認。`node_modules`にPlaywrightが見当たらなかったため一時的に`npm install --no-save playwright`でインストールし(`package.json`/`package-lock.json`は無変更)、`npx playwright install chromium`後、スクリプトでready→Enter→playing→P→paused→P→playing→(ハードドロップ連打で積み上げ)→gameover→Enter→ready(リスタート、新しい盤面・スコア0)の一連の遷移をスクリーンショットで確認。コンソールエラーなし。確認後、一時インストールしたPlaywrightパッケージとスクリプトは削除。
  - `never`による網羅チェックを実際に体感する実験を実施。`types.ts`の`GameState`に仮のバリアント`{ kind: "countdown"; secondsLeft: number }`を追加して`tsc --noEmit`を実行し、16件のエラーが出ることを確認。本命は`loop`内`switch`の`default`節`state satisfies never`での1件(`TS1360`)で、残り15件は`keydown`ハンドラが`switch`ではなく`if`の早期リターン連鎖で書かれているため、TypeScriptに「ここでバリアントを使い切った」という保証がなく、`countdown`が型に残り続けたことによる副次的なエラーだと解説。実験後、仮のバリアントを削除して`tsc --noEmit`が通ることを再確認。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: 過去のセッションで導入したはずのPlaywright(`node_modules`)が今回の環境には存在せず、動作確認のたびに一時インストールが必要だった。
- 新しく理解した型の概念(本人の言葉):
  - 「判別可能ユニオンで状態遷移を実装する時、実装漏れがないようにneverで網羅チェックを行うと良い」
  - 「プロパティ名と代入する変数名が一致している時、プロパティショートハンドという省略記法が使える ex) { score: score } → { score }」
- 次回やること: 第3マイルストーン ステップ10(localStorage + unknown の検証 + ジェネリクス)に着手する。壊れたJSONを入れてもクラッシュしないこと、型ガードを引数に取る汎用関数`loadFromStorage<T>`を自力で定義することが完了条件。

## 2026-09-02 (3)

- マイルストーン / ステップ: 10. localStorage + unknown の検証 + ジェネリクス(完了)
- やったこと:
  - `src/storage.ts` を新規作成。保存対象は計画書通りシンプルに「ハイスコア(`number`)を1件」に決定(`saveToStorage<T>`との対比教材は計画書通り見送り)。
  - `isValidHighScore(value: unknown): value is number` を学習者が実装。`value is T` という型述語を自力で書く初めての経験。ガード節を5つ並べる構造自体は良かったが、`Number.isFinite(value)` の否定(`!`)が抜けており、条件の向きが逆転して`100`や`0`のような正常な値まで`false`になるロジックバグがあった。`tsc --noEmit`は型としては通ってしまう(booleanを返す関数として正しいため)ため、Node.jsトレーススクリプトで実際に値を渡して問題を可視化し、学習者が自力で`!`を追加して修正。
  - `loadFromStorage<T>(key, isValid): T | null` を学習者が実装。既製のジェネリクス(`ReadonlyArray<T>`など)を「使う」経験はステップ4までに済んでいたが、`<T>`を自分で宣言して汎用関数を「作る」のは今回が初めて。初回実装は、`isValid`が`false`を返した場合に`throw`し、それを`catch`ブロックが捕まえて別のエラーを再度`throw`する構造になっており、コメントに明記した「いずれの場合もnullを返す(呼び出し元をクラッシュさせない)」という仕様に反していた(検証失敗のケースでも例外が呼び出し元まで飛ぶ)。Node.jsトレーススクリプトで壊れたJSON・検証失敗の両方が例外を投げてしまうことを可視化し、学習者がtry内の`throw`を`return null`に修正。
  - 型面のフィードバックとして、`JSON.parse(data)`の戻り値が標準ライブラリの型定義上`any`であること(ステップ7で学んだ`Array(n)`と同型の罠)を指摘し、学習者が`const value: unknown = JSON.parse(data);`と明示的な型注釈を追加して修正。
  - `main.ts`にハイスコア機能を配線(Claudeが実装、機械的な配線)。起動時に`loadFromStorage`でハイスコアを読み込み(`?? 0`でフォールバック)、`ready`/`gameover`画面に表示、ゲームオーバーになった瞬間にスコアがハイスコアを上回っていれば`localStorage`に保存する処理を追加。
  - Playwrightで動作確認(一時的に`npm install --no-save playwright`でインストールし、確認後アンインストール。`package.json`/`package-lock.json`は無変更)。localStorage空→`High Score: 0`、正常な値(500)を直接セット→正しく反映、壊れたJSON文字列をセット→クラッシュせず`0`にフォールバック、不正な型(文字列)をセット→クラッシュせず`0`にフォールバック、の4パターンをスクリーンショットで確認。コンソールエラーなし。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - TS由来: `isValidHighScore`で`Number.isFinite(value)`の否定を忘れ、条件の向きが逆転するロジックバグ。型チェックは素通りする(戻り値の型としては正しいため)。
  - TS由来/設計理解: `loadFromStorage<T>`の初回実装で、検証失敗時に`throw`→`catch`で再`throw`という構造になり、「呼び出し元をクラッシュさせない」という関数の仕様(コメントに明記)と実装が矛盾していた。ここでも型チェックは全パスで`T | null`を満たすため素通りする。
  - TS由来: `JSON.parse`の戻り値が標準ライブラリ定義上`any`であるため、`unknown`型注釈を明示しないと、以降その値に対する型チェックが実質的に無効化される。
  - 環境由来: 今回もPlaywrightが`node_modules`に見当たらず、動作確認のたびに一時インストールが必要だった。
- 新しく理解した型の概念(本人の言葉):
  - 「返り値として value(変数名) is number(型) のようにしておくと、booleanを返しTypeScriptにもその結果を伝え型注釈まで行ってくれる(型述語)」
  - 「try-catch文のtryブロックで新たにErrorをThrowすると意図せずcatchブロックに移行してしまう可能性があるため注意」
  - 「any値を返す関数は型チェックを素通りする危険性があるためunknownなどで型注釈しておく」
- 次回やること: 第3マイルストーン ステップ11(Dev Container化)に着手する。計画書4.2の既知の落とし穴(`node_modules`をバインドマウントに置かない、`server.watch.usePolling`でのファイル監視回避、`vite --host`、`forwardPorts`への5173追加)に先回りして対処する。

## 2026-09-03

- マイルストーン / ステップ: 11. Dev Container 化(設定完了、VS Codeでの実機確認待ち)
- やったこと:
  - セッション開始時に `work-log.md` / `tetris-ts-learning-plan.md` を確認し、現状(ステップ10完了、ステップ11未着手)を把握。
  - 以前保留していた「ステップ11の作業拠点を `~/projects/ts-tetris`(WSL2ネイティブ)にするか `/mnt/d/.../ts-tetris` にするか」をユーザーに確認し、計画書4.2の落とし穴(Windows側バインドマウントのI/O遅延)を避けるため WSL2ネイティブ側継続で決定。
  - Dev Container化は計画書2.2節の「Claudeが書いてよいもの(設定ファイル)」に該当するため、`TODO(human)`は設置せずClaudeが実装。
  - `.devcontainer/devcontainer.json` を新規作成。ベースイメージは計画書の参考どおり `mcr.microsoft.com/devcontainers/typescript-node:22`。`node_modules`をバインドマウントに置かない対策として、`mounts`で名前付きボリューム(`tetris-ts-node_modules`)を`/workspace/node_modules`にサブマウントで重ねる構成にした。`forwardPorts: [5173]`も設定。
  - `vite.config.js`に、`DEVCONTAINER`環境変数(`containerEnv`で設定)が立っている場合のみ`server.watch.usePolling`を有効化する分岐を追加(WSL2ネイティブでの直接開発時にはポーリングを持ち込まない設計)。なお`vite --host`相当(`server.host: true`)は既存設定で対応済みだったため変更不要だった。
  - `@devcontainers/cli`を`npx --yes`で一時的に使い(グローバルインストールなし)、実際にコンテナをビルド・起動して検証。
    1. 初回`up`で`npm install`が`EACCES`で失敗。名前付きボリュームは初回作成時に`root`所有になり、`typescript-node`イメージの既定ユーザー`node`(非root)から書き込めないという、計画書に無かった落とし穴を発見。ボリュームを一旦削除し、`postCreateCommand`を`sudo chown node:node /workspace/node_modules && npm install`に修正して解消。
    2. 再度`up`で`npm install`成功(83パッケージ)。`npm run typecheck`(`tsc --noEmit`)、`npm test`(vitest、全42ケース)がコンテナ内で成功することを確認。
    3. `npm run dev`をバックグラウンドで起動し、コンテナ内部から`curl`で200 OKを確認。ホストの`localhost:5173`からは接続できなかったが、原因は`devcontainer up` CLIが`docker run`時に`-p`(ポート公開)を付けないため(`forwardPorts`はVS Code拡張機能がSSH越しにトンネルする仕組みであり、CLI単体の制約と判明)。実運用(VS Code経由)では問題にならない。
    4. ホスト側から`src/main.ts`に1行追記し、コンテナ内Viteのログに`page reload src/main.ts`が出ることを確認。`usePolling`によりバインドマウント越しのinotify不達を正しく回避できていることを実証。追記は`git checkout --`で元に戻した。
    5. 検証用に起動したコンテナは`docker rm -f`で削除。`tetris-ts-node_modules`ボリュームは今後の実運用での再利用のため残した。
  - 検証中、コンテナ内npm(v10.9.8)がホストの`package-lock.json`(npm v11系で生成、`libc`フィールドを含む)を古い形式で書き換える副作用が発生していることに気づき、`git checkout -- package-lock.json`で破棄して復元。
  - `README.md`の「## 現在の状態」をステップ11の状況(設定完了・VS Code実機確認待ち)に更新。「作業拠点」の記載も、`/mnt/d`側を別途保持する方針から、WSL2ネイティブ側継続の決定に合わせて更新。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: 名前付きボリュームの初期所有者が`root`になり、非rootのコンテナユーザーから書き込めない(`EACCES`)。`postCreateCommand`内での`sudo chown`が定石。
  - 環境由来: `devcontainer up` CLI単体では`forwardPorts`が実際のDockerポート公開(`-p`)に反映されない。VS Code拡張機能を使う実運用では拡張機能側がトンネリングするため問題にならないが、CLI単体での検証時の制約として要注意。
  - 環境由来: バインドマウントはファイル内容を双方向に共有するため、コンテナ内のツール(異なるバージョンのnpm)がホスト側ファイル(`package-lock.json`)に意図しない副作用を及ぼしうる。
- 新しく理解した型の概念: (該当なし。今回は環境構築・検証が主眼)
- 次回やること:
  - ユーザーがVS Codeで「Reopen in Container」を実行し、①ブラウザで`localhost:5173`が開けること、②`.ts`ファイルで補完(IntelliSense)が効くこと、の2点を実機確認する。確認が取れ次第ステップ11を完了とする。
  - その後、第3マイルストーン ステップ12(GitHub Actions で CI)に着手する。`tsc --noEmit`と`vitest run`を独立ステップとして回すワークフローを用意する。コンテナ内npmとCI側npmのバージョン差による`package-lock.json`書き換えの副作用にも注意する。

## 2026-09-03 (2)

- マイルストーン / ステップ: 11. Dev Container 化(完了、第3マイルストーン ステップ11完了)
- やったこと:
  - ユーザーがVS Codeで「Reopen in Container」を実行し、補完(IntelliSense)・シンタックスハイライトが効くことを実機確認。CLI検証(前回セッション)と合わせてステップ11の完了条件(コンテナ内でHMRが動き、補完も効く)を満たした。
  - ユーザーからの質問「`.devcontainer`(`devcontainer.json`)とDockerfile、docker-compose.ymlの違いは何か」に回答。Dockerfileはイメージの作り方(レシピ)、docker-compose.ymlは複数コンテナを協調動作させる構成ファイル、devcontainer.jsonはコンテナ定義(`image`/`build.dockerfile`/`dockerComposeFile`のいずれか1つを参照)を土台に、エディタ側の開発体験(拡張機能・ポート転送・`postCreateCommand`)を追加するメタ設定、という役割の違いを整理して説明。今回のプロジェクトは既製イメージ(`typescript-node:22`)を`image`で直接指定するシンプルな構成のため、Dockerfileもdocker-compose.ymlも使っていない点を確認した。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし
- 新しく理解した概念(本人の言葉ベースではなくClaude起点の説明が中心だったため要約):
  - Dockerfile(イメージの作り方) / docker-compose.yml(複数コンテナの協調) / devcontainer.json(エディタ向けメタ設定、前2つのどれかを参照する)という役割分担。
- 次回やること: 第3マイルストーン ステップ12(GitHub Actions で CI)に着手する。`tsc --noEmit`と`vitest run`を独立ステップとして回すワークフローを用意する。コンテナ内npmとCI側npmのバージョン差による`package-lock.json`書き換えの副作用にも注意する。

## 2026-09-03 (3)

- マイルストーン / ステップ: 12. GitHub Actions で CI(完了、第3マイルストーン完了、全ステップ完了)
- やったこと:
  - `.github/workflows/ci.yml` を新規作成(計画書2.2節の「設定ファイル」に該当するためClaudeが実装)。計画書8節どおり `tsc --noEmit` と `vitest run` を独立したステップとして構成。`actions/setup-node@v4` でローカル環境と同じ Node 24系を指定し、`npm ci`(`package-lock.json`に厳密に従うインストール)を使用。
  - push前に、ローカルでCIと同条件を再現して検証。`npm ci`(既存`node_modules`を洗い替え)を実行し、ホスト側npm(11.19.1)を使ったため今回は`package-lock.json`が変化しないことを確認(ステップ11で踏んだコンテナ内npmとの差異問題は今回は発生せず)。続けて`npx tsc --noEmit`、`npx vitest run`(全42ケース)がいずれもローカルで成功することを確認してからコミット・プッシュした。
  - `gh` CLIが環境に無く、リポジトリも非公開のためAPI(`api.github.com/.../actions/runs`)経由での確認もできなかった(`404`)。ユーザーにGitHub上のActionsタブでの目視確認を依頼し、実際に緑チェック(成功)になったことを確認。
  - これで計画書の第1〜第3マイルストーン全12ステップ(ステップ1〜10、8.5、11、12)が完了した。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: `gh` CLI未導入・リポジトリ非公開のため、CIの実行結果をツール側から直接確認する手段がなく、ユーザーによるブラウザでの目視確認に頼った。
- 新しく理解した概念: (該当なし。CI設定はClaudeが実装する環境整備寄りのタスクで、型の学習要素は無し)
- 次回やること: 計画書に定義された全ステップが完了した。計画書6.1節にある「全マイルストーン完了後の任意課題」(SRSのウォールキックテーブル、ゴーストピース、ホールド機能、T-Spin判定、対戦機能、凝ったアニメーション/サウンドなど)に進むかどうかをユーザーと相談する。

## 2026-09-03 (4)

- マイルストーン / ステップ: (計画書の更新のみ。第4マイルストーン新設)
- やったこと:
  - ユーザーから、全12ステップ完了後の追加課題として3フェーズの依頼を受けた。今回は依頼どおり計画書の更新のみを行い、実装は着手していない。
  - `tetris-ts-learning-plan.md` に「10. 第4マイルストーン: 開発ワークフローの強化」を新設し、以下をステップ13〜17として追記。
    - フェーズ1(ステップ13): ESLint + Prettier 導入。Flat Config、typescript-eslintの型情報ベースルール(`recommendedTypeChecked`)、`eslint-config-prettier`によるPrettierとの競合解消、CIへのlintステップ追加。既存コードのlintエラーは自動修正で一括で潰さず、ルールごとに「なぜあるか」を説明した上で1ルールずつ対応方針(自動修正/手動修正)を学習者に判断させる、という進め方の注意を明記。
    - フェーズ2(ステップ14〜16): PRベースの開発フロー体験(branch protectionはユーザーがGitHub画面から設定、Claudeは手順説明のみ)→リポジトリ公開(公開前の秘匿情報チェックはClaudeが実施、README本文は学習者が自分の言葉で書き、Claudeは構成案とガイドのみ提示)→GitHub Pagesへのデプロイ(`vite.config.js`のbase設定、deploy用ワークフロー追加、スプライト画像のサブパス配信確認)。各段階で一度止まって確認を取る進め方を明記。
    - フェーズ3(ステップ17): `noUncheckedIndexedAccess`の導入。既存プロジェクトで踏んだ「配列範囲外アクセスでの実行時TypeError」「添字アクセスの型がnumberのまま」という問題(ステップ5, 7)を型で守る学習と位置づけ。まずフラグの説明→エラーをファイル/パターンごとに分類して提示→パターンごとにTODO(human)方式で学習者に修正させる(最初の1パターンのみClaudeが手本)、という進め方と、特に見るべき箇所(`collision.ts`, `lines.ts`, `rotation.ts`)を明記。「重すぎると判断すれば見送るのもアリ」という撤退条件も明記。
  - `work-log.md` の進捗サマリー表にステップ13〜17を「未着手(計画書のみ追加)」として追加。
  - `package.json` に `eslint` / `typescript-eslint` / `prettier` / `eslint-config-prettier` の devDependencies が既に追加されていることに気づき、ユーザーに意図した変更か確認中。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし
- 新しく理解した型の概念: (該当なし。計画書更新のみ)
- 次回やること: ユーザーの応答を待ち、フェーズ1(ステップ13: ESLint + Prettier導入)に着手する。

## 2026-09-03 (5)

- マイルストーン / ステップ: (第4マイルストーン ステップ13着手前の後片付け)
- やったこと:
  - `package.json`/`package-lock.json` に ESLint / Prettier 関連の devDependencies(`@eslint/js`, `eslint`, `eslint-config-prettier`, `prettier`, `typescript-eslint`)が既に追加されていた件をユーザーに確認したところ、ユーザー自身が追加したものではなく、編集前のプロンプト(取り消された分岐)で実行された `npm install` の副作用がファイルシステムに残っていたと判明。
  - `eslint.config.js` / `.prettierrc` 等の設定ファイルが存在しないこと(実装は行われていない)を確認した上で、`git checkout -- package.json package-lock.json` で該当ファイルを元に戻し、`node_modules` を `rm -rf` してから `npm ci` でクリーンインストールし直して整合させた。`tsc --noEmit` / `vitest run`(全42ケース)が引き続き成功することを確認。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: プロンプト編集(取り消された分岐)で実行済みのシェルコマンドの副作用は、会話の巻き戻しでは自動的に取り消されず、ファイルシステムに残り得る。今回のように `git diff` で気づける変更ならまだしも、`.gitignore` 対象(`node_modules` など)の変化は `git status` だけでは検知できない点に注意が必要。
- 新しく理解した型の概念: (該当なし)
- 次回やること: フェーズ1(ステップ13: ESLint + Prettier導入)にあらためて着手する。

## 2026-09-05

- マイルストーン / ステップ: 13. ESLint + Prettier 導入(実装完了、学習者の「新しく理解した概念」確認待ちのままセッション終了)
- やったこと:
  - `eslint` / `@eslint/js` / `typescript-eslint` / `prettier` / `eslint-config-prettier` / `globals` を devDependencies に追加(計画書2.2節の「設定ファイル」領域としてClaudeが実装)。
  - `eslint.config.js`(Flat Config)を新規作成。`src/**/*.ts` に対しては typescript-eslint の型情報ベースルール(`recommendedTypeChecked`、`projectService: true`)を適用し、`*.config.js`(`vite.config.js`)には `globals.node` を割り当てて `process` 未定義エラーを解消。`eslint-config-prettier` を末尾に適用してPrettierとのルール競合を無効化。
  - `.prettierrc`(デフォルト設定のまま。既存コードがダブルクォート/セミコロンありでPrettierのデフォルトと一致していたため変更なし)、`.prettierignore`(`node_modules`/`dist`/`package-lock.json`/`*.md`を除外。学習ログ・計画書のMarkdownは自動整形すると意図しない差分が入るリスクがあるため対象外にした)を新規作成。
  - `package.json` に `lint` / `lint:fix` / `format` スクリプトを追加。
  - 初回の `npx eslint .` で6件のエラー(4ルール、4ファイル)を検出。計画書の進め方どおり、自動修正で一括で潰さず、まず「ルール別・ファイル別の一覧表」を作成して各ルールの趣旨(型チェックの穴の検出、意図的な未使用変数の扱い、Promiseの投げっぱなし防止)を説明したうえで、対応方針をルールごとに学習者に判断させた(AskUserQuestionで3問同時に確認)。
    1. `@typescript-eslint/no-unsafe-assignment` / `no-unsafe-return`(`lines.ts:25` の `[...Array(clearedLineCount)]`、`collision.test.ts:94` の `[...Array(rotationNum)]`): 学習者は「`Array.from` に書き換える」を選択。ステップ7で学んだ「`Array(n)` は型注釈があっても実体は `any[]`」という罠が、ESLintのルールとして機械的に検出されることを実演した形。`Array.from({length: n}, callback)` に書き換えて解消。
    2. `@typescript-eslint/no-unused-vars`(`lines.ts` の未使用コールバック引数 `_`、`storage.ts` の `catch (error)`): 学習者は「コード側で書かない形にする」を選択。`lines.ts` は引数自体を省略(`.map(() => ...)`)、`storage.ts` は catch の引数省略構文(`catch { ... }`)に変更して解消。
    3. `@typescript-eslint/no-floating-promises`(`main.ts` の `main();`): 学習者は「`main().catch(...)` にする」を選択。`main()` 内部は既に `try/catch` で完結している設計だが、ESLintは静的にそこまで保証できないため警告していた点を確認した上で、`main().catch((error: unknown) => { console.error(error); });` に変更。
  - Prettier(`npx prettier --check .`)で16ファイルにフォーマット差分(インデント幅の不統一など、意味を変えない差分)を検出。1ファイル(`types.ts`)でdiffをプレビューして安全を確認してから `--write` で一括整形。
  - `.github/workflows/ci.yml` に `npx eslint .` と `npx prettier --check .` を、既存の `tsc --noEmit` / `vitest run` とは独立したステップとして追加。
  - `npx tsc --noEmit` / `npx eslint .` / `npx prettier --check .` / `npx vitest run`(全42ケース)がすべてローカルで成功することを確認。
  - ステップ13の完了条件(`lint`/`lint:fix`/`format`スクリプトが動き、CIに独立したlintステップがある。既存コードのlintエラーがルールごとに判断され解消されている)は満たしたが、計画書9節の「新しく理解した型の概念を一言で言えなければステップ未完了」の確認(学習者への質問)への回答を得る前にセッションが終了した。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし。
- 新しく理解した型の概念: (未確認。次回セッション冒頭で学習者に確認すること)
- 次回やること:
  - まず学習者に「ステップ13で新しく理解した概念」を一言で聞き、回答が得られたらこのエントリに追記した上でステップ13を完了扱いにする(進捗サマリー表の更新も含む)。
  - その後、第4マイルストーン ステップ14(PRベースの開発フローを一度体験する)に着手する。

## 2026-09-05 (2)

- マイルストーン / ステップ: 13. ESLint + Prettier 導入(devcontainer上での動作確認)
- やったこと:
  - ユーザーがdevcontainer上で `npm run lint` / `npx prettier --check .` を実行したところ失敗。エラーは `ESLint: 10.9.1`(ホスト側は`10.10.0`)という表示と `Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@eslint/js' imported from /workspace/eslint.config.js`、および `npx prettier` が未インストールパッケージのダウンロード確認で止まる、というもの。
  - 原因を調査し、`.devcontainer/devcontainer.json` の `mounts`(`node_modules`を名前付きボリューム`tetris-ts-node_modules`にマウントする設定、ステップ11でWindows側バインドマウントのI/O遅延を避けるために採用)により、ホスト(WSL2ネイティブ)側の`node_modules`とコンテナ内の`node_modules`が完全に別実体であることが判明。今回のセッションでeslint/prettier関連パッケージをホスト側に`npm install`していたが、それはコンテナ内のボリュームには一切反映されていなかった。`postCreateCommand`の`npm install`はコンテナ「作成時」にのみ自動実行される仕組みのため、既存のコンテナ(既存のボリューム)にはpackage.jsonの変更が自動反映されない、という構造的な理由も併せて説明した。
  - 対処法として、devcontainer内のターミナルで`npm install`(`npm ci`ではなく。ステップ11で踏んだ名前付きボリューム初回作成時の`root`所有権問題を`npm ci`によるnode_modules再作成で再度踏む可能性を避けるため)を実行するようユーザーに提案。実行後、正常に動作することを確認。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: Dev Containerの`node_modules`名前付きボリューム分離という設計(計画書4.2節、ステップ11)の副作用として、ホスト側でのnpm install/依存追加が既存のコンテナ内ボリュームには反映されない。依存関係を変更した際は、コンテナ内でも改めて`npm install`を実行する必要がある。
- 新しく理解した概念(本人の言葉 + 深掘りのやり取り):
  - 「ESLintはコードのルールを保っているかの品質チェック」「Prettierはコードの見た目を整える」「Array(n)はany型で危険なためArray.fromで代用」
  - 上記に加え、「`Array(n)`は`any[]`とわかったが`Array.from`は何型を返すのか、`typeof`で確かめようとしたが両方`"object"`と出た、どう確かめればよいか」という自発的な深掘りの質問があった。`typeof`はJS実行時の値の種類を返すだけで、TypeScriptの型情報はコンパイル後に消え去る(型消去)ため実行時には区別する手がかりが残っていないことを説明。「わざと矛盾する型(`string`)に代入してtscのエラーメッセージから推論結果を読む」手法を`/tmp`のスクラッチファイルで実演し、`Array(3)`→`any[]`、`Array.from({length:3})`→`unknown[]`(第2引数のコールバックなし、`T`を特定する手がかりがないため)、`Array.from({length:3}, () => "x")`→`string[]`(コールバックの戻り値型から`T`が逆算される)という違いを確認した。
- 次回やること: ステップ13完了。第4マイルストーン ステップ14(PRベースの開発フローを一度体験する)に着手する。

## 2026-09-05 (3)

- マイルストーン / ステップ: 13. ESLint + Prettier 導入(追加の改善、完了後のフォローアップ)
- やったこと:
  - ユーザーから「`ci.yml`が`npm ci`以外`npx`を直に叩いているが、これでいいのか」との質問。`npx <command>`(`node_modules/.bin`を直接叩く、`scripts`を経由しない)と`npm run <script>`(`package.json`の`scripts`定義を実行する)の違いを説明。今回は`npm ci`直後で`node_modules/.bin`が揃っているため動作上の問題はないが、`package.json`にすでに`typecheck`/`lint`/`test`スクリプトがあるのに`ci.yml`側でコマンドを生で書き直すと、将来スクリプトにオプションを追加した際に両方直す必要が出る(二重管理)という保守性の指摘を行った。ユーザーの合意を得て、`ci.yml`を`npm run typecheck` / `npm run lint` / `npm run format:check` / `npm test`に変更し、`prettier --check .`用に`package.json`へ`format:check`スクリプトを追加。
  - 続けてユーザーから「`lint`(オプションなし)が変更なし・`lint:fix`(オプションあり)が変更ありなのに対し、`format`(オプションなし)は変更あり(`--write`)・`format:check`(オプションあり)が変更なし、という命名が逆で感覚とズレている。オプションなし→変更なしに統一した方が、誤って短いコマンドを打ってしまったときにも安全では」という指摘があり、妥当と判断。`format`を`prettier --check .`(チェックのみ、安全なデフォルト)、`format:fix`を`prettier --write .`(書き換えあり)に改名し、`lint`/`lint:fix`と対称的な命名に統一。`ci.yml`も`npm run format:check`→`npm run format`に追従。
  - ローカルで`npm run typecheck` / `npm run lint` / `npm run format` / `npm test`、および`npm run format:fix`(既に整形済みのため無変更)が想定通り動くことを確認してからコミット・プッシュ。
- 詰まった点(JS由来 / TS由来 / 環境由来): なし(ツール運用・命名設計に関する気づきが中心)。
- 新しく理解した概念(本人の言葉ベース):
  - `npx`はローカルのバイナリを直接叩くだけで`package.json`の`scripts`を経由しない一方、`npm run`は`scripts`定義を実行するため、CIとローカルのコマンドを1箇所(`package.json`)に集約できる。
  - コマンド名の対称性(オプションなし=安全なデフォルト、修飾語付き=破壊的な操作)を意図的に揃えることで、誤操作への耐性が上がる、という設計判断をユーザー自身が指摘・実施した。
- 次回やること: 第4マイルストーン ステップ14(PRベースの開発フローを一度体験する)に着手する。

## 2026-09-05 (4)

- マイルストーン / ステップ: 14. PRベースの開発フローを一度体験する(完了。branch protectionの実際の強制確認はステップ15〈リポジトリ公開〉後に持ち越し)
- やったこと:
  - `gh` CLIの有無を確認したところ未導入(計画書の記載通り)。PR作成・マージはGitHubの画面からユーザーが行う方針とした。
  - Claudeが作業ブランチ `docs/update-tech-stack` を作成し、README.mdの技術スタック欄にESLint/Prettier/Dev Container/GitHub Actionsを追記(ステップ13時点で反映漏れだった箇所)してコミット・プッシュ。PRフロー体験のための小さな題材として位置づけた。
  - ユーザーがGitHubの画面でPRを作成 → CIが走って緑になることを確認 → 「Merge pull request」でマージ、という一連の流れを実際に体験。
  - マージ後、ローカルで `git checkout main && git pull` して最新化し、ローカルの作業ブランチを削除して後片付け。
  - branch protectionの設定手順(Settings → Branches → Add rule → `main` → Require status checks to pass before merging、CIのジョブ名`test`を選択)をClaudeが説明し、ユーザーがGitHubの画面から実際に設定。
  - 設定完了後、GitHubから「Your protected branch rules...won't be enforced on this private repository until you move to a GitHub Team or Enterprise organization account.」という警告が表示され、ユーザーから質問があった。GitHub Freeプラン(個人アカウント)では、Publicリポジトリなら branch protection rule が無料で完全に機能するが、Privateリポジトリの場合は一部のルール(required status checksなど)がTeam/Enterpriseプランでないと実際には強制されない、という仕様であることを説明。計画書の次のステップ15(リポジトリ公開)を終えれば、今回保存した設定がそのままPublicリポジトリ上で有効になる見込みのため、実際に強制されるかどうかの確認はステップ15後に持ち越す方針でユーザーと合意した。
- 詰まった点(JS由来 / TS由来 / 環境由来):
  - 環境由来: GitHub Freeプランの個人アカウントでは、Privateリポジトリの場合 branch protection rule の一部(required status checks等)がTeam/Enterpriseプランでないと実際には強制されない。設定自体は保存されるため、Publicにした時点で有効になる見込み。
- 新しく理解した概念(本人の言葉):
  - 「PRフローはmainブランチを汚さないために行う」
  - 「branch protectionはPRフローと合わせて特定のブランチを保護するために行う」
- 次回やること: 第4マイルストーン ステップ15(リポジトリを公開する)に着手する。公開前のセキュリティチェック(秘匿情報の有無)をClaudeが実施し、README本文は学習者が自分の言葉で書く(Claudeは構成案とガイドのみ提示)。公開後、branch protectionが実際に強制されるようになったかも確認する。
