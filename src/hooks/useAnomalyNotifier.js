import {
useEffect,
useRef
}
from 'react';

import {
notification
}
from 'antd';

import {
fetchLatestAnomaly
}
from '../api/endpoints';

export default function useAnomalyNotifier(){

const lastId=
useRef(
null
);

useEffect(()=>{

async function check(){

try{

const anomaly =
await fetchLatestAnomaly();

if(
!anomaly
){
return;
}

const id =

anomaly.id

||

anomaly.timestamp

||

JSON.stringify(
anomaly
);

if(
lastId.current === id
){
return;
}

lastId.current = id;

notification.warning({

message:
'Anomaly Detected',

description:

`${anomaly.type || 'Unknown'}
Score:
${anomaly.score || 0}`,

duration:6

});

}catch(err){

console.error(
err
);

}

}

check();

const interval=
setInterval(
check,
5000
);

return ()=>{

clearInterval(
interval
);

};

},[]);

}