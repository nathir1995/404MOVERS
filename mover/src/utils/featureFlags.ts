// Feature flags for enabling/disabling features based on environment and browser support

interface FeatureFlags {
  FIREBASE_ENABLED: boolean;
  NOTIFICATIONS_ENABLED: boolean;
  GOOGLE_MAPS_ENABLED: boolean;
  STRICT_CSP_ENABLED: boolean;
}

/**
 * Check if Firebase is supported and should be enabled
 */
function isFirebaseSupported(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if the browser supports necessary APIs
  if (!('serviceWorker' in navigator)) return false;
  if (!('Notification' in window)) return false;
  if (!('PushManager' in window)) return false;
  
  // Check if we're in a secure context (HTTPS or localhost)
  if (!window.isSecureContext && !window.location.hostname.includes('localhost')) {
    return false;
  }
  
  return true;
}

/**
 * Check if Google Maps should be enabled
 */
function isGoogleMapsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check if API key is available
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY) return false;
  
  return true;
}

/**
 * Get feature flags based on environment and browser capabilities
 */
export function getFeatureFlags(): FeatureFlags {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    FIREBASE_ENABLED: isFirebaseSupported() && (isDevelopment || isProduction),
    NOTIFICATIONS_ENABLED: isFirebaseSupported() && 'Notification' in (typeof window !== 'undefined' ? window : {}),
    GOOGLE_MAPS_ENABLED: isGoogleMapsEnabled(),
    STRICT_CSP_ENABLED: isProduction,
  };
}

/**
 * Hook to get feature flags in React components
 */
export function useFeatureFlags() {
  return getFeatureFlags();
}

/**
 * Individual feature flag checkers
 */
export const isFeatureEnabled = {
  firebase: () => getFeatureFlags().FIREBASE_ENABLED,
  notifications: () => getFeatureFlags().NOTIFICATIONS_ENABLED,
  googleMaps: () => getFeatureFlags().GOOGLE_MAPS_ENABLED,
  strictCSP: () => getFeatureFlags().STRICT_CSP_ENABLED,
};

/**
 * Safe execution wrapper for Firebase operations
 */
export async function safeFirebaseOperation<T>(
  operation: () => Promise<T>,
  fallback: T,
  errorMessage = 'Firebase operation failed'
): Promise<T> {
  if (!isFeatureEnabled.firebase()) {
    console.info('Firebase disabled - using fallback');
    return fallback;
  }
  
  try {
    return await operation();
  } catch (error: any) {
    console.warn(`${errorMessage}:`, error?.code || error?.message || 'unknown error');
    return fallback;
  }
}

export default getFeatureFlags;