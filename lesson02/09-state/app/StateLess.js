import React, { Component, PropTypes } from 'react';

/**
 * 定义一个无状态的组件
 */
export default class StateLess extends Component {

  render() {
    return (<div>
      <ul>
        {
          this.props.datas.map(function (data,i) {
            return (
              <li key={i}>{data}</li>
            )
          })
        }
      </ul>

    </div>);
  }
}
