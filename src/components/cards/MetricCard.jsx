import React, {
useEffect,
useRef,
useState,
useCallback
} from 'react';

import {
Tooltip
} from 'antd';

import {
TrendingUp,
TrendingDown,
Minus
} from 'lucide-react';

const STATUS_COLORS = {
success:'var(--success)',
warning:'var(--warning)',
danger:'var(--danger)',
info:'var(--accent-indigo)'
};


/*
FORMAT LARGE VALUES

14567493 -> 14.57M
9548999 -> 9.55M
980089 -> 980.1K
119.502582 -> 119.503
*/

const formatMetricValue = (
value
)=>{

const numericValue =
Number(value);

if(
!Number.isFinite(
numericValue
)
){
return String(
value ?? '—'
);
}

if(
numericValue >= 1000000
){

return (
numericValue /
1000000
).toFixed(2)
+
'M';

}

if(
numericValue >= 1000
){

return (
numericValue /
1000
).toFixed(1)
+
'K';

}

if(
Number.isInteger(
numericValue
)
){

return numericValue
.toLocaleString();

}

return numericValue
.toFixed(3);

};


function useAnimatedNumber(
target,
duration=800
){

const [
display,
setDisplay

]=useState(
'0'
);

const rafRef =
useRef(
null
);

const startRef =
useRef(
null
);

const animate =
useCallback(()=>{

const numericTarget =

typeof target ===
'number'

?

target

:

parseFloat(
target
);

if(
Number.isNaN(
numericTarget
)
){

setDisplay(
String(
target ?? '—'
)
);

return;

}

const step = (
timestamp
)=>{

if(
!startRef.current
){

startRef.current =
timestamp;

}

const elapsed =

timestamp -
startRef.current;

const progress =

Math.min(
elapsed /
duration,
1
);

const eased =

1 -
Math.pow(
1-progress,
3
);

const current =

eased *
numericTarget;

setDisplay(

formatMetricValue(
current
)

);

if(
progress < 1
){

rafRef.current =

requestAnimationFrame(
step
);

}

};

startRef.current =
null;

rafRef.current =

requestAnimationFrame(
step
);

},
[
target,
duration
]
);

useEffect(()=>{

animate();

return ()=>{

if(
rafRef.current
){

cancelAnimationFrame(
rafRef.current
);

}

};

},
[
animate
]
);

return display;

}



function MetricCard({

title,

value,

trend,

icon,

status='info',

loading=false,

suffix,

prefix,

className=''

}){

const animatedValue =

useAnimatedNumber(

loading
?

0

:

value

);

const accentColor =

STATUS_COLORS[
status
]

||

STATUS_COLORS.info;

const trendDirection =

trend > 0

?

'up'

:

trend < 0

?

'down'

:

'neutral';

const trendColors={

up:
'var(--success)',

down:
'var(--danger)',

neutral:
'var(--text-muted)'

};

const TrendIcon =

trendDirection==='up'

?

TrendingUp

:

trendDirection==='down'

?

TrendingDown

:

Minus;


if(
loading
){

return(

<div
className={

`metric-card metric-card-${status}`

}
>

Loading...

</div>

);

}


return(

<div

className={

`metric-card metric-card-${status} animate-fade-in ${className}`

}

>

<div
style={styles.header}
>

{

icon && (

<div
style={{

...styles.iconBadge,

background:

`color-mix(in srgb, ${accentColor} 15%, transparent)`,

color:
accentColor

}}
>

{icon}

</div>

)

}


{

trend!==undefined

&&

trend!==null

&&(

<Tooltip

title={

`${trend>0?'+':''}${trend}%`

}

>

<div
style={{

...styles.trendBadge,

color:

trendColors[
trendDirection
]

}}
>

<TrendIcon
size={14}
/>

<span>

{
trend
}

%

</span>

</div>

</Tooltip>

)

}

</div>


<div
style={
styles.valueRow
}
>

<span
className=
"metric-value"
>

{

prefix &&

<span>

{prefix}

</span>

}

{
animatedValue
}

{

suffix &&

<span>

{suffix}

</span>

}

</span>

</div>


<span
style={
styles.label
}
>

{
title
}

</span>

</div>

);

}


const styles={

header:{
display:'flex',
justifyContent:'space-between',
marginBottom:16
},

iconBadge:{
width:40,
height:40,
borderRadius:'50%',
display:'flex',
alignItems:'center',
justifyContent:'center'
},

trendBadge:{
display:'flex',
alignItems:'center',
gap:4
},

valueRow:{
marginBottom:6
},

label:{
display:'block'
}

};

export default MetricCard;