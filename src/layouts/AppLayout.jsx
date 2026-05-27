import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const { Content } = Layout;

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout
        style={{
          marginLeft: collapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
          transition: 'margin-left var(--transition-normal)',
          background: 'var(--bg-primary)',
          minHeight: '100vh',
        }}
      >
        <TopBar collapsed={collapsed} onToggleCollapse={() => setCollapsed(!collapsed)} />
        <Content
          style={{
            marginTop: 'var(--topbar-height)',
            height: 'calc(100vh - var(--topbar-height))',
            overflowY: 'auto',
            overflowX: 'hidden',
            background: 'var(--bg-primary)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
