// ====== ARRAY ACCESS DEBUGGING UTILITY ======
// This utility helps identify and debug array access issues

/**
 * Debug wrapper for array operations that logs when undefined arrays are accessed
 */
export function debugArrayAccess<T>(
  array: T[] | undefined | null,
  operation: string,
  context?: string
): T[] {
  if (!Array.isArray(array)) {
    console.warn(
      `🚨 Array access issue detected:`,
      {
        operation,
        context,
        arrayType: typeof array,
        value: array,
        stack: new Error().stack
      }
    );
    return [];
  }
  return array;
}

/**
 * Debug wrapper for find operations
 */
export function debugFind<T>(
  array: T[] | undefined | null,
  predicate: (value: T, index: number, obj: T[]) => boolean,
  context?: string
): T | undefined {
  const safeArray = debugArrayAccess(array, 'find', context);
  return safeArray.find(predicate);
}

/**
 * Debug wrapper for map operations
 */
export function debugMap<T, U>(
  array: T[] | undefined | null,
  callback: (value: T, index: number, array: T[]) => U,
  context?: string
): U[] {
  const safeArray = debugArrayAccess(array, 'map', context);
  return safeArray.map(callback);
}

/**
 * Debug wrapper for filter operations
 */
export function debugFilter<T>(
  array: T[] | undefined | null,
  predicate: (value: T, index: number, array: T[]) => boolean,
  context?: string
): T[] {
  const safeArray = debugArrayAccess(array, 'filter', context);
  return safeArray.filter(predicate);
}

/**
 * Check if we're in development mode and enable debugging
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Enhanced error handler for array access issues
 */
export function handleArrayAccessError(
  error: Error,
  context?: string
): void {
  if (error.message.includes("Cannot read properties of undefined (reading 'find')") ||
      error.message.includes("Cannot read properties of undefined (reading 'map')") ||
      error.message.includes("Cannot read properties of undefined (reading 'filter')")) {
    
    console.error('🚨 Array access error detected:', {
      message: error.message,
      context,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    // In development, provide more detailed information
    if (isDevelopment) {
      console.group('🔍 Debug Information');
      console.log('This error typically occurs when:');
      console.log('1. An API response is undefined/null');
      console.log('2. A component is trying to access array properties before data is loaded');
      console.log('3. The data structure is different than expected');
      console.log('');
      console.log('To fix this:');
      console.log('1. Use safe array utilities: safeMap, safeFind, safeFilter');
      console.log('2. Add proper loading states');
      console.log('3. Check API response structure');
      console.groupEnd();
    }
  }
}