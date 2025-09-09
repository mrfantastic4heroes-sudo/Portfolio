import React, { Suspense } from 'react';

const LoadingSpinner = ({ size = 'large', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12', 
    large: 'h-20 w-20'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]} mb-4`}></div>
      <p className={`text-gray-300 ${textSizes[size]} animate-pulse`}>{text}</p>
    </div>
  );
};

const ErrorFallback = ({ error, resetError, componentName = 'Component' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="text-red-400 text-4xl mb-4">⚠️</div>
      <h2 className="text-xl font-semibold text-white mb-2">Something went wrong</h2>
      <p className="text-gray-400 text-center mb-4">
        Failed to load {componentName}. Please try again.
      </p>
      <details className="mb-4 text-xs text-gray-500 max-w-md">
        <summary className="cursor-pointer hover:text-gray-400">Error Details</summary>
        <pre className="mt-2 p-2 bg-gray-900 rounded text-xs overflow-auto">
          {error?.message || 'Unknown error occurred'}
        </pre>
      </details>
      <button
        onClick={resetError}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors duration-300"
      >
        Try Again
      </button>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error}
          resetError={() => this.setState({ hasError: false, error: null })}
          componentName={this.props.componentName}
        />
      );
    }

    return this.props.children;
  }
}

const LoadingBoundary = ({ 
  children, 
  fallback, 
  componentName = 'Component',
  loadingText = 'Loading...',
  loadingSize = 'medium'
}) => {
  const defaultFallback = <LoadingSpinner size={loadingSize} text={loadingText} />;
  
  return (
    <ErrorBoundary componentName={componentName}>
      <Suspense fallback={fallback || defaultFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LoadingBoundary;
export { LoadingSpinner, ErrorBoundary };