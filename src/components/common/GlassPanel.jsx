import React from 'react';

const GlassPanel = ({ children, className = '', style = {}, padding = '20px 24px', glow = false, onClick }) => {
  const baseClass = glow ? 'glass-panel-glow' : 'glass-panel';
  
  return (
    <div 
      className={`${baseClass} ${className}`} 
      style={{ padding, ...style, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassPanel;
