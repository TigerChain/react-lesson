import React, { Component, PropTypes } from 'react';

import StateLess from './StateLess.js' ;

/**
 * 通过 props来传递state 达到更新组件的目的
 */
export default class PassStateOfprops extends Component {
  constructor(props) {
    super(props);
    this.state = {  //初始化state
      list:[
        '111',
        '222',
        '333'
      ]
    }
  }

  /**
   * 渲染界面
   */
  render() {
    return (<div>
      {this._renderButton()}
      {/* 将state通过props传递到无状态组件StateLess中 */}
      <StateLess datas={this.state.list}/>
    </div>);
  }

/**
 * 渲染一个button
 */
  _renderButton(){
    return(
      <div>
        <button onClick={this._handlerEvent.bind(this)}>改变值</button>
      </div>
    ) ;
  }

  /**
   * 点击事件
   */
  _handlerEvent(){
    this.setState({
      list:['444','555','666']
    }) ;
  }
}
