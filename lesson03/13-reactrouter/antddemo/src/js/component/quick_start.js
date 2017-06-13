import React, { Component, PropTypes } from 'react';
import CommonHead from './commonhead.js' ;
/**
 * 快速上手组件
 * @type {Object}
 */
export default class QuickStart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <CommonHead title="快速上手" />
      快速上手
    </div>);
  }
}

QuickStart.propTypes = {
};
