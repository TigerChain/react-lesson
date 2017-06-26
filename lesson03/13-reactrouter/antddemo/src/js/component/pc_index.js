import React, { Component, PropTypes } from 'react';

import PCHeader from './pc_header.js' ;
import PCMAIN from './pc_main.js' ;
import PCFooter from './pc_footer.js' ;

//首页
export default class PCIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //取得 PCIndex中的子组件  下句就相当于 const children = this.props.children
    const {children} = this.props
    return (
      <div>
        <PCHeader />
        <PCMAIN maincontent={children}/>
        <PCFooter />
      </div>
    );
  }
}

PCIndex.propTypes = {
};
