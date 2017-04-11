import React from 'react' ;
import ReactDOM from 'react-dom' ;

import LifeCycle from './LifeCycle.js' ;

/**
 * 定义一个父组件
 */
class Main extends React.Component{

  constructor(props){
    super(props) ;
    this.state = {
      name:'junjun'
    }
  }

   render(){
     return(
       <LifeCycle
         umout={this.unmoutComponent}
         name={this.state.name}
         testComponentWillReceiveProps={this.changeState.bind(this)}
       />
     ) ;
   }

   /**
    * 卸载组件
    */
   unmoutComponent(){
     // 这里卸载父组件也会导致卸载子组件
     ReactDOM.unmountComponentAtNode(document.getElementById("container"));
   }

/**
 * 通过修改 state 来修改 props 用来测试 componentWillReceiveProps 方法
 */
   changeState(){
     this.setState({
       name:'TigerChain11111'
     })
   }

}


ReactDOM.render(
  <Main />,
  document.getElementById('container')
) ;







// yarn add react react-dom babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 webpack webpack-dev-server --dev
