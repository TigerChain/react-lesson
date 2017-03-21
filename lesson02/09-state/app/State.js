import React, { Component, PropTypes } from 'react';

/**
 * 使用es6语法 定义一个State组件
 */
export default class State extends Component {

  constructor(props) {
    super(props);
    this.state = { //初始化state
      countnum:0,
    };
  }

  /**
   * 点击事件方法 countnum+1
   */
  _handlerEvent(){
    this.setState({
      countnum:this.state.countnum+1,
    })
  }
  render() {
    return (<div>
      {this._renderView()}
      {this._logFun()}
    </div>);
  }

  /**
   * 测试log
   */
  _logFun(){
    let num = this.state.countnum ;
    console.log("render调用了"+num+"次");
  }

  /**
   * 渲染一个button组件
   */
  _renderView(){
    return(
      <div>
        <button onClick={this._handlerEvent.bind(this)}>点击{this.state.countnum}次</button>
      </div>
    );
  }
}
