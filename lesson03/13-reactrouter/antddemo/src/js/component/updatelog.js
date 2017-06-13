import React, { Component, PropTypes } from 'react';
import CommonHead from './commonhead.js' ;
/**
 * 更新日起
 * @type {Object}
 */
export default class UpDateLog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CommonHead title="更新日志" />
        更新日志
      </div>
    );
  }
}

UpDateLog.propTypes = {
};
