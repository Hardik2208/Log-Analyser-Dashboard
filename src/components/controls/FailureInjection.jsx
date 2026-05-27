import React,{
useEffect,
useState
}
from 'react';

import {
Switch,
Slider,
Badge,
Progress,
Tag
}
from 'antd';

import {
ShieldAlert
}
from 'lucide-react';

import GlassPanel from '../common/GlassPanel';

import {
fetchTempFailureRate,
updateTempFailureRate
}
from '../../api/endpoints';

const STORAGE_KEY =
'temp_failure_rate';

const FailureInjection = ()=>{

const storedValue =

Number(
localStorage.getItem(
STORAGE_KEY
)
) || 0;

const [
rate,
setRate
]=useState(
storedValue
);

const [
enabled,
setEnabled
]=useState(
storedValue > 0
);

const [
loading,
setLoading
]=useState(false);


useEffect(()=>{

load();

const interval =
setInterval(
load,
5000
);

return ()=>{

clearInterval(
interval
);

};

},[]);


async function load(){

try{

setLoading(
true
);

const data =
await fetchTempFailureRate();

const backendValue =

data?.tempFailureRate

??

data?.temp_failure_rate

??

data?.failureRate

??

data?.rate;

if(
backendValue !==
undefined &&
backendValue !==
null
){

const percent =

Number(
backendValue
)*100;

setRate(
percent
);

setEnabled(
percent > 0
);

localStorage.setItem(
STORAGE_KEY,
percent
);

return;

}

/*
fallback
*/

const cached =

Number(
localStorage.getItem(
STORAGE_KEY
)
) || 0;

setRate(
cached
);

setEnabled(
cached > 0
);

}catch(err){

console.error(
err
);

const cached =

Number(
localStorage.getItem(
STORAGE_KEY
)
) || 0;

setRate(
cached
);

setEnabled(
cached > 0
);

}

finally{

setLoading(
false
);

}

}



async function handleToggle(
checked
){

setEnabled(
checked
);

const nextRate =

checked

?

rate

:0;

setRate(
nextRate
);

localStorage.setItem(
STORAGE_KEY,
nextRate
);

await updateTempFailureRate(
nextRate/100
);

}



async function handleRate(
value
){

setRate(
value
);

localStorage.setItem(
STORAGE_KEY,
value
);

if(
enabled
){

await updateTempFailureRate(
value/100
);

}

}



return(

<GlassPanel>

<div
style={{
display:'flex',
justifyContent:'space-between',
alignItems:'center',
marginBottom:20
}}
>

<div>

<div className="section-title">

<ShieldAlert
size={18}
/>

Failure Injection

</div>

<div
style={{
fontSize:12,
color:'var(--text-muted)'
}}
>

Temporary failure simulation

</div>

</div>

<Tag
color={
enabled
?
'warning'
:
'default'
}
>

{
loading

?

'SYNC'

:

enabled

?

'ACTIVE'

:

'OFF'
}

</Tag>

</div>


<div
style={{
display:'flex',
justifyContent:'space-between',
marginBottom:20
}}
>

<div>

<div
style={{
fontSize:12
}}
>

Injection State

</div>

<Badge

status={
enabled
?
'warning'
:
'default'
}

text={
enabled
?
'Running'
:
'Disabled'
}

/>

</div>

<Switch

checked={
enabled
}

loading={
loading
}

onChange={
handleToggle
}

/>

</div>


<Progress

percent={
Math.round(
rate
)
}

status={
enabled
?
'active'
:
'normal'
}

/>


<Slider

min={0}

max={100}

value={rate}

disabled={
!enabled ||
loading
}

onChange={
handleRate
}

/>


<div
style={{
display:'flex',
justifyContent:'space-between',
fontSize:12,
color:'var(--text-muted)'
}}
>

<span>

0%

</span>

<span>

Current:

{
rate.toFixed(
1
)
}

%

</span>

<span>

100%

</span>

</div>

</GlassPanel>

);

};

export default FailureInjection;