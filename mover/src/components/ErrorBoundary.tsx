import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.group('🚨 Error Boundary Caught Error');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.groupEnd();

    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // ✅ FIXED: Handle specific TypeError for .find() method
    if (error.message.includes("Cannot read properties of undefined (reading 'find')")) {
      console.warn('🔍 TypeError detected: Likely caused by undefined array in component');
      console.info('💡 Solution: Use safe array utilities or add null checks');
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '2rem',
          margin: '2rem',
          border: '2px solid #ef4444',
          borderRadius: '8px',
          backgroundColor: '#fef2f2',
          color: '#991b1b',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#dc2626' }}>
            🚨 Something went wrong
          </h2>
          
          <p style={{ marginBottom: '1rem' }}>
            We encountered an error while loading this section. This might be a temporary issue.
          </p>

          {this.state.error?.message.includes("Cannot read properties of undefined (reading 'find')") && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fbbf24',
              color: '#92400e',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}>
              <strong>⚠️ Data Loading Issue:</strong> Some data hasn't loaded yet. 
              Try refreshing the page or wait a moment for the data to load.
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '1rem',
              }}
            >
              🔄 Try Again
            </button>
            
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              🔃 Refresh Page
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <details style={{ marginTop: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                🐛 Error Details (Development Only)
              </summary>
              <pre style={{
                marginTop: '0.5rem',
                padding: '1rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '0.875rem',
                color: '#374151',
              }}>
                <strong>Error:</strong> {this.state.error?.message}
                {'\n\n'}
                <strong>Stack:</strong> {this.state.error?.stack}
                {'\n\n'}
                <strong>Component Stack:</strong> {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
