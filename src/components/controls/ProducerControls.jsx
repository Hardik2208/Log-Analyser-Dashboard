import React,{
useEffect,
useState
} from 'react';

import {
Slider,
InputNumber,
Switch,
Button,
Space,
Tag
} from 'antd';

import {
PlayCircleOutlined,
PauseCircleOutlined,
ThunderboltOutlined
} from '@ant-design/icons';

import GlassPanel from '../common/GlassPanel';
import SkeletonLoader from '../common/SkeletonLoader';
import AnimatedNumber from '../common/AnimatedNumber';

import {
fetchProducerConfig,
updateProducerConfig
} from '../../api/endpoints';

const ProducerControls = ({
loading=false
})=>{

const [rps,setRps]=useState(0);

const [enabled,setEnabled]=useState(true);

const [paused,setPaused]=useState(false);

useEffect(()=>{
load();
},[]);

async function load(){

try{

const data=
await fetchProducerConfig();

setRps(
data.rps || 0
);

setEnabled(
data.enabled ?? true
);

}catch(err){

console.error(err);

}

}

async function handleRpsChange(
value
){

setRps(
value
);

await updateProducerConfig({
rps:value
});

}

async function handleToggle(
checked
){

setEnabled(
checked
);

await updateProducerConfig({
enabled:checked
});

}

async function handlePause(){

const next=!paused;

setPaused(next);

await updateProducerConfig({
enabled:!next
});

}

if(loading){

return(

<GlassPanel>

<SkeletonLoader
variant="text"
rows={5}
/>

</GlassPanel>

);

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

<ThunderboltOutlined/>

Producer Control

</div>

<div
style={{
fontSize:12,
color:'var(--text-muted)'
}}
>

Traffic generation management

</div>

</div>

<Tag
color={
enabled
?

'success'

:

'error'
}
>

{
enabled

?

'RUNNING'

:

'STOPPED'
}

</Tag>

</div>


<div
style={{
display:'grid',
gridTemplateColumns:'1fr auto',
gap:16,
marginBottom:20
}}
>

<div>

<div
style={{
fontSize:12,
marginBottom:8
}}
>

Realtime RPS

</div>

<AnimatedNumber
value={
paused || !enabled
?0
:rps
}
suffix="/s"
/>

</div>

<Switch
checked={enabled}
onChange={handleToggle}
/>

</div>


<Slider

min={0}

max={10000}

step={100}

value={rps}

onChange={handleRpsChange}

/>


<div
style={{
display:'flex',
justifyContent:'space-between',
marginTop:12
}}
>

<InputNumber

min={0}

max={10000}

value={rps}

onChange={handleRpsChange}

style={{
width:140
}}

/>

<Space>

<Button

icon={
paused

?

<PlayCircleOutlined/>

:

<PauseCircleOutlined/>
}

onClick={handlePause}
>

{
paused

?

'Resume'

:

'Pause'
}

</Button>

</Space>

</div>

</GlassPanel>

);

};

export default ProducerControls;