// @ts-ignore TS2580
export const processArgv = (): string[] => (typeof Deno !== 'undefined' && Deno.args) || (typeof process !== 'undefined' && process.argv.slice(2)) || [];

export function flatten<T>(arr: any[], depth: number = 1): T[] {
  if (Array.prototype.flat) {
    return Array.prototype.flat.apply(arr, [depth]) as T[]
  }
  return depth === 0 ? arr : flatten([].concat(...arr), depth - 1);
}

export type Dictionary<T> = { [k in PropertyKey]: T }
export type Entries<T> = Iterable<readonly [PropertyKey, T]>;
export const objectFromEntries = Object.fromEntries || (
  <T = any>(entries: Entries<T>): Dictionary<T> => {
    if (entries === null || entries === undefined) {
      throw TypeError();
    }
    const obj = {};
    const iterator = entries[Symbol.iterator]();
    let record = iterator.next();
    while (!record.done) {
      const [k, v] = record.value;
      Object.defineProperty(obj, k, {
        value:        v,
        writable:     true,
        enumerable:   true,
        configurable: true,
      });
      record = iterator.next();
    }
    return obj;
  }
);
