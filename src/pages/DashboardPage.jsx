import React from 'react';

import {
DashboardOutlined,
ThunderboltOutlined,
CheckCircleOutlined,
CloseCircleOutlined,
ExclamationCircleOutlined,
RetweetOutlined,
ClockCircleOutlined,
HeartOutlined
}
from '@ant-design/icons';

import { Wifi } from 'lucide-react';

import PageHeader from '../components/common/PageHeader';
import MetricCard from '../components/cards/MetricCard';

import ChartContainer from '../components/charts/ChartContainer';
import TrendLineChart from '../components/charts/TrendLineChart';
import TrendAreaChart from '../components/charts/TrendAreaChart';
import MultiLineChart from '../components/charts/MultiLineChart';

import StatusBadge from '../components/common/StatusBadge';

import { usePolling } from '../hooks/usePolling';

import {
fetchLatestMetrics,
fetchDayTrend,
fetchWeekTrend
}
from '../api/endpoints';

const DashboardPage = ()=>{

const {
data:metrics,
loading:metricsLoading
}
=
usePolling(
fetchLatestMetrics,
10000
);

const {
data:dayTrend,
loading:dayTrendLoading
}
=
usePolling(
fetchDayTrend,
30000
);

const {
data:weekTrend,
loading:weekTrendLoading
}
=
usePolling(
fetchWeekTrend,
60000
);

return(

<div className="page-container">

<PageHeader
title="Dashboard"
subtitle="Realtime processing overview"
icon={
<DashboardOutlined/>
}
/>

<div
className="metric-grid"
style={{
marginBottom:'32px'
}}
>

<MetricCard
title="Throughput"
value={
metrics?.throughput || 0
}
icon={
<ThunderboltOutlined/>
}
status="info"
loading={
metricsLoading
}
/>

<MetricCard
title="Success"
value={
metrics?.successCount || 0
}
icon={
<CheckCircleOutlined/>
}
status="success"
loading={
metricsLoading
}
/>

<MetricCard
title="Premanent Failures"
value={
metrics?.failureCount || 0
}
icon={
<CloseCircleOutlined/>
}
status="danger"
loading={
metricsLoading
}
/>

<MetricCard
title="Temp Failures (Introduced)"
value={
metrics?.temporaryFailures || 0
}
icon={
<ExclamationCircleOutlined/>
}
status="warning"
loading={
metricsLoading
}
/>

<MetricCard
title="Retry Amplification"
value={
metrics?.retryAmplification || 0
}
icon={
<RetweetOutlined/>
}
status="warning"
suffix="x"
loading={
metricsLoading
}
/>


<MetricCard
title="Pipeline Latency"
value={
metrics?.pipelineLatency || 0
}
icon={
<ClockCircleOutlined/>
}
status="info"
suffix="ms"
loading={
metricsLoading
}
/>

<MetricCard
title="E2E Latency"
value={
metrics?.endToEndLatency || 0
}
icon={
<ClockCircleOutlined/>
}
status="info"
suffix="ms"
loading={
metricsLoading
}
/>

<MetricCard
title="Ingestion Latency"
value={
metrics?.ingestionLatency || 0
}
icon={
<ClockCircleOutlined/>
}
status="info"
suffix="ms"
loading={
metricsLoading
}
/>





</div>


<div className="section-title">

24 Hour Trend

</div>

<div
className="chart-grid"
style={{
marginBottom:'32px'
}}
>


<ChartContainer
title="E2E vs Ingestion"
loading={
dayTrendLoading
}
>

<TrendLineChart

data={
dayTrend || []
}

lines={[

{
dataKey:
'avg_end_to_end_latency',

name:
'E2E',

color:
'var(--chart-3)'
},

{
dataKey:
'avg_ingestion_latency',

name:
'Ingestion',

color:
'var(--chart-4)'
}

]}

/>

</ChartContainer>


<ChartContainer
title="Throughput"
loading={
dayTrendLoading
}
>

<TrendAreaChart

data={
dayTrend || []
}

areas={[

{
dataKey:
'throughput',

name:
'Throughput',

color:
'var(--chart-5)'
}

]}

/>

</ChartContainer>

</div>


<div className="section-title">

7 Day Trend

</div>

<div
className="chart-grid"
style={{
marginBottom:'32px'
}}
>

<ChartContainer
title="Weekly Throughput"
loading={
weekTrendLoading
}
>

<TrendAreaChart

data={
weekTrend || []
}

areas={[

{
dataKey:
'throughput',

name:
'Throughput',

color:
'var(--chart-5)'
}

]}

/>

</ChartContainer>


<ChartContainer
title="Weekly Latency"
loading={
weekTrendLoading
}
>

<TrendAreaChart

data={
weekTrend || []
}

areas={[

{
dataKey:
'avg_latency',

name:
'Latency',

color:
'var(--chart-1)'
}

]}

/>

</ChartContainer>

</div>


<div className="section-title">

Latency Comparison

</div>

<ChartContainer
fullWidth
title="Latency Breakdown"
loading={
dayTrendLoading
}
>

<MultiLineChart

data={
dayTrend || []
}

lines={[

{
dataKey:
'avg_latency',

name:
'Processing'
},

{
dataKey:
'avg_pipeline_latency',

name:
'Pipeline'
},

{
dataKey:
'avg_end_to_end_latency',

name:
'E2E'
},

{
dataKey:
'avg_ingestion_latency',

name:
'Ingestion'
}

]}

/>

</ChartContainer>

</div>

);

};

export default DashboardPage;