import React, { Component, PropTypes } from 'react';
import CommonHead from './commonhead.js' ;
/**
 * 项目实践组件
 * @type {Object}
 */
export default class ProjectPractice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
        <CommonHead title="项目实践"/>
      项目实践
    </div>);
  }
}

ProjectPractice.propTypes = {
};
