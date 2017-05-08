import React, { Component, PropTypes } from 'react';

/**
 * 定义显示 html 的组件  不能在父组件中直接添加 监听器
 * @type {Object}
 */
export default class ShowPlus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <button onClick={this.props.handleClick}> + </button>
    </div>);
  }
}
