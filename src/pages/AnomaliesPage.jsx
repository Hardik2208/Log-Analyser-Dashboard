import React from 'react';

import {
WarningOutlined
} from '@ant-design/icons';

import PageHeader from '../components/common/PageHeader';

import GlassPanel from '../components/common/GlassPanel';

import DataTable from '../components/tables/DataTable';

import MetricCard from '../components/cards/MetricCard';

import {
usePolling
}
from '../hooks/usePolling';

import {
fetchAnomalies,
fetchLatestAnomaly
}
from '../api/endpoints';


const AnomaliesPage = ()=>{


const {
data:anomalyResponse,
loading
}
=
usePolling(
fetchAnomalies,
10000
);


const {
data:latest
}
=
usePolling(
fetchLatestAnomaly,
10000
);


/*
Normalize response
*/

const anomalies =

Array.isArray(
anomalyResponse
)

?

anomalyResponse

:

anomalyResponse?.anomalies

??

anomalyResponse?.items

??

[];



const columns=[

{
title:'TYPE',

dataIndex:'type',

render:(value)=>

value ||

'Unknown'

},


{
title:'SCORE',

dataIndex:'score',

render:(value)=>{

const numeric =
Number(
value
);

return

Number.isFinite(
numeric
)

?

numeric.toFixed(
3
)

:

'0';

}

},


{
title:'SEVERITY',

dataIndex:'severity',

render:(value)=>

value ||

'NORMAL'

},


{
title:'TIME',

dataIndex:'timestamp',

render:(value)=>{

if(!value){

return '-';

}

try{

return new Date(
value
)
.toLocaleString();

}catch{

return value;

}

}

}

];


const latestScore =

latest?.score

??

latest?.anomalyScore

??

0;


const latestType =

latest?.type

??

latest?.anomalyType

??

'None';



return(

<div className="page-container">


<PageHeader

title="Anomalies"

subtitle=
"Realtime anomaly detection and monitoring"

icon={
<WarningOutlined/>
}

/>



<div

className="metric-grid"

style={{
marginBottom:24
}}

>

<MetricCard

title="Total"

value={
anomalies?.length || 0
}

status="warning"

/>


<MetricCard

title="Latest Score"

value={
latestScore
}

status="danger"

/>


<MetricCard

title="Latest Type"

value={
latestType
}

status="info"

/>

</div>



<GlassPanel>

{

anomalies.length === 0

?

(

<div
style={{

padding:'32px',

textAlign:'center',

color:
'var(--text-muted)'

}}
>

No anomalies detected

</div>

)

:

(

<DataTable

columns={
columns
}

dataSource={
anomalies
}

loading={
loading
}

rowKey={(row,index)=>

row?.id

||

row?.timestamp

||

index

}

/>

)

}

</GlassPanel>

</div>

);

};

export default AnomaliesPage;