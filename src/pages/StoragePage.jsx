import React,
{
useState
}
from 'react';

import {
DatabaseOutlined
}
from '@ant-design/icons';

import {
Tabs
}
from 'antd';

import PageHeader from '../components/common/PageHeader';

import DataTable from '../components/tables/DataTable';

import StatCard from '../components/cards/StatCard';

import {
useFetch
}
from '../hooks/useFetch';

import {
fetchWindowMetrics,
fetchSystemMetrics,
fetchHealth
}
from '../api/endpoints';

const StoragePage = ()=>{

const [
activeTab,
setActiveTab

]=useState(
'1'
);

const {

data:windowData,
loading:windowLoading

}
=
useFetch(
fetchWindowMetrics
);

const {

data:systemData,
loading:systemLoading

}
=
useFetch(
fetchSystemMetrics
);

const {

data:healthData,
loading:healthLoading

}
=
useFetch(
fetchHealth
);

const columns=[

{
title:
'WINDOW',

dataIndex:
'window',

key:
'window'
},

{
title:
'TOTAL',

dataIndex:
'total_attempts',

key:
'total_attempts'
},

{
title:
'SUCCESS',

dataIndex:
'success',

key:
'success'
},

{
title:
'FAILURES',

dataIndex:
'failures',

key:
'failures'
},

{
title:
'TEMP FAILURES',

dataIndex:
'temporary_failures',

key:
'temporary_failures'
},

{
title:
'AVG LATENCY',

dataIndex:
'avg_latency',

key:
'avg_latency'
}

];

const items=[

{

key:'1',

label:
'Window History',

children:

<DataTable

columns={
columns
}

dataSource={
windowData?.windows
||
[]
}

loading={
windowLoading
}

/>

},

{

key:'2',

label:
'System Metrics',

children:(

<div className="metric-grid">

<StatCard

title=
"Failure Rate"

value={
systemData?.failureRate
||
0
}

icon={
<DatabaseOutlined/>
}

color=
"var(--danger)"

loading={
systemLoading
}

/>

<StatCard

title=
"Success Rate"

value={
systemData?.successRate
||
0
}

icon={
<DatabaseOutlined/>
}

color=
"var(--success)"

loading={
systemLoading
}

/>

<StatCard

title=
"Retry Amplification"

value={
systemData?.retryAmplification
||
0
}

icon={
<DatabaseOutlined/>
}

color=
"var(--warning)"

loading={
systemLoading
}

/>

<StatCard

title=
"Baseline Latency"

value={
systemData?.baselineLatency
||
0
}

icon={
<DatabaseOutlined/>
}

color=
"var(--info)"

loading={
systemLoading
}

/>

</div>

)

},

{

key:'3',

label:
'Redis Health',

children:(

<div className="metric-grid">

<StatCard

title=
"Redis"

value={

healthData
?.services
?.redis
?.status

||

'unknown'

}

icon={
<DatabaseOutlined/>
}

color=
"var(--success)"

loading={
healthLoading
}

/>

<StatCard

title=
"Kafka"

value={

healthData
?.services
?.kafka
?.status

||

'unknown'

}

icon={
<DatabaseOutlined/>
}

color=
"var(--info)"

loading={
healthLoading
}

/>

<StatCard

title=
"API"

value={

healthData
?.services
?.api
?.status

||

'unknown'

}

icon={
<DatabaseOutlined/>
}

color=
"var(--warning)"

loading={
healthLoading
}

/>

</div>

)

}

];

return(

<div className="page-container">

<PageHeader

title=
"Storage"

subtitle=
"Historical windows and system storage"

icon={
<DatabaseOutlined/>
}

/>

<Tabs

activeKey={
activeTab
}

items={
items
}

onChange={
setActiveTab
}

animated={false}

/>

</div>

);

};

export default StoragePage;