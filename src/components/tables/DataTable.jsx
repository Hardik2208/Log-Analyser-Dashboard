import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import GlassPanel from '../common/GlassPanel';
import SkeletonLoader from '../common/SkeletonLoader';

const DataTable = ({ 
  columns, 
  dataSource = [], 
  loading = false, 
  searchable = true,
  searchPlaceholder = 'Search...',
  searchFields = [],
  pagination,
  onRowClick,
  title,
  extra,
  rowKey = 'id',
  emptyText = 'No data available'
}) => {
  const [searchText, setSearchText] = useState('');

  const filteredData = React.useMemo(() => {
    if (!searchText || searchFields.length === 0) return dataSource;
    
    const lowerSearchText = searchText.toLowerCase();
    
    return dataSource.filter(item => {
      return searchFields.some(field => {
        const val = item[field];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(lowerSearchText);
      });
    });
  }, [dataSource, searchText, searchFields]);

  const defaultPagination = {
    defaultPageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    ...pagination
  };

  return (
    <GlassPanel padding="0" style={{ overflow: 'hidden' }}>
      {(title || searchable || extra) && (
        <div style={{ 
          padding: '16px 24px', 
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          {title && <div className="section-title" style={{ margin: 0 }}>{title}</div>}
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
            {searchable && (
              <Input
                placeholder={searchPlaceholder}
                prefix={<SearchOutlined style={{ color: 'var(--text-muted)' }} />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ maxWidth: '300px' }}
                allowClear
              />
            )}
            {extra}
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '24px' }}>
          <SkeletonLoader variant="table" rows={5} />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={rowKey}
          pagination={defaultPagination}
          onRow={(record) => ({
            onClick: () => onRowClick && onRowClick(record),
            style: { cursor: onRowClick ? 'pointer' : 'default' }
          })}
          locale={{ emptyText }}
          scroll={{ x: 'max-content' }}
        />
      )}
    </GlassPanel>
  );
};

export default DataTable;
