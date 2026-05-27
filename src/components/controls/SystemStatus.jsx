import React from 'react';
import { Spin } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import GlassPanel from '../common/GlassPanel';
import SkeletonLoader from '../common/SkeletonLoader';
import StatusBadge from '../common/StatusBadge';
import AnimatedNumber from '../common/AnimatedNumber';

const SystemStatus = ({ systems, loading = false }) => {
  if (loading || !systems) {
    return (
      <GlassPanel>
        <div className="section-title">System Status</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonLoader key={i} variant="card" height="120px" />
          ))}
        </div>
      </GlassPanel>
    );
  }

  const { kafka, redis, mysql, consumers } = systems;

  const StatusItem = ({ title, status, metricLabel, metricValue, suffix = '' }) => (
    <div style={{ 
      padding: '16px', 
      background: 'rgba(255,255,255,0.02)', 
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>
        <StatusBadge status={status} size="small" />
      </div>
      <div>
        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
          {metricLabel}
        </div>
        <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {typeof metricValue === 'number' ? (
            <AnimatedNumber value={metricValue} suffix={suffix} />
          ) : (
            <span style={{ fontFamily: 'var(--font-mono)' }}>{metricValue}{suffix}</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <GlassPanel>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div className="section-title" style={{ margin: 0 }}>Live System Status</div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SyncOutlined spin style={{ color: 'var(--accent-cyan)' }} />
          Auto-syncing
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <StatusItem 
          title="Kafka Cluster" 
          status={kafka?.status} 
          metricLabel="Consumer Lag" 
          metricValue={kafka?.lag || 0} 
        />
        <StatusItem 
          title="Redis Cache" 
          status={redis?.status} 
          metricLabel="Memory Usage" 
          metricValue={redis?.memory || '0GB'} 
        />
        <StatusItem 
          title="MySQL Storage" 
          status={mysql?.status} 
          metricLabel="Active Connections" 
          metricValue={mysql?.connections || 0} 
        />
        <StatusItem 
          title="Workers" 
          status={consumers?.status} 
          metricLabel="Active Consumers" 
          metricValue={consumers?.active || 0} 
        />
      </div>
    </GlassPanel>
  );
};

export default SystemStatus;
