import React, { Component, PropTypes } from 'react';

/**
 * 共公的头组件
 * @type {String}
 */
export default class CommonHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this._renderHeaderView()}
      </div>
    );
  }
  _renderHeaderView(){
    return(
      <div className="commonstyle">
        <h1>{this.props.title}</h1>
        <a className="edit-button ant-tooltip-open" href="https://github.com/ant-design/ant-design/edit/master/docs/react/introduce.zh-CN.md">
          <i className="anticon anticon-edit"></i>
        </a>
      </div>
    )
  }
}

CommonHead.propTypes = {
};
