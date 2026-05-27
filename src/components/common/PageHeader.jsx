import React from 'react';

const PageHeader = ({ title, subtitle, icon, actions }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'flex-start',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {icon && (
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-indigo)',
            fontSize: '24px'
          }}>
            {icon}
          </div>
        )}
        <div>
          <h1 style={{ 
            margin: '0 0 4px 0', 
            fontSize: '22px', 
            fontWeight: 700, 
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em'
          }}>
            {title}
          </h1>
          {subtitle && (
            <div style={{ 
              fontSize: '13px', 
              color: 'var(--text-secondary)'
            }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
      
      {actions && (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
