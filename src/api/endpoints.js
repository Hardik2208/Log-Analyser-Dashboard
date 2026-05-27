/**
 * REAL API SERVICE LAYER
 * Updated from backend server.js
 */

const BASE_URL =
'http://13.127.32.97:3000';


// ===================================
// COMMON API
// ===================================

async function api(
path,
options={}
){

const response =
await fetch(

`${BASE_URL}${path}`,

{
headers:{
'Content-Type':
'application/json'
},

...options

}

);

if(
!response.ok
){

throw new Error(
`API failed ${path}`
);

}

return response.json();

}


// ===================================
// METRICS
// ===================================

export const fetchLatestMetrics =
async ()=>{

const data =
await api(
'/metrics/latest'
);

return {

throughput:
Number(
data.total_attempts || 0
),

successCount:
Number(
data.success || 0
),

failureCount:
Number(
data.failures || 0
),

temporaryFailures:
Number(
data.temporary_failures || 0
),

retryAmplification:
Number(
data.retry_amplification || 0
),

avgLatency:
Number(
data.avg_latency || 0
),

pipelineLatency:
Number(
data.avg_pipeline_latency || 0
),

endToEndLatency:
Number(
data.avg_end_to_end_latency || 0
),

ingestionLatency:
Number(
data.avg_ingestion_latency || 0
),

retryDelay:
Number(
data.avg_retry_delay || 0
),

queueDelay:
Number(
data.avg_queue_delay || 0
),

processingTime:
Number(
data.avg_processing_time || 0
),

healthStatus:
'healthy',

trafficStatus:
'active'

};

};


export const fetchSystemMetrics =
async ()=>{

const data =
await api(
'/metrics/system'
);

return {

kafka:{

status:
data.state ||
'unknown',

lag:0

},

redis:{

status:
data.state ||
'unknown',

memory:'0GB'

},

mysql:{

status:
data.state ||
'unknown',

connections:0

},

consumers:{

status:
data.state ||
'unknown',

active:1

},

failureRate:
Number(
data.failure_rate || 0
),

successRate:
Number(
data.success_rate || 0
),

temporaryFailureRate:
Number(
data.temporary_failure_rate || 0
),

retryAmplification:
Number(
data.retry_amplification || 0
),

baselineLatency:
Number(
data.baseline_latency || 0
)

};

};


// ===================================
// NORMALIZER
// ===================================

function normalizeTrend(
rows=[]
){

return rows.map(
item=>({

...item,

throughput:
Number(
item.throughput || 0
),

success:
Number(
item.success || 0
),

failures:
Number(
item.failures || 0
),

temporary_failures:
Number(
item.temporary_failures || 0
),

retry_amplification:
Number(
item.retry_amplification || 0
),

avg_latency:
Number(
item.avg_latency || 0
),

avg_pipeline_latency:
Number(
item.avg_pipeline_latency || 0
),

avg_end_to_end_latency:
Number(
item.avg_end_to_end_latency || 0
),

avg_ingestion_latency:
Number(
item.avg_ingestion_latency || 0
)

})

);

}


// ===================================
// TRENDS
// ===================================

export const fetchDayTrend =
async ()=>{

const data =
await api(
'/metrics/trend/day'
);

return normalizeTrend(
data.trend || []
);

};


export const fetchWeekTrend =
async ()=>{

const data =
await api(
'/metrics/trend/week'
);

return normalizeTrend(
data.trend || []
);

};


export const fetchCustomTrend =
async (

from,
to,
bucket='day'

)=>{

const data =
await api(

`/metrics/trend/custom?service=order&from=${from}&to=${to}&bucket=${bucket}`

);

return normalizeTrend(
data.trend || []
);

};


// ===================================
// DASHBOARD
// ===================================

export const fetchDashboardSummary =
async ()=>{

return api(
'/dashboard/summary'
);

};


// ===================================
// WINDOW HISTORY
// ===================================

export const fetchWindowMetrics =
async (
limit=50
)=>{

return api(

`/metrics/window?limit=${limit}`

);

};


// ===================================
// ANOMALIES
// ===================================

export const fetchAnomalies =
async ()=>{

return api(
'/anomalies'
);

};


