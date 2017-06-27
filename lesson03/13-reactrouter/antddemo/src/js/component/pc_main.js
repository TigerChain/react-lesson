import React, { Component, PropTypes } from 'react';

import PCMenu from './pc_menu.js' ;

// 内容组件
export default class PCMain extends Component {
  constructor(props) {
    super(props);
  }


  render() {
     const {maincontent} = this.props;
    return (
        <main className="main">
          {/* 菜单 */}
         <div className="menu">
            <PCMenu />
         </div>
          {/* 内容 */}
         <div className="content">
            {maincontent}
         </div>

        </main>
    );
  }
}

PCMain.propTypes = {
};
