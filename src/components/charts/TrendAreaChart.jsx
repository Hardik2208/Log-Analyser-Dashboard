import React from 'react';

import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area
} from 'recharts';

import { formatChartXAxis } from '../../utils/chartDateFormatter';

const TrendAreaChart = ({
  data = [],
  areas = [],
  height = 300,
  timeRange = '24h'
}) => {

  return (

    <ResponsiveContainer
      width="100%"
      height={height}
    >

      <AreaChart
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
          areas.map(
            area => (

              <Area
                key={area.dataKey}
                type="monotone"
                dataKey={area.dataKey}
                name={area.name}
                stroke={area.color}
                fill={area.color}
                fillOpacity={0.25}
                connectNulls
              />

            )
          )
        }

      </AreaChart>

    </ResponsiveContainer>

  );

};

export default TrendAreaChart;