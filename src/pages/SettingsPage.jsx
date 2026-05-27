import React,
{
useEffect
}
from 'react';

import {
SettingOutlined
}
from '@ant-design/icons';

import {
Form,
Slider,
Switch,
Radio
}
from 'antd';

import PageHeader from '../components/common/PageHeader';
import GlassPanel from '../components/common/GlassPanel';

import {
useTheme
}
from '../theme/ThemeContext';

const SettingsPage = ()=>{

const [form] =
Form.useForm();

const {
theme,
setTheme

}
=
useTheme();

useEffect(()=>{

form.setFieldsValue({

theme

});

},
[
theme,
form
]
);

const handleValuesChange =
(
changedValues
)=>{

if(
changedValues.theme
){

setTheme(
changedValues.theme
);

}

};

return(

<div className="page-container">

<PageHeader

title="Settings"

subtitle=
"Dashboard configuration"

icon={
<SettingOutlined/>
}

/>

<Form

form={form}

layout="vertical"

onValuesChange={
handleValuesChange
}

initialValues={{

dashboardRefresh:10,

healthRefresh:10,

trendRefresh:30,

failureAlerts:true,

healthWarnings:true,

latencyAlerts:false,

theme

}}

>

<div
style={{

display:'grid',

gridTemplateColumns:
'1fr 1fr',

gap:'24px'

}}
>

<GlassPanel>

<div className="section-title">

Refresh Intervals

</div>

<Form.Item

name=
"dashboardRefresh"

label=
"Dashboard Refresh (seconds)"

>

<Slider

min={1}

max={30}

/>

</Form.Item>

<Form.Item

name=
"healthRefresh"

label=
"Health Refresh (seconds)"

>

<Slider

min={5}

max={30}

/>

</Form.Item>

<Form.Item

name=
"trendRefresh"

label=
"Trend Refresh (seconds)"

>

<Slider

min={10}

max={120}

/>

</Form.Item>

</GlassPanel>


<GlassPanel>

<div className="section-title">

Alerts

</div>

<Form.Item

name=
"failureAlerts"

valuePropName=
"checked"

>

<Switch/>

<span
style={{
marginLeft:8
}}
>

Failure Alerts

</span>

</Form.Item>


<Form.Item

name=
"healthWarnings"

valuePropName=
"checked"

>

<Switch/>

<span
style={{
marginLeft:8
}}
>

Health Warnings

</span>

</Form.Item>


<Form.Item

name=
"latencyAlerts"

valuePropName=
"checked"

>

<Switch/>

<span
style={{
marginLeft:8
}}
>

Latency Alerts

</span>

</Form.Item>

</GlassPanel>


<GlassPanel>

<div className="section-title">

Theme

</div>

<Form.Item

name=
"theme"

label=
"Color Theme"

>

<Radio.Group

optionType=
"button"

buttonStyle=
"solid"

>

<Radio.Button
value="dark"
>

Dark

</Radio.Button>

<Radio.Button
value="light"
>

Light

</Radio.Button>

<Radio.Button
value="system"
>

System

</Radio.Button>

</Radio.Group>

</Form.Item>

</GlassPanel>


<GlassPanel>

<div className="section-title">

System Info

</div>

<div
style={{
display:'grid',
gap:'16px'
}}
>

<div>

API Source:

Realtime Metrics

</div>

<div>

Trend Source:

MySQL Windows

</div>

<div>

Health:

Redis Monitor

</div>

<div>

DLQ:

Stats Only

</div>

</div>

</GlassPanel>

</div>

</Form>

</div>

);

};

export default SettingsPage;