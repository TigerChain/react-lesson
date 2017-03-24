import React from 'react' ;
import ReactDOM from 'react-dom' ;
//引入微博列表组件
import WeiBoList from './WeiBoList.js' ;
//导入数据
import datas from '../data/data.json' ;

//渲染微博列表 并且把数据 通过props传递到 WeiBoList中
ReactDOM.render(
 <WeiBoList data={datas.data}/>,
  document.getElementById('container')
) ;
