import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Badge, Tooltip, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  BellOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Wifi, Database, Server, Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

const routeLabels = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics',
  '/control-panel': 'Control Panel',
  '/dlq': 'Dead Letter Queue',
  '/retry': 'Retry Monitor',
  '/storage': 'Storage',
  '/system-health': 'System Health',
  '/settings': 'Settings',
};

function TopBar({ collapsed, onToggleCollapse }) {
  const location = useLocation();
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const currentLabel = routeLabels[location.pathname] || 'Dashboard';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        height: 'var(--topbar-height)',
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 99,
        transition: 'left var(--transition-normal)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
          style={{ color: 'var(--text-secondary)', fontSize: 16 }}
        />
        <Breadcrumb
          items={[
            { title: 'EventPulse Control Center' },
            { title: currentLabel },
          ]}
          style={{ fontSize: 13 }}
        />
      </div>

      {/* Right side */}
      <Space size={8}>
        {/* Live Service Indicators */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '4px 12px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            marginRight: 8,
          }}
        >
          <Tooltip title="Kafka: Healthy">
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Server size={13} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Kafka</span>
            </div>
          </Tooltip>
          <div style={{ width: 1, height: 16, background: 'var(--border-subtle)' }} />
          <Tooltip title="Redis: Healthy">
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Database size={13} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Redis</span>
            </div>
          </Tooltip>
          <div style={{ width: 1, height: 16, background: 'var(--border-subtle)' }} />
          <Tooltip title="MySQL: Healthy">
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Database size={13} style={{ color: 'var(--success)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>MySQL</span>
            </div>
          </Tooltip>
        </div>

        {/* Last Refresh */}
        <Tooltip title={`Last refresh: ${formatTime(lastRefresh)}`}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              color: 'var(--text-muted)',
            }}
          >
            <ClockCircleOutlined style={{ fontSize: 12 }} />
            {formatTime(lastRefresh)}
          </div>
        </Tooltip>

        {/* Refresh */}
        <Tooltip title="Refresh data">
          <Button
            type="text"
            icon={<ReloadOutlined />}
            onClick={() => setLastRefresh(new Date())}
            style={{ color: 'var(--text-secondary)' }}
            size="small"
          />
        </Tooltip>

        {/* Theme Toggle */}
        <Tooltip title={resolvedTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}>
          <Button
            type="text"
            icon={resolvedTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            size="small"
          />
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <Badge count={3} size="small" offset={[-2, 2]}>
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ color: 'var(--text-secondary)' }}
              size="small"
            />
          </Badge>
        </Tooltip>

        {/* Live indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '3px 10px',
            borderRadius: 20,
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}
        >
          <Wifi size={12} style={{ color: 'var(--success)' }} />
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--success)' }}>LIVE</span>
        </div>
      </Space>
    </div>
  );
}

export default TopBar;
