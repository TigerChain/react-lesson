import React from 'react' ;

//定义一个HelloWorld组件
class HelloWorld extends React.Component{
  render(){
    return (
      <div> HelloWorld webpackAndReact</div>
    )
  }
}

//将HelloWorld暴露出去 供外面类使用
module.exports = HelloWorld
