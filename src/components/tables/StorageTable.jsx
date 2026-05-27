import React from 'react';
import { Tag } from 'antd';
import DataTable from './DataTable';

const StorageTable = ({ data = [], type = 'hot', loading = false }) => {
  const hotColumns = [
    {
      title: 'KEY',
      dataIndex: 'key',
      key: 'key',
      render: (text) => <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{text}</span>,
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <Tag color="blue">{text.toUpperCase()}</Tag>,
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      key: 'value',
      render: (text) => <span style={{ fontFamily: 'var(--font-mono)' }}>{text}</span>,
    },
    {
      title: 'SIZE',
      dataIndex: 'size',
      key: 'size',
      render: (text) => <span style={{ color: 'var(--text-secondary)' }}>{text}</span>,
    },
    {
      title: 'TTL (s)',
      dataIndex: 'ttl',
      key: 'ttl',
      render: (text) => <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--warning)' }}>{text}</span>,
    },
    {
      title: 'LAST UPDATED',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (text) => <span style={{ color: 'var(--text-muted)' }}>{new Date(text).toLocaleString()}</span>,
    },
  ];

  const coldColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span style={{ color: 'var(--text-muted)' }}>#{text}</span>,
    },
    {
      title: 'METRIC TYPE',
      dataIndex: 'metricType',
      key: 'metricType',
      render: (text) => <Tag color="purple">{text.toUpperCase()}</Tag>,
    },
    {
      title: 'WINDOW',
      dataIndex: 'window',
      key: 'window',
      render: (text) => <Tag color="default">{text}</Tag>,
    },
    {
      title: 'VALUE',
      dataIndex: 'value',
      key: 'value',
      render: (text) => <span style={{ fontFamily: 'var(--font-mono)' }}>{text}</span>,
    },
    {
      title: 'COUNT',
      dataIndex: 'count',
      key: 'count',
      render: (text) => <span style={{ fontFamily: 'var(--font-mono)' }}>{text}</span>,
    },
    {
      title: 'MIN',
      dataIndex: 'min',
      key: 'min',
      render: (text) => <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>{text}</span>,
    },
    {
      title: 'MAX',
      dataIndex: 'max',
      key: 'max',
      render: (text) => <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--danger)' }}>{text}</span>,
    },
    {
      title: 'AVG',
      dataIndex: 'avg',
      key: 'avg',
      render: (text) => <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--info)' }}>{text}</span>,
    },
    {
      title: 'TIMESTAMP',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => <span style={{ color: 'var(--text-muted)' }}>{new Date(text).toLocaleString()}</span>,
    },
  ];

  return (
    <DataTable
      columns={type === 'hot' ? hotColumns : coldColumns}
      dataSource={data}
      loading={loading}
      searchFields={type === 'hot' ? ['key', 'type'] : ['metricType', 'window']}
      searchPlaceholder={type === 'hot' ? 'Search keys...' : 'Search metrics...'}
      rowKey={type === 'hot' ? 'key' : 'id'}
    />
  );
};

export default StorageTable;
