import React from 'react';

import {
HeartOutlined,
SyncOutlined
}
from '@ant-design/icons';

import PageHeader from '../components/common/PageHeader';

import HealthCard from '../components/cards/HealthCard';

import GlassPanel from '../components/common/GlassPanel';

import StatusBadge from '../components/common/StatusBadge';

import SkeletonLoader from '../components/common/SkeletonLoader';

import {
usePolling
}
from '../hooks/usePolling';

import {
fetchHealth
}
from '../api/endpoints';

const SystemHealthPage = ()=>{

const {

data:healthData,

loading

}
=
usePolling(
fetchHealth,
10000
);

return(

<div className="page-container">

<PageHeader

title=
"System Health"

subtitle=
"Service monitoring and diagnostics"

icon={
<HeartOutlined/>
}

actions={

<div
style={{

fontSize:'12px',

color:
'var(--text-muted)',

display:'flex',

alignItems:'center',

gap:'6px'

}}
>

<SyncOutlined
spin
/>

Auto Refresh 10s

</div>

}

/>


<GlassPanel

style={{

marginBottom:'32px',

display:'flex',

justifyContent:
'space-between',

alignItems:
'center'

}}
>

<div>

<h2
style={{

margin:
'0 0 8px 0',

fontSize:'18px'

}}
>

Overall System Status

</h2>

<div
style={{

fontSize:'14px',

color:
'var(--text-secondary)'

}}
>

Realtime health state

</div>

</div>

{

loading

?

<SkeletonLoader

variant=
"metric"

width={100}

/>

:

<StatusBadge

status={
healthData?.overall
||
'unknown'
}

/>

}

</GlassPanel>



<div
style={{

display:'grid',

gridTemplateColumns:
'repeat(3,1fr)',

gap:'24px'

}}
>


<HealthCard

name=
"Kafka"

status={
healthData
?.services
?.kafka
?.status
}

latency={
healthData
?.services
?.kafka
?.latency
}

uptime={
healthData
?.services
?.kafka
?.uptime
}

lastCheck={
healthData
?.services
?.kafka
?.lastCheck
}

details={
healthData
?.services
?.kafka
?.details
}

loading={
loading
}

/>


<HealthCard

name=
"Redis"

status={
healthData
?.services
?.redis
?.status
}

latency={
healthData
?.services
?.redis
?.latency
}

uptime={
healthData
?.services
?.redis
?.uptime
}

lastCheck={
healthData
?.services
?.redis
?.lastCheck
}

details={
healthData
?.services
?.redis
?.details
}

loading={
loading
}

/>


<HealthCard

name=
"MySQL"

status={
healthData
?.services
?.mysql
?.status
}

latency={
healthData
?.services
?.mysql
?.latency
}

uptime={
healthData
?.services
?.mysql
?.uptime
}

lastCheck={
healthData
?.services
?.mysql
?.lastCheck
}

details={
healthData
?.services
?.mysql
?.details
}

loading={
loading
}

/>


<HealthCard

name=
"Gateway"

status={
healthData
?.services
?.gateway
?.status
}

latency={
healthData
?.services
?.gateway
?.latency
}

uptime={
healthData
?.services
?.gateway
?.uptime
}

lastCheck={
healthData
?.services
?.gateway
?.lastCheck
}

details={
healthData
?.services
?.gateway
?.details
}

loading={
loading
}

/>


<HealthCard

name=
"API"

status={
healthData
?.services
?.api
?.status
}

latency={
healthData
?.services
?.api
?.latency
}

uptime={
healthData
?.services
?.api
?.uptime
}

lastCheck={
healthData
?.services
?.api
?.lastCheck
}

details={
healthData
?.services
?.api
?.details
}

loading={
loading
}

/>


<GlassPanel>

<div
className=
"section-title"
>

Health Summary

</div>

<div
style={{
display:'grid',
gap:'16px'
}}
>

<div>

Overall:

{
healthData?.overall
}

</div>

<div>

Redis:

{
healthData
?.services
?.redis
?.status
}

</div>

<div>

Kafka:

{
healthData
?.services
?.kafka
?.status
}

</div>

<div>

MySQL:

{
healthData
?.services
?.mysql
?.status
}

</div>

</div>

</GlassPanel>

</div>

</div>

);

};

export default SystemHealthPage;