// ====== ARRAY SAFETY UTILITIES ======
// Create this file: src/utility/arraySafety.ts

/**
 * Ensures the input is always an array, returns empty array if not
 */
export function ensureArray<T>(input: T[] | undefined | null): T[] {
  return Array.isArray(input) ? input : [];
}

/**
 * Safe find operation - returns undefined if array is invalid
 */
export function safeFind<T>(
  array: T[] | undefined | null,
  predicate: (item: T, index: number, array: T[]) => boolean
): T | undefined {
  const safeArray = ensureArray(array);
  return safeArray.find(predicate);
}

/**
 * Safe map operation - returns empty array if input is invalid
 */
export function safeMap<T, U>(
  array: T[] | undefined | null,
  callback: (item: T, index: number, array: T[]) => U
): U[] {
  const safeArray = ensureArray(array);
  return safeArray.map(callback);
}

/**
 * Safe filter operation - returns empty array if input is invalid
 */
export function safeFilter<T>(
  array: T[] | undefined | null,
  predicate: (item: T, index: number, array: T[]) => boolean
): T[] {
  const safeArray = ensureArray(array);
  return safeArray.filter(predicate);
}

/**
 * Safe reduce operation - uses provided initial value if array is invalid
 */
export function safeReduce<T, U>(
  array: T[] | undefined | null,
  callback: (accumulator: U, current: T, index: number, array: T[]) => U,
  initialValue: U
): U {
  const safeArray = ensureArray(array);
  return safeArray.reduce(callback, initialValue);
}

/**
 * Safe array access - returns undefined if index is out of bounds or array is invalid
 */
export function safeGet<T>(
  array: T[] | undefined | null,
  index: number
): T | undefined {
  const safeArray = ensureArray(array);
  if (index < 0 || index >= safeArray.length) return undefined;
  return safeArray[index];
}

/**
 * Safe array length - returns 0 if array is invalid
 */
export function safeLength<T>(array: T[] | undefined | null): number {
  return ensureArray(array).length;
}

/**
 * Safely checks if array has items
 */
export function hasItems<T>(array: T[] | undefined | null): boolean {
  return safeLength(array) > 0;
}

/**
 * Safe slice operation
 */
export function safeSlice<T>(
  array: T[] | undefined | null,
  start?: number,
  end?: number
): T[] {
  const safeArray = ensureArray(array);
  return safeArray.slice(start, end);
}

/**
 * Safe forEach operation
 */
export function safeForEach<T>(
  array: T[] | undefined | null,
  callback: (item: T, index: number, array: T[]) => void
): void {
  const safeArray = ensureArray(array);
  safeArray.forEach(callback);
}

/**
 * Example usage in components:
 * 
 * import { safeMap, safeFind, hasItems } from '@/utility/arraySafety';
 * 
 * // Instead of: items.map(item => <div key={item.id}>{item.name}</div>)
 * // Use: safeMap(items, item => <div key={item.id}>{item.name}</div>)
 * 
 * // Instead of: items.find(item => item.active)
 * // Use: safeFind(items, item => item.active)
 * 
 * // Instead of: items && items.length > 0
 * // Use: hasItems(items)
 */
