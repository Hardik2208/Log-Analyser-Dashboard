import { useLocation, useNavigate } from 'react-router-dom';

import {
Layout,
Menu
} from 'antd';

import {
DashboardOutlined,
LineChartOutlined,
ControlOutlined,
WarningOutlined,
RetweetOutlined,
DatabaseOutlined,
HeartOutlined,
SettingOutlined
}
from '@ant-design/icons';

import {
Activity
}
from 'lucide-react';

import {
useTheme
}
from '../theme/ThemeContext';

const {
Sider
} = Layout;


const menuItems = [

{
key:'/dashboard',
icon:<DashboardOutlined />,
label:'Dashboard'
},

{
key:'/anomalies',
icon:<WarningOutlined />,
label:'Anomalies'
},

{
key:'/control-panel',
icon:<ControlOutlined />,
label:'Control Panel'
},

{
key:'/analytics',
icon:<LineChartOutlined />,
label:'Analytics'
},


{
key:'/retry',
icon:<RetweetOutlined />,
label:'Retry Monitor'
},

{
key:'/storage',
icon:<DatabaseOutlined />,
label:'Storage'
},

{
key:'/system-health',
icon:<HeartOutlined />,
label:'System Health'
},

{
type:'divider'
},

{
key:'/settings',
icon:<SettingOutlined />,
label:'Settings'
}

];


function Sidebar({

collapsed,

onCollapse

}){

const location =
useLocation();

const navigate =
useNavigate();

const {
resolvedTheme
}
=
useTheme();


function handleMenuClick({
key
}){

navigate(
key
);

}


return(

<Sider

collapsible

collapsed={
collapsed
}

onCollapse={
onCollapse
}

trigger={null}

width={260}

collapsedWidth={72}

style={{

position:'fixed',

left:0,

top:0,

bottom:0,

height:'100vh',

zIndex:100,

background:
'var(--bg-secondary)',

borderRight:
'1px solid var(--border-subtle)',

display:'flex',

flexDirection:'column',

overflow:'hidden'

}}

>

{/* LOGO */}

<div

style={{

height:
'var(--topbar-height)',

display:'flex',

alignItems:'center',

padding:

collapsed

?

'0 20px'

:

'0 24px',

gap:12,

borderBottom:
'1px solid var(--border-subtle)',

flexShrink:0

}}

>

<div

style={{

width:32,

height:32,

borderRadius:8,

background:
'linear-gradient(135deg,var(--accent-indigo),var(--accent-cyan))',

display:'flex',

alignItems:'center',

justifyContent:'center',

flexShrink:0

}}

>

<Activity

size={18}

color="#fff"

strokeWidth={2.5}

/>

</div>


{

!collapsed

&&

(

<div
style={{
overflow:'hidden'
}}
>

<div

style={{

fontSize:16,

fontWeight:700,

color:
'var(--text-primary)',

letterSpacing:
'-0.02em',

lineHeight:1.2,

whiteSpace:
'nowrap'

}}

>

EventFlow

</div>

<div

style={{

fontSize:11,

color:
'var(--text-muted)',

letterSpacing:
'0.04em',

textTransform:
'uppercase',

whiteSpace:
'nowrap'

}}

>

Observability

</div>

</div>

)

}

</div>



{/* NAVIGATION */}

<div

style={{

flex:1,

overflowY:'auto',

overflowX:'hidden',

padding:'8px 0'

}}

>

<Menu

theme={
resolvedTheme
}

mode="inline"

selectedKeys={[
location.pathname
]}

items={
menuItems
}

onClick={
handleMenuClick
}

style={{

border:'none',

background:
'transparent'

}}

/>

</div>



{/* FOOTER STATUS */}

<div

style={{

padding:

collapsed

?

'12px 8px'

:

'12px 16px',

borderTop:
'1px solid var(--border-subtle)',

flexShrink:0

}}

>

<div

style={{

display:'flex',

alignItems:'center',

gap:10,

padding:'8px 12px',

borderRadius:
'var(--radius-md)',

background:
'rgba(16,185,129,0.08)',

border:
'1px solid rgba(16,185,129,0.15)'

}}

>

<span
className=
"status-dot status-dot-healthy"
/>

{

!collapsed

&&

(

<div>

<div

style={{

fontSize:12,

fontWeight:500,

color:
'var(--success)'

}}

>

System Online

</div>

<div

style={{

fontSize:10,

color:
'var(--text-muted)'

}}

>

Observability Active

</div>

</div>

)

}

</div>

</div>

</Sider>

);

}

export default Sidebar;