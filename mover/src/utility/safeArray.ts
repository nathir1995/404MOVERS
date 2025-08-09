export function a<T>(v: T[] | undefined | null): T[] {
  return Array.isArray(v) ? v : [];
}
export function findSafe<T>(v: T[] | undefined | null, cb: (x: T) => boolean): T | undefined {
  return a(v).find(cb);
}
