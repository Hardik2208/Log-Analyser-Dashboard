import React from 'react';

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Area,
  Line
} from 'recharts';

import { formatChartXAxis } from '../../utils/chartDateFormatter';

const FailureChart = ({
  data = [],
  height = 320,
  timeRange = '24h'
}) => {

  return (

    <ResponsiveContainer
      width="100%"
      height={height}
    >

      <ComposedChart
        data={data}
      >

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="bucket"
          tickFormatter={(value) =>
            formatChartXAxis(
              value,
              timeRange
            )
          }
          tick={{
            fontSize: 11
          }}
          height={60}
        />

        <YAxis
          domain={[
            'auto',
            'auto'
          ]}
        />

        <Tooltip
          labelFormatter={(label) =>
            formatChartXAxis(
              label,
              timeRange
            )
          }
        />

        <Legend />

        <Bar
          dataKey="failures"
          name="Permanent Failures"
          fill="var(--chart-6)"
        />

        <Bar
          dataKey="temporary_failures"
          name="Temporary Failures"
          fill="var(--chart-3)"
        />

        <Area
          dataKey="retry_amplification"
          name="Retry Amplification"
          stroke="var(--chart-4)"
          fill="var(--chart-4)"
          fillOpacity={0.2}
        />

        <Line
          dataKey="success"
          name="Success"
          stroke="var(--chart-2)"
          strokeWidth={2}
          dot={false}
        />

      </ComposedChart>

    </ResponsiveContainer>

  );

};

export default FailureChart;