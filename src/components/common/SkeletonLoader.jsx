import React from 'react';

const SkeletonLoader = ({ variant = 'card', rows = 3, height, width, count = 1 }) => {
  const renderSkeleton = (key) => {
    switch (variant) {
      case 'card':
        return (
          <div key={key} style={{ padding: '20px', height: height || 'auto', width: width || '100%' }}>
            <div className="skeleton-shimmer" style={{ width: '40%', height: '24px', marginBottom: '16px' }} />
            <div className="skeleton-shimmer" style={{ width: '80%', height: '16px', marginBottom: '12px' }} />
            <div className="skeleton-shimmer" style={{ width: '60%', height: '16px' }} />
          </div>
        );
      case 'chart':
        return (
          <div key={key} className="skeleton-shimmer" style={{ width: width || '100%', height: height || '300px', borderRadius: 'var(--radius-md)' }} />
        );
      case 'table':
        return (
          <div key={key} style={{ width: width || '100%' }}>
            <div className="skeleton-shimmer" style={{ width: '100%', height: '40px', marginBottom: '16px', borderRadius: 'var(--radius-sm)' }} />
            {Array.from({ length: rows }).map((_, i) => (
              <div key={`row-${i}`} className="skeleton-shimmer" style={{ width: '100%', height: '48px', marginBottom: '8px', borderRadius: 'var(--radius-sm)' }} />
            ))}
          </div>
        );
      case 'metric':
        return (
          <div key={key} className="skeleton-shimmer" style={{ width: width || '60px', height: height || '28px', borderRadius: 'var(--radius-sm)' }} />
        );
      case 'text':
      default:
        return (
          <div key={key} className="skeleton-shimmer" style={{ width: width || '100%', height: height || '16px', borderRadius: 'var(--radius-sm)', marginBottom: '8px' }} />
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </>
  );
};

export default SkeletonLoader;
