import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, App as AntApp } from 'antd';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import getAntdTheme from './theme/antdTheme';
import App from './App';
import './index.css';

function AppWrapper() {
  const { resolvedTheme } = useTheme();
  const dynamicTheme = getAntdTheme(resolvedTheme);
  return (
    <ConfigProvider theme={dynamicTheme}>
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppWrapper />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
