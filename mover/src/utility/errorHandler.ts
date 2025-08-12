// ====== ERROR HANDLING UTILITIES ======
// Create this file: src/utility/errorHandler.ts

/**
 * Custom error handler for common React/JavaScript errors
 */
export class AppErrorHandler {
  /**
   * Handle TypeError related to undefined array access
   */
  static handleArrayError(error: Error, context?: string): void {
    if (error.message.includes("Cannot read properties of undefined (reading 'find')") ||
        error.message.includes("Cannot read properties of undefined (reading 'map')") ||
        error.message.includes("Cannot read properties of undefined (reading 'filter')")) {
      
      console.warn('🔍 Array Access Error Detected:', {
        error: error.message,
        context: context || 'Unknown component',
        stack: error.stack,
        timestamp: new Date().toISOString()
      });

      // Log additional debugging info
      console.info('💡 Common causes:');
      console.info('  - API data not loaded yet');
      console.info('  - Network request failed');
      console.info('  - Data structure changed');
      console.info('  - Missing null checks');
    }
  }

  /**
   * Handle Google Maps related errors
   */
  static handleGoogleMapsError(error: Error): void {
    if (error.message.includes('google.maps') || 
        error.message.includes('Marker') ||
        error.message.includes('AdvancedMarker')) {
      
      console.warn('🗺️ Google Maps Error Detected:', {
        error: error.message,
        timestamp: new Date().toISOString()
      });

      console.info('💡 Google Maps deprecation notice:');
      console.info('  - google.maps.Marker is deprecated');
      console.info('  - Use google.maps.marker.AdvancedMarkerElement instead');
      console.info('  - See: https://developers.google.com/maps/documentation/javascript/advanced-markers/migration');
    }
  }

  /**
   * Handle React rendering errors
   */
  static handleReactError(error: Error, errorInfo?: any): void {
    console.error('⚛️ React Error Detected:', {
      error: error.message,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString()
    });

    // Check for common React error patterns
    if (error.message.includes('Cannot read properties of undefined')) {
      this.handleArrayError(error, 'React Component');
    } else if (error.message.includes('google.maps')) {
      this.handleGoogleMapsError(error);
    }
  }

  /**
   * Global error handler for unhandled errors
   */
  static handleGlobalError(event: ErrorEvent): void {
    const error = event.error || new Error(event.message);
    
    console.error('🌍 Global Error Detected:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: error.stack,
      timestamp: new Date().toISOString()
    });

    // Route to appropriate handler
    this.handleArrayError(error, 'Global');
    this.handleGoogleMapsError(error);
  }

  /**
   * Handle promise rejection errors
   */
  static handlePromiseRejection(event: PromiseRejectionEvent): void {
    const error = event.reason instanceof Error ? event.reason : new Error(String(event.reason));
    
    console.error('🔗 Promise Rejection Detected:', {
      reason: event.reason,
      error: error.stack,
      timestamp: new Date().toISOString()
    });

    // Route to appropriate handler
    this.handleArrayError(error, 'Promise Rejection');
  }
}

/**
 * Initialize global error handlers
 */
export function initializeErrorHandlers(): void {
  // Handle unhandled errors
  window.addEventListener('error', (event) => {
    AppErrorHandler.handleGlobalError(event);
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    AppErrorHandler.handlePromiseRejection(event);
  });

  // Override console.error to capture React errors
  const originalConsoleError = console.error;
  console.error = (...args) => {
    originalConsoleError.apply(console, args);
    
    // Check if it's a React error
    const errorMessage = args.join(' ');
    if (errorMessage.includes('TypeError') || errorMessage.includes('Cannot read properties')) {
      const error = new Error(errorMessage);
      AppErrorHandler.handleArrayError(error, 'Console Error');
    }
  };
}

/**
 * React hook for error boundary integration
 */
export function useErrorHandler() {
  const handleError = React.useCallback((error: Error, errorInfo?: any) => {
    AppErrorHandler.handleReactError(error, errorInfo);
  }, []);

  return { handleError };
}

// Import React for the hook
import React from 'react';