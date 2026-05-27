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

const MultiLineChart = ({
data=[],
lines=[],
height=320
})=>{

return(

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

<Tooltip/>

<Legend/>

{
lines.map(
line=>(

<Line
key={line.dataKey}
type="monotone"
dataKey={line.dataKey}
stroke={line.color}
name={line.name}
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

export default MultiLineChart;