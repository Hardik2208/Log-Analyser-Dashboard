import React,
{
useState
}
from 'react';

import {
LineChartOutlined
}
from '@ant-design/icons';

import {
Radio
}
from 'antd';

import PageHeader from '../components/common/PageHeader';

import ChartContainer from '../components/charts/ChartContainer';
import TrendLineChart from '../components/charts/TrendLineChart';
import TrendAreaChart from '../components/charts/TrendAreaChart';
import MultiLineChart from '../components/charts/MultiLineChart';

import {
usePolling
}
from '../hooks/usePolling';

import {
fetchDayTrend,
fetchWeekTrend
}
from '../api/endpoints';

const AnalyticsPage = ()=>{

const [
timeRange,
setTimeRange

]=useState(
'24h'
);

const {

data:dayTrend,
loading:dayLoading

}
=
usePolling(
fetchDayTrend,
30000
);

const {

data:weekTrend,
loading:weekLoading

}
=
usePolling(
fetchWeekTrend,
60000
);

const currentData =

timeRange ===
'7d'

?

weekTrend

:

dayTrend;

const loading =

timeRange ===
'7d'

?

weekLoading

:

dayLoading;
console.log(
currentData
);
return(

<div className="page-container">

<PageHeader

title="Analytics"

subtitle=
"Trend analysis and latency monitoring"

icon={
<LineChartOutlined/>
}

actions={

<Radio.Group

value={
timeRange
}

onChange={
(e)=>

setTimeRange(
e.target.value
)
}

optionType=
"button"

buttonStyle=
"solid"

>

<Radio.Button
value="24h"
>

24h

</Radio.Button>

<Radio.Button
value="7d"
>

7d

</Radio.Button>

</Radio.Group>

}

/>


<div className="chart-grid">

<ChartContainer

title=
"Latency Trend"

loading={
loading
}

>

<TrendLineChart

data={
currentData || []
}

lines={[

{
dataKey:
'avg_latency',

name:
'Average',

color:
'var(--chart-1)'
},

{
dataKey:
'avg_pipeline_latency',

name:
'Pipeline',

color:
'var(--chart-2)'
}

]}

/>

</ChartContainer>



<ChartContainer

title=
"Throughput"

loading={
loading
}

>

<TrendAreaChart

data={
currentData || []
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

title=
"Failures"

loading={
loading
}

>

<TrendLineChart

data={
currentData || []
}

lines={[

{
dataKey:
'failures',

name:
'Failures',

color:
'var(--chart-6)'
},

{
dataKey:
'temporary_failures',

name:
'Temp Failures',

color:
'var(--chart-4)'
}

]}

/>

</ChartContainer>



<ChartContainer

title=
"Success"

loading={
loading
}

>

<TrendAreaChart

data={
currentData || []
}

areas={[

{
dataKey:
'success',

name:
'Success',

color:
'var(--chart-2)'
}

]}

/>

</ChartContainer>

</div>



<div
style={{
marginTop:'32px'
}}
>

<ChartContainer

title=
"Latency Comparison"

fullWidth

loading={
loading
}

>

<MultiLineChart

data={
currentData || []
}

lines={[

{
dataKey:
'avg_latency',

name:
'Average'
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

</div>

);

};

export default AnalyticsPage;