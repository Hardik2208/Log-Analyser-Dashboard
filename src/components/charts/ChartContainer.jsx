import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { ExpandAltOutlined, ShrinkOutlined, ReloadOutlined } from '@ant-design/icons';
import GlassPanel from '../common/GlassPanel';
import SkeletonLoader from '../common/SkeletonLoader';

const ChartContainer = ({ 
  title, 
  subtitle, 
  timeRange, 
  loading = false, 
  error = null, 
  onTimeRangeChange, 
  children, 
  fullWidth = false,
  height = 300,
  onRetry
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerStyle = isExpanded ? {
    position: 'fixed',
    top: '5%',
    left: '5%',
    width: '90%',
    height: '90%',
    zIndex: 1000,
    background: 'var(--bg-secondary)',
    boxShadow: 'var(--shadow-lg)'
  } : {
    gridColumn: fullWidth ? '1 / -1' : 'auto',
    height: 'auto'
  };

  return (
    <>
      {isExpanded && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 999 }} onClick={() => setIsExpanded(false)} />}
      
      <GlassPanel style={{ ...containerStyle, display: 'flex', flexDirection: 'column' }} className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div className="section-title" style={{ margin: 0, fontSize: isExpanded ? '20px' : '16px' }}>{title}</div>
            {subtitle && <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{subtitle}</div>}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {onTimeRangeChange && (
              <Select
                value={timeRange}
                onChange={onTimeRangeChange}
                options={[
                  { value: '1h', label: 'Last 1 Hour' },
                  { value: '6h', label: 'Last 6 Hours' },
                  { value: '24h', label: 'Last 24 Hours' },
                  { value: '7d', label: 'Last 7 Days' },
                ]}
                size="small"
                style={{ width: 120 }}
                variant="borderless"
                dropdownStyle={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              />
            )}
            
            <Button 
              type="text" 
              icon={isExpanded ? <ShrinkOutlined /> : <ExpandAltOutlined />} 
              onClick={() => setIsExpanded(!isExpanded)}
              style={{ color: 'var(--text-secondary)' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, minHeight: isExpanded ? 'calc(100% - 60px)' : height, position: 'relative' }}>
          {loading ? (
            <SkeletonLoader variant="chart" height="100%" />
          ) : error ? (
            <div style={{ 
              position: 'absolute', inset: 0, 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(239, 68, 68, 0.05)', border: '1px dashed var(--danger)', borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ color: 'var(--danger)', marginBottom: '8px' }}>Failed to load chart data</div>
              {onRetry && (
                <Button size="small" icon={<ReloadOutlined />} onClick={onRetry}>Retry</Button>
              )}
            </div>
          ) : (
            <div style={{ height: '100%', width: '100%' }}>
              {children}
            </div>
          )}
        </div>
      </GlassPanel>
    </>
  );
};

export default ChartContainer;
