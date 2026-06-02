import React from 'react';

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';

import { formatChartXAxis } from '../../utils/chartDateFormatter';

const MultiLineChart = ({
  data = [],
  lines = [],
  height = 320,
  timeRange = '24h'
}) => {

  return (

    <ResponsiveContainer
      width="100%"
      height={height}
    >

      <LineChart
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

        {
          lines.map(
            line => (

              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.color}
                name={line.name}
                strokeWidth={2}
                dot={false}
                connectNulls
              />

            )
          )
        }

      </LineChart>

    </ResponsiveContainer>

  );

};

export default MultiLineChart;