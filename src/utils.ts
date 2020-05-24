export type Constructor<T> = { new(...args: any[]): T }
export type Value = null | boolean | number | string | string[]

export const uniqueMap = <T extends Object>(arr: T[]): Map<string, T> => {
  const m = new Map();
  arr.forEach(t => m.has(t.toString()) || m.set(t.toString(), t));
  return m;
};

export const unique = <T>(arr: T[]): T[] => {
  return Array.from(uniqueMap(arr).values());
};

export const eachSlice = <T>(orig: T[], size: number): T[][] => {
  const arr = [];
  for (let i = 0, l = orig.length; i < l; i += size) {
    arr.push(orig.slice(i, i + size));
  }
  return arr;
};

export const stringPartition = (source: string, expr: string): [string, string, string] => {
  const i = source.indexOf(expr);
  if (i < 0) {
    return [source, '', ''];
  }
  return [source.substring(0, i), expr, source.substring(i + expr.length)];
};
