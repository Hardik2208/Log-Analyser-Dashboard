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

const CustomTooltip = ({
  active,
  payload,
  label,
  timeRange
}) => {

  if (
    !active ||
    !payload?.length
  ) {
    return null;
  }

  return (

    <div
      style={{
        background: 'var(--bg-secondary)',
        padding: '12px',
        borderRadius: '8px'
      }}
    >

      <div
        style={{
          marginBottom: '8px'
        }}
      >
        {formatChartXAxis(label, timeRange)}
      </div>

      {
        payload.map(
          (entry) => {

            const value =
              Number(
                entry.value
              );

            return (

              <div
                key={
                  entry.dataKey
                }
              >

                {entry.name} :

                {

                  Number.isFinite(
                    value
                  )

                    ?

                    value.toFixed(2)

                    :

                    entry.value

                }

              </div>

            );

          }
        )
      }

    </div>

  );

};

const TrendLineChart = ({
  data = [],
  lines = [],
  height = 300,
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
          content={
            <CustomTooltip
              timeRange={timeRange}
            />
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
                name={line.name}
                stroke={line.color}
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

export default TrendLineChart;