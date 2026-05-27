import React from 'react';
import { ControlOutlined } from '@ant-design/icons';
import PageHeader from '../components/common/PageHeader';
import ProducerControls from '../components/controls/ProducerControls';
import FailureInjection from '../components/controls/FailureInjection';
import SystemStatus from '../components/controls/SystemStatus';
import { usePolling } from '../hooks/usePolling';
import { fetchSystemMetrics, updateProducerConfig, updateFailureInjection } from '../api/endpoints';

const ControlPanelPage = () => {
  const { data: systemMetrics, loading: metricsLoading } = usePolling(fetchSystemMetrics, 10000);

  const handleProducerConfigChange = async (config) => {
    await updateProducerConfig(config);
  };

  const handleFailureInjectionChange = async (config) => {
    await updateFailureInjection(config);
  };

  return (
    <div className="page-container">
      <PageHeader 
        title="Control Panel" 
        subtitle="Manage producer traffic and failure injection"
        icon={<ControlOutlined />}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <ProducerControls onConfigChange={handleProducerConfigChange} />
        <FailureInjection onConfigChange={handleFailureInjectionChange} />
      </div>

    </div>
  );
};

export default ControlPanelPage;