export const fetchLatestAnomaly =
async ()=>{

return api(
'/anomalies/latest'
);

};


// ===================================
// DLQ
// ===================================

export const fetchDLQStats =
async ()=>{

return api(
'/dlq/stats'
);

};


// ===================================
// HEALTH
// ===================================

export const fetchHealth =
async ()=>{

const data =
await api(
'/health'
);

return {

overall:

data.status ===
'OK'

?

'healthy'

:

'critical',

services:{

kafka:{

status:
'healthy',

latency:0,

uptime:'N/A',

lastCheck:
data.timestamp,

details:
'Kafka active'

},

redis:{

status:

data.redis

?

'healthy'

:

'critical',

latency:0,

uptime:'N/A',

lastCheck:
data.timestamp,

details:
'Redis'

},

mysql:{

status:
'unknown',

latency:0,

uptime:'N/A',

lastCheck:
data.timestamp,

details:
'No API'

},

gateway:{

status:
'healthy',

latency:0,

uptime:'N/A',

lastCheck:
data.timestamp,

details:
'Running'

},

api:{

status:
'healthy',

latency:0,

uptime:'N/A',

lastCheck:
data.timestamp,

details:
'Running'

}

}

};

};



// ===================================
// POLLING
// ===================================

export const REFRESH_INTERVALS={

latest:1000,

system:2000,

dashboard:5000,

health:10000,

dayTrend:30000,

weekTrend:60000,

window:30000,

anomaly:10000

};

// ===================================
// PRODUCER CONTROL
// ===================================

export const fetchProducerConfig =
async ()=>{

const data =
await api(
'/producer/config'
);

return {

enabled:
Boolean(
data.enabled
),

rps:
Number(
data.rps || 0
)

};

};


export const fetchProducerRps =
async ()=>{

const data =
await api(
'/producer/config'
);

return {

rps:
Number(
data.rps || 0
)

};

};


export const updateProducerRps =
async (rps)=>{

return api(

'/producer/rps',

{

method:'POST',

body:
JSON.stringify({

rps:
Number(
rps
)

})

}

);

};


export const toggleProducer =
async (enabled)=>{

return api(

'/producer/enable',

{

method:'POST',

body:
JSON.stringify({

enabled:
Boolean(
enabled
)

})

}

);

};


export const pauseProducer =
async ()=>{

return toggleProducer(
false
);

};


export const resumeProducer =
async ()=>{

return toggleProducer(
true
);

};


// ===================================
// FAILURE CONTROL
// ===================================

export const fetchDLQCount =
async ()=>{

return api(
'/dlq/count'
);

};


export const fetchDLQList =
async (
page=1,
limit=50
)=>{

return api(

`/dlq/list?page=${page}&limit=${limit}`

);

};


export const fetchRetryStats =
async ()=>{

return api(
'/retry/stats'
);

};


export const updateFailureInjection =
async (

enabled,
rate

)=>{

return api(

'/control/temp-failure',

{

method:'POST',

body:
JSON.stringify({

enabled:
Boolean(
enabled
),

rate:
Number(
rate
)

})

}

);

};


export const fetchTempFailureRate =
async ()=>{

const retry =
await fetchRetryStats();

return {

tempFailureRate:
Number(
retry.temporary_failures || 0
)

};

};


export const updateTempFailureRate =
async (rate)=>{

return updateFailureInjection(

rate > 0,

rate

);

};


export const enableTempFailure =
async (rate)=>{

return updateTempFailureRate(
rate
);

};


export const disableTempFailure =
async ()=>{

return updateTempFailureRate(
0
);

};

// ===================================
// LEGACY COMPATIBILITY
// ===================================

export const updateProducerConfig =
async (config)=>{

const tasks = [];

if(
config.rps !== undefined
){

tasks.push(

updateProducerRps(
config.rps
)

);

}

if(
config.enabled !== undefined
){

tasks.push(

toggleProducer(
config.enabled
)

);

}

await Promise.all(
tasks
);

return {

success:true,

...config

};

};


export const updateFailureConfig =
async (config)=>{

return updateFailureInjection(

config.enabled ??
true,

config.rate ?? 0

);

};