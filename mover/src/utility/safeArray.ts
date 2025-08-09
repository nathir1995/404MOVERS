export function a<T>(v: T[] | null | undefined): T[] {
  return Array.isArray(v) ? v : [];
}

export function findSafe<T>(v: T[] | null | undefined, cb: (x: T) => boolean): T | undefined {
  return a(v).find(cb);
}
