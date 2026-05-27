import React from 'react';

import { RetweetOutlined } from '@ant-design/icons';

import PageHeader from '../components/common/PageHeader';
import MetricCard from '../components/cards/MetricCard';
import ChartContainer from '../components/charts/ChartContainer';
import TrendLineChart from '../components/charts/TrendLineChart';
import GlassPanel from '../components/common/GlassPanel';

import { usePolling } from '../hooks/usePolling';

import {
fetchLatestMetrics,
fetchSystemMetrics,
fetchDayTrend
}
from '../api/endpoints';

const RetryPage = () => {

const {
data: latest,
loading: latestLoading

}=usePolling(
fetchLatestMetrics,
10000
);

const {
data: system,
loading: systemLoading

}=usePolling(
fetchSystemMetrics,
10000
);

const {
data: trend,
loading: trendLoading

}=usePolling(
fetchDayTrend,
30000
);

const loading =
latestLoading ||
systemLoading ||
trendLoading;

return (

<div className="page-container">

<PageHeader

title="Retry Monitor"

subtitle="Retry amplification and temporary failure analysis"

icon={
<RetweetOutlined />
}

/>

<div
className="metric-grid"
style={{
marginBottom:'32px'
}}
>

<MetricCard

title="Retry Amplification"

value={
latest?.retryAmplification || 0
}

icon={
<RetweetOutlined />
}

status="warning"

suffix="x"

loading={loading}

/>

<MetricCard

title="Temporary Failures"

value={
latest?.temporaryFailures || 0
}

icon={
<RetweetOutlined />
}

status="danger"

loading={loading}

/>

<MetricCard

title="Failure Rate"

value={
system?.failureRate || 0
}

icon={
<RetweetOutlined />
}

status="warning"

suffix="%"

loading={loading}

/>

<MetricCard

title="Success Rate"

value={
(
system?.successRate || 0
) * 100
}

icon={
<RetweetOutlined />
}

status="success"

suffix="%"

loading={loading}

/>

</div>

<div className="chart-grid">

<ChartContainer

title="Temporary Failure Trend"

loading={loading}

>

<TrendLineChart

data={
trend || []
}

lines={[

{
dataKey:
'temporary_failures',

name:
'Temp Failures',

color:
'var(--chart-4)'
},

{
dataKey:
'failures',

name:
'Failures',

color:
'var(--chart-6)'
}

]}

/>

</ChartContainer>

<ChartContainer

title="Retry Amplification Trend"

loading={loading}

>

<TrendLineChart

data={
trend || []
}

lines={[

{
dataKey:
'retry_amplification',

name:
'Retry Amplification',

color:
'var(--chart-5)'
}

]}

/>

</ChartContainer>

</div>

<GlassPanel
style={{
marginTop:'24px'
}}
>

<div
className="section-title"
>

Retry Diagnostics

</div>

<div
style={{

display:'grid',

gridTemplateColumns:
'repeat(2,1fr)',

gap:'24px'

}}
>

<div>

<div
style={{

fontSize:12,

color:
'var(--text-muted)',

marginBottom:8

}}
>

Retry Amplification

</div>

<div
style={{
fontSize:22,
fontWeight:600
}}
>

{
latest?.retryAmplification || 0
}

x

</div>

</div>

<div>

<div
style={{

fontSize:12,

color:
'var(--text-muted)',

marginBottom:8

}}
>

Baseline Latency

</div>

<div
style={{
fontSize:22,
fontWeight:600
}}
>

{
system?.baselineLatency || 0
}

ms

</div>

</div>

</div>

</GlassPanel>

</div>

);

};

export default RetryPage;