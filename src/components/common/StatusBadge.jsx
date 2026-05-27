import { Tag } from 'antd';
import React from 'react';

const StatusBadge = ({ status, size = 'default', showDot = true }) => {
  let color = 'default';
  
  switch (status?.toLowerCase()) {
    case 'healthy':
    case 'success':
      color = 'success';
      break;
    case 'warning':
    case 'pending':
      color = 'warning';
      break;
    case 'critical':
    case 'danger':
    case 'error':
    case 'discarded':
      color = 'error';
      break;
    case 'active':
    case 'reprocessing':
      color = 'processing';
      break;
    default:
      color = 'default';
  }

  const dotClass = `status-dot status-dot-${status?.toLowerCase() || 'unknown'}`;

  return (
    <Tag 
      color={color} 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '6px',
        padding: size === 'small' ? '0 4px' : '2px 8px',
        fontSize: size === 'small' ? '11px' : '12px',
        border: '1px solid var(--border-subtle)',
        background: 'rgba(255,255,255,0.02)'
      }}
    >
      {showDot && <span className={dotClass} style={{ marginRight: 4, width: 6, height: 6 }} />}
      {status ? status.toUpperCase() : 'UNKNOWN'}
    </Tag>
  );
};

export default StatusBadge;
