// ====== SAFE ARRAY UTILITIES ======
// This matches the imports used in your existing components

/**
 * Safely ensures a value is an array, returning empty array if undefined/null
 * Short name 'a' for convenience (as used in existing code)
 */
export function a<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

/**
 * Safely finds an item in an array, handling undefined arrays gracefully
 * Named 'findSafe' for compatibility with existing imports
 */
export function findSafe<T>(
  array: T[] | undefined | null, 
  predicate: (value: T, index: number, obj: T[]) => boolean
): T | undefined {
  return a(array).find(predicate);
}

/**
 * Safely maps over an array, handling undefined arrays gracefully
 */
export function mapSafe<T, U>(
  array: T[] | undefined | null,
  callback: (value: T, index: number, array: T[]) => U
): U[] {
  return a(array).map(callback);
}

/**
 * Safely filters an array, handling undefined arrays gracefully
 */
export function filterSafe<T>(
  array: T[] | undefined | null,
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] {
  return a(array).filter(predicate);
}

/**
 * Safe reduce with initial value requirement
 */
export function reduceSafe<T, U>(
  array: T[] | undefined | null,
  callback: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U,
  initialValue: U
): U {
  return a(array).reduce(callback, initialValue);
}

/**
 * Check if array exists and has items
 */
export function hasItems<T>(array: T[] | undefined | null): array is T[] {
  return Array.isArray(array) && array.length > 0;
}

/**
 * Get array length safely
 */
export function lengthSafe<T>(array: T[] | undefined | null): number {
  return a(array).length;
}

// ====== BACKWARD COMPATIBILITY ======
export const ensureArray = a;
export const safeFind = findSafe;
export const safeMap = mapSafe;
export const safeFilter = filterSafe;
export const safeReduce = reduceSafe;
export const safeLength = lengthSafe;

// ====== REACT HOOK FOR SAFE DATA ======
import { useMemo } from 'react';

/**
 * Custom hook that ensures data is always an array
 */
export function useSafeArray<T>(data: T[] | undefined | null): T[] {
  return useMemo(() => a(data), [data]);
}
