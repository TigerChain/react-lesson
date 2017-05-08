import React, { Component, PropTypes } from 'react';
import SyntheticAndNativeEvent from './SyntheticAndNativeEvent.js' ;

import ShowPlus from './ShowPlus.js' ;

import CustomEvent from './CustomEvent.js' ;

/**
 * 合成事件组件
 * 事件的绑定使用 bind 关健字，如果使用的是 es5,那么不用写 bind 关建字，内部帮你做了，可是使用的 es6 那么就要手动 bind
 * 对于合成事件来说，有三种绑定事件的方法
 * 1、在组件中绑定
 * 2、构造方法中绑定：优点只绑定一次
 * 3、使用箭头函数:不用写 bind 关建字
 * @type {[type]}
 */
export default class SyntheticEvent extends Component {
  constructor(props) {
    super(props);
    /**
     * 第二个参数:事件名
     * 第三个参数:所要传递的参数
     * @type {[type]}
     */
    // 2、 在构造方法中绑定事件
    this._click = this._click.bind(this) ;
  }

  render() {
    return (
      <div>
          <p>事件系统:</p>
          1、合成事件:<br/>

          {/* 1、以下就是在组件上绑定事件  */}
          <button  onClick={this._comClick.bind(this)}>组件上绑定事件</button> <p />

          {/* 2、在构造方法中绑定了  */}
          <button  onClick={this._click}>构造方法中绑定事件</button> <p />


          {/* 3、使用箭头函数绑定 不用使用 bind 关健字，内部帮你绑定了*/}

          <button onClick={(e) => this._arrClick(e,"使用箭头函数绑定")}>使用箭头函数绑定事件</button> <p/>

          2、合成事件和原生事件混合:<br />
          <SyntheticAndNativeEvent />
          <br />

          3、组件上"添加"监听器
          <ShowPlus handleClick={this._addPlus}/>

          <br />

          4、原生事件:<br />
          {/* 此事件会覆盖掉以上的 click 事件 由于原生事件的冒泡机制  在这里要注意一点：e.stopPropagation();
          e.preventDefault(); 只会阻止 React 的合成事件冒泡，不能阻止原生事件的冒泡 */}
          <CustomEvent />
      </div>
   );
  }
  _addPlus(){
    alert("this is a plus") ;
  }
  /**
   * 构造方法中绑定事件方法体
   * @param  {[type]} e     [description]  事件对象
   * @param  {[type]} args  [description]  参数
   * @param  {[type]} other [description]  其它一些参数
   * @return {[type]}       [description]
   */
  _click(e,args){
    e.stopPropagation();
    console.log(" 绑定方法: ","this._click = this._click.bind(this,' click 事件','123456','我是其它的，参数个数可以不定') ;");
    console.log(" 事件: ",e);
    console.log(" 参数：",args);
  }

  /**
   * 组件上绑定事件方法体
   * @param  {[type]} e    [description]   事件对象
   * @param  {[type]} args [description]   参数
   * @return {[type]}      [description]
   */
  _comClick(e,args){
    e.stopPropagation();
    console.log(" 绑定方法: ","onClick={this._click.bind(this,'组件上绑定') ;");
    console.log(" 事件: ",e);
    console.log(" 参数：",args);
  }

  /**
   * 箭头函数方法体
   * @param  {[type]} e    [description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  _arrClick(e,args){
    e.stopPropagation();
    console.log(" 绑定方法: ","(e,args) => this._arrClick(e,'使用箭头函数绑定') ;");
    console.log(" 事件: ",e);
    console.log(" 参数：",args);
  }
}
