import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ControlPanelPage from './pages/ControlPanelPage';
import DLQPage from './pages/DLQPage';
import RetryPage from './pages/RetryPage';
import StoragePage from './pages/StoragePage';
import SystemHealthPage from './pages/SystemHealthPage';
import SettingsPage from './pages/SettingsPage';
import useAnomalyNotifier from './hooks/useAnomalyNotifier';
import AnomaliesPage from './pages/AnomaliesPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="control-panel" element={<ControlPanelPage />} />
        <Route path="dlq" element={<DLQPage />} />
        <Route path="retry" element={<RetryPage />} />
        <Route path="storage" element={<StoragePage />} />
        <Route path="system-health" element={<SystemHealthPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/anomalies" element={<AnomaliesPage/> }/>
      </Route>
    </Routes>
  );
}

export default App;
