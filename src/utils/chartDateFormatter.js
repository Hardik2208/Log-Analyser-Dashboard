// src/utils/chartDateFormatter.js

export const formatChartXAxis = (value, timeRange) => {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  // IST (+5:30)
  const istDate = new Date(
    date.getTime() + 19800000
  );

  // Weekly view
  if (timeRange === '7d') {
    return istDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short'
    });
  }

  // Hourly views
  return istDate.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};