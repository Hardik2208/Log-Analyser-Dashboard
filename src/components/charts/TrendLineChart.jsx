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

const formatXAxis = (value)=>{

if(!value){
return '';
}

const date =
new Date(value);

if(
Number.isNaN(
date.getTime()
)
){
return value;
}

const hasTime =
value.includes(':');

if(hasTime){

return date.toLocaleTimeString(
[],
{
hour:'2-digit',
minute:'2-digit'
}
);

}

return date.toLocaleDateString(
[],
{
day:'2-digit',
month:'short'
}
);

};

const CustomTooltip = ({
active,
payload,
label
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
background:'var(--bg-secondary)',
padding:'12px',
borderRadius:'8px'
}}
>

<div
style={{
marginBottom:'8px'
}}
>

{
formatXAxis(
label
)
}

</div>

{
payload.map(
(entry)=>{

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
data=[],
lines=[],
height=300
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
tickFormatter={formatXAxis}
tick={{
fontSize:11
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
<CustomTooltip/>
}
/>

<Legend/>

{
lines.map(
line=>(

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