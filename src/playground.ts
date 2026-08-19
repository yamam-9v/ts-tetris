// strict: true が何を弾くかを体験するための実験用ファイル。
// tsconfig.json の "include": ["src"] に含まれるので、
// `npx tsc --noEmit` を実行するとこのファイルもチェック対象になる。

// --- 実験1: noImplicitAny ---
// 引数 x に型注釈がない。strict なしなら x は暗黙的に any になる。
function double(x: number) {
  return x * 2;
}

// --- 実験2: strictNullChecks ---
// name が undefined かもしれない状態で .toUpperCase() を呼んでいる。
function greet(name: string | undefined) {
  if (typeof name === "string") {
    return name.toUpperCase();
  }
  else {
    return "";
  }
}

// --- 実験3: 判別可能ユニオン ---
// 非同期でデータを取得する処理の「状態」を考える。
// 4つの状態があり、状態ごとに持っているデータの形が違う。
//   - idle:    まだ何もしていない。追加データなし
//   - loading: 読み込み中。追加データなし
//   - success: 成功した。文字列の data を持つ
//   - error:   失敗した。エラー内容を表す message を持つ
//
// TODO(human): RequestState を判別可能ユニオンとして定義する。
// 各バリアントに共通のタグ用プロパティ(例: kind)を持たせ、
// バリアントごとに必要な追加プロパティだけを持たせること。

type RequestState = 
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; data: string }
  | { kind: "error"; message: string }
  | { kind: "cancelled" };

function describeState(state: RequestState): string {
  switch (state.kind) {
    case "idle":
      return "まだ何もしていません";
    case "loading":
      return "読み込み中...";
    case "success":
      return `成功: ${state.data}`;
    case "error":
      return `失敗: ${state.message}`;
    case "cancelled":
      return "キャンセル中...";
    default:
      // TODO(human): 網羅チェック用のコードをここに書く。
      // state を never 型の変数に代入してみる。
      // 全ケースを処理し終えていればここは通らないので問題なく、
      // もし処理し忘れたバリアントがあれば、代入時に型エラーになるはず。
      state satisfies never;
      return "";
  }
}
