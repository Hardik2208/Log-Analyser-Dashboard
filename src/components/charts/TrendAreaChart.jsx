import React from 'react';

import {
ResponsiveContainer,
AreaChart,
CartesianGrid,
XAxis,
YAxis,
Tooltip,
Legend,
Area
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

const TrendAreaChart = ({
data=[],
areas=[],
height=300
})=>{

return(

<ResponsiveContainer
width="100%"
height={height}
>

<AreaChart
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
areas.map(
area=>(

<Area
key={area.dataKey}
type="monotone"
dataKey={area.dataKey}
name={area.name}
stroke={area.color}
fill={area.color}
fillOpacity={0.25}
connectNulls
/>

)
)
}

</AreaChart>

</ResponsiveContainer>

);

};

export default TrendAreaChart;