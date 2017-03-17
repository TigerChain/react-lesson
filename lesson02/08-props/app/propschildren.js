import React, { Component, PropTypes } from 'react';

/**
 * this.props.children属性演示
 * 自定义一个组件
 */
export default class PropsChildRen extends React.Component {

  /**
   * 遍历渲染每个元素
   */
  renderList(){
    return(
      React.Children.map(this.props.children, function (child) {
                 return <li>{child}</li>;
      })
    ) ;
  }

  render() {
    return (
    <div>
      <br />
         遍历取提this.props.children的值
         <ul>
         {this.renderList()}
         </ul>
    </div>);
  }
}
