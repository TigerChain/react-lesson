import React, { Component, PropTypes } from 'react';
import CommonHead from './commonhead.js' ;
/**
 * 在 create-react-app 中使用
 * @type {Object}
 */
export default class UseInReact extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CommonHead title="在 create-react-app 中使用" />
        在 create-react-app 中使用
      </div>
    );
  }
}

UseInReact.propTypes = {
};
