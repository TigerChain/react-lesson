import React, { Component, PropTypes } from 'react';

import CommonHead from './commonhead.js' ;

/**
 * 定制有题界面
 * @type {Object}
 */
export default class CustomTheme extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CommonHead title="定制主题"/>
        定制主题
      </div>
    );
  }
}

CustomTheme.propTypes = {
};
