import React from 'react';
import { WarningOutlined } from '@ant-design/icons';

import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/cards/StatCard';
import GlassPanel from '../components/common/GlassPanel';
import SkeletonLoader from '../components/common/SkeletonLoader';

import { useFetch } from '../hooks/useFetch';
import { fetchDLQStats } from '../api/endpoints';

const DLQPage = () => {

const {
data: dlqData,
loading: dlqLoading

}=useFetch(
fetchDLQStats
);

const stats =
dlqData?.stats || {};

return (

<div className="page-container">

<PageHeader
title="Dead Letter Queue"
subtitle="Monitor DLQ statistics and failures"
icon={<WarningOutlined />}
/>

<div
className="metric-grid"
style={{
marginBottom:'32px'
}}
>

<StatCard

title="Total DLQ"

value={
stats.total || 0
}

icon={
<WarningOutlined />
}

color="var(--danger)"

loading={
dlqLoading
}

/>

<StatCard

title="Pending"

value={
stats.pending || 0
}

icon={
<WarningOutlined />
}

color="var(--warning)"

loading={
dlqLoading
}

/>

<StatCard

title="Recovered"

value={
stats.recovered || 0
}

icon={
<WarningOutlined />
}

color="var(--success)"

loading={
dlqLoading
}

/>

<StatCard

title="Discarded"

value={
stats.discarded || 0
}

icon={
<WarningOutlined />
}

color="var(--text-muted)"

loading={
dlqLoading
}

/>

</div>

<GlassPanel>

<div
className="section-title"
>

DLQ Overview

</div>

{

dlqLoading

?

(

<SkeletonLoader
variant="table"
/>

)

:

(

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

marginBottom:6

}}
>

Retry Queue Size

</div>

<div
style={{

fontSize:24,

fontWeight:600

}}
>

{
stats.retryQueueSize || 0
}

</div>

</div>

<div>

<div
style={{

fontSize:12,

color:
'var(--text-muted)',

marginBottom:6

}}
>

DLQ Events

</div>

<div
style={{

fontSize:24,

fontWeight:600

}}
>

{
stats.total || 0
}

</div>

</div>

<div>

<div
style={{

fontSize:12,

color:
'var(--text-muted)',

marginBottom:6

}}
>

Recovery Rate

</div>

<div
style={{

fontSize:24,

fontWeight:600

}}
>

{
stats.recoveryRate || 0
}

%

</div>

</div>

<div>

<div
style={{

fontSize:12,

color:
'var(--text-muted)',

marginBottom:6

}}
>

Failure Ratio

</div>

<div
style={{

fontSize:24,

fontWeight:600

}}
>

{
stats.failureRatio || 0
}

%

</div>

</div>

</div>

)

}

</GlassPanel>

</div>

);

};

export default DLQPage;