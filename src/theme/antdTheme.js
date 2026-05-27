import { theme } from 'antd';

const { darkAlgorithm, defaultAlgorithm } = theme;

export const getAntdTheme = (resolvedTheme) => {
  const isDark = resolvedTheme === 'dark';
  return {
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
    token: {
      // Colors
      colorPrimary: isDark ? '#ffffff' : '#09090b',
      colorSuccess: '#10b981',
      colorWarning: isDark ? '#f59e0b' : '#d97706',
      colorError: isDark ? '#ef4444' : '#dc2626',
      colorInfo: isDark ? '#3b82f6' : '#2563eb',
      colorLink: isDark ? '#ffffff' : '#09090b',

      // Backgrounds
      colorBgContainer: isDark ? '#09090b' : '#ffffff',
      colorBgElevated: isDark ? '#18181b' : '#ffffff',
      colorBgLayout: isDark ? '#09090b' : '#f4f4f5',
      colorBgSpotlight: isDark ? '#27272a' : '#18181b',

      // Borders
      colorBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 9, 11, 0.1)',
      colorBorderSecondary: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(9, 9, 11, 0.05)',

      // Text
      colorText: isDark ? '#f4f4f5' : '#09090b',
      colorTextSecondary: isDark ? '#a1a1aa' : '#52525b',
      colorTextTertiary: isDark ? '#71717a' : '#71717a',
      colorTextQuaternary: isDark ? '#3f3f46' : '#a1a1aa',

      // Typography
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontFamilyCode: "'JetBrains Mono', 'Fira Code', monospace",

      // Border Radius
      borderRadius: 10,
      borderRadiusLG: 14,
      borderRadiusSM: 6,

      // Shadows
      boxShadow: isDark 
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -2px rgba(0, 0, 0, 0.5)'
        : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.02)',
      boxShadowSecondary: isDark 
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -4px rgba(0, 0, 0, 0.6)'
        : '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',

      // Control
      controlHeight: 36,
      controlHeightLG: 44,
      controlHeightSM: 28,

      // Misc
      wireframe: false,
      motion: true,
    },
    components: {
      Menu: {
        darkItemBg: 'transparent',
        darkItemSelectedBg: 'rgba(255, 255, 255, 0.1)',
        darkItemHoverBg: 'rgba(255, 255, 255, 0.04)',
        itemBg: 'transparent',
        itemSelectedBg: 'rgba(9, 9, 11, 0.06)',
        itemHoverBg: 'rgba(9, 9, 11, 0.03)',
        itemBorderRadius: 8,
        iconSize: 18,
        itemMarginInline: 8,
      },
      Table: {
        headerBg: isDark ? '#18181b' : '#fafafa',
        rowHoverBg: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(9, 9, 11, 0.01)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(9, 9, 11, 0.05)',
      },
      Card: {
        colorBgContainer: isDark ? 'rgba(9, 9, 11, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      },
      Button: {
        primaryShadow: isDark ? '0 2px 4px rgba(255, 255, 255, 0.15)' : '0 2px 4px rgba(9, 9, 11, 0.1)',
        defaultBg: isDark ? '#18181b' : '#ffffff',
        defaultBorderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 9, 11, 0.1)',
      },
      Input: {
        colorBgContainer: isDark ? '#18181b' : '#ffffff',
        activeBorderColor: isDark ? '#ffffff' : '#09090b',
        hoverBorderColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(9, 9, 11, 0.5)',
      },
      Select: {
        colorBgContainer: isDark ? '#18181b' : '#ffffff',
        optionSelectedBg: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 9, 11, 0.06)',
      },
      Tabs: {
        inkBarColor: isDark ? '#ffffff' : '#09090b',
        itemSelectedColor: isDark ? '#ffffff' : '#09090b',
        itemHoverColor: isDark ? '#e4e4e7' : '#27272a',
      },
      Switch: {
        colorPrimary: isDark ? '#ffffff' : '#09090b',
      },
      Slider: {
        trackBg: isDark ? '#ffffff' : '#09090b',
        trackHoverBg: isDark ? '#e4e4e7' : '#27272a',
        handleColor: isDark ? '#ffffff' : '#09090b',
        dotBorderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(9, 9, 11, 0.1)',
      },
      Tag: {
        borderRadiusSM: 6,
      },
      Drawer: {
        colorBgElevated: isDark ? '#09090b' : '#ffffff',
      },
      Modal: {
        contentBg: isDark ? '#09090b' : '#ffffff',
        headerBg: isDark ? '#09090b' : '#ffffff',
      },
      Tooltip: {
        colorBgSpotlight: isDark ? '#27272a' : '#18181b',
      },
      Notification: {
        colorBgElevated: isDark ? '#18181b' : '#ffffff',
      },
    },
  };
};

export default getAntdTheme;
