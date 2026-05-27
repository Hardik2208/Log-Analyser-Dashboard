import React from 'react';
import { Button } from 'antd';
import { AlertTriangle } from 'lucide-react';
import GlassPanel from './GlassPanel';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <GlassPanel style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
          <AlertTriangle size={48} color="var(--danger)" style={{ marginBottom: 16 }} />
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: 'var(--text-primary)' }}>Something went wrong</h3>
          <p style={{ margin: '0 0 24px 0', color: 'var(--text-muted)' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <Button type="primary" onClick={this.handleReset} style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }}>
            Try Again
          </Button>
        </GlassPanel>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
