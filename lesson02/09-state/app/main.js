import React from 'react' ;
import ReactDOM from 'react-dom' ;

import State from './State.js' ;
import PassStateOfprops from './PassStateOfprops.js' ;

ReactDOM.render(
  // <State /> , 测试state的时候使用
  <PassStateOfprops />, //测试无状态组件的时候打开注释即可
  document.getElementById('container')
) ;
