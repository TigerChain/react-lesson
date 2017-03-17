import React, { Component, PropTypes } from 'react';

import PropsChildRen from './propschildren.js' ;

/**
 * 自定义一个prpos属性
 */
export default class Props extends React.Component {

  constructor(props){
    super(props);
    this._handlerClick = this._handlerClick.bind(this)
  }

/**
 * 设置默认属性
 * @type {Object}
 */
 static defaultProps = {
   default:"我是默认的"
 }

 static propTypes = {
   age: React.PropTypes.number,
 };

 //测试方法点击事件
  _handlerClick(){
      {this.props.data1("我是测试方法:")}
  }

  render() {
    return (
      <div>
               默认属性值:{this.props.default}
               <br/>
                以下是传递过来的值:<br/>
               名字:{this.props.data.name}
               <br/>
               地址:{this.props.data.address}
               <br />
               身高:{this.props.data.height}
               <br />

               年龄:{this.props.age}
             <br />
               {this.props.data2}

               <br />
               <button onClick={this._handlerClick}>测试方法</button>


               <PropsChildRen>
                    <p>我是p标签</p>
                    <h4>我是h4</h4>
                    <button>我是button</button>
                    <label>我是label</label>
                    <text>我是文本组件text</text>
                </PropsChildRen>
    </div>
  );
  }



}

// Props.propTypes = {
//   age: React.PropTypes.number,
// };
