// ====== ERROR SETUP UTILITY ======
// Create this file: src/utils/errorSetup.ts

import { initializeErrorHandlers } from '@/utility/errorHandler';

/**
 * Initialize all error handlers for the application
 * This should be called early in the app lifecycle
 */
export function setupErrorHandling(): void {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  try {
    // Initialize global error handlers
    initializeErrorHandlers();
    
    console.info('✅ Error handlers initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize error handlers:', error);
  }
}

/**
 * Setup error handling for development environment
 */
export function setupDevelopmentErrorHandling(): void {
  if (process.env.NODE_ENV !== 'development') return;

  // Add development-specific error handling
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    originalConsoleWarn.apply(console, args);
    
    // Check for common development issues
    const message = args.join(' ');
    if (message.includes('Warning:') && message.includes('find')) {
      console.info('💡 Development Tip: Consider using safe array utilities for better error handling');
    }
  };
}

/**
 * Setup error handling for production environment
 */
export function setupProductionErrorHandling(): void {
  if (process.env.NODE_ENV !== 'production') return;

  // Add production-specific error handling
  // This could include error reporting to external services
  console.info('🚀 Production error handling enabled');
}