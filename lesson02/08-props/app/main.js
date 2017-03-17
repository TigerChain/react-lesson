import React from 'react' ;
import ReactDOM from 'react-dom' ;

import Props from './props.js' ;


var propsData = {
  name:'TigerChain',
  address:'China',
  height:'175CM',
}

function testFun(param) {
  let newParam = param.concat("TigerChain");
  console.log(newParam);
}

ReactDOM.render(
  <Props
    data={{...propsData}}
    // age={"100"}  如果 放开这行注释下面一行，打开chrome的console会报格式不正确  这就是propTypes作用
    age={100}
    data2={"我是属性值2"}
    data1={testFun}
    />,
    document.getElementById('container')
);
