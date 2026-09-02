// localStorage に保存するハイスコアが本当に有効な値かを判定する型ガード。
// value は unknown(localStorage から読み込んだ直後は何が入っているか分からない)。
export function isValidHighScore(value: unknown): value is number {
  if(typeof value !== "number") return false;
  if(Number.isNaN(value)) return false;
  if(!(Number.isFinite(value))) return false;
  if(!(Number.isInteger(value))) return false;
  if(value < 0) return false;

  return true;
}

// localStorage から key で読み込んだ値を、isValid で検証してから返す。
// - キーが存在しない、JSON として壊れている、isValid が false を返す
//   のいずれの場合も null を返す(呼び出し元をクラッシュさせない)。
export function loadFromStorage<T>(
  key: string,
  isValid: (value: unknown) => value is T,
): T | null {
  const data = localStorage.getItem(key);
  if(data === null) return null;

  try {
    const value: unknown = JSON.parse(data);
    if(isValid(value)) return value;
    return null;
  } catch (error) {
    return null;
  }
}
